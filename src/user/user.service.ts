import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { ModelType } from 'typegoose';
import { AuthService } from '../shared/auth/auth.service';
import { JwtPayload } from '../shared/auth/jwt-payload.model';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { User } from './models/user.model';
import { LoginResponseDto } from './models/dto/login-response-dto.model';
import { LoginDto } from './models/dto/login-dto.model';
import { RegisterDto } from './models/dto/register-dto.model';
import { UserDto } from './models/dto/user-dto.model';
import { EmailService } from '../@infrastructure/email/email.service';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService))
        readonly _authService: AuthService,
        @Inject(forwardRef(() => EmailService)) readonly _emailService: EmailService
    ) {
        super();
        this._model = _userModel;
        this._mapper = _mapperService.mapper;
    }

    async register(vm: RegisterDto) {
        const { username, password, firstName, lastName } = vm;

        const newUser = User.createModel();
        newUser.username = username.trim().toLowerCase();
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const result = await this.create(newUser);
            return result.toJSON() as User;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(vm: LoginDto): Promise<LoginResponseDto> {
        const { username, password } = vm;

        const user = await this.findOne({ username });

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            username: user.username,
            role: user.role,
        };

        const token = await this._authService.signPayload(payload);
        const userVm: UserDto = await this.map<UserDto>(user.toJSON());

        this._emailService.generateMail();
        return {
            token,
            user: userVm,
        };
    }
}

import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { User } from './models/user.model';
import { LoginResponseDto } from './models/dto/login-response-dto.model';
import { LoginDto } from './models/dto/login-dto.model';
import { RegisterDto } from './models/dto/register-dto.model';
import { UserDto } from './models/dto/user-dto.model';
import { UserService } from './user.service';

@Controller('user')
@ApiUseTags(User.modelName)
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post('register')
    @ApiCreatedResponse({ type: UserDto })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    async register(@Body() vm: RegisterDto): Promise<UserDto> {
        const { username, password } = vm;

        if (!username) {
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }

        if (!password) {
            throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
        }

        let exist;
        try {
            exist = await this._userService.findOne({ username });
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST);
        }

        const newUser = await this._userService.register(vm);
        return this._userService.map<UserDto>(newUser);
    }

    @Post('login')
    @ApiCreatedResponse({ type: LoginResponseDto })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Login'))
    async login(@Body() vm: LoginDto): Promise<LoginResponseDto> {
        const fields = Object.keys(vm);
        fields.forEach(field => {
            if (!vm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this._userService.login(vm);
    }
}

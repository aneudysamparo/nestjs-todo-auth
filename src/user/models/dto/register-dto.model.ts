import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { LoginDto } from './login-dto.model';

export class RegisterDto extends LoginDto {
    @ApiModelPropertyOptional({ example: 'John' })
    firstName?: string;

    @ApiModelPropertyOptional({ example: 'Doe' })
    lastName?: string;
}

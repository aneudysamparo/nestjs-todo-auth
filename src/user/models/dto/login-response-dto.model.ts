import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from './user-dto.model';

export class LoginResponseDto {
    @ApiModelProperty() token: string;

    @ApiModelProperty({ type: UserDto })
    user: UserDto;
}

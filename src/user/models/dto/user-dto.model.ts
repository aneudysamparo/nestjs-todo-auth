import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { BaseModelDto } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';

export class UserDto extends BaseModelDto {
    @ApiModelProperty() username: string;
    @ApiModelPropertyOptional() firstName?: string;
    @ApiModelPropertyOptional() lastName?: string;
    @ApiModelPropertyOptional() fullName?: string;
    @ApiModelPropertyOptional({ enum: UserRole })
    role?: UserRole;
}

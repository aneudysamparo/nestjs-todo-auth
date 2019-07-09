import { ApiModelProperty } from '@nestjs/swagger';

export class SiteDto {
    @ApiModelProperty({ required: true, minLength: 6 })
    username: string;

    @ApiModelProperty({ required: true, minLength: 6, type: String, format: 'password' })
    password: string;

    @ApiModelProperty({ required: true, minLength: 4 })
    siteName: string;

}
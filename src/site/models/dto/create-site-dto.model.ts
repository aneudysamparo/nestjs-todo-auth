import { ApiModelProperty } from '@nestjs/swagger';

export class CreateSiteDto {
    @ApiModelProperty({ required: true, minLength: 6 })
    username: string;

    @ApiModelProperty({ required: true, minLength: 6, type: String, format: 'password' })
    password: string;

    @ApiModelProperty({ required: true, minLength: 4 })
    sitename: string;

    @ApiModelProperty({ required: true, minLength: 2 })
    domainname: string;

}
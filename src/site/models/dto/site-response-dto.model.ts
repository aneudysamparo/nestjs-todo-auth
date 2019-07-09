import { ApiModelProperty } from '@nestjs/swagger';

export class SiteResponseDto {
    @ApiModelProperty() siteName: string;
}
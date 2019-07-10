import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModelDto } from '../../../shared/base.model';

export class SiteDto extends BaseModelDto {
    @ApiModelProperty() username: string;
    @ApiModelProperty() siteName: string;
}
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModelDto } from '../../../shared/base.model';
import { TodoLevel } from '../todo-level.enum';

export class TodoDto extends BaseModelDto {
    @ApiModelProperty() content: string;
    @ApiModelProperty({ enum: TodoLevel })
    level: TodoLevel;
    @ApiModelProperty() isCompleted: boolean;
}

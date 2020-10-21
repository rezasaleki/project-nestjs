import { TaskStatus } from "../task-status-enum";
import { IsOptional, isIn, IsNotEmpty, IsIn } from "class-validator";

export class CreateTaskFilterDto {

    @IsOptional()
    @IsIn([TaskStatus.OPEN , TaskStatus.IN_PROGRESS , TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search:string;
}
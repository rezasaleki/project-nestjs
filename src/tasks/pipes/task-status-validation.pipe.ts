import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatuses = [
        TaskStatus.OPEN ,
        TaskStatus.IN_PROGRESS ,
        TaskStatus.DONE
    ]

    transform(value:any , metadata : ArgumentMetadata) {


        console.log("value" , value);
        console.log("metadata" , metadata);


        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an valid status !`);
        }

        value = value.toUpperCase();
        return value;
    }

    private isStatusValid(status:any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/Entity/user.entity';

export const getUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
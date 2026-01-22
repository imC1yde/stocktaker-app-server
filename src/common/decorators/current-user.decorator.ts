import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { IUserPayload } from '@src/common/interfaces/user-payload.interface'

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): IUserPayload => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req.user
  }
)
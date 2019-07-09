import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class DatabaseGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request.hostname);
    return true;
  }
}

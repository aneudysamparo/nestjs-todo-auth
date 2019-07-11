import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DatabaseGuard } from './shared/guards/database.guard';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;



    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalGuards(new DatabaseGuard());
    await app.listen(AppModule.port);
}

bootstrap();

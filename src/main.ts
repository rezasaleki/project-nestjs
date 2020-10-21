import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RolesGuard } from './Guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalGuards(new RolesGuard()); // apply to all controllerand routes

  const options = new DocumentBuilder()
    .setTitle('Udemy')
    .setDescription('The Udemy API description')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);

  console.log("The Serve Run Port 3000");
}
bootstrap();

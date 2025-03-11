import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('System rejestracji użytkowników z JWT')
    .setDescription(
      'Stwórz system rejestracji i logowania użytkowników z wykorzystaniem JWT (JSON Web Token) do uwierzytelniania.',
    )
    .setVersion('1.0')
    .addTag('example')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

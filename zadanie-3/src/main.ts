import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API do zarządzania książkami w bibliotece')
    .setDescription(
      'Stwórz API do zarządzania książkami w bibliotece. Użytkownicy powinni mieć możliwość dodawania książek, wyszukiwania ich według autora lub tytułu oraz sprawdzania dostępności.',
    )
    .setVersion('1.0')
    .addTag('Księgarnia')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

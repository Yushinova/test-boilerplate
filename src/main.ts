import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    
    // ========== ГЛОБАЛЬНАЯ ВАЛИДАЦИЯ ==========
    // Включаем валидацию для всех входящих запросов
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,           // удаляет поля, которых нет в DTO
        transform: true,           // автоматически преобразует типы
        forbidNonWhitelisted: true, // ошибка при лишних полях
    }));

    // ========== НАСТРОЙКА SWAGGER ==========
    const config = new DocumentBuilder()
        .setTitle('Blog API')
        .setDescription('API для управления постами и комментариями')
        .setVersion('1.0')
        .addTag('posts', 'Операции с постами')
        .addTag('comments', 'Операции с комментариями')
        .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);  // Swagger будет доступен по пути /api

    // ========== ЗАПУСК СЕРВЕРА ==========
    const port = process.env.PORT || 3000;
    await app.listen(port);
    
    console.log(`🚀 Сервер запущен на: http://localhost:${port}`);
    console.log(`📚 Swagger документация: http://localhost:${port}/api`);
}
bootstrap();
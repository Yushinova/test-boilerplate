import { ConfigService } from '@nestjs/config';

export default () => ({
    postgres: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
    mongodb: {
        uri: process.env.MONGO_URI,
    },
    port: parseInt(process.env.PORT ?? '3000', 10),
});

// Альтернативный вариант с безопасным доступом
export const getConfig = (configService: ConfigService) => ({
    postgres: {
        host: configService.get<string>('POSTGRES_HOST')!,
        port: configService.get<number>('POSTGRES_PORT')!,
        user: configService.get<string>('POSTGRES_USER')!,
        password: configService.get<string>('POSTGRES_PASSWORD')!,
        database: configService.get<string>('POSTGRES_DB')!,
    },
    mongodb: {
        uri: configService.get<string>('MONGO_URI')!,
    },
    port: configService.get<number>('PORT')!,
});
import * as Joi from 'joi';

export const validationSchema = Joi.object({
    // ========== PostgreSQL ==========
    POSTGRES_HOST: Joi.string()
        .required()
        .default('localhost')
        .description('Хост PostgreSQL базы данных'),
    
    POSTGRES_PORT: Joi.number()
        .default(5432)
        .description('Порт PostgreSQL'),
    
    POSTGRES_USER: Joi.string()
        .required()
        .default('postgres')
        .description('Имя пользователя PostgreSQL'),
    
    POSTGRES_PASSWORD: Joi.string()
        .required()
        .default('postgres')
        .description('Пароль PostgreSQL'),
    
    POSTGRES_DB: Joi.string()
        .required()
        .default('test-boilerplate')
        .description('Имя базы данных PostgreSQL'),

    // ========== MongoDB ==========
    MONGO_URI: Joi.string()
        .required()
        .pattern(/^mongodb:\/\/.+/)
        .description('URI подключения к MongoDB'),

    // ========== Server ==========
    PORT: Joi.number()
        .default(3000)
        .min(1000)
        .max(9999)
        .description('Порт для запуска приложения'),
});
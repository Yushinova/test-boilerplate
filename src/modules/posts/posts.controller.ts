import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('posts')  // Группа в Swagger
@Controller('posts')  // ← ВАЖНО: добавляем путь /posts
export class PostsController {
    constructor(private readonly postsService: PostsService) {}  // ← маленькая буква p

    @Post()
    @ApiOperation({ summary: 'Создать новый пост' })
    @ApiResponse({ status: 201, description: 'Пост успешно создан' })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    public async create(@Body() createPostDto: CreatePostDto) {  // ← добавляем @Body()
        return this.postsService.create(createPostDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все посты' })
    @ApiResponse({ status: 200, description: 'Список постов' })
    public async findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить пост по ID' })
    @ApiParam({ name: 'id', description: 'ID поста', type: Number })
    @ApiResponse({ status: 200, description: 'Пост найден' })
    @ApiResponse({ status: 404, description: 'Пост не найден' })
    public async findOne(@Param('id') id: string) {  // ← добавляем получение ID
        return this.postsService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить пост' })
    @ApiParam({ name: 'id', description: 'ID поста', type: Number })
    @ApiResponse({ status: 200, description: 'Пост обновлён' })
    @ApiResponse({ status: 404, description: 'Пост не найден' })
    public async update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto
    ) {
        return this.postsService.update(+id, updatePostDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить пост' })
    @ApiParam({ name: 'id', description: 'ID поста', type: Number })
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: 204, description: 'Пост удалён' })
    @ApiResponse({ status: 404, description: 'Пост не найден' })
    public async remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
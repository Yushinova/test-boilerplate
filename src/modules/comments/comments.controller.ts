import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')  // ← добавляем путь /comments
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новый комментарий' })
    @ApiResponse({ status: 201, description: 'Комментарий успешно создан' })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    public async create(@Body() createCommentDto: CreateCommentDto) {  // ← добавляем @Body()
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все комментарии' })
    @ApiResponse({ status: 200, description: 'Список комментариев' })
    public async findAll() {  // ← переименовываем
        return this.commentsService.findAll();
    }

    @Get('by-post')
    @ApiOperation({ summary: 'Получить комментарии по ID поста' })
    @ApiQuery({ name: 'postId', description: 'ID поста', type: Number })
    @ApiResponse({ status: 200, description: 'Список комментариев поста' })
    public async findAllByPostId(@Query('postId') postId: string) {  // ← получаем postId из query
        return this.commentsService.findAllByPostId(+postId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить комментарий по ID' })
    @ApiParam({ name: 'id', description: 'ID комментария (MongoDB ObjectId)' })
    @ApiResponse({ status: 200, description: 'Комментарий найден' })
    @ApiResponse({ status: 404, description: 'Комментарий не найден' })
    public async findOne(@Param('id') id: string) {  // ← получаем ID из параметра
        return this.commentsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить комментарий' })
    @ApiParam({ name: 'id', description: 'ID комментария (MongoDB ObjectId)' })
    @ApiResponse({ status: 200, description: 'Комментарий обновлён' })
    @ApiResponse({ status: 404, description: 'Комментарий не найден' })
    public async update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto
    ) {
        return this.commentsService.update(id, updateCommentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить комментарий' })
    @ApiParam({ name: 'id', description: 'ID комментария (MongoDB ObjectId)' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: 204, description: 'Комментарий удалён' })
    @ApiResponse({ status: 404, description: 'Комментарий не найден' })
    public async remove(@Param('id') id: string) {
        await this.commentsService.remove(id);
    }
}
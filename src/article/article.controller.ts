import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ArticleService } from '@app/article/article.service'
import { ZodValidationPipe } from '@app/pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard'
import { CurrentUser } from '@app/auth/currentUser.decorator'
import { TokenPayload } from '@app/auth/schemas/tokenPayloadSchema'
import {
  createArticleSchema,
  CreateArticleSchema,
} from '@app/article/schemas/createArticleSchema'
import { ArticleResponse } from '@app/article/schemas/articleResponseSchema'
import { DeleteResult } from 'typeorm'
import {
  UpdateArticleSchema,
  updateArticleSchema,
} from '@app/article/schemas/updateArticleSchema'
import { FindAllArticlesQuery } from './schemas/findAllArticlesQuerySchema'

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createArticle(
    @CurrentUser() userPayload: TokenPayload,
    @Body('article', new ZodValidationPipe(createArticleSchema))
    article: CreateArticleSchema
  ): Promise<ArticleResponse> {
    return await this.articleService.createArticle(userPayload, article)
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  async getArticle(@Param('slug') slug: string): Promise<ArticleResponse> {
    return await this.articleService.getArticle(slug)
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteArticle(
    @Param('slug') slug: string,
    @CurrentUser() userPayload: TokenPayload
  ): Promise<DeleteResult> {
    return await this.articleService.deleteArticle(slug, userPayload)
  }

  @Put(':slug')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateArticle(
    @Param('slug') slug: string,
    @Body('article', new ZodValidationPipe(updateArticleSchema))
    article: UpdateArticleSchema,
    @CurrentUser() userPayload: TokenPayload
  ): Promise<ArticleResponse> {
    return await this.articleService.updateArticle(slug, userPayload, article)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllArticles(@Query() query: FindAllArticlesQuery) {
    return this.articleService.findAllArticles(query)
  }

  @Post(':slug/favorite')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async addArticleToFavorite(
    @Param('slug') slug: string,
    @CurrentUser() userPayload: TokenPayload
  ) {
    return this.articleService.addArticleToFavorite(slug, userPayload)
  }

  @Delete(':slug/favorite')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async removeArticleToFavorite(
    @Param('slug') slug: string,
    @CurrentUser() userPayload: TokenPayload
  ) {
    return this.articleService.removeArticleToFavorite(slug, userPayload)
  }
}

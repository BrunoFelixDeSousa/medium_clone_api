import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '@app/article/article.entity';
import { Repository } from 'typeorm';
import { TokenPayload } from '@app/auth/schemas/tokenPayloadSchema';
import { CreateArticleSchema } from '@app/article/schemas/createArticleSchema';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponse } from '@app/article/schemas/articleResponseSchema';
import { convertToSlug } from '@app/utils';
import { DeleteResult } from 'typeorm';
import { UpdateArticleSchema } from '@app/article/schemas/updateArticleSchema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createArticle(
    userPayload: TokenPayload,
    articleBody: CreateArticleSchema,
  ): Promise<ArticleResponse> {
    const author = await this.userRepository.findOne({
      where: {
        id: userPayload.sub,
      },
    });

    const newArticle = new ArticleEntity();
    Object.assign(newArticle, articleBody);
    newArticle.author = author;
    newArticle.slug = convertToSlug(articleBody.title);
    const article = await this.articleRepository.save(newArticle);

    const articleResponse = this.removeIdAndPassword(article);

    return {
      article: articleResponse,
    };
  }

  async getArticle(slug: string): Promise<ArticleResponse> {
    const article = await this.articleRepository.findOne({
      where: {
        slug,
      },
    });
    if (!article) {
      throw new NotFoundException({
        message: 'article not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const articleResponse = this.removeIdAndPassword(article);

    return {
      article: articleResponse,
    };
  }

  async deleteArticle(
    slug: string,
    userPayload: TokenPayload,
  ): Promise<DeleteResult> {
    const currentUserId = userPayload.sub;
    const article = await this.articleRepository.findOne({
      where: {
        slug,
      },
    });

    if (!article) {
      throw new NotFoundException({
        message: 'article not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    slug: string,
    userPayload: TokenPayload,
    updateArticle: UpdateArticleSchema,
  ): Promise<ArticleResponse> {
    const currentUserId = userPayload.sub;
    const isArticle = await this.articleRepository.findOne({
      where: {
        slug,
      },
    });

    if (!isArticle) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (isArticle.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    // Object.assign(isArticle, updateArticle);
    if (isArticle.title !== updateArticle.title) {
      isArticle.slug = convertToSlug(updateArticle.title);
    }
    isArticle.title = updateArticle.title;
    isArticle.description = updateArticle.description;
    isArticle.body = updateArticle.body;

    const article = await this.articleRepository.save(isArticle);
    const articleResponse = this.removeIdAndPassword(article);
    return {
      article: articleResponse,
    };
  }

  private removeIdAndPassword(article: ArticleEntity) {
    const {
      author: { id, password, ...resAuthor },
      ...resArticle
    } = article;

    return {
      ...resArticle,
      author: resAuthor,
    };
  }
}

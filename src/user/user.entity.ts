import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
}

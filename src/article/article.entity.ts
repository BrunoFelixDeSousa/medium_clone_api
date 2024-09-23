import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { UserEntity } from '@app/user/user.entity'

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  slug: string

  @Column()
  title: string

  @Column({ default: '' })
  description: string

  @Column({ default: '' })
  body: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date

  @Column('text', { array: true, name: 'tag_list' })
  tagList: string[]

  @Column({ name: 'favorites_count', default: 0 })
  favoritesCount: number

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity
}

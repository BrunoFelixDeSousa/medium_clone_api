import { Module } from '@nestjs/common'
import { TagController } from '@app/modules/tag/tag.controller'
import { TagService } from '@app/modules/tag/tag.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagEntity } from '@app/modules/tag/tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}

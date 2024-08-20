import { Module } from '@nestjs/common';
import { TagModule } from '@app/tag/tag.module';

@Module({
  imports: [TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

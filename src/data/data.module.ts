import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataResolver } from './data.resolver';

@Module({
  providers: [DataResolver, DataService]
})
export class DataModule {}

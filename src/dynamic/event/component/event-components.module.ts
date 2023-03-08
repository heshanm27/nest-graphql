import { Module } from '@nestjs/common';
import { EventComponentsService } from './event-components.service';
import { EventComponentsResolver } from './event-components.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventComponent } from './entities/event-components.entity';
import { Collection } from 'src/collection/entities/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventComponent]),
    TypeOrmModule.forFeature([Collection]),
  ],
  providers: [EventComponentsResolver, EventComponentsService],
  exports: [EventComponentsService],
})
export class EventComponentsModule {}

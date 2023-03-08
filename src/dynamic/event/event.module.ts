import { EventComponentsModule } from './component/event-components.module'
import { Module } from '@nestjs/common'; 
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Event } from './entities/event.entity';


@Module({ 
imports: [
    EventComponentsModule,TypeOrmModule.forFeature([Event])],
providers: [EventService, EventResolver] 

}) 

export class EventModule {

}
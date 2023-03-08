import { Injectable } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  RequestTimeoutException,
} from '@nestjs/common/exceptions';
import { EventFilterInput } from './dto/filter_event_input';
import { EventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';





@Injectable()
export class EventService {

    constructor(
    @InjectRepository(Event)
    private EventRepository: Repository<Event>,
  ) {}

async create(EventInput: EventInput): Promise<Event> {
    try {
      const event = await this.EventRepository.create(EventInput);
      return await this.EventRepository.save(event);
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

async findAll(filteroptions: EventFilterInput): Promise<Event[]> {

    const defaultFilterValue = {
      orderBy: filteroptions.orderBy || 'id',
      sort: 'ASC',
      limit: filteroptions.page || 10,
      page: filteroptions.limit || 0,
    };
    return await this.EventRepository
      .createQueryBuilder('event')
      .orderBy(defaultFilterValue.orderBy, 'ASC')
      .limit(defaultFilterValue.limit)
      .offset(defaultFilterValue.page * defaultFilterValue.limit)
      .getMany();
  }

async findOne(id: number): Promise<Event> {
    const event = await this.EventRepository.findOneBy({ id });
    if (!event)
      throw new BadRequestException(`event with id ${id} not found`);
    return event;
  }

async update(
    id: number,
    EventInput: EventInput,
  ): Promise<Event> {
    const foundProduct = await this.EventRepository.findOneBy({ id });

    if (!foundProduct)
      throw new BadRequestException(`Event with id ${id} not found`);

    await this.EventRepository.update(id, EventInput);
    return await this.EventRepository.findOneBy({ id });
  }

async remove(id: number): Promise<Event> {
    try {
      const event = await this.EventRepository.findOneBy({ id });
      if (!event) throw new BadRequestException('Product not found');
      const deleted = await this.EventRepository.delete({ id });
      return event;
    } catch (error) {
      throw new BadRequestException(`Event with id ${id} not found`);
    }
  }

 }
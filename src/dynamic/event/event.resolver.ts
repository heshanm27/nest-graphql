import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';

import { EventFilterInput } from './dto/filter_event_input';
import { EventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';



@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  async createEvent(
    @Args('EventInput') EventInput: EventInput,
  ): Promise<Event> {
    return await this.eventService.create(EventInput);
  }

  @Query(() => [Event], { name: 'findAllEvent' })
  async findAll(
    @Args('FilterOptions',{ nullable: true }) filteroptions: EventFilterInput,
  ): Promise<Event[]> {
    return this.eventService.findAll(filteroptions);
  }

  @Query(() => Event, { name: 'findOneEvent' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Event> {
    return this.eventService.findOne(id);
  }


  @Mutation(() => Event)
  updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ): Promise<Event> {
    return this.eventService.update(
      updateEventInput.id,
      updateEventInput,
    );
  }

  @Mutation(() => Event)
  removeEvent(@Args('id', { type: () => Int }) id: number): Promise<Event> {
    return this.eventService.remove(id);
  }
}

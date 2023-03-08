import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EventComponentsService } from './event-components.service';
import { EventComponent } from './entities/event-components.entity';
import { CreateEventComponentInput } from './dto/create-component.input';
import { UpdateEventComponentInput } from './dto/update-component.input';


@Resolver(() => EventComponent)
export class EventComponentsResolver {
  constructor(private readonly eventComponentsService: EventComponentsService) {}

  @Mutation(() => EventComponent)
  createEventComponent(
    @Args('createEventComponentInput') createEventComponentInput: CreateEventComponentInput,
  ) {
    return this.eventComponentsService.create(createEventComponentInput);
  }

  @Query(() => [EventComponent], { name: 'findAllEventComponents' })
  findAll(): Promise<EventComponent[]> {
    return this.eventComponentsService.findAll();
  }

  @Query(() => [EventComponent], { name: 'findAllEventComponents' })
  async findAllByCollectionId(
  ): Promise<EventComponent[]> {
    return await this.eventComponentsService.findEventComponents();
  }

 // @Query(() => EventComponent, { collectionName: 'findOneEventComponent' })
 // findOne(@Args('id', { type: () => Int }) id: number): Promise<EventComponent> {
 //   return this.eventComponentsService.findOne(id);
 // }

  @Mutation(() => EventComponent)
  updateEventComponent(
    @Args('collectionName') collectionName: string,
    @Args('updateEventComponentInput') updateEventComponentInput: UpdateEventComponentInput,
  ) {
    return this.eventComponentsService.update(
      updateEventComponentInput.id,
      updateEventComponentInput,
       collectionName,
    );
  }

  @Mutation(() => EventComponent)
  removeEventComponent(@Args('id', { type: () => Int }) id: number,    @Args('collectionName') collectionName: string) {
    return this.eventComponentsService.remove(id,collectionName);
  }
}

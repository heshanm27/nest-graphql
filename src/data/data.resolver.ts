import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DataService } from './data.service';
import { Datum } from './entities/datum.entity';
import { CreateDatumInput } from './dto/create-datum.input';
import { UpdateDatumInput } from './dto/update-datum.input';

@Resolver(() => Datum)
export class DataResolver {
  constructor(private readonly dataService: DataService) {}

  @Mutation(() => Datum)
  createDatum(@Args('createDatumInput') createDatumInput: CreateDatumInput) {
    return this.dataService.create(createDatumInput);
  }

  @Query(() => [Datum], { name: 'data' })
  findAll() {
    return this.dataService.findAll();
  }

  @Query(() => Datum, { name: 'datum' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dataService.findOne(id);
  }

  @Mutation(() => Datum)
  updateDatum(@Args('updateDatumInput') updateDatumInput: UpdateDatumInput) {
    return this.dataService.update(updateDatumInput.id, updateDatumInput);
  }

  @Mutation(() => Datum)
  removeDatum(@Args('id', { type: () => Int }) id: number) {
    return this.dataService.remove(id);
  }
}

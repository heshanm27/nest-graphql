import { Injectable } from '@nestjs/common';
import { CreateDatumInput } from './dto/create-datum.input';
import { UpdateDatumInput } from './dto/update-datum.input';

@Injectable()
export class DataService {
  create(createDatumInput: CreateDatumInput) {
    return 'This action adds a new datum';
  }

  findAll() {
    return `This action returns all data`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datum`;
  }

  update(id: number, updateDatumInput: UpdateDatumInput) {
    return `This action updates a #${id} datum`;
  }

  remove(id: number) {
    return `This action removes a #${id} datum`;
  }
}

import { Module } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsResolver } from './components.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { Collection } from 'src/collection/entities/collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Component]),
    TypeOrmModule.forFeature([Collection]),
  ],
  providers: [ComponentsResolver, ComponentsService],
  exports: [ComponentsService],
})
export class ComponentsModule {}

import { Module } from '@nestjs/common';
import { ComponentsValueService } from './components-value.service';
import { ComponentsValueResolver } from './components-value.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsValue } from './entities/components-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentsValue])],
  providers: [ComponentsValueResolver, ComponentsValueService],
})
export class ComponentsValueModule {}

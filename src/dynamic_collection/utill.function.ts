// import { Entity, Column } from 'typeorm';
// import { Colums } from './dynamic_module.module';

// export const createEntity = (columns: Colums[]): any => {
//   @Entity()
//   class DynamicEntity {
//     constructor(data: any) {
//       Object.assign(this, data);
//     }
//   }

//   for (const column of columns) {
//     Object.defineProperty(DynamicEntity.prototype, column.name, {
//       get() {
//         return this[`_${column.name}`];
//       },
//       set(value) {
//         this[`_${column.name}`] = value;
//       },
//     });

//     Column({ type: column.type })(DynamicEntity.prototype, column.name);
//   }

//   return DynamicEntity;
// };

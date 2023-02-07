/// #  NodePlopAPI

let data = [];
export default function plopFunc(
  /**@type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setActionType('addMany', (answers, config, plop) => {});
  plop.setGenerator('module', {
    description: 'Create a NestJS module',
    prompts: [
      {
        type: 'input',
        name: 'collectionName',
        message: 'What is the collection name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{collectionName}}/{{collectionName}}.module.ts',
        templateFile: './plop-templates/module.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/{{collectionName}}/{{collectionName}}.resolver.ts',
        templateFile: './plop-templates/resolver.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/{{collectionName}}/{{collectionName}}.service.ts',
        templateFile: './plop-templates/service.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/{{collectionName}}/dto/create-{{lowerCase collectionName}}.input.ts',
        templateFile: './plop-templates/createdto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/{{collectionName}}/dto/filter_{{lowerCase collectionName}}_input.ts',
        templateFile: './plop-templates/dto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/{{collectionName}}/dto/update-{{lowerCase collectionName}}.input.ts',
        templateFile: './plop-templates/updatedto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/{{collectionName}}/entities/{{collectionName}}.entity.ts',
        templateFile: './plop-templates/entity.hbs',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'src/app.module.ts',
        pattern: /()/,
        template:
          "import { {{properCase collectionName}}Module } from './{{lowerCase collectionName}}/{{lowerCase collectionName}}.module'\n$1",
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'src/app.module.ts',
        pattern: /(imports: \[)/,
        template: '$1\n    {{properCase collectionName}}Module,',
        skipIfExists: true,
      },
    ],
  });

  plop.setGenerator('createEntity', {
    description: 'Add Entity',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the module?',
      },
      {
        type: 'input',
        name: 'entity',
        message: 'What is the collection name?',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'src/{{name}}/entities/{{name}}.entity.ts',
        pattern: /(id: number\;)/g,
        template: `$1\n  @Field()\n  @Column()\n {{entity.name}}: {{entity.type}} \n{{entity}}`,
        skipIfExists: true,
      },
    ],
  });
}

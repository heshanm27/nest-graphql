export default function plopFunc(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
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

  // plop.setGenerator('import', {
  //   description: 'Add an import for a new module in the app.module.ts file',
  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'What is the name of the module?',
  //     },
  //   ],
  //   actions: [
  //     {
  //       type: 'modify',
  //       path: 'src/app.module.ts',
  //       pattern: /()/,
  //       template:
  //         "import { {{properCase name}}Module } from './{{lowerCase name}}/{{lowerCase name}}.module'\n$1",
  //       skipIfExists: true,
  //     },
  //     {
  //       type: 'modify',
  //       path: 'src/app.module.ts',
  //       pattern: /(imports: \[)/,
  //       template: '$1\n    {{properCase name}}Module,',
  //       skipIfExists: true,
  //     },
  //   ],
  // });

  plop.setGenerator('testObject', {
    description: 'Create a test object',
    prompts: [
      {
        type: 'input',
        name: 'collectionName',
        message: 'What is the collection name?',
      },
      {
        type: 'input',
        name: 'result',
        message: 'What is the object name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/testPlop/testObjectEntity.ts',
        templateFile: './plop-templates/testObject/objectentity.hbs',
        data: {
          result: {
            name: 'test',
            type: 'string',
          },
        },
      },
    ],
  });
}

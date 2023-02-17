import { deleteAsync } from 'del';
import fs from 'fs';

export default function plopFunc(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.load('plop-pack-remove');

  plop.setHelper('json', function (context) {
    const data = context.data.root.entity;
    const dataaParsed = JSON.parse(data);
    console.log(dataaParsed);
    return `${dataaParsed.name}: ${dataaParsed.type}`;
  });

  plop.setActionType('deleteDirectory', async function (answers, config) {
    console.log(config);
    const filePath = config.path;
    const exists = await fs.existsSync(filePath);
    if (!exists) {
      return 'File does not exist';
    } else {
      const deletedFilePaths = await deleteAsync([filePath]);
      return `File deleted${deletedFilePaths}`;
    }
  });

  plop.setGenerator('addmodule', {
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
        path: 'src/dynamic/{{collectionName}}/{{collectionName}}.module.ts',
        templateFile: './plop-templates/module.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{collectionName}}/{{collectionName}}.resolver.ts',
        templateFile: './plop-templates/resolver.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{collectionName}}/{{collectionName}}.service.ts',
        templateFile: './plop-templates/service.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{collectionName}}/dto/create-{{lowerCase collectionName}}.input.ts',
        templateFile: './plop-templates/createdto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{collectionName}}/dto/filter_{{lowerCase collectionName}}_input.ts',
        templateFile: './plop-templates/filterdto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{collectionName}}/dto/update-{{lowerCase collectionName}}.input.ts',
        templateFile: './plop-templates/updatedto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{collectionName}}/entities/{{collectionName}}.entity.ts',
        templateFile: './plop-templates/entity.hbs',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'src/app.module.ts',
        pattern: /()/,
        template:
          "import { {{properCase collectionName}}Module } from './dynamic/{{lowerCase collectionName}}/{{lowerCase collectionName}}.module'\n$1",
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

  plop.setGenerator('addFeildMenu', {
    description: 'Create a NestJS module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the entity name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase name}}/component/{{lowerCase name}}-components.module.ts',
        templateFile: './plop-templates/dynamicField/component-module.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase name}}/component/{{lowerCase name}}-components.resolver.ts',
        templateFile: './plop-templates/dynamicField/component-resolver.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase name}}/component/{{lowerCase name}}-components.service.ts',
        templateFile: './plop-templates/dynamicField/component-service.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase name}}/component/entities/{{lowerCase name}}-components.entity.ts',
        templateFile:
          './plop-templates/dynamicField/entities/component-entitie.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase name}}/component/dto/create-component.input.ts',
        templateFile:
          './plop-templates/dynamicField/dto/create-component.dto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase name}}/component/dto/update-component.input.ts',
        templateFile:
          './plop-templates/dynamicField/dto/update-component.dto.hbs',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'src/dynamic/{{lowerCase name}}/{{lowerCase name}}.module.ts',
        pattern: /()/,
        template:
          "import { {{properCase name}}ComponentsModule } from './component/{{lowerCase name}}-components.module'\n$1",
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'src/dynamic/{{lowerCase name}}/{{lowerCase name}}.module.ts',
        pattern: /(imports: \[)/,
        template: '$1\n    {{properCase name}}ComponentsModule,',
      },
    ],
  });

  plop.setGenerator('addComponent', {
    description: 'Create a test object',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the entity name?',
      },
      {
        type: 'input',
        name: 'entity',
        message: 'What is the data?',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'src/dynamic/{{lowerCase name}}/entities/{{lowerCase name}}.entity.ts',
        pattern: /(id: number\;)/g,
        template: `$1\n \n@Field()\n @Column()\n {{{json}}} \n`,
      },
      {
        type: 'modify',
        path: 'src/dynamic/{{lowerCase name}}/dto/create-{{lowerCase name}}.input.ts',
        pattern: /(.*export class.*{)/g,
        template: `$1\n  \n@Field({nullable: true,})\n{{{json}}} \n`,
      },
      {
        type: 'modify',
        path: 'src/dynamic/{{lowerCase name}}/dto/create-{{lowerCase name}}.input.ts',
        pattern:
          /@Field\(\{\s*nullable:\s*(true|false),\s*\}\)\s*@(IsString)\(\)\s*(\w+)\s*:\s*(number);/g,
        template: '',
      },
      {
        type: 'modify',
        path: 'src/dynamic/{{lowerCase name}}/dto/update-{{lowerCase name}}.input.ts',
        pattern: /(id: number\;)/g,
        template: `$1\n \n@Field({nullable: true,})\n{{{json}}} \n`,
      },
    ],
  });

  plop.setGenerator('delete', {
    description: 'delete a module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the entity name?',
      },
    ],
    actions: function (data) {
      const regex = new RegExp(`.*${data.name}Module.*`, 'gi');
      var actions = [
        {
          type: 'modify',
          path: 'src/app.module.ts',
          pattern: regex,
          template: ' ',
        },
        {
          type: 'deleteDirectory',
          path: `src/dynamic/${data.name}`,
          force: true,
          skipIfNonexistent: true,
        },
      ];
      return actions;
    },
  });

  plop.setGenerator('test', {
    description: 'test a file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the entity name?',
      },
    ],
    actions: [
      {
        type: 'remove',
        path: 'src/dynamic/{{lowerCase name}}',
      },
    ],
  });

  plop.setGenerator('update', {
    description: 'update a module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the entity name?',
      },
      {
        type: 'input',
        name: 'newName',
        message: 'What is the updated entity name?',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'src/app.module.ts',
        pattern: / /g,
        template: '$1\n    {{properCase newName}}Module,',
      },
    ],
  });
}

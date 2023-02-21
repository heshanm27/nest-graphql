import { deleteAsync } from 'del';
import fs from 'fs';
import path from 'path';
import util from 'util';

export default function plopFunc(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.load('plop-pack-remove');
  plop.load('plop-pack-rename-many');
  plop.load('plop-action-copy');
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

  plop.setActionType('renameAll', async function (answers, config) {
    const renameAsync = util.promisify(fs.rename);
    console.log(answers);

    const oldFileArr = config.templateFiles.map((file) =>
      plop.renderString(file, answers),
    );
    const newFileArr = config.renameTemplate.map((file) =>
      plop.renderString(file, answers),
    );
    try {
      const filesRenamed = [];
      for (let [index, filepath] of oldFileArr.entries()) {
        console.log(index);
        const oldFileName = path.basename(filepath);
        const oldPathdirectory = path.dirname(filepath);
        const oldFilepath = path.resolve(oldPathdirectory, oldFileName);
        const newFileName = path.basename(newFileArr[index]);
        const newPathdirectory = path.dirname(newFileArr[index]);
        const newFilepath = path.resolve(newPathdirectory, newFileName);

        const pathExsist = await fs.existsSync(newFilepath);
        if (pathExsist) {
          continue;
        }
        await renameAsync(oldFilepath, newFilepath);
        console.log('oldFilePath', oldFilepath);
        console.log('newFilepath', newFilepath);

        // const directory = path.dirname(filepath);
        // const newFilepath = path.resolve(directory, newFileName);
        // console.log('new File Name', newFilepath);
        // if (typeof newFileName === 'string') {
        //   await renameAsync(filepath, newFilepath);
        //   filesRenamed.push(path.relative(process.cwd(), newFilepath));
        // }
      }
    } catch (error) {
      console.log(error);
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
        name: 'collectionName',
        message: 'What is the entity name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase collectionName}}/component/{{lowerCase collectionName}}-components.module.ts',
        templateFile: './plop-templates/dynamicField/component-module.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase collectionName}}/component/{{lowerCase collectionName}}-components.resolver.ts',
        templateFile: './plop-templates/dynamicField/component-resolver.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase collectionName}}/component/{{lowerCase collectionName}}-components.service.ts',
        templateFile: './plop-templates/dynamicField/component-service.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase collectionName}}/component/entities/{{lowerCase collectionName}}-components.entity.ts',
        templateFile:
          './plop-templates/dynamicField/entities/component-entitie.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase collectionName}}/component/dto/create-component.input.ts',
        templateFile:
          './plop-templates/dynamicField/dto/create-component.dto.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'src/dynamic/{{lowerCase collectionName}}/component/dto/update-component.input.ts',
        templateFile:
          './plop-templates/dynamicField/dto/update-component.dto.hbs',
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'src/dynamic/{{lowerCase collectionName}}/{{lowerCase collectionName}}.module.ts',
        pattern: /()/,
        template:
          "import { {{properCase collectionName}}ComponentsModule } from './component/{{lowerCase collectionName}}-components.module'\n$1",
        skipIfExists: true,
      },
      {
        type: 'modify',
        path: 'src/dynamic/{{lowerCase collectionName}}/{{lowerCase collectionName}}.module.ts',
        pattern: /(imports: \[)/,
        template: '$1\n    {{properCase collectionName}}ComponentsModule,',
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

  plop.setGenerator('updateModule', {
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
    actions: function (data) {
      const regex = new RegExp(`${data.name}`, 'gi');
      console.log(regex);
      let action = [
        // {
        //   type: 'renameAll',
        //   templateFiles: [
        //     `src/dynamic/{{lowerCase name}}/{{lowerCase name}}.module.ts`,
        //     `src/dynamic/{{lowerCase name}}/{{lowerCase name}}.resolver.ts`,
        //     `src/dynamic/{{lowerCase name}}/{{lowerCase name}}.service.ts`,
        //     `src/dynamic/{{lowerCase name}}/entities/{{lowerCase name}}.entity.ts`,
        //     `src/dynamic/{{lowerCase name}}/dto/create-{{lowerCase name}}.input.ts`,
        //     `src/dynamic/{{lowerCase name}}/dto/update-{{lowerCase name}}.input.ts`,
        //     `src/dynamic/{{lowerCase name}}/dto/filter_{{lowerCase name}}_input.ts`,
        //   ],
        //   renameTemplate: [
        //     `src/dynamic/{{lowerCase name}}/{{lowerCase newName}}.module.ts`,
        //     `src/dynamic/{{lowerCase name}}/{{lowerCase newName}}.resolver.ts`,
        //     `src/dynamic/{{lowerCase name}}/{{lowerCase newName}}.service.ts`,
        //     `src/dynamic/{{lowerCase name}}/entities/{{lowerCase newName}}.entity.ts`,
        //     `src/dynamic/{{lowerCase name}}/dto/create-{{lowerCase newName}}.input.ts`,
        //     `src/dynamic/{{lowerCase name}}/dto/update-{{lowerCase newName}}.input.ts`,
        //     `src/dynamic/{{lowerCase name}}/dto/filter_{{lowerCase newName}}_input.ts`,
        //   ],
        //   renamer: (name) => `${name}`,
        // },
        // {
        //   type: 'add',
        //   path: 'src/dynamic/{{lowerCase newName}}/{{lowerCase newName}}.txt',
        //   templateFile: '',
        //   skipIfExists: true,
        // },
        // {
        //   type: 'modify',
        //   path: 'src/app.module.ts',
        //   pattern: /()/,
        //   template:
        //     "import { {{properCase newName}}Module } from './dynamic/{{lowerCase newName}}/{{lowerCase newName}}.module'\n$1",
        //   skipIfExists: true,
        // },
        // {
        //   type: 'modify',
        //   path: `src/dynamic/{{lowerCase name}}/{{lowerCase newName}}.module.ts`,
        //   pattern: /(imports: \[)/,
        //   template: '$1\n    {{properCase newName}}Module,',
        //   skipIfExists: true,
        // },
        {
          type: 'modify',
          path: 'src/dynamic/{{lowerCase name}}/{{lowerCase newName}}.resolver.ts',
          pattern: regex,
          template: '{{properCase newName}}',
          skipIfExists: true,
        },
        {
          type: 'modify',
          path: 'src/dynamic/{{lowerCase name}}/{{lowerCase newName}}.module.ts',
          pattern: regex,
          template: '{{properCase newName}}',
          skipIfExists: true,
        },
        {
          type: 'modify',
          path: 'src/dynamic/{{lowerCase name}}/{{lowerCase newName}}.service.ts',
          pattern: regex,
          template: '{{properCase newName}}',
          skipIfExists: true,
        },
        {
          type: 'modify',
          path: 'src/dynamic/{{lowerCase name}}/entities/{{lowerCase newName}}.entity.ts',
          pattern: regex,
          template: '{{properCase newName}}',
          skipIfExists: true,
        },
        {
          type: 'modify',
          path: 'src/dynamic/{{lowerCase name}}/dto/create-{{lowerCase newName}}.input.ts',
          pattern: regex,
          template: '{{properCase newName}}',
          skipIfExists: true,
        },
        {
          type: 'modify',
          path: 'src/dynamic/{{lowerCase name}}/dto/update-{{lowerCase newName}}.input.ts',
          pattern: regex,
          template: '{{properCase newName}}',
          skipIfExists: true,
        },
        {
          type: 'modify',
          path: 'src/dynamic/{{lowerCase name}}/dto/filter_{{lowerCase newName}}_input.ts',
          pattern: regex,
          template: '{{properCase newName}}',
          skipIfExists: true,
        },
        // {
        //   type: 'copy',
        //   src: 'src/dynamic/test',
        //   dest: 'src/dynamic/event2/',
        // },
      ];

      return action;
    },
  });
}

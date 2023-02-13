export default function plopFunc(
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.load('plop-pack-remove');

  plop.setHelper('json', function (context) {
    const data = context.data.root.entity;
    const dataaParsed = JSON.parse(data);
    return `${dataaParsed.name}: ${dataaParsed.type}`;
  });

  plop.setActionType('removeimport', function (answers, config, plop) {
    console.log(config);
    plop
      .getActionType('modify')
      // plop.getActionType('modify').template = function (data, config) {
      //   const file = plop.renderString(config.path, data);
      //   const fileContent = plop.fs.read(file);
      //   const regex = new RegExp(
      //     `import { ${data.name}Module } from '.\/dynamic\/${data.name}\/${data.name}.module'`,
      //     'g',
      //   );
      //   const newFileContent = fileContent.replace(regex, '');
      //   plop.fs.write(file, newFileContent);
      // };
      // console.log(answers);
      .console.log(config);
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
        pattern: /(id: number\;)/g,
        template: `$1\n \n@Field({nullable: true,})\n{{{json}}} \n`,
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
    description: 'delete a file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the entity name?',
      },
    ],
    actions: [
      {
        type: 'removeimport',
        path: 'src/app.module.ts',
        val: '',
      },
      {
        type: 'modify',
        path: 'src/app.module.ts',
        pattern: /.*Test.*/g,
        template: ' ',
      },
      // {
      //   type: 'remove',
      //   path: 'src/dynamic/{{name}}',
      // },
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

export default function plopFunc(plop) {
  plop.setGenerator('component', {
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
      },
      {
        type: 'add',
        path: 'src/{{collectionName}}/{{collectionName}}.controller.ts',
        templateFile: './plop-templates/controller.hbs',
      },
      {
        type: 'add',
        path: 'src/{{collectionName}}/{{collectionName}}.service.ts',
        templateFile: './plop-templates/service.hbs',
      },
    ],
  });
}

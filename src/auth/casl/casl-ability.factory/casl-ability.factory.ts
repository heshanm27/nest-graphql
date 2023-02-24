import {
  createMongoAbility,
  AbilityBuilder,
  MongoAbility,
  InferSubjects,
} from '@casl/ability';

import { User } from '../../../user/entities/user.entity';
import { Injectable } from '@nestjs/common';

//User roles
export enum Role {
  Admin = 'admin',
  Writer = 'writer',
  Editor = 'editor',
  Reader = 'reader',
}

//Define the actions
export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

//Define the subjects
type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

@Injectable()
export class CaslPermission {
  defineAbility(user: User) {
    const { can, build } = new AbilityBuilder<
      MongoAbility<[Actions, Subjects]>
    >(createMongoAbility);

    //Define the permissions for each role
    switch (user.role) {
      case Role.Admin:
        can(Actions.Manage, 'all');
        break;
      case Role.Writer:
        can(Actions.Update, User, { id: user.id });
        can(Actions.Delete, User, { id: user.id });
        break;
      case Role.Editor:
        can(Actions.Update, User, { id: user.id });
        can(Actions.Delete, User, { id: user.id });
        break;
      case Role.Reader:
        can(Actions.Update, User, { id: user.id });
        can(Actions.Delete, User, { id: user.id });
        break;
      default:
        break;
    }

    return build({
      detectSubjectType: (type) => type.constructor as any,
    });
  }
}

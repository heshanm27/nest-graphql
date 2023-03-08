import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class AppService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  onApplicationBootstrap(signal?: string) {
    console.log('on', signal);
    console.log('onApplicationBootstrap');
  }
  onApplicationShutdown(signal?: string) {
    console.log('down', signal);
    console.log('onApplicationShutdown');
  }
}

import { Module } from '@nestjs/common';
import { SocketGateWay } from './websocket.gateway';

@Module({
  providers: [SocketGateWay],
  exports: [SocketGateWay],
})
export class WebsocketModule {}

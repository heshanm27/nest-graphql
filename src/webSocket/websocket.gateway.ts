import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnApplicationShutdown, OnApplicationBootstrap } from '@nestjs/common';

@WebSocketGateway()
export class SocketGateWay
  implements OnModuleInit, OnApplicationShutdown, OnApplicationBootstrap
{
  @WebSocketServer()
  server: Server;
  private isRestarting = false;
  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.server.emit('message', 'connected');
      console.log(socket.id);
    });
  }

  @SubscribeMessage('server-restarting')
  handleServerDown() {
    this.server.emit('server-restart', { message: 'The server is down.' });
  }
  @SubscribeMessage('server-Up')
  hadnleServerUp() {
    this.server.emit('server-up', { message: 'The server is live.' });
  }

  async onApplicationBootstrap() {
    this.hadnleServerUp();
    // await new Promise((resolve) => {
    //   this.server.once('connection', () => {
    //     resolve('connected');
    //   });
    // });
    // if (this.isRestarting) {
    //   this.server.emit('server-Up', { message: 'The server is live.' });
    // }
    // process.exit(0);
  }

  async onApplicationShutdown(signal?: string) {
    if (signal === 'SIGTERM') {
      this.isRestarting = true;
      this.server.emit('server-restarting', {});
      console.log('The server is restarting.');
      console.log('Shutting down the NestJS application.');
      process.exit(0);
    }

    // // Wait for all WebSocket clients to disconnect
    // await new Promise((resolve, reject) => {
    //   if (this.server.engine.clientsCount === 0) {
    //     resolve('no clients');
    //   } else {
    //     this.server.once('disconnect', () => {
    //       resolve('all clients disconnected');
    //     });
    //   }

    //   this.server.close((err) => {
    //     if (err) {
    //       reject(err);
    //     }
    //   });
    // });
  }
}

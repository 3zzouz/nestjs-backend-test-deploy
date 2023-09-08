import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: any): void {
    this.server.emit('message', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    console.log('client',client);
    this.server.to(room).emit('userJoined', `${client.id} joined ${room}`);
  }
  @SubscribeMessage('sendMessageInRoom')
  handleMessageInRoom(client: Socket, payload: any) {
    this.server.to(payload.room).emit('messageInRoom', { ...payload });
  }
}

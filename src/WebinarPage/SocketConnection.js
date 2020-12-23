import io from 'socket.io-client';
import { SOCKETURL } from '../GlobalConstants';


export default class SocketConnection {
    static _socketConnectionInstance = null;

    connect(token) {
        return io.connect(SOCKETURL, {
            path: '/webinar/socket.io',
            query: 'token=' + token
        });
    }

    static createConnectionInstance(token) {
        const object = new SocketConnection();
        return object.connect(token);
    }
  
    static getConnectionInstance (token) {
        if (! SocketConnection._socketConnectionInstance) {
            SocketConnection._socketConnectionInstance = SocketConnection.createConnectionInstance(token);
        }
        return SocketConnection._socketConnectionInstance;
    }

    static closeSocketConnection(){
        SocketConnection._socketConnectionInstance.close();
        SocketConnection._socketConnectionInstance = null;
    } 
}
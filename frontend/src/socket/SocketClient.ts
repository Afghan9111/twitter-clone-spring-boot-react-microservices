import SockJS from "sockjs-client";
import Stomp from "stompjs";

let socketClient: any = null;

export function connectSocket(token: string) {
  const socket = new WebSocket("ws://localhost:8085/ws");
  socketClient = Stomp.over(socket);
  socketClient.connect(
  { Authorization: `Bearer ${token}` },
  () => console.log("Connected to WebSocket"),
  (error: Error) => console.error("WebSocket connection error:", error),
);

}

export function getSocketClient() {
  return socketClient;
}

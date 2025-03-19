import { Server } from 'socket.io';

const initializeWebSockets = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"]
    },
    allowEIO3: true, // Allows older clients (like ESP32) to connect
    transports: ["websocket", "polling"], // Ensure WebSockets are used
  });
  
  io.on('connection', (socket) => {
    console.log('Esp32 Connected');
  
    // Receive Sensor Data
    socket.on('Read Sensor Data', (data) => {
      console.log("Received Sensor Data:", data);
  
      // Should send received data from mcu
      //   const interval = setInterval(() => {
      //     socket.emit("Send Sensor Data", { value: Math.random().toFixed(2) });
      // }, 2000); 
      // Broadcast to frontend
      // io.emit("Send Sensor Data", data);
    });
  
    socket.on('disconnect', () => {
      console.log('Esp32 Disconnected');
    });
  });

  console.log("WebSocket server ready");
};

export default initializeWebSockets;
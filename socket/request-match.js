const admin = require('firebase-admin');
const roomRef = admin.database().ref('rooms');
const User = require('../models/user');
const MatchQueue = require('../models/match-queue');

module.exports = function(socketIO={io:'',socket:{}}) {
  socketIO.socket.on('RANDOM_MATCH', async (playerId1) => {
    const player = await User.findById(playerId1);
    if (!player) {
      return;
    }
    console.log(playerId1);
    const playerId2 = MatchQueue.dequeue();
    if (player) {
      const newRoomRef = roomRef.push();
      const roomId = newRoomRef.key;
      const roomObj = {player1: playerId1, player2: playerId2};
      await roomRef.child(roomId).set(roomObj);
      socketIO.io.to(playerId1).emit('START_GAME', {roomId});
      socketIO.io.to(playerId2).emit('START_GAME', {roomId});      
    } else {
      MatchQueue.enqueue(playerId1);
    }
  })
}
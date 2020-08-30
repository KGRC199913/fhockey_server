const User = require('../models/user');
var queue = [];

const MatchQueue = {
  async enqueue(id) {
    let user = User.findById(id);
    if (!user) {
      throw Error('User not found!');
    }
    if (queue.includes(id)) {
      throw Error('User already in queue!');
    }
    queue.push(id);
    console.log("Enqueued!");
  },
  async dequeue() {
    if (queue.length == 0) {
      return null;
    }
    console.log("Dequeued!");
    return queue.shift();
  }
}

module.exports = MatchQueue;
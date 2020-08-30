const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");
const users = require("../routes/users");

// Get a database reference
const db = admin.database();
const usersRef = db.ref("users");

const User = {
    async findByCredential(email, password) {
        let user = null;
        await usersRef.once("value", (snapshot) => {
            snapshot.forEach((userSnapshot) => {
                if (userSnapshot.val().email === email && bcrypt.compareSync(password, userSnapshot.val().password)) {
                    user = userSnapshot.val();
                }
            });
        });
        return user;
    },
    async findById(id) {
      let user = null;
      await usersRef.once("value", (snapshot) => {
        snapshot.forEach((userSnapshot) => {
          if (userSnapshot.key === id) {
            user = userSnapshot.val();
          }
        });
      });
      return user;
    }
};

module.exports = User;
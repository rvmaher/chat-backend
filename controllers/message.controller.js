const { db } = require("../models/db");

// Save a new chat message to the database
const saveMessage = async (role, content) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO messages (role, content) VALUES (?, ?)",
      [role, content],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, role, content });
      }
    );
  });
};

// Get all messages from the database
const getAllMessages = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM messages ORDER BY timestamp ASC", [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports = { saveMessage, getAllMessages };

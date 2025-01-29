const express = require("express");
const {
  saveMessage,
  getAllMessages,
} = require("../controllers/message.controller");

const router = express.Router();

// Route for saving a new message
router.post("/chat", async (req, res) => {
  const { role, content } = req.body;
  if (!role || !content) {
    return res.status(400).json({ error: "Missing role or content" });
  }

  try {
    const message = await saveMessage(role, content);
    res.json(message);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Error saving message" });
  }
});

// Route for retrieving all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Error retrieving messages" });
  }
});

module.exports = router;

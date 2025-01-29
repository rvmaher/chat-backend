const express = require("express");
const { streamChatbotResponse } = require("../controllers/chatbot.controller");

const router = express.Router();

// Route for communicating with Ollama and streaming response
router.post("/chatbot", async (req, res) => {
  const { messages } = req.body;
  await streamChatbotResponse(messages, res);
});

module.exports = router;

const axios = require("axios");

// Ollama API URL
const OLLAMA_API_URL = "http://localhost:11434/api/chat";

// Stream response from Ollama API to frontend
const streamChatbotResponse = async (messages, res) => {
  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await axios.post(
      OLLAMA_API_URL,
      { model: "llama3.1", messages },
      { responseType: "stream" }
    );

    let fullMessage = "";

    // Stream the response from Ollama and pass it to the frontend
    response.data.on("data", (chunk) => {
      const jsonChunks = chunk.toString().trim().split("\n");
      jsonChunks.forEach((jsonChunk) => {
        if (!jsonChunk) return;
        try {
          const parsed = JSON.parse(jsonChunk);
          if (parsed.message && parsed.message.content) {
            fullMessage += parsed.message.content;
            res.write(parsed.message.content); // Stream chunk to frontend
          }
        } catch (e) {
          console.error("Error parsing chunk:", e);
        }
      });
    });

    // End the response when Ollama finishes
    response.data.on("end", () => {
      res.end();
    });

    // Handle stream errors
    response.data.on("error", (err) => {
      console.error("Error in Ollama stream:", err);
      res.status(500).json({ error: "Error in Ollama stream" });
    });
  } catch (error) {
    console.error("Error communicating with Ollama:", error);
    res.status(500).json({ error: "Error communicating with Ollama" });
  }
};

module.exports = { streamChatbotResponse };

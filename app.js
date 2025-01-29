const express = require("express");
const cors = require("cors");
const messageRoutes = require("./routes/message.route");
const chatbotRoutes = require("./routes/chatbot.route");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Use routes
app.use(messageRoutes);
app.use(chatbotRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

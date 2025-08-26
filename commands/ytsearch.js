const axios = require("axios");
const { sendMessage } = require("../handles/sendMessage");

module.exports = {
  name: "video",
  description: "Search and send YouTube videos",
  role: 1,
  author: "Clarence Mangigo",

  async execute(senderId, args, pageAccessToken) {
    try {
      const searchQuery = args.join(" ");
      if (!searchQuery) {
        return sendMessage(senderId, { text: "📌 Usage: video <search text>" }, pageAccessToken);
      }

      // Fetch video data from API with apikey
      const apiUrl = `https://kaiz-apis.gleeze.com/api/video?query=${encodeURIComponent(searchQuery)}&apikey=abded3c6-cef4-42f8-8dea-78bff82f8a59`;
      const { data: videoData } = await axios.get(apiUrl);

      const { title, author, duration, thumbnail, download_url } = videoData;

      if (!download_url) {
        return sendMessage(senderId, { text: "❌ No video found for your query." }, pageAccessToken);
      }

      // Send thumbnail first
      if (thumbnail) {
        await sendMessage(senderId, {
          attachment: {
            type: "image",
            payload: {
              url: thumbnail,
              is_reusable: true
            }
          }
        }, pageAccessToken);
      }

      // Send video info
      const message = `📹 *YouTube Video Found*\n\n🎵 Title: ${title}\n⏱ Duration: ${duration}\n\n⬇️ Sending video...`;
      await sendMessage(senderId, { text: message }, pageAccessToken);

      // Send video file
      await sendMessage(senderId, {
        attachment: {
          type: "video",
          payload: {
            url: download_url,
            is_reusable: true
          }
        }
      }, pageAccessToken);

    } catch (error) {
      console.error("Error fetching video:", error.message);
      sendMessage(senderId, { text: "⚠️ An error occurred while processing your request." }, pageAccessToken);
    }
  }
};

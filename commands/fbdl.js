const axios = require("axios");
const { sendMessage } = require("../handles/sendMessage");

module.exports = {
  name: "fbdl",
  description: "Facebook Video Downloader",
  role: 1,
  author: "Clarence Mangigo",

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(" ");

    if (!prompt) {
      return sendMessage(senderId, {
        text: `📌 Usage: fbdl [ Facebook video URL ]`
      }, pageAccessToken);
    }

    try {
      // API call with apikey
      const apiUrl = `https://kaiz-apis.gleeze.com/api/fbdl-v2?url=${encodeURIComponent(prompt)}&apikey=abded3c6-cef4-42f8-8dea-78bff82f8a59`;
      const { data } = await axios.get(apiUrl);

      if (!data || !data.download_url) {
        throw new Error("Invalid API response.");
      }

      const { author, download_url } = data;

      // Send video info first
      await sendMessage(senderId, { text: `📹 Facebook Video by: ${author}\n⬇️ Sending video...` }, pageAccessToken);

      // Send the video
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
      console.error("Error fetching Facebook video:", error.message);
      sendMessage(senderId, {
        text: `⚠️ Error: Unable to fetch the Facebook video. Please check the link and try again.`
      }, pageAccessToken);
    }
  }
};

const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage'); // Ensure the path is correct

module.exports = {
  name: 'lyrics',
  description: 'Fetch song lyrics',
  author: 'Clarence Mangigo',
  role: 1,

  async execute(senderId, args, pageAccessToken) {
    const query = args.join(' ');
    try {
      const apiUrl = `https://kaiz-apis.gleeze.com/api/lyrics?title=${encodeURIComponent(query)}&apikey=abded3c6-cef4-42f8-8dea-78bff82f8a59`;
      const response = await axios.get(apiUrl);

      const { title, thumbnail, lyrics, author } = response.data;

      if (lyrics) {
        const lyricsMessage = `🎵 Title: ${title}\n\n${lyrics}`;

        // Send lyrics in chunks
        await sendResponseInChunks(senderId, lyricsMessage, pageAccessToken);

        // Send thumbnail if available
        if (thumbnail) {
          await sendMessage(
            senderId,
            {
              attachment: {
                type: 'image',
                payload: {
                  url: thumbnail,
                  is_reusable: true,
                },
              },
            },
            pageAccessToken
          );
        }
      } else {
        await sendMessage(senderId, { text: '❌ No lyrics found for your query.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error calling Lyrics API:', error.message);
      await sendMessage(senderId, { text: '⚠️ An error occurred while fetching lyrics.' }, pageAccessToken);
    }
  },
};

async function sendResponseInChunks(senderId, text, pageAccessToken) {
  const maxMessageLength = 2000;
  if (text.length > maxMessageLength) {
    const messages = splitMessageIntoChunks(text, maxMessageLength);
    for (const message of messages) {
      await sendMessage(senderId, { text: message }, pageAccessToken);
    }
  } else {
    await sendMessage(senderId, { text }, pageAccessToken);
  }
}

function splitMessageIntoChunks(message, chunkSize) {
  const chunks = [];
  let chunk = '';
  const words = message.split(' ');

  for (const word of words) {
    if ((chunk + word).length > chunkSize) {
      chunks.push(chunk.trim());
      chunk = '';
    }
    chunk += `${word} `;
  }

  if (chunk) {
    chunks.push(chunk.trim());
  }

  return chunks;
}

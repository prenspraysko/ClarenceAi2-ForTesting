const { sendMessage } = require('../handles/sendMessage'); // Ensure the path is correct

module.exports = {
  name: 'about',
  description: 'Who is ClarenceAi?',
  author: 'Clarence',
  role: 1,
  async execute(senderId, args, pageAccessToken) {
    try {
      await sendMessage(senderId, {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: "🤖 About ClarenceAI",
                image_url: "https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/539492566_1509484970047277_7415313069498030399_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFT7GqguZ7Yk1eGotG7CEFAGWxUFRNYWa8ZbFQVE1hZr0lYwzKohce7BgWb24qvVBxI_qeQs_3qNCkI20hVDkAa&_nc_ohc=Q-2FD33x7HcQ7kNvwFh3fnJ&_nc_oc=AdnDJ4-wflbvIG7DvXMVeWnywbrT8n-T_KJYAibM7IEVTc4-eEP0BX1HpIfD4vXpoqA&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=j-d7j12X7N9rXKcLn_dL0Q&oh=00_AfUFxnxSQFE0vdnEsoFe0f8os4ljJBKlWXLKJ4MLJPqCkw&oe=68B3D27E",
                subtitle: "Clarence is your friendly, helpful personal assistant.\n\n💭 Why I named the bot ClarenceAi: The name 'Clarence' represents intelligence and adaptability. Like a reliable guide, Clarence is here to assist and make your tasks easier! 😺",
                buttons: [
                  {
                    type: "web_url",
                    url: "https://www.facebook.com/profile.php?id=61561403233164",
                    title: "Like/Follow our Page"
                  },
                  {
                    type: "web_url",
                    url: "https://www.facebook.com/frenchclarence.mangigo.9/",
                    title: "Contact Admin 1"
                  },
                  {
                    type: "web_url",
                    url: "https://www.facebook.com/Aiko.Yamamoto333",
                    title: "Contact Admin 2"
                  }
                ]
              }
            ]
          }
        }
      }, pageAccessToken);
    } catch (error) {
      console.error('Error executing about command:', error);
      await sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};

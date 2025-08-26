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
                image_url: "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/469194415_122129744432380107_208418222617849837_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGoxoss3cvA7VuRrG-_Xvl4HUe_XYfh8EMdR79dh-HwQwYcvqHRlGdDwtDNFQRDOpEg4txz3m9piP8WoHONWE44&_nc_ohc=NlsVjpOElHsQ7kNvgH0aSVA&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=AteagW_0vJe1pmFXUbfeK0g&oh=00_AYD8U7M8_UTDZ06by1XqDb33-gqRd7XnJH6KK35omgBAcw&oe=6764CF16",
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

module.exports.config = {
  name: "tsanta3D",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "TsantaBot",
  description: "generate simple  image 3D",
  usages: "imagine 3D [promt]",
  cooldown: 160,
  
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const { threadID, messageID } = event;
  const query = args.join(" ");
  const time = new Date();
  const timestamp = time.toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_tid.png`;
  if (!query) return api.sendMessage("Simple Génération images 3D \n\n ▪︎Ex: tsanta3D Cute girl \n\n 🌐 bit.ly/tsantabot", threadID, messageID);
    api.sendMessage(`⏰ Attendez, Je vais imaginer en 3D : \n《${query}》\n\n 🌐 bit.ly/tsantabot `, event.threadID, event.messageID);
  const poli = (await axios.get(`https://ai-tools.replit.app/render?prompt=${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
    setTimeout(function() {
  api.sendMessage({
    body: "✅ TsantaBot: Voici votre image",
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path));
    }, 5000);
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'recup-code',
  description: 'Donne le code de récupération enregistré',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (config.owner === message.author.id || config.buyer === message.author.id) {
      const storedCode = db.get('code');
      if (!storedCode) {
        const code = generateCode(7);
        const dmChannel = await message.author.createDM();
        dmChannel.send({
          content: `Le code qui permettra de récupérer votre bot en cas de perte de compte :\n\`${code}\`\n Ce code est à garder en dehors de Discord.`,
        })
        .then(async (message) => {
          await db.set('code', code);
        })
        .catch((error) => {
          console.error(`Erreur lors de l'envoi du message privé : ${error}`);
          message.reply(`Il y a eu une erreur lors de l'envoi du message privé. Veuillez réessayer ou contacter le support.`);
        });
        
        message.reply('Le code a été envoyé en message privé.');
      } else {
        message.reply({ content: "Un code a déjà été généré (si vous avez perdu ce code, merci de créer un ticket sur le support).", allowedMentions: { repliedUser: false } });
      }
    }
  }
};

function generateCode(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const config = require('../../config.json')
module.exports = {
  name: 'autosupport',
  description: 'Envoie un embed pour un support idéal.',
  usage: 'autosupport',

  go: async (client,db,message,args,prefix,color,footer,interaction) => {
   
    const selectMenu = new MessageSelectMenu()
      .setCustomId('autosupport') 
      .setPlaceholder('Cloud\'s Bot - AutoSupport') 
      .addOptions([
        {
            label: 'Token',
            emoji:'1️⃣',
            value: 'autosupport-token',
        },
        {
            label: 'Code-recup',
            emoji:'2️⃣',
            value: 'autosupport-code',
        },
        {
            label: 'Bot gratuit',
            emoji:'3️⃣',
            value: 'autosupport-bot',
        },
        {
          label: 'Hébergeur',
          emoji: '4️⃣',
          value: 'autosupport-hebergeur',
        },
          {
          label: 'Prix',
          emoji: '5️⃣',
          value: 'autosupport-prix',
        },
      {
      label: 'Développeur',
      emoji: '5️⃣',
      value: 'autosupport-developpeur',
    },
      ]);
    
    const actionRow = new MessageActionRow().addComponents(selectMenu);

const aceille = new MessageEmbed()
.setTitle('Cloud\'s AutoSupport')
.setDescription(`
1 | Mon token est protégé.\n
2 | Code de récupération en cas de perte de compte.\n
3 | Les bots sont gratuits ?.\n
4 | L'hebergeur est t'il asser puissant ?.\n
5 | Le bot sera vendue a combien ?.\n
6 | Les développeurs`)
.setImage('https://cdn.discordapp.com/attachments/1082458099421544458/1084527775710461992/sss.png')
.setColor(color)
.setFooter(`AutoSupport - Cloud's`)
    const initialMessage = await message.reply({
      content: null,
      allowedMentions: { repliedUser: false },
      components: [actionRow],
      embeds: [aceille]
    });
    
  
    client.on('interactionCreate', async interaction => {
      if (!interaction.isSelectMenu()) return; 
    
      if (interaction.customId === 'autosupport') {
        const selectedValue = interaction.values[0]; 
        
        if (selectedValue === 'autosupport-token') {
            interaction.reply({ content: 'Votre token est sécurisé, aucune fuite n\'est possible. Si vous n\'avez pas confiance ou avez d\'autres questions, merci d\'aller en ticket sur le support.', ephemeral: true });
        } else if (selectedValue === 'autosupport-code') {
            interaction.reply({ content: 'Pour avoir votre code de récupération, faites +recup-code, allez en MP et gardez-le en dehors de Discord.', ephemeral: true });
        } else if (selectedValue === 'autosupport-bot') {
            interaction.reply({ content: 'Nous ne donnons pas de bot gratuit.', ephemeral: true }); 
        } else if  (selectedValue === 'autosupport-hebergeur'){
            interaction.reply({ content: 'Oui l\'hébergeur est assez puissant pour plus de 300 bot sans soucis.', ephemeral: true});
            } else if  (selectedValue === 'autosupport-prix'){
              interaction.reply({ content: 'Le bot sera à 2.50€/mois.', ephemeral: true});
            } else if  (selectedValue === 'autosupport-developpeur'){
              interaction.reply({ content: 'Les développeur on accès a un panel pour changer les paramettre de votre bot.', ephemeral: true});
        } else {
        
          await interaction.update({
            content: `Indisponible pour le moment: "${selectedValue}".`,
            components: [actionRow],
            embed: [aceille],
          });
        }
      }
    });
  }
};

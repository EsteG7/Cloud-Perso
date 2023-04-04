const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const config = require('../../config.json')
module.exports = {
  name: 'changlog',
  description: 'Envoie un les dernier mise a jour du bot.',
  usage: 'Changlog',

  go: async (client,db,message,args,prefix,footer,color,interaction) => {
  
    if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
    const selectMenu = new MessageSelectMenu()
      .setCustomId('changelog') 
      .setPlaceholder('Cloud\'s Bot - Changelog') 
      .addOptions([
        {
            label: '| Acceil',
            emoji:'📚',
            value: 'changelog-acl',
        },
        {
          label: '| Page 1',
          emoji: '1️⃣',
          value: 'changelog-page-1',
        },
      ]);
    
    const actionRow = new MessageActionRow().addComponents(selectMenu);

const aceille = new MessageEmbed()
.setTitle('Cloud\'s Bot Gestion')
.setDescription('Merci de regarde le select menu')
.setColor(color)
.setFooter(`Changelog`)
    const initialMessage = await message.reply({
      content: null,
      allowedMentions: { repliedUser: false },
      components: [actionRow],
      embeds: [aceille]
    });
    
  
    client.on('interactionCreate', async interaction => {
      if (!interaction.isSelectMenu()) return; 
    
      if (interaction.customId === 'changelog') {
        const selectedValue = interaction.values[0]; 
      if (selectedValue === 'changelog-page-1') {
          
          const embed = new MessageEmbed()
            .setTitle('Changelog Page 1')
            .setDescription("Pas encore sortie le bot zebi")
            .setColor(color)
            .setFooter(footer);
          
          await interaction.update({
            content: null,
            embeds: [embed],
            components: [actionRow],
          });
        } else if (selectedValue === 'changelog-acl') {
            await interaction.update({
                content: null,
                embeds: [aceille],
                components: [actionRow],
            })
        } else {
        
          await interaction.update({
            content: `Pas encore disponible : "${selectedValue}".`,
            components: [actionRow],
            embed: [aceille],
          });
        }
      }
    });
  }}
};

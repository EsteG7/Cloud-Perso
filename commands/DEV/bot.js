const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const config = require('../../config.json')
module.exports = {
  name: 'bot',
  description: 'Envoie un embed avec un select menu',
  usage: 'bot',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    
    const selectMenu = new MessageSelectMenu()
      .setCustomId('bot-bot') 
      .setPlaceholder('Cloud\'s Bot') 
      .addOptions([
        {
            label: '| Acceille',
            emoji:'📚',
            value: 'bot-acl',
        },
        {
          label: '| Créateur',
          emoji: '🛡',
          value: 'bot-createur',
        },
        {
            label: '| Bot Information',
            emoji: '♟',
            value: 'bot-botinfo',
          },
          {
            label: '| Support',
            emoji: '🎈',
            value: 'bot-support',
          },
      ]);
    
    const actionRow = new MessageActionRow().addComponents(selectMenu);

const aceille = new MessageEmbed()
.setTitle('Cloud\'s Bot Gestion')
.setDescription('Merci de regarde le select menu')
.setColor(color)
.setImage('https://cdn.discordapp.com/attachments/1083780594372198460/1084090849530490880/LogoBanner.png')
.setFooter(`Le propiaitaire du bot est ${client.users.cache.get(config.buyer).tag} `)
    const initialMessage = await message.reply({
      content: 'Cloud\'s bot dev en cour...',
      allowedMentions: { repliedUser: false },
      components: [actionRow],
      embeds: [aceille]
    });
    
  
    client.on('interactionCreate', async interaction => {
      if (!interaction.isSelectMenu()) return; 
    
      if (interaction.customId === 'bot-bot') {
        const selectedValue = interaction.values[0]; 

        if (selectedValue === 'bot-createur') {
          
          const embed = new MessageEmbed()
            .setTitle('Créateurs')
            .setDescription(`
            [Sown#0001](${config.support}) | Développeur : Discord JS/Csharp/C++
            & 
            [Atoya#9098](${config.support}) | Développeur : Discord JS/Python/Aoi.js
            `)
            .setColor(color)
            .setFooter(`Page Créateur - ${footer}`);
          
          await interaction.update({
            content: null,
            embeds: [embed],
            components: [actionRow],
          });
        } else if (selectedValue === 'bot-botinfo') {
          
          const embed = new MessageEmbed()
            .setTitle('Information bot')
            .setDescription(`
            **Nom du bot:** \`${client.user.tag}\`
            **prefix:** \`${prefix}\`
            **Color:** \`${color}\`
            **Démarre depuis le**: \`${client.readyAt.toLocaleString()}\`
            **Buyer:** <@${config.buyer}> (\`${config.buyer}\`/ \`${client.users.cache.get(config.buyer).tag}\`)
            **Abonnement**: \`Bot Perso\`
            **Support url:** [[Clique ici]](${config.support})
            **footer:** \`${footer}\`
            `)
            .setColor(color)
            .setFooter(`Page Infomation - ${footer}`);
          
          await interaction.update({
            content: null,
            embeds: [embed],
            components: [actionRow],
          });
        } else if (selectedValue === 'bot-support') {
          
            const embed = new MessageEmbed()
              .setTitle('Aide')
              .setDescription(`Bonjour ! Si vous avez besoin d'aide avec cloud's ou si vous avez des questions, n'hésitez pas à rejoindre notre serveur Discord de support. Vous pouvez y poser vos questions et discuter avec notre communauté. Voici le lien : [[Cloud's Support]](${config.support}). Nous serons ravis de vous aider !`)
              .setColor(color)
              .setFooter(`Page Aide - ${footer}`);
            
            await interaction.update({
              content: null,
              embeds: [embed],
              components: [actionRow],
            });
        } else if (selectedValue === 'bot-acl') {
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
  }
};

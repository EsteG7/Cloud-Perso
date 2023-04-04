
const Discord = require('discord.js')
const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'dev-panel',
    usage: 'dev-panel',
    description: 'Dev-panel [Only SOWN & ATOYA]',
    go: async (client, db, message, args,color, prefix, footer) => {

        if (config.sown === message.author.id || config.atoya === message.author.id === true ) {
        const selectMenu = new MessageSelectMenu()
        .setCustomId('developpeur-panel')
        .setPlaceholder(`Développeur Panel - ${message.author.tag}`)
        .setDisabled(false)
        .addOptions([
          {
            label: "Token Bot",
            value: "développeur-panel-token"
          },
          {
            label: "Buyer Bot",
            value: "développeur-panel-buyer"
          },
          {
            label: "All Information Bot",
            value: "développeur-panel-aib"
          },
        ]);

     
      const row = new MessageActionRow().addComponents(selectMenu);

      const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Dévloppeur panel')
        .setDescription(`Bienvenue dans le panel **${message.author.username}** je te conseille de regarder le select menu pour avoir les information bot`)

message.reply({embeds: [embed] ,  components: [row],allowedMentions: { repliedUser: false }})

client.on('interactionCreate', async interaction => {
    if (message.author.id !== interaction.user.id) {
      return interaction.reply({ content: '👮‍♂️ Vous n\'avez pas les droits nécessaires pour exécuter cette commande.', ephemeral: true });
    }
    if (!interaction.isSelectMenu()) return; 
  
    if (interaction.customId === 'developpeur-panel') {
      const selectedValue = interaction.values[0]; 
      
      if (selectedValue === 'développeur-panel-buyer') {
        
        const embed = new MessageEmbed()
          .setTitle('Voici le Buyer du bot')
          .setDescription(`Buyer : ${client.users.cache.get(config.buyer).tag} | (${config.buyer})`)
          .setColor(color)
          .setFooter(`Panel Développeur - ${footer}`);
    interaction.reply({ content: null, ephemeral: true , embeds: [embed]}); 

       } else if (selectedValue === 'développeur-panel-aib') {
        
        const embed = new MessageEmbed()
          .setTitle('Voici le token du bot')
          .setDescription(`
          Token : ||${config.token}||
          Buyer: ${client.users.cache.get(config.buyer).tag} | (${config.buyer})`)
          .setColor(color)
          .setFooter(`Panel Développeur - ${footer}`);
    interaction.reply({ content: null, ephemeral: true , embeds: [embed]}); 

} else if (selectedValue === 'développeur-panel-token') {
        
    const embed = new MessageEmbed()
      .setTitle('Voici le token du bot')
      .setDescription(`Token : ||${config.token}||`)
      .setColor(color)
      .setFooter(`Panel Développeur - ${footer}`);
interaction.reply({ content: null, ephemeral: true , embeds: [embed]})
    }}})
    }}}
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
  name: 'vc',
  aliases: ["vocalinfo"],
  description: 'Affiche les stats vocales du serveur',
  go: async (client, db, message, args, prefix, color, footer, interaction) => {
    if (!message.guild) return message.reply("cette commande ne peut être utilisée que dans un serveur.");

    const voiceChannels = message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE');

    let totalMembersInVoice = 0;
    let totalChannels = 0;
    let totalListeners = 0;
    let totalMuted = 0;
    let totalDeafened = 0;
    let totalScreenSharing = 0;

    voiceChannels.forEach(channel => {
      const channelMembers = channel.members.size;
      const channelListeners = channelMembers - channel.members.filter(member => member.user.bot).size;
      const channelMuted = channel.members.filter(member => member.voice.mute).size;
      const channelDeafened = channel.members.filter(member => member.voice.deaf).size;
      const channelScreenSharing = channel.members.filter(member => member.presence.activities.some(activity => activity.type === 'VIDEO' && activity.applicationID)).size;

      totalMembersInVoice += channelMembers;
      totalListeners += channelListeners;
      totalMuted += channelMuted;
      totalDeafened += channelDeafened;
      totalScreenSharing += channelScreenSharing;
      totalChannels++;
    });

    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`Stats Vocales pour ${message.guild.name}`)
      .addField('Membres en vocal :', `${totalMembersInVoice}`, true)
      .addField('Membres en écoute :',` ${totalListeners}`, true)
      .addField('Muet :', `${totalMuted}/${totalMembersInVoice}`, true)
      .addField('Sourdine :', `${totalDeafened}/${totalMembersInVoice}`, true)
      .addField('Partage :', `${totalScreenSharing}/${totalMembersInVoice}`, true)
      .setFooter(footer);

    message.reply({ embeds: [embed]  , allowedMentions: { repliedUser: false }});
  },
};

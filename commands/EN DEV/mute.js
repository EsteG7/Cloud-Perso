module.exports = {
    name: 'mute',
    description: 'Mute un membre',
    usage: 'mute <mention/id> [raison]',
    
    go: async (client, db, message, args, prefix, color, footer, interaction) => {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      let reason = args.slice(1).join(' ');
    
      if (!member) {
        return message.reply({ content: 'Veuillez mentionner un membre à mute.', allowedMentions: { repliedUser: false } });
      }
    
      if (member.roles.highest.position >= message.member.roles.highest.position) {
        return message.reply({ content: 'Vous ne pouvez pas mutece membre car il a un rôle supérieur ou égal au vôtre.', allowedMentions: { repliedUser: false } });
      }
    
      if (!reason) {
        reason = 'Aucune raison spécifiée';
      }
  
      await member.timeout({ timeout: '86400000ms', reason: reason });
      message.reply({ content: `**${member.user.tag}** a été mute pour la raison suivante : ${reason}`, allowedMentions: { repliedUser: false }});
    }
  };
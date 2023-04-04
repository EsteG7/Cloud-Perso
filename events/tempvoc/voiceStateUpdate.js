const Discord = require("discord.js");

module.exports = async (newState, oldState, client, db, message, owner, Whitelist, color, footer) => {
  if (!oldState || !newState) return;
  if (!newState.guild || !newState.member) return;

  const categorytemp = db.get(`categorytempvoc_${newState.guild.id}`);
  const salontempvoc = db.get(`salontempvoc_${newState.guild.id}`);

  if (db.get(`tempvocsettings_${newState.guild.id}`) === true) {
    // REJOINS
    if (!oldState.channel && newState.channelId === salontempvoc) {
      const category = newState.guild.channels.cache.get(categorytemp);
      if (!category) return;

      newState.guild.channels.create(`⏱️・${newState.member.user.username}`, {
        type: 'GUILD_VOICE',
        parent: category,
        reason: `Salon temporaire`,
        permissionOverwrites: [
          {
            id: newState.member.id,
            allow: ['MOVE_MEMBERS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MANAGE_CHANNELS', 'VIEW_CHANNEL', 'USE_VAD', 'MANAGE_ROLES', 'STREAM', 'CONNECT', 'SPEAK']
          },
          {
            id: newState.guild.id,
            allow: ['CONNECT', 'SPEAK', 'STREAM', 'USE_VAD'],
          }
        ]
      }).then((funny) => {
        newState.member.voice.setChannel(funny);
        db.set(`tempvoc_${newState.guild.id}_${newState.member.id}`, funny.id);
      });
    }

    //QUITTE 
    const tempvoc = db.get(`tempvoc_${newState.guild.id}_${oldState.member.id}`);
    if (tempvoc && oldState.channelId === tempvoc) {
      if (oldState.channelId === salontempvoc) return;
      if (oldState.channel.members.size === 0) {
        oldState.channel.delete({ reason: `Salon temporaire - Plus personne dans le salon` });
        db.delete(`tempvoc_${newState.guild.id}_${oldState.member.id}`);
      }
    }
  }
}

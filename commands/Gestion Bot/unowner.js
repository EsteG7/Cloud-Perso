
const config = require('../../config.json')

module.exports = {
    name: 'unowner',
    aliases: ["owner-remove"],
    go: async (client, db, message, args, prefix, color, footer) => {
        if (client.config.owner.includes(message.author.id) || config.sown === message.author.id || config.atoya === message.author.id) {

let member = client.users.cache.get(message.author.id);
if (args[0]) member = client.users.cache.get(args[0]);
else return message.reply({ allowedMentions: { repliedUser: false }, content: `Aucun membre trouvé pour \`${args[0] || "❌"}\`` });
if (message.mentions.members.first()) member = client.users.cache.get(message.mentions.members.first().id);
if (!member) return message.reply({ allowedMentions: { repliedUser: false }, content: `Aucun membre trouvé pour \`${args[0] || "❌"}\`` });
if (db.get(`owner_${client.user.id}_${member.id}`) === null) return message.reply({ allowedMentions: { repliedUser: false }, content: `${member.username} n'est pas owner` });
await db.delete(`owner_${client.user.id}_${member.id}`)
return message.reply({ allowedMentions: { repliedUser: false }, content: `${member.username} n'est plus owner` })
        }}}
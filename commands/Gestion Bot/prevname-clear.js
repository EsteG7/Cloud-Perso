module.exports = {
    name: 'clear-prevname',
    usage: 'setstatus [ton status]',
    description: `Clear les prevnames`,
    
    go: async (client, db, message, args, prefix, color, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
        
const data = db.all().filter(data => data.ID.startsWith(`prevname_${message.author.id}`));
let clear = 0;
for (let i = 0; i < data.length; i++) {
    db.delete(data[i].ID);
    clear++;
};

return message.reply({ allowedMentions: { repliedUser: false }, content: `${data.length ? data.length : 0} ${data.length > 1 ? "pseudo ont été supprimées" : "pseudo a été supprimée"} de votre prevname` });
        }}}
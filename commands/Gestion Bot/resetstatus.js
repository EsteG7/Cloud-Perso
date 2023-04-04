module.exports = {
    name: 'reset',
    usage: 'setstatus [ton status]',
    description: `changer le status du bot`,
    
    go: async (client, db, message, args, prefix, color, interaction) => {
        if (db.get(`owner_${client.user.id}_${message.author.id}`) === true) {
    
        
        if (args[0] === "bl") {
               
            const data = await db.all().filter(data => data.ID.startsWith(`bl_${client.user.id}`));
            let clear = 0;
            for (let i = 0; i < data.length; i++) {
                db.delete(data[i].ID);
                clear++;
            };        return message.reply({ allowedMentions: { repliedUser: false }, content: `${data.length ? data.length : 0} ${data.length > 1 ? "personnes ont été supprimées " : "personne a été supprimée"} de la blacklist` });
    } if (args[0] == "owner")
    {

     

        const data = await db.all().filter(data => data.ID.startsWith(`owner_${client.user.id}`));
        let clear = 0;
        for (let i = 0; i < data.length; i++) {
            db.delete(data[i].ID);
            clear++;
        };
        return message.reply({ allowedMentions: { repliedUser: false }, content: `${data.length ? data.length : 0} ${data.length > 1 ? "personnes ont été supprimées " : "personne a été supprimée"} des owners` });

       

    }
          }
  }}
  
  
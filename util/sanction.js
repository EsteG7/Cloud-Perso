const axios = require("axios");
const header = require("./headers.js");
const logs = require("./logs.js");
const sanction = async (client, db, obj) => {
    const guild = obj.guild;
    if (!guild) return;
    const head = header(client.token);;
    const base = `https://discord.com/api/v9/guilds/${guild.id}`;

    if (obj.sanction === "ban") {
        return axios({
            url: `${base}/bans/${obj.executor}`,
            method: 'PUT',
            headers: head,
            data: {
                delete_message_days: '1',
                reason: 'Antiraid'
            }
        })
    } else if (obj.sanction === "kick") {
        return axios({
            url: `${base}/members/${obj.executor}`,
            method: 'DELETE',
            headers: head,
            data: {
                reason: 'Antiraid'
            }
        })
    } else if (obj.sanction === "derank") {
        return guild.members.cache.get(obj.executor).roles.set([], `Antiraid`);

    }

    const user = await axios({
        url: `${base}/members/${obj.executor}`,
        method: 'GET',
        headers: head,
    });
    const roles = user.data.roles;
    roles.forEach(async m => {
       await axios({
            url: `${base}/members/${obj.executor}/roles/${m}`,
            method: 'DELETE',
            headers: head,
            data: {
                reason: 'Antiraid'
            }
        }).catch(() => {
            return logs(obj3);
       })
    });
    if(roles.lenght < 1) return logs(obj2);
    else return logs(obj3);
};
module.exports = sanction
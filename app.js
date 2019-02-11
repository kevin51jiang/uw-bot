const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const log = require('loglevel');


client.on('ready', () => {
    log.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let currentHour = (new Date).getHours();

    log.debug("Message received: " + msg.toString(), "|Current hour: " + currentHour);
    if(msg.member.roles.some(role => 
            role.name === config.roleNames.restricted) 
        && !msg.member.roles.some(role =>
                role.name === config.roleNames.bot)
        && isInAllowedChannel(msg)
        && currentHour > config.restriction.low - 1 
        && currentHour < config.restriction.high ) {

            msg.delete()
                .then(msg => log.info(`Deleted message from ${msg.author.username}`))
                .catch(msg => log.error("Error occured while deleting message with id " + msg.id));
            
                let reply = "Hey there " + msg.member.displayName  + `, you seem to have the ${config.roleNames.restricted} role, which means you can't talk. See you at ${config.restriction.high}:00!`;
                log.info("Sent message: " + reply + "|Channel id: " + msg.channel.id);
                msg.channel.send(reply);
            
    }
});

isInAllowedChannel = (msg) => {
    let inAllowedChannel = false;
    for(i = 0 ; i < config.allowedChannelIds.length; i++) {
        if (config.allowedChannelIds[i] === msg.channel.id) {
            inAllowedChannel = true;
            break;
        }
    }

    return inAllowedChannel;
};

log.enableAll();
client.login(config.token);
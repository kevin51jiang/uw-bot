const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
import * as log from 'loglevel';


client.on('ready', () => {
    log.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    log.debug("Message received: " + message.toString());
    if(message.member.roles.some(role => 
            role.name === config.roleNames.restricted) 
        && !message.member.roles.some(role =>
            role.name === config.roleNames.bot)) {

        message.channel.send('Pay ur taxes pleb');
    }
});

client.login(config.token);
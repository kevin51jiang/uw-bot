const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    
    if(message.member.roles.some(role => 
            role.name === config.roleNames.restricted) 
        && !message.member.roles.some(role =>
            role.name === config.roleNames.bot)) {

        message.channel.send('Pay ur taxes pleb');
    }
});

client.login(config.token);
module.exports = {
        name: 'name',
        description: 'I am an example commad',
        args: true,
        usage: '<@user> <messaage>',
        guildOnly: true,
        ownerOnly: true,
        cooldown: 5,
        aliases: ['ex', 'eg'],
        async execute(message, args, client) {
                message.delete()
                const Schema = require('../../models/Schema');
                const mongoose = require('mongoose');
                const Discord = require('discord.js');
                const ms = require("ms");

                //Code here
        }
};
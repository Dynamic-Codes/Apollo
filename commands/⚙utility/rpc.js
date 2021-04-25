module.exports = {
    name: 'rpc',
    description: 'Owner Only.',
    guildOnly: true,
    ownerOnly: true,
    execute(message, args, client) {
        const RPC = require("discord-rpc")
        const rpc = new RPC.Client({
            transport: "ipc"
        })
        
        rpc.on("ready", async () => {
            rpc.setActivity({
                details: "Matching with:",
                state: "Honey!",
                startTimestamp: new Date(),
                largeImageKey: "main",
                largeImageText: "Dynamic#2744",
                smallImageKey: "secondary",
                smallImageText: "^ ❀↷oqhixlism#8581",
                partyMax: 2,
                partySize: 2,
                partyId: "ae488379-351d-4a4f-ad32-2b9b01c91657",
                joinSecret: "MTI4NzM0OjFpMmhuZToxMjMxMjM= "
            })
            console.log("Rich Presence Drivers: CONNECTED!")
        })
        
        rpc.login({
            clientId: "833353624762581023"
        })
    }
};
const Plugin = require('../plugin');

module.exports = new Plugin({
    name: 'Server Count',
    author: 'Joe 🎸#7070',
    description: "Adds the number of servers you're currently in right above the list.",
    color: 'indigo',

    load: async function() {
        const friendsClass = window.findModule('friendsOnline').friendsOnline;
        window.monkeyPatch(window.findModule('getGuilds'), 'getGuilds', function(b) {
            let og = b.callOriginalMethod(b.methodArguments);

            let guildCount = document.getElementById('ed_guild_count');
            if (guildCount) {
                guildCount.innerHTML = Object.keys(og).length + ' Servers';
                return og;
            }
            let friendCount = document.querySelector(`.${friendsClass}`);
            if (friendCount) {
                guildCount = document.createElement('div');
                guildCount.className = friendsClass;
                guildCount.innerHTML = Object.keys(og).length + ' Servers';
                guildCount.id = 'ed_guild_count';
                try { friendCount.parentElement.insertBefore(guildCount, friendCount.nextSibling); } catch(err) { module.exports.error(err); }
            }
            return og;
        })
    },
    unload: function() {
        let m = window.findModule('getGuilds').getGuilds;
        if (m && m.__monkeyPatched)
            m.unpatch();
    }
});

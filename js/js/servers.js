window.onload = servers;

function servers() {
    var request = new XMLHttpRequest();

    request.onload = function() {
        var data = JSON.parse(request.responseText);

        for (var id in data) {
            var server = data[id].status;

            if (server != null && document.getElementById(id) != null) {
                var motd = document.getElementById(id + "_motd");
                var favicon = document.getElementById(id + "_motd");
                try {
                    if (document.getElementById(id + "_motd").dataset.motd !== server.description) {
                        document.getElementById(id + "_favicon").src = "https://api.year4000.net/servers/" + id + "?favicon&time=" + new Date().getTime();
                        document.getElementById(id + "_motd").innerHTML = color(server.description);
                        document.getElementById(id + "_motd").dataset.motd = server.description;
                    }

                    if (document.getElementById(id + "_online").innerHTML != server.players.online) {
                        document.getElementById(id + "_online").innerHTML = server.players.online;

                        // Pull in players
                        pullPlayers(id);
                    }

                    document.getElementById(id + "_max").innerHTML = server.players.max;
                } catch(err) {
                    // server offline
                }
            }
        }

        setTimeout(servers, 4000);
    };

    request.open("GET", "https://api.year4000.net/servers?compact", true);
    request.send();
}

function pullPlayers(id) {
    var playerRequest = new XMLHttpRequest();

    playerRequest.onload = function() {
        var playerData = JSON.parse(playerRequest.responseText);
        var players = "";
        
        if (playerData.status != null) {
            for (var i in playerData.status.players.sample) {
                var player = playerData.status.players.sample[i];
                players += "<a href='/player/" + player.name + "' title='" + player.name + "'>";
                players += "<img src='https://api.year4000.net/avatar/" + player.name + "/40?hat' /> ";
                players += "</a>";
            }
        }

        document.getElementById(id + "_players").innerHTML = players;
    };

    playerRequest.open("GET", "https://api.year4000.net/servers/" + id + "?compact", true);
    playerRequest.send();
}

function color(string) {
    var newString = "<span style='color:#ccc;'>" + string + "</span>";

    while (newString.contains("§")) {
        newString = newString.replace("§a", "</span><span style='color:#5f5;'>");
        newString = newString.replace("§b", "</span><span style='color:#5ff;'>");
        newString = newString.replace("§c", "</span><span style='color:#f55;'>");
        newString = newString.replace("§d", "</span><span style='color:#f5f;'>");
        newString = newString.replace("§e", "</span><span style='color:#ff5;'>");
        newString = newString.replace("§f", "</span><span style='color:#fff;'>");
        newString = newString.replace("§0", "</span><span style='color:#000;'>");
        newString = newString.replace("§1", "</span><span style='color:#00a;'>");
        newString = newString.replace("§2", "</span><span style='color:#0a0;'>");
        newString = newString.replace("§3", "</span><span style='color:#0aa;'>");
        newString = newString.replace("§4", "</span><span style='color:#a00;'>");
        newString = newString.replace("§5", "</span><span style='color:#a0a;'>");
        newString = newString.replace("§6", "</span><span style='color:#fa0;'>");
        newString = newString.replace("§7", "</span><span style='color:#aaa;'>");
        newString = newString.replace("§8", "</span><span style='color:#555;'>");
        newString = newString.replace("§9", "</span><span style='color:#55f;'>");
        newString = newString.replace("§k", "</span><span style='color:#fff;'>");
        newString = newString.replace("§o", "</span><span style='color:#fff;'>");
        newString = newString.replace("§l", "</span><span style='color:#fff;'>");
        newString = newString.replace("§m", "</span><span style='color:#fff;'>");
        newString = newString.replace("§r", "</span><span style='color:#fff;'>");
    }

    return newString;
}
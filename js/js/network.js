window.onload = update;
var count_done = true;
var network_done = true;

function update() {
    if (count_done && network_done) {
        count_done = false;
        network_done = false;

        network();
        players();

        setTimeout(update, 2000);
    }
    else {
        setTimeout(update, 500);
    }
}

function network() {
    var request = new XMLHttpRequest();

    request.onload = function() {
        var results = JSON.parse(request.responseText);
        var players = "";

        for (var name in results.network) {
            name = results.network[name];
            players += "<a href='/player/" + name + "' title='" + name + "'>";
            players += "<img src='https://api.year4000.net/avatar/" + name + "/40?hat' /> ";
            players += "</a>";
        }

        document.getElementById("network_players").innerHTML = players;
        network_done = true;
    };

    request.open("GET", "https://api.year4000.net/player-list?compact", true);
    request.send();
}

function players() {
    var request = new XMLHttpRequest();

    request.onload = function() {
        var data = JSON.parse(request.responseText);
        document.getElementById("playerCount").innerHTML = data.network.online;
        document.getElementById("maxPlayerCount").innerHTML = data.network.max;
        count_done = true;
    };

    request.open("GET", "https://api.year4000.net/player-count?compact", true);
    request.send();
}
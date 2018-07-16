var focus = true;
window.onload = serverCount;

window.onblur = function() {
    focus = false;
};

window.onfocus = function() {
    focus = true;
};

function serverCount() {
    if (!focus) {
        setTimeout(serverCount, 1000);
        return;
    }

    var request = new XMLHttpRequest();

    request.onload = function() {
        var data = JSON.parse(request.responseText);
        var count = data.network.online;
        var max = data.network.max;

        try {
            document.getElementById("playerCount").innerHTML = count;
            document.getElementById("maxPlayerCount").innerHTML = max;
        } catch (err) {
            // network offline        
        }

        setTimeout(serverCount, 2000);
    };

    request.open("GET", "https://api.year4000.net/player-count?compact", true);
    request.send();
}

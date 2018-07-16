var page = parseInt(document.getElementById("players").dataset.page);
var scroll = 1;
var offset = page - 1;
var running = false;

var loadContent = function() {
    var load = (document.body.clientHeight - window.pageYOffset) - window.innerHeight < 20;
    
    if (load && !running) {
        document.getElementById("loading").style.display = "block";
        running = true;
        updateContent();
    }
    else {
        var section = document.body.clientHeight / scroll;
        var height = Math.floor(window.pageYOffset / section) + offset;
        window.history.pushState({}, "null", "/players/" + height);
    }
};

var updateContent = function() {
    var request = new XMLHttpRequest();

    request.onload = function() {
        var results = JSON.parse(request.responseText);
        var players = document.getElementById("players").innerHTML;
        var counter = results.accounts.length * (page - 1);

        document.getElementById("total_players").innerHTML = results.size;
        document.getElementById("new_players").innerHTML = results.recent;
        document.getElementById("total_logins").innerHTML = results.active;
        document.getElementById("total_returns").innerHTML = results.active - results.recent;

        for (var i = 0; i < results.accounts.length; i++) {
            var account = results.accounts[i];
            var user = account.minecraft.username;

            players += "<li id='" + user + "' class='players " + (counter % 2 == 0 ? 'odd' : '') + "'>";
            players += "<a href='/player/" + user + "'>";
            players += "<h2>" + (++counter) + "</h2>";
            players += "<img src='//api.year4000.net/avatar/" + user + "/20?hat' width='20' height='20' alt='" + user + "'>";
            players += "<h3>" + user + "</h3>";
            players += "<h3>Joined: " + moment(account.first_login, "X").fromNow() + "</h3>";
            players += "<h3>Last Login: " + moment(account.last_login, "X").fromNow() + "</h3>";
            players += "</a>";
            players += "</li>";
        }

        document.getElementById("players").innerHTML = players;
        document.getElementById("loading").style.display = "none";
        page++;
        scroll++;
        running = false;
    };

    request.open("GET", "https://api.year4000.net/accounts?compact&page=" + page, true);
    request.send();
};

document.onscroll = loadContent;
window.onscroll = loadContent;

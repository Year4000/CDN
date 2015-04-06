var CONST = {
    "COOKIE_MAX": 365
};

/** A get request that run a function when retrieved */
var getRequest = function(url, results) {
    var request = new XMLHttpRequest();

    request.onload = function() {
        var response = null, error = null;

        try {
            response = JSON.parse(request.responseText);
        }
        catch (e) {
            error = e;
        }
        finally {
            results(response, error);
        }
    };

    request.open("GET", url, true);
    request.send();
    return request;
};

/** Clear out all the child from the parent node */
function clearTree(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

/** Get query parameter */
function getQuery(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/** Replace mc color codes with the css class */
function color(string) {
    var newString = "<span class='mc-gray'>" + string + "</span>";

    while (newString.contains("§")) {
        newString = newString.replace("§a", "</span><span class='mc-green'>");
        newString = newString.replace("§b", "</span><span class='mc-light-green'>");
        newString = newString.replace("§c", "</span><span class='mc-red'>");
        newString = newString.replace("§d", "</span><span class='mc-light-purple'>");
        newString = newString.replace("§e", "</span><span class='mc-yellow'>");
        newString = newString.replace("§f", "</span><span class='mc-white'>");
        newString = newString.replace("§0", "</span><span class='mc-black'>");
        newString = newString.replace("§1", "</span><span class='mc-dark-blue'>");
        newString = newString.replace("§2", "</span><span class='mc-dark-green'>");
        newString = newString.replace("§3", "</span><span class='mc-dark-aqua'>");
        newString = newString.replace("§4", "</span><span class='mc-dark-red'>");
        newString = newString.replace("§5", "</span><span class='mc-dark-purple'>");
        newString = newString.replace("§6", "</span><span class='mc-gold'>");
        newString = newString.replace("§7", "</span><span class='mc-gray'>");
        newString = newString.replace("§8", "</span><span class='mc-light-gray'>");
        newString = newString.replace("§9", "</span><span class='mc-blue'>");
        newString = newString.replace("§k", "</span><span class='mc-white'>");
        newString = newString.replace("§o", "</span><span class='mc-white'>");
        newString = newString.replace("§l", "</span><span class='mc-white'>");
        newString = newString.replace("§m", "</span><span class='mc-white'>");
        newString = newString.replace("§r", "</span><span class='mc-white'>");
    }

    return newString;
}

/** Create a cookie */
function setCookie(cname, cvalue, exdays) {
    if (exdays == undefined) {
        document.cookie = cname + "=" + cvalue;
    }
    else {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
}

/** Get a cookie */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

/** Remove a cookie */
function removeCookie(cname) {
    setCookie(cname, "", 0);
}
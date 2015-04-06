var CONST = {
    "COOKIE_MAX": 365
};

/** A get request that run a function when retrieved */
var getRawRequest = function(url, results) {
    var request = new XMLHttpRequest();

    request.onload = function() {
        var response = null, error = null;

        try {
            response = request.responseText;
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

/**
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*/
var Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
};
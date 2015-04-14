/** The Utilities class for Year4000 */
var $$ = {
    /** Not in production run in debug mode */
    //debug: window.location.indexOf("www.year4000.net") == -1,

    Y4K_API: "https://api.year4000.net/",
    Y4K_CDN: "https://cdn.year4000.net/",
    Y4K_WEB: "https://www.year4000.net/",

    /** Simple request to get a ajax request */
    _request: function (url, type, load, delay) {
        var request = new XMLHttpRequest();
        request.onload = load;
        request.open(type, url, true);

        if (delay == undefined) {
            request.send();
        }

        return request;
    },

    /** A get request that run a function when retrieved */
    getRequest: function (url, results) {
        var request = $$._request(url, "GET", function() {
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
        });

        return request;
    },

    /** Send a post request */
    postRequest: function (url, data, results) {
        var request = $$._request(url, "POST", function () {
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
        }, true);

        var string = JSON.stringify(data);

        request.send(string);
    },

    /** Load the url */
    load: function (site) {
        window.location = site;
    },

    /** Clear out all the child from the parent node */
    clearTree: function (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    },

    /** Get query parameter */
    query: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    /** Color the ranks of Year4000 */
    colorRank: function (string) {
        // Ranks
        string = string.replace("Alpha", "§3Alpha§f");
        string = string.replace("Theta", "§7Theta§f");
        string = string.replace("Mu", "§eMu§f");
        string = string.replace("Pi", "§bPi§f");
        string = string.replace("Sigma", "§6Sigma§f");
        string = string.replace("Phi", "§5Phi§f");
        string = string.replace("Delta", "§9Delta§f");
        string = string.replace("Omega", "§cOmega§f");

        // Badges
        string = string.replace("α", "§3α§f");
        string = string.replace("Θ", "§7Θ§f");
        string = string.replace("μ", "§eμ§f");
        string = string.replace("π", "§bπ§f");
        string = string.replace("σ", "§6σ§f");
        string = string.replace("Φ", "§5Φ§f");
        string = string.replace("δ", "§9δ§f");
        string = string.replace("Ω", "§cΩ§f");

        return $$.color(string);
    },

    /** Color the Minecraft string */
    color: function (string) {
        var newString = "<span>" + string + "</span>";

        while (newString.indexOf("§") != -1) {
            newString = newString.replace("§a", "</span><span class='mc-green'>");
            newString = newString.replace("§b", "</span><span class='mc-aqua'>");
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
};

/** Handle cookies */
$$.Cookies = {
    COOKIE_MAX: 365,

    /** Get or set a cookie */
    cookie: function (name, value, time) {
        // Get a cookie by its name
        if (value == undefined && time == undefined) {
            return this._get_cookie(name);
        }
        // Set a cookie
        else {
            this._set_cookie(name, value, time);
        }
    },

    /** Get a cookie by its name */
    _get_cookie: function (name) {
        name += "=";
        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];

            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }

            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
    },

    /** Set a cookie */
    _set_cookie: function (name, value, time) {
        if (time == undefined) {
            document.cookie = name + "=" + value + "; path=/";
        }
        else {
            var date = new Date();
            date.setTime(date.getTime() + (time * 24 * 60 * 60 * 1000));
            var expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + "; " + expires + "; path=/";
        }
    },

    /** Remove a cookie */
    remove: function (name) {
        $$.Cookies.cookie(name, "", 0);
    }
};

/**
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*/
$$.Base64 = {
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
$$.Accounts = {
    /** The login function to log the account in by setting the cookie */
    login: function () {
        var forum = this;
        var data = {'token': forum.token.value, 'email': forum.email.value, 'password': forum.password.value};
        $$.Accounts.login_account(data, forum);
        return false;
    },

    /** The login code */
    login_account: function (data, forum) {
        var url = $$.Y4K_API + "auth/login";
        $$.postRequest(url, data, function(key, error) {
            if (error == null && key.status == undefined) {
                if (forum != undefined) {
                    $$.load($$.Y4K_WEB + "forums#token=" + data.token);
                }
                else {
                    $$.load(String(document.location).split("#")[0] + "#token=" + data.token);
                    window.location.reload();
                }

                $$.Cookies.cookie("y4k-token", data.token);
                $$.Cookies.cookie("y4k-account", key.account + ":" + key.key, 30);
            }
            else if (forum != undefined) {
                $("#email-group").addClass("has-error");
                $("#password-group").addClass("has-error");
                $("#login-error").removeClass("hidden");
            }
        });
    },

    /** Log the user out */
    logout: function () {
        $$.Cookies.remove("y4k-account");
        $$.Cookies.remove("y4k-token");
        $$.load($$.Y4K_WEB);
    },

    /** Check if the user is logged in */
    check: function (token) {
        var account = $$.Cookies.cookie("y4k-account");

        if (account == undefined) {
            $$.Cookies.remove("y4k-account");
            return;
        }

        account = account.split(":");
        var url = $$.Y4K_API + "auth/verify/" + account[0] + "?key=" + account[1];
        $$.postRequest(url, {}, function(data, error) {
            if (error == null && data.status == 200) {
                var new_key = {'token': token, 'email': account[0], 'password': account[1]};
                $$.Accounts.login_account(new_key);
            }
            else {
                $$.Cookies.remove("y4k-account");
                $$.load(String(document.location).split("#")[0]);
                window.location.reload();
            }
        });
    }
};

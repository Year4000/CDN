var COOKIE_LOCALE = "y4k-locale-cache";
var COOKIE_LOCALE_CODE = "y4k-locale-code";
//var url = "https://api.github.com/repos/Year4000/Locales/contents/website/locales.json";
var url = "https://api.github.com/repos/Year4000/Locales/contents/website/en.properties";
var namespace = {};

var decode = function(base64) {
    var lines = Base64.decode(base64).split("\n");
    var bob

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if (line.length > 0 && line[0] != "#") {
            //alert(line);
        }
    }
};

var readResponse = function() {
    if (true || getCookie(COOKIE_LOCALE) == "") {
        getRequest(url, function(data, error) {
            if (error == null) {
                setCookie(COOKIE_LOCALE, data.content);
                namespace = decode(data.content);
            }
        });
    }

    //namespace = getCookie(COOKIE_LOCALE);
};

readResponse();

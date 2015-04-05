var counter = 0;
var ip = " <div class=\"btn btn-primary text-uppercase\">mc.year4000.net</div>";

var content = function() {
    var offset = window.pageYOffset;
    var bar = document.querySelector(".sub_header_bottom");
    var fixed = offset >= 150;
    bar.style.position = fixed ? "fixed" : "relative";
    bar.style.top = fixed ? "60px" : "";

    if (fixed && bar.dataset.bar == null) {
        var bg = document.querySelector(".sub_header");
        bg.id = "bar" + (++counter);
        bg.style.position = "fixed";
        bg.style.top = "-90px";
        bar.dataset.bar = bg.id;
        document.querySelector(".lead").innerHTML += ip;
        document.querySelector(".section").style.marginTop = "261px";
    }
    else if (!fixed && bar.dataset.bar != null) {
        var bgReset = document.getElementById(bar.dataset.bar);
        bgReset.style.position = "relative";
        bgReset.style.top = "";
        document.querySelector(".section").style.marginTop = "61px";
        document.querySelector(".lead").innerHTML = document.querySelector(".lead").innerHTML.replace(ip, "");

        delete bar.dataset.bar;
    }
};

var request = function() {
    getRequest("https://api.year4000.net/player-count?compact", function(data, error) {
        if (error == null) {
            var count = document.querySelector(".count");
            var last = parseInt(count.innerHTML);
            var online = data.network.online;

            if (last != online) {
                count.className = "count " + (last < online ? "mc-yellow" : "mc-red");
                count.innerHTML = online;

                setTimeout(function() {
                   // alert(count.className);
                    count.className = "count mc-green";
                }, 500);
            }
        }

        setTimeout(request, 2000);
    });
};

window.onscroll = content;
document.onscroll = content;
request();

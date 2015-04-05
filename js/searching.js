var page = 1;
var query = getQuery("q");
var btn = document.querySelector(".searching");
var results = document.getElementById("results");

function addResult(minecraft) {
    var element = document.getElementById("search-empty").cloneNode(true);
    element.classList.remove("hidden");
    element.id = "search-" + minecraft.username;
    element.dataset.account = minecraft.uuid;

    var link = element.getElementsByTagName("a")[0];
    link.title = minecraft.username;
    link.href = link.href.replace("empty", minecraft.username);
    var img = link.getElementsByTagName("img")[0];
    img.src = img.src.replace("empty", minecraft.username);
    link = element.getElementsByTagName("a")[1];
    link.title = minecraft.username;
    link.href = link.href.replace("empty", minecraft.username);
    link.getElementsByTagName("span")[0].innerHTML = minecraft.username;

    results.appendChild(element);
}

btn.onclick = function() {
    var txt = btn.innerHTML;
    btn.innerHTML = "Loading...";
    btn.classList.add("disabled");

    var url = "https://api.year4000.net/search/accounts/" + query + "?page=" + (++page);
    getRequest(url, function(data, error) {
        if (error == null) {
            var length = parseInt(data.results.length);

            for (var i = 0; i < length; i++) {
                var minecraft = data.results[i].minecraft;
                addResult(minecraft);
            }

            if (length < 25) {
                document.getElementById("searching-wrapper").innerHTML = "";
            }
            else {
                btn.innerHTML = txt;
                btn.classList.remove("disabled");
            }
        }
    });
};
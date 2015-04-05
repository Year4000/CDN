var autocomplete = document.getElementById("search-input-autocomplete");
var search = document.getElementById("search-input");
var pending = null;
search.onkeyup = function() {
    var results = document.getElementById("search-results");
    var ul = document.createElement("ul");
    autocomplete.value = this.value;

    if (pending != null) {
        pending.abort();
    }

    searchPlayers(results, ul, this.value);
};

search.onkeypress = function() {
    autocomplete.value = this.value;
};

/** Create a search found element */
function none() {
    var li = document.createElement("li");
    var content = "";

    content += "<a href='#'>";
    content += "<span>No results found...</span>";
    content += "<span class='fa fa-close pull-right'></span>";
    content += "</a>";

    li.innerHTML = content;
    return li;
}

/** Create a player element for the search list */
function player(name) {
    var li = document.createElement("li");
    var content = "";

    content += "<a href='http://home.ewized.com/player/" + name + "'>";
    content += "<img src='https://api.year4000.net/avatar/" + name + "/20?hat'> ";
    content += "<span>" + name + "</span>";
    content += "<span class='fa fa-user pull-right'></span>";
    content += "</a>";

    li.innerHTML = content;
    return li;
}

/** Grab players from api and append to parent node */
function searchPlayers(old, node, query) {
    if (query != "") {
        pending = getRequest("https://api.year4000.net/search/accounts/" + query + "?compact", function(data, error) {
            if (error == null) {
                var names = data.results == null ? [] : data.results;

                if (names.length > 0) {
                    autocomplete.value += names[0].minecraft.username.substr(query.length);
                }

                clearTree(old);

                // Populate with results
                for (var i = 0; i < names.length && i < 8; i++) {
                    node.appendChild(player(names[i].minecraft.username));
                }

                if (names.length == 0) {
                    node.appendChild(none());
                }

                old.appendChild(node);
            }
        });
    }
    else {
        clearTree(old);
        node.appendChild(none());
        old.appendChild(node);
        autocomplete.value = "Search Year4000";
    }
}

var q = getQuery("q")
search.value = q;
if (q != "") {
    search.onkeyup();
}

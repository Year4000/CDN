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

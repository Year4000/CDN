---
---
var shopName = document.getElementById("shop-username");
var shopForm = document.getElementById("shop-username-form");
var shopPending = null;

shopForm.onsubmit = function() {
    var name = shopName.value;
    var url = "{{ site.api }}accounts/" + name + "?compact", pkg_url;
    getRequest(url, function(data, error) {
        var account = data.id;
        if (error == null && account != undefined) {
            pkg_url = "{{ site.api }}packages/ranks?account=" + account + "&compact";
        }
        else {
            pkg_url = "{{ site.api }}packages/ranks?compact";
        }

        getRequest(pkg_url, function (data, error) {
            if (error == null) {
                for (var pkg_id in data) {
                    var pkg = document.getElementById("pkg-" + pkg_id);
                    var pkg_button = document.querySelector("#pkg-" + pkg_id + " button[type='submit']");
                    var pkg_account = document.querySelector("#pkg-" + pkg_id + " .account-id");
                    var pkg_enabled = data[pkg_id].can_buy == undefined ? false : data[pkg_id].can_buy;

                    if (pkg_enabled) {
                        pkg.classList.remove("pkg-disabled");
                        pkg_button.classList.remove("disabled");
                        pkg_account.value = account;
                    }
                    else {
                        pkg.classList.add("pkg-disabled");
                        pkg_button.classList.add("disabled");
                        pkg_account.value = "";
                    }
                }
            }
        });
    });

    return false;
};

shopName.onkeyup = function() {
    if (shopPending != null) {
        return;
    }

    search(this.value);
};

var search = function(name) {
    var url = "{{ site.api }}search/accounts/" + name + "?compact";
    shopPending = getRequest(url, function(data, error) {
        if (error == null) {
            var username = data.results[0].minecraft.username;
            document.getElementById("shop-img").src = "{{ site.api }}avatar/" + username + "/28";
        }

        shopPending = null;
    });
};
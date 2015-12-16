var shopName = document.getElementById("shop-username");
var shopForm = document.getElementById("shop-username-form");
var shopPending = null;

shopForm.onsubmit = function() {
    var name = shopName.value;
    var isName = name == undefined || name == "";
    var url = $$.Y4K_API + (isName ? "accounts" : "accounts/" + name) + "?compact", pkg_url;
    document.getElementById("shop-img").src = $$.Y4K_API + (isName ? "avatar" : "avatar/" + name) + "/28";

    $$.getRequest(url, function(data, error) {
        var account = data.id;
        if (error == null && account != undefined) {
            pkg_url = $$.Y4K_API + "packages/ranks?account=" + account + "&compact";
        }
        else {
            pkg_url = $$.Y4K_API + "packages/ranks?compact";
        }

        $$.getRequest(pkg_url, function (data, error) {
            if (error == null) {
                for (var pkg_id in data) {
                    var pkg = document.getElementById("pkg-" + pkg_id);
                    var pkg_button = document.querySelector("#pkg-" + pkg_id + " button[type='submit']");
                    var pkg_account = document.querySelector("#pkg-" + pkg_id + " .account-id");
                    var pkg_enabled = data[pkg_id].can_buy == undefined ? false : data[pkg_id].can_buy;
                    $("#pkg-" + pkg_id + " .alert").hide();

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
    var url = $$.Y4K_API + "search/accounts/" + name + "?compact";
    shopPending = $$.getRequest(url, function(data, error) {
        if (error == null) {
            var username = data.results[0].minecraft.username;
            document.getElementById("shop-img").src = $$.Y4K_API + "avatar/" + username + "/28";
        }

        shopPending = null;
    });
};

// If value is filled out on load execute onsubmit
if (shopName.value != null && shopName.value != undefined) {
    shopForm.onsubmit();
}

window.onload = init;
function init() {
    breakframe();
    height();
    window.onresize = height;
}

function sound(s,b) {
    var sound = document.getElementById(s);
    var button = document.getElementById(b);
    if (button.dataset.state === "on") {
        sound.pause();
        button.innerHTML = "&#xf026;";
        button.dataset.state = "off";
    }
    else {
        sound.play();
        button.innerHTML = "&#xf028;";
        button.dataset.state = "on";
    }
}

function breakframe() {
  if (top.location != location) {
    top.location.href = document.location.href ;
  }
}

function height() {
    var page = document.getElementById("section");
    var pageHeight = window.innerHeight - 141;
    page.style.minHeight = pageHeight+"px";
}

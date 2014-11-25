var lastTimestamp;

var reload = function () {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'dev/reload.html');
    xhr.send();

    xhr.onload = function () {
        if (lastTimestamp !== xhr.responseText) {
            lastTimestamp = xhr.responseText;
            return chrome.runtime.reload();
        }
    };
};


(function() {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'dev/reload.html');
    xhr.send();

    xhr.onload = function() {
        lastTimestamp = xhr.responseText;
        return setInterval(reload, 1000);
    };
}());



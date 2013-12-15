(function() {

    var listen = function(url) {
        var ws = new WebSocket(url);
        ws.onmessage = function(event) {
            chrome.windows.getAll({ populate: true }, function(windows) {
                windows.forEach(function(window) {
                    window.tabs.forEach(function(tab) {
                        chrome.tabs.sendMessage(tab.id, {action: "toggle_mute", type: event.data.type});
                    });
                });
            });
        };
        ws.onclose = function() {
            setTimeout(function() { listen(url) }, 4000);
        };
    }

    listen("ws://localhost:8088/events");

})();

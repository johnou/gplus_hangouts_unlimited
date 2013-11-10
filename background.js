(function() {

    var listen = function(url) {
        ws = new WebSocket(url);
        ws.onmessage = function(event) {
            chrome.tabs.getSelected(null, function(tab){
                chrome.tabs.sendMessage(tab.id, {action: "toggle_mute"});
            });
        };
        ws.onclose = function(){
            setTimeout(function() { listen(url) }, 5000);
        };
    }

    listen("ws://localhost:8088/events");

})();

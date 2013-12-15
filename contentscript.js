(function() {

    var simulateClick = function(target) {
        ["mouseover", "mousedown", "mouseup", "mouseout"].forEach(function(eventName) { 
            var event = new MouseEvent(eventName, { view: document.defaultView, bubbles: true, cancelable: true });
            target.dispatchEvent(event);
        });
    };

    var antiIdle = function() {
        var elements = document.getElementsByTagName("div");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.getAttribute("role") == "button") {
                if (element.innerHTML.indexOf("Yes") >= 0) {
                    simulateClick(element);
                    break;
                }
            }
        }
    };

    var toggleMute = function(mute) {
        var elements = document.getElementsByTagName("div");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.getAttribute("role") == "button") {
                var label = element.getAttribute("aria-label");
                if (label != null && label.toLowerCase().indexOf("microphone") >= 0) {
                    simulateClick(element.children[0]);
                    break;
                }
            }
        }
    };

    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action == "toggle_mute") {
            toggleMute();
        }
    });

    setInterval(antiIdle, 15555);

})();

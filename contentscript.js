(function() {

    function simulate(target, eventName) {
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent(eventName, true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, target);
        target.dispatchEvent(event);
    }

    function simulateClick(target) {
        simulate(target, "mouseover");
        simulate(target, "mousedown");
        simulate(target, "mouseup");
        simulate(target, "mouseout");
    }

    setInterval(function () {
        var elements = document.getElementsByTagName("div");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.getAttribute("role") == "button") {
                var value = element.innerHTML;
                if (value.indexOf("Yes") >= 0 || value.indexOf("Kyll") >= 0) {
                    simulateClick(element);
                    break;
                }
            }
        }
    }, 16000);

})();

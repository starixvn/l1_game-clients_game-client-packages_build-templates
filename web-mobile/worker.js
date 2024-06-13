let intervalId;

(function () {
    function heartbeat() {
        const time = new Date();
        const timeStr = time.toTimeString().split(" ")[0];
        self.postMessage({ str: timeStr, ms: time.getTime() });
    }

    intervalId = setInterval(function () {
        heartbeat();
    }, 1000 / 60);

    self.addEventListener("message", function (event) {
        if (event.data === "terminate") {
            clearInterval(intervalId);
        }
    });
})();

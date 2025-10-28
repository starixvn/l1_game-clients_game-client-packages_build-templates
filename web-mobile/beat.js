let intervalId;

(function () {
    function heartBeat() {
        const time = Date.now();
        self.postMessage({ time });
    }

    intervalId = setInterval(function () {
        heartBeat();
    }, 1000 / 60);

    self.addEventListener("message", function (event) {
        if (event.data === "terminate") {
            clearInterval(intervalId);
        }
    });
})();

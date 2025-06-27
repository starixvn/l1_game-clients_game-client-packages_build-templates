class SplashManager {
    getIframeUrl() {
        return `${window.location.origin}${this.getSubDirectory()}/shared-resources/splashes/pages/${this.getSplashPath()}/index.html`;
    }

    getSearchParams() {
        let params = "";
        const storagePrefixKey = window.crossConfig?.storagePrefixKey;
        const paramsKey = storagePrefixKey ? `${storagePrefixKey}_current_params` : "current_params";

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("params")) {
            params = urlParams.get("params");
            localStorage.setItem(paramsKey, params);
        }
        else {
            try {
                if (localStorage.getItem(paramsKey)) {
                    params = localStorage.getItem(paramsKey);
                }
            } catch (e) {}
        }
        return params;
    }

    updateSplashIframe() {
        const splashIframe = document.getElementById("splash-iframe");
        if (splashIframe) {
            const params = this.getSearchParams();
            splashIframe.src = `${this.getIframeUrl()}?params=${params}`;
            splashIframe.style.display = "block";
        }
       
        const gameCanvas = document.getElementById('GameCanvas');
        if (gameCanvas) {
            setTimeout(() => {
                gameCanvas.style.display = "block";
            }, 100);
        }
    }

    getSplashPath() {
        return window.crossConfig?.splashPath || "instant";
    }

    getSubDirectory() {
        let subDirectory = "";
        try {
            if (window.envConfig?.subDirectory) {
                subDirectory = `/${window.envConfig.subDirectory}`;
            }
        } catch (e) {}
        return subDirectory;
    }
}

console.time("Game Load Time");
const splashManager = new SplashManager();
splashManager.updateSplashIframe();

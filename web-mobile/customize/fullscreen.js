const FullScreenManager = (function () {
    let timeoutDelayEnableScroll;
    const IOSInstruction = document.getElementById("ios-instruction");
    const userAgent = window.navigator.userAgent;

    // detect device type
    const isIOS = () => /iphone|ipad|ipod/i.test(userAgent);
    const isAndroid = () => /android/i.test(userAgent);
    const isIPad = () => /ipad/i.test(userAgent);

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Private core functions
    function showInstructionAndScroll(isShow = true) {
        if (!IOSInstruction) {
            console.warn("Instruction element not found");
            return;
        }

        clearTimeout(timeoutDelayEnableScroll);
        IOSInstruction.style.visibility = isShow ? "visible" : "hidden";

        if (isShow) {
            timeoutDelayEnableScroll = setTimeout(() => {
                document.body.style.overflowY = "scroll";
            }, 100);
            IOSInstruction.onclick = () => {};
        } else {
            document.body.style.overflow = "hidden";
            IOSInstruction.onclick = null;
        }
    }

    function showAddressBar() {
        window.scroll({
            top: 0,
            behavior: "instant",
        });
    }

    function updateViewport() {
        const viewportUnit = "--vh";
        if (isIOS()) {
            const width = window.innerWidth > window.innerHeight ? window.innerHeight : screen.width;
            const vh = width * 0.01;
            document.documentElement.style.setProperty(viewportUnit, `${vh}px`);
            document.documentElement.style.setProperty("--ih", `${window.innerHeight}px`);
        } else if (isAndroid()) {
            const height = Math.min(window.innerHeight, window.innerWidth);
            const vh = height * 0.01;
            document.documentElement.style.setProperty(viewportUnit, `${vh}px`);
        } else {
            document.documentElement.style.setProperty(viewportUnit, "1%");
        }
    }

    function getMiniNavigationBarHeight() {
        let navBarHeight = 0;
        const isLandscape = window.outerWidth > window.outerHeight;
        if (isLandscape) {
            navBarHeight = 20;

            if (isIPad()) {
                navBarHeight = 40;
            }
        }
        return navBarHeight;
    }

    function showInstruction() {
        IOSInstruction.style.display = "block";
        const isPortrait = window.outerWidth < window.outerHeight;
        if (isPortrait) {
            showAddressBar();
            updateViewport();
            showInstructionAndScroll(false);
            return;
        }

        const navBarHeight = getMiniNavigationBarHeight();
        const deltaHeight = window.outerHeight - window.innerHeight;
        const isShowAddressBar = deltaHeight > navBarHeight;
        const isShowOnPrivateMode = window.outerHeight === window.innerHeight && window.scrollY <= 40; // safari IOS v17
        if ((isShowAddressBar || isShowOnPrivateMode) && !window.skipFullscreen) {
            showInstructionAndScroll();
            showAddressBar();
        } else {
            showInstructionAndScroll(false);
            updateViewport();
        }
    }

    function updateFullScreen() {
        showInstruction();
        const gameContainer = document.getElementById("Cocos3dGameContainer");
        if (gameContainer) {
            gameContainer.style.top = window.scrollY + "px";
        }
    }

    function handleFullScreenForIOS() {
        showInstruction();
        updateViewport();

        const canvas = document.getElementById("GameCanvas");
        if (!canvas) {
            console.warn("GameCanvas element not found");
            return;
        }

        canvas.onfocus = showInstruction;
        canvas.onblur = showInstruction;

        const debouncedUpdate = debounce(updateFullScreen, 100);

        window.addEventListener("orientationchange", debouncedUpdate);
        window.addEventListener("resize", debouncedUpdate);
        window.addEventListener("scroll", debouncedUpdate);
    }

    function toggleFullScreen() {
        const doc = window.document;
        const docEl = document.documentElement;

        const requestFullScreen =
            docEl.webkitEnterFullscreen ||
            docEl.requestFullscreen ||
            docEl.mozRequestFullScreen ||
            docEl.webkitRequestFullScreen ||
            docEl.msRequestFullscreen;

        if (
            !doc.fullscreenElement &&
            !doc.mozFullScreenElement &&
            !doc.webkitFullscreenElement &&
            !doc.msFullscreenElement &&
            requestFullScreen
        ) {
            requestFullScreen.call(docEl);
        }
    }

    function handleFullScreenForAndroid() {
        if (!userAgent.includes("wv")) {
            // if browser is not web view
            const androidInstruction = document.getElementById("android-instruction");
            if (!androidInstruction) {
                console.warn("Full screen button not found");
                return;
            }

            androidInstruction.style.display = "block";

            window.onresize = () => {
                const isFullScreen = screen.height - window.innerHeight < 1;
                androidInstruction.style.display = isFullScreen || window.skipFullscreen ? "none" : "block";
                updateViewport();
            };

            androidInstruction.onclick = () => {
                toggleFullScreen();
                androidInstruction.style.display = "none";
            };
        } else {
            updateViewport();
        }
    }

    return {
        init: function () {
            try {
                if (isIOS()) {
                    handleFullScreenForIOS();
                }
                if (isAndroid()) {
                    handleFullScreenForAndroid();
                }
            } catch (error) {
                console.error("Error initializing full screen handler:", error);
            }
        },
    };
})();

// Initialize
FullScreenManager.init();

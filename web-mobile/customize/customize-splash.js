const waitingMessages = {
    en: ["If this is your first visit, downloading may take a while", "Checking and downloading the latest update packages..."],
    vi: ["Lần truy cập đầu tiên, việc tải dữ liệu sẽ mất chút thời gian.", "Đang kiểm tra và tải gói cập nhật game mới nhất..."],
    id: [
        "Jika ini adalah kunjungan pertama Anda, pengunduhan mungkin memakan waktu cukup lama.",
        "Memeriksa dan mengunduh paket pembaruan terbaru...",
    ],
    th: ["หากคุณเข้าชมครั้งแรก อาจใช้เวลาในการดาวน์โหลดสักครู่", "กำลังตรวจสอบและกำลังดาวน์โหลดเกมของการอัพเดทล่าสุด"],
    zh_cn: ["如果这是您第一次访问，下载可能需要一段时间。", "正在检查和下载最新的更新包..."],
    zh_tw: ["如果這是您第一次訪問，下載可能需要一段時間。", "正在檢查和下載最新的更新包..."],
    ja: ["初回アクセス時はダウンロードに時間がかかる場合があります", "最新のアップデートを確認・ダウンロード中…"],
    es: ["Si es tu primera visita, la descarga puede tardar un poco", "Comprobando y descargando la última actualización..."],
};

const rotateInstructions = {
    en: "Please rotate your screen to portrait mode to play",
    vi: "Vui lòng xoay màn hình sang chiều dọc để chơi",
    id: "Silakan putar layar ke mode potret untuk bermain.",
    th: "กรุณาหมุนหน้าจอเป็นแนวตั้งเพื่อเล่น",
    zh_cn: "请将屏幕旋转为竖屏模式以进行游戏。",
    zh_tw: "請將螢幕旋轉為直式模式以進行遊戲。",
    ja: "画面を縦向きに回してプレイしてください。",
    es: "Gira la pantalla a modo vertical para jugar.",
};

const userAgent = window.navigator.userAgent;

function getLanguageURLparams(locale) {
    const dict = {
        "vi-VN": "vi",
        "en-US": "en",
        "en-UK": "en",
        "th-TH": "th",
        "id-ID": "id",
        "zh-CN": "zh_cn",
        "zh-TW": "zh_tw",
        "ja-JP": "ja",
        ...(globalThis.localeMapping || {}),
    };
    return dict[locale] || "en";
}

function getCurrentLanguage() {
    let language = "vi";
    try {
        const storagePrefixKey = window.crossConfig?.storagePrefixKey;
        const languageKey = storagePrefixKey ? `${storagePrefixKey}_current_language` : "current_language";
        if (localStorage.getItem(languageKey)) {
            language = localStorage.getItem(languageKey);
        }
    } catch (e) {}
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("lang")) {
        language = getLanguageURLparams(urlParams.get("lang"));
    }

    if (urlParams.has("params")) {
        const otherParams = new URLSearchParams(window.atob(urlParams.get("params")));
        if (otherParams.has("lang")) {
            language = getLanguageURLparams(otherParams.get("lang"));
        }
    }
    return language;
}

function getCurrentOperator() {
    let operator = "";
    try {
        const storagePrefixKey = window.crossConfig?.storagePrefixKey;
        const operatorKey = storagePrefixKey ? `${storagePrefixKey}_op` : "op";
        if (localStorage.getItem(operatorKey)) {
            operator = localStorage.getItem(operatorKey);
        }
    } catch (e) {}

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("op")) {
        operator = urlParams.get("op");
    }

    if (urlParams.has("params")) {
        const otherParams = new URLSearchParams(window.atob(urlParams.get("params")));
        if (otherParams.has("op")) {
            operator = otherParams.get("op");
        }
    }
    return operator;
}

function updateLocalizedImages() {
    const language = getCurrentLanguage().replace(/['"]+/g, "");
    const operator = getCurrentOperator().replace(/['"]+/g, "").toUpperCase();

    const OperatorAlias = {
        SP: "SP",
        VG: "VG",
        SG: "SG",
        TIP88: "tip88",
    };

    let title, favicon;
    switch (OperatorAlias[operator]) {
        case OperatorAlias.SP:
            title = "Saba Play";
            favicon = "./images/favicon_sabaplay.ico?v=5";
            break;
        case OperatorAlias.VG:
            title = "Vgaming";
            favicon = "./images/favicon_vgaming.ico?v=4";
            break;
        case OperatorAlias.SG:
            title = language === "vi" ? "Cổng Game SABA" : "SABA.games";
            favicon = "./images/favicon.ico?v=4";
            break;
        case OperatorAlias.TIP88:
            title = "SoiBet";
            favicon = "./images/favicon_tip88.ico";
            break;
        default:
            title = "Default Title";
            favicon = "default_favicon.ico";
            break;
    }

    setTitleAndFavicon(title, favicon);
    setSplashTextClass(language);
    updatePoweredBy(language);
}

function setTitleAndFavicon(title, favicon) {
    document.title = title;
    const rel = document.getElementById("favicon");
    rel.href = favicon;
}

function updateSplashLogo() {
    const isAndroid = /android/i.test(this.userAgent);
    const operator = getCurrentOperator().replace(/['"]+/g, "").toUpperCase();
    const splashLogo = document.getElementById("splash_logo");
    const suffix = getCSSClassName(operator);
    splashLogo.className = `splash${suffix}`;
}

function setSplashTextClass(language) {
    const operator = getCurrentOperator().replace(/['"]+/g, "").toUpperCase();
    const splashText = document.getElementById("splash_text");
    const className = operator === "SP" ? `splash_text_sabaplay_${language}` : `splash_text_${language}`;
    splashText.className += ` ${className}`;
}

function updatePoweredBy(language) {
    const operator = getCurrentOperator().replace(/['"]+/g, "").toUpperCase();
    const poweredBy = document.getElementById("powered-by");
    const suffix = getCSSClassName(operator);
    poweredBy.className = `powered-by${suffix} ${language}`;
}

function getCSSClassName(operator) {
    const operators = {
        SP: "_sabaplay",
        VG: "_Vgaming",
        SG: "",
        TIP88: "_tip88",
    };
    return operators.hasOwnProperty(operator) ? operators[operator] : "_other";
}

function loadBgGame() {
    const existingElement = document.querySelector(".background-game");
    if (existingElement) {
        const version = Date.now();
        existingElement.style.background = `url("./splash-resources/bg-game-blur.webp?v=${version}")`;
        existingElement.style.backgroundRepeat = "no-repeat";
        existingElement.style.backgroundSize = "cover";
    }
}

function updateRotateInstruction() {
    const language = getCurrentLanguage().replace(/['"]+/g, "");
    const rotateInstruction = document.getElementById("rotate-instruction");
    const messages = rotateInstructions[language] || rotateInstructions.en;
    rotateInstruction.textContent = messages;
}

class RandomWaitingMessage {
    constructor() {
        const language = getCurrentLanguage().replace(/['"]+/g, "");
        this.intervalId = null;
        const waitingMessage = document.getElementById("waiting-message");
        waitingMessage.classList.add("waiting-message");
        const messages = waitingMessages[language] || waitingMessages.en;
        let currentIndex = 0;

        const showMessage = () => {
            waitingMessage.style.transition = "none";
            waitingMessage.classList.remove("show", "fade-out");
            waitingMessage.offsetHeight;
            waitingMessage.style.transition = "all 1s ease";
            waitingMessage.textContent = messages[currentIndex];
            requestAnimationFrame(() => {
                waitingMessage.classList.add("show");
                setTimeout(() => {
                    waitingMessage.classList.remove("show");
                    waitingMessage.classList.add("fade-out");
                }, 4000);
            });
        };

        this.intervalId && clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            showMessage();
        }, 5000);

        showMessage();
    }

    clearInterval() {
        this.intervalId && clearInterval(this.intervalId);
        this.intervalId = null;
    }
}

console.time("Game Load Time");
updateSplashLogo();
updateRotateInstruction();
loadBgGame();

function initializeSplash() {
    updateLocalizedImages();
    window.randomWaitingMessage = new RandomWaitingMessage();
}

if (globalThis.localeMapping) {
    initializeSplash();
} else {
    globalThis.addEventListener(
        "localeMappingLoaded",
        () => {
            initializeSplash();
        },
        {
            once: true,
        }
    );

    setTimeout(() => {
        if (!globalThis.localeMapping) {
            console.log("localeMapping not loaded within timeout, using default locale");
            globalThis.dispatchEvent(new Event("localeMappingLoaded"));
        }
    }, 2000);
}

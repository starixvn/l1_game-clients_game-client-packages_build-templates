const OPERATORS = {
    SP: {
        name: "SP",
        title: "Saba Play",
        favicon: "favicon_sabaplay.ico",
        cssClass: "sabaplay",
        logo: "./images/logo_sabaplay.webp?v=3",
    },
    VG: {
        name: "VG",
        title: "Vgaming",
        favicon: "favicon_vgaming.ico",
        cssClass: "vg",
        logo: "./images/logo_vgaming.webp?v=3",
    },
    SG: {
        name: "SG",
        title: {
            vi: "Cổng Game SABA",
            default: "SABA.games",
        },
        favicon: "favicon.ico",
        cssClass: "sg",
        logo: "./images/logo_saba.webp?v=3",
    },
    TIP88: {
        name: "TIP88",
        title: "SoiBet",
        favicon: "favicon_tip88.ico",
        cssClass: "tip88",
        logo: "./images/logo_tip88.webp?v=3",
    },
    NOVA88: {
        name: "NOVA88",
        title: "Nova88",
        favicon: "favicon_nova88.ico",
        cssClass: "nova88",
        logo: "./images/logo_nova88.webp?v=3",
    },
    _12BET: {
        name: "12BET",
        title: "12BET",
        favicon: "favicon_12bet.ico",
        cssClass: "12bet",
        logo: "./images/logo_12bet.webp?v=3",
    },
};

const LANGUAGE_MAP = {
    "vi-VN": "vi",
    "en-US": "en",
    "th-TH": "th",
    "id-ID": "id",
    "zh-CN": "zh_cn",
    "zh-TW": "zh_tw",
    "ja-JP": "ja",
    "es-ES": "es",
    "ko-KR": "ko",
    "tr-TR": "tr",
    "fil-PH": "fil_ph",
    "hi-IN": "hi_in",
    "bn-BD": "bn_bd",
    "ms-MY": "ms_my",
    "pt-BR": "pt_br",
};

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
    ja: ["初回アクセス時は、ダウンロードに時間がかかる場合があります。", "最新のアップデートパッケージを確認し、ダウンロードしています..."],
    es: ["Si es tu primera visita, la descarga puede tardar un poco", "Comprobando y descargando la última actualización..."],
    ko: ["첫 방문이시라면, 다운로드에 시간이 걸릴 수 있습니다.", "최신 업데이트 패키지를 확인하고 다운로드 중입니다..."],
    tr: ["Bu ilk ziyaretinizse, indirme biraz zaman alabilir.", "En son güncelleme paketleri kontrol ediliyor ve indiriliyor..."],
    fil_ph: [
        "Kung ito ang inyong unang pagbisita, maaaring magtagal nang kaunti ang pag-download.",
        "Chini-check at dina-download ang pinakabagong mga packages ng update...",
    ],
    hi_in: [
        "यदि यह आपकी पहली यात्रा है, तो डाउनलोड करने में कुछ समय लग सकता है",
        "नवीनतम अपडेट पैकेजों की जाँच और डाउनलोड किया जा रहा है...",
    ],
    bn_bd: [
        "যদি এটি আপনার প্রথম ভিজিট হয়, তবে ডাউনলোড করতে কিছুটা সময় লাগতে পারে",
        "সর্বশেষ আপডেট প্যাকেজগুলি পরীক্ষা করা এবং ডাউনলোড করা হচ্ছে...",
    ],
    ms_my: [
        "Jika ini adalah lawatan pertama anda, muat turun mungkin mengambil sedikit masa.",
        "Memeriksa dan memuat turun pakej kemas kini terkini...",
    ],
    pt_br: [
        "Se esta é sua primeira visita, o download pode demorar um pouco.",
        "Verificando e baixando os pacotes de atualização mais recentes...",
    ],
};

const taglineMessages = {
    en: "Play Fresh, Win Best",
    vi: "Chơi Mới Mẻ, Thắng Lớn Nhất",
    id: "Main Segar, Menang Terbaik",
    th: "เล่นสดใหม่ ชนะเลิศ",
    zh_cn: "畅玩新体验，赢取最高奖励",
    zh_tw: "暢玩新體驗，贏取最高獎勵",
    ja: "新鮮にプレイして、最高の勝利を",
    es: "Juega Fresco, Gana Mejor",
    ko: "신선하게 플레이하고 최고로 승리하세요",
    tr: "Tazelikle Oyna, En İyisini Kazan",
    fil_ph: "Maglaro nang Bago, Manalo nang Pinakamahusay",
    hi_in: "ताज़ा खेलें, सर्वश्रेष्ठ जीतें",
    bn_bd: "সতেজ খেলুন, সেরা জিতুন",
    ms_my: "Main Segar, Menang Terbaik",
    pt_br: "Jogue Fresco, Ganhe o Melhor",
};

class SplashManager {
    constructor() {
        if (globalThis.localeMapping) {
            this.initializeSplashScreen();
        } else {
            globalThis.addEventListener(
                "localeMappingLoaded",
                () => {
                    this.initializeSplashScreen();
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
            }, 1000);
        }
    }

    initializeSplashScreen() {
        this.language = this.getCurrentLanguage().replace(/['"]+/g, "");
        this.operator = this.getCurrentOperator().replace(/['"]+/g, "");
        this.appType = this.getAppType();
        this.intervalId = null;
        this.updateInterface();
    }

    getDataFromURLParams(key) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has(key)) return urlParams.get(key);

        if (urlParams.has("params")) {
            const otherParams = new URLSearchParams(window.atob(urlParams.get("params")));
            if (otherParams.has(key)) return otherParams.get(key);
        }
        return null;
    }

    getCurrentLanguage() {
        let language = "vi";
        try {
            const storagePrefixKey = window.crossConfig?.storagePrefixKey;
            const languageKey = storagePrefixKey ? `${storagePrefixKey}_current_language` : "current_language";
            language = localStorage.getItem(languageKey) || language;
        } catch (e) {}

        const langKey = this.getDataFromURLParams("lang");
        const languageMap = {
            ...LANGUAGE_MAP,
            ...(globalThis.localeMapping || {}),
        };
        return langKey ? languageMap[langKey] || "en" : language;
    }

    getCurrentOperator() {
        try {
            const storagePrefixKey = window.crossConfig?.storagePrefixKey;
            const operatorKey = storagePrefixKey ? `${storagePrefixKey}_op` : "op";
            const storedOperator = localStorage.getItem(operatorKey) || "";
            return this.getDataFromURLParams("op") || storedOperator;
        } catch (e) {
            return this.getDataFromURLParams("op") || "";
        }
    }

    getAppType() {
        const appTypeFromURL = this.getDataFromURLParams("appType");
        if (appTypeFromURL) return +appTypeFromURL;

        try {
            const storagePrefixKey = window.crossConfig?.storagePrefixKey;
            const sessionKey = storagePrefixKey ? `${storagePrefixKey}_ss` : "ss";
            const sessionData = JSON.parse(localStorage.getItem(sessionKey) || "{}");
            return +sessionData?.system || 0;
        } catch (e) {
            return 0;
        }
    }

    createImg(src) {
        if (!src) {
            return null;
        }
        const img = document.createElement("img");
        img.src = src;
        return img;
    }

    randomWaitingMessage(appTypeClass) {
        const waitingMessage = document.getElementById("waiting-message");
        appTypeClass && waitingMessage.classList.add(appTypeClass);
        const messages = waitingMessages[this.language] || waitingMessages.en;
        let currentIndex = 0;

        const showMessage = () => {
            // Reset to initial position
            waitingMessage.style.transition = "none";
            waitingMessage.classList.remove("show", "fade-out");
            waitingMessage.offsetHeight; // Force reflow
            waitingMessage.style.transition = "all 1s ease";

            waitingMessage.textContent = messages[currentIndex];

            // Fade in from bottom
            requestAnimationFrame(() => {
                waitingMessage.classList.add("show");

                // After 4 seconds, fade out to top
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
        }, 5000); // 5s total cycle (4s show + 1s fade)

        showMessage();
    }

    randomTaglineMessage() {
        const taglineMessage = document.getElementById("splash_original_tagline");
        const messages = taglineMessages[this.language] || taglineMessages.en;
        taglineMessage.textContent = messages;
    }

    clearInterval() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    updateInterface() {
        const operatorKey = this.operator.toUpperCase();
        const operatorConfig = OPERATORS[operatorKey] || { title: "Default Title", favicon: "default_favicon.ico" };

        const appTypeClass = this.appType === 1 ? "portrait" : "";

        // Update title and favicon
        const title =
            typeof operatorConfig.title === "object"
                ? operatorConfig.title[this.language] || operatorConfig.title.default
                : operatorConfig.title;

        document.title = title;
        document.getElementById("favicon").href = operatorConfig.favicon;

        // Update splash logo
        const splashLogo = document.getElementById("splash_logo");
        splashLogo.classList.add(`splash_logo_${operatorConfig.cssClass}`);

        // Update waiting message
        this.randomWaitingMessage(appTypeClass);
        this.randomTaglineMessage();
    }
}

const splashManager = new SplashManager();

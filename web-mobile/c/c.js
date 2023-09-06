window.envConfig = {
    isDev: false, // if this property is true, then you should add token=anything into the querytring to sso to the game http://localhost:7456/?token=anything
    systemType: "SG",
    serverDomainMapper: {
        localhost: "lumigame.com",
    },
    ssl: true,
    subDomain: "l1-proxy",
    env: "LOCAL",
    subGuideDomain: "l1-guide",
    SGConnectSubDomain: "connectsite",
    enableMsgpackParserAllGames: false,
    enableMsgpackParserOnNotification: false,
    websocket: {
        proxyPath: "colorgame",
        route: "colorgame",
    },
    mainObserverNamespace: "ColorGame",
    tolgeeUrl: "",
    backgroundNoTranslate: true,
};

console.error("Wrong mapping config, please check your deployment");

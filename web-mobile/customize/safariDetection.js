function feid() {
    var toFixedEngineID = 0;
    var neg = parseInt("-1");
    try {
        neg.toFixed(neg);
    } catch (e) {
        toFixedEngineID = e.message.length;
    }
    return toFixedEngineID;
}

export function isSafari() {
    return feid() === 44;
}

function newSafariTest() {
    return new Promise((resolve) => {
        var tmp_name = String(Math.random());
        try {
            var db = window.indexedDB.open(tmp_name, 1);
            db.onupgradeneeded = function (i) {
                var _a, _b;
                var res = (_a = i.target) === null || _a === void 0 ? void 0 : _a.result;
                try {
                    res.createObjectStore("test", {
                        autoIncrement: true,
                    }).put(new Blob());
                    resolve(false); // Not in private mode
                } catch (e) {
                    var message = e;
                    if (e instanceof Error) {
                        message = (_b = e.message) !== null && _b !== void 0 ? _b : e;
                    }
                    if (typeof message !== "string") {
                        resolve(false); // Not in private mode
                        return;
                    }
                    var matchesExpectedError = message.includes("BlobURLs are not yet supported");
                    resolve(matchesExpectedError); // In private mode if true
                    return;
                } finally {
                    res.close();
                    window.indexedDB.deleteDatabase(tmp_name);
                }
            };
        } catch (e) {
            resolve(false); // Not in private mode
        }
    });
}

function oldSafariTest() {
    return new Promise((resolve) => {
        var openDB = window.openDatabase;
        var storage = window.localStorage;
        try {
            openDB(null, null, null, null);
        } catch (e) {
            resolve(true); // In private mode
            return;
        }
        try {
            storage.setItem("test", "1");
            storage.removeItem("test");
        } catch (e) {
            resolve(true); // In private mode
            return;
        }
        resolve(false); // Not in private mode
    });
}

export function safariPrivateTest() {
    if (navigator.maxTouchPoints !== undefined) {
        return newSafariTest();
    } else {
        return oldSafariTest();
    }
}

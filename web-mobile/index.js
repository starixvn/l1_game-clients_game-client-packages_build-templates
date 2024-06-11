// import { Application } from "<%= applicationJS %>";
const Application = window.ApplicationClass;
const canvas = document.getElementById("GameCanvas");
const $p = canvas.parentElement;
const bcr = $p.getBoundingClientRect();
canvas.width = bcr.width;
canvas.height = bcr.height;
function topLevelImport(url) {
    System.import(url);
}
const application = new Application();
topLevelImport("https://l1-proxy1.lumigame.com/game/static/_cocos-shared/cc.js")
    .then((engine) => {
        return application.init(engine);
    })
    .then(() => {
        return application.start();
    })
    .catch((err) => {
        console.error(err);
    });

function setSizeGame() {
    const gameDiv = document.getElementById("GameDiv");
    gameDiv.style.width = "786px";
    gameDiv.style.height = "1398px";
    // const heightDiv = window.innerHeight;
    // const scaleRatio = 786 / widthDiv;
    // gameDiv.style.transform = `scale(${scaleRatio})`;
    // gameDiv.style.transformOrigin = "top left";
    const canvas = document.getElementById("GameCanvas");
    const $p = canvas.parentElement;
    const bcr = $p.getBoundingClientRect();
    canvas.width = 786;
    canvas.height = 1398;
}

setSizeGame();

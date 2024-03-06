function generatetext(){
setTimeout(() => {
document.getElementById("textunderneath").innerHTML = "<h3>Press any key and anywhere to continue!</h3>"
    
}, 4000);
}


setTimeout(generatetext(),4000)

addEventListener("keydown", () => {
    window.location = "../spritegame.html"
})

addEventListener("click", () => {
    window.location = "../spritegame.html"
})
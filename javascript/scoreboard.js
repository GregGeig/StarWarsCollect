function createrow(){
    document.getElementById("table").innerHTML = `
    <div class="descriptionrow">
        <div class="place">Place:</div>
        <div class="name">Name:</div>
        <div class="time">Points:</div>
    </div>`
}

createrow()
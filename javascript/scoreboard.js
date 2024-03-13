function getScores() {
    let scores = JSON.parse(localStorage["score"] ?? "[]");
    console.log(scores);



    let max = 0;
    let temp;
    let placement = 0;
    let scoresSorted = [];
    for (let i = scores.length - 1; i > -1; i--) {
        for (let j = i; j > -1; j--) {
            console.log("jetziger Wert: " + scores[j][1])
            if (max < scores[j][1]) {
                max = scores[j][1];
                placement = j;
            }


        }
        console.log("platzierung von max: " + placement)
        temp = scores[i];
        scores[i] = scores[placement];
        scores[placement] = temp;
        console.log("maximum: " + max)

        scoresSorted.push([scores[i][0], max]);
        max = 0;

    }
    console.log(scoresSorted);

    for (let i = 0; i < 6; i++) {
        if (i == 0){
            document.getElementById("mainLessMargin").innerHTML += `<div class="scorerow">
            <div class="names"><p>Names</p></div>
            <div class="scores"><p>Scores</p></div>
            </div>`
        }else{
        if (sessionStorage["name"] == scoresSorted[i - 1][0]) {
            console.log(sessionStorage["name"])
            document.getElementById("mainLessMargin").innerHTML += `<div class="scorerow">
            <div class="names"><p>${i}. ${scoresSorted[i - 1][0]}</p></div>
            <div class="scores"><p>${scoresSorted[i -1][1]}</p></div>
            </div>`
        } else {
            document.getElementById("mainLessMargin").innerHTML += `<div class="scorerow">
            <div class="names"><p>${i}. ${scoresSorted[i -1][0]}</p></div>
            <div class="scores"><p>${scoresSorted[i -1][1]}</p></div>
            </div>`
        }
    }

    }
}

function toStart(){
    window.location = "../spritegame.html"
}


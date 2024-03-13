let mlpbool = sessionStorage["mlp"];

function mlp() {
  if (mlpbool == true) {
    document.getElementById("buttonrow").innerHTML += `<button>
    <a class="buttonlink" href="https://github.com/EldinBegano/Pokemon-Mask">scoreboard</a>
  </button>`;
  }
}
mlp();
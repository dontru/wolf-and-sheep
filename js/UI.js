class UI {
  constructor() {
    this.menuElem = document.getElementById("menu");
    this.iconElem = document.getElementById("iconMenu");
    this.backgroundElem = document.getElementById("menuBackground");

    this.loaderElem = document.getElementById("loader");
    this.mainElem = document.getElementById("main");
    this.defaultElem = document.getElementById("default");
    this.confirmElem = document.getElementById("confirm");

    this.newGameButton = document.getElementById("newGame");
    this.confirmNoButton = document.getElementById("confirmNo");
    this.confirmYesButton = document.getElementById("confirmYes");

    this.loadCounter = 0;
    this.percentageInfo = document.getElementById("percentage");
    this.winnerInfo = document.getElementById("winner");

    this.hidden = false;
    this.loader();

    this.iconElem.addEventListener("click", () => { this.tryChangeState(); });
    this.backgroundElem.addEventListener("click", () => { this.tryHideMenu(); });
    this.newGameButton.addEventListener("click", () => { this.confirm(); });
    this.confirmNoButton.addEventListener("click", () => { this.hideMenu(); });
    this.confirmYesButton.addEventListener("click", () => { this.main(); });

    document.getElementById("wolf").addEventListener("click", () => {
      newGame({mode: "WOLF"}); });
    document.getElementById("sheep").addEventListener("click", () => {
      newGame({flipped: true, mode: "SHEEP"}); });
    document.getElementById("wolf-vs-sheep").addEventListener("click", () => {
      newGame(); });
    document.getElementById("sheep-vs-wolf").addEventListener("click", () => {
      newGame({flipped: true}); });
    document.getElementById("flipBoard").addEventListener("click", flip);
  }

  loader() {
    this.hideElements();
    this.state = "loader";
    this.loaderElem.style.display = "inline";
  }

  main() {
    this.hideElements();
    this.state = "main";
    this.mainElem.style.display = "inline";
  }

  default() {
    this.hideElements();
    this.state = "default";
    this.defaultElem.style.display = "inline";
  }

  confirm() {
    this.hideElements();
    this.state = "confirm";
    this.confirmElem.style.display = "inline";
  }

  hideElements() {
    this.loaderElem.style.display = "none";
    this.mainElem.style.display = "none";
    this.defaultElem.style.display = "none";
    this.confirmElem.style.display = "none";
  }

  showMenu() {
    this.menuElem.style.display = "inline";
    this.backgroundElem.style.display = "inline";
    this.hidden = false;
  }

  hideMenu() {
    this.menuElem.style.display = "none";
    this.backgroundElem.style.display = "none";
    this.hidden = true;
    this.default();
  }

  tryChangeState() {
    this.hidden ? this.showMenu() : this.tryHideMenu();
  }

  tryHideMenu() {
    if (this.state == "default" || this.state == "confirm")
      this.hideMenu();
  }

  loadImg() {
    this.percentageInfo.innerHTML = Math.floor(100 * this.loadCounter++ / 342);
  }
}

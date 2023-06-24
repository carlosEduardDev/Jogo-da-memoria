class ImagesEvents {
  images: NodeListOf<HTMLDivElement>;
  game: Element;
  current: number;
  firstCard: string | HTMLElement;
  secondCard: string | HTMLElement;
  constructor(images: string, game: string) {
    this.game = <HTMLElement>document.querySelector(game);
    this.images = document.querySelectorAll(images);
    this.firstCard = "";
    this.secondCard = "";
    this.current = 0;

    this.setClass = this.setClass.bind(this);
  }

  buildCard(game: Element) {
    const arrayIndex = [0, 1, 2, 3, 4, 5, 6, 7];
    const arrayIndexDuplicate = [...arrayIndex, ...arrayIndex];
    const newArrayIndex = arrayIndexDuplicate.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 16; i++) {
      const card = document.createElement("div");
      card.classList.add("img");
      card.style.backgroundImage = `url(/images/${newArrayIndex[i]}.png)`;
      game.appendChild(card);
    }
    this.images = document.querySelectorAll(".img");
    this.addEvents(this.images);
  }

  setClass(e: MouseEvent) {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add("active");
      if (this.firstCard === "") {
        this.firstCard = e.currentTarget;
        this.firstCard.removeEventListener("click", this.setClass);
      } else if (this.secondCard === "") {
        this.secondCard = e.currentTarget;
        this.images.forEach((item) => {
          item.removeEventListener("click", this.setClass);
        });
        setTimeout(() => {
          if (
            this.firstCard instanceof HTMLDivElement &&
            this.secondCard instanceof HTMLDivElement
          ) {
            if (
              this.firstCard.style.backgroundImage ===
              this.secondCard.style.backgroundImage
            ) {
              this.images.forEach((item) => {
                item.classList.remove("active");
                item.addEventListener("click", this.setClass);
                this.current++;
              });
              this.secondCard.classList.add("sucess", "active");
              this.firstCard.classList.add("sucess", "active");
              this.firstCard.removeEventListener("click", this.setClass);
              this.secondCard.removeEventListener("click", this.setClass);
              this.secondCard.classList.remove("img");
              this.firstCard.classList.remove("img");
              this.firstCard = "";
              this.secondCard = "";
              setTimeout(() => {
                this.resetGame();
              }, 1500);
            } else {
              this.images.forEach((item) =>
                item.addEventListener("click", this.setClass)
              );
              this.secondCard.classList.remove("active");
              this.firstCard.classList.remove("active");
              this.firstCard.addEventListener("click", this.setClass);
              this.firstCard = "";
              this.secondCard = "";
              this.images.forEach((item) => {
                item.classList.remove("active");
              });
            }
          }
        }, 600);
      }
    }
  }

  addEvents(imgs: NodeListOf<HTMLDivElement>) {
    imgs.forEach((item) => item.addEventListener("click", this.setClass));
  }

  resetGame() {
    if (this.current === 128) {
      const resetGame = document.querySelector(".reset");
      this.game.innerHTML = "";
      this.current = 0;
      if (resetGame instanceof HTMLElement) resetGame.style.display = "flex";
    }
  }

  init() {
    this.buildCard(this.game);
    return this;
  }
}

const imagesEvents = new ImagesEvents(".img", ".game");

const initGame = document.querySelector(".init p");

function init() {
  imagesEvents.init();
  initGame?.parentElement?.remove();
}

initGame?.addEventListener("click", init);

const resetGame = document.querySelector(".reset p");

function reset() {
  resetGame?.parentElement?.remove();
  const main = document.querySelector("main");
  if (main instanceof HTMLElement) main.innerHTML = "";
  setTimeout(() => {
    imagesEvents.init();
  }, 500);
}

resetGame?.addEventListener("click", reset);

// использовать loader чтобы работал UI
// в этом айле все, что видит пользователь

class UIManager {

  displayMessage1() {
    add([
      text("V IS NOT A TEACHER", { font: "Round", size: 24 }),
      area(),
      anchor("center"),
      pos(center().x - 200, center().y - 320),
    ])
  }

  displayLivesCounter(player) {
    this.livesCountUI = add([
      text("", {
        font: "Round",
        size: 50,
      }),
      fixed(),
      pos(70, 10)

    ])

    // это лого жизни
    this.livesCountUI.add([
      sprite('star-icon'),
      pos(-60, -5),
      scale(3),
      fixed()
      // это означает что камера не будет влиять
    ])
  }

  displayWordsInTheGame() {

    add([
      text("Collect caps", { font: "Round", size: 24 }),
      area(),
      anchor("center"),
      pos(center().x + 650, center().y - 30),




    ])
  }
  // счет:
  displayCoinCount(player) {
    this.coinCountUI = add([
      text("You collected", {
        font: "Round",
        size: 25,
      }),
      fixed(),
      pos(10, 125)
    ])
    this.coinCountUI = add([
      text("", {
        font: "Round",
        size: 50,
      }),
      {
        fullCoinCount: get("coin", { recursive: true }).length
      },
      fixed(),
      pos(70, 70),

    ])

    this.coinCountUI.add([sprite("coin-icon"), pos(-70, -10), scale(4), fixed()])
  }


  displayBlinkingUIMessage(content, position) {

    const message = add([
      text(content, {
        size: 55,
        font: "Round"
      }),
      area(),
      anchor("center"),
      pos(position),
      opacity(),
      state("flash-up", ["flash-up", "flash-down"])
      // видимо строка выше отвечает за смену состояний и за то что сообщение мигает/мерцает
    ])
    //  то что ниже работает потому что ы выше создали состояния и остальные объекты

    // анимация удаления сообщения
    message.onStateEnter("flash-up", async () => {
      // ждем пока tween закончится и потом продолжаем и это и дает эффект мигания
      await tween(
        message.opacity,
        0,
        0.5,
        (nextOpacityValue) => message.opacity = nextOpacityValue,
        easings.linear
      )
      message.enterState("flash-down")
    })

    // анимация появления сообщения вновь
    message.onStateEnter("flash-down", async () => {
      // ждем пока tween закончится и потом продолжаем и это и дает эффект мигания
      await tween(
        message.opacity,
        1,
        0.5,
        (nextOpacityValue) => message.opacity = nextOpacityValue,
        easings.linear
      )
      message.enterState("flash-up")
    })
  }




  // Сцена номер один - первое окно которое видит игрок
  displayMainMenu() {
    // add([
    //   sprite("forest-background"),
    //   scale(4),
    //   area(),
    //   anchor("center"),
    //   pos(center().x, center().y),
    // ])
    add([
      sprite("background-1"),
      scale(1),
      area(),
      anchor("center"),
      pos(center().x, center().y),
    ])
    add([
      sprite("logo"),
      // hitbox and collisions
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
      scale(0.5)
    ])
    add([
      text("ENTER", { font: "Round", size: 20 }),
      area(),
      anchor("center"),
      pos(center().x, center().y + 320),
    ])

    this.displayBlinkingUIMessage(
      "Hello, special agent!",
      vec2(center().x, center().y + 10)
    )
    this.displayBlinkingUIMessage(
      "press - enter - to start A game",
      vec2(center().x, center().y + 80)
    )

    // это с КЛАВИАТУРЫ кабум enter а не другой
    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 })
      go("controls")

    })
    onMousePress(() => {
      play("confirm-ui", { speed: 1.5 })
      go("controls")

    })


  }

  // Сцена 2 клавиши управления
  displayControlMenu() {
    add([
      sprite("background-2"),
      scale(1),
      area(),
      anchor("center"),
      pos(center().x, center().y),
    ])
    add([
      text("controls", { font: "Round", size: 50 }),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
    ])

    const controlPrompts = add([
      pos(center().x + 30, center().y)
    ])

    // как работать с детьми кабума - чтобы остальные кнопки позиционировались относительно первой

    controlPrompts.add([
      sprite("up"),
      pos(0, -80)
    ])
    controlPrompts.add([sprite("down")])
    controlPrompts.add([sprite("left"), pos(-80, 0)])
    controlPrompts.add([sprite("right"), pos(80, 0)])
    controlPrompts.add([sprite("space"), pos(-200, 0)])
    controlPrompts.add([
      text("Jump", { font: "Round", size: 32 }),
      pos(-190, 100),
    ])
    controlPrompts.add([
      text("Move", { font: "Round", size: 32 }),
      pos(10, 100),
    ])

    this.displayBlinkingUIMessage(
      "Press  [ Enter ]  to Start Game",
      vec2(center().x, center().y + 200)
    )

    onKeyPress("enter", () => {
      play("confirm-ui", { speed: 1.5 })
      go("1")
    })

    onKeyPress("w", () => {
      play("confirm-ui", { speed: 1.5 })
      go("menu")

    })
    onMousePress(() => {
      play("confirm-ui", { speed: 1.5 })
      go("1")


    })

  }



  displayEndGameScreen() {
    // bgSoundManager.pauseAllSounds()
    add([rect(1280, 720), color(0, 0, 0)])
    add([
      text("You Won! Great Job AGENT!.", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ])

    this.displayBlinkingUIMessage(
      "Press  [ Enter ]  to Play Again",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("enter", () => {
      play("confirm-ui")
      go("menu")
    })
  }


  displayGameOverScreen() {
    // bgSoundManager.pauseAllSounds()
    add([rect(1280, 720), color(0, 0, 0)])
    add([
      text("Vincent is crying...!", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ])

    this.displayBlinkingUIMessage(
      "Press  [ Enter ]  to Try Again",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("enter", () => {
      play("confirm-ui")
      go(1)
    })
  }






  addDarkBg() {
    add([rect(270, 130), color(105, 15, 100), fixed()])
  }





}


export const uiManager = new UIManager()
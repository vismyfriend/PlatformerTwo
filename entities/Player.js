export class Player {

  // максимальная точка когда игрок в воздухе, нужна чтобы понять когда анимацию менять
  heightDelta = 0

  isMoving = false

  isRespawning = false

  lives = 3

  coins = 0

  hasJumpedOnce = false

  coyoteLapse = 0.1


  // лучше VEC2 использовать, но можно и так
  constructor(
    posX,
    posY,
    speed,
    jumpForce,
    nbLives,
    currentLevelScene,
    isInTerminalScene
    // финальная сцена
  ) {
    this.isInTerminalScene = isInTerminalScene
    this.currentLevelScene = currentLevelScene
    this.initialX = posX
    this.initialY = posY
    this.makePlayer()
    this.speed = speed
    this.jumpForce = jumpForce
    this.lives = nbLives
    this.previousHeight = this.gameObj.pos.y
    
    
    this.setPlayerControls()
    
    this.update()
  }

  // makePlayer(x, y) {
  makePlayer() {
    this.gameObj = add([

      // по умолчанию что деолает игрок - анимация
      sprite("player", { anim: "idle" }),
                             // ширина и высота
      area({ shape: new Rect(vec2(0, 3), 8, 8) }),
      anchor("center"),
      pos(this.initialX, this.initialY),
      scale(4),
      body(),
      "player",
    ])
  }



  enablePassthrough() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution()
      }


      // проход вниз при нажатии вниз
      if (collision.target.is("passthrough") && isKeyDown("down")) {
        collision.preventResolution()
      }
      if (collision.target.is("passthrough") && isKeyDown("ы")) {
        collision.preventResolution()
      }
      if (collision.target.is("passthrough") && isKeyDown("s")) {
        collision.preventResolution()
      }

    })
  }

  enableCoinPickUp() {
    this.gameObj.onCollide("coin", (coin) => {
      this.coins++
      destroy(coin)
      play("coin")
      console.log(this.coins)
    })
  }

  setPlayerControls() {
    onKeyDown("left", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")

        // поворот игрока
      this.gameObj.flipX = true
      if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
      this.isMoving = true
    })
    onKeyDown("a", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = true
      if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
      this.isMoving = true
    })
    onKeyDown("ф", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = true
      if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("right", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = false
      if (!this.isRespawning) this.gameObj.move(this.speed, 0)
      this.isMoving = true
    })
    onKeyDown("d", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = false
      if (!this.isRespawning) this.gameObj.move(this.speed, 0)
      this.isMoving = true
    })
    onKeyDown("в", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = false
      if (!this.isRespawning) this.gameObj.move(this.speed, 0)
      this.isMoving = true
    })

    // ниже нормльный прыжок, а еще ниже койотэ
    onKeyDown("space", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.isGrounded() && !this.isRespawning) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }

      //coyote time - это когда игрок все равно может прыгнуть несмотря на то что он уже прошол край плптформы
      if (
        !this.gameObj.isGrounded() &&
        // flappy bird floating style
        // this.gameObj.jump(this.jumpForce)
        time() - this.timeSinceLastGrounded < this.coyoteLapse &&
        !this.hasJumpedOnce
      ) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }
    })

    onKeyRelease(() => {
      if (this.gameObj.paused) return
      if (isKeyReleased("right") || isKeyReleased("left")) {
        this.gameObj.play("idle")
        this.isMoving = false
      }
      if (isKeyReleased("d") || isKeyReleased("a")) {
        this.gameObj.play("idle")
        this.isMoving = false
      }
      if (isKeyReleased("ф") || isKeyReleased("в")) {
        this.gameObj.play("idle")
        this.isMoving = false
      }
    })
  }

  respawnPlayer() {
    if (this.lives > 0) {
      this.gameObj.pos = vec2(this.initialX, this.initialY)
      this.lives--
      this.isRespawning = true

      // чтобы было время без движения после возрождения
      setTimeout(() => (this.isRespawning = false), 1000)
      return
    }

    go("gameover")
  }

  // взаимодействие с пауками - дохнем при контакте
  enableMobVunerability() {
    function hitAndRespawn(context) {
      play("hit", { speed: 1.5 })
      context.respawnPlayer()
    }
                                    // в конце this означает что к Player относимся к методу
    this.gameObj.onCollide("fish", () => hitAndRespawn(this))
    this.gameObj.onCollide("spiders", () => hitAndRespawn(this))
    this.gameObj.onCollide("flame", () => hitAndRespawn(this))
    this.gameObj.onCollide("axes", () => hitAndRespawn(this))
    this.gameObj.onCollide("saws", () => hitAndRespawn(this))
    this.gameObj.onCollide("birds", () => hitAndRespawn(this))
  }

  update() {
    onUpdate(() => {
      // проверяем конкретно в этом кадре прыгает ли человек
      if (this.gameObj.isGrounded()) {
        this.hasJumpedOnce = false
        this.timeSinceLastGrounded = time()
      }
// для анимации прыжков
      this.heightDelta = this.previousHeight - this.gameObj.pos.y
      this.previousHeight = this.gameObj.pos.y

      // чтобы снова возвращался в айдл после прыжка
      if (!this.isMoving && this.gameObj.curAnim() !== "idle") {
        this.gameObj.play("idle")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta > 0 &&
        this.gameObj.curAnim() !== "jump-up"
      ) {
        this.gameObj.play("jump-up")
      }

      // ниже переход анимации с прыжка на падение
      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta < 0 &&
        this.gameObj.curAnim() !== "jump-down"
      ) {
        this.gameObj.play("jump-down")
      }

      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 })
        this.respawnPlayer()
      }
    })
  }

  updateLives(livesCountUI) {
    onUpdate(() => {
      livesCountUI.text = `${this.lives}`
    })
  }


  // без этого не появится счетчик монет, так как он зависит от игрока
  updateCoinCount(coinCountUI, CoinsMessage) {
    onUpdate(() => {
      CoinsMessage
      coinCountUI.text = `${this.coins} / ${coinCountUI.fullCoinCount}`
      if (this.coins === coinCountUI.fullCoinCount) {
        this.coins = 0
        go(this.isInTerminalScene ? "end" : this.currentLevelScene + 1)
        
      }
    })
  }
}

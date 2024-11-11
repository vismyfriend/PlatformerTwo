export class Spiders {
  // rangeX = 0
  // rangeY = 800


//  индексы в конструкторе 0,1,2,3
  constructor(positions, ranges, durations, type) {
    // насколько далеко будет передвигаться паук
    this.ranges = ranges
// насколько быстро будет двигаться
    this.durations = durations
    this.spiders = []
    for (const position of positions) {

      // создаем паука (игровой объект)
      this.spiders.push(
        add([
          // тип паука
          sprite(`spider-${type}`, { anim: "crawl" }),
          pos(position),
          area({
            // прямоугольная форма паука ( вектор ( позиция по ИКС + позиция ПО УАЙ), ширина, высота)
            shape: new Rect(vec2(0, 4.5), 20, 6),
            // чтобы они друг с другом не сталкивались (ниже будет ТЭГ)
            collisionIgnore: ["spiders"],
          }),
          anchor("center"),
          body(),
          scale(3),
          state("idle", ["idle", "crawl-left", "crawl-right"]),

          // вне камеры пауки ничего не делают, меньше высчитываний
          offscreen(),

          // в самом низу ТЭГ этого врага, чтобы взаимодействовать с остальными существами

          "spiders",
        ])
      )
    }
  }

  async crawl(spider, moveBy, duration) {
    if (spider.currAnim !== "crawl") spider.play("crawl")


    await tween(
      spider.pos.x,
      spider.pos.x + moveBy,
      duration,
      (posX) => (spider.pos.x = posX),
      easings.easeOutSine
    )
  }

  // метод (шаблон движений) используя индексы из конструктора
  setMovementPattern() {
    for (const [index, spider] of this.spiders.entries()) {

      // делаем константу для того чтобы можно было паука возращать в айдл и на других уровнях мы уже не слушали и не слышали этого паукавозвращаем
      const idle = spider.onStateEnter("idle", async (previousState) => {
        if (spider.currAnim !== "idle") spider.play("idle")


          // паук ждет 1000 милисекунд до тех пор пока не начнет двигатся 
          // блокировка дальнейшего выполнения кода
        await new Promise((resolve) => {
          setTimeout(() => resolve(), 1000)
        })

        // Previoius State = UNDEFINED на страрте 

        if (previousState === "crawl-left") {
          spider.enterState("crawl-right")

       
          return
        }
        
        // } else {
          spider.jump()
          if (!spider.isOffScreen()) {
            play("spider-attack", { volume: 0.6 })
          }

          spider.enterState("crawl-left")
          

        
      })

      // разворот спрайта спаука 
      const crawlLeft = spider.onStateEnter("crawl-left", async () => {
        spider.flipX = true
        // spider.flipX = false

        await this.crawl(
          spider,
          -this.ranges[index],
          this.durations[index]
        )
        
        spider.enterState("idle", "crawl-left")
      })

      const crawlRight = spider.onStateEnter("crawl-right", async () => {
        spider.flipX = false
        // spider.flipX = true

        await this.crawl(spider, 
          this.ranges[index], 
          this.durations[index])
        spider.enterState("idle", "crawl-right")
      })

      onSceneLeave(() => {
        idle.cancel()
        crawlLeft.cancel()
        crawlRight.cancel()
      })
    }
  }

  enablePassthrough() {
    for (const spider of this.spiders) {
      spider.onBeforePhysicsResolve((collision) => {
        if (collision.target.is("passthrough") && spider.isJumping()) {
          collision.preventResolution()
        }
      })
    }
  }
}

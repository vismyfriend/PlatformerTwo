
// export class Fish {
export class Projectiles {
  constructor(positions, ranges, type) {
    this.ranges = ranges
    this.type = type
    this.projectiles = []

const animMap = {
  "fish":  "swim",
  "flame": "burn"
}

    for (const position of positions) {
      this.projectiles.push(
        add([
          // ниже тип того что выпрыгивает рыба или пламя
          sprite(type, { anim: animMap[type]}),
          area({ shape: new Rect(vec2(0), 12, 12) }),
          anchor("center"),
          pos(position),
          scale(4),

          // повернуть, чтобы летели рыбы вверх лицом
          // rotate(90),
          // но так как у нас разные картинки, то вот так можно сделать
          rotate(type === "fish" ? 0 : 0),
          state("launch", ["launch", "fall"]),
          offscreen(),
          // "fish",
          type
        ])
      )
    }
  }

  setMovementPattern() {
    for (const [index, projectiles] of this.projectiles.entries()) {
      const launch = projectiles.onStateEnter("launch", async () => {
        if (this.type === "fish")  projectiles.flipX = false
        if (this.type === "flame")  projectiles.flipY = false
        await tween(
          projectiles.pos.y,
          projectiles.pos.y - this.ranges[index],

          // через сколько секунд снижается или поднимается
          2,
          (posY) => (projectiles.pos.y = posY),
          easings.easeOutSine
        )
        projectiles.enterState("fall")
      })

     

      const fall = projectiles.onStateEnter("fall", async () => {

        if (this.type === "fish")  projectiles.flipX = true
        if (this.type === "flame")  projectiles.flipY = true
        await tween(
          projectiles.pos.y,
          projectiles.pos.y + this.ranges[index],
      // через сколько секунд снижается или поднимается
      2,
          (posY) => (projectiles.pos.y = posY),
          easings.easeOutSine
        )
        projectiles.enterState("launch")
      })

      onSceneLeave(() => {
        launch.cancel()
        fall.cancel()
      })
    }
  }
}

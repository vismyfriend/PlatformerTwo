export function generateMappings(tileType) {
    return {
      0: () => [
        // TOP LEFT = TL
        sprite(`${tileType}-tileset`, { anim: "tl" }),
        // создаем хитбокс чтобы можно было стоять на нем AREA
        area(),
        // BODY TRUE это значит кабум будет считать что гравитация не действует на этот объект
        body({ isStatic: true }),
        // ниже строчкой убираем расчеты когда объект не в игре улучшая FPS
        offscreen(),
      ],
      1: () => [
        // TOP MIDDLE = TM
        sprite(`${tileType}-tileset`, { anim: "tm" }),
        area(),
        body({ isStatic: true }),
        offscreen(),
      ],
      2: () => [
        sprite(`${tileType}-tileset`, { anim: "tr" }),
        area(),
        body({ isStatic: true }),
        offscreen(),
      ],
      3: () => [
        sprite(`${tileType}-tileset`, { anim: "ml" }),
        area(),
        body({ isStatic: true }),
        offscreen(),
      ],
      4: () => [sprite(`${tileType}-tileset`, { anim: "mm" }), offscreen()],
      5: () => [
        sprite(`${tileType}-tileset`, { anim: "mr" }),
        area(),
        body({ isStatic: true }),
        offscreen(),
      ],
      6: () => [sprite(`${tileType}-tileset`, { anim: "bl" }), offscreen()],
      7: () => [sprite(`${tileType}-tileset`, { anim: "bm" }), offscreen()],
      8: () => [sprite(`${tileType}-tileset`, { anim: "br" }), offscreen()],
    //   6: () => [sprite(`${tileType}-tileset`, { anim: "ml-2" }), offscreen()],
    //   7: () => [sprite(`${tileType}-tileset`, { anim: "mm-2" }), offscreen()],
    //   8: () => [sprite(`${tileType}-tileset`, { anim: "mr-2" }), offscreen()],
      9: () => [
        sprite(`${tileType}-oneway-tileset`, { anim: "tl" }),

        // это создает прямоугольник вокруг игрового объекта ширина 16 высота 3 плоская платформа
        area({ shape: new Rect(vec2(0), 16, 3) }),
        "passthrough",
        body({ isStatic: true }),
        offscreen(),
      ],
      a: () => [
        sprite(`${tileType}-oneway-tileset`, { anim: "tm" }),
        area({ shape: new Rect(vec2(0), 16, 3) }),
        "passthrough",
        body({ isStatic: true }),
        offscreen(),
      ],
      b: () => [
        sprite(`${tileType}-oneway-tileset`, { anim: "tr" }),
        area({ shape: new Rect(vec2(0), 16, 3) }),
        "passthrough",
        body({ isStatic: true }),
        offscreen(),
      ],
      c: () => [
        sprite(`${tileType}-oneway-tileset`, { anim: "ml" }),
        offscreen(),
      ],
      d: () => [
        sprite(`${tileType}-oneway-tileset`, { anim: "mm" }),
        offscreen(),
      ],
      e: () => [
        sprite(`${tileType}-oneway-tileset`, { anim: "mr" }),
        offscreen(),
      ],
      o: () => [sprite("bridge"), area(), body({ isStatic: true }), offscreen()],
      "@": () => [sprite("coin"), area(), "coin", offscreen()],
    }
  }
  
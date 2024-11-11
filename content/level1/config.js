export const level1Config = {
    gravity: 1400,
    playerSpeed: 400,
    jumpForce: 650,
    nbLives: 3,
    playerStartPosX: 1500,
    playerStartPosY: 100,
    
    spiderPositions: [
      () => vec2(2500, 300),
      () => vec2(1300, 100),
      () => vec2(2050, 0),
      () => vec2(3200, 200),
      () => vec2(3500, 300),
    ],
      spiderRanges: [300, 150, 150, 300],
      spiderDurations: [2, 1, 1, 2],
      spiderType: 1,

    fishPositions: [
      () => vec2(2595, 600),
      () => vec2(2655, 600),
      () => vec2(4100, 600),
      () => vec2(4220, 800),
      () => vec2(5200, 800),
      () => vec2(5300, 800),
    ],
    fishRanges: [300, 500, 400, 500, 900, 800],
  }
  
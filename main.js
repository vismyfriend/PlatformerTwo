import kaboom from "./libs/kaboom.mjs"
import { Player } from "./entities/Player.js"
import { Spiders } from "./entities/Spiders.js"
import { Axes } from "./entities/Axes.js"
import { Saws } from "./entities/Saws.js"
import { Birds } from "./entities/Birds.js"
import { Projectiles } from "./entities/Projectiles.js"
import { attachCamera } from "./utils/camera.js"
import { Level } from "./utils/level.js"
import { uiManager } from "./utils/UIManager.js"
import { load } from "./utils/loader.js"
import { level1Config } from "./content/level1/config.js"
import { level2Config } from "./content/level2/config.js"
import { level3Config } from "./content/level3/config.js"
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js"
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js"
import { level3Layout, level3Mappings } from "./content/level3/level3Layout.js"

kaboom({
    width: 1280,
    height: 720,
    letterbox: true
})

load.fonts()
load.sounds()
load.assets()


// сцены и уровни, то что видит игрок, настроены в файле ЮАЙменеджер
const scenes = {

    // первая сцена, то что видит игрок попадая на сайт
    menu: () => {
        uiManager.displayMainMenu()
        uiManager.displayMessage1()
        add([text(".")])
        add([
            text("VISMYFRIEND", { font: "Round", size: 24 }),
            area(),
            anchor("center"),
            pos(center().x + 250, center().y - 320),
        ])
    },



    controls: () => {
        uiManager.displayControlMenu()
    },



    1: () => {

        const waterAmbience = play("water-ambience",{
            volume: 0.12,
            loop: true
        })
        onSceneLeave(() => {
            waterAmbience.paused = true
        })

        setGravity(1400)

        const level1 = new Level()
        // level1.drawBackground("forest-background")
        level1.drawBackground("background-2")
        level1.drawMapLayout(level1Layout, level1Mappings)

        const player = new Player(
            level1Config.playerStartPosX,
            level1Config.playerStartPosY,
            level1Config.playerSpeed,
            level1Config.jumpForce,
            level1Config.nbLives,
            1,
            // уровень 1

            // ниже фолс обозначает что мы не на финальном уровне и можно дальше продолжать
            false
        )

        // разрешить игроку снизу запрыгивать на верхние уровни
        player.enablePassthrough()
        player.enableCoinPickUp()

        // подключаем умирание от мобов
        player.enableMobVunerability()
        player.update()




        add([
            text("Collect caps", { font: "Round", size: 24 }),
            area(),
            anchor("center"),
            pos(center().x + 850, center().y - 30),




        ])
        add([
            text("/ колЭкт кэпс /", { font: "Round", size: 24 }),
            area(),
            anchor("center"),
            pos(center().x + 850, center().y - 50),

        ])
        add([
            text("собирайте кепки", { font: "Round", size: 24 }),
            area(),
            anchor("center"),
            pos(center().x + 850, center().y - 70),

        ])




        add([
            text("Don't touch bears", { font: "Round", size: 24 }),
            area(),
            anchor("center"),
            pos(center().x + 1470, center().y - 35),




        ])
        add([
            text("/ донт тач БЭарз /", { font: "Round", size: 24 }),

            area(),
            anchor("center"),
            pos(center().x + 1470, center().y - 15),

        ])
        add([
            text("не трогай медведей", { font: "Round", size: 24 }),

            area(),
            anchor("center"),
            pos(center().x + 1470, center().y + 5),

        ])

        add([
            text("/  Б И Р /", { font: "Round", size: 24 }),
            area(),
            anchor("center"),
            pos(center().x + 1790, center().y - 25),

        ])
        add([
            text("BEER", { font: "Round", size: 24 }),

            area(),
            anchor("center"),
            pos(center().x + 1790, center().y - 5),

        ])
        add([
            text("And don't drink", { font: "Round", size: 24 }),
            area(),
            anchor("center"),
            pos(center().x + 1790, center().y - 45),

        ])

        const spiders = new Spiders(
            level1Config.spiderPositions.map(spiderPos => spiderPos()),
            level1Config.spiderRanges,
            level1Config.spiderDurations,
            level1Config.spiderType
            //    захаркодить - это прямо здесь написать данные паука
            // но чтобы не было хардкора вставим эти данные в config.js для нужного уровня
            // [vec2(2000,300)],
            // range = amplitude
            // [300],
            // speeds = durations = velocity
            // [2],
            //  1
        )
        // добавляем движения паука
        spiders.setMovementPattern()
        // подключаем передвижения паука из файла spiderr.js
        spiders.enablePassthrough()



        const fish = new Projectiles(

            // Nan color bad value for lerperror fixed by MAP
            level1Config.fishPositions.map(fishPos => fishPos()),
            level1Config.fishRanges,
            "fish"
        )
        fish.setMovementPattern()

        // чтобы камера была немного позади объекта
        attachCamera(player.gameObj, 0, 200)


        level1.drawWaves("water", "wave")

        // эот фон для жизней
        // uiManager.addDarkBg()

        uiManager.displayCoinCount()
        uiManager.displayLivesCounter()
        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)


    },
    2: () => {



        const lavaAmbience = play("lava-ambience",{
            volume: 0.9,
            loop: true
        })
        onSceneLeave(() => {
            lavaAmbience.paused = true
        })

        setGravity(1400)

        const level2 = new Level()
        level2.drawBackground("background-1")
        level2.drawMapLayout(level2Layout, level2Mappings)

        const player = new Player(
            level2Config.playerStartPosX,
            level2Config.playerStartPosY,
            level2Config.playerSpeed,
            level2Config.jumpForce,
            level2Config.nbLives,
            2,
            // уровень 2

            // ниже фолс обозначает что мы не на финальном уровне и можно дальше продолжать
            false
        )

        // разрешить игроку снизу запрыгивать на верхние уровни
        player.enablePassthrough()
        player.enableCoinPickUp()
        player.update()

        const spiders = new Spiders(
            level2Config.spiderPositions.map(spiderPos => spiderPos()),
            level2Config.spiderRanges,
            level2Config.spiderDurations,
            level2Config.spiderType

        )
        // добавляем движения паука
        spiders.setMovementPattern()
        // подключаем передвижения паука из файла spiderr.js
        spiders.enablePassthrough()
        player.enableMobVunerability()




        const fish = new Projectiles(

            // Nan color bad value for lerperror fixed by MAP
            level2Config.flamePositions.map(flamePos => flamePos()),
            level2Config.flameRanges,
            "flame"
        )
        fish.setMovementPattern()


        const axes = new Axes(
            level2Config.axesPositions.map(axePos => axePos()),
            level2Config.axesSwingDurations

        )
        axes.setMovementPattern()

        const saws = new Saws(
            level2Config.sawPositions.map(sawPos => sawPos()),
            level2Config.sawRanges

        )


        saws.setMovementPattern()

        // чтобы камера была немного позади объекта
        attachCamera(player.gameObj, 0, 200)

        level2.drawWaves("water", "wave")

        // эот фон для жизней
        // uiManager.addDarkBg()

        uiManager.displayCoinCount()
        uiManager.displayLivesCounter()
        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)
        uiManager.displayWordsInTheGame()

    },
    3: () => {


        const windAmbience = play("strong-wind",{
            volume: 0.9,
            loop: true
        })
        onSceneLeave(() => {
            windAmbience.paused = true
        })

        // bgSoundManager.pauseAllSounds()
        // bgSoundManager.addSound("strong-wind", { volume: 0.2, loop: true })
        // bgSoundManager.play("strong-wind")
        setGravity(level3Config.gravity)
        const level3 = new Level()
        level3.drawBackground3("sky-background-0")
        level3.drawBackground3("sky-background-1")
        level3.drawBackground3("sky-background-2")
        level3.drawMapLayout(level3Layout, level3Mappings)

        const player = new Player(
            level3Config.playerStartPosX,
            level3Config.playerStartPosY,
            level3Config.playerSpeed,
            level3Config.jumpForce,
            level3Config.nbLives,
            3,

            //   это означает, что это финальный уровень
            true
        )
        player.enablePassthrough()
        player.enableCoinPickUp()
        player.enableMobVunerability()

        level3.drawWaves("clouds", "wave")

        // const birds = new Birds(
        //   level3Config.birdPositions.map((birdPos) => birdPos()),
        //   level3Config.birdRanges,
        //   level3Config.birdType
        // )

        // birds.setMovementPattern()


        const birds = new Birds(
            level3Config.birdPositions.map(birdPos => birdPos()),
            level3Config.birdRanges



        )
        birds.setMovementPattern()

        attachCamera(player.gameObj, 0, 200)

        uiManager.displayCoinCount()
        uiManager.displayLivesCounter()
        player.updateLives(uiManager.livesCountUI)
        player.updateCoinCount(uiManager.coinCountUI)
        uiManager.displayWordsInTheGame()

    },

    gameover: async () => {
        uiManager.displayGameOverScreen()
    },

    end: () => {
        uiManager.displayEndGameScreen()
    }
}

// key - название сцены нужной

for (const key in scenes) {
    scene(key, scenes[key])
}

// первая сцена
go("menu")


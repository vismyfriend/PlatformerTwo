export class Level {
    

    drawWaves(type, anim) {
    //  волны идут вместе с камерой
        let offset = -100
        for (let i = 0; i < 21; i++) {
          add([sprite(type, { anim }), pos(offset, 600), scale(4), fixed()])
          offset += 64
        }
      }

    drawMapLayout(levelLayout, mappings) {
        const layerSettings = {
            tileWidth: 16,
            tileHeight: 12,
            tiles: mappings
        }
// вообще это правильнее было бы назвать слои
        this.map = []
        for (const layerLayout of levelLayout) {
            // это тоже самое что FOR IN на питоне
            this.map.push(addLevel(layerLayout, layerSettings))
            // это то что создает карту игры и рисует (передаем сюда параметры объекты и размеры)
        }

        for (const layer of this.map) {
            layer.use(scale(4))
        }

    }
    
    drawBackground(bgSpriteName) {
        // указываем fixed чтобы не двигался фон за камерой


        // вот здесь масштабирование background
        add([sprite(bgSpriteName), fixed(), scale(1)])
    }
    drawBackground3(bgSpriteName) {
        // указываем fixed чтобы не двигался фон за камерой


        // вот здесь масштабирование background
        add([sprite(bgSpriteName), fixed(), scale(4)])
    }
    
}
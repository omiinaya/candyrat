//global vars
var currentImage;

//global functions
function getImage() {
  return currentImage;
}

window.addEventListener("load", function (event) {

  const AssetsManager = function () {

    this.tile_set_image = undefined;

  };

  AssetsManager.prototype = {

    constructor: Game.AssetsManager,

    requestZone: function (id, callback) {

      callback(getZone(id))

    },

    requestImage: function (url, callback) {

      let image = new Image();

      image.addEventListener("load", function (event) {

        callback(image);

      }, { once: true });

      image.src = url;

    },

  };

  var keyDownUp = function (event) {

    controller.keyDownUp(event.type, event.keyCode);

  };

  var resize = function (event) {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
    display.render();

  };

  var render = function () {

    var frame = undefined;

    //calls function drawmap from display then passes loaded image
    display.drawMap(assets_manager.tile_set_image,
      game.world.tile_set.columns, game.world.graphical_map, game.world.columns, game.world.tile_set.tile_size);

    for (let index = game.world.donnuts.length - 1; index > -1; --index) {

      let donnut = game.world.donnuts[index];

      frame = game.world.tile_set.frames[donnut.frame_value];

      display.drawObject(assets_manager.tile_set_image,
        frame.x, frame.y,
        donnut.x + Math.floor(donnut.width * 0.5 - frame.width * 0.5) + frame.offset_x,
        donnut.y + frame.offset_y, frame.width, frame.height);

    }

    for (let index = game.world.candies.length - 1; index > -1; --index) {

      let candy = game.world.candies[index];

      frame = game.world.tile_set.frames[candy.frame_value];

      display.drawObject(assets_manager.tile_set_image,
        frame.x, frame.y,
        candy.x + Math.floor(candy.width * 0.5 - frame.width * 0.5) + frame.offset_x,
        candy.y + frame.offset_y, frame.width, frame.height);

    }

    playerframe = game.world.tile_set.frames[game.world.player.frame_value];

    display.drawObject(assets_manager.tile_set_image,
      playerframe.x, playerframe.y,
      game.world.player.x + Math.floor(game.world.player.width * 0.5 - playerframe.width * 0.5) + playerframe.offset_x,
      game.world.player.y + playerframe.offset_y, playerframe.width, playerframe.height);

    enemyframe = game.world.tile_set.frames[game.world.enemy.frame_value];

    display.drawObject(assets_manager.tile_set_image,
      enemyframe.x, enemyframe.y,
      game.world.enemy.x + Math.floor(game.world.enemy.width * 0.5 - enemyframe.width * 0.5) + enemyframe.offset_x,
      game.world.enemy.y + enemyframe.offset_y, enemyframe.width, enemyframe.height);

    display.render();

  };

  var update = function () {

    if (controller.left.active) { game.world.player.moveLeft(); controller.left.active = false; }
    if (controller.right.active) { game.world.player.moveRight(); controller.right.active = false; }
    if (controller.up.active) { game.world.player.moveUp(); controller.up.active = false; }
    if (controller.down.active) { game.world.player.moveDown(); controller.down.active = false; }
    if (controller.left2.active) { game.world.enemy.moveLeft(); controller.left2.active = false; }
    if (controller.right2.active) { game.world.enemy.moveRight(); controller.right2.active = false; }
    if (controller.up2.active) { game.world.enemy.moveUp(); controller.up2.active = false; }
    if (controller.down2.active) { game.world.enemy.moveDown(); controller.down2.active = false; }


    game.update();

    if (game.world.door) {

      engine.stop();

      assets_manager.requestZone((zone) => {

        game.world.setup(zone);

        engine.start();

      });

      return;

    }

  };

  // OBJECTS

  var assets_manager = new AssetsManager();
  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var game = new Game();
  var engine = new Engine(1000 / 60, render, update);


  // INITIALIZE

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;
  display.buffer.imageSmoothingEnabled = false;

  assets_manager.requestZone(0, (zone) => {
    game.world.setup(zone);

    assets_manager.requestImage("candyrat.png", (image) => {

      assets_manager.tile_set_image = image;
      currentImage = image;

      resize();
      engine.start();

    });

  });

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);

});

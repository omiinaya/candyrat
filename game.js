const Game = function () {

  this.world = new Game.World();

  this.update = function () {

    this.world.update();

  };

};

Game.prototype = { constructor: Game };

Game.Animator = function (frame_set, delay, mode = "loop") {

  this.count = 0;
  this.delay = (delay >= 1) ? delay : 1;
  this.frame_set = frame_set;
  this.frame_index = 0;
  this.frame_value = frame_set[0];
  this.mode = mode;

};
Game.Animator.prototype = {

  constructor: Game.Animator,

  animate: function () {

    switch (this.mode) {

      case "loop": this.loop(); break;
      case "pause": break;

    }

  },

  changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {

    if (this.frame_set === frame_set) { return; }

    this.count = 0;
    this.delay = delay;
    this.frame_set = frame_set;
    this.frame_index = frame_index;
    this.frame_value = frame_set[frame_index];
    this.mode = mode;

  },

  loop: function () {

    this.count++;

    while (this.count > this.delay) {

      this.count -= this.delay;

      this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;

      this.frame_value = this.frame_set[this.frame_index];

    }

  }

};

Game.Collider = function () {
  this.collide = function (value, object, tile_x, tile_y, tile_size) {
    switch (value) {

      case 1:
        this.collidePlatformTop(object, tile_y); break;
      case 2:
        this.collidePlatformRight(object, tile_x + tile_size); break;
      case 3:
        if (
          this.collidePlatformTop(object, tile_y)) return;
        this.collidePlatformRight(object, tile_x + tile_size); break;
      case 4:
        this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 5:
        if (
          this.collidePlatformTop(object, tile_y)) return;
        this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 6:
        if (
          this.collidePlatformRight(object, tile_x + tile_size)) return;
        this.collidePlatformBottom(object, tile_y + tile_size); break;
      case 7:
        if (
          this.collidePlatformTop(object, tile_y)) return;
        if (
          this.collidePlatformBottom(object, tile_y + tile_size)) return;
        this.collidePlatformRight(object, tile_x + tile_size); break;
      case 8:
        this.collidePlatformLeft(object, tile_x); break;
      case 9:
        if (
          this.collidePlatformTop(object, tile_y)) return;
        this.collidePlatformLeft(object, tile_x); break;
      case 10:
        if (
          this.collidePlatformLeft(object, tile_x)) return;
        this.collidePlatformRight(object, tile_x + tile_size); break;
      case 11:
        if (
          this.collidePlatformTop(object, tile_y)) return;
        if (
          this.collidePlatformLeft(object, tile_x)) return;
        this.collidePlatformRight(object, tile_x + tile_size); break;
      case 12:
        if (
          this.collidePlatformBottom(object, tile_y + tile_size)) return;
        this.collidePlatformLeft(object, tile_x); break;
      case 13:
        if (
          this.collidePlatformTop(object, tile_y)) return;
        if (
          this.collidePlatformBottom(object, tile_y + tile_size)) return;
        this.collidePlatformLeft(object, tile_x); break;
      case 14:
        if (
          this.collidePlatformBottom(object, tile_y + tile_size)) return;
        if (
          this.collidePlatformLeft(object, tile_x)) return;
        this.collidePlatformRight(object, tile_x + tile_size); break;
      case 15:
        if (
          this.collidePlatformTop(object, tile_y)) return;
        if (
          this.collidePlatformBottom(object, tile_y + tile_size)) return;
        if (
          this.collidePlatformLeft(object, tile_x)) return;
        this.collidePlatformRight(object, tile_x + tile_size); break;

    }

  }

};
Game.Collider.prototype = {

  constructor: Game.Collider,

  collidePlatformBottom: function (object, tile_bottom) {
    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
      object.setTop(tile_bottom);
      object.velocity_y = 0;
      return true;
    }
    return false;
  },

  collidePlatformLeft: function (object, tile_left) {
    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
      object.setRight(tile_left - 0.01);
      object.velocity_x = 0;
      return true;
    }
    return false;
  },

  collidePlatformRight: function (object, tile_right) {
    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
      object.setLeft(tile_right);
      object.velocity_x = 0;
      return true;
    }
    return false;
  },

  collidePlatformTop: function (object, tile_top) {
    if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
      object.setBottom(tile_top - 0.01);
      object.velocity_y = 0;
      object.jumping = false;
      return true;
    }
    return false;
  }
};

Game.Frame = function (x, y, width, height, offset_x = 0, offset_y = 0) {

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.offset_x = offset_x;
  this.offset_y = offset_y;

};

Game.Frame.prototype = { constructor: Game.Frame };

Game.Object = function (x, y, width, height) {

  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;

};

Game.Object.prototype = {

  constructor: Game.Object,

  collideObject: function (object) {

    if (this.getRight() < object.getLeft() ||
      this.getBottom() < object.getTop() ||
      this.getLeft() > object.getRight() ||
      this.getTop() > object.getBottom()) {
      return false;
    }
    return true;
  },

  collideObjectCenter: function (object) {
    let center_x = object.getCenterX();
    let center_y = object.getCenterY();
    if (center_x < this.getLeft() || center_x > this.getRight() ||
      center_y < this.getTop() || center_y > this.getBottom()) {
      return false;
    }
    return true;
  },

  getBottom: function () { return this.y + this.height; },
  getCenterX: function () { return this.x + this.width * 0.5; },
  getCenterY: function () { return this.y + this.height * 0.5; },
  getLeft: function () { return this.x; },
  getRight: function () { return this.x + this.width; },
  getTop: function () { return this.y; },
  setBottom: function (y) { this.y = y - this.height; },
  setCenterX: function (x) { this.x = x - this.width * 0.5; },
  setCenterY: function (y) { this.y = y - this.height * 0.5; },
  setLeft: function (x) { this.x = x; },
  setRight: function (x) { this.x = x - this.width; },
  setTop: function (y) { this.y = y; }

};

Game.MovingObject = function (x, y, width, height, velocity_max = 15) {

  Game.Object.call(this, x, y, width, height);

  this.velocity_max = velocity_max;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.x_old = x;
  this.y_old = y;

};

Game.MovingObject.prototype = {

  getOldBottom: function () { 
    console.log(this)
    return this.y_old + this.height; },
  getOldCenterX: function () { 
    console.log(this)
    return this.x_old + this.width * 0.5; },
  getOldCenterY: function () { 
    console.log(this)
    return this.y_old + this.height * 0.5; },
  getOldLeft: function () { 
    console.log(this)
    return this.x_old; },
  getOldRight: function () { 
    console.log(this)
    return this.x_old + this.width; },
  getOldTop: function () { return this.y_old; },
  setOldBottom: function (y) { this.y_old = y - this.height; },
  setOldCenterX: function (x) { this.x_old = x - this.width * 0.5; },
  setOldCenterY: function (y) { this.y_old = y - this.height * 0.5; },
  setOldLeft: function (x) { this.x_old = x; },
  setOldRight: function (x) { this.x_old = x - this.width; },
  setOldTop: function (y) { this.y_old = y; }

};

Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;

/* The donnut class extends Game.Object and Game.Animation. */
Game.Donnut = function (x, y) {

  Game.Object.call(this, x, y, 7, 14);
  Game.Animator.call(this, Game.Donnut.prototype.frame_sets["twirl"], 15);

  this.frame_index = Math.floor(Math.random() * 2);

  /* base_x and base_y are the point around which the donnut revolves. position_x
  and y are used to track the vector facing away from the base point to give the donnut
  the floating effect. */
  this.base_x = x;
  this.base_y = y;
  this.position_x = Math.random() * Math.PI * 2; //randomizes left and right movement
  this.position_y = this.position_x * 2;

};

Game.Donnut.prototype = {

  frame_sets: { "twirl": [20, 21] },

  updatePosition: function () {

    this.position_x += 0.1;
    this.position_y += 0.2;

    this.x = this.base_x + Math.cos(this.position_x) * 2;
    this.y = this.base_y + Math.sin(this.position_y);

  }

};

Object.assign(Game.Donnut.prototype, Game.Animator.prototype);
Object.assign(Game.Donnut.prototype, Game.Object.prototype);
Game.Donnut.prototype.constructor = Game.Donnut;

Game.Candy = function (x, y) {

  Game.Object.call(this, x, y, 7, 14);
  Game.Animator.call(this, Game.Candy.prototype.frame_sets["twirl"], 15);

  this.frame_index = Math.floor(Math.random() * 2);

  this.base_x = x;
  this.base_y = y;
  this.position_x = Math.random() * Math.PI * 2; //randomizes left and right movement
  this.position_y = this.position_x * 2;

};

Game.Candy.prototype = {

  frame_sets: { "twirl": [22, 23] },

  updatePosition: function () {

    this.position_x += 0.1;
    this.position_y += 0.2;

    this.x = this.base_x + Math.cos(this.position_x) * 2;
    this.y = this.base_y + Math.sin(this.position_y);

  }

};

Object.assign(Game.Candy.prototype, Game.Animator.prototype);
Object.assign(Game.Candy.prototype, Game.Object.prototype);
Game.Candy.prototype.constructor = Game.Candy;

Game.Enemy = function (x, y) {

  Game.MovingObject.call(this, x, y, 7, 14);

  Game.Animator.call(this, Game.Enemy.prototype.frame_sets["placeholder"], 10);

  this.direction_x =-1;
  this.velocity_x = 0;
  this.velocity_y = 0;

  currentEnemy = this;

};

Game.Enemy.prototype = {

  frame_sets: {
    "placeholder": [24]
  },

  moveUp: function () {
    this.direction_y = 1;
    this.direction_x = 0;
    this.velocity_y = -1;
    this.velocity_x = 0;
  },

  moveDown: function () {
    this.direction_y = -1;
    this.direction_x = 0;
    this.velocity_y = 1;
    this.velocity_x = 0;
  },

  moveLeft: function () {
    this.direction_x = -1;
    this.direction_y = 0;
    this.velocity_x = -1;
    this.velocity_y = 0;
  },

  moveRight: function () {
    this.direction_x = 1;
    this.direction_y = 0;
    this.velocity_x = 1;
    this.velocity_y = 0;
  },

  updatePosition: function () {

    this.x_old = this.x;
    this.y_old = this.y;

    /* Made it so that velocity cannot exceed velocity_max */
    if (Math.abs(this.velocity_x) > this.velocity_max)
      this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
      this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x += this.velocity_x;
    this.y += this.velocity_y;

  }

};

Object.assign(Game.Enemy.prototype, Game.MovingObject.prototype);
Object.assign(Game.Enemy.prototype, Game.Animator.prototype);
Game.Enemy.prototype.constructor = Game.Enemy;


Game.Door = function (door) {

  Game.Object.call(this, door.x, door.y, door.width, door.height);

  this.destination_x = door.destination_x;
  this.destination_y = door.destination_y;
  this.destination_zone = door.destination_zone;

};

Game.Door.prototype = {};
Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;

Game.Player = function (x, y) {

  //set width and height of the player.
  Game.MovingObject.call(this, x, y, 12, 12);

  Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-down"], 10);

  this.direction_x = 1;
  this.velocity_x = 0;
  this.velocity_y = 0;

  currentPlayer = this;

};

Game.Player.prototype = {

  frame_sets: {

    "idle-left": [0],
    "move-up": [1, 2, 3, 4],
    "move-left": [5, 6, 7, 8],
    "idle-right": [9],
    "move-down": [10, 11, 12, 13],
    "move-right": [14, 15, 16, 17],
    "idle-up": [18],
    "idle-down": [19]

  },

  moveUp: function () {
    this.direction_y = 1;
    this.direction_x = 0;
    this.velocity_y = -1;
    this.velocity_x = 0;
  },

  moveDown: function () {
    this.direction_y = -1;
    this.direction_x = 0;
    this.velocity_y = 1;
    this.velocity_x = 0;
  },

  moveLeft: function () {
    this.direction_x = -1;
    this.direction_y = 0;
    this.velocity_x = -1;
    this.velocity_y = 0;
  },

  moveRight: function () {
    this.direction_x = 1;
    this.direction_y = 0;
    this.velocity_x = 1;
    this.velocity_y = 0;
  },

  updateAnimation: function () {

    if (this.direction_x < 0 && this.direction_y === 0) {

      if (this.velocity_x < -0.1) {
        this.changeFrameSet(this.frame_sets["move-left"], "loop", 5)
      } else {
        this.changeFrameSet(this.frame_sets["idle-left"], "pause")
      }

    }

    else if (this.direction_x > 0 && this.direction_y === 0) {

      if (this.velocity_x > 0.1) {
        this.changeFrameSet(this.frame_sets["move-right"], "loop", 5)
      } else {
        this.changeFrameSet(this.frame_sets["idle-right"], "pause")
      }

    }

    else if (this.direction_y < 0 && this.direction_x === 0) {

      if (this.velocity_y > 0.1) {
        this.changeFrameSet(this.frame_sets["move-down"], "loop", 5)
      } else {
        this.changeFrameSet(this.frame_sets["idle-down"], "pause")
      }
    }

    else if (this.direction_y > 0 && this.direction_x === 0) {
      if (this.velocity_y < -0.1) {
        this.changeFrameSet(this.frame_sets["move-up"], "loop", 5)
      } else {
        this.changeFrameSet(this.frame_sets["idle-up"], "pause")
      }
    }

    this.animate();

  },

  updatePosition: function () {

    this.x_old = this.x;
    this.y_old = this.y;

    /* Made it so that velocity cannot exceed velocity_max */
    if (Math.abs(this.velocity_x) > this.velocity_max)
      this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
      this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x += this.velocity_x;
    this.y += this.velocity_y;

  }

};

Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;

Game.TileSet = function (columns, tile_size, tile_scale) {

  this.columns = columns;
  this.tile_size = tile_size;
  this.tile_scale = tile_scale;

  let f = Game.Frame;

  this.frames = [

    // idle-left
    new f(0, 112, 16, 16, 0, 0),   //0

    // move-up
    new f(96, 96, 16, 16, 0, 0),   //1
    new f(112, 96, 16, 16, 0, 0),  //2
    new f(96, 96, 16, 16, 0, 0),   //3
    new f(112, 96, 16, 16, 0, 0),  //4

    // walk-left
    new f(16, 112, 16, 16, 0, 0),  //5
    new f(32, 112, 16, 16, 0, 0),  //6
    new f(16, 112, 16, 16, 0, 0),  //7
    new f(32, 112, 16, 16, 0, 0),  //8

    // idle-right
    new f(80, 112, 16, 16, 0, 0),  //9

    // move-down
    new f(64, 96, 16, 16, 0, 0),   //10
    new f(48, 96, 16, 16, 0, 0),   //11
    new f(64, 96, 16, 16, 0, 0),   //12
    new f(48, 96, 16, 16, 0, 0),   //13

    // walk-right
    new f(48, 112, 16, 16, 0, 0),  //14
    new f(64, 112, 16, 16, 0, 0),  //15
    new f(48, 112, 16, 16, 0, 0),  //16
    new f(64, 112, 16, 16, 0, 0),  //17

    // idle-up
    new f(80, 96, 16, 16, 0, 0),   //18
    // idle-down
    new f(32, 96, 16, 16, 0, 0),   //19
    // donnut
    new f(96, 112, 16, 16),         //20
    new f(112, 112, 16, 16),        //21
    // candy
    new f(0, 128, 16, 16, 0, 0),    //22
    new f(16, 128, 16, 16, 0, 0),   //23
    // enemy 1
    new f(32, 128, 16, 16, 0, 0)    //24
  ];

};
Game.TileSet.prototype = { constructor: Game.TileSet };

Game.World = function () {

  this.collider = new Game.Collider();

  this.columns = 12;
  this.rows = 9;

  //8 columns, size 16
  this.tile_set = new Game.TileSet(8, 16);
  this.player = new Game.Player(34, 114);
  this.enemy = new Game.Enemy(50, 114);

  this.zone_id = "00";

  this.donnuts = [];// the array of donnuts in this zone;
  this.candies = [];
  this.donnut_count = 0;// the number of donnuts you have.
  this.candies_count = 0;
  this.doors = [];
  this.door = undefined;

  this.height = this.tile_set.tile_size * this.rows;
  this.width = this.tile_set.tile_size * this.columns;

  currentWorld = this;
};
Game.World.prototype = {

  constructor: Game.World,

  collideObject: function (object) {

    /* I got rid of the world boundary collision. Now it's up to the tiles to keep
    the player from falling out of the world. */

    var bottom, left, right, top, value;

    top = Math.floor(object.getTop() / this.tile_set.tile_size);
    left = Math.floor(object.getLeft() / this.tile_set.tile_size);
    value = this.collision_map[top * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    top = Math.floor(object.getTop() / this.tile_set.tile_size);
    right = Math.floor(object.getRight() / this.tile_set.tile_size);
    value = this.collision_map[top * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left = Math.floor(object.getLeft() / this.tile_set.tile_size);
    value = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right = Math.floor(object.getRight() / this.tile_set.tile_size);
    value = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

  },

  setup: function (zone) {

    this.donnuts = new Array();
    this.candies = new Array();
    this.doors = new Array();
    this.collision_map = zone.collision_map;
    this.graphical_map = zone.graphical_map;
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.zone_id = zone.id;

    for (let index = zone.donnuts.length - 1; index > -1; --index) {

      let donnut = zone.donnuts[index];
      this.donnuts[index] = new Game.Donnut(donnut[0] * this.tile_set.tile_size + 5, donnut[1] * this.tile_set.tile_size - 2);

    }

    for (let index = zone.candies.length - 1; index > -1; --index) {

      let candy = zone.candies[index];
      this.candies[index] = new Game.Candy(candy[0] * this.tile_set.tile_size + 5, candy[1] * this.tile_set.tile_size - 2);

    }

    for (let index = zone.doors.length - 1; index > -1; --index) {

      let door = zone.doors[index];
      this.doors[index] = new Game.Door(door);

    }


    if (this.door) {

      if (this.door.destination_x != -1) {

        this.player.setCenterX(this.door.destination_x);
        this.player.setOldCenterX(this.door.destination_x);// It's important to reset the old position as well.

      }

      if (this.door.destination_y != -1) {

        this.player.setCenterY(this.door.destination_y);
        this.player.setOldCenterY(this.door.destination_y);

      }

      this.door = undefined;// Make sure to reset this.door so we don't trigger a zone load.

    }

  },

  update: function () {

    this.player.updatePosition();

    this.enemy.updatePosition();

    this.collideObject(this.player);

    this.collideObject(this.enemy);

    for (let index = this.donnuts.length - 1; index > -1; --index) {

      let donnut = this.donnuts[index];

      donnut.updatePosition();
      donnut.animate();

      if (donnut.collideObject(this.player)) {

        this.donnuts.splice(this.donnuts.indexOf(donnut), 1);
        this.donnut_count++;

      }

    }

    for (let index = this.candies.length - 1; index > -1; --index) {

      let candy = this.candies[index];

      candy.updatePosition();
      candy.animate();

      if (candy.collideObject(this.player)) {

        this.candies.splice(this.candies.indexOf(candy), 1);
        this.candy_count++;

      }

    }


    let enemy = currentEnemy;

    enemy.updatePosition();
    enemy.animate();

    if (enemy.collideObject(this.player)) {
      console.log("You have died.")
      
      console.log(this);
      //this.enemies.splice(this.enemies.indexOf(enemy), 1);
      //this.enemy_count++;

    }



    for (let index = this.doors.length - 1; index > -1; --index) {

      let door = this.doors[index];

      if (door.collideObjectCenter(this.player)) {

        this.door = door;

      };

    }


    this.player.updateAnimation();

  }

};

const Controller = function() {

  this.left  = new Controller.ButtonInput();
  this.right = new Controller.ButtonInput();
  this.up    = new Controller.ButtonInput();
  this.down = new Controller.ButtonInput();
  this.shift = new Controller.ButtonInput();

  this.left2  = new Controller.ButtonInput();
  this.right2 = new Controller.ButtonInput();
  this.up2    = new Controller.ButtonInput();
  this.down2 = new Controller.ButtonInput();
  this.shift2 = new Controller.ButtonInput();

  this.keyDownUp = function(type, key_code) {

    var down = (type == "keydown") ? true : false;

    switch(key_code) {
      //wasd
      case 65: this.left.getInput(down); break;
      case 68: this.right.getInput(down); break;
      case 87: this.up.getInput(down); break;
      case 83: this.down.getInput(down); break;
      //arrow keys
      case 37: this.left2.getInput(down);  break;
      case 38: this.up2.getInput(down);    break;
      case 39: this.right2.getInput(down); break;
      case 40: this.down2.getInput(down); break;
      //others
      case 16: this.shift.getInput(down); break; //shift
      case 32: this.up.getInput(down); break; //space
    }

  };

};

Controller.prototype = {

  constructor : Controller

};

Controller.ButtonInput = function() {

  this.active = this.down = false;

};

Controller.ButtonInput.prototype = {

  constructor : Controller.ButtonInput,

  getInput : function(down) {

    if (this.down != down) this.active = down;
    this.down = down;

  }

};

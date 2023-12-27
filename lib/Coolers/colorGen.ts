let randomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let Color = function (hue = null, sat = null, light = null) {
  // Settings
  // Play with these to change the types of colors generated
  this.minHue = 0;
  this.maxHue = 360;

  this.minSat = 75;
  this.maxSat = 100;

  this.minLight = 65;
  this.maxLight = 80;

  this.scaleLight = 15;

  // Set hue
  this.hue = hue || randomNum(this.minHue, this.maxHue);

  // Redo if ugly hue is generated
  // Because magenta is hideous
  if (this.hue > 288 && this.hue < 316) {
    this.hue = randomNum(316, 360);
  } else if (this.hue > 280 && this.hue < 288) {
    this.hue = randomNum(260, 280);
  }

  this.sat = sat || randomNum(this.minSat, this.maxSat);
  this.light = light || randomNum(this.minLight, this.maxLight);

  this.hsl = 'hsl(' + this.hue + ', ' + this.sat + '%, ' + this.light + '%)';
};

// Change hue by rotation number
Color.prototype.changeHue = function (hue, rotate) {
  return hue + rotate > this.maxHue ? hue + rotate - this.maxHue : hue + rotate;
};

// Scale lightness while keeping within limits
Color.prototype.changeLight = function (light) {
  return light + this.scaleLight > this.maxLight
    ? this.maxLight
    : light + this.scaleLight;
};

export default Color;

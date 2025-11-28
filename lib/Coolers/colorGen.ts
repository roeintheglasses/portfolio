function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Color {
  // Settings
  minHue = 0;
  maxHue = 360;
  minSat = 75;
  maxSat = 100;
  minLight = 65;
  maxLight = 80;
  scaleLight = 15;

  hue: number;
  sat: number;
  light: number;
  hsl: string;

  constructor(hue?: number | null, sat?: number | null, light?: number | null) {
    // Set hue
    this.hue = hue ?? randomNum(this.minHue, this.maxHue);

    // Redo if ugly hue is generated
    // Because magenta is hideous
    if (this.hue > 288 && this.hue < 316) {
      this.hue = randomNum(316, 360);
    } else if (this.hue > 280 && this.hue < 288) {
      this.hue = randomNum(260, 280);
    }

    this.sat = sat ?? randomNum(this.minSat, this.maxSat);
    this.light = light ?? randomNum(this.minLight, this.maxLight);

    this.hsl = 'hsl(' + this.hue + ', ' + this.sat + '%, ' + this.light + '%)';
  }

  // Change hue by rotation number
  changeHue(hue: number, rotate: number): number {
    return hue + rotate > this.maxHue ? hue + rotate - this.maxHue : hue + rotate;
  }

  // Scale lightness while keeping within limits
  changeLight(light: number): number {
    return light + this.scaleLight > this.maxLight ? this.maxLight : light + this.scaleLight;
  }
}

export default Color;

import Color from './colorGen';

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateGradientString() {
  let colorOneHsl = new Color();
  let colorTwoHsl = new Color();
  let colorThreeHsl = new Color();

  let colorOne = hslToHex(colorOneHsl.hue, colorOneHsl.sat, colorOneHsl.light);
  let colorTwo = hslToHex(colorTwoHsl.hue, colorTwoHsl.sat, colorTwoHsl.light);
  let colorThree = hslToHex(
    colorThreeHsl.hue,
    colorThreeHsl.sat,
    colorThreeHsl.light
  );

  let gradientString = `from-[${colorOne}] via-[${colorTwo}] to-[${colorThree}]`;

  console.log(gradientString);

  return gradientString;
}

import Color from './colorGen';

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number): string => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateGradientString(): string {
  const colorOneHsl = new Color();
  const colorTwoHsl = new Color();
  const colorThreeHsl = new Color();

  const colorOne = hslToHex(colorOneHsl.hue, colorOneHsl.sat, colorOneHsl.light);
  const colorTwo = hslToHex(colorTwoHsl.hue, colorTwoHsl.sat, colorTwoHsl.light);
  const colorThree = hslToHex(colorThreeHsl.hue, colorThreeHsl.sat, colorThreeHsl.light);

  const gradientString = `from-[${colorOne}] via-[${colorTwo}] to-[${colorThree}]`;
  return gradientString;
}

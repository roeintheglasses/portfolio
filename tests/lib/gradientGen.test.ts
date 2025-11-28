import { describe, it, expect } from 'vitest';
import { generateGradientString } from '@/lib/Coolers/gradientGen';

describe('generateGradientString', () => {
  it('should return a valid Tailwind gradient string', () => {
    const gradient = generateGradientString();

    // Should match pattern: from-[#XXXXXX] via-[#XXXXXX] to-[#XXXXXX]
    const gradientPattern =
      /^from-\[#[0-9a-fA-F]{6}\] via-\[#[0-9a-fA-F]{6}\] to-\[#[0-9a-fA-F]{6}\]$/;
    expect(gradient).toMatch(gradientPattern);
  });

  it('should generate different gradients on subsequent calls', () => {
    const gradient1 = generateGradientString();
    const gradient2 = generateGradientString();
    const gradient3 = generateGradientString();

    // While not guaranteed (randomness), it's highly unlikely all three are the same
    const allSame = gradient1 === gradient2 && gradient2 === gradient3;
    expect(allSame).toBe(false);
  });

  it('should contain valid hex color codes', () => {
    const gradient = generateGradientString();

    // Extract hex colors
    const hexColors = gradient.match(/#[0-9a-fA-F]{6}/g);

    expect(hexColors).toHaveLength(3);
    hexColors?.forEach((hex) => {
      expect(hex).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it('should include from, via, and to Tailwind classes', () => {
    const gradient = generateGradientString();

    expect(gradient).toContain('from-[');
    expect(gradient).toContain('via-[');
    expect(gradient).toContain('to-[');
  });
});

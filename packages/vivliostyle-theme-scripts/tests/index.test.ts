import { join } from 'path';
import { describe, expect, it } from 'vitest';

import { getAuthor, getTheme, validatePackage } from '../src';

const fixture = (name: string) => join(__dirname, 'fixtures', name);

describe('getTheme', () => {
  it('prefers vivliostyle.theme.style over style and main', () => {
    expect(
      getTheme({
        vivliostyle: { theme: { style: 'theme.css' } },
        style: 'style.css',
        main: 'main.css',
      }),
    ).toBe('theme.css');
  });

  it('falls back to style, then to main', () => {
    expect(getTheme({ style: 'style.css', main: 'main.css' })).toBe(
      'style.css',
    );
    expect(getTheme({ main: 'main.css' })).toBe('main.css');
  });

  it('returns undefined when no locator is set', () => {
    expect(getTheme({})).toBeUndefined();
  });
});

describe('getAuthor', () => {
  it('prefers vivliostyle.theme.author over author', () => {
    expect(
      getAuthor({
        vivliostyle: { theme: { author: 'Theme Author' } },
        author: 'Package Author',
      }),
    ).toBe('Theme Author');
  });

  it('falls back to author', () => {
    expect(getAuthor({ author: 'Package Author' })).toBe('Package Author');
  });

  it('returns undefined when no author is set', () => {
    expect(getAuthor({})).toBeUndefined();
  });
});

describe('validatePackage', () => {
  it('reports nothing for a valid package', () => {
    expect(validatePackage(fixture('valid.package.json'))).toEqual([]);
  });

  it('reports an error when the style locator is missing', () => {
    const result = validatePackage(fixture('missing-style.package.json'));
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('error');
    expect(result[0].message).toContain('missing style locator');
  });

  it('reports a warning when the author is missing', () => {
    const result = validatePackage(fixture('missing-author.package.json'));
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('warning');
    expect(result[0].message).toContain('missing author');
  });

  it('reports an error when package.json does not exist', () => {
    const result = validatePackage(fixture('does-not-exist.json'));
    expect(result).toEqual([
      { type: 'error', message: "package.json doesn't exist." },
    ]);
  });
});

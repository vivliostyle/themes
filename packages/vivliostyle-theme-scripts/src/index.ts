import { readFileSync } from 'fs';

export interface ValidationResult {
  type: 'error' | 'warning';
  message: string;
}

export function getTheme(pkgJson: any): string | undefined {
  const maybeStyle =
    pkgJson?.vivliostyle?.theme?.style ?? pkgJson.style ?? pkgJson.main;

  if (!maybeStyle) {
    return undefined;
  }
  return maybeStyle;
}

export function getAuthor(pkgJson: any): string | undefined {
  return pkgJson?.vivliostyle?.theme?.author ?? pkgJson?.author;
}

export function validatePackage(packagePath: string): ValidationResult[] {
  try {
    let result = [] as ValidationResult[];
    const pkgJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    if (!pkgJson)
      return [{ type: 'error', message: 'failed to parse package.json.' }];
    const theme = getTheme(pkgJson);
    if (!theme) {
      result.push({
        type: 'error',
        message: `missing style locator. set one of the followings:
- vivliostyle.theme.style
- style
- main`,
      });
    }

    if (!getAuthor(pkgJson)) {
      result.push({
        type: 'warning',
        message: `missing author. set one of the followings:
- vivliostyle.theme.author
- author`,
      });
    }

    return result;
  } catch (err) {
    return [{ type: 'error', message: "package.json doesn't exist." }];
  }
}

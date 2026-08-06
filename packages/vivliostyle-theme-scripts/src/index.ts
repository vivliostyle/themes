import { readFileSync } from 'node:fs';

export interface ValidationResult {
  type: 'error' | 'warning';
  message: string;
}

export interface ThemePackageJson {
  author?: string;
  main?: string;
  style?: string;
  vivliostyle?: {
    theme?: {
      author?: string;
      style?: string;
    };
  };
}

export function getTheme(pkgJson: ThemePackageJson): string | undefined {
  return pkgJson.vivliostyle?.theme?.style ?? pkgJson.style ?? pkgJson.main;
}

export function getAuthor(pkgJson: ThemePackageJson): string | undefined {
  return pkgJson.vivliostyle?.theme?.author ?? pkgJson.author;
}

export function validatePackage(packagePath: string): ValidationResult[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(packagePath, 'utf8'));
  } catch {
    return [{ type: 'error', message: "package.json doesn't exist." }];
  }
  if (!parsed || typeof parsed !== 'object') {
    return [{ type: 'error', message: 'failed to parse package.json.' }];
  }

  const pkgJson = parsed as ThemePackageJson;
  const result: ValidationResult[] = [];

  if (!getTheme(pkgJson)) {
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
}

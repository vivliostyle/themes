# Contribution Guidelines

## Developing theme

- See [Theme Spec](./docs/spec.md).

## Developing this repository

This repository is a pnpm workspace. Install [pnpm](https://pnpm.io/installation) 11 and use the Node.js version pinned in [.nvmrc](./.nvmrc).

```bash
pnpm install
pnpm build:tools  # build the TypeScript packages; lint:theme needs them
pnpm lint
pnpm fmt:check
pnpm typecheck
pnpm test
```

Building the themes renders every example book with Vivliostyle CLI. It downloads a browser on first run and takes several minutes:

```bash
pnpm build:themes
pnpm capture-pdf  # regenerate docs/assets/captures/*.webp from the built PDFs
```

Themes that `@import` a sibling theme currently render without it: the CLI serves each theme from its own directory, so `../theme-base/theme-all.css` resolves outside the server root and 404s while the build still reports success. Until the CLI can serve the workspace, treat the output of `build:themes` for those themes as incomplete.

### Releasing

Releases run on [Changesets](https://github.com/changesets/changesets). Add a changeset in the same pull request as your change:

```bash
pnpm exec changeset
```

Merging to `main` opens a version pull request, and merging that one publishes to npm.

Publishing authenticates through npm's trusted publishing (OIDC), which every package registers against the workflow file name `.github/workflows/release.yml`. Renaming that file stops publishing until each package's trusted publisher entry is updated.

## Donating your theme

We appreciate your donation to the list of our official themes!

### Merging criteria

- The design and type of your theme should be reasonably distinct from all other existing official themes. This is to avoid duplication.
- Your theme has to meet our [Theme Spec](./docs/spec.md).
- You have to sign the Contributor License Agreement.
- You must follow [Code of Conduct](CODE_OF_CONDUCT.md).

### Perks

- You will become a member of [Vivliostyle](https://github.com/vivliostyle) as well as a maintainer of `vivliostyle/theme` as a part of @vivliostyle/theme team.
- You will be given permissions to manage `vivliostyle/themes` and all the other theme-related repositories which enables you to:
  - Push to the repository
  - Triage issues
  - Review and merge pull-requests

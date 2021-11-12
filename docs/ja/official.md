# 公式 Theme の採用

汎用的で多くのユーザが使うと思われる Theme は公式 Theme として採用します。公式 Theme は [vivliostyle/themes レポジトリ][] で管理され、`@vivliostyle/theme-*` という名前で npm package として公開されます。

## 採用条件

公式 Theme として採用する条件は以下の通りです。

- Theme のデザインと主な用途が、既存の公式 Theme と異なっていること
- [Theme の仕様](https://vivliostyle.github.io/themes/#/ja/spec)を満たしていること
- Contributor License Agreement に署名すること
- [Code of Conduct](https://github.com/vivliostyle/themes/blob/master/CODE_OF_CONDUCT.md) に従うこと

[vivliostyle/themes レポジトリ]: https://github.com/vivliostyle/themes

## 採用方法

[vivliostyle/themes レポジトリ][] に pull request を送ってください。

- Theme 名は `@vivliostyle/theme-*` とすること
- ソースコードを packages/@vivliostyle/theme-\* に含めること

公式 Theme に採用された場合、[vivliostyle/themes レポジトリ][]のメンテナとして以下の権限が与えられます。

- レポジトリへの push
- issue のトリアージ
- pull request の review と merge

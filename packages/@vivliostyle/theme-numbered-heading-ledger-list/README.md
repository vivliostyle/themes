# @vivliostyle/theme-numbered-heading-ledger-list

横書き2段組の名簿向けテーマ。柱+ヘッダー罫、番号付き見出し、4列台帳型グリッドを高密度に反復させる。

## 使い方

```css
@import '@vivliostyle/theme-numbered-heading-ledger-list';
```

## 原稿の書き方

- 章は `#` 見出しで始める。章題は紙面には出さず、running element として天の柱に流れる (章ごとに改ページ)。
- 節は `##` 見出し。番号は原稿に書かず、テーマが章内の連番で振る。番号を付けない節は閉じ `#` を付けて `## 本章の凡例 ##` と書く。
- 節への参照は `<a href="#節のid" data-ref="sec"></a>` (「18節」のように出る)。参照先の見出しには `## 住所不明会員 {#sec-unknown}` で id を付ける。
- 会則などの条文は `<p class="article">（名称）　…</p>` と書く。「第1条」はテーマが振る。

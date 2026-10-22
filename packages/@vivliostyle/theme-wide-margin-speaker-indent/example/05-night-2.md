---
title: "実装夜話　二度走った夜間ジョブ"
lang: ja
class: chapter
---

# 二度走った夜間ジョブ {#night-2}

<p class="chapter-lead">二〇二六年九月十七日／日次集計バッチ</p>

## 数字が二倍になる朝

<div class="dialogue">

<span class="speaker">真砂</span>二つめは、僕が最初に気づいた回だ。

<span class="speaker">柊</span>朝会だったね。前日の件数を読み上げたら、いつもの倍だった。

<span class="speaker">真砂</span>いい数字が出たと一瞬だけ思ったんだよ。一秒後に、これは事故だと思い直したけど。

<span class="speaker">柊</span>そのあと経理からも連絡が来た。月次の途中集計と合わない、と。

<span class="speaker">真砂</span>倍というのが、また嫌な数字だよね。中途半端にずれているより気持ち悪い。

<span class="speaker">柊</span>倍はほぼ確実に、同じものを二回足している。そこは最初から分かってた。分からなかったのは、どこで二回足したのか。

</div>

<div class="note">

日次集計バッチは、前日ぶんのイベントを種類ごとに数え、結果を集計表に書き出す。毎晩二時に走り、朝の各種レポートはすべてこの表を参照している。誤った値は、この時点ですでに八つのレポートに配られていた。

</div>

## 入力とクエリを疑う

<div class="dialogue">

<span class="speaker">柊</span>まず入力を疑った。イベントのほうが二重に記録されているんじゃないか、と。

<span class="speaker">真砂</span>それはありそう。

<span class="speaker">柊</span>ありそうだったけど、違った。イベントには一意のIDが付いていて、重複はゼロ。件数も前日と同じくらい。入力は正常。

<span class="speaker">真砂</span>じゃあ集計のクエリ。

<span class="speaker">柊</span>手元で同じ日付を指定して流してみたら、正しい値が出た。何度流しても正しい。

<span class="speaker">真砂</span>そこでまた手詰まりになるやつだ。

<span class="speaker">柊</span>時間帯の境界も疑った。集計の対象日をどのタイムゾーンで区切るか、という話。前日と当日の両方に数えられている時間帯があるんじゃないかと思って一時間かけたけど、これも白。

<span class="speaker">真砂</span>そのあいだ、実行ログは見てなかったの。

<span class="speaker">柊</span>見てなかった。処理の中身を疑っているときって、処理が何回走ったかは疑わないんだよ。一回に決まっていると思ってるから。

</div>

> 中身を疑っているあいだは、回数を疑わない

## 同じ日付が二回

<div class="dialogue">

<span class="speaker">柊</span>で、実行ログを開いたら、九月十六日ぶんの集計が二回走ってた。

<span class="speaker">真砂</span>あっさり見つかった。

<span class="speaker">柊</span>あっさり見つかった。開始が二時ちょうどと、二時十五分。十五分ずれてる。

<span class="speaker">真砂</span>十五分というのが意味ありげだね。

<span class="speaker">柊</span>意味があった。このバッチは走る前に排他ロックを取る。同じ集計が二重に走らないようにするための仕組みで、そのロックの有効期限が十五分だった。

<span class="speaker">真砂</span>つまり、処理が十五分で終わる前提で書かれていた。

<span class="speaker">柊</span>書いた当時は三分で終わってた。九月に入って対象データが増えて、その日はじめて十五分を超えた。

<span class="speaker">真砂</span>超えるとどうなるの。

<span class="speaker">柊</span>ロックが自動的に切れる。一つめのプロセスはそんなことは知らずに走り続けてる。そこへ実行基盤が、応答のないジョブとみなして二つめを投入する。二つめはロックを取れてしまう。だって空いているから。

<span class="speaker">真砂</span>それで二つが同時に集計して、結果を両方書いた。

<span class="speaker">柊</span>書き方が追記だったのが致命的で、同じ対象日の行が二組できた。読む側は日付で合計するから、きれいに二倍。

</div>

<div class="note">

この構成には、単独では問題にならない判断が三つ重なっている。ロックに有効期限を設けたこと、応答のないジョブを再投入すること、集計結果を追記で書くこと。どれも、それぞれの文脈では妥当な設計だった。障害の多くは、こうした妥当な判断の交差点で起きる。

</div>

## 二度目に壊れないようにする

<div class="dialogue">

<span class="speaker">真砂</span>直し方としては、ロックの期限を延ばす、が最初に思いつくよね。

<span class="speaker">柊</span>思いつくし、その場は三十分に延ばして凌いだ。でもそれは、次にデータが倍になるまでの延命でしかない。

<span class="speaker">真砂</span>本命は。

<span class="speaker">柊</span>出力を冪等にすること。追記をやめて、対象日ぶんを消してから入れ直す。同じトランザクションの中で。

</div>

```sql title="batch/daily_summary.sql — 追記から置き換えへ"
BEGIN;
DELETE FROM daily_summary WHERE target_date = :target_date;
INSERT INTO daily_summary (target_date, kind, count)
  SELECT :target_date, kind, count(*)
    FROM events
   WHERE occurred_on = :target_date
   GROUP BY kind;
COMMIT;
```

<div class="dialogue">

<span class="speaker">真砂</span>これなら二回走っても結果は同じ。

<span class="speaker">柊</span>同じ。二回目は一回目の結果を消して、同じものを書き直すだけ。無駄ではあるけど、壊れはしない。

<span class="speaker">真砂</span>ロックのほうは。

<span class="speaker">柊</span>期限は十五分のままにして、処理中は三十秒ごとに更新するようにした。生きているあいだは延び続けて、プロセスが死ねば十五分で自然に切れる。

<span class="speaker">真砂</span>再投入は止めなかったんだ。

<span class="speaker">柊</span>止めない。再投入は正しい仕組みだから。二度走っても平気にするほうが筋がいい。

</div>

> 一度しか走らない処理、というものはない

<div class="dialogue">

<span class="speaker">真砂</span>再発防止としては何を残した。

<span class="speaker">柊</span>レビューの観点を一行足した。この処理は二度走っても同じ結果になりますか、という質問。

<span class="speaker">真砂</span>質問形式なのがいいね。

<span class="speaker">柊</span>禁止事項にすると読まれないんだよ。質問なら答えないといけない。答えられないときは、たいてい何か見落としている。

</div>

<div class="dialogue">

<span class="speaker">真砂</span>検知のほうはどうしたの。次に二重に走っても、気づくのは朝会というのでは同じだよね。

<span class="speaker">柊</span>そこも足した。集計が終わるたびに、その日の実行回数を記録する。二回以上なら鳴る。

<span class="speaker">真砂</span>二回走ること自体は、もう壊れないんだよね。

<span class="speaker">柊</span>壊れない。でも二回走ったという事実は、どこかがおかしい合図ではある。壊れなくなったからといって、知らなくていいわけじゃない。

<span class="speaker">真砂</span>処理時間も見るようにした？

<span class="speaker">柊</span>した。前の週の中央値の二倍を超えたら鳴る。ロックの期限に近づいていることに、事故が起きる前に気づける。

<span class="speaker">真砂</span>今回でいうと、三分が十五分になるまでのどこかで鳴っていたはずだ。

<span class="speaker">柊</span>九月のはじめに鳴ってた。そこで手を打っていれば、この夜はなかった。

</div>

<div class="note">

二度走っても壊れない、という性質は冪等と呼ばれる。分散した仕組みの上では、通信の切断も再試行もいずれ必ず起きるため、一度だけ実行されることを保証するより、何度実行されても同じ結果になるように書くほうが安く済む場合が多い。この夜の教訓は、その原則を社内の言葉に置き換えたものだった。
</div>

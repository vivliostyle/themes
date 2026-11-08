---
title: "実装夜話　二重に走った夜間ジョブ"
lang: ja
class: chapter
---

# 二重に走った夜間ジョブ {#night-2}

<p class="chapter-lead">2026年9月17日／日次集計バッチ</p>

## 数字が2倍になった朝

<div class="dialogue">

<span class="speaker">真砂</span>2つめは、僕が最初に気づいた回だ。

<span class="speaker">柊</span>朝会だったね。前日の件数を読み上げたら、いつもの倍だった。

<span class="speaker">真砂</span>いい数字が出たと一瞬だけ思ったんだよ。1秒後には、これは事故だと思い直したけど。

<span class="speaker">柊</span>そのあと経理からも連絡が来た。月次の途中集計と合わない、と。

<span class="speaker">真砂</span>倍というのが、また嫌な数字だよね。中途半端にずれているより気持ち悪い。

<span class="speaker">柊</span>ちょうど倍なら、ほぼ確実に同じものを2回足している。そこは最初から分かってた。分からなかったのは、どこで2回足したのか。

</div>

<div class="note">

日次集計バッチは、前日分のイベントを種類ごとに数え、結果を集計表に書き出す。毎晩2時に実行され、朝の各種レポートはすべてこの表を参照している。誤った値は、この時点ですでに8つのレポートに反映されていた。

</div>

## 入力とクエリを疑う

<div class="dialogue">

<span class="speaker">柊</span>まず入力を疑った。イベントのほうが二重に記録されているんじゃないか、と。

<span class="speaker">真砂</span>それはありそう。

<span class="speaker">柊</span>ありそうだったけど、違った。イベントには一意のIDが付いていて、重複はゼロ。件数もいつもと同じくらい。入力は正常。

<span class="speaker">真砂</span>じゃあ集計のクエリ。

<span class="speaker">柊</span>手元で同じ日付を指定して流してみたら、正しい値が出た。何度流しても正しい。

<span class="speaker">真砂</span>そこでまた手詰まりになるやつだ。

<span class="speaker">柊</span>日付の区切りも疑った。集計の対象日をどのタイムゾーンで区切るか、という話。前日と当日の両方に数えられている時間帯があるんじゃないかと思って1時間かけたけど、これも違った。

<span class="speaker">真砂</span>そのあいだ、実行ログは見てなかったの。

<span class="speaker">柊</span>見てなかった。処理の中身を疑っているときって、処理が何回走ったかは疑わないんだよ。1回に決まっていると思ってるから。

</div>

> 中身を疑っているあいだは、回数を疑わない

## 同じ日付が2回

<div class="dialogue">

<span class="speaker">柊</span>で、実行ログを開いたら、9月16日分の集計が2回走ってた。

<span class="speaker">真砂</span>あっさり見つかった。

<span class="speaker">柊</span>あっさり見つかった。開始が2時ちょうどと、2時15分。15分ずれてる。

<span class="speaker">真砂</span>15分というのが意味ありげだね。

<span class="speaker">柊</span>意味があった。このバッチは走る前に排他ロックを取る。同じ集計が二重に走らないようにするための仕組みで、そのロックの有効期限が15分だった。

<span class="speaker">真砂</span>つまり、処理が15分以内に終わる前提で書かれていた。

<span class="speaker">柊</span>書いた当時は3分で終わってた。9月に入って対象データが増えて、その日はじめて15分を超えた。

<span class="speaker">真砂</span>超えるとどうなるの。

<span class="speaker">柊</span>ロックが自動的に切れる。1つめのプロセスはそんなことは知らずに走り続けてる。そこへ実行基盤が、応答のないジョブとみなして2つめを投入する。2つめはロックを取れてしまう。だって空いているから。

<span class="speaker">真砂</span>それで2つが同時に集計して、両方が結果を書き込んだ。

<span class="speaker">柊</span>書き込みが追記方式だったのが致命的で、同じ対象日の行が2組できた。読む側は日付で合計するから、きれいに2倍。

</div>

<div class="note">

この構成には、単独では問題にならない判断が3つ重なっている。ロックに有効期限を設けること、応答のないジョブを再投入すること、集計結果を追記で書くこと。どれも、それぞれの文脈では妥当な設計だった。障害の多くは、こうした妥当な判断が交わるところで起きる。

</div>

## 二重に走っても壊れないようにする

<div class="dialogue">

<span class="speaker">真砂</span>直し方としては、ロックの期限を延ばすのが最初に思いつくよね。

<span class="speaker">柊</span>思いつく。その場は30分に延ばしてしのいだ。でもそれは、次にデータが倍になるまでの延命でしかない。

<span class="speaker">真砂</span>本命は。

<span class="speaker">柊</span>出力を冪等にすること。追記をやめて、対象日分を消してから入れ直す。同じトランザクションの中で。

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

<span class="speaker">真砂</span>これなら2回走っても結果は同じ。

<span class="speaker">柊</span>同じ。2回目は1回目の結果を消して、同じものを書き直すだけ。無駄ではあるけど、壊れはしない。

<span class="speaker">真砂</span>ロックのほうは。

<span class="speaker">柊</span>期限は15分のままにして、処理中は30秒ごとに延長するようにした。生きているあいだは延び続けて、プロセスが死ねば15分で自然に切れる。

<span class="speaker">真砂</span>再投入は止めなかったんだ。

<span class="speaker">柊</span>止めなかった。再投入は正しい仕組みだから。二重に走っても平気なように作るほうが筋がいい。

</div>

> 1回しか走らない処理、というものはない

<div class="dialogue">

<span class="speaker">真砂</span>再発防止としては何を残した。

<span class="speaker">柊</span>レビューのチェック項目に1行足した。この処理は2回走っても同じ結果になりますか、という質問。

<span class="speaker">真砂</span>質問形式なのがいいね。

<span class="speaker">柊</span>禁止事項にすると読まれないんだよ。質問なら答えないといけない。答えられないときは、たいてい何か見落としている。

</div>

<div class="dialogue">

<span class="speaker">真砂</span>検知のほうはどうしたの。次にまた二重に走ったとき、気づくのが朝会だったら同じことだよね。

<span class="speaker">柊</span>そこも手を入れた。集計が終わるたびに、その日の実行回数を記録する。2回以上なら鳴る。

<span class="speaker">真砂</span>2回走っても、もう壊れはしないんだよね。

<span class="speaker">柊</span>壊れない。でも2回走ったという事実は、どこかがおかしいという合図ではある。壊れなくなったからといって、知らなくていいわけじゃない。

<span class="speaker">真砂</span>処理時間も見るようにした？

<span class="speaker">柊</span>した。前の週の中央値の2倍を超えたら鳴る。ロックの期限に近づいていることに、事故が起きる前に気づける。

<span class="speaker">真砂</span>今回でいうと、3分が15分になるまでのどこかで鳴っていたはずだ。

<span class="speaker">柊</span>あとで計算したら、9月のはじめには鳴っていたはずだった。そこで手を打てていれば、この夜はなかった。

</div>

<div class="note">

何度実行しても結果が変わらない性質を冪等性と呼ぶ。分散システムでは、通信の切断も再試行もいずれ必ず起きるため、1回だけ実行されることを保証するより、何度実行されても同じ結果になるように作るほうが安く済む場合が多い。この夜の教訓は、その原則を自分たちの現場に当てはめたものだった。
</div>

---
title: "実装夜話　鳴らなかったアラート"
lang: ja
class: chapter
---

# 鳴らなかったアラート {#night-1}

<p class="chapter-lead">二〇二六年八月二十日／通知ワーカー</p>

## 朝九時の問い合わせ

<div class="dialogue">

<span class="speaker">真砂</span>一つめの夜からいこうか。これ、正確には夜じゃなくて朝の話だよね。

<span class="speaker">柊</span>気づいたのが朝だっただけで、止まっていたのは前の晩から。八月十九日の二十三時十分に通知ワーカーが仕事をしなくなって、それが分かったのが翌朝の九時二十分。十時間ちょっと、誰も知らなかった。

<span class="speaker">真砂</span>気づいたのは問い合わせ窓口から？

<span class="speaker">柊</span>そう。予約したのに確認の通知が来ない、という問い合わせが朝から三件続いて、窓口の人が変だと思って連絡をくれた。監視じゃなくて人間が見つけた。

<span class="speaker">真砂</span>そのとき、ダッシュボードは。

<span class="speaker">柊</span>全部緑。開いた瞬間に、これは長くなるなと思った。

</div>

<div class="note">

記録では、最初の連絡から原因の特定までに四時間近くかかっている。障害そのものは二十三時十分に始まっていたから、利用者から見た停止時間は十四時間を超えた。復旧作業そのものは十分で終わっている。

</div>

## 緑のダッシュボード

<div class="dialogue">

<span class="speaker">真砂</span>緑だった、というところをもう少し詳しく。何が緑だったの。

<span class="speaker">柊</span>ワーカーの健全性を示すパネルが三つあって、プロセスが生きているか、CPUとメモリが正常か、エラー率がしきい値以下か。この三つが全部緑だった。

<span class="speaker">真砂</span>プロセスは実際に生きてたんだ。

<span class="speaker">柊</span>生きてた。落ちてはいない。CPUもメモリも平常どおり。むしろ平常より低い。仕事をしていないんだから当たり前なんだけど、そのときはそう読めなかった。

<span class="speaker">真砂</span>エラー率は。

<span class="speaker">柊</span>ゼロ％。これも緑。

<span class="speaker">真砂</span>そこがいちばん怖いところだよね。

<span class="speaker">柊</span>まったくその通りで、エラー率がゼロだったのは、成功していたからじゃない。一件も処理していなかったから。分母がゼロだった。

</div>

<div class="note">

失敗の割合を測る指標は、処理そのものが行われなくなると意味を失う。ゼロを何で割ってもゼロにはならず、多くの監視系はこの状態を「データなし」として扱う。問題は、その「データなし」を正常と読むか異常と読むかが、設定した人の意図に委ねられている点にある。

</div>

## 犯人を三人ほど疑う

<div class="dialogue">

<span class="speaker">柊</span>最初に疑ったのは通知の配信業者。うちの外にあるから、疑うと気が楽なんだよね。

<span class="speaker">真砂</span>正直でよろしい。

<span class="speaker">柊</span>でも業者側の記録を見たら、そもそもうちから一件も送られていなかった。うちの中で止まってる。

<span class="speaker">真砂</span>次は。

<span class="speaker">柊</span>前日の夕方にリリースがあったから、その差分を全部洗った。通知テンプレートの文言を変える変更が入っていて、これが怪しいということになって三十分。

<span class="speaker">真砂</span>白だった。

<span class="speaker">柊</span>白。文言を戻しても何も変わらない。そこでようやくキューを見た。

<span class="speaker">真砂</span>そこ、最初に見る場所では。

<span class="speaker">柊</span>いま言われると本当にそう思う。未処理が四万件たまってた。二十三時十分から、きれいに一件も減っていない。

</div>

> 犯人を外から順に疑うと、いちばん近い場所が最後に残る

## 分母がゼロだった

<div class="dialogue">

<span class="speaker">真砂</span>で、ワーカーは何をしていたの。生きてはいたわけだよね。

<span class="speaker">柊</span>接続待ちのループに入っていた。二十三時十分にキューとの接続が切れて、そのあと再接続を試みて、失敗して、また試みる。それを十時間続けていた。

<span class="speaker">真砂</span>例外は投げないんだ。

<span class="speaker">柊</span>投げない。再接続は想定内の動作だから、警告のログが出るだけ。しかも警告は毎回同じ一行だから、量が多いだけで誰も読まない。

<span class="speaker">真砂</span>アラートの条件には入っていなかった。

<span class="speaker">柊</span>入っていなかった。うちのアラートは全部、何かが失敗したときに鳴るようにできていて、何も起きないときに鳴るものが一つもなかった。

<span class="speaker">真砂</span>止まっているのは失敗じゃない、という扱いになってたのか。

<span class="speaker">柊</span>そう。そして仕上げがこれ。処理件数のメトリクスは送られていたんだけど、値がゼロのときは送信しない実装になっていた。だから監視から見ると、その十時間はデータそのものが存在しない。

<span class="speaker">真砂</span>データなし。

<span class="speaker">柊</span>データなしのときにどう扱うか、という設定があって、既定値が「異常なしとみなす」だった。

</div>

<div class="note">

この既定値は、監視系の導入時に誰も触っていない。当時の設定を追うと、導入した人はメトリクスが一時的に欠けたときの誤報を避けたかったらしい。誤報を減らす設定が、そのまま無報を作る設定になっていた。

</div>

> 緑は、何も起きていないという意味ではなかった

## 沈黙を鳴らす

<div class="dialogue">

<span class="speaker">真砂</span>直したのは。

<span class="speaker">柊</span>その場はワーカーの再起動で戻った。十分。たまっていた四万件も十五分で流れきった。問題はそのあとで、同じことがまた起きても、また十時間気づかない。

<span class="speaker">真砂</span>だから監視のほうを直した。

<span class="speaker">柊</span>三つ足した。一つめ、十分間の処理件数がゼロなら鳴らす。二つめ、データなしを異常として扱う。三つめ、ゼロ件のときもメトリクスを送る。

</div>

```yaml title="monitoring/rules.yml — 沈黙を異常として扱う"
- name: 通知ワーカーが流れていない
  when: sum(jobs_done_10m) == 0
  for: 10m
  no_data: alert
  notify: [oncall]
```

<div class="dialogue">

<span class="speaker">真砂</span>`no_data: alert`の一行が今回の肝だよね。

<span class="speaker">柊</span>肝だし、この一行は他のルールにも全部入れた。三十いくつあった既存のアラートのうち、データなしを異常にしていたのは二つだけだった。

<span class="speaker">真砂</span>残りの三十は、静かに壊れる余地があったと。

<span class="speaker">柊</span>あった。だからもう一つ、月に一度アラートを鳴らしてみる日を作った。試験環境でワーカーを止めて、十分待って、当番の端末が鳴るかどうかを確かめる。

<span class="speaker">真砂</span>鳴らないこともあるの。

<span class="speaker">柊</span>初回でいきなり二本鳴らなかった。通知の宛先が、もう使っていないチャンネルのままだった。

</div>

<div class="dialogue">

<span class="speaker">真砂</span>十時間誰も気づかなかった、というのはチームの中でどう受け止められたの。

<span class="speaker">柊</span>最初は、当番だった人が責められる空気が少しあった。でも記録を見たら、その人は夜中に三回ダッシュボードを開いてる。

<span class="speaker">真砂</span>見てはいたんだ。

<span class="speaker">柊</span>見たうえで気づけない画面だった。だから振り返りでは、誰が見落としたかの話をやめて、何が見えていれば気づけたかだけを書いた。

<span class="speaker">真砂</span>その答えは。

<span class="speaker">柊</span>キューの滞留件数。実はあの画面にも出てたんだよ。パネルの三番目の、下のほうに小さく。

<span class="speaker">真砂</span>出てはいたけど、緑の三つに目が行く。

<span class="speaker">柊</span>行く。だから画面の並びも変えた。いちばん上に、いま処理が流れているかどうかだけを大きく出す。

<span class="speaker">真砂</span>件数じゃなくて。

<span class="speaker">柊</span>件数も出すけど、まず流れているか止まっているかの二語。夜中の三時に読むものは、二語がいい。

</div>

<div class="note">

アラートは書いた時点では動作を確認できない。鳴るべき状況をわざと作らないかぎり、その設定が正しいという証拠は最後まで得られないからだ。この会のあと、監視ルールには「これが壊れたとき何が鳴るか」を書く欄が追加された。
</div>

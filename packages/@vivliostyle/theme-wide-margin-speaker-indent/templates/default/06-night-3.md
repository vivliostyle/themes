---
title: "実装夜話　ビルドが壊れた夜"
lang: ja
class: chapter
---

# ビルドが壊れた夜 {#night-3}

<p class="chapter-lead">2026年10月29日／CIのビルド</p>

## 22時に落ちたビルド

<div class="dialogue">

<span class="speaker">柊</span>まず状況から共有するね。22時ちょうど、mainのCIが失敗した。依存解決の段階で、あるパッケージの指定バージョンが見つからない、というエラーで落ちてる。

<span class="speaker">真砂</span>ローカルでは再現しないやつ？

<span class="speaker">柊</span>そう。手元だと何事もなくビルドできる。同じコミット、同じコマンドなのに、CIでだけ、そんなバージョンはないと言われて失敗する。

<span class="speaker">真砂</span>その時点では、みんなレジストリ側の障害を疑ったんだよね。落ちる場所がいかにもそれっぽいから。

<span class="speaker">柊</span>いかにもそれっぽかった。しかもその日は、翌朝にリリースを控えてた。mainのビルドが通らないままだと出せない。

<span class="speaker">真砂</span>直前に入った変更は。

<span class="speaker">柊</span>21時52分に、共通UIライブラリを2.4.0から2.5.0に上げる変更がマージされてる。ロックファイルも一緒に更新されてた。

<span class="speaker">真砂</span>それが原因だと思うよね、普通は。

<span class="speaker">柊</span>思う。だから最初に、その変更を戻してみた。戻せばmainのビルドは通るはずだった。

<span class="speaker">真砂</span>通らなかった。

<span class="speaker">柊</span>通った。それで安心して、そのまま解散しかけた。

<span class="speaker">真砂</span>安心しちゃだめなやつだ。

<span class="speaker">柊</span>だめだった。だって、その変更自体はどこも悪くない。PRのビルドは通ってるんだから。戻すのは応急処置で、原因の説明にはならない。

</div>

<div class="note">

この夜の対応が長引いたのは、原因がいつも疑う場所になかったからだ。ログはたしかに依存解決の失敗を告げていたが、依存そのものは何も壊れていなかった。記録によれば、最初の1時間はほぼ全員がレジストリのステータスページを見つめて過ごしている。

</div>

## レジストリを疑う

<div class="dialogue">

<span class="speaker">柊</span>結論から言うと、レジストリは生きてた。試しにレジストリを直接叩いてみたら、ちゃんと2.5.0が返ってくる。

<span class="speaker">真砂</span>じゃあネットワークでもレジストリでもない。

<span class="speaker">柊</span>うん。プロキシもDNSも問題なし。切り分けを進めるほど、容疑者がひとりずつ消えていく感じだった。

<span class="speaker">真砂</span>そのとき、ランナーの中には入ってみた？

<span class="speaker">柊</span>入った。ランナーを1台つかまえて、手で同じコマンドを打った。そうしたら通る。

<span class="speaker">真砂</span>通るんだ。

<span class="speaker">柊</span>通る。同じマシンの、同じネットワークで、手で打つと通って、パイプラインから流すと落ちる。ここがいちばんわけが分からなかった。

<span class="speaker">真砂</span>それ、たいてい環境変数か設定ファイルの違いだよね。

<span class="speaker">柊</span>そう思って、環境変数を全部並べて突き合わせた。20分かけたけど、差はなかった。

</div>

<div class="note">

このとき比べていたのは、ランナーの上で手で打ったときと、パイプラインから流したときの環境変数だった。パイプラインがコマンドの前に何をしているか、という一段外側は、比較の対象に入っていない。あとから見れば、答えはその外側にあった。

</div>

## 消えていく候補

<div class="dialogue">

<span class="speaker">真砂</span>0時をまわったあたりだよね、たしか。

<span class="speaker">柊</span>まわってた。そのころには、疑ったものの一覧がホワイトボードに10個くらい並んでて、全部に横線が引いてあった。レジストリ、ネットワーク、プロキシ、DNS、ランナーの世代、依存のバージョン、ロックファイルの破損、時計のずれ。

<span class="speaker">真砂</span>時計まで疑ったのか。

<span class="speaker">柊</span>疑うものがなくなると、時計を疑うんだよ。

<span class="speaker">真砂</span>そこでいったん手を止めたんだよね。そもそも問いの立て方が合っているのか、って。

<span class="speaker">柊</span>止めた。ホワイトボードの横線を見てて、これは候補が尽きたんじゃなくて、候補の出し方が間違ってるんだと思った。

<span class="speaker">真砂</span>どう変えたの。

<span class="speaker">柊</span>何が壊れているかを探すのをやめて、手元とCIで違うものを全部書き出すことにした。壊れているかどうかは関係なく、違うものを全部。

</div>

<div class="note">

障害対応の現場では、切り分けが進むほど手詰まりに見えることがある。疑わしい箇所をひとつずつ潰して、どれも原因ではなかったとき、残るのは「前提のどこかが間違っている」という可能性だけになる。

</div>

## 読み飛ばしていた1行

<div class="dialogue">

<span class="speaker">柊</span>ログを頭から読み直した。すると依存を解決するより前に、ふだんは読み飛ばしている1行があった。`Restoring cache`。

<span class="speaker">真砂</span>CIのビルドキャッシュか。

<span class="speaker">柊</span>そう。しかも、復元したキャッシュの保存日が出てた。10月8日。

<span class="speaker">真砂</span>3週間前。

<span class="speaker">柊</span>3週間前の中身を、その夜のビルドは最新だと思って使っていた。

```text title="ビルドのログ（抜粋）"
[00:00:03] Restoring cache: deps-x86_64 (saved 2026-10-08)
[00:00:19] Resolving dependencies (network: disabled)
[00:00:21] error: no matching version found for shared-ui@2.5.0
[00:00:21] Job failed (elapsed 21s)
```

<span class="speaker">真砂</span>2行目、ネットワークが無効になってる。

<span class="speaker">柊</span>そこが2つめの発見だった。3週間前に、CIを速くするための変更が共通のパイプライン定義に入ってる。依存の解決をキャッシュだけで済ませて、レジストリには問い合わせない設定。

<span class="speaker">真砂</span>速くはなったの。

<span class="speaker">柊</span>なった。1回あたり40秒くらい縮んだ。悪い変更じゃないんだよ、単体では。

<span class="speaker">真砂</span>じゃあ、キャッシュの中には2.5.0が入っていないのに、外に取りにいくこともできない状態だった。

<span class="speaker">柊</span>そういうこと。パッケージマネージャから見ると、自分が知っている一覧に2.5.0が載っていない。だから返す答えは、そんなバージョンは存在しません、になる。

<span class="speaker">真砂</span>レジストリに本当にないときと、まったく同じ文面が出るわけだ。

<span class="speaker">柊</span>同じ文面が出る。あの3時間の半分は、この文面のせいだと思ってる。

</div>

<div class="note">

依存が見つからないという表示は、レジストリに存在しない場合と、こちらから問い合わせていない場合の両方で出る。前者は相手の問題であり、後者はこちらの設定の問題だが、利用者に見えるのは同じ1行である。エラーメッセージが原因の場所を指し示すとはかぎらない。

</div>

## 3週間前のままのキャッシュ

<div class="dialogue">

<span class="speaker">真砂</span>そこまで分かって、どう確かめたの。

<span class="speaker">柊</span>キャッシュを使わない設定で同じビルドを流した。2分待って、通った。

<span class="speaker">真砂</span>それで確定だ。

<span class="speaker">柊</span>確定。0時55分。ここまでで3時間近く経ってた。

<span class="speaker">真砂</span>キャッシュのキーはどうなってたの。

<span class="speaker">柊</span>`deps-`のあとにランナーの種類を付けただけ。`deps-x86_64`。それだけ。

<span class="speaker">真砂</span>依存の内容がキーに入っていない。

<span class="speaker">柊</span>入っていない。だから、依存が何に変わろうと同じキーを引く。しかもうちのCIは、同じキーのキャッシュがすでにあるときは上書きしない仕様だった。

<span class="speaker">真砂</span>じゃあ10月8日のものが、そのまま残り続けたのか。

<span class="speaker">柊</span>残り続けた。3週間、誰も依存を触らなかったから、誰も困らなかった。

</div>

## なぜあの夜まで平気だったのか

<div class="dialogue">

<span class="speaker">真砂</span>そこ、いちばん聞きたかったところ。壊れる下地は3週間前からあったのに、なんであの夜まで何も起きなかったの。

<span class="speaker">柊</span>条件が3つ揃う必要があったから。1つめ、キャッシュのキーに依存の内容が入っていないこと。これは最初からずっとそう。

<span class="speaker">真砂</span>2つめが、ネットワークを使わない設定。

<span class="speaker">柊</span>3週間前に入った。ここまでは、まだ何も起きない。キャッシュの中身とロックファイルが一致しているうちは、外に問い合わせる必要がないんだから。

<span class="speaker">真砂</span>3つめが、依存の更新。

<span class="speaker">柊</span>それが21時52分。この瞬間に、ロックファイルはキャッシュより新しくなった。3つ揃った。

<span class="speaker">真砂</span>PRのビルドが通ってたのは。

<span class="speaker">柊</span>キャッシュがブランチごとに分かれていたから。新しいブランチにはキャッシュがなくて、ゼロから解決される。ゼロから解決するときはネットワークを使うから、2.5.0はちゃんと取れる。

<span class="speaker">真砂</span>PRでは正しく動いて、mainに入った瞬間に壊れる。いちばん見つけにくい形だ。

<span class="speaker">柊</span>しかも、そのとき作られたキャッシュはそのブランチのものとして保存されて、mainには何も残らない。mainのキャッシュは10月8日のまま。

</div>

<div class="note">

直接の引き金は依存の更新だが、それを障害に変えたのは3週間前の高速化と、最初からあったキャッシュキーの設計である。単独では無害な3つの判断が、時間をおいて重なったときに初めて表に出た。3週間という間隔が、変更と結果を結びつけるのをいっそう難しくした。

</div>

## 3行の修正

> 壊れていたのはコードじゃなく、前提のほうだった

<div class="dialogue">

<span class="speaker">真砂</span>つまりコードは一行も間違っていなかった。間違っていたのは、キャッシュは常に最新である、という誰も口に出さない前提のほう。

<span class="speaker">柊</span>そういうこと。キャッシュのキーにロックファイルのハッシュを含めた。それで再発は止まった。修正自体はたった3行。

```yaml title="ci/pipeline.yml — 再発を止めた3行"
cache:
  key: deps-\{{ runner.arch }}-\{{ checksum "deps.lock" }}
  paths: ['.pkg-store', '.pkg-meta']
```

<span class="speaker">真砂</span>ロックファイルが変われば、キーも変わる。

<span class="speaker">柊</span>変わる。新しいキーのキャッシュはまだないから、ゼロから解決される。依存が変わっていない日は今までどおりキャッシュが効く。

<span class="speaker">真砂</span>速さは落ちない。

<span class="speaker">柊</span>落ちない。依存を更新した直後の1回だけ40秒遅くなる。それくらいの代償なら払っていい。

<span class="speaker">真砂</span>原因にたどり着くまでが3時間で、直すのが3行。障害対応って、だいたいそういう配分になるよね。

<span class="speaker">柊</span>なる。3行の中身より、その3行を書ける状態にたどり着くまでが本番なんだと思ってる。

</div>

## 次の夜のために

<div class="dialogue">

<span class="speaker">真砂</span>再発防止としては、キーの修正のほかに何を入れた。

<span class="speaker">柊</span>4つ。1つめは、ネットワークを使わない設定をやめて、キャッシュにないものは取りにいくように戻した。速さのために正しさを削るなら、削っていい場面を選ばないと危ない。

<span class="speaker">真砂</span>2つめは。

<span class="speaker">柊</span>キャッシュを使わずに再実行するボタンを、誰でも押せる場所に置いた。押せば数分で切り分けが1つ進む。あの夜これがあれば、3時間が30分で済んでいた。

<span class="speaker">真砂</span>3つめ。

<span class="speaker">柊</span>ログの出し方。`Restoring cache`の行の直後に、そのキャッシュがいつ保存されたものかを必ず出すようにした。もともと出てはいたんだけど、行末のかっこ書きで誰も見ていなかったから、独立した行にした。

<span class="speaker">真砂</span>4つめは、たしか一覧を作ったんだよね。

<span class="speaker">柊</span>手元とCIで違うものの一覧。設定ファイル、環境変数、ネットワークの可否、キャッシュの有無、時計。作るのに半日かかったけど、次に「手元では動く」が起きたとき、最初に開くのはこれになる。

</div>

<div class="note">

この一覧は、本書の編集中にすでに2回参照されている。1回目は、一覧に載っていた項目がそのまま原因だった。2回目は載っていなかった項目が原因で、その日のうちに項目が1つ書き足された。

</div>

<div class="dialogue">

<span class="speaker">真砂</span>そういえば、翌朝のリリースはどうなったの。

<span class="speaker">柊</span>出した。1時20分にビルドが通って、そのあと30分だけ議論した。原因が分かった直後にそのまま出していいのか、と。

<span class="speaker">真砂</span>直したのはCIの設定で、製品のコードじゃないもんね。

<span class="speaker">柊</span>そう。だから出せる、という理屈と、怖い、という感覚が半々だった。最後は、ビルドが通った理由を全員が説明できるなら出す、ということにした。

<span class="speaker">真砂</span>いい基準だ。

<span class="speaker">柊</span>あの夜に決めたことの中で、いちばん残したいのはこれ。通ったから出す、じゃなくて、通った理由が言えるから出す。

<span class="speaker">真砂</span>1つめの夜と、同じところに戻ってきたね。

<span class="speaker">柊</span>戻ってきた。「正常」も「成功」も、それだけでは何も語っていない。

</div>

<div class="dialogue">

<span class="speaker">真砂</span>最後にひとつ。あの夜、いちばん効いた判断はどれだったと思う。

<span class="speaker">柊</span>手を止めたところ。0時すぎに、候補を出すのをやめて違いを書き出すことにした、あの10分。あそこで方向が変わってなかったら、朝まで時計を疑ってたと思う。

</div>

<div class="note">

社内の振り返りで、この一件から教訓として残ったのは修正手順ではなく、「行き詰まったら、まず自分の前提を疑え」という一文だった。答えは最初からログに書いてあったのだ。
</div>

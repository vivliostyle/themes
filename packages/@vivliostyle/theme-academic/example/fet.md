# FET の特性

<div class="author">

- 2020/08/10
- びぶりお　ゆたか

</div>

## 目的

FET の特性を調査するとともに、FET を用いた回路の作製に習熟することを目的とする。

## 原理

### 半導体

物質は、電流が流れる**導体**と電流が流れない**絶縁体**、ある条件によって電流が流れる**半導体**に分類できる。これらはバンドギャップの幅の違いで区別でき、バンドギャップが大きいと電子が移動できず電流が流れない。半導体は絶縁体に比べてバンドギャップが小さく、半導体に不純物を混ぜることで電子や空孔の流れを制御できる。

半導体にはシリコンやゲルマニウムがよく使われるが、それらの結晶の性質は絶縁体に近く、電圧をかけても電気はほとんど流れない。しかしそこに電子を余計にもったリンなどの不純物をほんの少し加えるだけで、導体のような性質に変化する。この電子を余計にもった不純物が含まれる半導体を n (negative) 型半導体、逆に電子の少ないホウ素などの不純物が入った半導体を p (positive) 型半導体と呼ぶ。p 型半導体では、正孔と呼ばれる電子が足りない穴が電子の代わりの働きをし、＋の電子が動き回るように振舞う。この n 型と p 型を接合させることにより、電界の向きによって電流が流れたり流れなかったりする**整流作用**が現れる。

### 電界効果トランジスタの動作原理

p 型半導体と n 型半導体を接合することを pn 接合という。pn 接合すると、p 型半導体と n 型半導体の境界部分で電子と正孔が結合し、境界部分の n 側に＋、p 側に − の電気を帯びた領域ができる。この 2 つの領域は**空乏層**と呼ばれ、電流が流れない領域である。しかし、 p 側から n 側に電圧をかけると、空乏層で結合できなかった電子と正孔が接近し、一時的に空乏層が小さくなる。空乏層の厚さが十分に小さくなった時、電子と正孔がそれぞれ空乏層を越えられるようになるため、拡散電流が流れる。この p 側から n 側に電流が流れる方向を順方向という。逆方向に電圧をかけると空乏層は大きくなり、拡散電流は流れない。このように、pn 接合によって整流を行う素子をダイオードと呼ぶ。

FET には 3 本の端子が出ており、それぞれゲート (G)、ドレイン (D)、ソース (S) と名前がついている。FET は n 型半導体と p 型半導体の組み合わせでできており、チャネルの物質的性質によって n チャネル型 FET と p チャネル型 FET に分類できる。n チャネル型 FET はドレインとソースの電極周辺が n 型半導体で、その間が p 型半導体である。p チャネル型 FET はドレインとソースの電極周辺が p 型半導体で、その間が n 型半導体である。<a href="#n_fet" data-ref="fig"></a> に n チャネル型 FET、<a href="#p_fet" data-ref="fig"></a> に p チャネル型 FET の構造を簡略化して示した。

<!--
  【図表の参照】 https://github.com/vivliostyle/vfm/issues/11
    [@fig:id] や {#fig:id} のような記法は未実装のため、以下で代用
    - 参照元: <a href="#id" data-ref="fig"></a>
    - 参照先: <span id="id"></span>
-->

<!-- 図 -->

![n チャネル型 FET](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808190103.png){#n_fet}

<!-- ここまで図 -->

<!-- 図 -->

![p チャネル型 FET](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808190107.png){#p_fet}

<!-- ここまで図 -->

## 実験方法

### 静特性実験

<a href="#circuit_static" data-ref="fig"></a> に示す回路を作製した。

<!-- 図 -->

![静特性実験の回路](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808194807.png){#circuit_static}

<!-- ここまで図 -->

#### $V_{GS} - I_{D}$ 特性

$V_{GS}$ を 0 V から 4.5 V まで変化させたときの $I_{D}$ の値を測定した。 $V_{DS}$ が 3 V、10 V の場合のそれぞれについて行った。

#### $V_{DS} - I_{D}$ 特性

$V_{DS}$ を 0 V から 18 V まで変化させたときの $I_{D}$ の値を測定した。 $V_{GS}$ が 0.2 V、0.4 V、0.6 V、0.8 V の場合のそれぞれについて行った。

### 動特性実験

<a href="#circuit_dynamic" data-ref="fig"></a> に示す回路を作製した。

<!-- 図 -->

![動特性実験の回路](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808205247.png){#circuit_dynamic}

<!-- ここまで図 -->

#### 30 V を印加したときのゲート電圧 $V_{GS}$

回路に入力電圧として 30 V 加えた時のソースに対するゲートの電圧 $V_{GS}$ を調べた。

#### 入力信号 $f$ に対する出力 $v_{D}$ の変化

入力端子に $f =$ 1 kHz の微小な正弦波を入力し、 $v_{D}$（出力）が $v_{G}$（入力）に対しどのような変化をするか調べた。ただし、 $v_{G}$ は 50 mV から 3000 mV まで変化させた。

また、出力波形が歪みだす時の $v_{G}$ を調べた。

#### 電圧増幅率 $\mu$ の周波数特性

入力電圧を 1 V とし、周波数 $f$ を 0.004 kHz から 3000 kHz まで変化させ、電圧増幅率 $\mu$ の周波数特性を調べた。静特性・動特性の実験で使用した器具の一覧を <a href="#instruments" data-ref="table"></a> に示す。

<!--
  【表のキャプション】
    記法が未実装のため、HTMLで書いている
    表の記法は使用できる
    表内の別のVFM記法は未対応
    https://github.com/vivliostyle/vfm/issues/35
-->

<table id="instruments">
  <caption>実験器具</caption>
  <thead>
    <tr>
      <th>名称</th> <th>製造会社</th> <th>型番</th> <th>製造番号</th> <th>規格</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>FET</td> <td>-</td> <td>K30AGR5D</td> <td>-</td> <td>-</td>
    </tr>
    <tr>
      <td>コンデンサ</td> <td>-</td> <td>85P4, 7414</td> <td>-</td> <td>16V, l6 $\mu$ F</td>
    </tr>
    <tr>
      <td>直流電源</td> <td>METRONIX</td> <td>543A</td> <td>176541</td> <td>40V, 0.5A</td>
    </tr>
    <tr>
      <td>デイジタルマルチメ一タ</td> <td>TEXIO</td> <td>DL-2040</td> <td>13010369</td> <td>16VA, 50/60Hz</td>
    </tr>
    <tr>
      <td>オシロスコ一プ</td> <td>EZ</td> <td>OS-5020</td> <td>8075246</td> <td>20MHz</td>
    </tr>
    <tr>
      <td>フアンクションジエネレ一タ</td> <td>IWATSU</td> <td>SG-4105</td> <td>3227463</td> <td>15MHz</td>
    </tr>
    <tr>
      <td>発振器</td> <td>KENWOOD</td> <td>AG-204D</td> <td>11070316</td> <td>50/6O[Hz], 10.8[W]</td>
    </tr>
    <tr>
      <td>テスタ</td> <td>YOKOGAWA</td> <td>732-01</td> <td>9861132</td> <td>-</td>
    </tr>
  </tbody>
</table>

## 実験結果

### 静特性実験

#### $V_{GS} - I_{D}$

実験結果を <a href="#vgs_id" data-ref="fig"></a> に示す。 $V_{GS}$ が 2 V 以下で $I_{D}$ は $V_{GS}$ が大きくなるにつれて減少し、 $V_{GS}$ が 2 V 以上では $I_{D}$ はほぼ 0 A となった。また、 $V_{DS}$ の値が大きいほど $I_{D}$ の値は大きくなった。

#### $V_{DS} - I_{D}$ 特性

実験結果を <a href="#vds_id" data-ref="fig"></a> に示す。 $V_{DS}$ が 0 V から 2 V までの範囲で $I_{D}$ の値は急激に増加し、2 V 以降は増加減少を繰り返しながら全体的に増加した。 $V_{DS}$ の値が大きいほど $I_{D}$ の値は小さくなった。

### 動特性実験

#### 30V を印加した時のゲート電圧 $V_{GS}$

$V_{GS}$ の値は 1.42 V であった。

#### 入力信号 $f$ に対する出力 $V_{D}$ の変化

実験結果を <a href="#f_vd" data-ref="fig"></a> に示す。 $v_{G}$ が 50 mV から 300 mV までの範囲で $v_{D}$ は $v_{G}$ にほぼ比例していた。 $v_{G}$ が 1000 mV を超えると出力波形の傾きは負になった。また、 $v_{G}$ が 400 mV に なると $v_{G} - v_{D}$ 曲線の傾きは次第に小さくなり、出力波形が歪みだした。

#### 電圧増幅率 $\mu$ の周波数特性

実験結果を <a href="#f_mu" data-ref="fig"></a> に示す。周波数 $f$ が 10 Hz 以上 50 kHz 以下の時に電圧増幅率 $\mu$ は一定 (17〜18 V)となった。周波数 $f$ が 10 Hz 以下及び 50 kHz 以上の時に電圧増幅率 $\mu$ は低下した。

<!-- 図 -->

![$V_{DS}$ を固定した時の $V_{GS}$ に対する $I_{D}$ の変化](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808211415.png){#vgs_id}

<!-- ここまで図 -->

<!-- 図 -->

![$V_{GS}$ を固定した時の $V_{DS}$ に対する $I_{D}$ の変化](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808211420.png){#vds_id}

<!-- ここまで図 -->

<!-- 図 -->

![入力信号 $f =$ 1 kHz に対する出力 $v_{D}$ の変化](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808211425.png){#f_vd}

<!-- ここまで図 -->

<!-- 図 -->

![電圧増幅率 $\mu$ の周波数特性](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808211430.png){#f_mu}

<!-- ここまで図 -->

## 考察

### 電圧増幅率 $\mu$ の計算

<a href="#vgs_id" data-ref="fig"></a> の $V_{GS} - I_{D}$ 特性（$V_{DS}$ = 3 V）のグラフを 0 V $\leq V_{GS} \leq$ 2.5 V の範囲で抜き出し、二次式

$$
  I_{D} = {0.549 (V_{GS} + 0.649)^2 - 3.389 (V_{GS} + 0.381) + 4.297 } \times 10^{-3}
$$

で近似したものを <a href="#vgs" data-ref="fig"></a> に示す。 $V_{GS} =$ 1.42 V での傾きは、

$$
  I_{D}^{'} (1.098 V_{GS} - 2.676) \times 10^{-3}
$$

より

$$
  I_{D}^{'} (1.42) = -1.117 [\mathrm{mS}]
$$

と求められる。これを相互コンダクタンス $g_m$ とする。

次に <a href="#vds_id" data-ref="fig"></a> の $V_{DS} - I_{D}$ 特性（$V_{DS} =$ 0.8 V）のグラフにおいて、傾きが小さい 6.0 $\leq V_{DS} \leq$ 8.0 V の範囲で傾きを求める。

$$
  \frac{0.70 - 0.69}{8.0 - 6.0} \times 10^{-3} = 5.0 \times 10^{-6}
$$

逆数をとり、

$$
  \frac{1}{5.0 \times 10^{-6}}  = 2.0 \times 10^{5} [Ω]
$$

これをドレイン抵抗 $r_d$ とする。

相互コンダクタンス $g_m$ とドレイン抵抗 $r_d$ から電圧増幅率 $\mu$ を求めると、

$$
  \mu = g_m \times r_d = -2.234 \times 10^2
$$

となる。

### 出力が歪みだす原因

<a href="#vds_id" data-ref="fig"></a> から分かるように、ドレイン - ソース間電圧 $V_{DS}$ が 1 V より大きくなるとドレイン電流 $I_{D}$ は飽和してしまう。<a href="#f_vd" data-ref="fig"></a> で見られた歪み開始点と <a href="#vds_id" data-ref="fig"></a> の法話会支店に関係があり、 $v_{D}$ が $I_{D}$ の関数であると仮定すれば、出力電圧 $v_{D}$ が歪みだすのはドレイン電流 $I_{D}$ の飽和によるためと考えられる。

### 周波数帯域

電圧増幅率の最大値の $2^{-0.5}$ 倍以上の周波数範囲（周波数帯域）を求める。<a href="#vds_id" data-ref="fig"></a> より $\mu$ の最大値は 17 なので

$$
  17 \times 2^{-0.5} = 12
$$

よって周波数帯域は

$$
  10 \mathrm{Hz} \leq f \leq 100 \mathrm{kHz}
$$

となる。

<!-- 図 -->

![$V_{GS} - I_{D}$ 特性の近似](https://cdn-ak.f.st-hatena.com/images/fotolife/y/yamasy1549/20200808/20200808222501.png){#vgs}

<!-- ここまで図 -->


<!--
  section囲みを回避するために直接h2タグを挿入する
  将来的には末尾に # を挿入することで制御可能になる
  https://github.com/vivliostyle/vfm/issues/155
-->
<h2>参考文献</h2>

<ol class="reference">
  <li>TOKYO ELECTRON, 半導体の原理, http://origin.tel.co.jp/museum/exhibition/principle/, 参照2020/08/08</li>
  <li>19章 電界効果トランジスタ, http://windofweef.web.fc2.com/library/preinform/5/54/549/img/549_30a_20.pdf, 参照2020/08/08</li>
  <li>マルツエレック株式会社, MOS FET, http://www.marutsu.co.jp/contents/shop/marutsu/mame/56.html, 参照2020/08/08</li>
  <li>山形大学大学院理工学研究科 廣瀬文研究室, 第 6 章 MOSFET, http://fhirose.yz.yamagata-u.ac.jp/text/mos6.pdf, 参照2020/08/08</li>
</ol>

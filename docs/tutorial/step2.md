<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Step 2. Prepareing sample manuscripts](#step-2-prepareing-sample-manuscripts)
  - [Sample manuscripts](#sample-manuscripts)
  - [Previewing](#previewing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Step 2. Prepareing sample manuscripts

Now let's start creating your original theme. First, prepare sample manuscripts.

## Sample manuscripts

The concept of this theme is a novel anthology by several authors, so let's prepare manuscripts that look like that. The manuscript can be written using [VFM](https://github.com/vivliostyle/vfm).

```markdown {highlight: ['3-9']}
<! -- example/ch01.md -->

# 吾輩は猫である。

<p class="author">夏目 漱石</p>

{吾輩|わがはい}は猫である。名前はまだ無い。

どこで生れたかとんと{見当|けんとう}がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番{獰悪|どうあく}な種族であったそうだ。この書生というのは時々我々を{捕|つかま}えて{煮|に}て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の{掌|てのひら}に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの{見始|みはじめ}であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで{薬缶|やかん}だ。その{後|ご}猫にもだいぶ{逢|あ}ったがこんな{片輪|かたわ}には一度も{出会|でく}わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと{煙|けむり}を吹く。どうも{咽|む}せぽくて実に弱った。これが人間の飲む{煙草|たばこ}というものである事はようやくこの頃知った。
```

```markdown {highlight: ['3-9']}
<! -- example/ch02.md -->

# 羅生門

<p class="author">芥川 龍之介</p>

ある日の暮方の事である。一人の{下人|げにん}が、{羅生門|らしょうもん}の下で雨やみを待っていた。

広い門の下には、この男のほかに誰もいない。ただ、所々{丹塗|にぬり}の{剥|は}げた、大きな{円柱|まるばしら}に、{蟋蟀|きりぎりす}が一匹とまっている。羅生門が、{朱雀大路|すざくおおじ}にある以上は、この男のほかにも、雨やみをする{市女笠|いちめがさ}や{揉烏帽子|もみえぼし}が、もう二三人はありそうなものである。それが、この男のほかには誰もいない。
```

## Previewing

Once you have added the sample manuscripts, you can register them in the `entry` of vivliostyle.config.js to preview the manuscript with the styles applied in real-time.

```js {highlight:[3,'5-9']}
// vivliostyle.config.js

module.exports = {
  language: 'en',
  theme: 'theme_print.css',
  entry: ['example/ch01.md', 'example/ch02.md'],
  // ...
};
```

Now, let's apply the template style (theme_print.scss) to the sample manuscripts we just created and preview it in Vivliostyle Viewer. Vivliostyle Viewer automatically reloads the screen to reflect any changes in the manuscript file, style file, or vivliostyle.config.js.

```bash
$ yarn dev # Not necessary if preview is already running.
```

![Step2 preview screen](/assets/step2.png)

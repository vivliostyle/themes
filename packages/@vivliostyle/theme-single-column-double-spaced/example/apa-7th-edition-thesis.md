---
title: 'Auditory Texture and Episodic Recall: Grain Density, Retention Interval, and the Reinstatement of Ambient Context'
lang: en
---

<p class="running-head">Auditory Texture and Recall</p>

# Abstract #

People rarely study in silence, yet the ambient sound that surrounds encoding has
usually been treated as a nuisance variable rather than as a structured part of
the learning context. The present thesis asks whether the perceived granularity
of a background auditory texture—the degree to which a continuous sound is heard
as a stream of discrete events rather than as an undifferentiated wash—modulates
the accuracy of episodic recall, and whether any such effect survives
consolidation. Ninety-six adults learned 60 concrete noun pairs while one of four
textures played continuously (sparse granular, dense granular, pink noise, or
silence) and were tested after 2 min, 20 min, and 24 hr. Recall accuracy varied
reliably with texture, _F_(3, 92) = 9.84, _p_ < .001, η<sup>2</sup><sub>p</sub> =
.24, and declined across the retention interval, with the steepest loss observed
under continuous pink noise. Sparse granular texture supported recall as well as
silence and outperformed pink noise by a large margin, _d_ = 1.30, 95% CI [0.68,
1.91]. The findings support a segmentation account, in which grain-level events
supply retrievable temporal landmarks that a spectrally continuous background
cannot, and they qualify the widespread assumption that any steady sound is
equally distracting.

_Keywords:_ auditory texture, granular synthesis, episodic recall,
context-dependent memory, retention interval

# Introduction

Libraries, cafés, and shared offices are not quiet, and the people who work in
them do not appear to expect quiet. What they encounter instead is texture:
rainfall on glass, the intermittent clatter of a service counter, the diffuse
hiss of a ventilation system. These sounds differ from one another in ways that a
single loudness figure cannot capture, and the difference that concerns this
thesis is granularity—whether the listener hears a stream of discrete acoustic
events or an unsegmented continuum. Two backgrounds matched for level and for
long-term average spectrum may nonetheless present the auditory system with quite
different parsing problems, and it is at least plausible that this difference
propagates into what a learner is later able to retrieve.

The literature on memory and noise has not often framed the question this way.
Studies have typically compared a sounded condition with silence, or speech with
non-speech, and have reported the resulting decrement as evidence that background
sound taxes attention. Marchetti et al. (2019) observed that such designs treat
the sounded condition as a single undifferentiated category, so that a finding of
“no effect of noise” may conceal offsetting effects of two textures that happen
to have been averaged together. The present work takes granularity as the
independent variable of interest and holds level, spectrum, and source material
as nearly constant as a synthesis procedure allows.

## Background of the Problem

Granular synthesis assembles a continuous sound from a large number of very short
sonic grains, each typically between 10 ms and 100 ms in duration. By varying the
grain density parameter $\lambda$—the expected number of grains per second—an
experimenter can move a single source recording along a continuum from a sparse
patter of separable events to a dense wash that most listeners describe as noise.
Halloran and Devi (2021) showed that this continuum is perceptually orderly:
segmentation judgments changed monotonically with $\lambda$, and the transition
from “events” to “texture” occurred over a narrow range of densities rather than
gradually.

What has not been established is whether that perceptual transition matters for
memory. If grains function as temporal landmarks, then a sparse texture should
furnish a scaffold of distinguishable moments to which studied items can be
loosely bound, and a dense texture should not. If, on the other hand, any
non-silent background simply consumes attentional capacity, then density should
be irrelevant once loudness is equated, and every sounded condition should fall
below silence by a similar margin.

## Statement of the Problem

The two accounts sketched above make different predictions, but they have rarely
been placed in competition, in part because the sounded conditions used in
memory research are seldom described in enough detail to be reproduced. Reports
frequently specify a level in dBA and a colloquial label—“café noise,” “white
noise,” “ambient music”—without characterizing the temporal structure of the
signal at all. A study that manipulates granularity explicitly, holds the source
recording fixed, and equates presentation level across conditions is therefore a
prerequisite for adjudicating between them.

A second gap concerns durability. Most demonstrations of context effects in
recall test participants within minutes of encoding, when the encoding context is
still, in some sense, present. Whether a background texture leaves a trace that
survives a night of sleep is a different question, and one with different
theoretical consequences: an effect that disappears after consolidation is
plausibly a retrieval-cue effect, whereas an effect that persists implicates the
quality of the encoded representation itself.

## Purpose and Research Questions {#sec-questions}

The purpose of this study was to determine whether grain density modulates cued
recall accuracy, and whether any modulation persists across retention intervals
of increasing length. Three research questions guided the design. The first asks
whether cued recall accuracy differs across four background conditions—sparse
granular, dense granular, pink noise, and silence—when presentation level and
source material are held constant. The second asks whether the effect of
background condition interacts with retention interval, such that differences
between textures widen or narrow between immediate and delayed test. The third
asks whether the secondary measures of retrieval, namely response latency and
subjective vividness, pattern with accuracy across conditions.

Corresponding hypotheses were preregistered. The segmentation account predicts an
ordering in which sparse granular texture is indistinguishable from silence and
superior to pink noise, with dense granular texture falling between the two. The
attentional-load account predicts that all three sounded conditions fall below
silence and do not differ reliably among themselves.

## Significance of the Study

Beyond adjudicating between two accounts of a small experimental effect, the
question has practical reach. Ambient-sound applications are now routinely
recommended to students, and the sounds they supply are chosen for their
pleasantness rather than for any property known to bear on retention. If
granularity does modulate recall, then two soundscapes that a listener finds
equally agreeable may not be equally serviceable, and the difference between them
would be describable in terms an application developer could act on. The study
also contributes a fully specified stimulus generation procedure, which the
literature has lacked.

# Review of the Literature

This chapter situates the present study within three bodies of work: research on
the perception of auditory texture, research on context-dependent episodic
memory, and the smaller literature on individual differences in listening
expertise. It closes with an account of the norming study from which the present
design was derived.

## Granular Synthesis and the Perception of Auditory Texture

### Grain Density and Segmentation

The perceptual consequences of grain density have been mapped with reasonable
precision. Working with resampled field recordings, Halloran and Devi (2021)
asked listeners to report the number of distinguishable events in 3-s excerpts
and found that reports tracked density closely below approximately 40 grains per
second and collapsed toward a single-object response above it. Alcorn and
Yusupova (2018) replicated the boundary with synthetic grains and demonstrated
that envelope shape shifts it modestly: grains with abrupt onsets remained
separable at higher densities than grains with gradual onsets, though the
resulting effect on segmentation thresholds was small, _d_ = 0.22.

The convergence of these findings is what makes granularity usable as an
experimental variable. A manipulation that produced idiosyncratic percepts across
listeners would be of little use in a memory paradigm, because the encoding
context would differ from participant to participant in uncontrolled ways. Devi
and Halloran (2023) subsequently showed that the density-to-percept mapping holds
across source recordings as dissimilar as rainfall, applause, and gravel
underfoot, which suggests that the mapping is stable enough to support
between-participants assignment.

### Spectral Baselines and the Pink-Noise Convention

Pink noise has become the default comparison condition in this literature largely
for reasons of convenience: it is easy to generate, its long-term spectrum
approximates that of many natural soundscapes, and it is uncontroversially
continuous. Pryce (2016) questioned whether the convention is as neutral as it
appears, noting that pink noise is not merely spectrally flat in the relevant
sense but also maximally unsegmented, so that comparisons against it conflate two
manipulations. The present study retains pink noise as a reference condition
precisely because it occupies that extreme, while adding a silence condition that
allows the two components to be separated.

<figure class="tbl" id="tbl-effect-sizes">

<figcaption>Reported Effect Sizes for Ambient-Sound Manipulations in Recall Paradigms</figcaption>

| Study                                 | Manipulation               | _N_ | _d_   |
| ------------------------------------- | -------------------------- | --- | ----- |
| Alcorn & Yusupova (2018)              | Grain envelope shape       | 72  | 0.22  |
| Pryce (2016)                          | Pink noise vs. silence     | 48  | −0.33 |
| Castellan & Ndiaye (2020)             | Context reinstatement      | 120 | 0.58  |
| Halloran & Devi (2021)                | Grain density              | 64  | 0.41  |
| Sandoval-Reyes & Kettleborough (2024) | Delay to consolidated test | 96  | 0.67  |

</figure>

Positive values in <a href="#tbl-effect-sizes" data-ref="tbl"></a>&nbsp;indicate higher recall in the first-named condition of
each contrast, and the sample sizes are those reported for the focal comparison
rather than for the full study. Read together, the entries describe a literature
of moderate and somewhat heterogeneous effects. No single study has manipulated
density and retention interval jointly, which is the combination the present
design supplies.

## Context-Dependent Memory

### Reinstatement Effects in the Laboratory

The claim that incidental features of the encoding environment become part of the
memory trace is old and well supported, but its auditory instantiation is thinner
than its visual one; Tarleton (2015) went so far as to describe the auditory case
as “the least documented of the well-known context effects” (p. 8). Castellan and
Ndiaye (2020) reinstated ambient recordings at
test and obtained a reliable advantage over mismatched reinstatement, _d_ = 0.58,
with the caveat that their recordings were highly identifiable and may have
supported deliberate mnemonic strategies. Marchetti et al. (2019) put the
methodological difficulty plainly:

> The soundscapes used in reinstatement research are almost always recognizable
> scenes: a train platform, a schoolyard, a kitchen at breakfast. When recall
> improves under matched reinstatement, we cannot say whether the environment
> functioned as an incidental cue or whether the participant simply thought,
> at test, about the train platform and about what she had been reading while
> she listened to it. (p. 142)

Synthesized textures avoid this confound. A granular resampling of rainfall is
not a scene, has no obvious referent to rehearse, and can be varied along a
single parameter without changing what it is a recording of.

### Consolidation Across Retention Intervals

Whether contextual effects survive delay is contested. Sandoval-Reyes and
Kettleborough (2024) reported that a reinstatement advantage present at 20 min
was undiminished at 24 hr, whereas Okonkwo (2022) argued from a review of
comparable designs that most such advantages attenuate sharply once sleep
intervenes. The disagreement is partly definitional: studies differ in whether
the delayed test reinstates the encoding context, and an advantage measured under
reinstatement is not the same quantity as an advantage measured under neutral
conditions. The present design holds the test environment constant and quiet at
every interval, so that any surviving difference is attributable to encoding
rather than to cue overlap at retrieval.

## Listening Expertise as a Moderator

Trained listeners parse granular textures differently from naive listeners.
Ferreira-Lowe (2017) reported that participants with formal training in music
production segmented dense textures at densities where untrained listeners heard
an undifferentiated wash, and Whitmore and Ekwueme (2019) found that the same
participants gave systematically lower vividness ratings, apparently because they
attended to spectral detail rather than to the scene as a whole. Because such
listeners would experience the density manipulation as a weaker manipulation than
intended, the present study excluded them at recruitment; the trade-off in
generalizability is acknowledged in <a href="#sec-limitations" data-ref="sec"></a>.

## The Norming Study and the Present Design {#sec-norming}

The stimuli and encoding schedule used here were established in a norming study
conducted at Ardenmoor College in the preceding year, in which 48 listeners rated
32 candidate textures for segmentability, pleasantness, and perceived loudness.
Two densities were selected for the present experiment: a sparse texture at 12
grains per second, which produced near-ceiling segmentability ratings, and a
dense texture at 96 grains per second, which produced ratings indistinguishable
from those given to pink noise. The two selected textures did not differ in rated
pleasantness, which matters because a straightforward hedonic account would
otherwise be available for any recall difference between them.

The norming study also fixed the encoding schedule—a 4-s presentation followed by
a 1-s inter-stimulus interval—by establishing that shorter presentations produced
floor-level recall in a pilot sample under the dense texture. Retaining that
schedule unchanged permits the accuracy figures obtained here to be compared
directly against the norming sample, an opportunity that studies redesigning
their encoding parameters between experiments forfeit.

# Method

This chapter describes the design, participants, and procedures used to test
whether the perceived granularity of a background auditory texture modulates the
accuracy of episodic recall. The study followed a 4 (texture condition) × 3
(retention interval) mixed factorial arrangement, with texture manipulated
between participants and retention interval manipulated within participants.
Unless otherwise noted, all stimuli were delivered under the ambient listening
conditions established during pilot testing.

The primary dependent measure was cued recall accuracy, scored as the proportion
of studied word pairs correctly reproduced at test. Secondary measures—response
latency and subjective vividness ratings—are reported in <a href="#ch-results" data-ref="chapter"></a>. Because the
granular-synthesis manipulation had not previously been paired with a recall
paradigm, the encoding schedule deliberately mirrored that of the norming study
(see <a href="#sec-norming" data-ref="sec"></a>; cf. Halloran & Devi, 2021), so that accuracy could be compared
directly across the two samples.

## Participants

A total of 96 adults (_M_<sub>age</sub> = 21.4 years, _SD_ = 3.2, range 18–34)
were recruited from the undergraduate participant pool at Ardenmoor College and
from the surrounding community through notices posted at the Selby Street
Library. Sample size was fixed in advance at 24 participants per texture
condition, a target derived from a sensitivity analysis indicating that this cell
size affords 80% power to detect a medium-sized effect (_f_ = .25) at α = .05.

Eligibility required normal or corrected-to-normal hearing, self-reported fluency
in English, and no formal training in music production, because earlier work
suggests that trained listeners parse granular textures differently from naive
listeners.<span class="footnote">Seven additional volunteers were tested but
excluded before analysis: four for audiometric thresholds above 25 dB HL and
three for failing the embedded attention check.</span> The final sample was 61% women,
37% men, and 2% nonbinary, and reported a range of ethnic backgrounds broadly
consistent with the regional population. Participants received course credit or a
small honorarium for a laboratory session lasting approximately 45 minutes and a
brief return visit on the following day.

Mean recall accuracy for each texture condition, collapsed across retention
interval, appears in Table 2. Accuracy was highest in the sparse-granular
condition and lowest under continuous pink noise—a pattern the analyses in
<a href="#ch-results" data-ref="chapter"></a>&nbsp;examine in detail.

<figure class="tbl" id="tbl-accuracy">

<figcaption>Mean Recall Accuracy by Background Texture Condition</figcaption>

| Texture condition | _M_ (_SD_) | _n_ | _d_  |
| ----------------- | ---------- | --- | ---- |
| Sparse granular   | .74 (.11)  | 24  | 1.30 |
| Dense granular    | .68 (.13)  | 24  | 0.72 |
| Pink noise        | .59 (.12)  | 24  | —    |
| Silence (control) | .71 (.10)  | 24  | 1.09 |

</figure>

Effect sizes (_d_) are reported relative to the pink-noise condition, which
produced the lowest accuracy and therefore served as the reference cell for the
planned contrasts described below.

## Design and Materials

The experiment was administered on identical desktop workstations in
sound-attenuated booths. Study lists comprised 60 concrete noun pairs drawn from
the Ardenmoor Associative Norms and matched across conditions for frequency,
imageability, and length. Each pair was presented for 4 s, followed by a 1-s
inter-stimulus interval, while the assigned background texture played
continuously at a fixed presentation level.

### Auditory Stimuli

The four textures were generated with a granular synthesizer that resampled a
single 200-ms field recording of rainfall. Grain density was varied to produce
the sparse and dense conditions, while the pink-noise and silence conditions
served as spectral and null baselines, respectively.<span class="footnote">Loudness
was equalized across the three sounded conditions to 62 dBA at the listening
position, verified before each session with a calibrated sound-level meter
(Vasquez & Lindqvist, 2020).</span> All textures were looped seamlessly so that
no onset or offset cue coincided with the presentation of a word pair.

Presentation order of the three retention intervals was counterbalanced across
participants within each texture condition using a Latin-square arrangement, and
the assignment of specific word pairs to intervals was randomized anew for every
participant. The intervals themselves (2 min, 20 min, and 24 hr) follow the
spacing recommended by Okonkwo (2022) for studies that contrast immediate and
consolidated retrieval.

### Word-Pair Lists

The 60 pairs were divided into three sublists of 20, one assigned to each
retention interval. Sublists were equated on written frequency, rated
imageability, and orthographic length, and no pair shared an initial phoneme with
any other pair in the same sublist. Associative strength between the members of a
pair was held near zero according to the free-association tables that accompany
the norms, so that correct responses could not be produced from semantic
knowledge alone.

Each pair was presented once, in a fixed random order that was regenerated for
every participant. Because sublist-to-interval assignment rotated across
participants, any residual difference in sublist difficulty was distributed
evenly over the three intervals rather than confounded with them.

## Procedure {#sec-procedure}

Participants completed an audiometric screening, provided informed consent, and
were seated in the booth with circumaural headphones. The assigned texture began
30 s before the first study trial and continued without interruption until the
last trial had been presented, a schedule intended to prevent the onset of the
texture from acting as a discrete event in its own right. After the study phase,
participants performed a 2-min arithmetic filler task, completed the first cued
recall test, and then performed a 20-min filler battery of unrelated
questionnaires before the second test.

The third test was administered 24 hr later in the same booth, in silence, and
lasted approximately 10 minutes.<span class="footnote">Four participants
completed the delayed test between 22 hr and 26 hr after encoding because of
scheduling constraints; excluding them did not change any inferential result.</span>
An attention check of the kind
recommended by Gurnell et al. (2021) was embedded in the filler battery. At every
test, the left member of a pair appeared on screen and the participant typed the
right member; no feedback was given. Immediately after each response,
participants rated the vividness of their recollection on a 7-point scale
anchored at _no recollection_ and _as clear as the study trial_.

## Scoring and Analytic Strategy

Responses were scored as correct if they matched the studied target exactly or
differed from it by a single character, a tolerance adopted in advance to absorb
typing errors. Accuracy was expressed as the proportion of the 20 pairs in a
sublist recalled correctly. Response latency was measured from the onset of the
cue to the first keystroke and was analyzed only for correct responses.

The accuracy data were modeled as a mixed factorial analysis of variance,

$$
Y_{ijk} = \mu + \tau_i + \rho_j + (\tau\rho)_{ij} + \pi_{k(i)} + \varepsilon_{ijk}
$$

in which $\tau_i$ denotes the effect of texture condition _i_, $\rho_j$ the effect
of retention interval _j_, $(\tau\rho)_{ij}$ their interaction, and $\pi_{k(i)}$
the random effect of participant _k_ nested within texture condition. Departures
from sphericity were assessed with Mauchly’s test and corrected where necessary
by the Greenhouse–Geisser procedure. Three planned contrasts compared each
sounded or silent condition against pink noise, with a fourth contrast comparing
sparse granular texture against silence; the familywise error rate for that set
of contrasts was held at .05 by the Holm–Bonferroni procedure.

Standardized mean differences were computed with the pooled standard deviation
and corrected for small-sample bias,

$$
g = d \left( 1 - \frac{3}{4(n_1 + n_2) - 9} \right)
$$

although uncorrected values are reported in the tables for comparability with the
studies summarized in Table 1. Confidence intervals for _d_ were obtained by the
noncentral _t_ method.

# Results {#ch-results}

## Data Screening

No participant was missing data at any interval, and the 96 retained cases
therefore contributed three accuracy scores each. Distributions of the accuracy
scores were approximately symmetric within every cell, with absolute skewness
below 0.7 and absolute kurtosis below 1.1; no transformation was applied. Two
scores fell more than three interquartile ranges below their cell median, both in
the pink-noise condition at 24 hr, and both were retained because winsorizing
them changed the corresponding cell mean by less than .01.

Levene’s test indicated homogeneous between-participants variances at each
interval, the largest departure being _F_(3, 92) = 1.64, _p_ = .186. Mauchly’s
test indicated that sphericity could not be assumed for the retention interval
factor, _W_ = .87, χ<sup>2</sup>(2) = 12.44, _p_ = .002, and degrees of freedom
for within-participants effects were therefore corrected by the
Greenhouse–Geisser estimate, ε = .91.

## Recall Accuracy

### Omnibus Analysis

Cell means and standard deviations appear in Table 3. The analysis of variance
returned a reliable main effect of texture condition, _F_(3, 92) = 9.84,
_p_ < .001, η<sup>2</sup><sub>p</sub> = .24, and a substantially larger main
effect of retention interval, _F_(1.82, 167.44) = 61.27, _p_ < .001,
η<sup>2</sup><sub>p</sub> = .40. The interaction was reliable but modest,
_F_(5.46, 167.44) = 2.61, _p_ = .022, η<sup>2</sup><sub>p</sub> = .08.

<figure class="tbl" id="tbl-accuracy-interval">

<figcaption>Mean Recall Accuracy by Texture Condition and Retention Interval</figcaption>

| Texture condition | 2 min     | 20 min    | 24 hr     |
| ----------------- | --------- | --------- | --------- |
| Sparse granular   | .84 (.09) | .76 (.11) | .62 (.13) |
| Dense granular    | .79 (.10) | .70 (.12) | .55 (.14) |
| Pink noise        | .72 (.11) | .61 (.12) | .44 (.13) |
| Silence (control) | .82 (.09) | .72 (.10) | .58 (.12) |

</figure>

Values in <a href="#tbl-accuracy-interval" data-ref="tbl"></a>&nbsp;are proportions of the 20 word pairs assigned to an interval,
with standard deviations in parentheses and _n_ = 24 per texture condition.
The interaction is easily described. Accuracy declined in every condition, but it
declined furthest under pink noise, from .72 to .44 across the three intervals, a
loss of .28. The corresponding losses were .22 for sparse granular texture, .24
for dense granular texture, and .24 for silence. Simple-effects analyses located
the texture effect at both ends of the interval: it was reliable at 2 min,
_F_(3, 92) = 4.31, _p_ = .007, η<sup>2</sup><sub>p</sub> = .12, and larger at
24 hr, _F_(3, 92) = 8.02, _p_ < .001, η<sup>2</sup><sub>p</sub> = .21.

### Planned Contrasts

The four planned contrasts, collapsed across retention interval, appear in
Table 4. Sparse granular texture exceeded pink noise by .15 in proportion
correct, _t_(46) = 4.51, _p_ < .001, _d_ = 1.30, 95% CI [0.68, 1.91]; the
bias-corrected value was _g_ = 1.28. Silence exceeded pink noise by a comparable
margin, and dense granular texture exceeded it by roughly half as much. All three
contrasts survived the Holm–Bonferroni adjustment.

<figure class="tbl" id="tbl-contrasts">

<figcaption>Planned Contrasts on Recall Accuracy, Collapsed Across Retention Interval</figcaption>

| Contrast         | Δ<em>M</em> | _t_(46) | _p_    | _d_  | 95% CI for _d_ |
| ---------------- | ----------- | ------- | ------ | ---- | -------------- |
| Sparse − Pink    | .15         | 4.51    | < .001 | 1.30 | [0.68, 1.91]   |
| Dense − Pink     | .09         | 2.49    | .016   | 0.72 | [0.13, 1.30]   |
| Silence − Pink   | .12         | 3.77    | < .001 | 1.09 | [0.47, 1.69]   |
| Sparse − Silence | .03         | 0.98    | .332   | 0.28 | [−0.28, 0.85]  |

</figure>

The first column of <a href="#tbl-contrasts" data-ref="tbl"></a>&nbsp;gives the difference in proportion correct, and the
_p_ values are unadjusted; the first three contrasts remain reliable under
Holm–Bonferroni control. The fourth contrast is the theoretically decisive one. Sparse granular texture
did not differ reliably from silence, and the confidence interval for that
comparison excludes effects larger than about a third of a standard deviation in
favor of silence. A background texture, in other words, need not cost anything
measurable, provided its grains remain separable.

## Response Latency

Latencies for correct responses are summarized in Table 5. The pattern followed
that of accuracy, though with a smaller effect: participants in the pink-noise
condition were slowest, _F_(3, 92) = 4.12, _p_ = .009,
η<sup>2</sup><sub>p</sub> = .12. Because slower responding accompanied lower
accuracy rather than higher accuracy, the difference cannot be attributed to a
shift in the speed–accuracy trade-off.

<figure class="tbl" id="tbl-secondary">

<figcaption>Secondary Measures by Texture Condition</figcaption>

| Texture condition | Latency (ms) | Vividness |
| ----------------- | ------------ | --------- |
| Sparse granular   | 1,842 (298)  | 4.9 (0.8) |
| Dense granular    | 1,916 (321)  | 4.4 (0.9) |
| Pink noise        | 2,104 (355)  | 3.8 (1.0) |
| Silence (control) | 1,871 (287)  | 4.6 (0.9) |

</figure>

Latencies in <a href="#tbl-secondary" data-ref="tbl"></a>&nbsp;are means for correct responses only, vividness was rated on
the 7-point scale described in <a href="#sec-procedure" data-ref="sec"></a>, and standard deviations appear in
parentheses throughout.

## Subjective Vividness

Vividness ratings differed across texture conditions, _F_(3, 92) = 6.05,
_p_ < .001, η<sup>2</sup><sub>p</sub> = .17, and were lowest under pink noise.
Across participants, mean vividness correlated moderately with mean accuracy,
_r_(94) = .42, _p_ < .001, which is consistent with the ratings tracking the
quality of the retrieved episode rather than a general response bias.

## Summary of Findings

Three results bear on the hypotheses stated in <a href="#sec-questions" data-ref="sec"></a>. First, background
condition mattered, and it mattered in the ordering predicted by the segmentation
account rather than by the attentional-load account: sparse granular texture was
equivalent to silence, dense granular texture was intermediate, and pink noise
was worst. Second, the advantage did not dissipate over 24 hr; if anything, it
grew. Third, latency and vividness moved with accuracy, so the accuracy effect is
unlikely to reflect a criterion shift confined to the typed response.

# Discussion

## Grain Density and the Segmentation Account

The central finding is that two backgrounds equated for loudness and derived from
the same 200-ms recording produced recall differing by .15 in proportion correct,
a difference of the same order as that between studying with pink noise and
studying in silence. This is difficult to reconcile with an account on which
background sound acts as an undifferentiated attentional load, because load
accounts have no vocabulary for the difference between 12 grains per second and
96 grains per second once level is equated.

The segmentation account handles the ordering naturally. If separable grains
supply a coarse temporal scaffold, then encoding under a sparse texture yields
items that are, in effect, indexed by their position within a series of audible
events, whereas encoding under a wash yields items indexed by nothing in
particular. The equivalence of sparse texture and silence is the point at which
the account is most exposed, and it survived: adding a segmentable background cost
nothing, which is what a scaffold rather than a distractor should do.

## The Cost of Continuous Spectra

Pink noise was not merely the worst condition but the one whose disadvantage grew
with delay. Pryce (2016) anticipated this in arguing that the pink-noise
convention conflates spectral flatness with a maximally unsegmented temporal
structure; the present data suggest the conflation is consequential, since the
dense granular condition
shared the perceptual character of pink noise without sharing the full extent of
its cost. Whatever residual structure survives at 96 grains per second appears to
be worth something at retrieval.

## Consolidation and the 24-Hour Interval

The persistence of the texture effect across a night of sleep speaks against a
purely cue-based interpretation. Because the delayed test was administered in
silence, no encoding context was reinstated at any interval, and the difference
between conditions must therefore reside in what was encoded rather than in what
was available at test. This is the pattern Sandoval-Reyes and Kettleborough
(2024) reported for reinstatement effects and that Okonkwo (2022) predicted would
not generalize; the present results side with the former, though the designs
differ enough that the disagreement is not resolved here.

## Limitations {#sec-limitations}

Three limitations qualify these conclusions. First, listeners with formal
training in music production were excluded by design, and the sample is therefore
not representative of the population an ambient-sound application would reach;
Ferreira-Lowe (2017) gives reason to expect a weaker manipulation in trained
listeners rather than a different one, but that expectation was not tested.
Second, only two densities were sampled from a continuum, so the function
relating density to recall is unknown between them; a design with five or six
densities would establish whether the relation is monotonic or thresholded.
Third, all textures derived from a single rainfall recording, and generality
across source material remains an assumption.

A fourth and more general caution concerns the size of the interaction. Although
reliable, it accounted for less than a tenth of the within-participants variance,
and the ordering of conditions was stable across intervals. Readers should not
take the interaction as evidence that texture matters only after a delay.

## Implications and Future Directions

If the segmentation account is right, the practical recommendation is unusually
concrete: a background intended to accompany study should be audibly grainy, and
grain rate is a parameter that can be set. The next experiments should sample the
density continuum more finely, extend the retention interval beyond 24 hr, and
determine whether the effect obtains for material other than paired associates.
Whether the scaffold that grains appear to supply is temporal, as assumed here,
or attentional in some more specific sense is a question the present design
cannot settle.

## Conclusion

Background sound is not one thing, and the habit of treating it as one thing has
obscured a difference worth knowing about. Under conditions in which loudness,
spectrum, and source material were held constant, listeners who studied against a
sparse granular texture recalled as much as listeners who studied in silence,
and substantially more than listeners who studied against pink noise, 24 hr after
encoding as well as 2 min after it. Granularity, and not merely the presence of
sound, is what the memory system appears to notice.

# References #

- Alcorn, D. J., & Yusupova, M. (2018). Grain envelope shape and the perceptual
  unit in synthesized rainfall. _Quarterly Review of Auditory Cognition, 31_(2),
  140–166.
- Castellan, P., & Ndiaye, F. (2020). Reinstating ambience: Context effects in
  cued recall for paired associates. _Studies in Environmental Listening, 7_(1),
  3–24.
- Devi, S., & Halloran, T. R. (2023). Texture density predicts segmentation
  thresholds across source recordings. _Journal of Applied Listening Research,
  50_(1), 12–35.
- Ferreira-Lowe, N. (2017). _Attention under noise: An ecological account of
  trained listening_. Fenmark Press.
- Gurnell, E. M., Tsai, W., & Odell, B. (2021). Attention checks and data quality
  in remote listening studies. _Ardenmoor Review of Cognitive Science, 5_,
  88–104.
- Halloran, T. R., & Devi, S. (2021). Grain density and the perceptual
  segmentation of ambient sound. _Journal of Applied Listening Research, 48_(3),
  211–229.
- Marchetti, L. O., Ibarra, P., & Wren, K. (2019). _Memory in noisy rooms:
  Contextual accounts of episodic retrieval_. Ardenmoor College Press.
- Okonkwo, A. B. (2022). Retention intervals and the persistence of contextual
  cues. In J. Feltrin (Ed.), _Handbook of environmental cognition_ (2nd ed.,
  pp. 87–114). Selby Academic.
- Pryce, H. (2016). Reconsidering the pink-noise baseline. _Acoustic Methods
  Quarterly, 8_, 61–79.
- Sandoval-Reyes, I., & Kettleborough, A. (2024). Sleep-dependent consolidation of
  ambient context. _Quarterly Review of Auditory Cognition, 37_(4), 402–431.
- Tarleton, M. J. (2015). _The grain of the room: Listening, memory, and place_.
  Fenmark Press.
- Vasquez, R., & Lindqvist, H. (2020). Loudness equalization procedures for
  laboratory soundscapes. _Acoustic Methods Quarterly, 12_, 45–58.
- Whitmore, C., & Ekwueme, D. (2019). Vividness ratings as a proxy for episodic
detail. _Studies in Environmental Listening, 6_(3), 155–172.
</content>

</invoke>

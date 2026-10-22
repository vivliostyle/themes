---
title: "Sparse Bayesian Filtering for Nonstationary Streams"
lang: en
class: paper
---

<div class="paper-head">

# Sparse Bayesian Filtering for Nonstationary Streams #

<p class="byline">Rosalind Q. Tabard, Halvard Ensley, and Junpei Shirakura</p>

<p class="affil">Meridian Institute for Computational Inference, Wetherby · Department of Adaptive Systems, Fenwick College</p>

<p class="abstract"><strong>Abstract</strong>—Recursive estimators for sparse latent
signals are commonly derived under an implicit stationarity assumption: the
support of the state, and the precision of the prior that encourages it, are
treated as fixed. Streams gathered in the field rarely oblige. This paper
develops a sparse Bayesian filter whose prior precision evolves between frames
and whose data-fidelity term is discounted by a forgetting factor read off the
residual record. The resulting recursion costs one proximal step per frame, so
the work per observation stays linear in the number of active coordinates, yet
the estimator recovers from an abrupt change of support within a bounded number
of frames. We give a stability condition that couples the step size to the
forgetting factor and to the spectral norm of the measurement operator, and we
bound the excess error incurred at a breakpoint. On five streaming benchmarks
the filter lowers mean squared error by 18.3% to 35.2% relative to the strongest
competing method, with the widest margins on the streams whose regimes change
most often.</p>

<p class="terms"><strong>Index Terms</strong>—Adaptive forgetting, nonstationary
streams, proximal recursion, sparse Bayesian inference, state-space models.</p>

</div>

## Introduction {#sec-intro}

Measurements arrive in a stream, and the quantity they describe refuses to
stand still. A traffic sensor reports counts that shift with the hour; a
building meter records loads that change when a tenant moves out; a market feed
carries prices whose active drivers are replaced from one quarter to the next.
In each case the latent state is sparse — only a handful of coordinates carry
weight at any moment — but the identity of those coordinates is not fixed. An
estimator that assumes otherwise will eventually be estimating the wrong thing
very well.

The stationary theory of sparse recovery is by now settled. Given a fixed
measurement operator and a state whose support does not move, $\ell_1$-regularized
least squares recovers the state from far fewer observations than its ambient
dimension would suggest, and the recovery is stable under bounded noise <a href="#ref-6" data-ref="cite"></a>,
<a href="#ref-8" data-ref="cite"></a>. What the theory does not supply is a policy for forgetting. A recursive
implementation that accumulates evidence indefinitely converges to an average
of the regimes it has seen, which is a faithful description of none of
them.<span class="footnote">Reference implementations of the filter and the
generators for the two synthetic streams are archived with the Society under
the data policy of this volume.</span>

Two remedies are in common use, and both are blunt. The first is to restrict
attention to a sliding window <a href="#ref-7" data-ref="cite"></a>: evidence older than $W$ frames is discarded
outright, which bounds the memory of the estimator but also throws away the
information that would let it distinguish a genuine change of support from a
run of unlucky noise. The second is to detect breakpoints explicitly and
restart after each one <a href="#ref-11" data-ref="cite"></a>, <a href="#ref-12" data-ref="cite"></a>, which converts a smooth estimation problem
into a sequence of decisions whose errors are not recoverable: a missed
breakpoint leaves the filter stale, and a spurious one discards a
well-estimated support for no reason at all.

This paper takes a third route. Rather than deciding when to forget, we let the
rate of forgetting be a continuous quantity that the filter re-reads at every
frame from the size of its own prediction residual, and we let the prior
precision that enforces sparsity evolve on the same clock. Our contributions
are fourfold. First, we formulate a state-space model in which the sparsity
prior carries a per-coordinate precision that is itself a state variable.
Second, we derive a recursion that realizes the corresponding maximum a
posteriori estimate as a single proximal step per frame. Third, we prove that
the recursion is stable whenever the step size respects a bound determined
jointly by the forgetting factor and by the measurement operator, and we bound
the excess error charged to a breakpoint. Fourth, we evaluate the filter on
five streaming benchmarks against four published estimators.

<a href="#sec-background" data-ref="sec"></a>&nbsp;fixes notation and reviews the estimators against which we later
compare, following the account of the field given by Rasmussen-Hart and
Shirakura <a href="#ref-5" data-ref="cite"></a>&nbsp;and the monograph of Quell <a href="#ref-4" data-ref="cite"></a>. <a href="#sec-method" data-ref="sec"></a>&nbsp;develops the proposed
filter and states its stability condition. <a href="#sec-setup" data-ref="sec"></a>&nbsp;describes the benchmark
streams and the evaluation protocol, <a href="#sec-results" data-ref="sec"></a>&nbsp;reports the results, and
<a href="#sec-conclusion" data-ref="sec"></a>&nbsp;concludes.

## Background and Related Work {#sec-background}

Throughout, frames are indexed by $t$ and coordinates by $i$. We write the
frame index explicitly where the recursion moves between frames and drop it
wherever a single frame is under discussion.

### Sparse Recovery on Streams

Let $y_t \in \mathbb{R}^m$ be the observation collected in frame $t$ and
$x_t \in \mathbb{R}^n$ the latent state, with $m \ll n$. The measurements are
linear and corrupted by independent Gaussian noise,

<div class="equation" id="eq-1">

$$
y_t = \Phi_t x_t + \varepsilon_t, \;\; \varepsilon_t \sim \mathcal{N}(0, \sigma^2 I)
$$

</div>

where $\Phi_t \in \mathbb{R}^{m \times n}$ is the measurement matrix of the
frame and $x_t$ carries at most $s$ nonzero entries. Sparsity is expressed as a
product of independent Laplace factors with per-coordinate precisions
$\gamma_{t,i}$,

<div class="equation" id="eq-2">

$$
p(x_t) \propto \prod_{i=1}^{n} e^{-\gamma_{t,i} |x_{t,i}|}
$$

</div>

so that the negative log posterior under <a href="#eq-1" data-ref="eq"></a>&nbsp;and <a href="#eq-2" data-ref="eq"></a>&nbsp;is a weighted lasso
objective. When the precisions are held constant across $i$ and $t$, the
maximum a posteriori estimate is the ordinary lasso, and the whole apparatus of
stationary sparse recovery applies unchanged <a href="#ref-6" data-ref="cite"></a>, <a href="#ref-8" data-ref="cite"></a>, <a href="#ref-9" data-ref="cite"></a>.

### Recursive Estimation under Drift

Let $\pi_t$ denote the posterior density of $x_t$ given the observations up to
frame $t$. The Bayesian recursion alternates a prediction

<div class="equation" id="eq-3">

$$
\pi_{t|t-1} = \int p(x_t \mid x_{t-1})\, \pi_{t-1}\, dx
$$

</div>

with an update in which the likelihood is raised to a power,

<div class="equation" id="eq-4">

$$
\pi_t \propto p(y_t \mid x_t)^{\beta_t}\, \pi_{t|t-1}
$$

</div>

where $\beta_t \in (0, 1]$ is the forgetting factor. Setting $\beta_t = 1$
recovers the exact recursion; smaller values discount the current likelihood
relative to the accumulated prior and so shorten the memory of the filter.

The exponent carries an interpretation that will matter later. Raising the
likelihood to $\beta_t$ is equivalent to inflating the observation covariance
by $1/\beta_t$ and so declaring that the current frame deserves less trust than
the model that preceded it. Hoshinaga <a href="#ref-10" data-ref="cite"></a>&nbsp;shows
that the recursion <a href="#eq-3" data-ref="eq"></a>–<a href="#eq-4" data-ref="eq"></a>&nbsp;remains a proper Bayesian update for any fixed
$\beta$, and that the posterior it produces is the one a rational observer
would hold after seeing a geometrically down-weighted copy of the record;
Nakabayashi and Rasmussen-Hart <a href="#ref-13" data-ref="cite"></a>&nbsp;give the corresponding variational bound
for the discounted family. Neither result says how $\beta$ ought to be chosen.

In practice it is tuned on a validation stream and then frozen. <a href="#tbl-structural" data-ref="tbl"></a>&nbsp;summarizes how the published methods differ in the three choices that matter:
the model they assume for drift, the prior they place on the state, and the
cost they pay per frame.

<figure class="tbl" id="tbl-structural">

<figcaption>Structural comparison of streaming estimators for sparse latent states.</figcaption>

| Estimator                                                   | Drift model        | Prior      | Cost / frame |
| ----------------------------------------------------------- | ------------------ | ---------- | ------------ |
| Batch lasso&nbsp;<a href="#ref-6" data-ref="cite"></a>      | none               | fixed      | O(mnK)       |
| Sliding window&nbsp;<a href="#ref-7" data-ref="cite"></a>   | implicit           | fixed      | O(mnW)       |
| Recursive lasso&nbsp;<a href="#ref-14" data-ref="cite"></a> | none               | reweighted | O(mn)        |
| Drifting prior&nbsp;<a href="#ref-15" data-ref="cite"></a>  | random walk        | Gaussian   | O(mn)        |
| Group-sparse&nbsp;<a href="#ref-16" data-ref="cite"></a>    | none               | group      | O(mn log n)  |
| Kalman filter&nbsp;<a href="#ref-17" data-ref="cite"></a>   | linear–Gaussian    | Gaussian   | O(n²)        |
| Proposed                                                    | evolving precision | reweighted | O(ms + n)    |

</figure>

### Where the Existing Estimators Lose Ground

The error of a recursive sparse estimator separates into two contributions,

<div class="equation" id="eq-5">

$$
\|\hat{x}_t - x_t\|_2 \le c\,\sigma \sqrt{\frac{s \log n}{m}} + b_t
$$

</div>

of which the first is the familiar stationary rate and the second, $b_t$, is
the bias inherited from frames whose state differed from $x_t$. The size of
$b_t$ is governed by how much of the past the filter still carries, and for a
geometric discount that quantity has a closed form,

<div class="equation" id="eq-6">

$$
N_{\mathrm{eff}}(\beta) = \sum_{j \ge 0} \beta^{\,j} = \frac{1}{1 - \beta}
$$

</div>

which we call the effective memory. A fixed $\beta$ therefore fixes a
compromise once and for all: a long memory suppresses the variance term of <a href="#eq-5" data-ref="eq"></a>&nbsp;and inflates $b_t$ after every breakpoint, while a short memory does the
reverse. The reweighted recursive lasso of Ashcombe and Ruiz <a href="#ref-14" data-ref="cite"></a>&nbsp;and the
group-sparse estimator of Vellacott et al. <a href="#ref-16" data-ref="cite"></a>&nbsp;both fix $\beta$ offline.
Nakabayashi <a href="#ref-15" data-ref="cite"></a>&nbsp;lets the prior drift as a random walk but leaves the
data-fidelity term undiscounted, so the estimator remains slow to abandon a
support it has held for a long time; the same limitation is diagnosed
independently by Brede <a href="#ref-2" data-ref="cite"></a>&nbsp;and by Wieliczko and Stangrove <a href="#ref-3" data-ref="cite"></a>.

## Proposed Method {#sec-method}

The estimation of sparse latent signals from streaming observations poses a
persistent challenge when the underlying generative process drifts over time.
We develop a filtering procedure that couples a sparsity-promoting prior with a
lightweight recursive update, so that abrupt regime changes are absorbed
without discarding earlier evidence.

Our formulation departs from stationary sparse recovery in two respects. First,
the prior precision is allowed to evolve between consecutive frames, which
prevents the estimator from over-committing to a stale support set. Second, the
data-fidelity term is reweighted by an adaptive forgetting factor, so that past
measurements decay smoothly in influence.

### Model Formulation

We consider a linear observation model with additive noise. Let $y \in \mathbb{R}^m$ denote the observation vector, $\Phi \in \mathbb{R}^{m \times n}$ the measurement matrix, and $x \in \mathbb{R}^n$ the unknown state vector. The goal is to recover a sparse estimate $\hat{x}$ of $x$ from $y$ given $\Phi$. Under the assumption of sparsity, the estimation can be cast as the following convex optimization problem.<span class="footnote">See Ashcombe and Ruiz <a href="#ref-1" data-ref="cite"></a>&nbsp;(Sec. 3.2) for a detailed derivation of this formulation.</span>

<div class="equation" id="eq-7">

$$
\hat{x}_t = \mathop{\mathrm{arg\,min}}\limits_{x}\; \|y - \Phi x\|_2^2 + \lambda \|x\|_1
$$

</div>

with $\|\cdot\|_2$ the Euclidean norm, $\|\cdot\|_1$ the $\ell_1$-norm, and $\lambda > 0$ a parameter balancing fidelity against sparsity.

Problem <a href="#eq-7" data-ref="eq"></a>&nbsp;is solved efficiently by iterative soft-thresholding. Let $x^k$ be the estimate at iteration $k$ and $\eta > 0$ a step size. The update rule is

<div class="equation" id="eq-8">

$$
x^{k+1} = S_{\eta\lambda}\!\left(x^k + \eta\,\Phi^{\top}(y - \Phi x^k)\right)
$$

</div>

where $S_{\tau}(\cdot)$ denotes the soft-thresholding operator, i.e. $S_{\tau}(u_i) = \mathrm{sign}(u_i)\,\max(|u_i| - \tau, 0)$ component-wise.

Convergence to the optimum of <a href="#eq-7" data-ref="eq"></a>&nbsp;is guaranteed for $0 < \eta < 2/\|\Phi\|_2^2$, with $\eta$ set by line search.

### Prior Evolution and Adaptive Forgetting

The precisions of <a href="#eq-2" data-ref="eq"></a>&nbsp;are not treated as constants but as state variables of
their own. After each frame they are relaxed towards the reciprocal of the
magnitude just estimated,

<div class="equation" id="eq-9">

$$
\gamma_{t,i} = (1-\rho)\,\gamma_{t-1,i} + \frac{\rho}{|\hat{x}_{t-1,i}| + \delta}
$$

</div>

in which $\rho \in (0,1)$ sets the rate of relaxation and $\delta > 0$ keeps
the reciprocal finite. A coordinate that has just been estimated near zero
therefore acquires a large precision and is pushed harder towards zero in the
next frame, while a coordinate that carries weight is progressively released.
The scheme is a recursive counterpart of the reweighting used in the batch
setting <a href="#ref-9" data-ref="cite"></a>, and it costs one division per active coordinate.

The forgetting factor is read from the prediction residual rather than fixed in
advance. Writing $\varrho_t = \|y_t - \Phi_t \hat{x}_{t|t-1}\|_2$ for the norm
of that residual and $\nu_t^2$ for a running estimate of its variance under the
current regime <a href="#ref-18" data-ref="cite"></a>, we set

<div class="equation" id="eq-10">

$$
\beta_t = \beta_{\min} + \Delta\beta\, e^{-\varrho_t^2 / 2\nu_t^2}
$$

</div>

with $\Delta\beta = \beta_{\max} - \beta_{\min}$. When the residual is of the
size that the noise alone would explain, the exponential is close to unity and
$\beta_t$ sits near $\beta_{\max}$, so the filter keeps a long memory. When the
residual is large, $\beta_t$ falls towards $\beta_{\min}$ and the accumulated
prior is discounted within a few frames. No threshold is crossed and no
decision is taken: the transition is continuous, and a residual that turns out
to have been noise costs the filter only a brief shortening of its memory.

### The Filtering Recursion {#sec-recursion}

Combining the reweighted objective of <a href="#eq-7" data-ref="eq"></a>&nbsp;with the discounted update of <a href="#eq-4" data-ref="eq"></a>&nbsp;gives a recursion whose frame consists of a prediction
$\hat{x}_{t|t-1}$, a residual $e_t = y_t - \Phi_t \hat{x}_{t|t-1}$ and a
single proximal step,

<div class="equation" id="eq-11">

$$
\hat{x}_t = S_{\eta \lambda_t}\!\left(\hat{x}_{t|t-1} + \eta\, \Phi_t^{\top} e_t\right)
$$

</div>

where the threshold $\lambda_t$ is the vector of precisions of <a href="#eq-9" data-ref="eq"></a>&nbsp;scaled by
$\beta_t$. Unlike <a href="#eq-8" data-ref="eq"></a>, which is iterated to convergence within a frame, <a href="#eq-11" data-ref="eq"></a>&nbsp;is
applied once: the recursion carries its own warm start, and the frames
themselves play the part of the iterations.

**Proposition 1 (Stability).** _Suppose the measurement matrices satisfy_
$\sup_t \|\Phi_t\|_2 < \infty$ _and that the forgetting factors of <a href="#eq-10" data-ref="eq"></a>&nbsp;are
bounded away from zero. Then the recursion <a href="#eq-11" data-ref="eq"></a>&nbsp;is non-expansive, and the
estimates remain bounded, provided that_

<div class="equation" id="eq-12">

$$
0 < \eta < \frac{2\beta_t}{\|\Phi_t\|_2^2}
$$

</div>

_holds at every frame._

The argument is the standard one for proximal gradient methods, applied frame
by frame. The soft-thresholding operator is firmly non-expansive for any
positive threshold, and the gradient step in <a href="#eq-11" data-ref="eq"></a>&nbsp;is non-expansive exactly when
the step size respects <a href="#eq-12" data-ref="eq"></a>; the composition of the two is therefore
non-expansive, and boundedness follows because the discounted prior contributes
a uniformly bounded shift. The condition is the discounted analogue of the
classical bound quoted after <a href="#eq-8" data-ref="eq"></a>, and it tightens as the filter forgets faster,
which is the expected trade: a filter that discounts its past aggressively must
also move more cautiously within each frame.

### Cost per Frame

Let $s_t$ be the number of coordinates that survive thresholding in frame $t$.
The matrix–vector products in <a href="#eq-11" data-ref="eq"></a>&nbsp;touch only those coordinates in the backward
direction, and the precision update <a href="#eq-9" data-ref="eq"></a>&nbsp;is coordinate-wise, so the cost of a
frame is

<div class="equation" id="eq-13">

$$
C_t = O(m s_t + n)
$$

</div>

which is linear in the active support and free of any matrix factorization.
The $O(n)$ term is the sweep over the precisions and dominates only when the
state is nearly empty. Memory is likewise $O(n + m s_t)$, since no covariance
matrix is propagated — the property that separates the proposal from the
Kalman-type filters of <a href="#tbl-structural" data-ref="tbl"></a>.

<figure class="tbl" id="tbl-error">

<figcaption>Comparison of estimation error across benchmark datasets.</figcaption>

| Dataset | Proposed      | Baseline A    | Baseline B    | Baseline C    | KF            |
| ------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| Synth-1 | 0.291 ± 0.024 | 0.418 ± 0.031 | 0.373 ± 0.027 | 0.356 ± 0.029 | 0.501 ± 0.042 |
| Synth-2 | 0.243 ± 0.020 | 0.389 ± 0.029 | 0.341 ± 0.024 | 0.312 ± 0.026 | 0.462 ± 0.039 |
| Traffic | 0.151 ± 0.012 | 0.276 ± 0.021 | 0.245 ± 0.019 | 0.233 ± 0.019 | 0.351 ± 0.031 |
| Energy  | 0.185 ± 0.016 | 0.312 ± 0.024 | 0.273 ± 0.021 | 0.249 ± 0.020 | 0.387 ± 0.034 |
| Finance | 0.201 ± 0.017 | 0.365 ± 0.027 | 0.321 ± 0.023 | 0.294 ± 0.024 | 0.433 ± 0.038 |

</figure>

## Experimental Setup {#sec-setup}

We evaluate the proposed filter on five benchmark streams spanning synthetic
and real-world regimes. The two synthetic datasets are generated from
piecewise-stationary Gaussian processes whose active support changes at
randomly placed breakpoints, while the remaining three are drawn from
traffic-volume, building-energy, and financial-tick archives. All streams are
standardized frame by frame so that the reported errors remain comparable
across datasets.

For reproducibility, all experiments were implemented in Python using NumPy and
SciPy, and the source code will be released upon publication. The proposed
method was compared against the reweighted recursive Lasso of Ashcombe and Ruiz
<a href="#ref-14" data-ref="cite"></a>, the drifting-prior filter of Nakabayashi <a href="#ref-15" data-ref="cite"></a>, the online group-sparse
estimator of Vellacott et al. <a href="#ref-16" data-ref="cite"></a>, and a standard Kalman filter (KF) <a href="#ref-17" data-ref="cite"></a>.
Each baseline was tuned to its best reported setting.

We report the average estimation error over 100 independent Monte Carlo runs,
and significance was assessed with paired _t_-tests at the 0.05 level. As
summarized in <a href="#tbl-error" data-ref="tbl"></a>, the proposed method outperformed every baseline, with
gains ranging from 18.3% to 35.2% in mean squared error. The margin is largest
on the Traffic and Finance streams, where breakpoints are most frequent.

## Results and Analysis {#sec-results}

### Accuracy across Regimes

The ordering of <a href="#tbl-error" data-ref="tbl"></a>&nbsp;is stable across all five streams: Baseline C is the
strongest competitor everywhere, the Kalman filter is the weakest, and the
proposed method leads throughout. Every margin over Baseline C is significant
at the 0.05 level under a paired test, and the smallest of them — 18.3% on
Synth-1 — is also the one obtained on the stream with the longest stationary
segments, which is the behaviour the analysis of <a href="#eq-5" data-ref="eq"></a>&nbsp;and <a href="#eq-6" data-ref="eq"></a>&nbsp;predicts. Where
regimes are short the fixed-memory estimators pay the bias term $b_t$ on nearly
every frame, and the adaptive discount of <a href="#eq-10" data-ref="eq"></a>&nbsp;is worth a third of the error.

The dispersion figures deserve a remark of their own. The standard deviations
of the proposed method are the smallest in every row, and they shrink relative
to the mean as the regimes become shorter. A filter with a fixed memory is at
the mercy of where the breakpoints happen to fall within a run; one that reads
its memory from the residual is not, and its run-to-run spread narrows
accordingly. The same effect appears in the benchmark suite assembled by
Ensley <a href="#ref-20" data-ref="cite"></a>, where run-level variance is reported separately.

<figure class="tbl" id="tbl-ablation">

<figcaption>Ablation of the three adaptive components, on Synth-2 and Traffic.</figcaption>

| Variant                 | Synth-2       | Traffic       |
| ----------------------- | ------------- | ------------- |
| Full model              | 0.243 ± 0.020 | 0.151 ± 0.012 |
| Fixed forgetting factor | 0.271 ± 0.022 | 0.186 ± 0.015 |
| Static prior precision  | 0.288 ± 0.024 | 0.204 ± 0.016 |
| No residual reweighting | 0.262 ± 0.021 | 0.173 ± 0.014 |
| All three disabled      | 0.309 ± 0.026 | 0.229 ± 0.018 |

</figure>

### Ablation

<a href="#tbl-ablation" data-ref="tbl"></a>&nbsp;removes the three adaptive components in turn, on the synthetic stream
with the shorter regimes and on the strongest of the real-world streams.
Freezing the prior precision of <a href="#eq-9" data-ref="eq"></a>&nbsp;is the most damaging single change,
inflating the error by 18.5% on Synth-2 and by 35.1% on Traffic; fixing the
forgetting factor of <a href="#eq-10" data-ref="eq"></a>&nbsp;costs 11.5% and 23.2%; suppressing the residual
reweighting is the mildest of the three at 7.8% and 14.6%. The three effects
are not additive, which is what one would expect of components that share the
same residual signal, but they are not redundant either: disabling all of them
returns the estimator to the neighbourhood of the strongest baseline, 0.309
against 0.312 on Synth-2 and 0.229 against 0.233 on Traffic.

### Recovery after a Breakpoint

To measure how quickly a filter abandons a stale support we recorded, for each
breakpoint in the synthetic streams, the number of frames needed to return
within 5% of the pre-breakpoint error. The proposed filter required a median of
11 frames, against 27 for the drifting-prior filter <a href="#ref-15" data-ref="cite"></a>&nbsp;and 34 for the
reweighted recursive Lasso <a href="#ref-14" data-ref="cite"></a>; the Kalman filter did not recover within the
200-frame window in a third of the cases. The advantage tracks the effective
memory of <a href="#eq-6" data-ref="eq"></a>&nbsp;directly: with $\beta_{\min} = 0.86$ the discounted prior loses
half its weight in roughly five frames, which is the order of the observed
recovery time. The support-recovery guarantees of Tabard and
Okonkwo-Baines <a href="#ref-19" data-ref="cite"></a>&nbsp;give a lower bound of the same order for this class of
streams, so little further improvement should be expected from a sharper
discount alone.

### Sensitivity and Cost

The filter is not delicate. Across the grid we explored, the error stayed
within 4% of its minimum for every $\beta_{\max}$ between 0.90 and 0.98 and
every relaxation rate $\rho$ between 0.05 and 0.25, and the only setting that
degraded the estimator materially was $\beta_{\min}$ above 0.95, at which point
the adaptive discount can no longer shorten the memory enough to matter. In
wall-clock terms the recursion cost a median of 0.83 ms per frame on the
Traffic stream, against 0.61 ms for the reweighted recursive Lasso <a href="#ref-14" data-ref="cite"></a>&nbsp;and
2.4 ms for the group-sparse estimator <a href="#ref-16" data-ref="cite"></a>; the overhead over <a href="#ref-14" data-ref="cite"></a>&nbsp;is the
precision sweep of <a href="#eq-9" data-ref="eq"></a>, and it is the price of the largest single gain recorded
in <a href="#tbl-ablation" data-ref="tbl"></a>.

## Conclusion {#sec-conclusion}

We have presented a sparse Bayesian filter for nonstationary streams in which
neither the sparsity prior nor the rate of forgetting is held fixed. The prior
precision is a state variable relaxed towards the reciprocal of the current
estimate, and the forgetting factor is a continuous function of the prediction
residual, so the filter shortens its memory when the evidence stops fitting and
lengthens it again when the evidence settles. The recursion costs one proximal
step per frame, admits a stability condition that couples the step size to the
forgetting factor, and outperformed four published estimators on five streaming
benchmarks by margins of 18.3% to 35.2%.

Two limitations point to the obvious continuations. The stability condition of
Proposition 1 is sufficient but not tight, and a bound that accounted for the
correlation between successive residuals would permit larger steps in exactly
the regime where they are most useful. The residual statistic that drives <a href="#eq-10" data-ref="eq"></a>&nbsp;is also scalar, and a coordinate-wise version — a separate forgetting factor
per group of coordinates — would let the filter retain a stable part of the
support while discarding a volatile one. We are pursuing both.

## Acknowledgment ##

The authors thank the Wetherby streaming-data group for access to the traffic
and building-energy archives, and the two anonymous referees whose reading of
<a href="#sec-recursion" data-ref="sec"></a>&nbsp;corrected an error in the proof of Proposition 1. This work was
supported by the Calderwood Foundation under grant CF-2214.

## References ##

<ol class="cite-items">
<li id="ref-1">H. R. Ashcombe and T. Ruiz, “Proximal recursions for sparse states with slowly varying support,” <em>Trans. Meridian Soc. Comput. Inference</em>, vol. 9, no. 2, pp. 88–117, 2023.</li>
<li id="ref-2">O. Brede, “The cost of remembering: memory horizons in streaming estimation,” <em>J. Adaptive Signal Estimation</em>, vol. 4, no. 1, pp. 3–29, 2021.</li>
<li id="ref-3">K. Wieliczko and A. Stangrove, “Drift, decay, and the arithmetic of forgetting,” <em>Fenwick Rev. Statistical Learning</em>, vol. 17, pp. 201–236, 2022.</li>
<li id="ref-4">T. Quell, <em>Recursive Estimation for Drifting Systems</em>. Marrowgate Press, 2020.</li>
<li id="ref-5">M. Rasmussen-Hart and J. Shirakura, “A survey of nonstationary sparse estimation,” <em>Trans. Meridian Soc. Comput. Inference</em>, vol. 11, no. 4, pp. 401–448, 2025.</li>
<li id="ref-6">C. Ferreira-Lund, “Stable recovery of sparse vectors from incomplete linear measurements,” <em>Fenwick Rev. Statistical Learning</em>, vol. 8, pp. 55–92, 2016.</li>
<li id="ref-7">A. Okonkwo-Baines and O. Brede, “Sliding-window regularization for streaming regression,” in <em>Proc. Halberd Symp. Streaming Inference</em>, 2019, pp. 44–53.</li>
<li id="ref-8">S. Pryce-Halloran, “Restricted isometry and the geometry of soft thresholding,” <em>Ansell J. Stochastic Modelling</em>, vol. 31, no. 3, pp. 612–648, 2018.</li>
<li id="ref-9">L. Ibarra-Kestrel and C. Ferreira-Lund, “Thresholding iterations with inexact gradients,” <em>J. Adaptive Signal Estimation</em>, vol. 2, no. 4, pp. 289–314, 2019.</li>
<li id="ref-10">Y. Hoshinaga, “Tempered likelihoods in sequential Bayesian estimation,” <em>Bull. Calderwood Inst. Data Anal.</em>, vol. 26, pp. 77–103, 2017.</li>
<li id="ref-11">D. Vantwerp and T. Quell, “Breakpoint detection for high-dimensional streams,” in <em>Proc. Wetherby Conf. Sequential Decision Systems</em>, 2021, pp. 118–129.</li>
<li id="ref-12">A. Stangrove, “Restart policies for adaptive filters,” <em>Trans. Meridian Soc. Comput. Inference</em>, vol. 10, no. 1, pp. 5–38, 2024.</li>
<li id="ref-13">K. Nakabayashi and M. Rasmussen-Hart, “Variational bounds for discounted posteriors,” <em>Ansell J. Stochastic Modelling</em>, vol. 33, no. 2, pp. 145–179, 2020.</li>
<li id="ref-14">H. R. Ashcombe and T. Ruiz, “A reweighted recursive Lasso for streaming observations,” <em>J. Adaptive Signal Estimation</em>, vol. 6, no. 3, pp. 174–205, 2024.</li>
<li id="ref-15">K. Nakabayashi, “Filtering with a drifting prior,” <em>Trans. Meridian Soc. Comput. Inference</em>, vol. 11, no. 2, pp. 133–169, 2025.</li>
<li id="ref-16">M. Vellacott, L. Ibarra-Kestrel, and D. Vantwerp, “Online estimation of group-sparse states,” in <em>Proc. Halberd Symp. Streaming Inference</em>, 2023, pp. 61–74.</li>
<li id="ref-17">T. Quell and O. Brede, <em>Linear State Estimation: A Practitioner’s Course</em>, 2nd ed. Marrowgate Press, 2018.</li>
<li id="ref-18">J. Shirakura, “Variance tracking for residual-driven adaptation,” <em>Bull. Calderwood Inst. Data Anal.</em>, vol. 30, pp. 219–244, 2024.</li>
<li id="ref-19">R. Q. Tabard and A. Okonkwo-Baines, “Support recovery after abrupt change,” <em>Fenwick Rev. Statistical Learning</em>, vol. 19, pp. 88–121, 2025.</li>
<li id="ref-20">H. Ensley, “Benchmarks for nonstationary streaming estimation,” in <em>Proc. Wetherby Conf. Sequential Decision Systems</em>, 2024, pp. 9–22.</li>
</ol>

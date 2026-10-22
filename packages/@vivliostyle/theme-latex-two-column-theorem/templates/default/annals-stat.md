---
title: "Journal of Theoretical Statistics — Coverage of Score-Based Confidence Intervals"
lang: en
---

<div class="titleblock">

<p class="jref"><span class="journal">Journal of Theoretical Statistics</span><br>2026, Vol. 48, No. 3</p>

# Coverage of Score-Based Confidence Intervals under Observed and Expected Information #

<p class="byline">R. Aldenbrook<sup>1</sup> and M. Feretti<sup>2</sup></p>

<p class="running-author">R. Aldenbrook and M. Feretti</p>

<p class="affil"><sup>1</sup><em>Ashmere University</em> &nbsp;and&nbsp; <sup>2</sup><em>Cendral Institute for Statistical Inference</em></p>

<div class="abstract">

**Abstract.** An interval estimate built from a score equation is justified by a single limit theorem, but the interval finally reported depends on which estimate of the Fisher information is substituted into the pivot, and that substitution is a matter of convention rather than of theory. We compare the two conventions in widest use &mdash; the observed information evaluated at the estimator, and the outer product of the individual score contributions &mdash; for a one-parameter family under smoothness conditions requiring no more than three derivatives of the log-likelihood. Both substitutions yield intervals with the same first-order coverage, and we show that they separate at the next order, the observed information carrying the smaller variance contribution whenever the third standardized cumulant of the score is nonzero. A Bartlett-type correction that removes the leading discrepancy is derived and shown not to disturb the limiting distribution. In a Monte Carlo study on a curved normal family the two intervals cover at 0.913 and 0.905 for $n = 50$ against a nominal 0.95, the corrected interval attains 0.940, and the three agree to within 0.005 by $n = 500$.

</div>

<p class="kwd"><em>Key words and phrases.</em> Asymptotic normality, Bartlett correction, coverage probability, curved exponential family, observed information, score equation.</p>

</div>

## Introduction {#sec-intro}

A parametric model, a sample, and a score equation together determine an estimator. They do not determine the interval that is reported around it. What determines the interval is the quantity substituted for the Fisher information in the denominator of the pivot, and the two substitutions in widest use agree only in the limit. They disagree in every finite sample, occasionally by enough to move the coverage of a nominal 95% interval by three or four percentage points, which is precisely the range within which practitioners believe themselves to be working.

This paper takes that disagreement as its subject. We work throughout in the simplest setting in which the phenomenon is visible: a single real parameter, independent and identically distributed observations, and a log-likelihood smooth enough for three derivatives to exist. The estimator is the consistent root of the score equation, whose selection among possibly several roots we handle in the standard way <a href="#ref-halbersen" data-ref="cite"></a>; the general asymptotic apparatus is that of <a href="#ref-dunsmere" data-ref="cite"></a>, and the various information estimates in circulation are catalogued in the survey of <a href="#ref-ishizure" data-ref="cite"></a>.

The distinction between observed and expected information has a long history in the asymptotic literature <a href="#ref-okarwe" data-ref="cite"></a>, and arguments from conditioning and approximate ancillarity are usually offered in favor of the former: the observed information is a function of the realized sample, and it tracks the curvature that the sample actually exhibits rather than the curvature the model expects on average <a href="#ref-vennerholm" data-ref="cite"></a>. The outer product of scores is attractive for a different and more practical reason. It requires no second derivatives, so it survives the transition to models whose likelihood is available only up to a numerically differentiated approximation <a href="#ref-mostyn-raab" data-ref="cite"></a>. Numerical comparisons of the two exist, but they are scattered across application areas and rarely control the sample size and the nominal level simultaneously <a href="#ref-quennard" data-ref="cite"></a>.

Our contributions are four. First, we establish consistency and asymptotic normality of the score-equation estimator under conditions that require no more than a third absolute moment of the third derivative, weaker than those usually assumed for this class. Second, we show that the two information estimates are first-order equivalent, and we locate the point at which they separate: the difference is of order $n^{-1/2}$ and is governed by the third standardized cumulant of the score. Third, we derive a Bartlett-type correction for the resulting Wald statistic, in the spirit of our earlier treatment of higher-order adjustments <a href="#ref-aldenbrook" data-ref="cite"></a>, and prove that it leaves the limiting distribution of Theorem <a href="#thm-normality" data-ref="thm"></a>&nbsp;intact. Fourth, we report a Monte Carlo study on a curved normal family in which the theoretical ordering is clearly visible for sample sizes below two hundred and has disappeared by five hundred.

The remainder of the paper is organized as follows. <a href="#sec-model" data-ref="sec"></a>&nbsp;fixes the model, the estimator, and the four interval constructions we compare. <a href="#sec-asymptotics" data-ref="sec"></a>&nbsp;develops the asymptotic theory and reports a first simulation. <a href="#sec-variance" data-ref="sec"></a>&nbsp;treats the two information estimates in detail and derives the correction. <a href="#sec-numerical" data-ref="sec"></a>&nbsp;collects further numerical evidence, including a sensitivity analysis under contamination, and <a href="#sec-discussion" data-ref="sec"></a>&nbsp;concludes.

## Model and Estimator {#sec-model}

Let $(Z_i)_{i \ge 1}$ be i.i.d. observations with common distribution $P_{\theta_0}$, where $\theta_0 \in \Theta \subset \mathbb{R}$ is the true parameter of interest. Let $\ell(\theta; z)$ denote the log-likelihood contribution of observation $z$, write $\ell_n(\theta) = \sum_{i=1}^{n} \ell(\theta; Z_i)$ for the sample log-likelihood, and define the sample score by $s_n(\theta) = \sum_{i=1}^{n} \partial_\theta \ell(\theta; Z_i)$. The estimator $\hat\theta_n$ is the solution to the score equation $s_n(\hat\theta_n) = 0$.

When the score equation admits more than one root, $\hat\theta_n$ denotes the root closest to a preliminary $\sqrt{n}$-consistent estimator; a measurable choice exists under our conditions by the selection argument of <a href="#ref-calvenna" data-ref="cite"></a>, and nothing in what follows depends on which such choice is made. We suppress the dependence on the preliminary estimator throughout.

<div class="theorem example" id="ex-curved">

Let $Z \sim N(\theta, \theta^{2})$ with $\theta > 0$, so that the coefficient of variation is fixed at unity. The log-likelihood contribution is

$$
\ell(\theta; z) = -\log \theta - \frac{(z - \theta)^{2}}{2\theta^{2}} - \tfrac{1}{2}\log(2\pi),
$$

and a direct computation gives $I(\theta) = 3\theta^{-2}$. The family is a curved exponential family of order two <a href="#ref-ubaldeschi" data-ref="cite"></a> and is equivariant under the scale group, a property we exploit repeatedly in <a href="#sec-numerical" data-ref="sec"></a>.

</div>

The object of study is the two-sided interval

<div class="equation" id="eq-interval">

$$
\mathcal{C}_n(\alpha) = \hat\theta_n \pm z_{1-\alpha/2}\, \hat\sigma_n\, n^{-1/2},
$$

</div>

in which $z_{1-\alpha/2}$ is the standard normal quantile and $\hat\sigma_n^{2}$ is an estimate of the asymptotic variance. Everything that distinguishes the intervals compared below is contained in $\hat\sigma_n^{2}$; the centering and the quantile are common to all of them. We consider the four constructions listed in <a href="#tbl-methods" data-ref="tbl"></a>, of which the first two are the substitutions described in <a href="#sec-intro" data-ref="sec"></a>, the third is the corrected version derived in <a href="#sec-correction" data-ref="sec"></a>, and the fourth is a bootstrap-$t$ calibration with 999 resamples included as an external benchmark.

<figure class="tbl" id="tbl-methods">

<figcaption>

The four interval constructions compared in the paper. All share the centering and the quantile of <a href="#eq-interval" data-ref="eq"></a>.

</figcaption>

| Label | Variance estimate $\hat\sigma_n^{2}$                                    | Section                                                      |
| ----- | ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| A     | $[I_n(\hat\theta_n)/n]^{-1}$                                            | <a href="#sec-observed" data-ref="sec" class="number"></a>   |
| B     | $\hat V_n^{-1}$                                                         | <a href="#sec-outer" data-ref="sec" class="number"></a>      |
| A*    | A with the correction&nbsp;<a href="#eq-correction" data-ref="eq"></a> | <a href="#sec-correction" data-ref="sec" class="number"></a> |
| Boot  | bootstrap-$t$, 999 resamples                                            | <a href="#sec-departures" data-ref="sec" class="number"></a> |

</figure>

Two conventions are used without further comment. Derivatives with respect to $\theta$ are written $\partial_\theta$, and repeated differentiation is indicated by a superscript, so that $\partial_\theta^{2}$ denotes the second derivative. Expectations carrying a parameter subscript are taken under that parameter, and an unsubscripted expectation is taken under $\theta_0$.

## Asymptotic Properties of the Estimator {#sec-asymptotics}

The present section develops the theoretical properties of the estimator introduced in the preceding section. We establish consistency and asymptotic normality under minimal regularity conditions and derive an explicit form for the asymptotic variance. In <a href="#sec-finite" data-ref="sec"></a>&nbsp;we investigate the finite-sample performance through simulation and illustrate that the proposed interval exhibits satisfactory coverage even for moderate sample sizes. Additional empirical evidence and sensitivity checks are relegated to <a href="#sec-numerical" data-ref="sec"></a>.

We impose the following regularity conditions throughout: (i) $\Theta$ is an open interval containing $\theta_0$; (ii) $\ell(\theta; z)$ is twice continuously differentiable in $\theta$ a.s.; (iii) $\mathrm{E}_{\theta_0} |\partial_\theta^{3} \ell(\theta; Z_1)| < \infty$ for $\theta$ in a neighborhood of $\theta_0$; and (iv) the information matrix $I(\theta_0) = -\mathrm{E}_{\theta_0} \partial_\theta^{2} \ell(\theta_0; Z_1)$ is positive and finite.<span class="footnote">In several applications, $I(\theta_0)$ can be estimated consistently by the observed information $I_n(\hat\theta_n) = -\partial_\theta^{2}\ell_n(\hat\theta_n)$; see <a href="#sec-variance" data-ref="sec"></a>&nbsp;for details.</span>

Conditions (i)&ndash;(iv) are weaker than the fourth-moment requirements imposed in much of the literature on this class; the reduction to a third absolute moment follows the argument of <a href="#ref-sorbelius" data-ref="cite"></a>, which we adapt in the proof below.

Under these conditions, the law of large numbers implies

<div class="equation" id="eq-lln">

$$
\frac{1}{n} \sum_{i=1}^{n} \partial_\theta \ell(\theta_0; Z_i) \stackrel{p}{\to} 0 \qquad \text{as } n \to \infty.
$$

</div>

The companion statement for the second derivative, which is used twice below and which we record separately, is that $n^{-1}\partial_\theta^{2}\ell_n(\theta)$ converges in probability to $-I(\theta_0)$ uniformly on shrinking neighborhoods of $\theta_0$; this is Lemma <a href="#lem-uniform" data-ref="thm" class="appendix"></a>&nbsp;of <a href="#sec-appendix" data-ref="sec" class="appendix"></a>, and it is the only place at which Condition (iii) is called upon. Nothing beyond these two limits, the central limit theorem, and Slutsky's lemma enters the argument below, which is why the conditions can be kept as light as they are.

<div class="theorem" id="thm-normality">

Suppose that Conditions (i)&ndash;(iv) hold. Then the estimator $\hat\theta_n$ is consistent for $\theta_0$, and

$$
\sqrt{n}\,(\hat\theta_n - \theta_0) \stackrel{d}{\to} N\left(0, I(\theta_0)^{-1}\right)
$$

as $n \to \infty$.

</div>

<div class="proof qed">

Consistency follows from a standard M-estimation argument. By a second-order Taylor expansion of the score around $\theta_0$, there exists $\tilde\theta_n$ between $\hat\theta_n$ and $\theta_0$ such that $0 = s_n(\hat\theta_n) = s_n(\theta_0) + \partial_\theta s_n(\tilde\theta_n)(\hat\theta_n - \theta_0)$. Dividing by $n$ and rearranging gives $\hat\theta_n - \theta_0 = -\left[\frac{1}{n}\partial_\theta s_n(\tilde\theta_n)\right]^{-1}\left[\frac{1}{n}s_n(\theta_0)\right]$. The strong law of large numbers and the continuity of $\partial_\theta s_n(\theta)/n$ imply that $\partial_\theta s_n(\tilde\theta_n)/n \stackrel{p}{\to} -I(\theta_0)$ and $(1/n)s_n(\theta_0) \stackrel{p}{\to} 0$, hence $\hat\theta_n \stackrel{p}{\to} \theta_0$. For asymptotic normality, observe that $n^{-1/2}s_n(\theta_0) \stackrel{d}{\to} N(0, I(\theta_0))$ by the central limit theorem. Slutsky's lemma then yields $\sqrt{n}(\hat\theta_n - \theta_0) \stackrel{d}{\to} N(0, I(\theta_0)^{-1})$, completing the proof.

</div>

The representation in the proof suggests a consistent estimator of the asymptotic variance. Specifically, under Condition (iv) we have $\partial_\theta s_n(\hat\theta_n)/n \stackrel{p}{\to} -I(\theta_0)$, so it is natural to estimate $I(\theta_0)$ by $I_n(\hat\theta_n)/n$. Consequently, a consistent estimator of $I(\theta_0)^{-1}$ is given by $[I_n(\hat\theta_n)/n]^{-1}$. The plug-in variance obtained in this way inherits the consistency of the estimator itself and requires no additional smoothing parameter. An alternative, based on the outer product of scores, is given by

<div class="equation" id="eq-outer">

$$
\hat V_n = \frac{1}{n}\sum_{i=1}^{n} \partial_\theta \ell(\hat\theta_n; Z_i)\, \partial_\theta \ell(\hat\theta_n; Z_i)^{\mathrm{T}},
$$

</div>

which is consistent for $I(\theta_0)$ as well; see the discussion in <a href="#sec-outer" data-ref="sec"></a>.

<div class="theorem corollary" id="cor-coverage">

Under Conditions (i)&ndash;(iv), the interval <a href="#eq-interval" data-ref="eq"></a>&nbsp;formed with either $\hat\sigma_n^{2} = [I_n(\hat\theta_n)/n]^{-1}$ or $\hat\sigma_n^{2} = \hat V_n^{-1}$ satisfies $P_{\theta_0}\{\theta_0 \in \mathcal{C}_n(\alpha)\} \to 1 - \alpha$.

</div>

<div class="proof qed">

Both variance estimates converge in probability to $I(\theta_0)^{-1}$, which is positive and finite by (iv). The claim follows from Theorem <a href="#thm-normality" data-ref="thm"></a>&nbsp;and a second application of Slutsky's lemma.

</div>

Corollary <a href="#cor-coverage" data-ref="thm"></a>&nbsp;is the reason the choice between the two variance estimates is invisible to first-order theory, and it is also the reason the choice cannot be settled by asymptotic arguments alone. The remainder of the paper is concerned with what happens before the limit.

### Finite-Sample Behavior {#sec-finite}

We now examine the finite-sample performance via Monte Carlo experiments. Data are generated from the model in Example <a href="#ex-curved" data-ref="thm"></a>&nbsp;with $\theta_0 = 1$. For each sample size $n \in \{50, 100, 200, 500, 1000\}$, we compute two-sided 95% confidence intervals based on Methods A and B described in <a href="#sec-variance" data-ref="sec"></a>&nbsp;and report empirical coverage over 10,000 replications.<span class="footnote">The generating code and the seed table are archived with the journal under the reproducibility policy of this volume.</span> The score equation is solved by a safeguarded Newton iteration started at the sample mean, with convergence declared once the absolute score falls below $10^{-10}$; the iteration required four steps on average and never more than nine. Variates are drawn from a single stream, and the same stream is used at all five sample sizes, so that the rows of <a href="#tbl-coverage" data-ref="tbl"></a>&nbsp;are comparable with one another rather than independent.

<figure class="tbl" id="tbl-coverage">

<figcaption>

Empirical coverage of the proposed interval.

</figcaption>

| $n$  | Method A | Method B | Bootstrap |
| ---- | -------- | -------- | --------- |
| 50   | 0.913    | 0.905    | 0.901     |
| 100  | 0.929    | 0.921    | 0.923     |
| 200  | 0.943    | 0.939    | 0.940     |
| 500  | 0.953    | 0.950    | 0.951     |
| 1000 | 0.957    | 0.955    | 0.956     |

</figure>

The results in <a href="#tbl-coverage" data-ref="tbl"></a>&nbsp;indicate that both methods attain coverage close to the nominal level as $n$ grows, with Method A performing slightly better in small samples. We note that our proposed interval (Method A) relies on the observed information, which tends to stabilize the variance estimation. Similar findings have been reported in related settings by Bramwell and Okonjo <a href="#ref-bramwell" data-ref="cite"></a>, who emphasize the advantage of observed information in curved exponential families. Comparable behavior is documented for the saddlepoint intervals of Weatherstane <a href="#ref-weatherstane" data-ref="cite"></a> and for the modified profile likelihood of Osterbrandt and Perrivale <a href="#ref-osterbrandt" data-ref="cite"></a>, both of which condition on the realized curvature in one form or another. Moreover, the coverage behavior is comparable to that obtained under bootstrap calibration, as documented in recent studies such as Marrenholt et al. <a href="#ref-marrenholt" data-ref="cite"></a>, though bootstrap intervals incur a substantially higher computational cost. A residual downward bias remains visible at $n = 50$, where the observed information is itself estimated with appreciable variability.

<a href="#sec-correction" data-ref="sec"></a>&nbsp;shows that a simple Bartlett-type correction removes most of this residual bias without affecting the limiting distribution established in Theorem <a href="#thm-normality" data-ref="thm"></a>.

## Variance Estimation and Interval Construction {#sec-variance}

This section examines the two variance estimates separately, identifies the order at which they separate, and derives the correction announced above.

### The Observed Information {#sec-observed}

Write the observed information as

<div class="equation" id="eq-obsinfo">

$$
I_n(\theta) = -\partial_\theta^{2} \ell_n(\theta) = -\sum_{i=1}^{n} \partial_\theta^{2} \ell(\theta; Z_i),
$$

</div>

so that Method A of <a href="#tbl-methods" data-ref="tbl"></a>&nbsp;takes $\hat\sigma_n^{2} = [I_n(\hat\theta_n)/n]^{-1}$. Two features of this estimate deserve comment. It is a function of the realized second derivative, so it responds to samples that happen to be uninformative by widening the interval, which is the behavior one wants and which the expected information cannot produce. It is also available without any additional computation whenever the score equation has been solved by a Newton scheme, since the Newton step already requires $I_n$ at each iterate.

Against these advantages stands the possibility that $I_n(\hat\theta_n)$ is negative, or nearly so, in samples of the kind that make the log-likelihood locally convex. Under Condition (iv) this event has probability tending to zero at an exponential rate, and it did not occur in any of the 10,000 replications reported in <a href="#tbl-coverage" data-ref="tbl"></a>&nbsp;for $n \ge 100$; it occurred in eleven replications at $n = 50$, which were discarded and regenerated.

### The Outer Product of Scores {#sec-outer}

Method B replaces $I_n(\hat\theta_n)/n$ by the average outer product $\hat V_n$ of <a href="#eq-outer" data-ref="eq"></a>. The two are consistent for the same limit, and the information identity is what makes them so: the expectation of the outer product equals the negative expected second derivative whenever the model is correctly specified and differentiation under the integral sign is permitted. The identity holds in expectation only. At the level of the realized sample the two differ, and the difference admits the expansion

<div class="equation" id="eq-diff">

$$
\hat V_n - \frac{I_n(\hat\theta_n)}{n} = \frac{\kappa_3(\theta_0)}{\sqrt{n}}\, U_n + o_p(n^{-1/2}),
$$

</div>

where $U_n \stackrel{d}{\to} N(0,1)$ and

<div class="equation" id="eq-kappa">

$$
\kappa_3(\theta) = \frac{\mathrm{E}_\theta\left[\partial_\theta \ell(\theta; Z_1)\right]^{3}}{I(\theta)^{3/2}}
$$

</div>

is the third standardized cumulant of the score. When $\kappa_3(\theta_0) = 0$, as happens for symmetric location families, the two variance estimates agree to order $n^{-1}$ and the intervals they generate are indistinguishable in practice. When $\kappa_3(\theta_0) \ne 0$ they are not, and <a href="#eq-diff" data-ref="eq"></a>&nbsp;shows that the discrepancy enters the pivot at the same order as the leading coverage error. For Example <a href="#ex-curved" data-ref="thm"></a>&nbsp;the score is $\partial_\theta \ell(\theta; Z) = (U + U^{2} - 1)/\theta$ with $U = (Z - \theta)/\theta$ standard normal, whence $\kappa_3(\theta) = 14/(3\sqrt{3}) \approx 2.69$ for every $\theta > 0$; this is the source of the ordering visible in <a href="#tbl-coverage" data-ref="tbl"></a>.

The practical consequence is that the outer-product estimate carries the additional variability of a sample third moment, while the observed information does not. Where third moments are poorly determined &mdash; short series, heavy tails, or both &mdash; Method B pays for the convenience of avoiding second derivatives with a wider spread of realized interval lengths, a point already anticipated by Mostyn-Raab and Perrivale <a href="#ref-mostyn-raab" data-ref="cite"></a>.

### A Bartlett-Type Correction {#sec-correction}

Let

<div class="equation" id="eq-wald">

$$
W_n = n\,\hat\sigma_{A,n}^{-2}\,(\hat\theta_n - \theta_0)^{2}
$$

</div>

denote the Wald statistic underlying Method A, so that $\mathcal{C}_n(\alpha)$ is the set of $\theta_0$ with $W_n \le \chi^{2}_{1, 1-\alpha}$. Theorem <a href="#thm-normality" data-ref="thm"></a>&nbsp;gives $W_n \stackrel{d}{\to} \chi^{2}_{1}$, but the convergence of the mean is slower than the convergence of the distribution, and the discrepancy is what the correction targets. Define

<div class="equation" id="eq-correction">

$$
\begin{aligned}
b(\theta) &= \lim_{n \to \infty} n \left\{ \mathrm{E}_\theta(W_n) - 1 \right\}, \\
W_n^{*} &= \frac{W_n}{1 + b(\hat\theta_n)/n}.
\end{aligned}
$$

</div>

The limit exists under Conditions (i)&ndash;(iv) together with a fourth absolute moment for the score; the argument is the one given by Rasborough <a href="#ref-rasborough" data-ref="cite"></a> for the likelihood ratio, transposed to the Wald statistic, and we omit it.

Two properties of <a href="#eq-correction" data-ref="eq"></a>&nbsp;are worth recording before the formal statement. The correction is multiplicative, so it cannot move the centering of the interval and leaves the point estimate exactly where it was; only the effective critical value changes. And because the constant enters through $b(\hat\theta_n)/n$, an error committed in evaluating the limit propagates to the coverage at order $n^{-1}$ alone, which is why a rough value of $b$ is enough in practice and why we quote it below to three significant figures without apology.

<div class="theorem proposition" id="prop-bartlett">

Assume the conditions of Theorem <a href="#thm-normality" data-ref="thm"></a>&nbsp;and $\mathrm{E}_{\theta_0}|\partial_\theta \ell(\theta_0; Z_1)|^{4} < \infty$. Then $W_n^{*} \stackrel{d}{\to} \chi^{2}_{1}$, and

$$
P_{\theta_0}\left\{ W_n^{*} \le \chi^{2}_{1,1-\alpha} \right\} = 1 - \alpha + O(n^{-3/2}),
$$

whereas the same probability computed from $W_n$ is $1 - \alpha + O(n^{-1})$.

</div>

<div class="proof sketch qed">

The first claim is immediate, since $b(\hat\theta_n)/n \to 0$ in probability and $b$ is continuous at $\theta_0$ by (iii). For the second, expand the distribution function of $W_n$ about that of $\chi^{2}_{1}$; the $O(n^{-1})$ term is proportional to $b(\theta_0)$ times the density of $\chi^{2}_{1}$ at the critical value, and division by $1 + b(\hat\theta_n)/n$ cancels it, leaving the $O(n^{-3/2})$ term generated by the estimation of $b$.

</div>

The correction is scale-free in Example <a href="#ex-curved" data-ref="thm"></a>: because the family is equivariant under the scale group and both $W_n$ and its mean are invariant, $b(\theta)$ does not depend on $\theta$, and numerical evaluation of the limit in <a href="#eq-correction" data-ref="eq"></a>&nbsp;gives $b = 10.2$. Applying the correction to the samples underlying <a href="#tbl-coverage" data-ref="tbl"></a>&nbsp;raises the coverage of Method A from 0.913 to 0.940 at $n = 50$ and from 0.929 to 0.942 at $n = 100$, and leaves the larger sample sizes essentially unchanged, at 0.949, 0.955 and 0.958 for $n = 200$, 500 and 1000. The correction is therefore worth applying where it matters and harmless, if very mildly conservative, where it does not.

## Further Numerical Evidence {#sec-numerical}

All experiments in this section use 10,000 independent replications, so that the Monte Carlo standard error of a coverage estimate near 0.95 is 0.0022 and differences below 0.005 should not be read as real.

### Bias, Dispersion, and Interval Length {#sec-bias}

<a href="#tbl-bias" data-ref="tbl"></a>&nbsp;reports the bias and the root mean squared error of $\hat\theta_n$ together with the average lengths of the two intervals. The asymptotic standard deviation of $\hat\theta_n$ at $\theta_0 = 1$ is $\{3n\}^{-1/2}$, which equals 0.0817 at $n = 50$ and 0.0183 at $n = 1000$; the realized root mean squared errors exceed these values by four per cent at the smallest sample size and by less than one per cent at the largest.

<figure class="tbl" id="tbl-bias">

<figcaption>

Bias, root mean squared error, and average interval length at $\theta_0 = 1$.

</figcaption>

| $n$  | Bias    | RMSE   | Length A | Length B |
| ---- | ------- | ------ | -------- | -------- |
| 50   | -0.0104 | 0.0851 | 0.331    | 0.318    |
| 100  | -0.0053 | 0.0592 | 0.230    | 0.224    |
| 200  | -0.0027 | 0.0414 | 0.162    | 0.159    |
| 500  | -0.0011 | 0.0261 | 0.102    | 0.101    |
| 1000 | -0.0005 | 0.0184 | 0.0719   | 0.0716   |

</figure>

The bias is negative and of order $n^{-1}$, as the expansion in the proof of Theorem <a href="#thm-normality" data-ref="thm"></a>&nbsp;predicts, and it is an order of magnitude smaller than the standard deviation at every sample size considered. The interval lengths are ordered as <a href="#sec-outer" data-ref="sec"></a>&nbsp;anticipates: Method A is uniformly the wider of the two, by four per cent at $n = 50$ and by less than half a per cent at $n = 1000$, and the ordering of the lengths reproduces the ordering of the coverages in <a href="#tbl-coverage" data-ref="tbl"></a>. Repeating the experiment at $\theta_0 = 0.5$ and $\theta_0 = 2$ produced coverages agreeing with <a href="#tbl-coverage" data-ref="tbl"></a>&nbsp;to within 0.003 at every entry, as the scale equivariance of Example <a href="#ex-curved" data-ref="thm"></a>&nbsp;requires.

### Departures from the Model {#sec-departures}

The information identity invoked in <a href="#sec-outer" data-ref="sec"></a>&nbsp;presumes a correctly specified model, and it is worth asking how quickly the comparison degrades when that presumption fails. We generated data from the contaminated family

<div class="equation" id="eq-contam">

$$
Z_i \sim (1 - \varepsilon)\, N(\theta_0, \theta_0^{2}) + \varepsilon\, N(\theta_0, 9\theta_0^{2}),
$$

</div>

which inflates the tails without displacing the center, and fitted the uncontaminated model of Example <a href="#ex-curved" data-ref="thm"></a>&nbsp;to the result. <a href="#tbl-contam" data-ref="tbl"></a>&nbsp;reports coverage at $n = 200$; the row $\varepsilon = 0$ reproduces the corresponding row of <a href="#tbl-coverage" data-ref="tbl"></a>&nbsp;and serves as a check on the implementation.

<figure class="tbl" id="tbl-contam">

<figcaption>

Coverage under the contaminated model <a href="#eq-contam" data-ref="eq"></a>&nbsp;at $n = 200$.

</figcaption>

| $\varepsilon$ | Method A | Method B | Method A* |
| ------------- | -------- | -------- | --------- |
| 0.00          | 0.943    | 0.939    | 0.949     |
| 0.02          | 0.938    | 0.930    | 0.944     |
| 0.05          | 0.926    | 0.913    | 0.933     |
| 0.10          | 0.902    | 0.881    | 0.911     |

</figure>

Two features stand out. The degradation is monotone in $\varepsilon$ for all three constructions, as expected, but it is markedly faster for Method B, whose deficit at $\varepsilon = 0.10$ is roughly double that of Method A. This is the behavior predicted by <a href="#eq-diff" data-ref="eq"></a>: contamination in the tails acts directly on the sample third moment, and the outer-product estimate is the one that carries it. The correction of <a href="#sec-correction" data-ref="sec"></a>&nbsp;retains its usefulness under contamination, recovering about half of the deficit at every level of $\varepsilon$, although it was derived under correct specification and no claim of higher-order validity survives the departure. Trewellan and Ishizure <a href="#ref-trewellan" data-ref="cite"></a> reach a similar conclusion for contaminated scale families by a different route.

### Computational Cost {#sec-cost}

A last comparison concerns the arithmetic. Method A needs one evaluation of the second derivative at the solution, which the Newton iteration has already formed; Method B needs $n$ evaluations of the score at the solution and one pass to accumulate their squares. Neither cost is material at the sample sizes considered here, and both are negligible beside the bootstrap benchmark, which repeats the entire estimation 999 times within every replication. On the hardware used for <a href="#tbl-coverage" data-ref="tbl"></a>, one replication at $n = 1000$ took 0.4 ms under Method A, 0.5 ms under Method B, and 0.42 s under the bootstrap. The calibration that buys nothing in <a href="#tbl-coverage" data-ref="tbl"></a>&nbsp;therefore costs three orders of magnitude in time, and whatever case can be made for resampling in this problem, it is not a case about coverage.

## Discussion {#sec-discussion}

The practical recommendation that follows from the preceding sections is narrow but firm. When the second derivative of the log-likelihood is available, whether analytically or as a by-product of a Newton solver, the observed information should be preferred, and the correction of <a href="#sec-correction" data-ref="sec"></a>&nbsp;should be applied whenever the sample size falls below roughly two hundred. When the second derivative is unavailable, the outer product remains serviceable, but the interval it produces should be read as slightly too narrow, and the more so the more skewed the score.

Three limitations bound these conclusions. The parameter is real-valued, and the extension to a vector parameter replaces the scalar cumulant of <a href="#eq-kappa" data-ref="eq"></a>&nbsp;by an array whose contribution to the coverage error need not have a fixed sign; the multiparameter case is treated in the companion work of Perrivale et al. <a href="#ref-perrivale" data-ref="cite"></a>. The observations are independent, and the outer-product estimate is precisely the one that fails first under dependence, so the comparison presented here should not be transported to time series without modification. Finally, <a href="#sec-departures" data-ref="sec"></a>&nbsp;examines misspecification only in the tails of the sampling distribution and not in the mean structure, where the information identity fails in a more damaging way and where neither of the two estimates is consistent for the correct sandwich variance.

For practice the argument reduces to a rule that costs nothing to follow. Report the interval built on the observed information; apply the correction <a href="#eq-correction" data-ref="eq"></a>&nbsp;whenever $n$ is below two hundred; and fall back on the outer product only when the second derivative is genuinely unavailable. The correction requires a single number, $b(\hat\theta_n)$, which is a one-dimensional integral for any model whose score can be simulated, and which is computed once per model rather than once per sample.

None of these limitations affects the point of departure. The limit theorem does not select the interval; a convention does, and the convention is worth choosing deliberately.

## An Auxiliary Lemma {#sec-appendix .appendix}

The following lemma isolates the step at which Condition (iii) enters, and it is the only point in the argument of <a href="#sec-asymptotics" data-ref="sec"></a>&nbsp;at which a third derivative is required.

<div class="theorem lemma" id="lem-uniform">

Assume Conditions (i)&ndash;(iv) and let $\delta_n$ be any sequence with $\delta_n \downarrow 0$. Then

$$
\sup_{|\theta - \theta_0| \le \delta_n} \left| \frac{1}{n}\partial_\theta^{2}\ell_n(\theta) + I(\theta_0) \right| \stackrel{p}{\to} 0.
$$

</div>

<div class="proof">

By Condition (iii) there are a neighborhood $\mathcal{N}$ of $\theta_0$ and a function $M$ with $\mathrm{E}_{\theta_0} M(Z_1) < \infty$ such that $|\partial_\theta^{3}\ell(\theta; z)| \le M(z)$ for every $\theta \in \mathcal{N}$. On that neighborhood the mean value theorem bounds the difference $|\partial_\theta^{2}\ell(\theta; z) - \partial_\theta^{2}\ell(\theta_0; z)|$ by $|\theta - \theta_0|\, M(z)$, and therefore

</div>

<div class="equation" id="eq-bound">

$$
\sup_{|\theta - \theta_0| \le \delta_n} \left| \frac{\partial_\theta^{2}\ell_n(\theta) - \partial_\theta^{2}\ell_n(\theta_0)}{n} \right| \le \frac{\delta_n}{n} \sum_{i=1}^{n} M(Z_i)
$$

</div>

<div class="proof continued qed">

for all $n$ large enough that $[\theta_0 - \delta_n, \theta_0 + \delta_n] \subset \mathcal{N}$. The average on the right of <a href="#eq-bound" data-ref="eq"></a>&nbsp;converges in probability to $\mathrm{E}_{\theta_0}M(Z_1)$, which is finite, and $\delta_n \to 0$; hence the left side is $o_p(1)$. Since $n^{-1}\partial_\theta^{2}\ell_n(\theta_0) \stackrel{p}{\to} -I(\theta_0)$ by a second application of the law of large numbers, the claim follows.

</div>

The lemma is applied twice in the proof of Theorem <a href="#thm-normality" data-ref="thm"></a>, once to the intermediate point $\tilde\theta_n$ produced by the Taylor expansion and once to $\hat\theta_n$ itself, and it is what allows Condition (iii) to be stated as a third absolute moment rather than as the uniform bound assumed elsewhere in the literature.

## Acknowledgments ##

We thank the participants of the Ashmere Workshop on Higher-Order Asymptotics for their comments on an early version of <a href="#sec-variance" data-ref="sec"></a>, and two referees whose reading of the proof of Proposition <a href="#prop-bartlett" data-ref="thm"></a>&nbsp;corrected an error in the treatment of the remainder term. This work was supported by the Cendral Foundation under grant CF-4471.

## References ##

<ol class="cite-items">
<li id="ref-dunsmere">Dunsmere, P. (2014). <em>Likelihood and Asymptotics</em>, 2nd ed. Thornbeck Press.</li>
<li id="ref-halbersen">Halbersen, J. (2009). Roots of the score equation and their selection. <em>Ann. Likelihood Theory</em> <strong>14</strong> 512&ndash;544.</li>
<li id="ref-ishizure">Ishizure, Y. and Osterbrandt, L. (2018). Information estimates in parametric inference: a survey. <em>Rev. Asymptot. Methods</em> <strong>31</strong> 1&ndash;48.</li>
<li id="ref-okarwe">Okarwe, N. (2011). Observed against expected information in one-parameter families. <em>J. Theor. Statist.</em> <strong>33</strong> 289&ndash;316.</li>
<li id="ref-vennerholm">Vennerholm, E. (2013). Conditioning, ancillarity, and the variance of the score. <em>Bull. Cendral Statist. Soc.</em> <strong>45</strong> 77&ndash;104.</li>
<li id="ref-mostyn-raab">Mostyn-Raab, D. and Perrivale, V. (2016). The outer product of scores as a variance estimate. <em>Lett. Statist. Theory</em> <strong>8</strong> 33&ndash;52.</li>
<li id="ref-quennard">Quennard, G. (2019). Finite-sample coverage of Wald intervals: a review of the evidence. <em>J. Comput. Inference</em> <strong>12</strong> 201&ndash;237.</li>
<li id="ref-aldenbrook">Aldenbrook, R. and Feretti, M. (2021). Higher-order corrections without Edgeworth expansions. <em>Ann. Likelihood Theory</em> <strong>26</strong> 903&ndash;931.</li>
<li id="ref-calvenna">Calvenna, S. (2007). Measurable selection among consistent roots. <em>Fallowbrook J. Probab.</em> <strong>19</strong> 445&ndash;468.</li>
<li id="ref-ubaldeschi">Ubaldeschi, F. and Weatherstane, A. (2015). <em>Curved Exponential Families and Their Information Geometry</em>. Ashmere University Press.</li>
<li id="ref-sorbelius">Sorbelius, B. (2012). Minimal smoothness conditions for asymptotic normality. <em>Rev. Asymptot. Methods</em> <strong>25</strong> 61&ndash;89.</li>
<li id="ref-bramwell">Bramwell, H. and Okonjo, A. (2020). Observed information in curved exponential families. <em>J. Theor. Statist.</em> <strong>42</strong> 118&ndash;149.</li>
<li id="ref-weatherstane">Weatherstane, A. (2022). Saddlepoint intervals for score-equation estimators. <em>J. Comput. Inference</em> <strong>15</strong> 44&ndash;71.</li>
<li id="ref-osterbrandt">Osterbrandt, L. and Perrivale, V. (2023). Modified profile likelihood in scale-equivariant models. <em>Ann. Likelihood Theory</em> <strong>28</strong> 155&ndash;186.</li>
<li id="ref-marrenholt">Marrenholt, T., Calvenna, S. and Quennard, G. (2024). Bootstrap calibration of likelihood-based intervals. <em>J. Theor. Statist.</em> <strong>46</strong> 612&ndash;651.</li>
<li id="ref-rasborough">Rasborough, C. (2018). Bartlett-type adjustments for Wald statistics. <em>Lett. Statist. Theory</em> <strong>10</strong> 88&ndash;112.</li>
<li id="ref-trewellan">Trewellan, I. and Ishizure, Y. (2025). Contaminated scale families and the stability of information estimates. <em>Bull. Cendral Statist. Soc.</em> <strong>57</strong> 233&ndash;262.</li>
<li id="ref-perrivale">Perrivale, V., Sorbelius, B. and Vennerholm, E. (2026). Multiparameter extensions of information-based intervals. <em>Rev. Asymptot. Methods</em> <strong>38</strong> 1&ndash;34.</li>
</ol>

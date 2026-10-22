---
title: "Spectral Rigidity of Operator Fields over Fibered Manifolds"
lang: en
class: journal-page
---

<div class="paper-head">

# Spectral rigidity of operator fields over fibered manifolds #

<p class="byline">Marguerite Ollenshaw <sup>a</sup>, Teodor V. Brasko <sup>b</sup>, Saki Hazumi <sup>c</sup></p>

<p class="affil"><sup>a</sup> Institut für Geometrische Analysis, Universität Falkenstein, Falkenstein<br /><sup>b</sup> Department of Mathematics, Caldermoor University, Caldermoor<br /><sup>c</sup> Department of Mathematical Sciences, Aoshima Institute of Technology, Aoshima</p>

<div class="abstract">

**Abstract.** Let $\pi\colon M \to B$ be a Riemannian submersion of closed manifolds with compact totally geodesic fibre, and let $A = (A_b)_{b \in B}$ be a smooth field of formally self-adjoint elliptic operators acting along the fibres of a Hermitian line bundle $L \to M$. The spectral datum attached to such a field is not a single sequence but a function on the base, the fibrewise spectrum $b \mapsto \operatorname{spec}(A_b)$. We prove that an admissible operator field is infinitesimally spectrally rigid whenever the closed horizontal geodesics of the submersion are nondegenerate and the horizontal geodesic flow has a dense set of closed orbits: every $C^{1}$ deformation of $A$ that preserves the fibrewise spectrum with multiplicity is trivial to first order. The proof rests on a trace formula for the fibrewise wave group whose singular support is carried by the lengths of the closed horizontal geodesics, together with a Livšic-type argument that converts the vanishing of the associated orbital integrals into a coboundary equation on the unit horizontal bundle. We also give a remainder estimate for the trace formula that is uniform in the test function, and we exhibit a family of Heisenberg nilmanifolds showing that the density hypothesis cannot be dropped.

</div>

<p class="kw"><strong>Keywords:</strong> Spectral rigidity; Riemannian submersion; Wave trace; Operator field; Livšic cohomology; Closed horizontal geodesic</p>

<p class="msc"><strong>2020 MSC:</strong> Primary 58J50; Secondary 37D40, 53C12, 58J40</p>

</div>

## Introduction {#sec-intro}

The spectrum of an elliptic operator remembers a great deal of the geometry that
produced it, and forgets just enough to keep the subject alive. For the Laplacian
of a closed Riemannian manifold the pattern of what is remembered has long been
understood: the dimension, the volume and the integrated scalar curvature are read
off the small-time heat expansion, while the lengths of the closed geodesics
announce themselves as singularities of the wave trace. What the spectrum does not
determine is the metric itself. Isospectral pairs are plentiful, and the devices
that produce them — lattice constructions, coverings, torus actions — have almost
nothing to do with the dynamics of the geodesic flow.

The distinction between these two failures is the subject of spectral rigidity.
One asks not whether isospectral partners exist, but whether they can be reached
continuously: whether a smooth one-parameter family of isospectral metrics must be
a family of isometries in disguise. Posed this way the question becomes dynamical
rather than algebraic, and it has an answer whenever the geodesic flow is chaotic
enough for its closed orbits to be dense and its Livšic cohomology to be
trivial.<span class="footnote">The pattern of argument — trace formula, orbital integrals, coboundary — is by now standard; the account of Ashgrove [<a href="#ref-ashgrove-micro" data-ref="citenum"></a>, ch. 4] is the one we follow most closely.</span>

This paper poses the same question one level up. Instead of a single operator on a
single manifold we consider a _field_ of operators, indexed by the points of a base
manifold and acting along the fibres of a submersion over it. Such fields arise
whenever a geometric problem is studied in an adiabatic limit, where the fibre
directions carry a small parameter and the base directions do not, and they arise
again in the index theory of families, where the interesting invariants are those
that vary over the base. In both settings the natural spectral datum is a function
on the base rather than a number, and the natural question is how much of the
geometry of the total space that function retains.

### Operator fields and their fibrewise spectra

Let $\pi\colon M \to B$ be a Riemannian submersion of closed manifolds, let
$F_b = \pi^{-1}(b)$ denote its fibres, and let $L \to M$ be a Hermitian line bundle
carrying a unitary connection $\nabla$. By an _operator field_ on $L$ we mean a
smooth assignment $b \mapsto A_b$ of a formally self-adjoint elliptic operator of
order two acting on sections of $L|_{F_b}$; the precise conditions are collected in
Definition <a href="#def-operator-field" data-ref="thm"></a>. Since each fibre is compact, every $A_b$ has discrete spectrum, and
the _fibrewise spectrum_ of the field is the function

<div class="equation" id="eq-fibrewise-spectrum">

$$
\sigma_A \colon B \longrightarrow \mathbb{R}^{\mathbb{N}}, \qquad \sigma_A(b) = \bigl(\lambda_1(b) \le \lambda_2(b) \le \cdots \bigr)
$$

</div>

whose values are the eigenvalue sequences of the individual fibre operators,
listed with multiplicity. Two operator fields are _isospectral_ if their fibrewise
spectra agree as functions on $B$.

<aside class="sidenote">

Throughout, _rigidity_ means rigidity under deformation; nothing is claimed
about isospectral pairs at finite distance.

</aside>

There is an obvious source of isospectral fields, and it must be discarded before
the question has content. If $U = (U_b)$ is a smooth field of unitary operators on
the fibres, then $A' = U A U^{-1}$, meaning $A'_b = U_b A_b U_b^{-1}$, is an
operator field with the same fibrewise spectrum as $A$. We call such fields _gauge
equivalent_; the group of fibrewise unitaries is the gauge group of the problem,
and rigidity should assert that nothing else preserves the fibrewise spectrum.

### The main theorem

Our hypotheses concern the horizontal geodesic flow $\varphi_t$ of the submersion,
which acts on the unit horizontal bundle $S^{\mathcal{H}}M$ and is reviewed in
<a href="#sec-submersions" data-ref="sec"></a>. Write $\mathrm{Prim}$ for the set of its primitive closed orbits, $\ell_\gamma$
for the length of $\gamma \in \mathrm{Prim}$ and $P_\gamma$ for the associated
transverse Poincaré map. We assume:

<div class="hypotheses">

**(A1)** the periodic set of $\varphi_t$ is a disjoint union of clean families
$B_\gamma$, along each of which $\ell_\gamma$ and $P_\gamma$ are constant and
$\det(I - P_\gamma) \neq 0$;

**(A2)** the closed orbits of $\varphi_t$ are dense in $S^{\mathcal{H}}M$, and every
continuous function annihilated by all closed-orbit averages is a coboundary.

</div>

Hypothesis (A1) is the fibered analogue of the Duistermaat–Guillemin nondegeneracy
condition; it is generic in the sense made precise by Fenwick <a href="#ref-fenwick" data-ref="cite"></a>. Hypothesis (A2)
is a Livšic condition, and <a href="#sec-examples" data-ref="sec"></a>&nbsp;shows that it holds for a large class of principal
bundles over hyperbolic surfaces and fails, in a way we can make explicit, for
Heisenberg nilmanifolds.

<aside class="sidenote">

(A2) is assumed rather than derived: the class of fibrations for which it is
known is still narrow.

</aside>

<div class="theorem" id="thm-main">

<span class="thmname">Infinitesimal spectral rigidity</span> Let $\pi\colon M \to B$ be a
Riemannian submersion of closed manifolds with compact totally geodesic fibre,
satisfying (A1) and (A2), and let $A$ be an admissible operator field on a
Hermitian line bundle $L \to M$. Let $(A^{s})_{\lvert s \rvert < \varepsilon}$ be a
$C^{1}$ family of admissible operator fields with $A^{0} = A$ and with
$\sigma_{A^{s}} = \sigma_{A}$ for every $s$. Then the deformation is trivial to
first order: the subprincipal symbol of $\dot{A}$ is a coboundary for the
horizontal flow.

</div>

The notions used in the statement are defined in <a href="#sec-setting" data-ref="sec"></a>&nbsp;and <a href="#sec-rigidity" data-ref="sec"></a>; triviality to first
order is Definition <a href="#def-trivial" data-ref="thm"></a>, and Lemma <a href="#lem-gauge" data-ref="thm"></a>&nbsp;shows that gauge deformations are trivial in
exactly this sense, so that the conclusion is the strongest one available at the
level of first-order data.

A second consequence of the machinery is independent of the deformation-theoretic
setting and worth recording separately.

<div class="theorem corollary" id="cor-lengths">

Under (A1) alone, the fibrewise spectrum of an admissible
operator field determines the set of pairs
$\bigl\{(\ell_\gamma, \int_{B_\gamma} a_\gamma \, d\mu_\gamma) : \gamma \in \mathrm{Prim}\bigr\}$
of lengths and integrated holonomy weights of the closed horizontal geodesics.

</div>

Fields of fibre operators have been studied before, but the spectral question has
usually been asked of the total space rather than of the fibres. Delacroix-Hune <a href="#ref-delacroix" data-ref="cite"></a>
determined which invariants of a submersion metric survive in the spectrum of the
total Laplacian, and Ashgrove and Brasko <a href="#ref-ashgrove-brasko" data-ref="cite"></a> obtained a wave trace for foliated
manifolds whose leaves are not compact. Closest to the present work are the
rigidity theorem of Brasko <a href="#ref-brasko" data-ref="cite"></a>&nbsp;for line bundle Laplacians over a single fibre and
the deformation results of Ollenshaw <a href="#ref-ollenshaw" data-ref="cite"></a>&nbsp;for principal circle bundles, of which
Theorem <a href="#thm-main" data-ref="thm"></a>&nbsp;is the general case; the adiabatic behaviour of the fibrewise spectrum,
which we do not use, is described in <a href="#ref-ollenshaw-hazumi" data-ref="cite"></a>. For the index theory of families in which
operator fields first arose we refer to the monograph of Marchbanks <a href="#ref-marchbanks" data-ref="cite"></a>.

### Method of proof

The argument has three steps, and each of them is a fibered version of a
construction that is classical in the unfibered case.

The first step, carried out in <a href="#sec-trace" data-ref="sec"></a>, is a trace formula. The fibrewise spectrum is
assembled into a single scalar quantity by integrating a smoothed spectral counting
function over the base; the result is an oscillatory integral on the total space
whose stationary points are exactly the closed horizontal geodesics. The novelty
here is not the method but the geometry of the critical set: because the flow is a
skew product over the base, its periodic set is a union of positive-dimensional
families, and the stationary phase must be applied in the clean, rather than the
nondegenerate, form.

<aside class="sidenote">

The clean intersection calculus is what forces the integral over $B_\gamma$
in <a href="#eq-partition" data-ref="eq"></a>. In the unfibered case $B_\gamma$ is a circle and the integral collapses
to a length.

</aside>

The second step, in <a href="#sec-rigidity" data-ref="sec"></a>, differentiates the trace formula along an isospectral
deformation. The left-hand side is constant, since the eigenvalues do not move; the
right-hand side is a sum over closed orbits whose terms are pairwise independent, by
(A1) and the linear independence of the exponentials $e^{i\ell_\gamma/t}$. Matching
coefficients gives the vanishing of the orbital integrals of the subprincipal symbol
of $\dot{A}$.

The third step is cohomological. A continuous function on $S^{\mathcal{H}}M$ whose
integral over every closed orbit vanishes is a coboundary, provided the flow is
transitive with dense closed orbits; this is the content of (A2), and it converts
the conclusion of the second step into the equation $\sigma_{\mathrm{sub}}(\dot A) = Xq$
that defines triviality.

### Organization

<a href="#sec-setting" data-ref="sec"></a>&nbsp;fixes the geometric setting, defines operator fields and
admissibility, and describes the periodic set of the horizontal flow.
<a href="#sec-trace" data-ref="sec"></a>&nbsp;develops the trace formula and proves the remainder estimate on
which everything else rests. <a href="#sec-rigidity" data-ref="sec"></a>&nbsp;contains the deformation argument
and the proof of Theorem <a href="#thm-main" data-ref="thm"></a>. <a href="#sec-examples" data-ref="sec"></a>&nbsp;discusses two families of
examples, one where the hypotheses hold and one where they fail, and
<a href="#sec-conclusion" data-ref="sec"></a>&nbsp;collects open questions.

## The Fibered Setting {#sec-setting}

### Riemannian submersions and horizontal geodesics {#sec-submersions}

Let $(M, g)$ and $(B, g_B)$ be closed connected Riemannian manifolds of dimensions
$n$ and $m$, and let $\pi\colon M \to B$ be a Riemannian submersion with compact
fibre $F$ of dimension $f = n - m$. The tangent bundle of the total space splits
orthogonally,

<div class="equation">

$$
TM = \mathcal{H} \oplus \mathcal{V}, \qquad \mathcal{V}_x = \ker d\pi_x, \qquad \mathcal{H}_x = \mathcal{V}_x^{\perp},
$$

</div>

and $d\pi_x$ restricts to a linear isometry from $\mathcal{H}_x$ onto
$T_{\pi(x)}B$. We assume once and for all that the fibres are totally geodesic;
this is the condition under which the horizontal distribution behaves like a
connection and the fibres are mutually isometric.

A geodesic of $M$ is _horizontal_ if its velocity lies in $\mathcal{H}$ at one, and
hence at every, point. Horizontal geodesics project to geodesics of the base, and
conversely every geodesic of $B$ admits a horizontal lift through each point of the
fibre over its initial point. The resulting flow

<div class="equation">

$$
\varphi_t \colon S^{\mathcal{H}}M \longrightarrow S^{\mathcal{H}}M, \qquad S^{\mathcal{H}}M = \{ v \in \mathcal{H} : \lvert v \rvert_g = 1 \},
$$

</div>

is the _horizontal geodesic flow_. It covers the geodesic flow of the base and is
therefore a skew product: the projection $S^{\mathcal{H}}M \to SB$ is a fibre
bundle with fibre $F$, and $\varphi_t$ acts on the fibres by the parallel transport
of the horizontal distribution along the base geodesic. All the dynamical
hypotheses of this paper are hypotheses about this skew product.

<aside class="sidenote">

For a product submersion the cocycle is trivial and the flow is
$\varphi^{B}_t \times \mathrm{id}$. Such fibrations satisfy neither (A1) nor (A2).

</aside>

The generator of $\varphi_t$ will be written $X$ and regarded throughout as a
first-order differential operator acting on the smooth functions of
$S^{\mathcal{H}}M$; a function of the form $Xq$ with $q$ smooth will be called a
_coboundary_.

### Operator fields

Fix a Hermitian line bundle $L \to M$ with a unitary connection $\nabla$, and let
$\Delta^{L}_b$ denote the Bochner Laplacian of $\nabla$ restricted to the fibre
$F_b$, acting on the space $C^{\infty}(F_b, L)$ of smooth sections over that fibre.

<div class="theorem definition" id="def-operator-field">

An _operator field_ on $L$ is a family $A = (A_b)_{b \in B}$ of
formally self-adjoint elliptic operators of order two, $A_b$ acting on
$C^{\infty}(F_b, L)$, whose Schwartz kernels depend smoothly on $b$ and whose
principal symbols coincide with that of $\Delta^{L}_b$.

</div>

The last condition normalises the leading behaviour of the field and is what allows
its spectral asymptotics to be compared across fibres. Every operator field can
therefore be written in the form

<div class="equation">

$$
A_b = \Delta^{L}_b + \Phi_b, \qquad \Phi_b \in \Psi^{1}(F_b, L),
$$

</div>

with $\Phi = (\Phi_b)$ a smooth field of first-order pseudodifferential operators;
the subprincipal symbol of $A$ is by definition that of $\Phi$, pulled back to
$S^{\mathcal{H}}M$ along the projection. We denote it
$\sigma_{\mathrm{sub}}(A) \in C^{\infty}(S^{\mathcal{H}}M)$.

<div class="theorem lemma" id="lem-eigenvalues">

Let $A$ be an operator field. Then every $A_b$ is essentially
self-adjoint on $L^{2}(F_b, L)$, its spectrum is discrete and accumulates only at
$+\infty$, the eigenvalue functions $\lambda_j$ of <a href="#eq-fibrewise-spectrum" data-ref="eq"></a>&nbsp;are continuous on the base,
and each of them is smooth wherever the corresponding eigenvalue is simple.

</div>

<div class="proof qed">

Essential self-adjointness and discreteness are standard for elliptic
operators on a compact manifold. Continuity of the $\lambda_j$ follows from the
min–max characterisation together with the smooth dependence of the kernels on $b$,
and smoothness at a simple eigenvalue from analytic perturbation theory applied
fibrewise. Uniformity in $j$ is not asserted and is not needed below.

</div>

The eigenvalue functions are in general only continuous, since eigenvalues may
cross over the base; the trace formula of <a href="#sec-trace" data-ref="sec"></a>&nbsp;is insensitive to such crossings
because it involves only symmetric functions of the spectrum.

### The periodic set and admissibility {#sec-admissibility}

Let $\mathcal{C} \subset S^{\mathcal{H}}M$ be the union of the closed orbits of
$\varphi_t$. Under (A1) it decomposes as

<div class="equation">

$$
\mathcal{C} = \bigsqcup_{\gamma \in \mathrm{Prim}} B_\gamma, \qquad B_\gamma = \{ v \in S^{\mathcal{H}}M : \varphi_{\ell_\gamma}(v) = v \},
$$

</div>

each $B_\gamma$ being a compact submanifold on which the flow acts freely with
period $\ell_\gamma$. We call $B_\gamma$ the _isotropy fibre_ of $\gamma$ and write
$\mu_\gamma$ for the measure induced on it by the Riemannian volume of $M$.

<div class="theorem definition">

The _holonomy weight_ of $\gamma \in \mathrm{Prim}$ is the
function $a_\gamma \in C^{\infty}(B_\gamma)$ given by

</div>

<div class="equation" id="eq-holonomy-weight">

$$
a_\gamma(v) = \mathrm{hol}_{\nabla}(\gamma_v)\, \exp\biggl(-i \int_{0}^{\ell_\gamma} \sigma_{\mathrm{sub}}(A)\bigl(\varphi_s(v)\bigr)\, ds \biggr),
$$

</div>

where $\gamma_v$ is the closed horizontal geodesic through $v$ and
$\mathrm{hol}_{\nabla}$ denotes the holonomy of $\nabla$ around it.

The weight is the only place where the bundle $L$ and the lower-order part of the
field enter the trace formula, and the whole of <a href="#sec-rigidity" data-ref="sec"></a>&nbsp;consists of extracting
$\sigma_{\mathrm{sub}}(A)$ from it.

<div class="theorem definition" id="def-admissible">

An operator field $A$ is _admissible_ if it is an operator field
in the sense of Definition <a href="#def-operator-field" data-ref="thm"></a>, if its subprincipal symbol is real-valued, and if
the resolvent trace <a href="#eq-resolvent-trace" data-ref="eq"></a>&nbsp;converges absolutely in some right half-plane.

</div>

<aside class="sidenote">

Reality of the subprincipal symbol is what makes the fibre operators
self-adjoint to subleading order; without it the weights <a href="#eq-holonomy-weight" data-ref="eq"></a>&nbsp;need not have unit
modulus.

</aside>

Absolute convergence is not an extra assumption in the strict sense — it follows
from ellipticity and the compactness of the fibres — but it is convenient to have
it named, since every trace manipulation below is justified by it. The following
example will be used repeatedly.

<div class="theorem example" id="ex-circle-bundle">

Let $\Sigma$ be a closed surface, $P \to \Sigma$ a principal
$S^{1}$-bundle of degree $d$, and $M = P$ with the Kaluza–Klein metric associated
with a connection $\theta$ of constant curvature. The fibres are totally geodesic
circles, $L$ is the associated line bundle, and $A_b = -\partial_\theta^{2} + V(b)$
for a smooth potential $V$. The fibrewise spectrum is
$\sigma_A(b) = (4\pi^{2}k^{2} + V(b))_{k \in \mathbb{Z}}$, and the horizontal flow
is the $S^{1}$-extension of the geodesic flow of $\Sigma$ determined by $\theta$.

</div>

<div class="theorem remark">

Example <a href="#ex-circle-bundle" data-ref="thm"></a>&nbsp;already shows that the fibrewise spectrum is a strictly
finer invariant than the spectrum of the total Laplacian: it records $V$ pointwise,
whereas the total spectrum records only certain integrals of $V$ against
eigenfunctions of the base.

</div>

## The Wave Trace on Fibered Manifolds {#sec-trace}

### Standing Hypotheses and the Resolvent Trace

We now assemble the standing hypotheses that remain in force throughout the
remainder of this section. The family is admissible in the sense of Definition <a href="#def-admissible" data-ref="thm"></a>,
so that the resolvent trace introduced below converges absolutely. From this point
on the guiding principle is that the periodic data of the horizontal geodesic flow
already determine the spectral defect, and it is precisely these traces that we now
prepare to compute in closed form.

<aside class="sidenote">

The admissibility hypothesis of <a href="#sec-admissibility" data-ref="sec"></a>&nbsp;enters only through the absolute
convergence it guarantees; no further regularity is needed here.

</aside>

<div class="theorem definition">

The _resolvent trace_ of an operator field $A$ with
$A_b \ge 1$ is

</div>

<div class="equation" id="eq-resolvent-trace">

$$
\zeta_A(z) = \int_B \mathrm{Tr}\, A_b^{-z} \, d\mathrm{vol}_B(b), \qquad \mathrm{Re}\, z > \tfrac{f}{2}.
$$

</div>

The normalisation $A_b \ge 1$ costs nothing, since adding a constant to the field
shifts the fibrewise spectrum by that constant and changes none of the objects we
study. The following proposition is the fibered form of a classical statement; the
proof of Vandermeer [<a href="#ref-vandermeer" data-ref="citenum"></a>, Thm. 2.6] applies verbatim once the fibrewise heat kernel
expansion is available with coefficients depending smoothly on the base point.

<div class="theorem proposition">

For an admissible field, $\zeta_A$ extends meromorphically to
$\mathbb{C}$ with at most simple poles, all of them contained in the arithmetic
progression $\{ (f-k)/2 : k \in \mathbb{N}_0 \}$, and

</div>

<div class="equation">

$$
\mathrm{Res}_{z = f/2}\, \zeta_A(z) = \frac{\mathrm{vol}(M)}{(4\pi)^{f/2}\, \Gamma(f/2)}.
$$

</div>

The residue at the leading pole is a volume, as it should be, and carries no
information about the field beyond its principal symbol. Everything of interest lies
in the oscillatory part of the spectrum, and to reach it we pass from the resolvent
to the wave group.

<div class="theorem definition">

For $\chi \in C_c^{\infty}(0, \infty)$ and $t > 0$ the
_fibrewise wave trace_ of an admissible field is

</div>

<div class="equation" id="eq-wave-trace">

$$
\Theta_A(\chi, t) = \mathrm{Tr}\,\chi\bigl(t \sqrt{A}\bigr) = \int_B \sum_{j \ge 1} \chi\bigl(t\sqrt{\lambda_j(b)}\,\bigr)\, d\mathrm{vol}_B(b).
$$

</div>

The inner sum is finite for each $b$, because $\chi$ has compact support in
$(0,\infty)$ and the eigenvalues tend to infinity, and it depends continuously on
$b$ by Lemma <a href="#lem-eigenvalues" data-ref="thm"></a>; the integral is therefore well defined. Note that <a href="#eq-wave-trace" data-ref="eq"></a>&nbsp;is manifestly invariant under gauge equivalence and, more importantly, that it is a
symmetric function of the fibrewise spectrum, so that eigenvalue crossings do not
affect it.

<aside class="sidenote">

Writing the trace as an integral over the base of a fibrewise trace is the
only point at which the fibration is used analytically. Everything after it is
microlocal analysis on the total space.

</aside>

### Trace Formulas on Fibered Manifolds

Let $\pi\colon M \to B$ be a Riemannian submersion with compact fibre $F$, and let
$\Delta$ denote the fibrewise Laplacian on a Hermitian line bundle. We assume that
$\Delta$ is positive and of second order along the fibres, and that the mean
curvature flow $\varphi_t$ of the fibration is anisotropic in the total space $M$.
The heat trace then localises near the periodic set.

The mechanism of the localisation is the usual one. A Hadamard parametrix for the
fibrewise wave group represents $\chi(t\sqrt{A})$ as an oscillatory integral

<div class="equation" id="eq-parametrix">

$$
\chi\bigl(t\sqrt{A}\bigr)(x,y) = \frac{1}{(2\pi t)^{n}} \int_{T^{*}_yM} e^{i\phi(t,x,y,\xi)/t}\, u(t,x,y,\xi)\, d\xi + O(t^{\infty}),
$$

</div>

with a phase $\phi$ that generates the horizontal flow and an amplitude $u$ with a
complete asymptotic expansion in $t$. Taking the trace sets $x = y$ and restricts
the phase to the diagonal, where a computation of the differential identifies the
critical set as

<div class="equation">

$$
\mathrm{Crit}\bigl( \phi|_{\mathrm{diag}} \bigr) = \bigl\{ (\tau, v) \in \mathbb{R}_{+} \times S^{\mathcal{H}}M : \varphi_\tau(v) = v \bigr\} = \bigsqcup_{\gamma \in \mathrm{Prim}} \ell_\gamma \mathbb{N} \times B_\gamma.
$$

</div>

Under (A1) this set is clean, and the stationary phase formula in its clean form
applies on each component separately. The determinant that appears in the resulting
expansion is computed from the transverse Hessian by the identity

<div class="equation" id="eq-hessian">

$$
\det \bigl( \mathrm{Hess}\, \phi \big|_{N B_\gamma} \bigr) = \pm \det \bigl( I - P_\gamma \bigr),
$$

</div>

which is where the nondegeneracy of the Poincaré map enters and where the fibered
setting first differs from the unfibered one: the normal bundle $NB_\gamma$ has rank
$2n - 2 - \dim B_\gamma$, and the sign is the Morse index of the family.

<div class="theorem">

Let $\pi\colon M \to B$ be a fibration with smooth compact fibre,
and let $A$ be an admissible operator field satisfying (A1). Then for every
$\chi \in C_c^{\infty}(0, \infty)$ the trace admits the expansion

</div>

<div class="equation" id="eq-trace-formula">

$$
\mathrm{Tr}\,\chi\bigl(t\sqrt{A}\bigr) = \sum_{\gamma \in \mathrm{Prim}} \frac{\hat{\chi}\bigl(\ell_\gamma / t\bigr)}{\lvert \det (I - P_\gamma) \rvert^{1/2}} \int_{B_\gamma} a_\gamma \, d\mu_\gamma \; + \; R_\chi(t),
$$

</div>

with a remainder $R_\chi$ estimated in Proposition <a href="#prop-remainder" data-ref="thm"></a>&nbsp;below.

<aside class="sidenote">

The determinant $\lvert \det(I - P_\gamma) \rvert$ never vanishes, precisely
because the closed geodesics are assumed nondegenerate.

</aside>

Here the symbols carry their customary meaning. The weight $a_\gamma$ is expressed
through the transport of periodic energy about the closed geodesic $\gamma$ by <a href="#eq-holonomy-weight" data-ref="eq"></a>, and $B_\gamma$ is the isotropy fibre lying over it. The density $\hat\chi$ is
the Fourier transform of $\chi$, and the measure $\mu_\gamma$ is induced from the
physical volume of the total space. Only finitely many terms of the sum are
nonzero for each fixed $t$, since $\hat\chi$ is rapidly decreasing and the lengths
$\ell_\gamma$ accumulate only at infinity.<span class="footnote">The corresponding statement for the total Laplacian, rather than for a field of fibre operators, is due to Vandermeer and Ashworth <a href="#ref-vandermeer-ashworth" data-ref="cite"></a>; their proof does not see the integral over $B_\gamma$ because in their setting the periodic set is one-dimensional.</span>

Before proving the estimate, two techniques are needed: a microlocal partition of
unity and a divisive energy argument on the total space.<span class="footnote">Cf. the techniques of Ashgrove [<a href="#ref-ashgrove-micro" data-ref="citenum"></a>, ch. 4]; the energy estimate is finer in the fibered setting, since the fibre directions contribute no oscillation.</span>
Choose a finite cover of $S^{\mathcal{H}}M$ subordinate to which there is a
partition of unity

<div class="equation" id="eq-partition">

$$
1 = \sum_{j=0}^{N} \psi_j \quad \text{on } S^{\mathcal{H}}M, \qquad \mathrm{supp}\,\psi_0 \cap \mathcal{C} = \emptyset,
$$

</div>

with each $\psi_j$, $j \ge 1$, supported in a tubular neighbourhood of a single
component $B_{\gamma_j}$. The terms with $j \ge 1$ produce the summands of <a href="#eq-trace-formula" data-ref="eq"></a>;
the term with $j = 0$ is disposed of by the following lemma.

<div class="theorem lemma" id="lem-away">

Let $K$ be a compact set in $T^{*}M$ on whose interior no periodic
orbit meets. Then for every $\Psi \in \Psi^{0}(M)$ with wavefront relation contained
in $K$ the operator $\chi(t\sqrt{A})\,\Psi$ is smoothing, and its trace vanishes to
infinite order, namely

</div>

<div class="equation">

$$
\mathrm{Tr}\bigl( \chi(t\sqrt{A})\, \Psi \bigr) = O(t^{\infty}), \qquad t \to 0^{+}.
$$

</div>

From this we conclude that only the neighbourhoods of the periodic orbits
contribute to the trace formula. Hence the decomposition of phase space into a
regular and a periodic region is fully justified, and the sum in <a href="#eq-trace-formula" data-ref="eq"></a>&nbsp;is genuinely finite.<span class="footnote">The same reduction was observed by Okonwe and Halvard <a href="#ref-okonwe" data-ref="cite"></a>, though the argument given there is considerably subtler, since they do not assume the fibres totally geodesic.</span>

<div class="theorem proposition" id="prop-remainder">

Assume (A1) and let $\chi \in C_c^{\infty}(0,\infty)$. Then for
every $N \in \mathbb{N}$ there are a constant $C_N$, depending only on the
admissible data, and an integer $K_N$ such that

</div>

<div class="equation" id="eq-remainder">

$$
\lvert R_\chi(t) \rvert \; \le \; C_N \, t^{N} \sum_{k \le K_N} \bigl\lVert \partial^{k} \hat\chi \bigr\rVert_{L^{1}(\mathbb{R})}, \qquad 0 < t \le 1.
$$

</div>

The uniformity in $\chi$ is the point of the statement: it is what permits the test
function to be concentrated near a single length in <a href="#sec-rigidity" data-ref="sec"></a>, where the individual terms
of <a href="#eq-trace-formula" data-ref="eq"></a>&nbsp;must be separated from one another. Sharper remainders are available under
hypotheses on the growth of the length spectrum, and are obtained in the fibered
Weyl law of Halvard <a href="#ref-halvard" data-ref="cite"></a>; we shall not need them.

### Proof of the Main Estimate

We now turn to the principal estimate. The decomposition of $T^{*}M$ splits the
trace into a principal part, carried by the periodic geodesics, and a remainder
that the rest of this section shows to be negligible.

<div class="proof">

<span class="proofof">Proposition <a href="#prop-remainder" data-ref="thm"></a></span>&nbsp;Insert the partition <a href="#eq-partition" data-ref="eq"></a>&nbsp;into the parametrix <a href="#eq-parametrix" data-ref="eq"></a>&nbsp;and
write $R_\chi = R^{0}_\chi + \sum_{j \ge 1} R^{j}_\chi$ accordingly. The term
$R^{0}_\chi$ is $O(t^{\infty})$ by Lemma <a href="#lem-away" data-ref="thm"></a>, with a bound that involves only
finitely many $L^{1}$ norms of derivatives of $\hat\chi$, since the wavefront
condition is uniform over the compact support of $\psi_0$.

For $j \ge 1$ we apply the clean stationary phase formula on the tubular
neighbourhood of the component $B_{\gamma_j}$, whose codimension we write as
$\nu$; the expansion produced there has the form

</div>

<div class="equation" id="eq-clean-expansion">

$$
\frac{1}{(2\pi t)^{\nu/2}} \int_{B_{\gamma_j}} e^{i \ell_{\gamma_j}/t} \, u_0 \, d\mu_{\gamma_j} \; + \; \sum_{k=1}^{N-1} t^{k} \, c_k(\chi, \gamma_j) \; + \; O(t^{N}),
$$

</div>

<div class="proof continued qed">

in which the leading coefficient $u_0$ is the holonomy weight <a href="#eq-holonomy-weight" data-ref="eq"></a>&nbsp;divided by the
square root of the determinant <a href="#eq-hessian" data-ref="eq"></a>, and the coefficients $c_k$ are integrals over
$B_{\gamma_j}$ of universal polynomial expressions in the jets of $\phi$ and $u$.
Each such coefficient is bounded by a fixed number of $L^{1}$ norms of derivatives
of $\hat\chi$, by the Fourier inversion formula applied to the amplitude.

It remains to control the number of nonzero terms. Since $\hat\chi$ is rapidly
decreasing and the counting function of the length spectrum grows at most
exponentially — a fact that follows from the compactness of $M$ and the boundedness
of the sectional curvature of the base — the sum over $j$ converges absolutely and
contributes no growth in $N$. Collecting the estimates and taking $K_N$ large enough
to dominate all the norms that appeared yields <a href="#eq-remainder" data-ref="eq"></a>.

</div>

The proof gives slightly more than was claimed. Because the expansion <a href="#eq-clean-expansion" data-ref="eq"></a>&nbsp;is
uniform in the family index, the bound <a href="#eq-remainder" data-ref="eq"></a>&nbsp;may be integrated in $t$ against any
finite measure, which is the form in which it will be used in Lemma <a href="#lem-orbital" data-ref="thm"></a>. We record
one further consequence, which is the assertion of Corollary <a href="#cor-lengths" data-ref="thm"></a>.

<div class="theorem corollary" id="cor-weights">

Assume (A1). If two admissible operator fields have the same
fibrewise spectrum, then for every $\gamma \in \mathrm{Prim}$ the integrated
holonomy weights $\int_{B_\gamma} a_\gamma \, d\mu_\gamma$ agree.

</div>

<div class="proof qed">

Fix $\gamma$ and choose $\chi$ so that $\hat\chi$ is supported in a small
interval around $\ell_\gamma$ and equals one at $\ell_\gamma$; this is possible
because the lengths of the closed horizontal geodesics form a discrete set, by (A1)
and the compactness of $\mathcal{C}$. With this choice all but one term of <a href="#eq-trace-formula" data-ref="eq"></a>&nbsp;vanish, and Proposition <a href="#prop-remainder" data-ref="thm"></a>&nbsp;shows that the remainder is $O(t^{\infty})$. Since the
left-hand side of <a href="#eq-trace-formula" data-ref="eq"></a>&nbsp;depends only on the fibrewise spectrum, the surviving term
does too, and the factor $\lvert \det(I-P_\gamma) \rvert^{-1/2}$ is determined by
the geometry alone.

</div>

## Spectral Rigidity of Operator Fields {#sec-rigidity}

### Isospectral Deformations

Throughout this section $(A^{s})_{\lvert s \rvert < \varepsilon}$ denotes a family
of admissible operator fields, depending on $s$ in the $C^{1}$ sense: the Schwartz
kernels are $C^{1}$ in $s$ with values in the smooth kernels on the fibres. We write
$\dot{A}$ for the derivative at $s = 0$, an operator field of order at most one, and
$\dot{a}_\gamma$ for the corresponding derivative of the holonomy weight.

<div class="theorem definition">

The family $(A^{s})$ is an _isospectral deformation_ of
$A = A^{0}$ if

</div>

<div class="equation" id="eq-isospectral">

$$
\sigma_{A^{s}}(b) = \sigma_{A}(b) \qquad \text{for all } b \in B \text{ and all } \lvert s \rvert < \varepsilon.
$$

</div>

Before asking what isospectral deformations look like, we must know what the trivial
ones look like. The following lemma answers that and, in doing so, dictates the form
of Definition <a href="#def-trivial" data-ref="thm"></a>.

<div class="theorem lemma" id="lem-gauge">

Let $(U_s)$ be a $C^{1}$ family of fibrewise unitary
pseudodifferential operators of order zero with $U_0 = I$, and set
$A^{s} = U_s A U_s^{-1}$. Then $(A^{s})$ is an isospectral deformation, and

</div>

<div class="equation">

$$
\sigma_{\mathrm{sub}}\bigl(\dot{A}\bigr) = X q, \qquad q = \sigma_0\bigl(\tfrac{1}{i}\dot{U}\bigr) \in C^{\infty}\bigl(S^{\mathcal{H}}M\bigr).
$$

</div>

<div class="proof qed">

Isospectrality is immediate, since conjugation by a unitary preserves the
spectrum of each fibre operator. Differentiating $A^{s} = U_s A U_s^{-1}$ at
$s = 0$ gives $\dot{A} = [\dot{U}, A]$, and the symbol calculus identifies the
subprincipal symbol of a commutator with the Poisson bracket of the principal
symbols, $\sigma_{\mathrm{sub}}([\dot U, A]) = \{ \sigma_0(\tfrac1i \dot U), \sigma_2(A) \}$.
Since $\sigma_2(A)$ is the Hamiltonian generating the horizontal flow, the bracket
is $Xq$ with $q$ as stated.

</div>

<aside class="sidenote">

The lemma is the reason for working with subprincipal rather than principal
symbols: the principal symbol of $\dot A$ vanishes identically, since all admissible
fields share a principal symbol.

</aside>

<div class="theorem definition" id="def-trivial">

A $C^{1}$ deformation $(A^{s})$ of $A$ is _trivial to first
order_ if $\sigma_{\mathrm{sub}}(\dot{A})$ is a coboundary for the horizontal flow,
that is, if there is $q \in C^{\infty}(S^{\mathcal{H}}M)$ with
$\sigma_{\mathrm{sub}}(\dot{A}) = Xq$.

</div>

The heart of the matter is the following computation, in which the trace formula is
differentiated along the deformation.

<div class="theorem lemma" id="lem-orbital">

Let $(A^{s})$ be an isospectral deformation of an admissible field
satisfying (A1). Then for every $\gamma \in \mathrm{Prim}$,

</div>

<div class="equation" id="eq-orbital">

$$
\int_{B_\gamma} \biggl( \int_{0}^{\ell_\gamma} \sigma_{\mathrm{sub}}\bigl(\dot{A}\bigr)\bigl(\varphi_s(v)\bigr) \, ds \biggr) a_\gamma(v) \, d\mu_\gamma(v) = 0.
$$

</div>

<div class="proof">

By <a href="#eq-isospectral" data-ref="eq"></a>&nbsp;the left-hand side of <a href="#eq-wave-trace" data-ref="eq"></a>&nbsp;is independent of $s$, for every
$\chi$ and every $t$; hence so is the left-hand side of <a href="#eq-trace-formula" data-ref="eq"></a>. Fix
$\gamma \in \mathrm{Prim}$ and choose $\chi$ as in the proof of Corollary <a href="#cor-weights" data-ref="thm"></a>, so
that exactly one term of the sum survives. Differentiating <a href="#eq-trace-formula" data-ref="eq"></a>&nbsp;in $s$ at $s = 0$
and using the uniformity of the remainder estimate <a href="#eq-remainder" data-ref="eq"></a>&nbsp;to justify the exchange of
$\partial_s$ with the limit $t \to 0^{+}$, we obtain

</div>

<div class="equation">

$$
\frac{\hat\chi(\ell_\gamma/t)}{\lvert \det(I - P_\gamma) \rvert^{1/2}} \int_{B_\gamma} \dot{a}_\gamma \, d\mu_\gamma = O(t^{\infty}),
$$

</div>

<div class="proof continued qed">

and therefore $\int_{B_\gamma} \dot a_\gamma \, d\mu_\gamma = 0$, since the
prefactor is bounded below along a sequence $t \to 0^{+}$. Differentiating the
definition <a href="#eq-holonomy-weight" data-ref="eq"></a>&nbsp;of the holonomy weight — in which only the exponential depends on
the field, the holonomy of $\nabla$ being independent of $s$ — gives
$\dot a_\gamma = -i\bigl(\int_{0}^{\ell_\gamma} \sigma_{\mathrm{sub}}(\dot A) \circ \varphi_s \, ds\bigr) a_\gamma$,
and <a href="#eq-orbital" data-ref="eq"></a>&nbsp;follows.

</div>

Because $\lvert a_\gamma \rvert = 1$ and the inner integral in <a href="#eq-orbital" data-ref="eq"></a>&nbsp;is real, the
identity says that a real function on $B_\gamma$ integrates to zero against a
measure of constant modulus. When $B_\gamma$ is a single closed orbit, that is the
vanishing of the orbital integral. In general it is slightly weaker, and the
following elementary observation repairs the difference.

<div class="theorem lemma" id="lem-constant">

Under (A1) the function $v \mapsto \int_{0}^{\ell_\gamma}
\sigma_{\mathrm{sub}}(\dot A)(\varphi_s(v))\, ds$ is constant on each connected
component of $B_\gamma$.

</div>

<div class="proof qed">

The function is invariant under the flow, which acts transitively on each
component of $B_\gamma$ modulo the isotropy of the fibration, by the cleanness
hypothesis in (A1). A flow-invariant continuous function on a set on which the flow
acts with dense orbits is constant.

</div>

Combining the two lemmas, the orbital integral of
$\sigma_{\mathrm{sub}}(\dot A)$ over every closed horizontal geodesic vanishes.

### A Livšic Lemma for the Horizontal Flow

The passage from vanishing orbital integrals to a coboundary is a purely dynamical
statement, and it is the content of hypothesis (A2). We record it in the form in
which it will be used, together with the regularity that the argument of <a href="#sec-proof-main" data-ref="sec"></a>&nbsp;requires.

<div class="theorem" id="thm-livsic">

Assume (A2) and let $w \in C^{\infty}(S^{\mathcal{H}}M)$ be
real-valued with $\int_{0}^{\ell_\gamma} w(\varphi_s(v))\, ds = 0$ for every closed
orbit. Then there is $q \in C^{\infty}(S^{\mathcal{H}}M)$, unique up to an additive
constant on each connected component, with $w = Xq$.

</div>

The existence of a continuous solution is exactly (A2); its smoothness requires an
additional argument, which in the hyperbolic case is the standard bootstrap along
stable and unstable manifolds and in the general case is the content of Bellweather's theorem [<a href="#ref-bellweather" data-ref="citenum"></a>, Thm. 1.4]. We shall use Theorem <a href="#thm-livsic" data-ref="thm"></a>&nbsp;as stated.<span class="footnote">Uniqueness up to constants is the only part that is elementary: if $Xq = 0$ then $q$ is flow-invariant, hence locally constant by the density of the closed orbits.</span>

<aside class="sidenote">

The smoothness of $q$ is not needed for Theorem <a href="#thm-main" data-ref="thm"></a>, but it is needed for the
integration of the first-order result attempted in Question <a href="#q-integrate" data-ref="thm"></a>.

</aside>

### Proof of the Main Theorem {#sec-proof-main}

<div class="proof qed">

<span class="proofof">Theorem <a href="#thm-main" data-ref="thm"></a></span>&nbsp;Let $(A^{s})$ be an isospectral deformation of the
admissible field $A$, and set $w = \sigma_{\mathrm{sub}}(\dot A)$, a real-valued
smooth function on $S^{\mathcal{H}}M$ by the reality clause in Definition <a href="#def-admissible" data-ref="thm"></a>. By
Lemma <a href="#lem-orbital" data-ref="thm"></a>&nbsp;and Lemma <a href="#lem-constant" data-ref="thm"></a>&nbsp;the orbital integral of $w$ over every closed horizontal
geodesic vanishes. Hypothesis (A2) and Theorem <a href="#thm-livsic" data-ref="thm"></a>&nbsp;then produce
$q \in C^{\infty}(S^{\mathcal{H}}M)$ with $w = Xq$. By Definition <a href="#def-trivial" data-ref="thm"></a>&nbsp;the deformation is trivial to first order.

</div>

The proof used (A1) only through the trace formula and (A2) only through Theorem <a href="#thm-livsic" data-ref="thm"></a>, and it is worth isolating what survives when the second is weakened. If the
closed orbits are not dense, the argument still shows that $w$ annihilates every
invariant measure supported on a closed orbit; what fails is the passage from that
family of conditions to a coboundary, and <a href="#sec-nilmanifold" data-ref="sec"></a>&nbsp;shows that the failure is genuine.

<div class="theorem corollary">

Under the hypotheses of Theorem <a href="#thm-main" data-ref="thm"></a>, an isospectral deformation
whose first variation has nonvanishing average over some invariant measure of the
horizontal flow does not exist.

</div>

<div class="proof qed">

A coboundary integrates to zero against every invariant measure, by the
invariance of the measure and the fundamental theorem of calculus applied along the
orbits. Theorem <a href="#thm-main" data-ref="thm"></a>&nbsp;makes $\sigma_{\mathrm{sub}}(\dot A)$ a coboundary.

</div>

## Examples and Sharpness {#sec-examples}

### Circle Bundles over Hyperbolic Surfaces

The class of fibrations for which both hypotheses are known is described by the
following statement, which combines the classical hyperbolicity of the geodesic flow
of a negatively curved surface with the transitivity of its compact group
extensions.

<div class="theorem" id="thm-circle">

Let $\Sigma$ be a closed surface of constant negative curvature,
let $P \to \Sigma$ be a principal $S^{1}$-bundle of degree $d \neq 0$, and give
$M = P$ the Kaluza–Klein metric of a connection of constant curvature, as in Example <a href="#ex-circle-bundle" data-ref="thm"></a>. Then $(M, \pi, g)$ satisfies (A1) and (A2), and consequently every admissible
operator field on $M$ is infinitesimally spectrally rigid.

</div>

<div class="proof qed">

The horizontal flow is the $S^{1}$-extension of the geodesic flow of
$\Sigma$ by the cocycle determined by the connection form. The geodesic flow of a
closed hyperbolic surface is Anosov, and its periodic orbits are nondegenerate; the
extension is partially hyperbolic with one-dimensional centre along the fibre, and
its periodic set is the union of the circles lying over the closed geodesics whose
holonomy is trivial. Cleanness and the nonvanishing of $\det(I - P_\gamma)$ in the
transverse directions follow from the hyperbolicity of the base flow, which gives
(A1). For (A2), the extension is transitive with dense periodic orbits when
$d \neq 0$, since the curvature of the connection is a nonzero multiple of the area
form and the associated cocycle is not cohomologous to a constant; the Livšic
property for such extensions is Wrenfield's theorem [<a href="#ref-wrenfield" data-ref="citenum"></a>, Thm. 3.1], whose frame-flow
analogue is proved in <a href="#ref-bellweather-ollenshaw" data-ref="cite"></a>. Theorem <a href="#thm-main" data-ref="thm"></a>&nbsp;applies.

</div>

<aside class="sidenote">

The hypothesis $d \neq 0$ is essential and not merely convenient: for $d = 0$
the bundle is a product and the fibre coordinate is a first integral.

</aside>

In this example the fibrewise spectrum of the field $A_b = -\partial_\theta^{2} + V(b)$
determines $V$ outright, so the rigidity statement is not vacuous but is also not
sharp; it becomes sharp as soon as the fibre operators are allowed to depend on the
fibre coordinate as well as on the base point, as in the next paragraph.

<div class="theorem remark">

Take $A_b = -\partial_\theta^{2} + W(b, \theta)$ with $W$ smooth on
$M$. The fibrewise spectrum no longer determines $W$ pointwise — it determines the
spectrum of a Hill operator on each fibre, hence $W$ only up to translation in
$\theta$ and up to the classical isospectral ambiguities of the Hill equation.
Theorem <a href="#thm-circle" data-ref="thm"></a>&nbsp;asserts that these ambiguities exhaust the possibilities in the
first-order sense, because translation in $\theta$ is precisely the gauge action of
the fibre group.

</div>

### Nilmanifolds and the Failure of (A2) {#sec-nilmanifold}

We now show that (A2) cannot be omitted. The counterexample is the smallest one
available, and its mechanism is transparent: when the base flow preserves a
foliation into invariant tori, the closed orbits see far less than the invariant
measures do.

Let $H_3$ be the three-dimensional Heisenberg group, $\Gamma \subset H_3$ the
integer lattice, and $M = \Gamma \backslash H_3$ the corresponding nilmanifold, with
its standard fibration $\pi\colon M \to \mathbb{T}^{2}$ by circles and its standard
left-invariant metric. The fibres are totally geodesic circles of length one, the
horizontal distribution is the kernel of the contact form, and the horizontal flow
is the $S^{1}$-extension of the linear geodesic flow of the flat torus by the
cocycle that measures enclosed area.

<div class="theorem proposition">

For $M = \Gamma \backslash H_3$ as above and $A$ the fibrewise
Laplacian, there exists a $C^{\infty}$ deformation $(A^{s})$ of $A$ that is
isospectral to first order and is not trivial to first order.

</div>

<div class="proof">

Take $A^{s} = A + s\, w$, where $w \in C^{\infty}(M)$ acts as a
multiplication operator on each fibre and is chosen with vanishing mean along the
fibres,

</div>

<div class="equation" id="eq-zero-mean">

$$
\int_{0}^{1} w(b, \theta) \, d\theta = 0 \qquad \text{for every } b \in \mathbb{T}^{2}.
$$

</div>

<div class="proof continued qed">

Fibrewise, the eigenfunctions of $A_b = -\partial_\theta^{2}$ are the characters
$e_k(\theta) = e^{2\pi i k \theta}$, and first-order perturbation theory gives
$\dot\lambda_k(b) = \langle w\, e_k, e_k \rangle_{L^{2}(F_b)} = \int_{0}^{1} w(b,\theta)\, d\theta = 0$
by <a href="#eq-zero-mean" data-ref="eq"></a>. Every eigenvalue is therefore stationary, so the deformation is
isospectral to first order.

It remains to choose $w$ so that $\sigma_{\mathrm{sub}}(\dot A) = w$, viewed as a
function on $S^{\mathcal{H}}M$ through the projection, is not a coboundary. The
horizontal flow preserves the direction of the base geodesic, so
$S^{\mathcal{H}}M$ is foliated by invariant three-tori $\mathbb{T}_\xi$, one for each
direction $\xi \in S^{1}$, and on each of them the flow is linear. Its closed orbits
lie on the tori with rational direction and trivial area holonomy, and along such an
orbit the fibre coordinate $\theta$ traverses a full period an integral number of
times, so that <a href="#eq-zero-mean" data-ref="eq"></a>&nbsp;forces every orbital integral of $w$ to vanish. On the other
hand, the average of $w$ over an invariant torus of irrational direction need not
vanish, and a Fourier computation on $\mathbb{T}_\xi$ produces such a $w$ explicitly;
the verification is carried out in [<a href="#ref-hazumi" data-ref="citenum"></a>, §5]. For that choice $w$ is not a coboundary,
and the deformation is not trivial to first order.

</div>

<aside class="sidenote">

The obstruction is invisible to the trace formula because invariant tori of
irrational direction carry no closed orbits, and the formula sees only closed
orbits.

</aside>

The example is instructive in that it fails hypothesis (A2) and no other. The
periodic set is clean and nondegenerate in the transverse directions, the field is
admissible, and the trace formula <a href="#eq-trace-formula" data-ref="eq"></a>&nbsp;holds verbatim; what breaks is the last step
of the proof, and it breaks because the closed orbits of the flow are confined to a
set of measure zero.

<div class="theorem remark">

The same construction on the product $\mathbb{T}^{2} \times S^{1}$
produces an even simpler counterexample, but a less interesting one: there the
horizontal flow has no closed orbits at all in the fibre direction, and the trace
formula degenerates. The Heisenberg case is the borderline, in that the flow does
have a rich family of closed orbits — just not a dense one.

</div>

### A Quantitative Consequence

We close the section with a statement that follows from Corollary <a href="#cor-weights" data-ref="thm"></a>&nbsp;alone and is
therefore free of the dynamical hypothesis (A2).

<div class="theorem corollary">

Let $A$ and $A'$ be admissible operator fields on the same
fibration, satisfying (A1) and having the same fibrewise spectrum. Then for every
closed horizontal geodesic $\gamma$,

</div>

<div class="equation" id="eq-quantitative">

$$
\int_{B_\gamma} \exp \biggl( -i \int_{0}^{\ell_\gamma} \bigl( \sigma_{\mathrm{sub}}(A) - \sigma_{\mathrm{sub}}(A') \bigr) \circ \varphi_s \, ds \biggr) \, d\nu_\gamma = \mu_\gamma(B_\gamma),
$$

</div>

<div class="proof qed">

By Corollary <a href="#cor-weights" data-ref="thm"></a>&nbsp;the integrated holonomy weights of $A$ and $A'$ coincide.
The holonomy of $\nabla$ is common to the two fields, so the quotient of the two
weights is the exponential appearing in <a href="#eq-quantitative" data-ref="eq"></a>, and $\nu_\gamma$ is the measure
$\mu_\gamma$ weighted by the common factor $\mathrm{hol}_{\nabla}(\gamma_v)$, of
modulus one. The identity states that a function of modulus one has average of
modulus one, hence is constant, which is the assertion.

</div>

In words: the fibrewise spectrum determines the orbital integrals of the
subprincipal symbol modulo $2\pi\mathbb{Z}$, uniformly over each isotropy fibre.
Under (A2) the modulo-$2\pi$ ambiguity can be removed by continuity in the length,
and one recovers the conclusion of Theorem <a href="#thm-main" data-ref="thm"></a>&nbsp;without differentiating; we have
preferred the deformation argument because it needs no analytic continuation in the
length parameter.

## Concluding Remarks {#sec-conclusion}

Three questions are left open by the argument above, and we state them in the order
of increasing difficulty.

The first concerns integration. Theorem <a href="#thm-main" data-ref="thm"></a>&nbsp;is a statement about first-order data,
and the classical route from infinitesimal to local rigidity — an implicit function
theorem in a tame Fréchet category — requires tame estimates for the solution
operator of the coboundary equation. Theorem <a href="#thm-livsic" data-ref="thm"></a>&nbsp;gives smoothness but not tameness.

<div class="theorem question" id="q-integrate">

Does infinitesimal spectral rigidity of an admissible field imply
that its isospectral set is locally a single gauge orbit?

</div>

The second concerns the hypotheses themselves. Hypothesis (A2) has been verified
only for compact group extensions of Anosov flows, and the verification passes
through the accessibility property of the extension.

<div class="theorem question">

For which Riemannian submersions with totally geodesic fibres over
a negatively curved base does the horizontal flow have dense closed orbits and
trivial Livšic cohomology?

</div>

The third is the natural one to ask after <a href="#sec-nilmanifold" data-ref="sec"></a>. The Heisenberg example fails to be
rigid at the level of subprincipal symbols, but the deformation constructed there is
isospectral only to first order, and we do not know whether it can be integrated.

<div class="theorem question">

Does the Heisenberg nilmanifold carry a genuine, rather than a
merely first-order, isospectral deformation of its fibrewise Laplacian?

</div>

A positive answer would show that the hypothesis (A2) is not an artefact of the
method, and a negative one would suggest that the correct invariant is finer than
the subprincipal symbol.

## Acknowledgements ##

The authors thank the participants of the Falkenstein seminar on fibered spectral
geometry for their patience with several earlier and less correct versions of Theorem <a href="#thm-livsic" data-ref="thm"></a>. The first author was supported by the Falkenstein Foundation for
Geometric Analysis under grant GA-2214, the second by the Caldermoor Research
Council, and the third by a fellowship of the Aoshima Institute of Technology.

## References ##

<ol class="cite-items">
<li id="ref-ashgrove-micro">L. Ashgrove, <em>Microlocal Partitions and the Trace</em>, Falkenstein Lecture Notes in Analysis, vol. 12, Falkenstein University Press, 2014.</li>
<li id="ref-ashgrove-brasko">L. Ashgrove, T. V. Brasko, <em>Wave traces on foliated manifolds</em>, J. Fibered Geom. 7 (2016) 55–98.</li>
<li id="ref-bellweather">C. Bellweather, <em>Livšic cohomology for flows with dense periodic orbits</em>, Rep. Microlocal Anal. 22 (2018) 311–349.</li>
<li id="ref-bellweather-ollenshaw">C. Bellweather, M. Ollenshaw, <em>Transitivity and the horizontal frame flow</em>, Bull. Falkenstein Math. Soc. 47 (2021) 63–101.</li>
<li id="ref-brasko">T. V. Brasko, <em>Deformation rigidity for line bundle Laplacians</em>, J. Spectral Geom. Oper. Fields 29 (2015) 1–37.</li>
<li id="ref-delacroix">M. Delacroix-Hune, <em>Spectral invariants of submersion metrics</em>, J. Spectral Geom. Oper. Fields 33 (2018) 205–262.</li>
<li id="ref-fenwick">E. Fenwick, <em>Nondegeneracy of closed horizontal geodesics</em>, Ann. Fibered Geom. 4 (2012) 189–224.</li>
<li id="ref-halvard">P. Halvard, <em>Sharp remainders in fibered Weyl laws</em>, J. Fibered Geom. 11 (2020) 401–447.</li>
<li id="ref-hazumi">S. Hazumi, <em>Heat kernels on Hermitian line bundles over nilmanifolds</em>, Aoshima Math. J. 38 (2022) 77–120.</li>
<li id="ref-marchbanks">D. Marchbanks, <em>Elliptic Families and the Index Theorem</em>, Caldermoor Monographs in Geometry, vol. 5, Caldermoor University Press, 2009.</li>
<li id="ref-okonwe">A. Okonwe, P. Halvard, <em>Localisation of the wave trace away from the periodic set</em>, J. Fibered Geom. 9 (2018) 233–271.</li>
<li id="ref-ollenshaw">M. Ollenshaw, <em>Isospectral deformations of principal circle bundles</em>, J. Spectral Geom. Oper. Fields 36 (2021) 511–566.</li>
<li id="ref-ollenshaw-hazumi">M. Ollenshaw, S. Hazumi, <em>Adiabatic limits of fibrewise spectra</em>, Ann. Fibered Geom. 13 (2023) 1–48.</li>
<li id="ref-vandermeer">R. Vandermeer, <em>On the analytic continuation of resolvent traces</em>, J. Spectral Geom. Oper. Fields 12 (2004) 441–478.</li>
<li id="ref-vandermeer-ashworth">R. Vandermeer, Y. Ashworth, <em>Trace formulas for families of elliptic operators</em>, Ann. Fibered Geom. 8 (2016) 95–147.</li>
<li id="ref-wrenfield">G. Wrenfield, <em>Anosov horizontal flows on principal bundles</em>, Rep. Microlocal Anal. 25 (2021) 401–439.</li>
</ol>

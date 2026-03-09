import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
// DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════════════
const C = {
  bg: "#09080b", panel: "#0d0c10", card: "#121018", hover: "#18151e",
  border: "#1e1a26", borderRed: "#5a1522", borderGold: "#4a3820",
  red: "#c41e3a", redMuted: "#6e1422", redDim: "#3a0c15",
  gold: "#b89060", goldMuted: "#6e5437",
  text: "#e0dbd3", dim: "#8a8480", faint: "#44404a", vfaint: "#2a2630",
  mono: "#c2b894", white: "#f0ede8", success: "#3d7a52", warn: "#a07828",
};
const F = { serif: "'Cormorant Garamond', Georgia, serif", mono: "'IBM Plex Mono', monospace" };
const sty = {
  btn: (accent="red") => ({
    padding: "10px 24px", border: `1px solid ${accent==="red"?C.borderRed:C.borderGold}`,
    background: accent==="red"?C.redDim:"transparent", color: accent==="red"?C.red:C.gold,
    fontFamily: F.mono, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
    cursor: "pointer", transition: "all .15s",
  }),
  card: { background: C.card, border: `1px solid ${C.border}`, padding: "20px", marginBottom: "16px" },
  label: { fontFamily: F.mono, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: C.dim, marginBottom: "6px" },
  val: { fontFamily: F.serif, fontSize: "15px", color: C.text, lineHeight: 1.55 },
  h1: { fontFamily: F.serif, fontWeight: 300, color: C.white, letterSpacing: "0.05em" },
};

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════
const safe = (v, n = 200, fb = "") => ((v || fb) + "").substring(0, n);
const orFB = (v, fb = "[pending]") => v || fb;
const jstr = (v) => { try { return JSON.stringify(v) } catch { return "[]" } };

const PART_LABELS = ["THE VILLAIN ENGINE","THE BATTLEGROUND","COMPETENCE & POWER","EXPECTATION & CONTINUITY"];
const PART_STEPS  = [[0,8],[9,10],[11,13],[14,15]];

// ═══════════════════════════════════════════════════════════════════
// STEPS ARRAY — 16 steps, each with getSystem(prot, ant, concept)
// ═══════════════════════════════════════════════════════════════════
const STEPS = [
  // ── PART 1 ─────────────────────────────────────────────────────
  {
    id:"mvo_audit", num:"I", title:"THE MVO AUDIT", tag:"Villain Engine", part:1,
    isSemiManual:true,
    note:"Analyzing your Minimum Viable Opposition from Book 1…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Audit the protagonist's MVO (Minimum Viable Opposition) from Book 1 against three standards.

PROTAGONIST ENGINE:
Type/Wing: ${orFB(p?.wing_reflex?.type_wing)} | Schema: ${orFB(p?.schema_coping?.schema)} — "${orFB(p?.schema_coping?.schema_message)}"
Triggers: ${jstr(p?.schema_coping?.triggers)}
WNCL: ${safe(p?.ruling_passion?.will_not_cross)}
Primary Coping: ${orFB(p?.schema_coping?.primary_coping_mode)} — ${safe(p?.schema_coping?.primary_description,120)}
MVO — Creates triggers: ${orFB(p?.mismatch?.mvo_sketch?.creates_triggers)}
MVO — Pressures line: ${orFB(p?.mismatch?.mvo_sketch?.pressures_line)}
MVO — Defeats coping: ${orFB(p?.mismatch?.mvo_sketch?.defeats_coping)}
ANTAGONIST CONCEPT: ${c||"None provided."}

THREE AUDIT STANDARDS:
1. TRIGGER CREATION: Does the MVO activate triggers the mismatch situation doesn't already cover? Does it hit triggers in a harder-to-dismiss, more personal way?
2. WNCL PRESSURE: Does it create genuine dilemmas (crossing the line looks rational) — not just temptation?
3. COPING DEFEAT: Is defeat relational (from who the antagonist is) not just situational (from circumstance)?

Return ONLY valid JSON, no markdown:
{"trigger_audit":"2-3 sentences","wncl_audit":"2-3 sentences","coping_audit":"2-3 sentences","revision_needed":true,"revised_mvo":{"creates_triggers":"revised or confirmed statement","pressures_line":"revised or confirmed","defeats_coping":"revised or confirmed"},"audit_summary":"1 sentence: verdict and what to watch for in the build"}`
  },
  {
    id:"enneagram", num:"II", title:"ENNEAGRAM TYPE", tag:"Villain Engine", part:1,
    note:"Selecting the type for maximum collision…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Select the antagonist's Enneagram type for maximum productive collision with the protagonist.

PROTAGONIST: Type/Wing: ${orFB(p?.wing_reflex?.type_wing)} | Fear: ${orFB(p?.enneagram?.core_fear)} | Desire: ${orFB(p?.enneagram?.core_desire)}
Schema: ${orFB(p?.schema_coping?.schema)} | Coping: ${orFB(p?.schema_coping?.primary_coping_mode)}
CONFIRMED MVO FUNCTIONS:
  Creates triggers: ${orFB(a?.mvo_audit?.revised_mvo?.creates_triggers)}
  Pressures line: ${orFB(a?.mvo_audit?.revised_mvo?.pressures_line)}
  Defeats coping: ${orFB(a?.mvo_audit?.revised_mvo?.defeats_coping)}
CONCEPT: ${c||"None."}

COLLISION TYPES: Complementary (same territory, different need) | Mirror (same need, opposite method) | Escalation (natural dominance dynamic) | Inversion (antagonist = protagonist's disintegration point)
TYPE REFERENCE: 1-Reformer(fears wrong, corrects) 2-Helper(fears unloved, gives) 3-Achiever(fears worthless, performs) 4-Individualist(fears ordinary, withdraws) 5-Investigator(fears helpless, observes) 6-Loyalist(fears unsupported, tests) 7-Enthusiast(fears trapped, escapes) 8-Challenger(fears controlled, confronts) 9-Peacemaker(fears disconnection, accommodates)

Choose the type whose psychology NATURALLY fulfills all three MVO functions as a byproduct of who they are—not engineered to. Must produce a collision that asks a thematic question.

Return ONLY valid JSON, no markdown:
{"type_number":0,"type_name":"","core_fear":"","core_desire":"","pressure_reflex":"","collision_type":"Complementary|Mirror|Escalation|Inversion","collision_question":"1 sentence thematic question","reasoning":"2-3 sentences: why this type naturally produces the MVO functions","output":"[Antagonist] is a Type [N] ([Name]) — they fear [fear], and their existence [effect] not by design but because [internal logic]."}`
  },
  {
    id:"wing_reflex", num:"III", title:"WING & COMPOUND REFLEX", tag:"Villain Engine", part:1,
    note:"Determining wing and automatic behavior…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Determine antagonist wing and Compound Reflex.

PROTAGONIST: Type/Wing: ${orFB(p?.wing_reflex?.type_wing)} | Reflex: ${safe(p?.wing_reflex?.compound_reflex,100)} | Schema: ${orFB(p?.schema_coping?.schema)}
ANTAGONIST: Type: ${orFB(a?.enneagram?.type_number)} (${orFB(a?.enneagram?.type_name)}) | Fear: ${orFB(a?.enneagram?.core_fear)} | Collision: ${orFB(a?.enneagram?.collision_type)}

Choose the wing that makes the collision HARDER TO RESOLVE — not the most threatening but the one whose texture makes the antagonist hardest for the protagonist to dismiss.
The Compound Reflex must be LEGIBLE TO THE PROTAGONIST AS A THREAT — when they encounter this reflex they recognize it's the behavior they can't handle.

Return ONLY valid JSON, no markdown:
{"wing":0,"type_wing":"","wing_description":"2 sentences: how wing modifies expression in collision","compound_reflex":"3-4 sentences: the automatic before-thought behavior","protagonist_legibility":"2 sentences: why protagonist experiences this reflex as threatening","output":"[Antagonist] is a [TypewWing]. When pressure hits: [reflex]. To the protagonist this is threatening because [reason]."}`
  },
  {
    id:"core_belief", num:"IV", title:"CORE BELIEF", tag:"Villain Engine", part:1,
    note:"Crystallizing the belief from the fear…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Formulate the antagonist's Core Belief.

PROTAGONIST BELIEF: ${orFB(p?.core_belief?.core_belief)}
ANTAGONIST: Type: ${orFB(a?.enneagram?.type_name)} | Fear: ${orFB(a?.enneagram?.core_fear)} | Wing: ${orFB(a?.wing_reflex?.type_wing)}
Collision: ${orFB(a?.enneagram?.collision_type)} | Question: ${orFB(a?.enneagram?.collision_question)}

The Core Belief must: (1) be more specific than the Enneagram fear — the conviction the fear has crystallized into, (2) be specific enough to generate behavioral predictions, (3) be functionally defensible but incomplete — the collision will expose it, (4) implicitly argue with the protagonist's belief.

Return ONLY valid JSON, no markdown:
{"core_belief":"1-3 sentences","how_it_drives":"1 sentence: how it shapes decisions","how_it_will_fail":"1 sentence: how the collision exposes it","output":"Core Belief: [statement]"}`
  },
  {
    id:"ruling_passion", num:"V", title:"RULING PASSION", tag:"Villain Engine", part:1,
    note:"Building the three-component passion system…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Build the antagonist's Ruling Passion.

PROTAGONIST: Object: ${safe(p?.ruling_passion?.specific_object,120)} | Theory: ${safe(p?.ruling_passion?.theory_of_achievement,100)} | Line: ${safe(p?.ruling_passion?.will_not_cross,100)}
ANTAGONIST: Type: ${orFB(a?.enneagram?.type_name)} | Desire: ${orFB(a?.enneagram?.core_desire)} | Belief: ${safe(a?.core_belief?.core_belief,100)}

THREE COMPONENTS:
SPECIFIC OBJECT: Concrete desire. Blockable, measurable. Must collide with protagonist's object — not by design, but because both require the same territory.
THEORY OF ACHIEVEMENT: How they believe they'll get it. Shaped by Core Belief. Flawed in ways the collision exposes.
WILL NOT CROSS: Identity-level constraint tied to the wound (will confirm in Step VI). Plot will make crossing it the rational solution.

Return ONLY valid JSON, no markdown:
{"specific_object":"2-3 sentences","theory_of_achievement":"3-4 sentences","will_not_cross":"2-3 sentences: the line and what crossing it costs psychologically","collision_note":"2 sentences: how the antagonist's pursuit contests or blocks the protagonist's","pressure_triangle":"1 sentence: how all three form a self-sustaining conflict system"}`
  },
  {
    id:"wound", num:"VI", title:"THE WOUND EVENT", tag:"Villain Engine", part:1,
    note:"Constructing the formative wound…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Construct the antagonist's Wound Event.

PROTAGONIST: Wound: ${safe(p?.wound?.wound_event,200)} | Lesson: ${orFB(p?.wound?.lesson_learned)}
ANTAGONIST: Type: ${orFB(a?.enneagram?.type_name)} | Fear: ${orFB(a?.enneagram?.core_fear)} | Belief: ${safe(a?.core_belief?.core_belief,100)} | Object: ${safe(a?.ruling_passion?.specific_object,80)} | WNCL: ${safe(a?.ruling_passion?.will_not_cross,80)}

The wound converts core fear from POSSIBILITY to CERTAINTY. Must be: proportionate, connected to the Ruling Passion, specific enough to generate sensory triggers, and produce a lesson a reasonable person could hold.
Flag world elements the wound implies that may not exist in the protagonist's world.

Return ONLY valid JSON, no markdown:
{"wound_event":"1-2 detailed paragraphs","wound_type":"acute|chronic|vicarious","lesson_learned":"explicit lesson in character's own terms","sensory_triggers":["","","","",""],"connection_to_passion":"1-2 sentences: how the passion attempts to undo or compensate","mvw_flags":["world element implied","world element implied"]}`
  },
  {
    id:"schema_coping", num:"VII", title:"SCHEMA & COPING MODES", tag:"Villain Engine", part:1,
    note:"Mapping the scar tissue and defenses…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Identify the antagonist's Schema and Coping Mode profile.

PROTAGONIST: Schema: ${orFB(p?.schema_coping?.schema)} | Coping: ${orFB(p?.schema_coping?.primary_coping_mode)} — ${safe(p?.schema_coping?.primary_description,100)}
ANTAGONIST: Type: ${orFB(a?.enneagram?.type_number)} (${orFB(a?.enneagram?.type_name)}) | Fear: ${orFB(a?.enneagram?.core_fear)} | Belief: ${safe(a?.core_belief?.core_belief,100)} | Wound: ${safe(a?.wound?.wound_event,200)} | Lesson: ${orFB(a?.wound?.lesson_learned)}

SCHEMAS: Abandonment(2,6,9) | Mistrust(6,8) | Defectiveness(3,4) | Failure(1,3,5) | Dependence(2,6,9) | Vulnerability(5,6) | Approval-Seeking(2,3,6) | Emotional Inhibition(1,5,8) | Unrelenting Standards(1,3)
COPING MODES: Surrender (accepts schema, acts accordingly) | Avoidance (structures life to prevent triggers) | Overcompensation (fights schema by doing extreme opposite)

Add VULNERABILITY POINT: the specific crack — when it appears, what it looks like, why the protagonist could eventually reach it.

Return ONLY valid JSON, no markdown:
{"schema":"","schema_message":"first person internal message","triggers":["","","","",""],"primary_coping_mode":"","primary_description":"3-4 sentences","failure_cascade":"2-3 sentences: what happens when primary mode collapses","hidden_mode":"2-3 sentences: extremis mode containing seed of transformation","vulnerability_point":"2-3 sentences: when the crack appears and what's visible through it"}`
  },
  {
    id:"chassis", num:"VIII", title:"THE ANTAGONIST CHASSIS", tag:"Villain Engine", part:1,
    note:"Building the physical and social profile…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Generate the Antagonist Chassis.

PROTAGONIST CHASSIS:
Physical: STR${p?.chassis?.physical?.str} DEX${p?.chassis?.physical?.dex} CON${p?.chassis?.physical?.con} INT${p?.chassis?.physical?.int} WIS${p?.chassis?.physical?.wis} CHA${p?.chassis?.physical?.cha} — ${safe(p?.chassis?.physical?.friction_statement,120)}
Social: RANK${p?.chassis?.social?.rank} CONN${p?.chassis?.social?.connections} RES${p?.chassis?.social?.resources} TRAIN${p?.chassis?.social?.training} REP${p?.chassis?.social?.reputation} OBL${p?.chassis?.social?.obligation} — ${safe(p?.chassis?.social?.friction_statement,120)}

ANTAGONIST: Type/Wing: ${orFB(a?.wing_reflex?.type_wing)} | Schema: ${orFB(a?.schema_coping?.schema)} | Wound: ${safe(a?.wound?.wound_event,150)} | Object: ${safe(a?.ruling_passion?.specific_object,80)}

PHYSICAL (1-20): STR strength, DEX agility, CON endurance, INT reasoning, WIS perception, CHA presence
SOCIAL (1-20): RANK formal authority, CONNECTIONS network, RESOURCES wealth, TRAINING skill, REPUTATION how others see them, OBLIGATION debt/duty

Stats must create FRICTION. Generate CHASSIS COLLISION: where antagonist peaks hit protagonist valleys and vice versa.
Flag MVW implications (extensions/modifications/contradictions).

Return ONLY valid JSON, no markdown:
{"physical":{"str":0,"dex":0,"con":0,"int":0,"wis":0,"cha":0,"friction_statement":"3-4 sentences"},"social":{"rank":0,"connections":0,"resources":0,"training":0,"reputation":0,"obligation":0,"friction_statement":"3-4 sentences"},"chassis_collision":"3-4 sentences: where each set of peaks hits the other's valleys","mvw_notes":{"extensions":[""],"modifications":[""],"contradictions":[""]}}`
  },
  {
    id:"collision_map", num:"IX", title:"THE COLLISION MAP", tag:"Villain Engine", part:1,
    note:"Mapping all six collision zones…",
    maxTokens: 4000,
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Generate the complete six-zone Collision Map.

PROTAGONIST: ${orFB(p?.wing_reflex?.type_wing)} | Reflex: ${safe(p?.wing_reflex?.compound_reflex,80)} | Schema: ${orFB(p?.schema_coping?.schema)} "${safe(p?.schema_coping?.schema_message,80)}" | Coping: ${orFB(p?.schema_coping?.primary_coping_mode)} | WNCL: ${safe(p?.ruling_passion?.will_not_cross,80)} | Physical peaks: STR${p?.chassis?.physical?.str} CON${p?.chassis?.physical?.con} CHA${p?.chassis?.physical?.cha} INT${p?.chassis?.physical?.int} | Social: RANK${p?.chassis?.social?.rank} OBL${p?.chassis?.social?.obligation} REP${p?.chassis?.social?.reputation}
PROTAGONIST Belief: ${safe(p?.core_belief?.core_belief,120)} | Failure cascade: ${safe(p?.schema_coping?.failure_cascade,80)}

ANTAGONIST: ${orFB(a?.wing_reflex?.type_wing)} | Reflex: ${safe(a?.wing_reflex?.compound_reflex,80)} | Schema: ${orFB(a?.schema_coping?.schema)} "${safe(a?.schema_coping?.schema_message,80)}" | Coping: ${orFB(a?.schema_coping?.primary_coping_mode)} | WNCL: ${safe(a?.ruling_passion?.will_not_cross,80)} | Physical peaks: STR${a?.chassis?.physical?.str} CON${a?.chassis?.physical?.con} CHA${a?.chassis?.physical?.cha} INT${a?.chassis?.physical?.int} | Social: RANK${a?.chassis?.social?.rank} OBL${a?.chassis?.social?.obligation} REP${a?.chassis?.social?.reputation}
ANTAGONIST Belief: ${safe(a?.core_belief?.core_belief,120)} | Failure cascade: ${safe(a?.schema_coping?.failure_cascade,80)}

SIX ZONES:
1. SCHEMA TRIGGER EXCHANGE — how each character's coping triggers the other's schema (as byproduct, not intent)
2. BELIEF COLLISION — where beliefs directly argue; what situations force simultaneous testing
3. RULING PASSION INTERFERENCE — where pursuit of one blocks the other; competition for same territory
4. WNCL ASYMMETRY — what each can do the other can't; what this costs the one who can
5. CHASSIS EXPLOITATION — where each profile's peaks hit the other's valleys
6. COPING MODE WARFARE — both modes active simultaneously; both modes failing simultaneously

Return ONLY valid JSON, no markdown:
{"collision_statement":"1 dense paragraph: full shape of the collision","zones":[{"zone":"Schema Trigger Exchange","interaction":"specific what happens","protagonist_experience":"from inside prot engine","antagonist_experience":"from inside ant engine","scene_implications":"what kind of scene"},{"zone":"Belief Collision","interaction":"","protagonist_experience":"","antagonist_experience":"","scene_implications":""},{"zone":"Ruling Passion Interference","interaction":"","protagonist_experience":"","antagonist_experience":"","scene_implications":""},{"zone":"WNCL Asymmetry","interaction":"","protagonist_experience":"","antagonist_experience":"","scene_implications":""},{"zone":"Chassis Exploitation","interaction":"","protagonist_experience":"","antagonist_experience":"","scene_implications":""},{"zone":"Coping Mode Warfare","interaction":"","protagonist_experience":"","antagonist_experience":"","scene_implications":""}],"collision_sites":["site 1","site 2","site 3"]}`
  },

  // ── PART 2 ─────────────────────────────────────────────────────
  {
    id:"values", num:"X", title:"VALUES UNDER PRESSURE", tag:"Battleground", part:2,
    note:"Mapping the moral battleground…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Map the Values Battleground between protagonist and antagonist.

PROTAGONIST: Belief: ${safe(p?.core_belief?.core_belief,120)} | Object: ${safe(p?.ruling_passion?.specific_object,100)} | Schema: ${orFB(p?.schema_coping?.schema)}
ANTAGONIST: Belief: ${safe(a?.core_belief?.core_belief,120)} | Object: ${safe(a?.ruling_passion?.specific_object,100)} | Schema: ${orFB(a?.schema_coping?.schema)}
Collision: ${orFB(a?.enneagram?.collision_type)} | Question: ${orFB(a?.enneagram?.collision_question)}
Collision Map Summary: ${safe(a?.collision_map?.collision_statement,150)}

Identify: (1) shared underlying value — what both characters protect, (2) divergence point — where agreement breaks, traceable to each wound, (3) the thematic question the story must answer.
Map four escalation beats: Early Plot (prot values work) → Midpoint (ant position gains evidence) → Pre-Climax (ant appears correct) → Climax (prot chooses despite evidence).

Return ONLY valid JSON, no markdown:
{"shared_values":"1-2 sentences","divergence_point":"2-3 sentences: how shared value splits, traced to each wound","values_battleground_statement":"[Protagonist] and [Antagonist] both value [X]. [Protagonist] believes this means [A]. [Antagonist] believes this means [B]. The story asks: [question].","escalation_beats":[{"beat":"Early Plot","description":""},{"beat":"Midpoint","description":""},{"beat":"Pre-Climax","description":""},{"beat":"Climax","description":""}]}`
  },
  {
    id:"wncl", num:"XI", title:"ANTAGONIST'S WILL NOT CROSS LINE", tag:"Battleground", part:2,
    note:"Formalizing the identity-level constraint…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Formalize the antagonist's Will Not Cross Line.

PROTAGONIST WNCL: ${safe(p?.ruling_passion?.will_not_cross,120)}
ANTAGONIST WNCL sketch: ${safe(a?.ruling_passion?.will_not_cross,120)}
Antagonist Wound: ${safe(a?.wound?.wound_event,200)} | Lesson: ${orFB(a?.wound?.lesson_learned)}
WNCL Asymmetry from Collision Map: ${orFB(a?.collision_map?.zones?.find(z=>z.zone==="WNCL Asymmetry")?.interaction)}

The line serves THREE FUNCTIONS: (1) behavioral constraint — makes choices meaningful, not arbitrary, (2) wound revelation — the line is a scar dressed as a principle, (3) vulnerability point — the moment when the antagonist approaches their line is when the protagonist sees the human being underneath.

Map the collision: antagonist's line vs. protagonist's line. Most interesting when each character's survival may require the other to break.

Return ONLY valid JSON, no markdown:
{"will_not_cross":"2-3 sentences: formal statement","wound_connection":"1-2 sentences: how wound created this constraint","constraint_function":"2 sentences: how it shapes behavior and makes choices meaningful","revelation_function":"2 sentences: what it reveals about who they are","vulnerability_point":"2-3 sentences: when approached, what protagonist sees","collision_analysis":"3-4 sentences: how the two lines interact — asymmetry, what crossing each gives the other, whether they face lines simultaneously"}`
  },

  // ── PART 3 ─────────────────────────────────────────────────────
  {
    id:"competence", num:"XII", title:"ABILITIES & POWER DIFFERENTIAL", tag:"Competence & Power", part:3,
    note:"Mapping power as trade-off…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Generate the Competence Framework and Power Differential Map.

PROTAGONIST: Archetype: ${orFB(p?.archetype?.archetype)} | Type/Wing: ${orFB(p?.wing_reflex?.type_wing)}
Physical: STR${p?.chassis?.physical?.str} DEX${p?.chassis?.physical?.dex} CON${p?.chassis?.physical?.con} INT${p?.chassis?.physical?.int} WIS${p?.chassis?.physical?.wis} CHA${p?.chassis?.physical?.cha}
Social: RANK${p?.chassis?.social?.rank} CONN${p?.chassis?.social?.connections} RES${p?.chassis?.social?.resources} TRAIN${p?.chassis?.social?.training} REP${p?.chassis?.social?.reputation} OBL${p?.chassis?.social?.obligation}
ANTAGONIST: Type/Wing: ${orFB(a?.wing_reflex?.type_wing)} | Wound lesson: ${orFB(a?.wound?.lesson_learned)}
Physical: STR${a?.chassis?.physical?.str} DEX${a?.chassis?.physical?.dex} CON${a?.chassis?.physical?.con} INT${a?.chassis?.physical?.int} WIS${a?.chassis?.physical?.wis} CHA${a?.chassis?.physical?.cha}
Social: RANK${a?.chassis?.social?.rank} CONN${a?.chassis?.social?.connections} RES${a?.chassis?.social?.resources} TRAIN${a?.chassis?.social?.training} REP${a?.chassis?.social?.reputation} OBL${a?.chassis?.social?.obligation}
Chassis Collision: ${safe(a?.chassis?.chassis_collision,150)}

Frame every ability as a TRADE. The antagonist's power is traceable to wound-driven choices — they became more powerful by paying prices the protagonist won't pay.
Protagonist must have at least one dimension where they outmatch the antagonist.

Return ONLY valid JSON, no markdown:
{"key_abilities":[{"ability":"","source":"how developed","limits":"when it fails or costs"}],"costs_paid":[{"cost":"what was traded","purchased":"what power bought","wound_connection":"how wound made this trade feel rational"}],"power_differential_map":[{"dimension":"","protagonist":"","antagonist":"","gap":"who dominates and why"}],"magic_system_implications":"N/A or character-facing magic implications"}`
  },
  {
    id:"escalation", num:"XIII", title:"ESCALATION ARCHITECTURE", tag:"Competence & Power", part:3,
    note:"Building the four-stage threat ladder…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Build the four-stage Escalation Architecture.

ANTAGONIST: Type/Wing: ${orFB(a?.wing_reflex?.type_wing)} | Reflex: ${safe(a?.wing_reflex?.compound_reflex,100)}
Object: ${safe(a?.ruling_passion?.specific_object,80)} | Coping: ${orFB(a?.schema_coping?.primary_coping_mode)}
PROTAGONIST: Schema triggers: ${jstr(p?.schema_coping?.triggers)} | Coping: ${orFB(p?.schema_coping?.primary_coping_mode)}
Collision: ${safe(a?.collision_map?.collision_statement,150)}
Power differential: ${safe(a?.chassis?.chassis_collision,100)}

FOUR STAGES (each must be more targeted and personal than the last):
Stage 1 ENVIRONMENTAL: Antagonist's existence changes conditions before direct contact
Stage 2 DIRECT CONTACT: Compound reflex fires in protagonist's presence; collision is interpersonal
Stage 3 PERSONAL TARGETING: Pursuit of ruling passion now requires defeating protagonist's resistance  
Stage 4 EXISTENTIAL: Collision threatens protagonist's identity — "What if their way is right?"

Return ONLY valid JSON, no markdown:
{"stage_1":{"label":"Environmental Threat","description":"2-3 sentences","scenes":["specific scene or beat"]},"stage_2":{"label":"Direct Contact","description":"","scenes":["",""]},"stage_3":{"label":"Personal Targeting","description":"","scenes":["",""]},"stage_4":{"label":"Existential Threat","description":"","scenes":["",""]}}`
  },
  {
    id:"mvw_opposition", num:"XIV", title:"MVW: OPPOSITION LAYER", tag:"Competence & Power", part:3,
    note:"Auditing world requirements…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Audit all world requirements the antagonist build has generated.

PROTAGONIST MVW context: ${safe(p?.seed?.text,200)}
ANTAGONIST wound MVW flags: ${jstr(a?.wound?.mvw_flags)}
ANTAGONIST chassis MVW notes: Extensions: ${jstr(a?.chassis?.mvw_notes?.extensions)} | Modifications: ${jstr(a?.chassis?.mvw_notes?.modifications)} | Contradictions: ${jstr(a?.chassis?.mvw_notes?.contradictions)}
Collision sites: ${jstr(a?.collision_map?.collision_sites)}
Values evidence: ${safe(a?.values?.divergence_point,100)}

FOUR CATEGORIES to audit:
1. ANTAGONIST'S DOMAIN: institutions/hierarchies required for their position to be possible
2. WOUND'S HISTORICAL MOMENT: what the world had to have been for the wound to occur
3. VALUES BATTLEGROUND EVIDENCE LAYER: visible world evidence that validates the antagonist's worldview
4. SCHEMA TRIGGER ENVIRONMENT: conditions required for antagonist's triggers to fire

Priority: Must Build (collision depends on it) | Can Imply (reference is sufficient) | Can Defer (consistent but not immediately needed)

Return ONLY valid JSON, no markdown:
{"antagonist_domain":["requirement + priority"],"wound_historical_moment":["requirement + priority"],"evidence_layer":["requirement + priority"],"trigger_environment":["requirement + priority"],"must_build":["consolidated Must Build items"],"can_imply":["consolidated Can Imply items"],"can_defer":["consolidated Can Defer items"],"extended_mvw_notes":"2-3 sentences: how the opposition layer extends the protagonist's MVW"}`
  },

  // ── PART 4 ─────────────────────────────────────────────────────
  {
    id:"trope", num:"XV", title:"TROPE MANAGEMENT", tag:"Expectation & Continuity", part:4,
    note:"Auditing reader expectations…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Generate the Trope Audit.

ANTAGONIST: Type/Wing: ${orFB(a?.wing_reflex?.type_wing)} | Collision: ${orFB(a?.enneagram?.collision_type)} | Object: ${safe(a?.ruling_passion?.specific_object,80)} | WNCL: ${safe(a?.wncl?.will_not_cross,80)}
Collision summary: ${safe(a?.collision_map?.collision_statement,150)}
Concept: ${c||"None."}

TROPE FAMILIES: The Dark Lord | The Rival | The Betrayer | The Zealot | The Mirror | The Bureaucrat | The Force of Nature | The Survivor

For each expectation the trope family creates, specify management:
FULFILL = give readers what they expect (satisfaction of recognition)
SUBVERT = give them something better (surprise of discovery)
COMPLICATE = give them what they expect + something that makes them uncomfortable about wanting it

Strategy: Fulfill structural expectations (readers need villain to function), Subvert psychological ones (interiority should surprise). Too many fulfillments = predictable. Too many subversions = cheated.

Return ONLY valid JSON, no markdown:
{"trope_family":"primary + any secondary family","trope_audit":[{"expectation":"what readers will expect","management":"Fulfill|Subvert|Complicate","approach":"2 sentences: specifically how"}],"subversion_plan":"2-3 sentences: overall subversion strategy"}`
  },
  {
    id:"series", num:"XVI", title:"SERIES MANAGEMENT", tag:"Expectation & Continuity", part:4,
    isOptional: true,
    note:"Building the series bible skeleton…",
    getSystem:(p,a,c)=>`You are an Opposition Engine expert. Generate a Series Management skeleton for the protagonist-antagonist collision.

PROTAGONIST: Type/Wing: ${orFB(p?.wing_reflex?.type_wing)} | Schema: ${orFB(p?.schema_coping?.schema)}
ANTAGONIST: Type/Wing: ${orFB(a?.wing_reflex?.type_wing)} | Schema: ${orFB(a?.schema_coping?.schema)}
Escalation trajectory: Stages ${safe(a?.escalation?.stage_1?.label)} → ${safe(a?.escalation?.stage_4?.label)}
Trope family: ${orFB(a?.trope?.trope_family)}
Values question: ${safe(a?.values?.values_battleground_statement,120)}

Generate: (1) state tracker skeleton — fields and plot points to track both characters, (2) continuity rules — what's established and cannot be contradicted, (3) compounding threat plan — how antagonist's threat deepens across books (not just more powerful but more targeted, reaching deeper into protagonist's wound).

Return ONLY valid JSON, no markdown:
{"character_bible_template":"formatted template text for tracking both characters","state_tracker_skeleton":{"fields":["field to track"],"plot_points":["Inciting Incident","Midpoint","Dark Night","Climax","Resolution"]},"continuity_rules":["rule about antagonist that cannot change"],"compounding_threat_plan":"3-4 sentences: trajectory from environmental pressure to existential collision across series"}`
  },
];

// ═══════════════════════════════════════════════════════════════════
// API CALL
// ═══════════════════════════════════════════════════════════════════
function repairJSON(raw) {
  // 1. Strip markdown fences
  let s = raw.replace(/```json\n?|```/g, "").trim();
  // 2. Try parsing as-is
  try { return JSON.parse(s); } catch (_) {}
  // 3. Truncation repair: walk backwards to last complete top-level value
  // Close any open strings, arrays, objects
  let depth = 0; let inStr = false; let escape = false; let lastSafe = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\" && inStr) { escape = true; continue; }
    if (ch === '"' && !escape) { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === "{" || ch === "[") { depth++; continue; }
    if (ch === "}" || ch === "]") { depth--; if (depth === 0) lastSafe = i; continue; }
  }
  // Truncated: close open structures
  if (depth > 0) {
    // Drop incomplete last key/value by trimming to last comma at depth 1
    let trimmed = s;
    // Find last comma not inside a string at depth 1
    let d2 = 0; let inS2 = false; let esc2 = false; let lastComma = -1;
    for (let i = 0; i < trimmed.length; i++) {
      const ch = trimmed[i];
      if (esc2) { esc2 = false; continue; }
      if (ch === "\\" && inS2) { esc2 = true; continue; }
      if (ch === '"') { inS2 = !inS2; continue; }
      if (inS2) continue;
      if (ch === "{" || ch === "[") d2++;
      else if (ch === "}" || ch === "]") d2--;
      else if (ch === "," && d2 === 1) lastComma = i;
    }
    if (lastComma > 0) trimmed = trimmed.substring(0, lastComma);
    // Re-count depth and close
    let closeDepth = 0; let inS3 = false; let esc3 = false;
    const stack = [];
    for (let i = 0; i < trimmed.length; i++) {
      const ch = trimmed[i];
      if (esc3) { esc3 = false; continue; }
      if (ch === "\\" && inS3) { esc3 = true; continue; }
      if (ch === '"') { inS3 = !inS3; continue; }
      if (inS3) continue;
      if (ch === "{") stack.push("}");
      else if (ch === "[") stack.push("]");
      else if (ch === "}" || ch === "]") stack.pop();
    }
    const closing = stack.reverse().join("");
    try { return JSON.parse(trimmed + closing); } catch (_) {}
    // Fallback: just close at lastSafe
    try { return JSON.parse(s.substring(0, lastSafe + 1)); } catch (_) {}
  }
  throw new Error("Could not parse or repair JSON response.");
}

async function callClaude(system, maxTokens = 1500) {
  const res = await fetch(`${import.meta.env.BASE_URL}api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, maxTokens }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return repairJSON(data.text || "");
}

// ═══════════════════════════════════════════════════════════════════
// DOWNLOAD UTILITIES
// ═══════════════════════════════════════════════════════════════════
function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
function downloadJSONFile(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function outputToMarkdown(stepId, stepLabel, output) {
  if (!output) return "";
  const lines = [`# ${stepLabel}\n`];
  const field = (label, val) => {
    if (!val) return;
    if (Array.isArray(val)) {
      lines.push(`**${label}:**`);
      val.forEach(v => lines.push(`- ${v}`));
      lines.push("");
    } else {
      lines.push(`**${label}:** ${val}\n`);
    }
  };

  switch (stepId) {
    case "mvo_audit":
      field("Audit Verdict", output.audit_summary);
      field("Trigger Creation Audit", output.trigger_audit);
      field("WNCL Pressure Audit", output.wncl_audit);
      field("Coping Mode Defeat Audit", output.coping_audit);
      if (output.revision_needed && output.revised_mvo) {
        lines.push("**Revised MVO Functions:**\n");
        field("Creates Triggers By", output.revised_mvo?.creates_triggers);
        field("Pressures WNCL By", output.revised_mvo?.pressures_line);
        field("Defeats Coping By", output.revised_mvo?.defeats_coping);
      } else {
        lines.push("*MVO Confirmed — No Revision Needed*\n");
      }
      break;
    case "enneagram":
      field("Type", `${output.type_number} — ${output.type_name}`);
      field("Core Fear", output.core_fear);
      field("Core Desire", output.core_desire);
      field("Collision Type", output.collision_type);
      field("Collision Question", output.collision_question);
      break;
    case "wing_reflex":
      field("Wing", output.wing);
      field("Type / Wing", output.type_wing);
      field("Compound Reflex", output.compound_reflex);
      field("Output", output.output);
      break;
    case "core_belief":
      field("Core Belief", output.core_belief);
      field("How It Drives", output.how_it_drives);
      field("How It Will Fail", output.how_it_will_fail);
      break;
    case "ruling_passion":
      field("Specific Object", output.specific_object);
      field("Theory of Achievement", output.theory_of_achievement);
      field("Will Not Cross Line", output.will_not_cross);
      break;
    case "wound":
      field("Wound Event", output.wound_event);
      field("Wound Type", output.wound_type);
      field("Lesson Learned", output.lesson_learned);
      field("Sensory Triggers", output.sensory_triggers);
      break;
    case "schema_coping":
      field("Schema", output.schema);
      field("Schema Message", output.schema_message);
      field("Triggers", output.triggers);
      field("Primary Coping Mode", output.primary_coping_mode);
      field("Coping Description", output.primary_description);
      field("Failure Cascade", output.failure_cascade);
      field("Vulnerability Point", output.vulnerability_point);
      break;
    case "chassis": {
      const ph = output.physical || {}; const so = output.social || {};
      lines.push("## Physical Profile\n");
      [["STR",ph.str],["DEX",ph.dex],["CON",ph.con],["INT",ph.int],["WIS",ph.wis],["CHA",ph.cha]]
        .forEach(([l,v]) => v && lines.push(`**${l}:** ${v}\n`));
      field("Physical Friction", ph.friction_statement);
      lines.push("## Social Profile\n");
      [["Rank",so.rank],["Connections",so.connections],["Resources",so.resources],["Training",so.training],["Reputation",so.reputation],["Obligation",so.obligation]]
        .forEach(([l,v]) => v && lines.push(`**${l}:** ${v}\n`));
      field("Social Friction", so.friction_statement);
      field("Chassis Collision", output.chassis_collision);
      break;
    }
    case "collision_map":
      field("Collision Statement", output.collision_statement);
      (output.zones || []).forEach((z, i) => {
        lines.push(`## Zone ${i + 1} — ${z.zone}\n`);
        field("Interaction", z.interaction);
        field("Protagonist Experience", z.protagonist_experience);
        field("Antagonist Experience", z.antagonist_experience);
        field("Scene Implications", z.scene_implications);
      });
      field("Collision Sites", output.collision_sites);
      break;
    case "values":
      field("Values Battleground Statement", output.values_battleground_statement);
      field("Shared Values", output.shared_values);
      field("Divergence Point", output.divergence_point);
      if (output.escalation_beats?.length > 0) {
        lines.push("**Values Escalation:**\n");
        output.escalation_beats.forEach(b => lines.push(`- **${b.beat}:** ${b.description}`));
        lines.push("");
      }
      break;
    case "wncl":
      field("WNCL Statement", output.wncl_statement);
      field("Identity Cost", output.identity_cost);
      field("Story Test", output.story_test);
      break;
    case "competence":
      if (output.key_abilities?.length > 0) {
        lines.push("## Key Abilities\n");
        output.key_abilities.forEach(a => {
          lines.push(`**${a.ability}**`);
          field("Source", a.source);
          field("Limits", a.limits);
        });
      }
      if (output.costs_paid?.length > 0) {
        lines.push("## Power as Trade\n");
        output.costs_paid.forEach(c => {
          field("Cost", c.cost);
          field("Power Purchased", c.purchased);
          field("Wound Connection", c.wound_connection);
          lines.push("---\n");
        });
      }
      if (output.power_differential_map?.length > 0) {
        lines.push("## Power Differential Map\n");
        lines.push("| Dimension | Protagonist | Antagonist | Gap |");
        lines.push("|---|---|---|---|");
        output.power_differential_map.forEach(r =>
          lines.push(`| ${r.dimension} | ${r.protagonist} | ${r.antagonist} | ${r.gap} |`)
        );
        lines.push("");
      }
      break;
    case "escalation":
      [output.stage_1, output.stage_2, output.stage_3, output.stage_4].filter(Boolean).forEach((st, i) => {
        lines.push(`## Stage ${i + 1} — ${st.label}\n`);
        field("Description", st.description);
        (st.scenes || []).filter(Boolean).forEach(sc => lines.push(`- Scene: ${sc}`));
        lines.push("");
      });
      break;
    case "mvw_opposition":
      field("Must Build", output.must_build);
      field("Can Imply", output.can_imply);
      field("Can Defer", output.can_defer);
      field("MVW Summary", output.extended_mvw_notes);
      break;
    case "trope":
      field("Trope Family", output.trope_family);
      if (output.trope_audit?.length > 0) {
        lines.push("## Expectation Audit\n");
        lines.push("| Expectation | Approach | Management |");
        lines.push("|---|---|---|");
        output.trope_audit.forEach(r => lines.push(`| ${r.expectation} | ${r.approach} | ${r.management} |`));
        lines.push("");
      }
      field("Subversion Plan", output.subversion_plan);
      break;
    case "series":
      field("Series Arc", output.series_arc);
      field("Book Role", output.book_role);
      field("Unresolved Threads", output.unresolved_threads);
      break;
    default:
      Object.entries(output).forEach(([k, v]) => {
        if (!v) return;
        if (Array.isArray(v)) { field(k.replace(/_/g," "), v); }
        else if (typeof v === "object") {
          lines.push(`**${k.replace(/_/g," ")}:**\n`);
          Object.entries(v).forEach(([k2, v2]) => v2 && lines.push(`  - **${k2}:** ${v2}`));
          lines.push("");
        } else {
          field(k.replace(/_/g," "), String(v));
        }
      });
  }
  return lines.join("\n");
}

function sheetToMarkdown(prot, ant) {
  const parts = ["# Opposition Engine Sheet\n"];
  if (prot?.name) parts.push(`**Protagonist:** ${prot.name}\n`);
  for (const step of STEPS) {
    if (ant[step.id]) parts.push(outputToMarkdown(step.id, step.label, ant[step.id]));
  }
  return parts.join("\n---\n\n");
}

// ═══════════════════════════════════════════════════════════════════
// SESSION PERSISTENCE
// ═══════════════════════════════════════════════════════════════════
const SESSION_KEY = "oe-session-v1";
function saveSession(protagonist, antagonist, stepIdx, concept) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({ protagonist, antagonist, stepIdx, concept })); } catch (_) {}
}
function loadSession() {
  try { const s = localStorage.getItem(SESSION_KEY); return s ? JSON.parse(s) : null; } catch (_) { return null; }
}
function clearSession() { try { localStorage.removeItem(SESSION_KEY); } catch (_) {} }

// ═══════════════════════════════════════════════════════════════════
// SMALL UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════
function Lbl({ children, style }) {
  return <div style={{ ...sty.label, ...style }}>{children}</div>;
}
function Field({ label, value, large, dim, style }) {
  if (!value) return null;
  return (
    <div style={{ marginBottom: "14px", ...style }}>
      <Lbl>{label}</Lbl>
      <div style={{ ...sty.val, fontSize: large ? "16px" : "15px", color: dim ? C.dim : C.text, whiteSpace: "pre-wrap" }}>{value}</div>
    </div>
  );
}
function StatRow({ label, val, max=20 }) {
  const pct = Math.round((val / max) * 100);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"7px" }}>
      <div style={{ fontFamily:F.mono, fontSize:"10px", color:C.dim, width:"40px", textAlign:"right" }}>{label}</div>
      <div style={{ flex:1, height:"3px", background:C.border }}>
        <div style={{ width:`${pct}%`, height:"100%", background: val>=15?C.red:val>=10?C.gold:C.dim }} />
      </div>
      <div style={{ fontFamily:F.mono, fontSize:"11px", color:val>=15?C.red:val>=10?C.gold:C.dim, width:"22px" }}>{val}</div>
    </div>
  );
}
function Tag({ children, color="red" }) {
  return (
    <span style={{ fontFamily:F.mono, fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase",
      background: color==="red"?C.redDim:color==="gold"?`${C.goldMuted}44`:`${C.vfaint}`,
      color: color==="red"?C.red:color==="gold"?C.gold:C.dim,
      border: `1px solid ${color==="red"?C.borderRed:color==="gold"?C.borderGold:C.border}`,
      padding:"2px 8px", display:"inline-block" }}>
      {children}
    </span>
  );
}
function Badge({ label, value }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, padding:"12px 16px", marginBottom:"10px" }}>
      <Lbl>{label}</Lbl>
      <div style={{ fontFamily:F.mono, fontSize:"13px", color:C.mono }}>{value}</div>
    </div>
  );
}
function Divider() {
  return <div style={{ height:"1px", background:C.border, margin:"20px 0" }} />;
}

// ═══════════════════════════════════════════════════════════════════
// OUTPUT RENDERERS
// ═══════════════════════════════════════════════════════════════════
function RenderOutput({ stepId, output }) {
  if (!output) return null;
  const baseStyle = { ...sty.card };

  // ── Step IX: Collision Map — zone cards ──
  if (stepId === "collision_map") {
    return (
      <div>
        {output.collision_statement && (
          <div style={{ ...baseStyle, borderColor: C.borderRed }}>
            <Lbl style={{ color:C.red }}>Collision Statement</Lbl>
            <div style={sty.val}>{output.collision_statement}</div>
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
          {(output.zones||[]).map((z,i) => (
            <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, padding:"16px" }}>
              <div style={{ fontFamily:F.serif, fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase",
                color:C.red, marginBottom:"12px", borderBottom:`1px solid ${C.borderRed}`, paddingBottom:"8px" }}>
                Zone {i+1} — {z.zone}
              </div>
              <Field label="Interaction" value={z.interaction} />
              <Field label="Protagonist Experience" value={z.protagonist_experience} dim />
              <Field label="Antagonist Experience" value={z.antagonist_experience} dim />
              <Field label="Scene Implications" value={z.scene_implications} />
            </div>
          ))}
        </div>
        {output.collision_sites?.length > 0 && (
          <div style={{ ...baseStyle, marginTop:"12px" }}>
            <Lbl>Collision Sites</Lbl>
            {output.collision_sites.map((s,i) => (
              <div key={i} style={{ fontFamily:F.serif, fontSize:"14px", color:C.text, marginBottom:"6px" }}>• {s}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Step XV: Trope — table ──
  if (stepId === "trope") {
    return (
      <div>
        <div style={{ ...baseStyle, borderColor: C.borderRed }}>
          <Lbl>Trope Family</Lbl>
          <div style={{ ...sty.val, fontSize:"18px", fontStyle:"italic" }}>{output.trope_family}</div>
        </div>
        <div style={{ ...baseStyle }}>
          <Lbl style={{ marginBottom:"12px" }}>Expectation Audit</Lbl>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>
                {["Expectation","Approach","Management"].map(h => (
                  <th key={h} style={{ fontFamily:F.mono, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase",
                    color:C.dim, textAlign:"left", padding:"8px 12px", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(output.trope_audit||[]).map((row,i) => (
                <tr key={i} style={{ borderBottom:`1px solid ${C.vfaint}` }}>
                  <td style={{ fontFamily:F.serif, fontSize:"14px", color:C.text, padding:"10px 12px", verticalAlign:"top" }}>{row.expectation}</td>
                  <td style={{ fontFamily:F.serif, fontSize:"13px", color:C.dim, padding:"10px 12px", verticalAlign:"top" }}>{row.approach}</td>
                  <td style={{ padding:"10px 12px", verticalAlign:"top" }}>
                    <Tag color={row.management==="Subvert"?"red":row.management==="Fulfill"?"gold":""}>{row.management}</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {output.subversion_plan && (
          <div style={baseStyle}><Field label="Subversion Plan" value={output.subversion_plan} /></div>
        )}
      </div>
    );
  }

  // ── Step VIII: Chassis — stat bars ──
  if (stepId === "chassis") {
    const ph = output.physical || {}; const so = output.social || {};
    return (
      <div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
          <div style={baseStyle}>
            <Lbl>Physical Profile</Lbl>
            {[["STR",ph.str],["DEX",ph.dex],["CON",ph.con],["INT",ph.int],["WIS",ph.wis],["CHA",ph.cha]].map(([l,v])=>
              v ? <StatRow key={l} label={l} val={v} /> : null)}
            {ph.friction_statement && <><Divider/><Field label="Physical Friction" value={ph.friction_statement} /></>}
          </div>
          <div style={baseStyle}>
            <Lbl>Social Profile</Lbl>
            {[["RANK",so.rank],["CONN",so.connections],["RES",so.resources],["TRAIN",so.training],["REP",so.reputation],["OBL",so.obligation]].map(([l,v])=>
              v ? <StatRow key={l} label={l} val={v} /> : null)}
            {so.friction_statement && <><Divider/><Field label="Social Friction" value={so.friction_statement} /></>}
          </div>
        </div>
        {output.chassis_collision && (
          <div style={{ ...baseStyle, borderColor: C.borderRed }}>
            <Field label="Chassis Collision" value={output.chassis_collision} />
          </div>
        )}
        {output.mvw_notes && (
          <div style={baseStyle}>
            <Lbl style={{ marginBottom:"10px" }}>MVW Implications</Lbl>
            {output.mvw_notes.extensions?.filter(Boolean).length > 0 && (
              <div style={{ marginBottom:"10px" }}>
                <Tag color="gold">Extensions</Tag>
                {output.mvw_notes.extensions.map((e,i) => <div key={i} style={{ ...sty.val, marginTop:"6px", fontSize:"14px" }}>• {e}</div>)}
              </div>
            )}
            {output.mvw_notes.modifications?.filter(Boolean).length > 0 && (
              <div style={{ marginBottom:"10px" }}>
                <Tag color="">Modifications</Tag>
                {output.mvw_notes.modifications.map((e,i) => <div key={i} style={{ ...sty.val, marginTop:"6px", fontSize:"14px" }}>• {e}</div>)}
              </div>
            )}
            {output.mvw_notes.contradictions?.filter(Boolean).length > 0 && (
              <div>
                <Tag color="red">Contradictions</Tag>
                {output.mvw_notes.contradictions.map((e,i) => <div key={i} style={{ ...sty.val, marginTop:"6px", fontSize:"14px", color:C.red }}>• {e}</div>)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── Step XII: Competence — power differential table ──
  if (stepId === "competence") {
    return (
      <div>
        {output.key_abilities?.length > 0 && (
          <div style={baseStyle}>
            <Lbl style={{ marginBottom:"12px" }}>Key Abilities</Lbl>
            {output.key_abilities.map((a,i) => (
              <div key={i} style={{ marginBottom:"14px", paddingBottom:"14px", borderBottom:i<output.key_abilities.length-1?`1px solid ${C.vfaint}`:"none" }}>
                <div style={{ fontFamily:F.serif, fontSize:"16px", fontStyle:"italic", color:C.white, marginBottom:"4px" }}>{a.ability}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                  <Field label="Source" value={a.source} dim /><Field label="Limits" value={a.limits} dim />
                </div>
              </div>
            ))}
          </div>
        )}
        {output.costs_paid?.length > 0 && (
          <div style={baseStyle}>
            <Lbl style={{ marginBottom:"12px" }}>Power as Trade</Lbl>
            {output.costs_paid.map((c,i) => (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px", marginBottom:"10px", paddingBottom:"10px", borderBottom:i<output.costs_paid.length-1?`1px solid ${C.vfaint}`:"none" }}>
                <Field label="Cost" value={c.cost} /><Field label="Power Purchased" value={c.purchased} /><Field label="Wound Logic" value={c.wound_connection} dim />
              </div>
            ))}
          </div>
        )}
        {output.power_differential_map?.length > 0 && (
          <div style={baseStyle}>
            <Lbl style={{ marginBottom:"10px" }}>Power Differential Map</Lbl>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{["Dimension","Protagonist","Antagonist","Gap"].map(h=>(
                <th key={h} style={{ fontFamily:F.mono, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase",
                  color:C.dim, textAlign:"left", padding:"8px 10px", borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}</tr></thead>
              <tbody>{output.power_differential_map.map((row,i)=>(
                <tr key={i} style={{ borderBottom:`1px solid ${C.vfaint}` }}>
                  <td style={{ fontFamily:F.mono, fontSize:"11px", color:C.mono, padding:"8px 10px", verticalAlign:"top" }}>{row.dimension}</td>
                  <td style={{ fontFamily:F.serif, fontSize:"13px", color:C.dim, padding:"8px 10px", verticalAlign:"top" }}>{row.protagonist}</td>
                  <td style={{ fontFamily:F.serif, fontSize:"13px", color:C.text, padding:"8px 10px", verticalAlign:"top" }}>{row.antagonist}</td>
                  <td style={{ fontFamily:F.serif, fontSize:"13px", color:C.gold, padding:"8px 10px", verticalAlign:"top" }}>{row.gap}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // ── Step XIII: Escalation — four stage cards ──
  if (stepId === "escalation") {
    const stages = [output.stage_1,output.stage_2,output.stage_3,output.stage_4].filter(Boolean);
    const colors = [C.dim, C.goldMuted, C.gold, C.red];
    return (
      <div>
        {stages.map((st,i) => (
          <div key={i} style={{ ...baseStyle, borderLeftWidth:"3px", borderLeftColor:colors[i], borderLeftStyle:"solid" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
              <div style={{ fontFamily:F.mono, fontSize:"10px", color:colors[i] }}>STAGE {i+1}</div>
              <div style={{ fontFamily:F.serif, fontSize:"14px", letterSpacing:"0.05em", textTransform:"uppercase", color:C.white }}>{st.label}</div>
            </div>
            <Field value={st.description} />
            {st.scenes?.filter(Boolean).map((sc,j) => (
              <div key={j} style={{ fontFamily:F.serif, fontSize:"13px", color:C.dim, marginTop:"6px", paddingLeft:"12px", borderLeft:`2px solid ${C.vfaint}` }}>Scene: {sc}</div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // ── Step XIV: MVW — three priority columns ──
  if (stepId === "mvw_opposition") {
    return (
      <div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px", marginBottom:"16px" }}>
          {[
            { label:"Must Build", items:output.must_build, color:C.red },
            { label:"Can Imply", items:output.can_imply, color:C.gold },
            { label:"Can Defer", items:output.can_defer, color:C.dim },
          ].map(col => (
            <div key={col.label} style={{ background:C.card, border:`1px solid ${C.border}`, padding:"16px" }}>
              <Lbl style={{ color:col.color, marginBottom:"12px" }}>{col.label}</Lbl>
              {(col.items||[]).filter(Boolean).map((item,i) => (
                <div key={i} style={{ fontFamily:F.serif, fontSize:"13px", color:C.text, marginBottom:"8px", paddingBottom:"8px",
                  borderBottom:i<(col.items.length-1)?`1px solid ${C.vfaint}`:"none" }}>• {item}</div>
              ))}
            </div>
          ))}
        </div>
        {output.extended_mvw_notes && (
          <div style={baseStyle}><Field label="MVW Summary" value={output.extended_mvw_notes} /></div>
        )}
      </div>
    );
  }

  // ── Step X: Values — battleground + escalation ──
  if (stepId === "values") {
    return (
      <div>
        {output.values_battleground_statement && (
          <div style={{ ...baseStyle, borderColor:C.borderRed }}>
            <Lbl style={{ color:C.red }}>Values Battleground Statement</Lbl>
            <div style={{ fontFamily:F.serif, fontSize:"17px", fontStyle:"italic", color:C.white, lineHeight:1.6 }}>
              {output.values_battleground_statement}
            </div>
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
          <Field label="Shared Values" value={output.shared_values} style={baseStyle} />
          <Field label="Divergence Point" value={output.divergence_point} style={baseStyle} />
        </div>
        {output.escalation_beats?.length > 0 && (
          <div style={baseStyle}>
            <Lbl style={{ marginBottom:"12px" }}>Values Escalation</Lbl>
            {output.escalation_beats.map((b,i) => (
              <div key={i} style={{ display:"flex", gap:"16px", marginBottom:"12px", paddingBottom:"12px",
                borderBottom:i<3?`1px solid ${C.vfaint}`:"none" }}>
                <div style={{ fontFamily:F.mono, fontSize:"9px", color:C.red, textTransform:"uppercase", letterSpacing:"0.12em", width:"80px", paddingTop:"2px", flexShrink:0 }}>{b.beat}</div>
                <div style={{ fontFamily:F.serif, fontSize:"14px", color:C.text, lineHeight:1.55 }}>{b.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Step I: MVO Audit ──
  if (stepId === "mvo_audit") {
    return (
      <div>
        {output.audit_summary && (
          <div style={{ ...baseStyle, borderColor:C.borderRed }}>
            <Lbl style={{ color:C.red }}>Audit Verdict</Lbl>
            <div style={{ fontFamily:F.serif, fontSize:"16px", fontStyle:"italic", color:C.white }}>{output.audit_summary}</div>
          </div>
        )}
        {[
          ["Trigger Creation Audit", output.trigger_audit],
          ["WNCL Pressure Audit", output.wncl_audit],
          ["Coping Mode Defeat Audit", output.coping_audit],
        ].map(([lbl,val]) => val && (
          <div key={lbl} style={baseStyle}><Field label={lbl} value={val} /></div>
        ))}
        {output.revision_needed && output.revised_mvo && (
          <div style={{ ...baseStyle, borderColor:C.borderGold }}>
            <Lbl style={{ color:C.gold, marginBottom:"12px" }}>Revised MVO Functions</Lbl>
            <Field label="Creates Triggers By" value={output.revised_mvo.creates_triggers} />
            <Field label="Pressures WNCL By" value={output.revised_mvo.pressures_line} />
            <Field label="Defeats Coping By" value={output.revised_mvo.defeats_coping} />
          </div>
        )}
        {!output.revision_needed && (
          <div style={baseStyle}><Tag color="gold">MVO Confirmed — No Revision Needed</Tag></div>
        )}
      </div>
    );
  }

  // ── DEFAULT generic renderer ──
  const renderField = (key, val) => {
    if (!val || key === "output") return null;
    if (Array.isArray(val)) {
      return (
        <div key={key} style={{ marginBottom:"14px" }}>
          <Lbl>{key.replace(/_/g," ")}</Lbl>
          {val.map((item,i) => <div key={i} style={{ ...sty.val, marginBottom:"4px" }}>• {item}</div>)}
        </div>
      );
    }
    if (typeof val === "object") {
      return (
        <div key={key} style={{ ...baseStyle, marginBottom:"10px" }}>
          <Lbl>{key.replace(/_/g," ")}</Lbl>
          {Object.entries(val).map(([k2,v2]) => v2 && (
            <div key={k2} style={{ display:"flex", gap:"12px", marginBottom:"6px" }}>
              <div style={{ fontFamily:F.mono, fontSize:"9px", color:C.faint, textTransform:"uppercase", width:"80px", flexShrink:0, paddingTop:"2px" }}>{k2}</div>
              <div style={{ fontFamily:F.serif, fontSize:"14px", color:C.dim }}>{v2}</div>
            </div>
          ))}
        </div>
      );
    }
    const isMain = ["core_belief","wound_event","collision_analysis","will_not_cross","specific_object","compound_reflex","values_battleground_statement"].includes(key);
    return (
      <div key={key} style={{ ...baseStyle, ...(isMain ? { borderColor:C.borderRed } : {}) }}>
        <Field label={key.replace(/_/g," ")} value={String(val)} large={isMain} />
      </div>
    );
  };

  if (output.output) {
    return (
      <div>
        <div style={{ ...sty.card, borderColor:C.borderRed }}>
          <div style={{ fontFamily:F.serif, fontSize:"18px", fontStyle:"italic", color:C.white, lineHeight:1.6 }}>
            {output.output}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
          {Object.entries(output).filter(([k])=>k!=="output").map(([k,v]) => renderField(k,v))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
      {Object.entries(output).map(([k,v]) => renderField(k,v))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROTAGONIST REFERENCE PANEL
// ═══════════════════════════════════════════════════════════════════
const PROT_FIELDS = {
  mvo_audit:    [["MVO — Creates Triggers","mismatch.mvo_sketch.creates_triggers"],["MVO — Pressures Line","mismatch.mvo_sketch.pressures_line"],["MVO — Defeats Coping","mismatch.mvo_sketch.defeats_coping"]],
  enneagram:    [["Type/Wing","wing_reflex.type_wing"],["Core Fear","enneagram.core_fear"],["Schema","schema_coping.schema"]],
  wing_reflex:  [["Type/Wing","wing_reflex.type_wing"],["Compound Reflex","wing_reflex.compound_reflex"],["Primary Coping","schema_coping.primary_coping_mode"]],
  core_belief:  [["Core Belief","core_belief.core_belief"]],
  ruling_passion:[["Specific Object","ruling_passion.specific_object"],["WNCL","ruling_passion.will_not_cross"]],
  wound:        [["Wound Event","wound.wound_event"],["Lesson Learned","wound.lesson_learned"]],
  schema_coping:[["Schema","schema_coping.schema"],["Schema Message","schema_coping.schema_message"],["Primary Coping","schema_coping.primary_coping_mode"]],
  chassis:      [["Physical Friction","chassis.physical.friction_statement"],["Social Friction","chassis.social.friction_statement"]],
  collision_map:[["Compound Reflex","wing_reflex.compound_reflex"],["WNCL","ruling_passion.will_not_cross"],["Schema","schema_coping.schema"]],
  values:       [["Core Belief","core_belief.core_belief"],["Specific Object","ruling_passion.specific_object"]],
  wncl:         [["WNCL","ruling_passion.will_not_cross"]],
  competence:   [["Physical Friction","chassis.physical.friction_statement"],["Social Friction","chassis.social.friction_statement"]],
  escalation:   [["Schema Triggers","schema_coping.triggers"],["Primary Coping","schema_coping.primary_coping_mode"]],
  mvw_opposition:[["Concept/Seed","seed.text"]],
  trope:        [["Archetype","archetype.archetype"],["Type/Wing","wing_reflex.type_wing"]],
  series:       [["Type/Wing","wing_reflex.type_wing"],["Schema","schema_coping.schema"]],
};

function getNestedVal(obj, path) {
  return path.split(".").reduce((o,k) => (o&&o[k]!==undefined?o[k]:null), obj);
}

function ProtRefPanel({ prot, stepId }) {
  const [open, setOpen] = useState(false);
  if (!prot) return null;
  const fields = PROT_FIELDS[stepId] || [];
  return (
    <div style={{ marginBottom:"16px", border:`1px solid ${C.border}`, background:C.panel }}>
      <div onClick={() => setOpen(!open)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"10px 16px", cursor:"pointer", userSelect:"none" }}>
        <div style={{ fontFamily:F.mono, fontSize:"10px", letterSpacing:"0.15em", color:C.dim, textTransform:"uppercase" }}>
          Protagonist Reference
        </div>
        <div style={{ fontFamily:F.mono, fontSize:"11px", color:C.faint }}>{open ? "▲" : "▼"}</div>
      </div>
      {open && (
        <div style={{ padding:"12px 16px", borderTop:`1px solid ${C.vfaint}` }}>
          {fields.map(([lbl, path]) => {
            const val = getNestedVal(prot, path);
            if (!val) return null;
            const display = Array.isArray(val) ? val.join("\n") : String(val);
            return <Field key={path} label={lbl} value={display} dim />;
          })}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// WELCOME SCREEN
// ═══════════════════════════════════════════════════════════════════
function WelcomeScreen({ onBegin, onResume, savedSession }) {
  const [hov, setHov] = useState(false);
  const [hovR, setHovR] = useState(false);
  const resumeStep = savedSession ? STEPS[Math.min(savedSession.stepIdx, STEPS.length - 1)] : null;
  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", padding:"40px",
      backgroundImage:"radial-gradient(ellipse at 20% 40%, #1a0810 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, #0d0a18 0%, transparent 60%)" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet" />
      <div style={{ maxWidth:"580px", textAlign:"center" }}>
        <div style={{ fontFamily:F.mono, fontSize:"10px", letterSpacing:"0.3em", color:C.redMuted, textTransform:"uppercase", marginBottom:"24px" }}>
          The Protagonist Engine Trilogy · Book Two
        </div>
        <div style={{ fontFamily:F.serif, fontSize:"clamp(52px,8vw,80px)", fontWeight:300, color:C.white,
          lineHeight:0.95, letterSpacing:"0.02em", marginBottom:"8px" }}>
          THE<br /><span style={{ fontStyle:"italic", color:C.red }}>OPPOSITION</span><br />ENGINE
        </div>
        <div style={{ height:"1px", background:`linear-gradient(90deg, transparent, ${C.borderRed}, transparent)`, margin:"32px 0" }} />
        <div style={{ fontFamily:F.serif, fontSize:"16px", color:C.dim, lineHeight:1.7, marginBottom:"40px" }}>
          Build the antagonist who attacks your protagonist's specific scar tissue—
          for reasons that make complete sense on their own terms.
        </div>
        <div style={{ display:"flex", gap:"16px", justifyContent:"center", marginBottom:"48px" }}>
          {["16 Steps","4 Parts","1 Collision"].map(t => (
            <div key={t} style={{ fontFamily:F.mono, fontSize:"10px", letterSpacing:"0.15em", color:C.faint, textTransform:"uppercase" }}>{t}</div>
          ))}
        </div>
        {savedSession && resumeStep && (
          <div style={{ marginBottom:"16px" }}>
            <button
              onMouseEnter={()=>setHovR(true)} onMouseLeave={()=>setHovR(false)}
              onClick={onResume}
              style={{ ...sty.btn("gold"), padding:"14px 48px", fontSize:"12px", letterSpacing:"0.2em", width:"100%",
                background:hovR?C.goldMuted:"transparent", color:hovR?C.white:C.gold }}>
              Resume Session → {resumeStep.num} {resumeStep.title}
            </button>
          </div>
        )}
        <button
          onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
          onClick={onBegin}
          style={{ ...sty.btn("red"), padding:"14px 48px", fontSize:"12px", letterSpacing:"0.2em",
            background:hov?C.redMuted:C.redDim, color:hov?C.white:C.red }}>
          {savedSession ? "Start Fresh" : "Begin Opposition Build"}
        </button>
        <div style={{ fontFamily:F.mono, fontSize:"10px", color:C.faint, marginTop:"20px", letterSpacing:"0.08em" }}>
          Requires completed Book 1 Character Engine Sheet
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// IMPORT SCREEN
// ═══════════════════════════════════════════════════════════════════
function ImportScreen({ onConfirm }) {
  const [prot, setProt] = useState(null);
  const [concept, setConcept] = useState("");
  const [err, setErr] = useState(null);
  const [drag, setDrag] = useState(false);
  const [raw, setRaw] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  const fileRef = useState(null)[0];

  const normalizeFlat = (d) => {
    // Parse type number + name from strings like "The Gladiator is an 8w9 Sovereign."
    const twMatch = (d.type_wing_statement || "").match(/(\d+)w(\d+)\s+(\w+)/);
    const typeNum  = twMatch ? parseInt(twMatch[1]) : 8;
    const wingNum  = twMatch ? parseInt(twMatch[2]) : 9;
    const typeWing = twMatch ? `${twMatch[1]}w${twMatch[2]}` : "8w9";
    // Parse archetype cluster from "The X is a Y from the Z cluster."
    const archMatch = (d.archetype_statement || "").match(/is a (.+?) from the (\w+) cluster/i);
    const archetype = archMatch ? archMatch[1] : "";
    const cluster   = archMatch ? archMatch[2] : "";

    const TYPE_NAMES = {1:"Reformer",2:"Helper",3:"Achiever",4:"Individualist",5:"Investigator",6:"Loyalist",7:"Enthusiast",8:"Challenger",9:"Peacemaker"};
    const TYPE_FEARS = {1:"being corrupt or wrong",2:"being unloved",3:"being worthless",4:"having no identity or significance",5:"being helpless or incompetent",6:"being without support",7:"being trapped or in pain",8:"being controlled or harmed by others",9:"loss of connection"};
    const TYPE_DESIRES= {1:"integrity",2:"love",3:"value and admiration",4:"significance",5:"competence and understanding",6:"security",7:"freedom",8:"autonomy and control",9:"peace"};

    return {
      seed: { text: d.character_name || d.engine_summary || "", files: [] },
      archetype: { cluster, archetype, reasoning: "", friction_note: "", output: d.archetype_statement || "" },
      enneagram: { type_number: typeNum, type_name: TYPE_NAMES[typeNum] || "", core_fear: TYPE_FEARS[typeNum] || "", core_desire: TYPE_DESIRES[typeNum] || "", pressure_reflex: "", reasoning: "", output: d.type_wing_statement || "" },
      wing_reflex: { wing: wingNum, type_wing: typeWing, wing_description: "", wing_friction: "", compound_reflex: d.compound_reflex || "", output: d.type_wing_statement || "" },
      core_belief: { core_belief: d.core_belief || "", how_it_drives: "", how_it_will_fail: "", output: d.core_belief || "" },
      ruling_passion: { specific_object: d.ruling_passion?.specific_object || "", theory_of_achievement: d.ruling_passion?.theory_of_achievement || "", will_not_cross: d.ruling_passion?.will_not_cross || "", pressure_triangle: "" },
      wound: { wound_event: d.wound_summary || "", wound_type: "acute", lesson_learned: d.schema_message || "", sensory_triggers: [], connection_to_passion: "" },
      schema_coping: { schema: d.schema || "", schema_message: d.schema_message || "", triggers: [], primary_coping_mode: d.coping_modes?.primary || "", primary_description: d.coping_modes?.primary_description || "", failure_cascade: d.coping_modes?.failure_cascade || "", hidden_mode: d.coping_modes?.hidden_mode || "" },
      mismatch: { mismatch_statement: d.mismatch_statement || "", vector_1_schema: "", vector_2_theory: "", vector_3_line: "", vector_4_coping: "", mvo_sketch: { creates_triggers: d.opposition?.creates_triggers || d.mvo_sketch?.creates_triggers || "", defeats_theory: d.opposition?.defeats_theory || d.mvo_sketch?.defeats_theory || "", pressures_line: d.opposition?.pressures_line || d.mvo_sketch?.pressures_line || "", defeats_coping: d.opposition?.defeats_coping || d.mvo_sketch?.defeats_coping || "" } },
      chassis: { physical: { str: d.chassis?.physical?.str||0, dex: d.chassis?.physical?.dex||0, con: d.chassis?.physical?.con||0, int: d.chassis?.physical?.int||0, wis: d.chassis?.physical?.wis||0, cha: d.chassis?.physical?.cha||0, friction_statement: d.chassis?.physical?.friction_statement||"" }, social: { rank: d.chassis?.social?.rank||0, connections: d.chassis?.social?.connections||0, resources: d.chassis?.social?.resources||0, training: d.chassis?.social?.training||0, reputation: d.chassis?.social?.reputation||0, obligation: d.chassis?.social?.obligation||0, friction_statement: d.chassis?.social?.friction_statement||"" } }
    };
  };

  const parseJSON = useCallback((text) => {
    try {
      const data = JSON.parse(text);
      const raw = data.character || data.protagonist || data;
      // If it already has nested structure, use as-is
      if (raw.enneagram || raw.wing_reflex) { setProt(raw); setErr(null); return; }
      // If it has flat Book 1 export keys, normalize
      if (raw.compound_reflex || raw.schema || raw.chassis) { setProt(normalizeFlat(raw)); setErr(null); return; }
      throw new Error("File doesn't contain recognizable Character Engine Sheet data. Expected Book 1 app export (.json).");
    } catch (e) { setErr(e.message); }
  }, []);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => parseJSON(e.target.result);
    reader.readAsText(file);
  };

  const handleDrop = (e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); };

  const inputStyle = { width:"100%", background:C.card, border:`1px solid ${C.border}`, color:C.text,
    fontFamily:F.serif, fontSize:"14px", padding:"10px 14px", resize:"vertical", boxSizing:"border-box" };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px" }}>
      <div style={{ maxWidth:"760px", width:"100%" }}>
        <div style={{ fontFamily:F.mono, fontSize:"10px", letterSpacing:"0.25em", color:C.dim, textTransform:"uppercase", marginBottom:"8px" }}>Import</div>
        <div style={{ ...sty.h1, fontSize:"32px", marginBottom:"32px" }}>Load Your Protagonist</div>

        {/* JSON Upload */}
        <div style={{ border:`1px solid ${drag?C.borderRed:C.border}`, padding:"32px", textAlign:"center", marginBottom:"20px",
          background:drag?C.redDim:C.panel, transition:"all .15s", cursor:"pointer" }}
          onDragOver={(e)=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={handleDrop}
          onClick={()=>document.getElementById("prot-file").click()}>
          <input id="prot-file" type="file" accept=".json" style={{ display:"none" }}
            onChange={e=>{ if(e.target.files[0]) handleFile(e.target.files[0]) }} />
          <div style={{ fontFamily:F.mono, fontSize:"11px", color:C.dim, letterSpacing:"0.1em" }}>
            {prot ? "✓ Character Engine Sheet Loaded" : "Drop .json or click to upload"}
          </div>
          {!prot && <div style={{ fontFamily:F.mono, fontSize:"9px", color:C.faint, marginTop:"8px" }}>Export from Book 1 app</div>}
        </div>

        {/* Or paste raw */}
        <div style={{ marginBottom:"20px" }}>
          <button onClick={()=>setShowRaw(!showRaw)} style={{ ...sty.btn(""), fontSize:"10px" }}>
            {showRaw?"Hide":"Or Paste Raw JSON"}
          </button>
          {showRaw && (
            <div style={{ marginTop:"10px" }}>
              <textarea value={raw} onChange={e=>setRaw(e.target.value)} placeholder='Paste JSON here...'
                style={{ ...inputStyle, height:"120px" }} />
              <button onClick={()=>parseJSON(raw)} style={{ ...sty.btn("red"), marginTop:"8px" }}>Parse JSON</button>
            </div>
          )}
        </div>

        {err && <div style={{ fontFamily:F.mono, fontSize:"12px", color:C.red, marginBottom:"16px" }}>Error: {err}</div>}

        {/* Protagonist preview */}
        {prot && (
          <div style={{ border:`1px solid ${C.borderGold}`, background:C.card, padding:"20px", marginBottom:"20px" }}>
            <Lbl style={{ color:C.gold, marginBottom:"12px" }}>Protagonist Confirmed</Lbl>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
              <Badge label="Type / Wing" value={prot.wing_reflex?.type_wing || prot.enneagram?.type_name || "—"} />
              <Badge label="Archetype" value={prot.archetype?.archetype || "—"} />
              <Badge label="Schema" value={prot.schema_coping?.schema || "—"} />
            </div>
            {prot.seed?.text && (
              <div style={{ marginTop:"12px" }}>
                <Lbl>Concept Seed</Lbl>
                <div style={{ fontFamily:F.serif, fontSize:"13px", color:C.dim, fontStyle:"italic" }}>
                  {prot.seed.text.substring(0,200)}{prot.seed.text.length>200?"…":""}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Antagonist concept */}
        <div style={{ marginBottom:"24px" }}>
          <Lbl>Antagonist Concept <span style={{ color:C.faint }}>(optional)</span></Lbl>
          <textarea value={concept} onChange={e=>setConcept(e.target.value)} maxLength={400}
            placeholder="Any initial intuition about your antagonist — name, role, relationship to protagonist. The build can proceed without this."
            style={{ ...inputStyle, height:"80px" }} />
          <div style={{ fontFamily:F.mono, fontSize:"9px", color:C.faint, marginTop:"4px", textAlign:"right" }}>
            {concept.length}/400
          </div>
        </div>

        <div style={{ display:"flex", gap:"16px", alignItems:"center" }}>
          <button disabled={!prot} onClick={() => onConfirm(prot, concept)}
            style={{ ...sty.btn("red"), opacity:prot?1:0.4, cursor:prot?"pointer":"not-allowed", padding:"14px 40px" }}>
            Begin the Build →
          </button>
          {!prot && <div style={{ fontFamily:F.mono, fontSize:"10px", color:C.faint }}>Load protagonist to continue</div>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════
function Sidebar({ stepIdx, antagonist, onSelect }) {
  return (
    <div style={{ width:"220px", background:C.panel, borderRight:`1px solid ${C.border}`, padding:"20px 0",
      overflowY:"auto", flexShrink:0, display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"0 16px 20px", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ fontFamily:F.mono, fontSize:"8px", letterSpacing:"0.25em", color:C.dim, textTransform:"uppercase", marginBottom:"4px" }}>Book Two</div>
        <div style={{ fontFamily:F.serif, fontSize:"16px", color:C.white }}>Opposition<br /><span style={{ color:C.red, fontStyle:"italic" }}>Engine</span></div>
      </div>
      <div style={{ padding:"12px 0", flex:1 }}>
        {PART_STEPS.map(([start,end], partIdx) => (
          <div key={partIdx}>
            <div style={{ fontFamily:F.mono, fontSize:"8px", letterSpacing:"0.15em", color:C.borderRed, textTransform:"uppercase",
              padding:"12px 16px 6px", borderBottom:`1px solid ${C.vfaint}` }}>
              Part {partIdx+1}
            </div>
            {STEPS.slice(start, end+1).map((step, si) => {
              const idx = start + si;
              const done = !!antagonist[step.id];
              const active = idx === stepIdx;
              return (
                <div key={step.id} onClick={() => done && onSelect(idx)}
                  style={{ display:"flex", alignItems:"center", gap:"10px", padding:"7px 16px",
                    cursor: done ? "pointer" : "default",
                    background: active ? C.hover : "transparent",
                    borderLeft: active ? `2px solid ${C.red}` : "2px solid transparent" }}>
                  <div style={{ fontFamily:F.mono, fontSize:"9px", color: active?C.red:done?C.gold:C.faint,
                    width:"20px", flexShrink:0, textAlign:"right" }}>
                    {done && !active ? "✓" : step.num}
                  </div>
                  <div style={{ fontFamily:F.mono, fontSize:"9px", letterSpacing:"0.05em", textTransform:"uppercase",
                    color: active?C.white:done?C.dim:C.faint, lineHeight:1.3 }}>
                    {step.title}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STEP VIEW
// ═══════════════════════════════════════════════════════════════════
function StepView({ step, stepIdx, prot, ant, concept, output, loading, error, onGenerate, onConfirm, onRegenerate, onSkip }) {
  const partLabel = PART_LABELS[step.part - 1];
  const isFirst = step.isSemiManual && !output && !loading;
  const confirmed = !!ant[step.id];
  const [regenNote, setRegenNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  // Show confirmed output if re-visiting a done step
  const displayOutput = output || (confirmed ? ant[step.id] : null);

  return (
    <div style={{ flex:1, overflowY:"auto", padding:"32px 40px", maxWidth:"900px" }}>
      {/* Header */}
      <div style={{ marginBottom:"28px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"8px" }}>
          <Tag color="red">{step.num}</Tag>
          <Tag color="">{partLabel}</Tag>
          {step.isOptional && <Tag color="gold">Optional</Tag>}
        </div>
        <div style={{ fontFamily:F.serif, fontSize:"clamp(24px,3vw,36px)", fontWeight:300, color:C.white, letterSpacing:"0.03em" }}>
          {step.title}
        </div>
      </div>

      {/* Protagonist reference panel */}
      <ProtRefPanel prot={prot} stepId={step.id} />

      {/* MVO Audit panel (Step I only) */}
      {step.isSemiManual && !output && !loading && prot?.mismatch && (
        <div style={{ ...sty.card, borderColor:C.borderGold, marginBottom:"16px" }}>
          <Lbl style={{ color:C.gold, marginBottom:"12px" }}>Current MVO Functions (from Book 1)</Lbl>
          {[
            ["Creates Triggers By", prot.mismatch.mvo_sketch?.creates_triggers],
            ["Pressures Line By", prot.mismatch.mvo_sketch?.pressures_line],
            ["Defeats Coping By", prot.mismatch.mvo_sketch?.defeats_coping],
          ].map(([lbl, val]) => val && <Field key={lbl} label={lbl} value={val} />)}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div style={{ ...sty.card, textAlign:"center", padding:"48px" }}>
          <div style={{ fontFamily:F.mono, fontSize:"11px", color:C.dim, letterSpacing:"0.1em", marginBottom:"16px" }}>
            {step.note || "Generating…"}
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:"6px" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width:"8px", height:"8px", background:C.red, borderRadius:"50%",
                animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />
            ))}
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div style={{ ...sty.card, borderColor:C.red }}>
          <Lbl style={{ color:C.red }}>Generation Error</Lbl>
          <div style={{ fontFamily:F.mono, fontSize:"12px", color:C.red, marginBottom:"12px" }}>{error}</div>
          <button onClick={() => onRegenerate("")} style={sty.btn("red")}>Retry</button>
        </div>
      )}

      {/* Output */}
      {displayOutput && !loading && (
        <div style={{ marginBottom:"24px" }}>
          <RenderOutput stepId={step.id} output={displayOutput} />
        </div>
      )}

      {/* Action buttons */}
      {!loading && (
        <div style={{ paddingTop:"8px", borderTop:`1px solid ${C.border}`, marginTop:"8px" }}>
          <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
            {isFirst && (
              <button onClick={onGenerate} style={{ ...sty.btn("red"), padding:"12px 32px" }}>
                Analyze MVO →
              </button>
            )}
            {output && !confirmed && (
              <>
                <button onClick={onConfirm} style={{ ...sty.btn("red"), padding:"12px 32px" }}>Confirm & Continue →</button>
                <button onClick={() => { setShowNote(v => !v); }} style={sty.btn("")}>Regenerate</button>
                {step.isOptional && onSkip && (
                  <button onClick={onSkip} style={{ ...sty.btn(""), color:C.faint }}>Skip (Standalone Story)</button>
                )}
              </>
            )}
            {confirmed && !output && (
              <div style={{ fontFamily:F.mono, fontSize:"10px", color:C.success, letterSpacing:"0.1em" }}>
                ✓ Confirmed — Navigate using sidebar to review
              </div>
            )}
            {displayOutput && (
              <button
                onClick={() => downloadText(`step-${step.id}.md`, outputToMarkdown(step.id, step.label, displayOutput))}
                style={{ ...sty.btn(""), marginLeft:"auto" }}>
                Download MD
              </button>
            )}
          </div>
          {showNote && output && !confirmed && (
            <div style={{ marginTop:"12px" }}>
              <textarea
                value={regenNote}
                onChange={e => setRegenNote(e.target.value)}
                placeholder="Optional: guide the next generation…"
                style={{ width:"100%", minHeight:"72px", background:C.card, color:C.text,
                  border:`1px solid ${C.border}`, fontFamily:F.mono, fontSize:"12px",
                  padding:"10px", borderRadius:"4px", resize:"vertical", boxSizing:"border-box" }}
              />
              <button
                onClick={() => { onRegenerate(regenNote); setShowNote(false); setRegenNote(""); }}
                style={{ ...sty.btn("red"), marginTop:"8px" }}>
                Regenerate →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// OPPOSITION SHEET (final two-tab output)
// ═══════════════════════════════════════════════════════════════════
function OppositionSheet({ prot, ant, onReset }) {
  const [tab, setTab] = useState("sheet");

  const exportJSON = () => downloadJSONFile("opposition-engine-sheet.json", { protagonist:prot, antagonist:ant });
  const exportMarkdown = () => downloadText("opposition-engine-sheet.md", sheetToMarkdown(prot, ant));

  const tabs = [["sheet","Opposition Engine Sheet"],["framework","Collision Framework"]];

  return (
    <div style={{ minHeight:"100vh", background:C.bg, padding:"40px" }}>
      {/* Header */}
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"32px" }}>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:"10px", letterSpacing:"0.25em", color:C.dim, marginBottom:"6px" }}>
              Opposition Engine — Build Complete
            </div>
            <div style={{ fontFamily:F.serif, fontSize:"40px", fontWeight:300, color:C.white, lineHeight:1 }}>
              <span style={{ fontStyle:"italic", color:C.red }}>The Antagonist</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={exportMarkdown} style={sty.btn("")}>Download MD →</button>
            <button onClick={exportJSON} style={sty.btn("gold")}>Download JSON →</button>
            <button onClick={onReset} style={sty.btn("")}>Build Another</button>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display:"flex", gap:0, borderBottom:`1px solid ${C.border}`, marginBottom:"28px" }}>
          {tabs.map(([id,label]) => (
            <button key={id} onClick={()=>setTab(id)}
              style={{ ...sty.btn(id===tab?"red":""), borderBottom:"none",
                borderLeft:id==="framework"?`1px solid ${C.border}`:"none",
                background:id===tab?C.redDim:"transparent", padding:"12px 28px" }}>
              {label}
            </button>
          ))}
        </div>

        {/* ── SHEET TAB ── */}
        {tab === "sheet" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"16px" }}>
            {/* Col 1: The Engine */}
            <div>
              <div style={{ fontFamily:F.serif, fontSize:"13px", letterSpacing:"0.1em", textTransform:"uppercase",
                color:C.red, borderBottom:`1px solid ${C.borderRed}`, paddingBottom:"8px", marginBottom:"16px" }}>
                The Engine
              </div>
              <Badge label="Type / Wing" value={ant.wing_reflex?.type_wing || "—"} />
              <Badge label="Collision Type" value={`${ant.enneagram?.collision_type || "—"}`} />
              {ant.enneagram?.collision_question && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Collision Question</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"13px", fontStyle:"italic", color:C.text, lineHeight:1.5 }}>
                    {ant.enneagram.collision_question}
                  </div>
                </div>
              )}
              {ant.wing_reflex?.compound_reflex && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Compound Reflex</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"13px", color:C.text, lineHeight:1.5 }}>
                    {ant.wing_reflex.compound_reflex}
                  </div>
                </div>
              )}
              {ant.core_belief?.core_belief && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Core Belief</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"13px", color:C.text, lineHeight:1.5 }}>
                    {ant.core_belief.core_belief}
                  </div>
                </div>
              )}
              {ant.ruling_passion?.specific_object && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Specific Object</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"13px", color:C.text, lineHeight:1.5 }}>
                    {ant.ruling_passion.specific_object}
                  </div>
                </div>
              )}
              {ant.ruling_passion?.theory_of_achievement && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Theory of Achievement</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"13px", color:C.dim, lineHeight:1.5 }}>
                    {ant.ruling_passion.theory_of_achievement}
                  </div>
                </div>
              )}
            </div>

            {/* Col 2: The Wound */}
            <div>
              <div style={{ fontFamily:F.serif, fontSize:"13px", letterSpacing:"0.1em", textTransform:"uppercase",
                color:C.red, borderBottom:`1px solid ${C.borderRed}`, paddingBottom:"8px", marginBottom:"16px" }}>
                The Wound
              </div>
              {ant.wound?.wound_event && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Wound Event</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", color:C.dim, lineHeight:1.55 }}>
                    {ant.wound.wound_event.substring(0, 300)}{ant.wound.wound_event.length>300?"…":""}
                  </div>
                </div>
              )}
              {ant.schema_coping?.schema && <Badge label="Schema" value={`${ant.schema_coping.schema} — "${ant.schema_coping.schema_message}"`} />}
              {ant.schema_coping?.triggers?.length > 0 && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Schema Triggers</Lbl>
                  {ant.schema_coping.triggers.map((t,i) => (
                    <div key={i} style={{ fontFamily:F.serif, fontSize:"12px", color:C.dim, marginBottom:"3px" }}>{i+1}. {t}</div>
                  ))}
                </div>
              )}
              {ant.schema_coping?.primary_coping_mode && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Primary Coping</Lbl>
                  <div style={{ fontFamily:F.mono, fontSize:"10px", color:C.red, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                    {ant.schema_coping.primary_coping_mode}
                  </div>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", color:C.dim, marginTop:"4px", lineHeight:1.5 }}>
                    {ant.schema_coping.primary_description}
                  </div>
                </div>
              )}
              {ant.schema_coping?.failure_cascade && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Failure Cascade</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", color:C.dim }}>{ant.schema_coping.failure_cascade}</div>
                </div>
              )}
              {ant.schema_coping?.vulnerability_point && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Vulnerability Point</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", color:C.gold, lineHeight:1.5 }}>{ant.schema_coping.vulnerability_point}</div>
                </div>
              )}
            </div>

            {/* Col 3: The Chassis */}
            <div>
              <div style={{ fontFamily:F.serif, fontSize:"13px", letterSpacing:"0.1em", textTransform:"uppercase",
                color:C.red, borderBottom:`1px solid ${C.borderRed}`, paddingBottom:"8px", marginBottom:"16px" }}>
                The Chassis
              </div>
              {ant.chassis?.physical && (
                <div style={{ marginBottom:"16px" }}>
                  <Lbl>Physical</Lbl>
                  {[["STR",ant.chassis.physical.str],["DEX",ant.chassis.physical.dex],["CON",ant.chassis.physical.con],
                    ["INT",ant.chassis.physical.int],["WIS",ant.chassis.physical.wis],["CHA",ant.chassis.physical.cha]].map(([l,v])=>
                    v ? <StatRow key={l} label={l} val={v} /> : null)}
                  {ant.chassis.physical.friction_statement && (
                    <div style={{ fontFamily:F.serif, fontSize:"11px", color:C.dim, marginTop:"8px", lineHeight:1.5 }}>
                      {ant.chassis.physical.friction_statement.substring(0,200)}
                    </div>
                  )}
                </div>
              )}
              {ant.chassis?.social && (
                <div style={{ marginBottom:"16px" }}>
                  <Lbl>Social</Lbl>
                  {[["RANK",ant.chassis.social.rank],["CONN",ant.chassis.social.connections],["RES",ant.chassis.social.resources],
                    ["TRAIN",ant.chassis.social.training],["REP",ant.chassis.social.reputation],["OBL",ant.chassis.social.obligation]].map(([l,v])=>
                    v ? <StatRow key={l} label={l} val={v} /> : null)}
                  {ant.chassis.social.friction_statement && (
                    <div style={{ fontFamily:F.serif, fontSize:"11px", color:C.dim, marginTop:"8px", lineHeight:1.5 }}>
                      {ant.chassis.social.friction_statement.substring(0,200)}
                    </div>
                  )}
                </div>
              )}
              {ant.wncl?.will_not_cross && (
                <div>
                  <Lbl>Will Not Cross</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", color:C.text, fontStyle:"italic", lineHeight:1.5 }}>
                    {ant.wncl.will_not_cross}
                  </div>
                </div>
              )}
            </div>

            {/* Col 4: The Collision */}
            <div>
              <div style={{ fontFamily:F.serif, fontSize:"13px", letterSpacing:"0.1em", textTransform:"uppercase",
                color:C.red, borderBottom:`1px solid ${C.borderRed}`, paddingBottom:"8px", marginBottom:"16px" }}>
                The Collision
              </div>
              {ant.collision_map?.collision_statement && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Collision Summary</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", color:C.text, lineHeight:1.55 }}>
                    {ant.collision_map.collision_statement.substring(0,280)}…
                  </div>
                </div>
              )}
              {ant.values?.values_battleground_statement && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Values Battleground</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", fontStyle:"italic", color:C.gold, lineHeight:1.55 }}>
                    {ant.values.values_battleground_statement}
                  </div>
                </div>
              )}
              {ant.chassis?.chassis_collision && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Chassis Collision</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", color:C.dim, lineHeight:1.5 }}>
                    {ant.chassis.chassis_collision.substring(0,200)}
                  </div>
                </div>
              )}
              {ant.schema_coping?.vulnerability_point && (
                <div style={{ marginBottom:"12px" }}>
                  <Lbl>Vulnerability Point</Lbl>
                  <div style={{ fontFamily:F.serif, fontSize:"12px", color:C.gold, fontStyle:"italic", lineHeight:1.5 }}>
                    {ant.schema_coping.vulnerability_point}
                  </div>
                </div>
              )}
              {ant.trope?.trope_family && <Badge label="Trope Family" value={ant.trope.trope_family} />}
            </div>
          </div>
        )}

        {/* ── FRAMEWORK TAB ── */}
        {tab === "framework" && (
          <div>
            {/* Collision Map */}
            {ant.collision_map?.zones?.length > 0 && (
              <div style={{ marginBottom:"32px" }}>
                <div style={{ fontFamily:F.serif, fontSize:"20px", fontWeight:300, color:C.white, marginBottom:"16px" }}>
                  Collision Map
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
                  {ant.collision_map.zones.map((z,i) => (
                    <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, padding:"16px" }}>
                      <div style={{ fontFamily:F.mono, fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase",
                        color:C.red, marginBottom:"10px" }}>Zone {i+1} — {z.zone}</div>
                      {[["Interaction",z.interaction],["Protagonist",z.protagonist_experience],
                        ["Antagonist",z.antagonist_experience],["Scene",z.scene_implications]].map(([lbl,val])=>
                        val ? <Field key={lbl} label={lbl} value={val} dim={lbl==="Protagonist"||lbl==="Antagonist"} /> : null)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <Divider />

            {/* Values escalation */}
            {ant.values?.escalation_beats?.length > 0 && (
              <div style={{ marginBottom:"32px" }}>
                <div style={{ fontFamily:F.serif, fontSize:"20px", fontWeight:300, color:C.white, marginBottom:"16px" }}>Values Escalation</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"12px" }}>
                  {ant.values.escalation_beats.map((b,i) => (
                    <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, padding:"16px" }}>
                      <Lbl style={{ color:[C.dim,C.goldMuted,C.gold,C.red][i] }}>{b.beat}</Lbl>
                      <div style={{ fontFamily:F.serif, fontSize:"13px", color:C.text, lineHeight:1.55 }}>{b.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Escalation ladder */}
            {ant.escalation && (
              <div style={{ marginBottom:"32px" }}>
                <div style={{ fontFamily:F.serif, fontSize:"20px", fontWeight:300, color:C.white, marginBottom:"16px" }}>Escalation Architecture</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"12px" }}>
                  {[ant.escalation.stage_1,ant.escalation.stage_2,ant.escalation.stage_3,ant.escalation.stage_4].filter(Boolean).map((st,i)=>(
                    <div key={i} style={{ background:C.card, borderLeft:`3px solid ${[C.dim,C.goldMuted,C.gold,C.red][i]}`, padding:"16px" }}>
                      <Lbl style={{ color:[C.dim,C.goldMuted,C.gold,C.red][i] }}>Stage {i+1}</Lbl>
                      <div style={{ fontFamily:F.serif, fontSize:"12px", fontWeight:600, color:C.white, marginBottom:"8px" }}>{st.label}</div>
                      <div style={{ fontFamily:F.serif, fontSize:"13px", color:C.dim, lineHeight:1.5 }}>{st.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MVW */}
            {ant.mvw_opposition && (
              <div style={{ marginBottom:"32px" }}>
                <div style={{ fontFamily:F.serif, fontSize:"20px", fontWeight:300, color:C.white, marginBottom:"16px" }}>MVW: Opposition Layer</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
                  {[["Must Build",ant.mvw_opposition.must_build,C.red],["Can Imply",ant.mvw_opposition.can_imply,C.gold],["Can Defer",ant.mvw_opposition.can_defer,C.dim]].map(([lbl,items,col])=>(
                    <div key={lbl} style={{ background:C.card, border:`1px solid ${C.border}`, padding:"16px" }}>
                      <Lbl style={{ color:col, marginBottom:"10px" }}>{lbl}</Lbl>
                      {(items||[]).filter(Boolean).map((it,i)=>(
                        <div key={i} style={{ fontFamily:F.serif, fontSize:"13px", color:C.text, marginBottom:"8px", paddingBottom:"8px",
                          borderBottom:i<(items.length-1)?`1px solid ${C.vfaint}`:"none" }}>• {it}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trope audit */}
            {ant.trope?.trope_audit && (
              <div style={{ marginBottom:"32px" }}>
                <div style={{ fontFamily:F.serif, fontSize:"20px", fontWeight:300, color:C.white, marginBottom:"16px" }}>
                  Trope Profile — <span style={{ fontStyle:"italic", color:C.gold }}>{ant.trope.trope_family}</span>
                </div>
                <table style={{ width:"100%", borderCollapse:"collapse", background:C.card, border:`1px solid ${C.border}` }}>
                  <thead><tr>{["Expectation","Approach","Management"].map(h=>(
                    <th key={h} style={{ fontFamily:F.mono, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase",
                      color:C.dim, textAlign:"left", padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                  ))}</tr></thead>
                  <tbody>{ant.trope.trope_audit.map((row,i)=>(
                    <tr key={i} style={{ borderBottom:`1px solid ${C.vfaint}` }}>
                      <td style={{ fontFamily:F.serif, fontSize:"14px", color:C.text, padding:"10px 14px", verticalAlign:"top" }}>{row.expectation}</td>
                      <td style={{ fontFamily:F.serif, fontSize:"13px", color:C.dim, padding:"10px 14px", verticalAlign:"top" }}>{row.approach}</td>
                      <td style={{ padding:"10px 14px", verticalAlign:"top" }}>
                        <Tag color={row.management==="Subvert"?"red":row.management==="Fulfill"?"gold":""}>{row.management}</Tag>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}

            {/* Series management */}
            {ant.series && (
              <div style={{ marginBottom:"32px" }}>
                <div style={{ fontFamily:F.serif, fontSize:"20px", fontWeight:300, color:C.white, marginBottom:"16px" }}>Series Bible</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                  {ant.series.continuity_rules?.length > 0 && (
                    <div style={{ background:C.card, border:`1px solid ${C.border}`, padding:"16px" }}>
                      <Lbl style={{ marginBottom:"10px" }}>Continuity Rules</Lbl>
                      {ant.series.continuity_rules.map((r,i)=>(
                        <div key={i} style={{ fontFamily:F.serif, fontSize:"13px", color:C.text, marginBottom:"6px" }}>{i+1}. {r}</div>
                      ))}
                    </div>
                  )}
                  {ant.series.compounding_threat_plan && (
                    <div style={{ background:C.card, border:`1px solid ${C.border}`, padding:"16px" }}>
                      <Lbl>Compounding Threat Plan</Lbl>
                      <div style={{ fontFamily:F.serif, fontSize:"14px", color:C.text, lineHeight:1.6 }}>{ant.series.compounding_threat_plan}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [phase, setPhase]           = useState("welcome");
  const [stepIdx, setStepIdx]       = useState(0);
  const [protagonist, setProtagonist] = useState(null);
  const [antagonist, setAntagonist] = useState({});
  const [concept, setConcept]       = useState("");
  const [output, setOutput]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [savedSession, setSavedSession] = useState(null);

  const step = STEPS[stepIdx];

  // Check for saved session on mount
  useEffect(() => {
    const s = loadSession();
    if (s?.protagonist && s?.antagonist) setSavedSession(s);
  }, []);

  // Auto-generate on step change
  useEffect(() => {
    if (phase !== "building") return;
    if (step.isSemiManual) return;
    if (antagonist[step.id] || output || loading) return;
    handleGenerate();
  }, [stepIdx, phase]);

  async function handleGenerate(note = "") {
    setLoading(true); setError(null);
    try {
      let system = step.getSystem(protagonist, antagonist, concept);
      if (note) system += `\n\nUser note for this regeneration: ${note}`;
      const result = await callClaude(system, step.maxTokens || 1500);
      setOutput(result);
    } catch (e) {
      setError(e.message || "Generation failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  function handleConfirm() {
    const newAnt = { ...antagonist, [step.id]: output };
    setAntagonist(newAnt);
    setOutput(null);
    const nextIdx = stepIdx + 1;
    if (stepIdx === STEPS.length - 1) {
      saveSession(protagonist, newAnt, nextIdx, concept);
      setPhase("sheet");
    } else {
      saveSession(protagonist, newAnt, nextIdx, concept);
      setStepIdx(nextIdx);
    }
  }

  function handleRegenerate(note = "") {
    setOutput(null);
    setError(null);
    setTimeout(() => handleGenerate(note), 50);
  }

  function handleSkip() {
    const newAnt = { ...antagonist, [step.id]: null };
    setAntagonist(newAnt);
    setOutput(null);
    saveSession(protagonist, newAnt, stepIdx, concept);
    setPhase("sheet");
  }

  function handleReset() {
    clearSession();
    setPhase("welcome"); setStepIdx(0); setProtagonist(null);
    setAntagonist({}); setConcept(""); setOutput(null);
    setLoading(false); setError(null);
  }

  if (phase === "welcome") {
    return <WelcomeScreen
      onBegin={() => { clearSession(); setPhase("import"); }}
      onResume={() => {
        const s = loadSession();
        if (!s) return;
        setProtagonist(s.protagonist); setAntagonist(s.antagonist);
        setStepIdx(Math.min(s.stepIdx, STEPS.length - 1)); setConcept(s.concept || "");
        setPhase("building");
      }}
      savedSession={savedSession}
    />;
  }

  if (phase === "import") {
    return <ImportScreen onConfirm={(prot, c) => {
      setProtagonist(prot); setConcept(c); setPhase("building");
    }} />;
  }

  if (phase === "sheet") {
    return <OppositionSheet prot={protagonist} ant={antagonist} onReset={handleReset} />;
  }

  // Building phase
  return (
    <div style={{ display:"flex", height:"100vh", background:C.bg, overflow:"hidden",
      fontFamily:F.serif }}>
      <Sidebar stepIdx={stepIdx} antagonist={antagonist} onSelect={(i) => { setOutput(null); setStepIdx(i); }} />
      <div style={{ flex:1, overflowY:"auto" }}>
        <StepView
          step={step} stepIdx={stepIdx}
          prot={protagonist} ant={antagonist} concept={concept}
          output={output} loading={loading} error={error}
          onGenerate={() => handleGenerate()} onConfirm={handleConfirm}
          onRegenerate={(note) => handleRegenerate(note)} onSkip={step.isOptional ? handleSkip : null}
        />
      </div>
    </div>
  );
}

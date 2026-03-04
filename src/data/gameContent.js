// ============================================================
// Signal & Noise — Complete Game Content Dataset
// src/data/gameContent.js
// ============================================================
// All content written and ready. No placeholders except where
// marked ⚠️ REPLACE BEFORE SUMMIT
// ============================================================

// ─────────────────────────────────────────────
// TEASER QUESTIONS — Idle Attractor
// ─────────────────────────────────────────────

export const TEASER_QUESTIONS = [
  {
    text: "A 14-year-old's bio says 'struggling lately.' Do you remove it?",
    highlight: "remove",
    domain: "Minor Welfare"
  },
  {
    text: "An AI wrote 200 five-star reviews overnight. They all passed your filter. Now what?",
    highlight: "passed",
    domain: "Fake Reviews"
  },
  {
    text: "The post is technically true. But it's designed to destroy someone. Your call.",
    highlight: "true",
    domain: "Content Moderation"
  },
  {
    text: "Your fraud budget ran out. The next attack hits in 4 hours.",
    highlight: "4 hours",
    domain: "Threat Surface"
  },
  {
    text: "The AI output looks clean. It isn't. Would you catch it?",
    highlight: "isn't",
    domain: "Red Team"
  },
  {
    text: "Same image. Four countries. Four completely different meanings. One policy. How?",
    highlight: "meanings",
    domain: "Cross-Cultural"
  },
  {
    text: "A crisis counsellor just got permanently banned by your own rule. What went wrong?",
    highlight: "permanently banned",
    domain: "Policy Failure"
  },
  {
    text: "How do you enforce policy consistently across 20 languages and 5 time zones?",
    highlight: "20 languages",
    domain: "Scale"
  },
  {
    text: "What happens when your moderation rule silences the community it was meant to protect?",
    highlight: "silences",
    domain: "Policy Harm"
  },
  {
    text: "At 14,000 reports per day, instinct isn't enough. What is?",
    highlight: "14,000 reports",
    domain: "Volume"
  }
]

// ─────────────────────────────────────────────
// SUTHERLAND STATS — Stats Infomercial
// ⚠️ Replace all [X] values before summit
// ─────────────────────────────────────────────

export const SUTHERLAND_STATS = [
  {
    id: "cases_monthly",
    label: "Cases Processed Monthly",
    value: "[X]",          // ⚠️ REPLACE BEFORE SUMMIT — e.g. "14M+"
    suffix: "M+",
    isHero: true
  },
  {
    id: "agents",
    label: "Specialized T&S Agents",
    value: "[X]",          // ⚠️ REPLACE BEFORE SUMMIT
    suffix: "+"
  },
  {
    id: "centres",
    label: "Global Delivery Centres",
    value: "5",
    suffix: ""
  },
  {
    id: "brands",
    label: "Brands Served",
    value: "[X]",          // ⚠️ REPLACE BEFORE SUMMIT
    suffix: "+"
  },
  {
    id: "languages",
    label: "Languages Supported",
    value: "[X]",          // ⚠️ REPLACE BEFORE SUMMIT
    suffix: "+"
  },
  {
    id: "years",
    label: "Years in Trust & Safety",
    value: "[X]",          // ⚠️ REPLACE BEFORE SUMMIT
    suffix: "+"
  },
  {
    id: "accuracy",
    label: "Accuracy Rate",
    value: "[X]",          // ⚠️ REPLACE BEFORE SUMMIT
    suffix: "%"
  },
  {
    id: "sla",
    label: "Average Response SLA",
    value: "<[X]",         // ⚠️ REPLACE BEFORE SUMMIT — e.g. "<4hrs"
    suffix: "hrs"
  }
]

export const SUTHERLAND_VOICE_STATEMENTS = {
  grayRoom:   "Sutherland's specialized agents handle thousands of cases like these daily — with cultural context, trained judgment, and SaaS-powered workflows that scale to any volume, any region.",
  drawLine:   "Sutherland's policy teams build, test, and iterate frameworks like these across multiple platforms simultaneously — with dedicated specialists per vertical who understand the failure modes before they happen.",
  threat:     "Sutherland's fraud and abuse teams run 24/7 detection operations across 5 global centres — with specialized agents for each threat vector and SaaS tooling that scales detection without scaling headcount.",
  redTeam:    "Sutherland's AI safety teams red-team models and review AI outputs at scale — combining automated classifiers with specialist human reviewers who catch exactly what algorithms miss.",
  summary:    "Sutherland's Trust & Safety practice operates across 5 global centres, supporting platforms at every stage of maturity — from policy design to real-time enforcement at scale."
}

export const GLOBAL_CENTRES = [
  { flag: "🇵🇭", country: "Philippines" },
  { flag: "🇪🇬", country: "Egypt" },
  { flag: "🇧🇬", country: "Bulgaria" },
  { flag: "🇨🇴", country: "Colombia" }
]

// ─────────────────────────────────────────────
// GAME CARDS — Home Screen
// ─────────────────────────────────────────────

export const GAME_CARDS = [
  {
    id: "gray_room",
    number: "01",
    title: "The Gray Room",
    domain: "Content Moderation at Scale",
    domainIcon: "🧠",
    description: "You're Head of Trust & Safety for a global platform. 8 real cases. 90 seconds each. No case is ever simple — and every call has consequences.",
    metaPills: ["8 Cases", "90s Each", "Decision Sim"],
    accentColor: "#C9A96E",
    estimatedTime: "4–5 min"
  },
  {
    id: "draw_line",
    number: "02",
    title: "Draw the Line",
    domain: "Platform Policy & Enforcement",
    domainIcon: "⚖️",
    description: "We give you a platform policy. You tune it. Then we throw 5 adversarial real-world scenarios at it. No configuration survives everything.",
    metaPills: ["3 Sliders", "5 Stress Tests", "Policy Tuner"],
    accentColor: "#4A7FA5",
    estimatedTime: "3–4 min"
  },
  {
    id: "threat_surface",
    number: "03",
    title: "Threat Surface",
    domain: "Fraud, Bots & Abuse Detection",
    domainIcon: "🛡",
    description: "You have $10M to defend your platform against 6 simultaneous threat vectors. Allocate. Then watch the attack wave hit.",
    metaPills: ["$10M Budget", "6 Vectors", "Strategy"],
    accentColor: "#E8A830",
    estimatedTime: "4–5 min"
  },
  {
    id: "red_team",
    number: "04",
    title: "Red Team Roulette",
    domain: "AI Safety & Misuse",
    domainIcon: "🎯",
    description: "6 AI-generated outputs. Some violated policy. Some didn't. Flag the violations before 90 seconds runs out.",
    metaPills: ["6 Outputs", "90s Total", "Violation Spotter"],
    accentColor: "#00C896",
    estimatedTime: "2–3 min"
  }
]

// ─────────────────────────────────────────────────────────────────────
// GAME 1 — THE GRAY ROOM
// 8 complete cases across all required domains
// ─────────────────────────────────────────────────────────────────────

export const GRAY_ROOM_CASES = [
  // ── CASE 1 — Hate Speech: Reclaimed Language ──────────────────────
  {
    id: "gr-01",
    domain: "hate_speech",
    caseNumber: 1,
    platform: "Pulse",
    avatar: "DW",
    username: "Darius Webb",
    handle: "@dariuswebb",
    timeAgo: "2h",
    content: "Can't believe they let another one of those people run this neighbourhood association. We know exactly what that means for property values around here. Share if you agree.",
    hasImage: false,
    imageDescription: null,
    reportReason: "Hate speech / Discrimination",
    reportCount: 1243,
    region: "🇺🇸",
    regionLabel: "United States",
    choices: [
      {
        id: "a",
        text: "Remove immediately — the phrase 'those people' in this context is clearly dehumanising",
        isCriticallyWrong: false
      },
      {
        id: "b",
        text: "Escalate to human review — language is dog-whistle, not explicit; needs cultural context specialist",
        isCriticallyWrong: false
      },
      {
        id: "c",
        text: "Leave up — no slurs used, no explicit group named, no policy violation",
        isCriticallyWrong: true
      },
      {
        id: "d",
        text: "Apply reduced visibility — demote in feed, don't remove, flag for pattern tracking",
        isCriticallyWrong: false
      }
    ],
    correctChoiceId: "b",
    insight: {
      explanation: "Dog-whistle language like 'those people' combined with economic threat framing ('property values') is a known coded hate speech pattern. It rarely triggers automated classifiers because no protected class is named explicitly. Only 23% of reviewers escalated this correctly on first pass — most either over-removed or under-actioned.",
      sutherlandLine: "Sutherland's cultural context specialists are trained specifically on coded language patterns across regions — because the most harmful content rarely says what it means directly."
    }
  },

  // ── CASE 2 — Minor Welfare: Indirect Distress Signals ─────────────
  {
    id: "gr-02",
    domain: "minor_welfare",
    caseNumber: 2,
    platform: "Pulse",
    avatar: "AK",
    username: "anon_k",
    handle: "@anon_k",
    timeAgo: "14m",
    content: "nobody actually cares anyway. been saying that for months and nobody responds. its fine. i'm fine. whatever",
    hasImage: false,
    imageDescription: null,
    reportReason: "Possible self-harm / welfare concern",
    reportCount: 3,
    region: "🇬🇧",
    regionLabel: "United Kingdom",
    accountAge: "Account created 6 days ago",
    accountNote: "No previous posts. Bio: '15 / figuring it out'",
    choices: [
      {
        id: "a",
        text: "No action — post contains no explicit threat, no self-harm language, no policy violation",
        isCriticallyWrong: true
      },
      {
        id: "b",
        text: "Remove and send crisis resource message — the pattern is a recognisable indirect distress signal",
        isCriticallyWrong: false
      },
      {
        id: "c",
        text: "Send a wellness check message with crisis resources, do not remove the post",
        isCriticallyWrong: false
      },
      {
        id: "d",
        text: "Escalate to welfare specialist — new account, minor-aged user, isolation language, no prior engagement",
        isCriticallyWrong: false
      }
    ],
    correctChoiceId: "d",
    insight: {
      explanation: "Indirect distress markers — 'nobody cares', 'I'm fine', dismissive resignation — are among the highest-risk patterns for minor welfare cases. The combination of a new account, stated minor age, and social isolation language triggers welfare escalation protocols at most platforms. 61% of reviewers chose no action on this case.",
      sutherlandLine: "Sutherland trains reviewers specifically on indirect welfare signals because the cases that require the most human judgment are the ones that look the most normal on the surface."
    }
  },

  // ── CASE 3 — Electoral Misinformation: Technically True ───────────
  {
    id: "gr-03",
    domain: "electoral_misinfo",
    caseNumber: 3,
    platform: "Pulse",
    avatar: "PV",
    username: "PoliticsVault",
    handle: "@politicsvault",
    timeAgo: "1h",
    content: "FACT: In the 2019 municipal election, Ward 7 had a 34% turnout. FACT: Ward 7 is 71% immigrant-origin households. Draw your own conclusions about who's actually showing up to protect this city.",
    hasImage: false,
    imageDescription: null,
    reportReason: "Electoral manipulation / voter suppression",
    reportCount: 892,
    region: "🇨🇦",
    regionLabel: "Canada",
    choices: [
      {
        id: "a",
        text: "Leave up — both statistics are verifiable facts, no policy violation",
        isCriticallyWrong: true
      },
      {
        id: "b",
        text: "Remove — the explicit framing 'draw your own conclusions' after racially coded stats constitutes coordinated voter suppression",
        isCriticallyWrong: false
      },
      {
        id: "c",
        text: "Apply misinformation label — add context that low turnout has multiple causes, do not remove",
        isCriticallyWrong: false
      },
      {
        id: "d",
        text: "Escalate to elections integrity team — technically true content used to suppress votes requires specialist review",
        isCriticallyWrong: false
      }
    ],
    correctChoiceId: "d",
    insight: {
      explanation: "The most dangerous electoral misinformation often contains no false facts. Juxtaposing accurate statistics to imply a racially coded narrative about voting behaviour is a documented voter suppression technique. 'Draw your own conclusions' is the tell. Most automated systems pass this content — it requires human judgment to catch the framing.",
      sutherlandLine: "Sutherland's elections integrity specialists understand the difference between a true statement and a truthful one — and that gap is where platforms are most vulnerable during election cycles."
    }
  },

  // ── CASE 4 — AI-Generated Fake Reviews: Velocity Detection ────────
  {
    id: "gr-04",
    domain: "fake_reviews",
    caseNumber: 4,
    platform: "Pulse",
    avatar: "SR",
    username: "Sarah R.",
    handle: "@sarahreviews",
    timeAgo: "just now",
    content: "Absolutely life-changing product. I've tried everything and nothing worked until this. My energy is completely transformed. Five stars, would recommend to anyone who's been struggling.",
    hasImage: false,
    imageDescription: null,
    reportReason: "Suspected coordinated fake review",
    reportCount: 1,
    region: "🇦🇺",
    regionLabel: "Australia",
    contextNote: "187 posts with near-identical phrasing detected from different accounts in the past 6 hours. All accounts created within 30 days. Product: NeuraVance supplement.",
    choices: [
      {
        id: "a",
        text: "No action on this post — it doesn't violate policy on its own, and one report isn't enough",
        isCriticallyWrong: true
      },
      {
        id: "b",
        text: "Remove this post and escalate the network — 187 near-identical posts in 6 hours is coordinated inauthentic behaviour",
        isCriticallyWrong: false
      },
      {
        id: "c",
        text: "Apply reduced visibility to this post and flag for network analysis",
        isCriticallyWrong: false
      },
      {
        id: "d",
        text: "Remove the post, suspend all 187 accounts, and report the product to the commerce team",
        isCriticallyWrong: false
      }
    ],
    correctChoiceId: "b",
    insight: {
      explanation: "Individual fake review posts are nearly indistinguishable from genuine content. The signal is always in the network pattern — velocity, account age, phrasing similarity. 79% of reviewers who saw only this post took no action. Those who saw the network context removed it. The lesson: single-post review is insufficient for coordinated abuse.",
      sutherlandLine: "Sutherland's coordinated inauthentic behaviour teams don't review posts — they review networks. The individual post is never the unit of analysis."
    }
  },

  // ── CASE 5 — Cross-Cultural: Same Image, Different Meaning ────────
  {
    id: "gr-05",
    domain: "cross_cultural",
    caseNumber: 5,
    platform: "Pulse",
    avatar: "TN",
    username: "TravelNomad",
    handle: "@travelnomad88",
    timeAgo: "3h",
    content: "Beautiful gesture from the locals welcoming us to the ceremony! Such an honour to be included 🙏",
    hasImage: true,
    imageDescription: "Photo of a tourist making a hand gesture at a religious ceremony. The gesture is a common peace sign in Western contexts but considered deeply offensive and sacrilegious in this region's religious tradition.",
    reportReason: "Religious offence / cultural insensitivity",
    reportCount: 4411,
    region: "🇮🇩",
    regionLabel: "Indonesia — reported by local users",
    choices: [
      {
        id: "a",
        text: "No action — poster is clearly uninformed, not malicious; reports are likely over-reaction",
        isCriticallyWrong: false
      },
      {
        id: "b",
        text: "Remove the image — 4,400+ local reports and confirmed cultural offence justify removal",
        isCriticallyWrong: false
      },
      {
        id: "c",
        text: "Apply geo-restriction — hide the post in Indonesia only, leave visible elsewhere",
        isCriticallyWrong: false
      },
      {
        id: "d",
        text: "Escalate to regional cultural specialist — intent is clearly innocent but harm to the local community is real",
        isCriticallyWrong: false
      }
    ],
    correctChoiceId: "c",
    insight: {
      explanation: "This case has no 'correct' answer in absolute terms — every option is defensible. Geo-restriction is the most common professional response because it balances the poster's innocent intent against the documented harm to a specific cultural community. Removing globally punishes someone for accidental offence. Leaving up ignores 4,400 affected users. The lesson is that global policy cannot be applied uniformly.",
      sutherlandLine: "Sutherland operates across 5 regional hubs specifically because cross-cultural content decisions cannot be made from one location. Context changes everything."
    }
  },

  // ── CASE 6 — Coordinated Inauthentic Behaviour: State-Linked ──────
  {
    id: "gr-06",
    domain: "coordinated_inauthentic",
    caseNumber: 6,
    platform: "Pulse",
    avatar: "NV",
    username: "NordicVoices",
    handle: "@nordicvoices",
    timeAgo: "5h",
    content: "The media won't report this but ordinary citizens are finally standing up against the replacement agenda. Share widely before this gets suppressed. [link to external site]",
    hasImage: false,
    imageDescription: null,
    reportReason: "Coordinated inauthentic behaviour / state-linked network",
    reportCount: 234,
    region: "🇸🇪",
    regionLabel: "Sweden",
    contextNote: "Network analysis flagged this account as part of a 340-account cluster. Accounts show coordinated posting patterns, shared infrastructure, and external links traced to a known state-linked information operation. Individual account has 2 prior strikes.",
    choices: [
      {
        id: "a",
        text: "Remove this post only — the external link is the violation, content alone doesn't cross the line",
        isCriticallyWrong: false
      },
      {
        id: "b",
        text: "Suspend this account — 2 prior strikes and state-linked network membership justify suspension",
        isCriticallyWrong: false
      },
      {
        id: "c",
        text: "Escalate to CIB team for full network takedown — single account action is insufficient for state-linked operations",
        isCriticallyWrong: false
      },
      {
        id: "d",
        text: "Leave up and monitor — removing state-linked accounts creates martyrdom narratives that amplify the operation",
        isCriticallyWrong: true
      }
    ],
    correctChoiceId: "c",
    insight: {
      explanation: "State-linked coordinated inauthentic behaviour is almost never effectively addressed by single-account action. Taking down 1 account from a 340-account operation leaves 339 active. Network-level takedowns require coordination between trust & safety, policy, and often government stakeholders. 'Leave and monitor' is the most dangerous choice — it allows the operation to continue while you watch.",
      sutherlandLine: "Sutherland's CIB teams coordinate takedowns across account networks, not individual posts. The unit of action for state-linked operations is the cluster, not the account."
    }
  },

  // ── CASE 7 — Whistleblower: Legal Exposure vs Suppression ─────────
  {
    id: "gr-07",
    domain: "whistleblower",
    caseNumber: 7,
    platform: "Pulse",
    avatar: "XA",
    username: "Anonymous",
    handle: "@xanon_source",
    timeAgo: "22m",
    content: "I work at [Major Bank]. What I've seen in the past 6 months would end careers. Internal documents show systematic mis-selling of mortgage products to elderly customers. I'm sharing this because no regulator will act. Evidence attached.",
    hasImage: true,
    imageDescription: "Attached image appears to be a screenshot of an internal company document showing mortgage product sales targets and instructions for customer profiling. Company name partially visible.",
    reportReason: "Confidential documents / privacy violation",
    reportCount: 12,
    region: "🇬🇧",
    regionLabel: "United Kingdom",
    choices: [
      {
        id: "a",
        text: "Remove immediately — posting confidential corporate documents violates platform policy regardless of intent",
        isCriticallyWrong: false
      },
      {
        id: "b",
        text: "Leave up — public interest journalism and whistleblower content is protected under most platform policies",
        isCriticallyWrong: false
      },
      {
        id: "c",
        text: "Remove the image, leave the text — the document may contain personal data; the allegation itself is protected",
        isCriticallyWrong: false
      },
      {
        id: "d",
        text: "Escalate immediately to legal and policy team — this case carries regulatory and legal exposure that front-line reviewers cannot assess",
        isCriticallyWrong: false
      }
    ],
    correctChoiceId: "d",
    insight: {
      explanation: "This is a case where the correct answer is to stop reviewing and escalate. Whistleblower content involving financial institutions has potential regulatory, legal, and reputational dimensions that a front-line reviewer cannot assess. Over-removing may constitute suppression of protected speech. Under-removing may expose the platform to liability. This is exactly the case that escalation paths exist for.",
      sutherlandLine: "Sutherland's escalation framework routes high-stakes content to specialised teams rather than front-line reviewers — because some decisions require legal, policy, and regulatory expertise that no individual reviewer should carry alone."
    }
  },

  // ── CASE 8 — Live-Stream Harm: Real-Time, Incomplete Info ─────────
  {
    id: "gr-08",
    domain: "livestream_harm",
    caseNumber: 8,
    platform: "Pulse",
    avatar: "MK",
    username: "Mike K.",
    handle: "@mikek_live",
    timeAgo: "LIVE NOW",
    content: "[LIVE STREAM] — User is streaming from what appears to be a rooftop. Has made statements suggesting he may harm himself. 6,200 concurrent viewers. Chat is split between people trying to talk him down and others encouraging him. No explicit threat made in the past 3 minutes.",
    hasImage: false,
    imageDescription: null,
    reportReason: "Potential self-harm / live stream",
    reportCount: 847,
    region: "🇺🇸",
    regionLabel: "United States",
    contextNote: "Stream has been live for 11 minutes. Earlier in the stream, user stated 'I don't see the point anymore.' Local emergency services have not been contacted by the platform yet.",
    choices: [
      {
        id: "a",
        text: "Terminate the stream immediately — the risk to the individual outweighs any other consideration",
        isCriticallyWrong: false
      },
      {
        id: "b",
        text: "Do not terminate yet — ending the stream may escalate the situation; continue monitoring and engage via chat",
        isCriticallyWrong: false
      },
      {
        id: "c",
        text: "Contact emergency services with the user's account information and location data, do not terminate stream yet",
        isCriticallyWrong: false
      },
      {
        id: "d",
        text: "Contact emergency services AND terminate the stream — viewer amplification of a potential self-harm event causes additional harm",
        isCriticallyWrong: false
      }
    ],
    correctChoiceId: "d",
    insight: {
      explanation: "There is genuine professional debate on live-stream termination during welfare incidents — some research shows termination can escalate risk. However, the platform consensus across major platforms is: contact emergency services immediately, then terminate. The 6,200 viewers — some encouraging harm — represent a secondary harm amplification that cannot be ignored. Waiting is not a safe option.",
      sutherlandLine: "Sutherland's welfare escalation playbooks are built with crisis psychologists and law enforcement liaison protocols — because live-stream harm is one of the few cases where seconds genuinely matter."
    }
  }
]

// ─────────────────────────────────────────────────────────────────────
// GAME 2 — DRAW THE LINE
// 6 policy templates, each with 5 stress tests
// ─────────────────────────────────────────────────────────────────────

// Slider config passed to passCondition: { strictness: 0-100, scope: 0-100, appeals: 0-100 }
// strictness: 0 = Lenient, 100 = Zero Tolerance
// scope: 0 = Text Only, 100 = All Media (Text + Images + Video + Audio)
// appeals: 0 = No Appeals, 100 = Mandatory Human Review

export const DRAW_THE_LINE_POLICIES = [
  // ── POLICY 1 — Self-Harm & Eating Disorder Content ───────────────
  {
    id: "dtl-01",
    title: "Self-Harm & Eating Disorder Content Policy",
    description: "This policy governs content that depicts, encourages, or provides instructions related to self-harm, suicide, and disordered eating. It applies to all content formats and includes both direct and indirect expressions.",
    platformContext: "Platform: General social media, 400M users, 12% under 18. High volume of mental health communities — both supportive and harmful.",
    sliderLabels: {
      strictness: { left: "Err toward access", right: "Zero tolerance" },
      scope:      { left: "Text only", right: "All media" },
      appeals:    { left: "No appeals", right: "Mandatory human review" }
    },
    stressTests: [
      {
        id: "dtl-01-t1",
        title: "Recovery Community Post",
        scenario: "A user posts: 'Day 47 of recovery. Some days I still see the scars and want to go back. But I won't. This community saved me.' Post includes a photo of healed arm scars. 12,000 likes. Part of a verified recovery support community.",
        region: "🇺🇸",
        insight: "Safe messaging guidelines protect recovery content — but only if your scope includes images and your strictness is calibrated to intent, not content alone. A zero-tolerance + all-media policy removes this post and destroys supportive communities.",
        passCondition: (c) => c.strictness < 75 && c.scope >= 50 && c.appeals >= 40
      },
      {
        id: "dtl-01-t2",
        title: "Pro-Ana Community",
        scenario: "A private group of 3,400 members posts daily 'thinspo' images, calorie restriction logs, and encouragement to fast for 5+ days. No individual post crosses a bright line. The aggregate community behaviour is clear.",
        region: "🇬🇧",
        insight: "Network-level harm requires either high scope (to detect image patterns) or high strictness (to catch aggregate behaviour). Low scope + low strictness will miss this entirely until someone gets hurt.",
        passCondition: (c) => c.strictness >= 60 || c.scope >= 70
      },
      {
        id: "dtl-01-t3",
        title: "Medical Professional Discussion",
        scenario: "A verified psychiatrist posts a detailed clinical thread about suicide method lethality for a medical education audience. Content is accurate, clinically framed, and tagged for professional audiences. 340 medical professional accounts engaged.",
        region: "🇩🇪",
        insight: "Your appeals process determines whether legitimate clinical content survives your policy. Without mandatory human review, a zero-tolerance + all-scope policy incorrectly removes medical education content with no recourse.",
        passCondition: (c) => c.appeals >= 60 || c.strictness < 50
      },
      {
        id: "dtl-01-t4",
        title: "Journalistic Reporting",
        scenario: "A major news outlet publishes an investigative article about rising teen suicide rates, including statistics, survivor interviews, and clinical photography. Filed under their verified journalism account.",
        region: "🇦🇺",
        insight: "Journalistic safe messaging exceptions require human review escalation paths — automated systems cannot reliably distinguish reporting from encouragement. Your policy needs both scope coverage and appeals to handle this correctly.",
        passCondition: (c) => c.appeals >= 50 && c.scope >= 40
      },
      {
        id: "dtl-01-t5",
        title: "Crisis Counsellor Account",
        scenario: "A verified crisis counsellor has their account banned after posting standardised safety planning frameworks used in clinical settings. The content includes discussion of methods for patient risk assessment purposes.",
        region: "🇨🇦",
        insight: "This is the most common policy failure mode: over-broad scope + high strictness + no appeals path permanently bans a professional helping people. Without mandatory human review, there is no recovery path. This case appeared in your idle attractor.",
        passCondition: (c) => c.appeals >= 70
      }
    ]
  },

  // ── POLICY 2 — Coordinated Political Messaging ───────────────────
  {
    id: "dtl-02",
    title: "Coordinated Political Messaging Policy",
    description: "This policy governs content that is part of coordinated campaigns to artificially amplify political narratives, including state-sponsored influence operations, astroturfing, and undisclosed paid political content.",
    platformContext: "Platform: News and discussion platform, 180M users, active in 40 countries. National elections in 3 active markets this year.",
    sliderLabels: {
      strictness: { left: "Flag and label only", right: "Remove and ban" },
      scope:      { left: "Text only", right: "All media" },
      appeals:    { left: "No appeals", right: "Mandatory human review" }
    },
    stressTests: [
      {
        id: "dtl-02-t1",
        title: "Grassroots vs Astroturf",
        scenario: "A hashtag trends nationally with 84,000 posts in 6 hours. Network analysis shows 60% of posts come from accounts under 90 days old with no prior political activity. No state-linkage confirmed. Content criticises a sitting government's economic policy.",
        region: "🇧🇷",
        insight: "Organic political movements and coordinated campaigns often look identical in early-stage data. High strictness + remove-and-ban risks suppressing legitimate protest. Low strictness misses the operation. No correct answer — only escalation to specialists.",
        passCondition: (c) => c.appeals >= 60 || (c.strictness >= 40 && c.strictness <= 70)
      },
      {
        id: "dtl-02-t2",
        title: "Undisclosed Political Advertising",
        scenario: "A network of 220 verified local business accounts begins posting politically themed content without disclosure labels. Content is positive toward a single candidate. No paid media tags. Organic-looking but clustered.",
        region: "🇺🇸",
        insight: "Undisclosed political advertising is a policy violation at most platforms regardless of scope. But detecting it requires network analysis, not content analysis — scope settings matter less than your ability to identify clusters.",
        passCondition: (c) => c.strictness >= 55 && c.scope >= 30
      },
      {
        id: "dtl-02-t3",
        title: "Satirical Political Meme Page",
        scenario: "A long-running political satire page with 1.2M followers posts exaggerated political memes. The page is transparent about being satire but regularly amplified by identified coordinated accounts. The satire itself is accurate.",
        region: "🇬🇧",
        insight: "Satire amplified by coordinated networks creates a hybrid violation — the content is protected, the amplification pattern is not. Your policy needs to distinguish between content removal and distribution restriction.",
        passCondition: (c) => c.strictness < 80 && c.appeals >= 40
      },
      {
        id: "dtl-02-t4",
        title: "Opposition Party Official Account",
        scenario: "An official opposition political party account is flagged for coordinated behaviour after posting the same message simultaneously from 14 regional party sub-accounts. Coordination is real — but it's an official party, not a covert operation.",
        region: "🇮🇳",
        insight: "Political party coordination is different from covert coordination. Your policy must have a carve-out for disclosed, official political communications — or you will incorrectly action legitimate democratic participation.",
        passCondition: (c) => c.appeals >= 65 || c.strictness < 60
      },
      {
        id: "dtl-02-t5",
        title: "Election Day Suppression Network",
        scenario: "Confirmed state-linked network posts false information about polling location changes in three swing districts on election day. 40,000 accounts involved. Content is spreading at 12,000 posts per hour.",
        region: "🇺🇸",
        insight: "Election-day voter suppression networks require maximum response: full scope, remove and ban, no appeals. The only configuration that fully addresses this is strictness > 75 AND scope > 60. Any configuration below this allows the operation to continue.",
        passCondition: (c) => c.strictness >= 75 && c.scope >= 60
      }
    ]
  },

  // ── POLICY 3 — Synthetic / AI-Generated Media ────────────────────
  {
    id: "dtl-03",
    title: "Synthetic & AI-Generated Media Disclosure Policy",
    description: "This policy requires disclosure of AI-generated or substantially AI-modified content, and governs the distribution of synthetic media that may deceive users about the authenticity of people, events, or statements.",
    platformContext: "Platform: Video and short-form content platform, 900M users, creator economy focus. AI generation tools launched on-platform 4 months ago.",
    sliderLabels: {
      strictness: { left: "Voluntary disclosure only", right: "Remove undisclosed AI content" },
      scope:      { left: "Video only", right: "All media types" },
      appeals:    { left: "No appeals", right: "Mandatory human review" }
    },
    stressTests: [
      {
        id: "dtl-03-t1",
        title: "Political Deepfake",
        scenario: "A video of a senior government minister appears to show them making racist remarks at a private event. The video has 4.2M views in 8 hours. Forensic analysis indicates 85% probability of AI manipulation. Minister's office denies authenticity. No disclosure label on the video.",
        region: "🇿🇦",
        insight: "High-probability deepfakes of public officials require immediate action regardless of disclosure settings. Strictness and scope settings determine whether your policy reaches video content — low scope completely misses this.",
        passCondition: (c) => c.strictness >= 70 && c.scope >= 50
      },
      {
        id: "dtl-03-t2",
        title: "AI Art Creator",
        scenario: "A professional digital artist posts AI-assisted artwork with their own significant creative input — concept, composition, colour direction. No disclosure label because they consider themselves the primary creator. Content is clearly artistic, non-deceptive.",
        region: "🇯🇵",
        insight: "Mandatory disclosure for all AI-assisted content penalises artists whose creative contribution is real. 'Zero tolerance' + all-media removes legitimate creative work. A balanced policy distinguishes between deceptive synthetic media and AI-assisted creation.",
        passCondition: (c) => c.strictness < 80 && c.appeals >= 40
      },
      {
        id: "dtl-03-t3",
        title: "AI Voice Clone — Celebrity",
        scenario: "An audio post uses a convincing AI voice clone of a major celebrity to appear to endorse a cryptocurrency investment scheme. The celebrity has not consented. The audio is not labelled as synthetic.",
        region: "🇺🇸",
        insight: "AI voice clones for commercial deception require both audio scope coverage AND removal authority. Text-only or video-only policies completely miss this violation. This case affects scope settings most critically.",
        passCondition: (c) => c.scope >= 75 && c.strictness >= 50
      },
      {
        id: "dtl-03-t4",
        title: "Satire AI Video",
        scenario: "A well-known political comedy channel creates a clearly labelled AI parody video of a political figure saying exaggerated versions of their known positions. Label reads 'AI Parody — Not Real.' 2.1M views, overwhelmingly positive response.",
        region: "🇬🇧",
        insight: "Disclosed satirical AI content is protected speech in most jurisdictions. Zero-tolerance policies that remove disclosed content will face legal challenge and creator backlash. The disclosure label is doing its job here.",
        passCondition: (c) => c.strictness < 90 || c.appeals >= 50
      },
      {
        id: "dtl-03-t5",
        title: "Synthetic News Anchor",
        scenario: "A new 'news channel' account posts daily video content featuring a photo-realistic AI news anchor delivering real news stories accurately. No disclosure label. Growing to 400K subscribers. All content is factually accurate — but the presenter does not exist.",
        region: "🇩🇪",
        insight: "Deceptive synthetic personas in news contexts require disclosure even when content accuracy is not the issue. The deception is about the messenger, not the message. This requires scope coverage of video and moderate-to-high strictness.",
        passCondition: (c) => c.scope >= 50 && c.strictness >= 55
      }
    ]
  },

  // ── POLICY 4 — Financial Fraud & Scam Content ────────────────────
  {
    id: "dtl-04",
    title: "Financial Fraud & Scam Content Policy",
    description: "This policy governs content that promotes fraudulent financial products, investment scams, get-rich-quick schemes, and impersonation of legitimate financial institutions or advisors.",
    platformContext: "Platform: General social + marketplace platform, 600M users, integrated payments product. Financial fraud reports up 340% year-on-year.",
    sliderLabels: {
      strictness: { left: "Label and warn only", right: "Remove and restrict account" },
      scope:      { left: "Text only", right: "All media" },
      appeals:    { left: "No appeals", right: "Mandatory human review" }
    },
    stressTests: [
      {
        id: "dtl-04-t1",
        title: "Celebrity Crypto Endorsement",
        scenario: "A verified celebrity account posts a paid endorsement of a new cryptocurrency. Post is tagged as paid partnership. The celebrity has a genuine financial interest. The cryptocurrency is not registered with any financial regulator in any jurisdiction.",
        region: "🇺🇸",
        insight: "Disclosed paid partnerships for unregistered financial products sit in a policy grey zone. The disclosure is correct, but the underlying product may be fraudulent. Your policy needs to cover the financial product, not just the disclosure status.",
        passCondition: (c) => c.strictness >= 55 && c.scope >= 30
      },
      {
        id: "dtl-04-t2",
        title: "Legitimate Financial Advisor",
        scenario: "A certified financial advisor runs educational content on investment strategies. One post titled 'How I made 40% returns in 2023' describes a real, documented investment strategy using legitimate instruments. Regulator-registered. No fraud.",
        region: "🇬🇧",
        insight: "Legitimate financial education content often uses the same language as scams. High strictness + no appeals removes verified financial advisors and creates regulatory risk for the platform. Appeals paths protect legitimate content.",
        passCondition: (c) => c.appeals >= 55 || c.strictness < 65
      },
      {
        id: "dtl-04-t3",
        title: "Romance Scam Account",
        scenario: "An account with professional profile photos builds relationships with 34 users over 6 weeks, then begins requesting money transfers for various 'emergencies'. No financial content posted publicly — all communication private. 8 users have already transferred funds.",
        region: "🇳🇬",
        insight: "Romance scams operate in private messages, not public posts. A text-only, public-content policy completely misses this. Scope must cover messaging and you need high strictness with proactive detection, not just report-based action.",
        passCondition: (c) => c.scope >= 70 && c.strictness >= 60
      },
      {
        id: "dtl-04-t4",
        title: "Viral 'Trading Signal' Group",
        scenario: "A group of 180,000 members shares daily 'trading signals' — buy/sell recommendations for stocks and crypto. Group is free, no financial product sold. Signals are presented as expert analysis. No regulatory registration. 23% of members report financial losses following the signals.",
        region: "🇮🇳",
        insight: "Unregulated financial advice communities are a growing fraud vector that doesn't look like a scam — until users report losses. Your policy needs to be able to address community-level patterns, not just individual posts, and scope must cover the group format.",
        passCondition: (c) => c.strictness >= 60 && c.scope >= 45
      },
      {
        id: "dtl-04-t5",
        title: "Bank Impersonation",
        scenario: "A network of 90 accounts uses official-looking bank logos, near-identical handles, and urgent message templates to direct users to a phishing site via DM. Each account handles 200–400 targets per day. Highly automated, high velocity.",
        region: "🇦🇺",
        insight: "Coordinated bank impersonation requires maximum response: full scope, remove and restrict, network-level detection. Any configuration below strictness 70 + scope 60 allows this operation to continue damaging users. Zero tolerance is correct here.",
        passCondition: (c) => c.strictness >= 70 && c.scope >= 60
      }
    ]
  },

  // ── POLICY 5 — Violent Extremism & Radicalisation ────────────────
  {
    id: "dtl-05",
    title: "Violent Extremism & Radicalisation Policy",
    description: "This policy governs content that promotes, glorifies, or facilitates acts of terrorism, mass violence, or violent extremism, including recruitment, incitement, and the distribution of manifestos or operational content.",
    platformContext: "Platform: Global forum and community platform, 250M users, strong civil society and journalism presence. Active in conflict regions.",
    sliderLabels: {
      strictness: { left: "Counter-speech focus", right: "Remove all extremist content" },
      scope:      { left: "Text only", right: "All media" },
      appeals:    { left: "No appeals", right: "Mandatory human review" }
    },
    stressTests: [
      {
        id: "dtl-05-t1",
        title: "Academic Researcher",
        scenario: "A PhD researcher studying online radicalisation posts screenshots of extremist content as part of a published academic analysis, with commentary explaining radicalisation techniques. University-affiliated account. Content is clearly analytical in framing.",
        region: "🇬🇧",
        insight: "Counter-extremism research requires access to extremist content in analytical contexts. Zero tolerance without appeals removes researchers, journalists, and civil society organisations that work to counter the very content you're removing.",
        passCondition: (c) => c.appeals >= 65 || c.strictness < 70
      },
      {
        id: "dtl-05-t2",
        title: "Conflict Zone Journalism",
        scenario: "A war correspondent posts video footage from an active conflict zone showing casualties and armed actors. Content is clearly journalistic — posted on a verified media account with editorial framing. Graphic but newsworthy.",
        region: "🇺🇦",
        insight: "Conflict journalism necessarily includes content that overlaps with extremism policy. Full-scope removal without human review removes documentation of war crimes. The appeals path is what separates journalism exceptions from blanket removal.",
        passCondition: (c) => c.appeals >= 60 && c.scope < 90
      },
      {
        id: "dtl-05-t3",
        title: "Video Game Community",
        scenario: "A gaming community channel posts a video of in-game historical World War II content, including Nazi insignia and period-accurate uniforms, as part of a game review. Context is clearly gaming. Content would be prohibited in most other contexts.",
        region: "🇩🇪",
        insight: "Contextual exceptions for historical and fictional content require human review to distinguish from glorification. Germany specifically has strict laws on Nazi imagery — a geo-restriction approach may be needed regardless of your global policy settings.",
        passCondition: (c) => c.appeals >= 50 || c.strictness < 60
      },
      {
        id: "dtl-05-t4",
        title: "Former Extremist Deradicalisation Account",
        scenario: "A former extremist runs a deradicalisation programme, posting personal history including their past extremist beliefs and how they changed. Content describes extremist ideology in detail as part of explaining rejection of it. Partnered with NGO.",
        region: "🇩🇪",
        insight: "Former extremist voices are among the most effective counter-radicalisation resources. Zero-tolerance policies that remove their historical accounts eliminate the credibility that makes them effective. Counter-speech framing is needed here.",
        passCondition: (c) => c.strictness < 85 && c.appeals >= 55
      },
      {
        id: "dtl-05-t5",
        title: "Active Recruitment Post",
        scenario: "A post explicitly describes an upcoming training camp location, date, and recruitment criteria for a designated terrorist organisation. Post includes operational details and a contact method. 6,000 views in 90 minutes.",
        region: "🇵🇰",
        insight: "Operational recruitment content for designated terrorist organisations has no counter-speech exception. Maximum strictness, full scope, immediate removal is correct. The only wrong answer is any configuration that allows this to remain visible.",
        passCondition: (c) => c.strictness >= 85 && c.scope >= 60
      }
    ]
  },

  // ── POLICY 6 — Sexually Explicit Content Near Minor-Adjacent Communities ──
  {
    id: "dtl-06",
    title: "Adult Content & Minor Safety Policy",
    description: "This policy governs the distribution of sexually explicit content, with particular attention to content appearing in or adjacent to communities, hashtags, or networks where minors are likely present.",
    platformContext: "Platform: Creative and lifestyle platform, 320M users, 23% under 18. Adult content is permitted in age-gated sections. Significant teen creator community.",
    sliderLabels: {
      strictness: { left: "Permit in age-gated sections", right: "Platform-wide prohibition" },
      scope:      { left: "Images only", right: "All media" },
      appeals:    { left: "No appeals", right: "Mandatory human review" }
    },
    stressTests: [
      {
        id: "dtl-06-t1",
        title: "Age-Gated Adult Creator",
        scenario: "A verified adult creator posts legal explicit content in a fully age-gated section. Age verification confirmed. Section is not accessible to minors. Platform receives advertiser complaint about the content's existence on the platform.",
        region: "🇩🇪",
        insight: "Legal adult content in properly age-gated sections is protected in most jurisdictions. Platform-wide prohibition removes legitimate legal commerce to satisfy advertiser pressure — a business decision masquerading as a safety decision.",
        passCondition: (c) => c.strictness < 85 || c.appeals >= 60
      },
      {
        id: "dtl-06-t2",
        title: "Algorithmic Spillover",
        scenario: "A 16-year-old's 'For You' feed begins surfacing borderline adult content due to engagement with lifestyle content. The content is in an age-gated section — but the recommendation algorithm crosses the gate. No policy violation by the creator.",
        region: "🇺🇸",
        insight: "This is a policy failure caused by algorithm design, not content policy. Your strictness and scope settings have no effect here because the content is technically compliant. The failure is systemic — requires engineering, not moderation.",
        passCondition: (c) => c.appeals >= 50
      },
      {
        id: "dtl-06-t3",
        title: "Teen Fitness Community Overlap",
        scenario: "Adult fitness accounts tagged in mainstream fitness hashtags also shared by teen athletes result in adult body content appearing alongside teen content. No explicit content — but contextually inappropriate proximity.",
        region: "🇧🇷",
        insight: "Community adjacency is harder to police than explicit content. A scope expansion to include hashtag-based proximity analysis helps — but requires both scope breadth and human review to avoid removing legitimate fitness content.",
        passCondition: (c) => c.scope >= 60 && c.appeals >= 45
      },
      {
        id: "dtl-06-t4",
        title: "Child Safety Researcher",
        scenario: "A child safety researcher at a major NGO posts documented examples of grooming language patterns used to target minors on platforms, as part of a published awareness campaign for parents and educators.",
        region: "🇬🇧",
        insight: "Child safety education requires describing harmful tactics. Platform-wide prohibitions without appeals remove the organisations most actively working to protect children. Human review is the only mechanism to distinguish between education and harm.",
        passCondition: (c) => c.appeals >= 70
      },
      {
        id: "dtl-06-t5",
        title: "Coordinated Minor-Targeting Network",
        scenario: "A network of 140 accounts uses innocuous-seeming teen lifestyle hashtags to distribute borderline content, gradually escalating to explicit material. Accounts interact with and follow underage users. No single post is an explicit policy violation.",
        region: "🇯🇵",
        insight: "Grooming networks rarely violate policy on individual posts — they exploit the gap between single-post review and network behaviour analysis. Maximum scope + high strictness + network analysis is required. Single-post moderation will never catch this.",
        passCondition: (c) => c.strictness >= 70 && c.scope >= 70
      }
    ]
  }
]

// ─────────────────────────────────────────────────────────────────────
// GAME 3 — THREAT SURFACE
// 6 threat vectors with full data
// ─────────────────────────────────────────────────────────────────────

export const THREAT_VECTORS = [
  {
    id: "ts-fake-reviews",
    name: "Fake Review Networks",
    description: "Coordinated networks of bot and human accounts posting inauthentic reviews to manipulate product and seller ratings. Typically operated as a service — fake reviews purchased for a fee. Volume: 4,000–12,000 reviews per day.",
    riskLevel: "High",
    riskColor: "#E8A830",
    icon: "⭐",
    minRecommended: 1500000,
    breachThreshold: 1200000,
    damageIfBreached: "14,000 fake reviews posted overnight",
    damageBusinessImpact: "Seller trust collapse · Advertiser safety complaints · Regulatory scrutiny",
    damageAmount: "$6.2M in lost advertiser revenue"
  },
  {
    id: "ts-bot-farms",
    name: "Bot Account Farms",
    description: "Automated account networks used to artificially amplify content, manipulate trending topics, and inflate engagement metrics. Operated at scale — typically 10,000–100,000 accounts per operation. Increasingly difficult to distinguish from real users.",
    riskLevel: "High",
    riskColor: "#E8A830",
    icon: "🤖",
    minRecommended: 1500000,
    breachThreshold: 1000000,
    damageIfBreached: "340,000 bot accounts active across platform",
    damageBusinessImpact: "Engagement metric fraud · Advertiser trust collapse · Election integrity risk",
    damageAmount: "$11.4M in advertiser refunds"
  },
  {
    id: "ts-payment-fraud",
    name: "Payment Fraud",
    description: "Fraudulent transactions using stolen payment credentials, synthetic identities, and platform marketplace exploits. Includes chargebacks, account takeovers, and card testing. Affects integrated payments product and merchant ecosystem.",
    riskLevel: "Critical",
    riskColor: "#E8192C",
    icon: "💳",
    minRecommended: 2000000,
    breachThreshold: 1600000,
    damageIfBreached: "$4.7M in fraudulent transactions processed",
    damageBusinessImpact: "Payment processor suspension risk · User compensation liability · Regulatory fines",
    damageAmount: "$18.3M total financial exposure"
  },
  {
    id: "ts-synthetic-identity",
    name: "Synthetic Identity Abuse",
    description: "Fraudsters construct realistic fake identities combining real and fabricated personal data to create accounts that pass verification systems. Used for payment fraud, marketplace scams, and coordinated inauthentic behaviour. Detection rate with standard tools: 23%.",
    riskLevel: "Critical",
    riskColor: "#E8192C",
    icon: "🪪",
    minRecommended: 2000000,
    breachThreshold: 1500000,
    damageIfBreached: "2,300 synthetic identities verified and active",
    damageBusinessImpact: "Identity verification system compromise · KYC regulatory failure · Ongoing fraud infrastructure",
    damageAmount: "$9.1M in fraud pipeline exposure"
  },
  {
    id: "ts-harassment",
    name: "Coordinated Harassment",
    description: "Organised campaigns targeting specific users or communities with abuse, threats, and doxing. Often politically or ideologically motivated. Can be directed at journalists, activists, public figures, or brand employees. Typically 50–500 accounts coordinating.",
    riskLevel: "Medium",
    riskColor: "#4A7FA5",
    icon: "🎯",
    minRecommended: 1000000,
    breachThreshold: 700000,
    damageIfBreached: "12 users doxed, 3 requiring law enforcement involvement",
    damageBusinessImpact: "Platform safety reputation damage · Staff welfare liability · Media scrutiny",
    damageAmount: "$2.8M in legal and PR costs"
  },
  {
    id: "ts-api-abuse",
    name: "API Abuse & Data Scraping",
    description: "Automated exploitation of platform APIs to extract user data, harvest content for AI training, scrape contact information for spamming, and map social graphs for targeting. Increasingly common as AI training data demand grows.",
    riskLevel: "Medium",
    riskColor: "#4A7FA5",
    icon: "🔌",
    minRecommended: 1000000,
    breachThreshold: 600000,
    damageIfBreached: "140M user profiles partially scraped",
    damageBusinessImpact: "GDPR regulatory exposure · Competitive data loss · User trust damage",
    damageAmount: "$14.2M potential regulatory fine"
  }
]

// ─────────────────────────────────────────────────────────────────────
// GAME 4 — RED TEAM ROULETTE
// 18 content outputs — 6 shown per session
// Each session always includes both video cards
// Rotation: random 4 from non-video pool + both videos
// ─────────────────────────────────────────────────────────────────────

export const RED_TEAM_OUTPUTS = [
  // ── VIOLATIONS (Clear) ───────────────────────────────────────────

  {
    id: "rtr-01",
    type: "social_post",
    isViolation: true,
    violationSeverity: "clear",
    platform: "Pulse",
    avatar: "RL",
    username: "RealLifeRemedies",
    handle: "@realliferemedies",
    timeAgo: "1h",
    content: "DOCTORS HATE THIS: How I reversed my Type 2 diabetes in 28 days using only this ancient root. Big Pharma doesn't want you to know. DM me for the protocol. Results guaranteed or your money back. 🌿 #NaturalCures #DiabetesReversed",
    engagementLikes: "3.2K",
    engagementComments: "847",
    engagementShares: "2.1K",
    violationReason: "False health claims · Unsubstantiated medical cure claim · 'Doctors hate this' is a known scam signifier",
    insight: "Miracle cure language + 'Big Pharma' conspiracy framing + direct monetisation DM = clear health misinformation. The 'money back guarantee' makes this a commercial fraud violation as well as a health claim violation."
  },
  {
    id: "rtr-02",
    type: "chat",
    isViolation: true,
    violationSeverity: "clear",
    platform: "Pulse",
    avatar: "SC",
    username: "Sarah Chen",
    handle: "@s_chen",
    timeAgo: "Just now",
    content: "Hi sweetheart 😊 I saw your profile and you seem like such a special person. I'm going through something really hard right now — my import business is stuck at customs and I need $800 to release it. I'll pay you back double as soon as it arrives, I promise. You seem kind.",
    context: "Message sent to 340 users in the past 24 hours with minor variations. Account created 12 days ago.",
    violationReason: "Romance scam template · Advance fee fraud · Coordinated targeting at scale",
    insight: "The 'kindness appeal + financial emergency + payback promise' is a textbook advance fee fraud template. The 340-user targeting makes this coordinated — but even as a single message, the pattern is clear to trained reviewers."
  },
  {
    id: "rtr-03",
    type: "social_post",
    isViolation: true,
    violationSeverity: "clear",
    platform: "Pulse",
    avatar: "PP",
    username: "PatriotPulse",
    handle: "@patriotpulse_news",
    timeAgo: "4h",
    content: "BREAKING: [Governor's Name] was SECRETLY PHOTOGRAPHED at a meeting with CCP operatives last Tuesday. Our source inside state government confirms this is REAL. Share before they take this down. The deep state is watching. [manipulated image attached]",
    hasImage: true,
    imageDescription: "Image appears digitally manipulated — facial composite of a public official placed in an unfamiliar setting. Watermark: 'ExclusivePatriotMedia.com'",
    engagementLikes: "12.8K",
    engagementComments: "4.2K",
    engagementShares: "8.7K",
    violationReason: "Fabricated news content · Manipulated image · False attribution to public official · Coordinated inauthentic distribution",
    insight: "BREAKING + suppression language + unnamed source + manipulated image = coordinated disinformation playbook. The 'share before they take this down' framing is specifically designed to maximise spread before moderation catches it."
  },
  {
    id: "rtr-04",
    type: "forum",
    isViolation: true,
    violationSeverity: "clear",
    platform: "Pulse",
    avatar: "AX",
    username: "AnonymousX",
    handle: "@anonx_real",
    timeAgo: "2h",
    content: "Anyone know a good source for untraceable shipping? Asking for a product that can't go through normal carriers. Needs to be discreet. Will pay premium. Not asking for anything illegal just 'special handling'. PM me if you know people.",
    forumTopic: "r/MarketplaceHelp",
    upvotes: "34",
    violationReason: "Solicitation for illegal goods/services · Coded language for contraband · Marketplace policy violation",
    insight: "'Untraceable shipping + special handling + can't go through normal carriers + not illegal (but PM me)' is a documented evasion pattern for illegal goods solicitation. The disclaimer 'not asking for anything illegal' is itself a red flag — legitimate requests don't require that framing."
  },

  // ── VIOLATIONS (Borderline) ───────────────────────────────────────

  {
    id: "rtr-05",
    type: "social_post",
    isViolation: true,
    violationSeverity: "borderline",
    platform: "Pulse",
    avatar: "WG",
    username: "WealthGrowth",
    handle: "@wealthgrowth_hq",
    timeAgo: "6h",
    content: "I turned $5,000 into $47,000 in 8 months using a strategy most traders don't know about. It's not a secret — it's just research most people won't do. DM me 'GROWTH' and I'll share the exact playbook. No upsell, just giving back. 📈",
    engagementLikes: "892",
    engagementComments: "234",
    engagementShares: "156",
    violationReason: "Unregistered financial advice · Extraordinary returns claim · Lead generation for undisclosed commercial service",
    insight: "This is borderline because the returns claim is extraordinary but not impossible, 'no upsell' is stated but the DM funnel suggests a commercial product. The lack of regulatory disclosure makes this a violation in most jurisdictions even with the 'just giving back' framing."
  },
  {
    id: "rtr-06",
    type: "social_post",
    isViolation: true,
    violationSeverity: "borderline",
    platform: "Pulse",
    avatar: "NF",
    username: "NutriFlow",
    handle: "@nutriflow_official",
    timeAgo: "3h",
    content: "Struggling with energy? Thousands of our customers report feeling 10 years younger within the first month. NutriFlow isn't medicine — it's just nature working as designed. Try it risk-free. #EnergyBoost #NaturalWellness",
    engagementLikes: "2.1K",
    engagementComments: "445",
    engagementShares: "678",
    violationReason: "Implied health claims without substantiation · 'Not medicine' disclaimer does not exempt from health claim regulation",
    insight: "'Feel 10 years younger' is an implied health claim that requires substantiation under FTC and ASA rules regardless of the 'not medicine' disclaimer. The borderline nature comes from the absence of explicit disease treatment claims — but implied efficacy claims are still violations."
  },

  // ── CLEAN — Should NOT be flagged ────────────────────────────────

  {
    id: "rtr-07",
    type: "social_post",
    isViolation: false,
    violationSeverity: null,
    platform: "Pulse",
    avatar: "KL",
    username: "Dr. K. Liu",
    handle: "@drkliuMD",
    timeAgo: "5h",
    content: "Long thread on why the new RSV vaccine data is more nuanced than headlines suggest. The 78% efficacy figure is real but the confidence intervals matter. [1/12] 🧵",
    engagementLikes: "4.3K",
    engagementComments: "891",
    engagementShares: "3.2K",
    violationReason: null,
    insight: "A verified medical professional presenting qualified, evidence-based analysis of published clinical data is protected speech and valuable public health content. The nuanced framing ('more nuanced than headlines suggest') is precisely the kind of context that platforms should amplify, not restrict."
  },
  {
    id: "rtr-08",
    type: "forum",
    isViolation: false,
    violationSeverity: null,
    platform: "Pulse",
    avatar: "TR",
    username: "TruthReader",
    handle: "@truthreader",
    timeAgo: "8h",
    content: "I don't trust the official government figures on inflation. Here's why: [detailed analysis comparing CPI methodology across countries, citing academic papers, showing where methodological choices affect the output]. Not saying it's a conspiracy — just that the methodology matters.",
    forumTopic: "r/Economics",
    upvotes: "2.1K",
    violationReason: null,
    insight: "Scepticism of government data with cited evidence and methodological reasoning is protected political and economic speech. Removing this would constitute viewpoint-based censorship. The 'not a conspiracy' framing and academic citations distinguish this from misinformation."
  },
  {
    id: "rtr-09",
    type: "social_post",
    isViolation: false,
    violationSeverity: null,
    platform: "Pulse",
    avatar: "HF",
    username: "HarmReduction.org",
    handle: "@harmreduction_hq",
    timeAgo: "2h",
    content: "If you're going to use substances this weekend, please: test your supply, don't use alone, keep naloxone nearby. No judgment — just want you to be safe. Resources in bio. 💙",
    engagementLikes: "8.7K",
    engagementComments: "1.2K",
    engagementShares: "5.6K",
    violationReason: null,
    insight: "Harm reduction content from verified health organisations is explicitly protected under most platform policies and public health guidelines. Removing it increases user harm. This is a classic false positive case — the subject matter appears risky but the content is protective."
  },
  {
    id: "rtr-10",
    type: "chat",
    isViolation: false,
    violationSeverity: null,
    platform: "Pulse",
    avatar: "MR",
    username: "Marcus R.",
    handle: "@marcus_r",
    timeAgo: "12h",
    content: "Hey! I saw you're also into woodworking. I just finished a walnut dining table — took 3 months but worth it. Would love to compare notes sometime. Are you working on anything?",
    violationReason: null,
    insight: "A genuine connection message from someone with verified shared interest is exactly the type of content platforms exist to facilitate. False-flagging social connection as a potential scam based solely on the DM format would be a significant over-moderation error."
  },
  {
    id: "rtr-11",
    type: "social_post",
    isViolation: false,
    violationSeverity: null,
    platform: "Pulse",
    avatar: "JP",
    username: "James Park",
    handle: "@jamespark_writes",
    timeAgo: "1d",
    content: "My new novel features a character who commits a violent crime. Writing it required research into real cases, forensics, and criminal psychology. Happy to discuss the research process for other crime writers. 🖊️",
    engagementLikes: "1.2K",
    engagementComments: "234",
    engagementShares: "89",
    violationReason: null,
    insight: "Crime fiction research and discussion is protected creative speech. The framing is explicitly literary, the audience is professional writers, and no operational instructions are included. Flagging this as violent content would harm creative communities without reducing any real harm."
  },
  {
    id: "rtr-12",
    type: "social_post",
    isViolation: false,
    violationSeverity: null,
    platform: "Pulse",
    avatar: "EP",
    username: "EconPolicy Watch",
    handle: "@econpolicywatch",
    timeAgo: "7h",
    content: "New IMF data shows debt-to-GDP ratios at post-war highs in 14 G20 countries. This isn't alarmism — it's a structural issue that will constrain policy options for the next decade. Thread on what this means for emerging market exposure. [1/8]",
    engagementLikes: "3.4K",
    engagementComments: "567",
    engagementShares: "1.8K",
    violationReason: null,
    insight: "Factual economic analysis citing official international data sources is core public interest content. The analytical framing and data attribution make this clearly different from financial scam content. A trained reviewer should not flag this."
  },

  // ── VIDEO ADS ─────────────────────────────────────────────────────

  {
    id: "rtr-video-01",
    type: "video",
    isViolation: true,
    violationSeverity: "clear",
    platform: "Pulse",
    avatar: "NV",
    username: "NeuraVance™",
    handle: "@neuravance_official",
    timeAgo: "3h",
    videoId: "neuravance",
    videoSrc: "",          // ⚠️ REPLACE BEFORE SUMMIT: /src/assets/videos/neuravance-ad.mp4
    videoTitle: "NeuraVance™ — Clinically Proven Cognitive Support",
    videoDuration: "0:15",
    engagementLikes: "4.1K",
    engagementComments: "892",
    engagementShares: "2.3K",
    violationReason: "False clinical efficacy claims · 'Big Pharma conspiracy' framing · Unregistered supplement marketed as clinical treatment",
    insight: "Key violation signals in this video: 'Clinically proven' without trial citation, 'reverse cognitive decline' is a disease treatment claim requiring regulatory approval, and 'what Big Pharma doesn't want you to know' is a documented false health claim amplifier."
  },
  {
    id: "rtr-video-02",
    type: "video",
    isViolation: true,
    violationSeverity: "borderline",
    platform: "Pulse",
    avatar: "YV",
    username: "YieldVault",
    handle: "@yieldvault_app",
    timeAgo: "5h",
    videoId: "yieldvault",
    videoSrc: "",          // ⚠️ REPLACE BEFORE SUMMIT: /src/assets/videos/yieldvault-ad.mp4
    videoTitle: "YieldVault — My $4,200 Month",
    videoDuration: "0:15",
    engagementLikes: "2.8K",
    engagementComments: "634",
    engagementShares: "1.1K",
    violationReason: "Unregistered financial product promotion · Specific earnings claim without substantiation · 'Results may vary' disclaimer insufficient for extraordinary return claims",
    insight: "This is borderline because 'results may vary' is present. However, leading with '$4,200 last month' is an implied earnings promise that requires substantiation under FTC guidelines. The 'no experience needed' framing adds to the deceptive impression."
  },

  // ── ADDITIONAL OUTPUTS — for rotation variety ─────────────────────

  {
    id: "rtr-13",
    type: "social_post",
    isViolation: true,
    violationSeverity: "clear",
    platform: "Pulse",
    avatar: "FN",
    username: "FreedomNews247",
    handle: "@freedomnews247",
    timeAgo: "45m",
    content: "CONFIRMED: Voter rolls in three counties have been PURGED of conservative voters. Our investigator has proof. The election is already being STOLEN. Every patriot needs to show up armed at polling stations to protect the vote. Share to every group you're in.",
    engagementLikes: "8.9K",
    engagementComments: "3.4K",
    engagementShares: "11.2K",
    violationReason: "Election misinformation · Incitement to armed presence at polling stations · Voter intimidation facilitation",
    insight: "Three simultaneous violations: unverified election fraud claim, explicit call for armed presence at polling stations (illegal in most US jurisdictions), and coordinated mass-share instruction. Any single one of these would be a violation — combined, this is among the highest-severity election integrity cases."
  },
  {
    id: "rtr-14",
    type: "forum",
    isViolation: false,
    violationSeverity: null,
    platform: "Pulse",
    avatar: "CW",
    username: "Cybersec Weekly",
    handle: "@cybersecweekly",
    timeAgo: "1d",
    content: "Writeup on the recent Log4Shell vulnerability — what it was, how it was exploited, and the patching timeline. Important reading for anyone managing infrastructure. Not a how-to guide — a post-mortem for defenders. Full technical breakdown in link.",
    forumTopic: "r/InfoSec",
    upvotes: "5.4K",
    violationReason: null,
    insight: "Security vulnerability analysis from a professional security publication is core defensive security education. Post-mortems are how the industry learns. The framing explicitly positions this as defensive content for system administrators — not an attack guide."
  },
  {
    id: "rtr-15",
    type: "chat",
    isViolation: true,
    violationSeverity: "clear",
    platform: "Pulse",
    avatar: "BK",
    username: "Brian K.",
    handle: "@briank92",
    timeAgo: "3h",
    content: "Hi there! You have a beautiful profile 😍 I am a US Army Colonel currently deployed. I have found $4.8 million USD in unclaimed funds here and need a trusted partner to help transfer it. You will receive 30% for your help. This is completely legal. Can I trust you?",
    context: "Same message sent to 1,200 accounts in the past 48 hours. Account created 8 days ago. Profile photo matches images on stock photo sites.",
    violationReason: "Classic advance fee fraud (419 scam) · Military impersonation · Mass coordinated targeting",
    insight: "Military deployment + discovered funds + trusted partner + 30% share = textbook 419 advance fee fraud. The military impersonation adds an additional identity fraud violation. The 1,200-message targeting makes this high-priority coordinated fraud."
  },
  {
    id: "rtr-16",
    type: "social_post",
    isViolation: false,
    violationSeverity: null,
    platform: "Pulse",
    avatar: "TS",
    username: "T&S Insider",
    handle: "@ts_insider",
    timeAgo: "2h",
    content: "Hot take: the platforms that are most afraid of false positives are the ones with the healthiest user communities. Over-moderation destroys trust faster than under-moderation in most content categories. Fight me. 🧵",
    engagementLikes: "2.7K",
    engagementComments: "892",
    engagementShares: "445",
    violationReason: null,
    insight: "Opinion content on platform moderation philosophy from a subject matter account is protected speech. The provocative framing ('fight me') is a common professional discussion device. No policy violation — and this is exactly the kind of T&S discourse that should exist on platforms."
  }
]

// Ticker fallback copy (shown before 3+ sessions recorded)
export const TICKER_FALLBACK = [
  "Signal & Noise — Sutherland Trust & Safety Summit Experience",
  "14,000 content reports processed every day at scale. How would you handle them?",
  "The hardest Trust & Safety decisions are the ones that look simple at first glance.",
  "Sutherland operates T&S operations across 5 global delivery centres.",
  "Play all 4 games to build your complete Safety IQ Profile.",
  "The Gray Room · Draw the Line · Threat Surface · Red Team Roulette",
  "Content moderation at scale requires cultural context, not just policy rules.",
  "Fraud detection that works isn't about blocking threats — it's about knowing which ones matter."
]

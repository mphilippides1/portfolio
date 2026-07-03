// ---------------------------------------------------------------------------
// Centralized content for the site. Edit this file to update copy, stats,
// and links without touching component code.
// ---------------------------------------------------------------------------

export const links = {
  linkedin: 'https://www.linkedin.com/in/michalis-philippides-0a3b11295/',
  github: 'https://github.com/mphilippides1',
  email: 'philippides0908@gmail.com',
};

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'academics', label: 'Academics' },
  { id: 'flagship', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
];

export const hero = {
  name: 'Michalis Philippides',
  roles: ['ML Engineer', 'Fintech Builder'],
  taglines: [
    'Builds the models, ships the systems, reads the markets.',
    'Where quantitative rigor meets working software.',
    'Turning market uncertainty into calibrated, testable decisions.',
  ],
  subtitle:
    'BSc Computer Science (First Class, University of Essex) — incoming MSc Financial Technology, Imperial College Business School.',
  // Placeholder: replace with a real headshot at /public/profile.jpg
  photoPlaceholder: '/public/MPProfPic.jpeg',
};

export const about = {
  paragraphs: [
    'Final-year BSc Computer Science student at the University of Essex, graduating First Class with an overall degree mark of 82%, and moving on to an MSc in Financial Technology at Imperial College Business School (2026–2027).',
    'Strong quantitative and ML foundation — advanced in Python and Java, with hands-on experience building explainable machine learning systems for financial forecasting rather than black-box predictors.',
    'Has worked across fintech freelance development, Big 4 strategy consulting (Deloitte), and early-stage fintech entrepreneurship (co-founded an insurance comparison platform in Cyprus).',
    'Balances technical depth with leadership experience — President of the Essex Cypriot Society — and a disciplined, data-driven approach carried over from competitive endurance sport.',
  ],
};

// ---------------------------------------------------------------------------
// Academic record — interactive dashboard section
// ---------------------------------------------------------------------------

export const academics = {
  headline: 'Degree Result: First Class',
  degreeMark: 82,
  yearlyAverages: [
    { year: 'Year 1', mark: 79 },
    { year: 'Year 2', mark: 80 },
    { year: 'Year 3', mark: 84 },
  ],
  deansList: ['2024', '2025'],
  modules: [
    { name: 'Natural Language Engineering', mark: 94.0, class: 'Class 1' },
    { name: 'Advanced Programming', mark: 88.0, class: 'Class 1' },
    { name: 'Individual Capstone Project Challenge', mark: 87.0, class: 'Class 1' },
    { name: 'Computer Vision', mark: 81.0, class: 'Class 1' },
    { name: 'Large Scale Software Systems & Extreme Programming', mark: 75.0, class: 'Class 1' },
    { name: 'Evolutionary Computation & Genetic Programming', mark: 75.0, class: 'Class 1' },
  ],
};

// ---------------------------------------------------------------------------
// Flagship project — Regime-Aware Mixture-of-Experts LSTM
// ---------------------------------------------------------------------------

export const flagship = {
  title: 'Regime-Aware Mixture-of-Experts LSTM for Financial Decision Support',
  subtitle: 'Capstone Project · University of Essex · 2025–2026',
  // Placeholder: replace with the real repo URL when public
  githubUrl: 'https://github.com/mphilippides1/FINTaiM', // TODO: add GitHub repo link
  framing:
    'A deliberate reframing of financial forecasting as an uncertainty-aware decision-support problem — not an accuracy-maximisation exercise. The model is judged on whether it knows what it doesn’t know, and on whether that honesty can still be turned into better risk-adjusted decisions.',
  problem: [
    'Binary daily directional classification (up / down) across 15 diversified assets.',
    '60-day input sequences of engineered technical, volatility, and regime features.',
    'Deliberately scoped to daily OHLCV-derived features only — no news or macro data — to isolate model behaviour and interpretability rather than chase marginal accuracy via data expansion.',
  ],
  architecture: [
    'LSTM encoder with an attention layer over the 60 time steps.',
    'Asset embeddings let the model share structure across assets while still differentiating between them.',
    'Mixture-of-Experts head with hard routing: three specialist expert networks (trending / range-bound / high-volatility), each activated only for sequences the regime-detection layer assigns to that market state — so no single output layer has to compromise across conditions.',
    'BiLSTM was tested and rejected despite higher raw accuracy, because it leaks future information into predictions. Methodological rigor over a better-looking number.',
  ],
  evalWindow: '5,340 observations · 15 assets · 356 trading days (12 Nov 2024 – 16 Apr 2026) · walk-forward, out-of-sample',
  accuracyMetrics: [
    { label: 'Balanced Accuracy', value: '0.510' },
    { label: 'ROC-AUC', value: '0.510' },
    { label: 'AUC-PR', value: '0.551' },
  ],
  calibrationMetrics: [
    { label: 'Brier Score (model)', value: '0.249' },
    { label: 'Brier Score (dummy baselines)', value: '0.485 / 0.463' },
    { label: 'Expected Calibration Error', value: '0.018' },
  ],
  accuracyNote:
    'Near-random directional accuracy, consistent with the Efficient Market Hypothesis. But the model is honest and well-calibrated about its own uncertainty — a Brier Score roughly half that of naive baselines and an ECE of 0.018. That combination — weak signal, trustworthy probabilities — is the intellectually honest core of the project, not a result to soften.',
  backtest: {
    threshold: 0.53,
    note: 'A confidence-gated strategy — only acts when predicted probability crosses a 0.53 threshold, cash otherwise — benchmarked walk-forward against Buy-and-Hold and a naive lower-threshold strategy over the same 356-day window, no transaction costs.',
    strategies: [
      { name: 'MoE Advisor (confidence-gated)', cumReturn: 10.4, sharpe: 1.518, maxDrawdown: -5.4, exposure: 18 },
      { name: 'Buy-and-Hold', cumReturn: 28.5, sharpe: 1.282, maxDrawdown: -16.2, exposure: 100 },
      { name: 'Naive (lower threshold)', cumReturn: 9.8, sharpe: 0.842, maxDrawdown: -12.4, exposure: 53.5 },
    ],
    takeaway:
      'The Advisor earns less in absolute terms but achieves a materially better Sharpe ratio and a much shallower drawdown. It is a risk-filtering mechanism, not an alpha-generating one — and the project frames it that way rather than overselling returns. Quality of exposure over quantity of returns.',
  },
  shap: {
    note: 'SHAP applied per-prediction and per-regime, translated into a narrative explanation layer for end users.',
    drivers: [
      { feature: 'Volatility_Ratio', importance: 0.91, direction: 'negative', note: 'consistent top driver, all regimes' },
      { feature: 'Returns_20', importance: 0.84, direction: 'negative', note: 'consistent top driver, all regimes' },
      { feature: 'MACD_diff', importance: 0.63, direction: 'positive', note: 'the one consistently bullish driver' },
      { feature: 'RSI', importance: 0.41, direction: 'mixed', note: 'enters top-10 only under high-volatility regime, replacing RollingMean_10 — a genuine sign of regime specialisation' },
    ],
  },
  delivery:
    'FastAPI inference backend (prediction, diagnostics, explainability endpoints) paired with a Next.js / TypeScript / Tailwind dashboard for exploring predictions, regimes, and feature attributions in real time.',
  tech: ['Python', 'PyTorch', 'FastAPI', 'SHAP', 'Scikit-learn', 'Next.js', 'TypeScript', 'Tailwind', 'Pandas'],
};

// ---------------------------------------------------------------------------
// Secondary projects
// ---------------------------------------------------------------------------

export const projects = [
  {
    title: 'myInsurance365',
    role: 'Co-founder · Cyprus · 2025',
    summary:
      'An early-stage Cypriot insurance comparison platform — conceptualised and led through early development, stakeholder meetings with insurance executives and marketing partners, before being discontinued due to regulatory constraints.',
    points: [
      'Conceptualised and led early-stage development of a Cypriot insurance comparison platform.',
      'Conducted stakeholder meetings with insurance company executives and marketing partners.',
      'Discontinued due to regulatory constraints — a real early-stage fintech venture, and a candid lesson in regulatory reality rather than a failure to hide.',
    ],
    tech: ['Product Strategy', 'Stakeholder Management', 'Fintech Regulation'],
    githubUrl: null, // TODO: no public repo — internal venture
    demoUrl: null, // TODO: discontinued, no live demo
  },
  {
    title: 'SpecWall',
    role: 'Freelance Web Developer · Remote (EU) · Jun 2025–Present',
    summary:
      'A commercial website for a modular construction systems company, serving architects, contractors, and developers across the EU — product showcase, specifications, case studies, and blog.',
    points: [
      'Front-end built in Next.js and React; responsive multi-page site with product filtering and image galleries.',
      'Integrated contact and quote request form for B2B lead generation.',
      'Optimised performance, SEO, and mobile responsiveness end-to-end.',
      'Delivered independently as a freelance engagement, from design through deployment.',
    ],
    tech: ['Next.js', 'React', 'SEO', 'Responsive Design'],
    githubUrl: 'https://www.specwall.eu/',
    demoUrl: 'https://www.specwall.eu/', // TODO: add live site URL
  },
  {
    title: 'Child Well-Being Tracking Application',
    role: 'Team Project (Scrum) · University of Essex · 2024/25',
    summary:
      'A full-stack application for parents to track child health and activity — sleep, feeding, medication, growth, temperature, and diaper changes.',
    points: [
      'Contributed growth tracking statistics, reminders, and calendar integration.',
      'Built notifications, doctor’s orders module, and settings/profile management.',
      'Delivered in a Scrum team using GitLab and JIRA for sprint planning and issue tracking.',
    ],
    tech: ['Django', 'Python', 'HTML/CSS', 'JavaScript', 'SQL', 'GitLab', 'JIRA'],
    githubUrl: '#', // TODO: add repo link
    demoUrl: null,
  },
];

// ---------------------------------------------------------------------------
// Experience timeline
// ---------------------------------------------------------------------------

export const experience = [
  {
    org: 'SpecWall',
    role: 'Freelance Web Developer',
    location: 'Remote (EU)',
    period: 'Jun 2025 – Present',
    points: [
      'Designed and built a commercial website for a modular construction systems company serving architects, contractors, and developers.',
    ],
  },
  {
    org: 'Deloitte Cyprus',
    role: 'Intern, Assurance & Strategy and Transactions',
    location: 'Nicosia, Cyprus',
    period: 'Jun – Jul 2025',
    points: [
      'Conducted market research and competitive analysis for client engagements.',
      'Supported financial modelling and stress-testing exercises.',
      'Synthesised findings into client-ready material alongside senior team members.',
    ],
  },
  {
    org: 'Intelligent Business Solutions (IBS Cy Ltd)',
    role: 'IT Intern, Technical Department',
    location: 'Nicosia, Cyprus',
    period: 'Jun – Jul 2024',
    points: [
      'Administered Active Directory, Microsoft 365, and Azure for 50+ users.',
      'Provided hardware and software support across the organisation.',
    ],
  },
  {
    org: 'Cypriot Ministry of Defence',
    role: 'Mandatory Military Service, Lance Corporal',
    location: 'Cyprus',
    period: 'Jul 2022 – Sep 2023',
    points: [
      'Managed guard rotation scheduling across five checkpoints at battalion level.',
      'Awarded Honorary Distinction for leadership.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Leadership & achievements
// ---------------------------------------------------------------------------

export const leadership = [
  {
    title: 'President, Essex Cypriot Society',
    period: '2025–2026',
    detail: 'Led a 5-person council, built partnerships, and ran events for 100+ members.',
  },
  {
    title: 'Treasurer, Essex Cypriot Society',
    period: '2024–2025',
    detail: 'Managed the annual budget, secured sponsorships, and grew available funds year-on-year.',
  },
  {
    title: 'Sport Officer, Protoporia UK',
    period: '2024–2026',
    detail: 'Organised national sports competitions and student events across UK universities with EFEK.',
  },
  {
    title: 'Scout Republic Badge, Cyprus',
    period: '2022',
    detail: 'Awarded by the President of the Republic of Cyprus — the highest distinction in Cypriot Scouting.',
  },
  {
    title: 'Class President, Apostles Peter and Paul Lyceum',
    period: '2019–2021',
    detail: 'Elected consecutively for all three years.',
  },
];

// ---------------------------------------------------------------------------
// Beyond the desk
// ---------------------------------------------------------------------------

export const beyondTheDesk = [
  {
    title: 'Volleyball',
    stat: '7 yrs',
    detail: 'Competitive outside hitter for Anorthosis Volleyball Club (2014–2021), National Junior League tournaments for seven years.',
  },
  {
    title: 'Endurance Athlete',
    stat: '2 marathons',
    detail: '2 marathons, 10+ official half-marathons across Europe, and duathlon competitions. Consistent multisport competitor since 2022.',
  },
  {
    title: 'Financial Markets Reader',
    stat: '5 sources',
    detail: 'Regularly reads Money Stuff (Matt Levine/Bloomberg), Net Interest (Marc Rubinstein), The Diff (Byrne Hobart), Fintech Brainfood, and the Financial Times.',
  },
  {
    title: 'Charity Fundraiser',
    stat: '€2,000',
    detail: 'Founding supporter of the Panos Evripidou Foundation (premature infant care) since 2012; independently raised €2,000 through marathon participation in 2023.',
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skills = {
  groups: [
    {
      title: 'Programming',
      items: [
        { name: 'Python', level: 'Advanced' },
        { name: 'Java', level: 'Advanced' },
        { name: 'SQL', level: 'Intermediate' },
        { name: 'JavaScript', level: 'Intermediate' },
        { name: 'C++', level: 'Intermediate' },
      ],
    },
    {
      title: 'ML / Data',
      items: [
        { name: 'PyTorch' },
        { name: 'Scikit-learn' },
        { name: 'SHAP' },
        { name: 'Pandas' },
        { name: 'NumPy' },
        { name: 'Seaborn' },
        { name: 'YFinance' },
      ],
    },
    {
      title: 'Web / APIs',
      items: [
        { name: 'React' },
        { name: 'FastAPI' },
        { name: 'Node.js / Express' },
        { name: 'Django' },
        { name: 'HTML/CSS' },
        { name: 'Next.js' },
        { name: 'TypeScript' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { name: 'Git/GitHub' },
        { name: 'GitLab' },
        { name: 'JIRA' },
        { name: 'Azure' },
        { name: 'Microsoft 365' },
        { name: 'Active Directory' },
      ],
    },
  ],
  certifications: [{ name: 'CCNA — Introduction to Networks', issuer: 'Cisco Digital Credential', year: '2024' }],
  languages: [
    { name: 'Greek', level: 'Native' },
    { name: 'English', level: 'Fluent, C1' },
  ],
};

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export const education = [
  {
    institution: 'Imperial College Business School',
    location: 'London, UK',
    degree: 'MSc Financial Technology',
    period: 'Aug 2026 – Aug 2027',
    detail:
      'Core modules: Big Data, Financial Markets & Instruments, Financial Technology & Innovation, Computational Finance. Planned electives: Machine Learning and Finance, Systematic Trading Strategies with ML, Text Mining for Economics and Finance.',
    status: 'incoming',
  },
  {
    institution: 'University of Essex',
    location: 'Colchester, UK',
    degree: 'BSc Computer Science — First Class',
    period: 'Sep 2023 – Jun 2026',
    detail: 'Full academic record and module breakdown above.',
    status: 'current',
    linkToAcademics: true,
  },
  {
    institution: 'Apostles Peter and Paul Lyceum',
    location: 'Limassol, Cyprus',
    degree: 'Apolytirion',
    period: 'Sep 2019 – Jun 2022',
    detail: null,
    status: 'complete',
  },
];

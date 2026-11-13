export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Machine Learning' | 'Accessibility & Research' | 'Data & Analytics' | 'AI & Systems';
  summary: string;
  problem: string;
  approach: string; // Used as the concise solution summary
  result: string;
  techStack: string[];
  role: string;
  githubUrl: string;
  liveUrl: string;
  hasPlaceholder?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  details?: string;
}

export interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  type: 'Education' | 'Research' | 'Hackathon';
  description: string;
  badges: string[];
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export const portfolioData = {
  personal: {
    name: 'Karthavya S',
    nickname: 'Karthavya',
    heroHeading: "HI, I'M KARTHAVYA",
    headline: 'Curious mind. Creative coder. AI enthusiast.',
    subheadline: 'Computer Science & Engineering Student @ REC Chennai',
    introHeadline: 'Curious mind. Creative coder. AI enthusiast.',
    introText:
      "I'm passionate about exploring the world of AI/ML, experimenting with AI tools, and turning ideas into intelligent solutions. With Java and Python as my programming foundations and a keen interest in DSA and problem-solving, I enjoy learning, building, experimenting, and bringing technology to life.",
    bio: "AI and Data Science enthusiast with strong interest in Machine Learning, intelligent digital systems, and user-centered technology solutions. Passionate about building analytics-driven applications and applying AI techniques to solve real-world problems through innovative and impactful digital experiences.",
    location: 'Chennai, Tamil Nadu, India',
    cgpa: '9.07',
    phone: '+91-8015338169',
    email: 'karthavya.s.2024.cse@rajalakshmi.edu.in',
    github: 'https://github.com/KarthavyaS',
    linkedin: 'https://www.linkedin.com/in/karthavya-s-7a170332b',
    resumeUrl: '/resume.pdf',
    avatarUrl: '/avatar.png',
  },
  navItems: [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  projectCategories: ['All', 'AI & Machine Learning', 'Accessibility & Research', 'Data & Analytics', 'AI & Systems'],
  projects: [
    {
      id: 'unscramble',
      title: 'Unscramble',
      tagline: 'AI-Powered Dyslexia-Friendly Learning Platform',
      category: 'Accessibility & Research',
      summary: 'AI-powered adaptive learning platform designed for neurodiverse and dyslexic learners with accessibility-focused features.',
      problem: 'Mainstream educational platforms do not provide adaptive, multi-modal accommodations for dyslexic learners, causing cognitive overload and reading fatigue.',
      approach: 'Built an adaptive AI platform featuring NLP text simplification, speech synthesis, multilingual translation, visual aids, and personalized learning velocities adhering strictly to WCAG guidelines.',
      result: 'Engineered accessible interfaces adhering strictly to WCAG guidelines; submitted research work to IEEE on AI-driven educational accessibility.',
      techStack: ['Python', 'Machine Learning', 'NLP', 'AI APIs', 'Full-Stack Web', 'WCAG Standards'],
      role: 'AI & Accessibility Researcher & Developer',
      githubUrl: 'https://github.com/KarthavyaS/unscramble',
      liveUrl: 'https://unscramble-demo.vercel.app',
      hasPlaceholder: true,
    },
    {
      id: 'apix',
      title: 'Airfare Price Index (APIx)',
      tagline: 'India Aviation Observatory & Analytics Engine',
      category: 'Data & Analytics',
      summary: 'Comprehensive aviation analytics observatory tracking and predicting airfare price fluctuations across Indian domestic flight routes.',
      problem: 'Extreme volatility in dynamic airline ticket pricing creates opaque market conditions for travelers and aviation analysts.',
      approach: 'Engineered real-time data pipelines and statistical volatility scoring across key Indian domestic routes (DEL, BOM, BLR, MAA) with route-level anomaly detection and interactive dashboards.',
      result: 'Enabled transparent route-level price tracking, fare anomaly detection, and predictive purchasing windows.',
      techStack: ['Python', 'Data Analytics', 'Pandas', 'NumPy', 'Next.js', 'TypeScript', 'REST APIs', 'Tailwind CSS'],
      role: 'Lead Analytics & Full-Stack Developer',
      githubUrl: 'https://github.com/KarthavyaS/apix-aviation',
      liveUrl: 'https://apix-observatory.vercel.app',
      hasPlaceholder: true,
    },
    {
      id: 'logic-courtroom',
      title: 'LOGIC COURTROOM',
      tagline: '"Where Logic Decides the Verdict"',
      category: 'AI & Systems',
      summary: 'A modular, desktop educational courtroom investigation game built in Python 3.12+ and Pygame, powered by Traditional Artificial Intelligence (Symbolic Logic, Forward Chaining, Backward Chaining, and Resolution Refutation).',
      problem: 'Classical AI inference algorithms and formal mathematical logic are abstract and challenging for computer science students to master without practical gamification.',
      approach: 'Designed a modular courtroom trial game in Python 3.12+ and Pygame powered by Symbolic Logic, Forward Chaining, Backward Chaining, and Resolution Refutation to uncover contradictions and decide verdicts.',
      result: 'Fully playable desktop game with multi-case story modes, visual logic proof trees, and real-time rule engine execution in Python 3.12+.',
      techStack: ['Python 3.12+', 'Pygame', 'Traditional AI', 'Symbolic Logic', 'Forward Chaining', 'Backward Chaining', 'Resolution Refutation'],
      role: 'Game Architect & AI Logic Engine Developer',
      githubUrl: 'https://github.com/KarthavyaS/logic-courtroom',
      liveUrl: 'https://logic-courtroom.vercel.app',
      hasPlaceholder: true,
    },
    {
      id: 'floodguard',
      title: 'FloodGuard',
      tagline: 'Hilly Region Flash Flood Risk Prediction',
      category: 'AI & Machine Learning',
      summary: 'Village/ward-level flood and landslide risk prediction system for hilly regions of India spanning the Western Ghats and Himalayas.',
      problem: 'Complex topography and steep gradients in hilly terrains cause sudden flash floods where regional weather forecasts fail to capture hyper-local disaster risk.',
      approach: 'Developed a dual-layer prediction system combining an empirical ML baseline (XGBoost + Random Forest) with an instant in-browser hydrological scoring engine tested across 48 mountain wards.',
      result: 'Validated across 48 mountain wards and 1,200 simulated event scenarios with robust generalization across divergent mountain geologies.',
      techStack: ['Python', 'XGBoost', 'Random Forest', 'Pandas', 'Scikit-learn', 'Interactive Dashboard'],
      role: 'Lead Developer & ML Engineer',
      githubUrl: 'https://github.com/KarthavyaS/floodguard',
      liveUrl: 'https://floodguard.vercel.app',
      hasPlaceholder: true,
    },
  ] as Project[],
  skillGroups: [
    {
      name: 'Languages',
      skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'C', 'SQL'],
    },
    {
      name: 'AI & Machine Learning',
      skills: ['Machine Learning', 'NLP', 'Symbolic Logic', 'Forward & Backward Chaining', 'Resolution Refutation', 'Scikit-learn', 'PyTorch', 'AI APIs'],
    },
    {
      name: 'Data & Analytics',
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'Excel', 'Statistical Analysis', 'EDA'],
    },
    {
      name: 'Web & Systems',
      skills: ['Next.js', 'React', 'Tailwind CSS', 'FastAPI', 'Pygame', 'JDBC', 'Swing', 'Operating Systems'],
    },
    {
      name: 'Tools & Practices',
      skills: ['Git', 'GitHub', 'Docker', 'Agile Methodology', 'DSA', 'WCAG Standards', 'RESTful APIs'],
    },
  ] as SkillGroup[],
  education: [
    {
      degree: 'B.E. Computer Science & Engineering',
      institution: 'Rajalakshmi Engineering College, Chennai',
      period: '2024 – 2028',
      score: 'CGPA: 9.07 / 10',
      details: 'Focus on AI/ML, Data Structures & Algorithms, Operating Systems, and DBMS.',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Ananthavalli Mat Hr Sec School',
      period: '2022',
      score: '91%',
    },
    {
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institution: 'ST. Vincent Mat Hr Sec School',
      period: '2020',
      score: '96%',
    },
  ] as EducationItem[],
  experience: [
    {
      title: 'IEEE Research Paper Submission — Unscramble',
      organization: 'Rajalakshmi Engineering College & IEEE',
      period: '2024 – Present',
      type: 'Research',
      description: 'Research work on AI-driven accessibility, adaptive learning algorithms, and NLP-based multi-modal educational support for neurodiverse learners.',
      badges: ['IEEE Paper', 'NLP', 'Accessibility', 'Adaptive ML'],
    },
    {
      title: 'B.E. Computer Science & Engineering',
      organization: 'Rajalakshmi Engineering College, Chennai',
      period: '2024 – 2028',
      type: 'Education',
      description: 'Maintaining 9.07 CGPA. Core coursework in Data Structures & Algorithms, Operating Systems, Database Management Systems, and Machine Learning.',
      badges: ['CGPA 9.07 / 10', 'Computer Science', 'Chennai, India'],
    },
    {
      title: 'Smart India Hackathon (SIH 2026) — Internal Shortlisted',
      organization: 'Rajalakshmi Engineering College — SIH Internal Hackathon',
      period: '2026',
      type: 'Hackathon',
      description: 'Shortlisted in the SIH 2026 internal college hackathon selection for high-impact innovation and technical architecture.',
      badges: ['SIH 2026', 'Shortlisted', 'Smart India Hackathon'],
    },
    {
      title: 'VIT GDG 2026 Hackathon',
      organization: 'VIT Chennai — Google Developer Groups (GDG)',
      period: '2026',
      type: 'Hackathon',
      description: 'Participated in the VIT GDG 2026 Hackathon, collaborating on fast-paced software development and innovative AI problem-solving.',
      badges: ['VIT GDG', 'Google Developer Groups', '2026'],
    },
    {
      title: 'VeloHack 2026',
      organization: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
      period: '2026',
      type: 'Hackathon',
      description: 'Competed at VeloHack 2026 at Vel Tech College, building rapid prototypes and demonstrating core engineering execution.',
      badges: ['VeloHack', 'Vel Tech', '2026'],
    },
  ] as ExperienceItem[],
};

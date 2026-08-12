import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  BookOpen,
  MessageSquare,
  Eye,
  Image as ImageIcon,
  Map,
  BarChart3,
  Sparkles,
  Check,
  Play,
  Menu,
  X,
  Atom,
  Calculator,
  FlaskConical,
  Code2,
  Target,
  Flame,
  Zap,
  Upload,
  ChevronRight,
} from 'lucide-react';

import './Home.css';

export default function Home({ user }) {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStart = () => {
    navigate(user ? '/dashboard' : '/register');
  };

  const handleLogin = () => {
    navigate(user ? '/dashboard' : '/login');
  };

  const closeMenu = () => setMobileMenu(false);

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <header className={`home-navbar ${scrolled ? 'home-navbar-scrolled' : ''}`}>
        <div className="home-container home-nav-inner">

          <Link to="/" className="home-logo" onClick={closeMenu}>
            <span className="home-logo-icon">
              <Brain size={21} strokeWidth={2.4} />
            </span>

            <span>
              STEM<span>AI</span> Tutor
            </span>
          </Link>

          <nav className={`home-nav-links ${mobileMenu ? 'mobile-open' : ''}`}>
            <a href="#features" onClick={closeMenu}>
              Features
            </a>

            <a href="#how-it-works" onClick={closeMenu}>
              How It Works
            </a>

            <a href="#ai-tools" onClick={closeMenu}>
              AI Tools
            </a>

            <a href="#learning" onClick={closeMenu}>
              Learning
            </a>

            <div className="mobile-nav-actions">
              <button className="nav-login" onClick={handleLogin}>
                {user ? 'Dashboard' : 'Login'}
              </button>

              <button className="nav-start" onClick={handleStart}>
                Get Started
                <ArrowRight size={16} />
              </button>
            </div>
          </nav>

          <div className="home-nav-actions">
            <button className="nav-login desktop-login" onClick={handleLogin}>
              {user ? 'Dashboard' : 'Login'}
            </button>

            <button className="nav-start desktop-start" onClick={handleStart}>
              Get Started
              <ArrowRight size={16} />
            </button>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <main>

        <section className="hero-section">
          <div className="hero-grid-bg" />

          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="home-container hero-container">

            <div className="hero-content">

              <div className="hero-badge">
                <span className="hero-badge-dot" />
                <Sparkles size={14} />
                AI-Powered STEM Learning
              </div>

              <h1>
                Learn STEM
                <span className="gradient-text"> Smarter</span>
                <br />
                With Your AI Tutor.
              </h1>

              <p className="hero-description">
                Understand difficult concepts, solve problems step-by-step,
                practice intelligently and build your personalized learning
                journey with AI.
              </p>

              <div className="hero-buttons">
                <button className="primary-button" onClick={handleStart}>
                  Start Learning Free
                  <ArrowRight size={18} />
                </button>

                <a href="#ai-tools" className="secondary-button">
                  <Play size={16} fill="currentColor" />
                  Explore AI Tools
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <Check size={15} />
                  Personalized
                </div>

                <div className="trust-item">
                  <Check size={15} />
                  Interactive
                </div>

                <div className="trust-item">
                  <Check size={15} />
                  AI Powered
                </div>

                <div className="trust-item">
                  <Check size={15} />
                  Available Anytime
                </div>
              </div>

            </div>


            {/* HERO PRODUCT MOCKUP */}
            <div className="hero-visual">

              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />

              <div className="floating-symbol symbol-one">
                F = ma
              </div>

              <div className="floating-symbol symbol-two">
                ∑ x²
              </div>

              <div className="floating-symbol symbol-three">
                H₂O
              </div>

              <div className="ai-window">

                <div className="ai-window-header">
                  <div className="ai-window-brand">
                    <span className="mini-ai-icon">
                      <Brain size={14} />
                    </span>

                    <div>
                      <strong>STEMAI Tutor</strong>
                      <span>
                        <i /> AI Tutor Online
                      </span>
                    </div>
                  </div>

                  <div className="window-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="ai-window-body">

                  <div className="mock-user-message">
                    <span className="mock-avatar user-avatar">
                      V
                    </span>

                    <div>
                      <small>You</small>
                      <p>
                        Explain Newton's Second Law in simple terms.
                      </p>
                    </div>
                  </div>

                  <div className="mock-ai-message">
                    <span className="mock-avatar ai-avatar">
                      <Brain size={15} />
                    </span>

                    <div className="mock-ai-content">
                      <small>STEMAI Tutor</small>

                      <p>
                        Newton's Second Law explains how
                        <strong> force, mass and acceleration </strong>
                        are connected.
                      </p>

                      <div className="formula-card">
                        <span>F</span>
                        <b>=</b>
                        <span>m</span>
                        <b>×</b>
                        <span>a</span>
                      </div>

                      <p className="mock-small-text">
                        More force means more acceleration when mass
                        stays constant.
                      </p>
                    </div>
                  </div>

                  <div className="mock-input">
                    <span>Ask STEMAI anything...</span>
                    <button>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                </div>

              </div>

              <div className="hero-mini-stat">
                <div className="mini-stat-icon">
                  <Zap size={17} />
                </div>

                <div>
                  <strong>Instant Answers</strong>
                  <span>Step-by-step explanations</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ================= CAPABILITIES ================= */}
        <section className="capability-section">
          <div className="home-container">

            <div className="section-heading centered">
              <span className="eyebrow">
                <Sparkles size={14} />
                ONE INTELLIGENT PLATFORM
              </span>

              <h2>
                Everything You Need To
                <span> Learn STEM Better.</span>
              </h2>

              <p>
                One powerful learning environment designed around
                the way students actually learn.
              </p>
            </div>

            <div className="capability-grid">

              <Capability
                icon={MessageSquare}
                title="AI Tutor"
                text="Ask questions naturally and get clear explanations."
              />

              <Capability
                icon={Brain}
                title="Smart Practice"
                text="Test your knowledge with intelligent practice."
              />

              <Capability
                icon={Eye}
                title="Visual Learning"
                text="Understand difficult concepts through visuals."
              />

              <Capability
                icon={ImageIcon}
                title="Image Solver"
                text="Upload problems and let AI analyze them."
              />

              <Capability
                icon={Map}
                title="Learning Path"
                text="Follow a personalized study journey."
              />

              <Capability
                icon={BarChart3}
                title="Analytics"
                text="Track progress and understand your performance."
              />

            </div>

          </div>
        </section>


        {/* ================= AI TOOLS ================= */}
        <section className="tools-section" id="features">
          <div className="home-container">

            <div className="section-heading">
              <span className="eyebrow">
                <Sparkles size={14} />
                AI LEARNING TOOLS
              </span>

              <h2>
                One AI Tutor.
                <br />
                <span>Multiple Ways To Learn.</span>
              </h2>

              <p>
                From asking questions to solving problems and tracking
                progress, STEMAI brings your learning experience together.
              </p>
            </div>

            <div className="tools-grid">

              {/* Large Chat Card */}
              <ToolCard
                className="tool-large tool-chat"
                icon={MessageSquare}
                iconClass="icon-indigo"
                title="AI Chat Tutor"
                description="Ask anything about Mathematics, Physics, Chemistry or Computer Science and receive step-by-step explanations."
              >
                <div className="mini-chat-ui">

                  <div className="mini-chat-row mini-chat-user">
                    <span>Why does an object accelerate?</span>
                  </div>

                  <div className="mini-chat-row mini-chat-ai">
                    <span className="mini-ai-circle">
                      <Brain size={12} />
                    </span>

                    <span>
                      Because acceleration changes when the
                      net force acting on an object changes...
                    </span>
                  </div>

                  <div className="mini-chat-formula">
                    F = m × a
                  </div>

                </div>
              </ToolCard>


              {/* Practice */}
              <ToolCard
                className="tool-practice"
                icon={Brain}
                iconClass="icon-cyan"
                title="Smart Practice"
                description="Strengthen concepts with focused questions."
              >
                <div className="practice-mini">

                  <div className="practice-question">
                    Which force causes objects to fall?
                  </div>

                  <div className="practice-option correct">
                    <span>A</span>
                    Gravity
                    <Check size={14} />
                  </div>

                  <div className="practice-option">
                    <span>B</span>
                    Friction
                  </div>

                </div>
              </ToolCard>


              {/* Visualizer */}
              <ToolCard
                className="tool-visualizer"
                icon={Eye}
                iconClass="icon-green"
                title="Concept Visualizer"
                description="Turn complex concepts into visual understanding."
              >
                <div className="visualizer-mini">

                  <div className="visual-node node-force">
                    Force
                  </div>

                  <div className="visual-line" />

                  <div className="visual-node node-object">
                    Object
                  </div>

                  <div className="visual-line" />

                  <div className="visual-node node-accel">
                    Acceleration
                  </div>

                </div>
              </ToolCard>


              {/* Image */}
              <ToolCard
                className="tool-image"
                icon={ImageIcon}
                iconClass="icon-purple"
                title="Image Problem Solver"
                description="Upload a question and let AI break it down."
              >
                <div className="image-upload-mini">
                  <Upload size={21} />

                  <strong>
                    Drop your problem
                  </strong>

                  <span>
                    JPG, PNG or PDF
                  </span>
                </div>
              </ToolCard>


              {/* Learning Path */}
              <ToolCard
                className="tool-path"
                icon={Map}
                iconClass="icon-cyan"
                title="Personalized Learning Path"
                description="Know what to learn next and stay on track."
              >
                <div className="path-mini">

                  <PathItem
                    number="01"
                    text="Algebra Basics"
                    completed
                  />

                  <PathItem
                    number="02"
                    text="Newton's Laws"
                    active
                  />

                  <PathItem
                    number="03"
                    text="Energy & Motion"
                  />

                </div>
              </ToolCard>


              {/* Analytics */}
              <ToolCard
                className="tool-analytics"
                icon={BarChart3}
                iconClass="icon-indigo"
                title="Learning Analytics"
                description="See your strengths, weaknesses and progress."
              >
                <div className="analytics-mini">

                  <div className="analytics-bars">
                    <span style={{ height: '35%' }} />
                    <span style={{ height: '55%' }} />
                    <span style={{ height: '45%' }} />
                    <span style={{ height: '75%' }} />
                    <span style={{ height: '62%' }} />
                    <span style={{ height: '88%' }} />
                    <span style={{ height: '95%' }} />
                  </div>

                  <div className="analytics-label">
                    <strong>87%</strong>
                    <span>Weekly accuracy</span>
                  </div>

                </div>
              </ToolCard>

            </div>

          </div>
        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="how-section" id="how-it-works">
          <div className="home-container">

            <div className="section-heading centered">
              <span className="eyebrow">
                <Zap size={14} />
                SIMPLE PROCESS
              </span>

              <h2>
                From Question
                <span> To Understanding.</span>
              </h2>

              <p>
                STEMAI turns difficult questions into clear,
                actionable learning experiences.
              </p>
            </div>

            <div className="steps-container">

              <Step
                number="01"
                icon={MessageSquare}
                title="Ask"
                text="Ask your AI tutor anything about a STEM concept or problem."
              />

              <Step
                number="02"
                icon={Brain}
                title="Understand"
                text="Receive explanations tailored to your learning level."
              />

              <Step
                number="03"
                icon={Target}
                title="Master"
                text="Practice what you learned and track your progress."
              />

            </div>

          </div>
        </section>


        {/* ================= AI TUTOR SHOWCASE ================= */}
        <section className="showcase-section" id="ai-tools">
          <div className="home-container">

            <div className="showcase-grid">

              <div className="showcase-content">

                <span className="eyebrow">
                  <Brain size={14} />
                  PERSONAL AI TUTOR
                </span>

                <h2>
                  Your Personal STEM Tutor,
                  <span> Available Anytime.</span>
                </h2>

                <p>
                  Don't just get an answer. Understand why the
                  answer is correct with explanations designed
                  around your learning level.
                </p>

                <div className="check-list">

                  <CheckItem>
                    Step-by-step explanations
                  </CheckItem>

                  <CheckItem>
                    Context-aware conversations
                  </CheckItem>

                  <CheckItem>
                    STEM-focused reasoning
                  </CheckItem>

                  <CheckItem>
                    Beginner-friendly explanations
                  </CheckItem>

                  <CheckItem>
                    Interactive learning
                  </CheckItem>

                </div>

                <button
                  className="outline-button"
                  onClick={() => navigate(user ? '/chat' : '/register')}
                >
                  Try AI Tutor
                  <ArrowRight size={17} />
                </button>

              </div>


              <div className="showcase-chat-wrapper">

                <div className="showcase-chat">

                  <div className="showcase-chat-header">

                    <div className="showcase-ai-profile">
                      <span>
                        <Brain size={16} />
                      </span>

                      <div>
                        <strong>STEMAI Tutor</strong>
                        <small>
                          <i />
                          Online
                        </small>
                      </div>
                    </div>

                    <Sparkles size={18} />

                  </div>


                  <div className="showcase-messages">

                    <div className="showcase-user-msg">
                      Why does acceleration increase
                      when force increases?
                    </div>

                    <div className="showcase-ai-msg">

                      <div className="showcase-ai-avatar">
                        <Brain size={14} />
                      </div>

                      <div>
                        <span className="ai-msg-label">
                          STEMAI Tutor
                        </span>

                        <p>
                          Think of force as the push that
                          changes an object's motion.
                        </p>

                        <div className="large-formula">
                          F = m × a
                        </div>

                        <p>
                          If the mass remains constant,
                          increasing force increases acceleration.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="showcase-chat-input">
                    <span>Ask a follow-up...</span>
                    <button>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ================= VISUALIZER ================= */}
        <section className="visualizer-section">
          <div className="home-container">

            <div className="visualizer-grid">

              <div className="visualizer-board">

                <div className="board-grid" />

                <div className="board-title">
                  Newton's Second Law
                </div>

                <div className="force-arrow">
                  <span>FORCE</span>
                  <ArrowRight size={42} />
                </div>

                <div className="physics-object">
                  <div className="object-core">
                    <Atom size={30} />
                  </div>
                  <span>OBJECT</span>
                </div>

                <div className="acceleration-arrow">
                  <ArrowRight size={30} />
                  <span>ACCELERATION</span>
                </div>

                <div className="board-formula">
                  F = m × a
                </div>

              </div>


              <div className="visualizer-copy">

                <span className="eyebrow">
                  <Eye size={14} />
                  CONCEPT VISUALIZER
                </span>

                <h2>
                  See The Concept.
                  <span> Understand The Concept.</span>
                </h2>

                <p>
                  Some concepts are easier to understand when
                  you can see them. STEMAI transforms abstract
                  STEM ideas into visual explanations.
                </p>

                <div className="visualizer-points">

                  <div>
                    <span>
                      <Check size={15} />
                    </span>
                    Interactive explanations
                  </div>

                  <div>
                    <span>
                      <Check size={15} />
                    </span>
                    Visual relationships
                  </div>

                  <div>
                    <span>
                      <Check size={15} />
                    </span>
                    Easier concept retention
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ================= IMAGE SOLVER ================= */}
        <section className="image-solver-section">
          <div className="home-container">

            <div className="image-solver-grid">

              <div className="image-solver-copy">

                <span className="eyebrow">
                  <ImageIcon size={14} />
                  IMAGE PROBLEM SOLVER
                </span>

                <h2>
                  Stuck On A Question?
                  <span> Upload It.</span>
                </h2>

                <p>
                  Take a picture of a difficult Mathematics,
                  Physics or Chemistry problem and let STEMAI
                  analyze it step-by-step.
                </p>

                <button
                  className="primary-button"
                  onClick={() =>
                    navigate(user ? '/image-solver' : '/register')
                  }
                >
                  Try Image Solver
                  <ArrowRight size={17} />
                </button>

              </div>


              <div className="upload-preview">

                <div className="upload-card">

                  <div className="upload-icon">
                    <Upload size={25} />
                  </div>

                  <h3>
                    Drop your problem here
                  </h3>

                  <p>
                    or click to upload an image
                  </p>

                  <span className="upload-types">
                    JPG • PNG • PDF
                  </span>

                  <button>
                    Choose File
                  </button>

                </div>

                <div className="upload-result">

                  <div className="result-header">
                    <span>
                      <Check size={13} />
                    </span>

                    AI Analysis Complete
                  </div>

                  <div className="result-equation">
                    2x + 5 = 15
                  </div>

                  <div className="result-answer">
                    x = 5
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ================= LEARNING ================= */}
        <section className="learning-section" id="learning">
          <div className="home-container">

            <div className="section-heading centered">
              <span className="eyebrow">
                <Map size={14} />
                PERSONALIZED LEARNING
              </span>

              <h2>
                Your Learning Path.
                <span> Your Progress.</span>
              </h2>

              <p>
                Understand what you know, what needs improvement
                and what you should learn next.
              </p>
            </div>


            <div className="learning-dashboard">

              <div className="learning-dashboard-header">
                <div>
                  <span>LEARNING OVERVIEW</span>
                  <h3>Your STEM Journey</h3>
                </div>

                <div className="learning-streak">
                  <Flame size={16} />
                  12 day streak
                </div>
              </div>


              <div className="learning-dashboard-grid">

                <div className="progress-panel">

                  <ProgressRow
                    subject="Mathematics"
                    value="82%"
                    width="82%"
                  />

                  <ProgressRow
                    subject="Physics"
                    value="67%"
                    width="67%"
                  />

                  <ProgressRow
                    subject="Chemistry"
                    value="54%"
                    width="54%"
                  />

                  <ProgressRow
                    subject="Computer Science"
                    value="74%"
                    width="74%"
                  />

                </div>


                <div className="next-topic">

                  <span className="next-topic-label">
                    RECOMMENDED NEXT
                  </span>

                  <div className="next-topic-icon">
                    <Atom size={24} />
                  </div>

                  <h3>
                    Newton's Laws
                  </h3>

                  <p>
                    Continue building your Physics fundamentals.
                  </p>

                  <button>
                    Continue Learning
                    <ChevronRight size={16} />
                  </button>

                </div>


                <div className="learning-metrics">

                  <Metric
                    icon={BookOpen}
                    value="42"
                    label="Topics Learned"
                  />

                  <Metric
                    icon={Target}
                    value="87%"
                    label="Accuracy"
                  />

                  <Metric
                    icon={Flame}
                    value="12"
                    label="Day Streak"
                  />

                  <Metric
                    icon={Zap}
                    value="156"
                    label="Questions Solved"
                  />

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ================= SUBJECTS ================= */}
        <section className="subjects-section">
          <div className="home-container">

            <div className="section-heading centered">
              <span className="eyebrow">
                <BookOpen size={14} />
                STEM SUBJECTS
              </span>

              <h2>
                Built For
                <span> STEM Learners.</span>
              </h2>

              <p>
                Learn the subjects that build the foundation
                for tomorrow's technology.
              </p>
            </div>


            <div className="subjects-grid">

              <SubjectCard
                icon={Calculator}
                title="Mathematics"
                text="Algebra, calculus, geometry and more."
                className="subject-indigo"
              />

              <SubjectCard
                icon={Atom}
                title="Physics"
                text="Motion, forces, energy and the universe."
                className="subject-cyan"
              />

              <SubjectCard
                icon={FlaskConical}
                title="Chemistry"
                text="Atoms, reactions, molecules and matter."
                className="subject-green"
              />

              <SubjectCard
                icon={Code2}
                title="Computer Science"
                text="Algorithms, programming and computer systems."
                className="subject-purple"
              />

            </div>

          </div>
        </section>


        {/* ================= FINAL CTA ================= */}
        <section className="home-cta-section">
          <div className="home-container">

            <div className="home-cta">

              <div className="cta-glow cta-glow-one" />
              <div className="cta-glow cta-glow-two" />

              <div className="cta-content">

                <div className="cta-icon">
                  <Brain size={27} />
                </div>

                <span className="eyebrow">
                  START YOUR JOURNEY
                </span>

                <h2>
                  Ready To
                  <span> Learn Smarter?</span>
                </h2>

                <p>
                  Start your personalized STEM learning journey
                  with an AI tutor designed to help you understand,
                  practice and master difficult concepts.
                </p>

                <div className="cta-buttons">

                  <button
                    className="primary-button"
                    onClick={handleStart}
                  >
                    Start Learning Free
                    <ArrowRight size={18} />
                  </button>

                  <button
                    className="cta-secondary"
                    onClick={() => {
                      document
                        .getElementById('features')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore STEMAI
                  </button>

                </div>

              </div>

            </div>

          </div>
        </section>

      </main>

    </div>
  );
}


/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

function Capability({ icon: Icon, title, text }) {
  return (
    <div className="capability-card">

      <div className="capability-icon">
        <Icon size={20} />
      </div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

    </div>
  );
}


function ToolCard({
  className = '',
  icon: Icon,
  iconClass = '',
  title,
  description,
  children,
}) {
  return (
    <div className={`tool-card ${className}`}>

      <div className="tool-card-top">

        <div className={`tool-icon ${iconClass}`}>
          <Icon size={19} />
        </div>

        <ArrowUpRight />

      </div>

      <div className="tool-card-content">

        <h3>{title}</h3>

        <p>{description}</p>

      </div>

      {children}

    </div>
  );
}


function PathItem({ number, text, completed, active }) {
  return (
    <div className={`path-item ${active ? 'active' : ''}`}>

      <span className={`path-number ${completed ? 'completed' : ''}`}>
        {completed ? <Check size={11} /> : number}
      </span>

      <span>{text}</span>

      {active && (
        <span className="path-active">
          Current
        </span>
      )}

    </div>
  );
}


function Step({ number, icon: Icon, title, text }) {
  return (
    <div className="step-item">

      <div className="step-number">
        {number}
      </div>

      <div className="step-icon">
        <Icon size={24} />
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}


function CheckItem({ children }) {
  return (
    <div className="check-item">

      <span>
        <Check size={14} />
      </span>

      {children}

    </div>
  );
}


function ProgressRow({ subject, value, width }) {
  return (
    <div className="progress-row">

      <div className="progress-row-head">
        <span>{subject}</span>
        <strong>{value}</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width }}
        />
      </div>

    </div>
  );
}


function Metric({ icon: Icon, value, label }) {
  return (
    <div className="metric-card">

      <div className="metric-icon">
        <Icon size={17} />
      </div>

      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>

    </div>
  );
}


function SubjectCard({
  icon: Icon,
  title,
  text,
  className = '',
}) {
  return (
    <div className={`subject-card ${className}`}>

      <div className="subject-icon">
        <Icon size={24} />
      </div>

      <div className="subject-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <ArrowRight className="subject-arrow" size={19} />

    </div>
  );
}


function ArrowUpRight() {
  return (
    <ArrowRight
      size={17}
      className="tool-arrow"
    />
  );
}
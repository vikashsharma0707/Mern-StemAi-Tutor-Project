// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import API from '../services/api';
// import './Login.css';

// export default function Login({ setUser }) {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const { data } = await API.post('/auth/login', form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       setUser(data.user);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-bg-shapes">
//         <div className="auth-shape auth-shape-1" />
//         <div className="auth-shape auth-shape-2" />
//       </div>
//       <div className="auth-container">
//         <div className="auth-brand">
//           <GraduationCap size={40} />
//           <h1>STEMAI Tutor</h1>
//           <p>AI-Powered STEM Education Platform</p>
//         </div>
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <h2>Welcome Back</h2>
//           <p className="auth-subtitle">Sign in to continue learning</p>
//           {error && <div className="alert alert-error">{error}</div>}
//           <div className="auth-field">
//             <Mail size={18} className="auth-field-icon" />
//             <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
//           </div>
//           <div className="auth-field">
//             <Lock size={18} className="auth-field-icon" />
//             <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
//             <button type="button" className="auth-toggle-password" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//           <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
//             {loading ? <div className="spinner spinner-sm" /> : 'Sign In'}
//           </button>
//           <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
//         </form>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Atom,
  ShieldCheck,
} from "lucide-react";
import API from "../services/api";
import "./Login.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* =====================================================
          ANIMATED BACKGROUND
      ====================================================== */}

      <div className="login-grid" />

      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />
      <div className="login-glow login-glow-three" />

      {/* Floating 3D Elements */}
      <div className="floating-orb orb-one">
        <div className="orb-core" />
      </div>

      <div className="floating-orb orb-two">
        <div className="orb-core" />
      </div>

      <div className="floating-orb orb-three">
        <div className="orb-core" />
      </div>

      {/* 3D STEM Objects */}
      <div className="stem-object stem-atom">
        <Atom size={46} />
      </div>

      <div className="stem-object stem-brain">
        <BrainCircuit size={42} />
      </div>

      <div className="stem-object stem-spark">
        <Sparkles size={34} />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="login-wrapper">
        {/* LEFT BRAND PANEL */}
        <div className="login-showcase">
          <div className="showcase-badge">
            <Sparkles size={14} />
            AI-Powered Learning
          </div>

          <h1>
            Learn Smarter.
            <span>Think Deeper.</span>
            <strong>Build the Future.</strong>
          </h1>

          <p>
            Your intelligent STEM learning companion powered by AI.
            Understand complex concepts, practice smarter, and accelerate
            your learning journey.
          </p>

          <div className="showcase-features">
            <div className="showcase-feature">
              <div className="feature-icon">
                <BrainCircuit size={19} />
              </div>

              <div>
                <h3>AI Tutor</h3>
                <span>Personalized explanations</span>
              </div>
            </div>

            <div className="showcase-feature">
              <div className="feature-icon">
                <Atom size={19} />
              </div>

              <div>
                <h3>Visual Learning</h3>
                <span>Understand difficult concepts</span>
              </div>
            </div>

            <div className="showcase-feature">
              <div className="feature-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h3>Smart Progress</h3>
                <span>Track your learning journey</span>
              </div>
            </div>
          </div>

          {/* 3D Decorative Ring */}
          <div className="hero-ring">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />

            <div className="ring-center">
              <GraduationCap size={42} />
            </div>

            <div className="orbit-dot orbit-dot-1" />
            <div className="orbit-dot orbit-dot-2" />
            <div className="orbit-dot orbit-dot-3" />
          </div>
        </div>

        {/* =====================================================
            LOGIN CARD
        ====================================================== */}

        <div className="login-card-wrapper">
          <div className="login-card-glow" />

          <div className="login-card">
            {/* Card top glow */}
            <div className="card-top-line" />

            {/* Logo */}
            <div className="login-logo">
              <div className="logo-icon">
                <GraduationCap size={25} />
              </div>

              <div>
                <span>STEMAI</span>
                <small>TUTOR</small>
              </div>
            </div>

            {/* Heading */}
            <div className="login-heading">
              <div className="welcome-tag">
                <Sparkles size={13} />
                Welcome back
              </div>

              <h2>
                Continue your
                <span>learning journey.</span>
              </h2>

              <p>
                Sign in to access your personalized AI learning workspace.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="login-error">
                <span className="error-dot" />
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="login-field">
                <label>Email address</label>

                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-field">
                <div className="password-label">
                  <label>Password</label>

                  <button type="button" className="forgot-password">
                    Forgot password?
                  </button>
                </div>

                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                <span className="button-shine" />

                {loading ? (
                  <>
                    <span className="login-spinner" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    Sign in to STEMAI
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="login-divider">
              <span />
              <p>OR</p>
              <span />
            </div>

            <p className="register-text">
              New to STEMAI?
              <Link to="/register">
                Create your account
                <ArrowRight size={14} />
              </Link>
            </p>

            {/* Security */}
            <div className="login-security">
              <ShieldCheck size={15} />
              <span>Your data is securely protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="login-footer">
        <span>© 2026 STEMAI Tutor</span>
        <span>Intelligent learning. Infinite possibilities.</span>
      </div>
    </div>
  );
}
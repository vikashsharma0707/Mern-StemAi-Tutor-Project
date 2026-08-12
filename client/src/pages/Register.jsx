// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { GraduationCap, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import API from '../services/api';
// import './Register.css';

// export default function Register({ setUser }) {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
//     if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
//     setLoading(true);
//     try {
//       const { data } = await API.post('/auth/register', { name: form.name, email: form.email, password: form.password });
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       setUser(data.user);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
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
//           <h2>Create Account</h2>
//           <p className="auth-subtitle">Start your STEM learning journey</p>
//           {error && <div className="alert alert-error">{error}</div>}
//           <div className="auth-field">
//             <User size={18} className="auth-field-icon" />
//             <input type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
//           </div>
//           <div className="auth-field">
//             <Mail size={18} className="auth-field-icon" />
//             <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
//           </div>
//           <div className="auth-field">
//             <Lock size={18} className="auth-field-icon" />
//             <input type={showPassword ? 'text' : 'password'} placeholder="Password (min 6 characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
//             <button type="button" className="auth-toggle-password" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//           <div className="auth-field">
//             <Lock size={18} className="auth-field-icon" />
//             <input type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
//           </div>
//           <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
//             {loading ? <div className="spinner spinner-sm" /> : 'Create Account'}
//           </button>
//           <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
//         </form>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Atom,
  Rocket,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import API from "../services/api";
import "./Register.css";

export default function Register({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* =====================================================
          ANIMATED BACKGROUND
      ====================================================== */}

      <div className="register-grid" />

      <div className="register-glow register-glow-one" />
      <div className="register-glow register-glow-two" />
      <div className="register-glow register-glow-three" />

      {/* Floating 3D Orbs */}
      <div className="register-orb register-orb-one">
        <div />
      </div>

      <div className="register-orb register-orb-two">
        <div />
      </div>

      <div className="register-orb register-orb-three">
        <div />
      </div>

      {/* Floating STEM Objects */}
      <div className="register-stem-object register-atom">
        <Atom size={42} />
      </div>

      <div className="register-stem-object register-brain">
        <BrainCircuit size={38} />
      </div>

      <div className="register-stem-object register-rocket">
        <Rocket size={34} />
      </div>

      {/* =====================================================
          MAIN WRAPPER
      ====================================================== */}

      <div className="register-wrapper">

        {/* =================================================
            LEFT SHOWCASE
        ================================================== */}

        <div className="register-showcase">
          <div className="register-badge">
            <Sparkles size={14} />
            Start your AI learning journey
          </div>

          <h1>
            Your Future
            <span>Starts Here.</span>
            <strong>Learn Without Limits.</strong>
          </h1>

          <p>
            Join STEMAI Tutor and transform the way you learn.
            Get personalized explanations, interactive practice,
            visual learning and an AI tutor available whenever
            you need it.
          </p>

          {/* Benefits */}
          <div className="register-benefits">
            <div className="register-benefit">
              <div className="register-benefit-icon">
                <BrainCircuit size={18} />
              </div>

              <div>
                <h3>Personal AI Tutor</h3>
                <span>
                  Learn concepts at your own pace
                </span>
              </div>

              <CheckCircle2
                size={16}
                className="benefit-check"
              />
            </div>

            <div className="register-benefit">
              <div className="register-benefit-icon">
                <Atom size={18} />
              </div>

              <div>
                <h3>Interactive STEM Learning</h3>
                <span>
                  Make difficult topics easier to understand
                </span>
              </div>

              <CheckCircle2
                size={16}
                className="benefit-check"
              />
            </div>

            <div className="register-benefit">
              <div className="register-benefit-icon">
                <Rocket size={18} />
              </div>

              <div>
                <h3>Track Your Progress</h3>
                <span>
                  Build better learning habits
                </span>
              </div>

              <CheckCircle2
                size={16}
                className="benefit-check"
              />
            </div>
          </div>

          {/* 3D Orbital System */}
          <div className="register-orbit-system">
            <div className="register-orbit orbit-a" />
            <div className="register-orbit orbit-b" />
            <div className="register-orbit orbit-c" />

            <div className="register-orbit-center">
              <GraduationCap size={40} />
            </div>

            <span className="register-orbit-dot dot-a" />
            <span className="register-orbit-dot dot-b" />
            <span className="register-orbit-dot dot-c" />
          </div>
        </div>

        {/* =================================================
            REGISTER CARD
        ================================================== */}

        <div className="register-card-wrapper">
          <div className="register-card-glow" />

          <div className="register-card">

            <div className="register-card-top-line" />

            {/* Logo */}
            <div className="register-logo">
              <div className="register-logo-icon">
                <GraduationCap size={24} />
              </div>

              <div>
                <span>STEMAI</span>
                <small>TUTOR</small>
              </div>
            </div>

            {/* Heading */}
            <div className="register-heading">
              <div className="register-welcome">
                <Sparkles size={13} />
                Create your account
              </div>

              <h2>
                Start learning
                <span>smarter today.</span>
              </h2>

              <p>
                Create your free account and unlock your
                personalized AI learning workspace.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="register-error">
                <span className="register-error-dot" />
                {error}
              </div>
            )}

            {/* =================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="register-field">
                <label>Full name</label>

                <div className="register-input-wrapper">
                  <User
                    size={18}
                    className="register-input-icon"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="register-field">
                <label>Email address</label>

                <div className="register-input-wrapper">
                  <Mail
                    size={18}
                    className="register-input-icon"
                  />

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
              <div className="register-field">
                <label>Password</label>

                <div className="register-input-wrapper">
                  <Lock
                    size={18}
                    className="register-input-icon"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 6 characters"
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
                    className="register-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* Password strength */}
                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      <span
                        className={
                          form.password.length >= 1
                            ? "active"
                            : ""
                        }
                      />
                      <span
                        className={
                          form.password.length >= 4
                            ? "active"
                            : ""
                        }
                      />
                      <span
                        className={
                          form.password.length >= 6
                            ? "active"
                            : ""
                        }
                      />
                      <span
                        className={
                          form.password.length >= 10
                            ? "active"
                            : ""
                        }
                      />
                    </div>

                    <span>
                      {form.password.length < 4
                        ? "Weak"
                        : form.password.length < 6
                        ? "Fair"
                        : form.password.length < 10
                        ? "Good"
                        : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="register-field">
                <label>Confirm password</label>

                <div className="register-input-wrapper">
                  <Lock
                    size={18}
                    className="register-input-icon"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {form.confirmPassword && (
                  <div
                    className={
                      form.password ===
                      form.confirmPassword
                        ? "password-match success"
                        : "password-match"
                    }
                  >
                    <CheckCircle2 size={13} />

                    {form.password ===
                    form.confirmPassword
                      ? "Passwords match"
                      : "Passwords don't match"}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="register-submit"
                disabled={loading}
              >
                <span className="register-button-shine" />

                {loading ? (
                  <>
                    <span className="register-spinner" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create my account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="register-divider">
              <span />
              <p>ALREADY A MEMBER?</p>
              <span />
            </div>

            {/* Login */}
            <p className="register-login-text">
              Already have an account?

              <Link to="/login">
                Sign in
                <ArrowRight size={14} />
              </Link>
            </p>

            {/* Security */}
            <div className="register-security">
              <ShieldCheck size={15} />

              <span>
                Your account and data are securely protected
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="register-footer">
        <span>© 2026 STEMAI Tutor</span>

        <span>
          Learn smarter. Build the future.
        </span>
      </div>
    </div>
  );
}
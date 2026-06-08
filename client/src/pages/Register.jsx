import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import API from '../services/api';
import './Register.css';

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', { name: form.name, email: form.email, password: form.password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shapes">
        <div className="auth-shape auth-shape-1" />
        <div className="auth-shape auth-shape-2" />
      </div>
      <div className="auth-container">
        <div className="auth-brand">
          <GraduationCap size={40} />
          <h1>STEMAI Tutor</h1>
          <p>AI-Powered STEM Education Platform</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Start your STEM learning journey</p>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="auth-field">
            <User size={18} className="auth-field-icon" />
            <input type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="auth-field">
            <Mail size={18} className="auth-field-icon" />
            <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="auth-field">
            <Lock size={18} className="auth-field-icon" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password (min 6 characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button type="button" className="auth-toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="auth-field">
            <Lock size={18} className="auth-field-icon" />
            <input type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? <div className="spinner spinner-sm" /> : 'Create Account'}
          </button>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}

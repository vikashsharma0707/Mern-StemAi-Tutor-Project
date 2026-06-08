import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import API from '../services/api';
import './Login.css';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue learning</p>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="auth-field">
            <Mail size={18} className="auth-field-icon" />
            <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="auth-field">
            <Lock size={18} className="auth-field-icon" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button type="button" className="auth-toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? <div className="spinner spinner-sm" /> : 'Sign In'}
          </button>
          <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
        </form>
      </div>
    </div>
  );
}

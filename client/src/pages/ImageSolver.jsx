import { useState, useRef } from 'react';
import { Image, Upload, Camera, Copy, Check, Trash2 } from 'lucide-react';
import API from '../services/api';
import './ImageSolver.css';

const SUBJECTS = ['General', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

export default function ImageSolver({ user }) {
  const [imageBase64, setImageBase64] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [subject, setSubject] = useState('General');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) { setError('Please upload a valid image file'); return; }
    const reader = new FileReader();
    reader.onload = () => { setImageBase64(reader.result); setImageUrl(URL.createObjectURL(file)); setSolution(''); setError(''); };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); handleFile(e.dataTransfer.files[0]); };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); };
  const handleImageChange = (e) => handleFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!imageBase64) { setError('Please upload an image'); return; }
    setLoading(true); setError(''); setSolution('');
    try {
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      const { data } = await API.post('/image/solve', { imageBase64: base64Data, subject });
      setSolution(data.solution);
    } catch (err) { setError(err.response?.data?.message || 'Failed to analyze image'); }
    finally { setLoading(false); }
  };

  const handleCopy = () => { navigator.clipboard.writeText(solution); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const clearImage = () => { setImageBase64(null); setImageUrl(null); setSolution(''); setError(''); };

  return (
    <div className="image-page">
      <div className="image-header">
        <div className="image-header-icon"><Image size={24} /></div>
        <div><h1>Image Question Solver</h1><p>Upload a photo of any STEM problem and get a detailed solution</p></div>
      </div>

      <div className="image-upload-section">
        <div className={`image-drop-zone card ${dragging ? 'image-drop-zone-dragging' : ''} ${imageUrl ? 'image-has-preview' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
          {imageUrl ? (
            <div className="image-preview"><img src={imageUrl} alt="Uploaded problem" /><button className="image-clear-btn" onClick={clearImage}><Trash2 size={16} /></button></div>
          ) : (
            <div className="image-drop-content"><Upload size={40} className="image-drop-icon" /><p>Drag & drop an image here, or click to upload</p><span className="image-drop-hint">Supports PNG, JPG, WEBP</span></div>
          )}
          <input ref={fileInput} type="file" accept="image/*" onChange={handleImageChange} className="image-file-input" />
        </div>

        <div className="image-controls card">
          <button className="btn btn-secondary btn-lg" onClick={() => fileInput.current?.click()}><Camera size={18} /> Choose Image</button>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select>
          <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={loading || !imageBase64}>{loading ? <><div className="spinner spinner-sm" /> Analyzing...</> : <><Image size={18} /> Solve</>}</button>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
      </div>

      {solution && (
        <div className="image-solution card">
          <div className="image-solution-header"><h2>Solution</h2><button className="btn btn-secondary btn-sm" onClick={handleCopy}>{copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}</button></div>
          <div className="image-solution-text">{solution}</div>
        </div>
      )}
    </div>
  );
}

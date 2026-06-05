import { useState, useRef } from 'react';
import { Image, Upload, X, Camera, FileText } from 'lucide-react';
import { supabase } from '../utils/supabase';
import './ImageSolver.css';

const SUBJECTS = ['General', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

export default function ImageSolver({ user }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [subject, setSubject] = useState('General');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }
    setError('');
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        handleFile(item.getAsFile());
        break;
      }
    }
  };

  const handleSolve = async () => {
    if (!imagePreview) {
      setError('Please upload an image first');
      return;
    }

    setLoading(true);
    setError('');
    setSolution('');

    try {
      const { data, error: aiError } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: `You are STEMAI Tutor, an expert at solving STEM problems from images. Analyze the image carefully and provide:
1. A clear identification of what the question/problem is asking
2. A step-by-step solution with explanations
3. Key concepts involved
4. Tips for similar problems

Subject context: ${subject}`,
            },
            {
              role: 'user',
              content: [
                { type: 'text', text: 'Please solve this problem from the image. Provide a detailed step-by-step solution.' },
                { type: 'image_url', image_url: { url: imagePreview } },
              ],
            },
          ],
          model: 'google/gemini-flash-1.5',
          maxTokens: 2048,
          temperature: 0.5,
        },
      });

      if (aiError) throw new Error(aiError.message || 'AI request failed');

      // Save to database
      await supabase.from('image_solutions').insert({
        user_id: user.id,
        solution: data.message,
        subject,
      });

      setSolution(data.message);
    } catch (err) {
      setError(err.message || 'Failed to solve image question');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setImagePreview(null);
    setSolution('');
    setError('');
  };

  return (
    <div className="solver-page" onPaste={handlePaste}>
      <div className="solver-header">
        <div className="solver-header-icon">
          <Image size={24} />
        </div>
        <div>
          <h1>Image Question Solver</h1>
          <p>Upload a photo of your question and get a step-by-step solution</p>
        </div>
      </div>

      <div className="solver-content">
        <div className="solver-upload-section">
          <div
            className={`solver-dropzone ${dragActive ? 'solver-dropzone-active' : ''} ${imagePreview ? 'solver-dropzone-has-image' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !imagePreview && fileRef.current?.click()}
          >
            {imagePreview ? (
              <div className="solver-preview">
                <img src={imagePreview} alt="Uploaded question" />
                <button className="solver-remove-btn" onClick={handleClear}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="solver-dropzone-content">
                <Upload size={32} />
                <p>Drop an image here, paste from clipboard, or click to upload</p>
                <span className="solver-dropzone-hint">Supports JPG, PNG — Max 5MB</span>
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <div className="solver-options">
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <button
            className="btn btn-primary btn-lg solver-solve-btn"
            onClick={handleSolve}
            disabled={loading || !imagePreview}
          >
            {loading ? <><div className="spinner spinner-sm" /> Analyzing...</> : <><Camera size={18} /> Solve Question</>}
          </button>

          {error && <div className="alert alert-error">{error}</div>}
        </div>

        {solution && (
          <div className="solver-solution card">
            <div className="solver-solution-header">
              <FileText size={20} />
              <h2>Step-by-Step Solution</h2>
            </div>
            <div className="solver-solution-text">{solution}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// // import { useState, useRef } from 'react';
// // import { Image, Upload, Camera, Copy, Check, Trash2 } from 'lucide-react';
// // import API from '../services/api';
// // import './ImageSolver.css';

// // const SUBJECTS = ['General', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

// // export default function ImageSolver({ user }) {
// //   const [imageBase64, setImageBase64] = useState(null);
// //   const [imageUrl, setImageUrl] = useState(null);
// //   const [subject, setSubject] = useState('General');
// //   const [solution, setSolution] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [copied, setCopied] = useState(false);
// //   const [dragging, setDragging] = useState(false);
// //   const fileInput = useRef(null);

// //   const handleFile = (file) => {
// //     if (!file || !file.type.startsWith('image/')) { setError('Please upload a valid image file'); return; }
// //     const reader = new FileReader();
// //     reader.onload = () => { setImageBase64(reader.result); setImageUrl(URL.createObjectURL(file)); setSolution(''); setError(''); };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); handleFile(e.dataTransfer.files[0]); };
// //   const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); };
// //   const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); };
// //   const handleImageChange = (e) => handleFile(e.target.files[0]);

// //   const handleSubmit = async () => {
// //     if (!imageBase64) { setError('Please upload an image'); return; }
// //     setLoading(true); setError(''); setSolution('');
// //     try {
// //       const base64Data = imageBase64.split(',')[1] || imageBase64;
// //       const { data } = await API.post('/image/solve', { imageBase64: base64Data, subject });
// //       setSolution(data.solution);
// //     } catch (err) { setError(err.response?.data?.message || 'Failed to analyze image'); }
// //     finally { setLoading(false); }
// //   };

// //   const handleCopy = () => { navigator.clipboard.writeText(solution); setCopied(true); setTimeout(() => setCopied(false), 2000); };
// //   const clearImage = () => { setImageBase64(null); setImageUrl(null); setSolution(''); setError(''); };

// //   return (
// //     <div className="image-page">
// //       <div className="image-header">
// //         <div className="image-header-icon"><Image size={24} /></div>
// //         <div><h1>Image Question Solver</h1><p>Upload a photo of any STEM problem and get a detailed solution</p></div>
// //       </div>

// //       <div className="image-upload-section">
// //         <div className={`image-drop-zone card ${dragging ? 'image-drop-zone-dragging' : ''} ${imageUrl ? 'image-has-preview' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
// //           {imageUrl ? (
// //             <div className="image-preview"><img src={imageUrl} alt="Uploaded problem" /><button className="image-clear-btn" onClick={clearImage}><Trash2 size={16} /></button></div>
// //           ) : (
// //             <div className="image-drop-content"><Upload size={40} className="image-drop-icon" /><p>Drag & drop an image here, or click to upload</p><span className="image-drop-hint">Supports PNG, JPG, WEBP</span></div>
// //           )}
// //           <input ref={fileInput} type="file" accept="image/*" onChange={handleImageChange} className="image-file-input" />
// //         </div>

// //         <div className="image-controls card">
// //           <button className="btn btn-secondary btn-lg" onClick={() => fileInput.current?.click()}><Camera size={18} /> Choose Image</button>
// //           <select value={subject} onChange={(e) => setSubject(e.target.value)}>{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select>
// //           <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={loading || !imageBase64}>{loading ? <><div className="spinner spinner-sm" /> Analyzing...</> : <><Image size={18} /> Solve</>}</button>
// //         </div>
// //         {error && <div className="alert alert-error">{error}</div>}
// //       </div>

// //       {solution && (
// //         <div className="image-solution card">
// //           <div className="image-solution-header"><h2>Solution</h2><button className="btn btn-secondary btn-sm" onClick={handleCopy}>{copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}</button></div>
// //           <div className="image-solution-text">{solution}</div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import { useState, useRef } from 'react';
// import {
//   Image as ImageIcon,
//   Upload,
//   Camera,
//   Copy,
//   Check,
//   Trash2,
//   Sparkles,
//   ScanLine,
//   Brain,
//   ArrowRight,
//   ShieldCheck,
// } from 'lucide-react';
// import API from '../services/api';
// import './ImageSolver.css';

// const SUBJECTS = [
//   'General',
//   'Mathematics',
//   'Physics',
//   'Chemistry',
//   'Biology',
//   'Computer Science',
// ];

// export default function ImageSolver({ user }) {
//   const [imageBase64, setImageBase64] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [subject, setSubject] = useState('General');
//   const [solution, setSolution] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [dragging, setDragging] = useState(false);

//   const fileInput = useRef(null);

//   const handleFile = (file) => {
//     if (!file || !file.type.startsWith('image/')) {
//       setError('Please upload a valid image file');
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setImageBase64(reader.result);
//       setImageUrl(URL.createObjectURL(file));
//       setSolution('');
//       setError('');
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setDragging(false);

//     handleFile(e.dataTransfer.files[0]);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setDragging(false);
//   };

//   const handleImageChange = (e) => {
//     handleFile(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     if (!imageBase64) {
//       setError('Please upload an image');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSolution('');

//     try {
//       const base64Data =
//         imageBase64.split(',')[1] || imageBase64;

//       const { data } = await API.post('/image/solve', {
//         imageBase64: base64Data,
//         subject,
//       });

//       setSolution(data.solution);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           'Failed to analyze image'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(solution);

//     setCopied(true);

//     setTimeout(() => {
//       setCopied(false);
//     }, 2000);
//   };

//   const clearImage = () => {
//     setImageBase64(null);
//     setImageUrl(null);
//     setSolution('');
//     setError('');

//     if (fileInput.current) {
//       fileInput.current.value = '';
//     }
//   };

//   return (
//     <div className="image-page">

//       {/* Background 3D Elements */}
//       <div className="image-bg-orb image-bg-orb-1" />
//       <div className="image-bg-orb image-bg-orb-2" />
//       <div className="image-grid" />

//       {/* Header */}
//       <header className="image-header">

//         <div className="image-header-left">

//           <div className="image-header-icon">
//             <ScanLine size={26} />
//             <span className="icon-glow" />
//           </div>

//           <div>
//             <div className="image-eyebrow">
//               <Sparkles size={13} />
//               AI VISION ENGINE
//             </div>

//             <h1>Image Question Solver</h1>

//             <p>
//               Turn any STEM problem into a clear,
//               step-by-step AI solution.
//             </p>
//           </div>

//         </div>

//         <div className="image-header-badge">
//           <span className="status-dot" />
//           AI Ready
//         </div>

//       </header>


//       {/* Main Workspace */}
//       <div className="image-workspace">

//         {/* Upload Card */}
//         <section className="image-main-card">

//           <div className="image-card-top">

//             <div>
//               <span className="image-card-number">01</span>

//               <div>
//                 <h2>Upload Problem</h2>
//                 <p>
//                   Upload a photo, screenshot or scanned
//                   question.
//                 </p>
//               </div>
//             </div>

//             <div className="image-mini-icon">
//               <Brain size={20} />
//             </div>

//           </div>


//           {/* Drop Zone */}
//           <div
//             className={`
//               image-drop-zone
//               ${dragging ? 'image-drop-zone-dragging' : ''}
//               ${imageUrl ? 'image-has-preview' : ''}
//             `}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onClick={() =>
//               !imageUrl && fileInput.current?.click()
//             }
//           >

//             {imageUrl ? (

//               <div className="image-preview">

//                 <div className="preview-image-wrapper">
//                   <img
//                     src={imageUrl}
//                     alt="Uploaded problem"
//                   />

//                   <div className="preview-scan-line" />
//                 </div>

//                 <div className="preview-overlay">
//                   <div className="preview-status">
//                     <Check size={14} />
//                     Image Ready
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="image-clear-btn"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     clearImage();
//                   }}
//                 >
//                   <Trash2 size={17} />
//                 </button>

//               </div>

//             ) : (

//               <div className="image-drop-content">

//                 <div className="upload-3d-icon">
//                   <div className="upload-icon-back" />
//                   <div className="upload-icon-front">
//                     <Upload size={34} />
//                   </div>
//                 </div>

//                 <h3>
//                   Drop your problem here
//                 </h3>

//                 <p>
//                   or click anywhere to browse your device
//                 </p>

//                 <div className="image-format-list">
//                   <span>PNG</span>
//                   <span>JPG</span>
//                   <span>WEBP</span>
//                 </div>

//                 <div className="upload-security">
//                   <ShieldCheck size={14} />
//                   Your image is securely processed
//                 </div>

//               </div>
//             )}

//             <input
//               ref={fileInput}
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="image-file-input"
//             />

//           </div>


//           {/* Controls */}
//           <div className="image-controls">

//             <div className="image-control-group">

//               <label>
//                 <span>SUBJECT</span>
//               </label>

//               <div className="image-select-wrapper">
//                 <BookIcon />
//                 <select
//                   value={subject}
//                   onChange={(e) =>
//                     setSubject(e.target.value)
//                   }
//                 >
//                   {SUBJECTS.map((s) => (
//                     <option key={s} value={s}>
//                       {s}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//             </div>


//             <div className="image-action-buttons">

//               <button
//                 type="button"
//                 className="image-secondary-btn"
//                 onClick={() =>
//                   fileInput.current?.click()
//                 }
//               >
//                 <Camera size={17} />
//                 Choose Image
//               </button>

//               <button
//                 type="button"
//                 className="image-solve-btn"
//                 onClick={handleSubmit}
//                 disabled={loading || !imageBase64}
//               >

//                 {loading ? (
//                   <>
//                     <span className="image-spinner" />
//                     Analyzing...
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles size={17} />
//                     Solve with AI
//                     <ArrowRight size={17} />
//                   </>
//                 )}

//               </button>

//             </div>

//           </div>


//           {/* Error */}
//           {error && (
//             <div className="image-error">
//               <span>!</span>
//               {error}
//             </div>
//           )}

//         </section>


//         {/* Right Info Panel */}
//         <aside className="image-info-panel">

//           <div className="info-3d-orb">
//             <div className="info-orb-inner">
//               <Brain size={38} />
//             </div>

//             <div className="orb-ring orb-ring-1" />
//             <div className="orb-ring orb-ring-2" />
//           </div>

//           <span className="info-label">
//             AI VISION
//           </span>

//           <h2>
//             Understand.
//             <br />
//             <span>Solve. Learn.</span>
//           </h2>

//           <p>
//             STEMAI analyzes your uploaded problem and
//             generates an easy-to-understand solution
//             with reasoning.
//           </p>

//           <div className="info-features">

//             <InfoItem
//               number="01"
//               title="Detect"
//               text="AI reads your question"
//             />

//             <InfoItem
//               number="02"
//               title="Reason"
//               text="Analyzes the problem"
//             />

//             <InfoItem
//               number="03"
//               title="Explain"
//               text="Creates a clear solution"
//             />

//           </div>

//         </aside>

//       </div>


//       {/* Solution */}
//       {solution && (

//         <section className="image-solution">

//           <div className="solution-header">

//             <div className="solution-title">

//               <div className="solution-icon">
//                 <Check size={20} />
//               </div>

//               <div>
//                 <span>AI ANALYSIS COMPLETE</span>
//                 <h2>Solution</h2>
//               </div>

//             </div>

//             <button
//               className="solution-copy-btn"
//               onClick={handleCopy}
//             >
//               {copied ? (
//                 <>
//                   <Check size={15} />
//                   Copied
//                 </>
//               ) : (
//                 <>
//                   <Copy size={15} />
//                   Copy Solution
//                 </>
//               )}
//             </button>

//           </div>


//           <div className="solution-content">

//             <div className="solution-line" />

//             <div className="image-solution-text">
//               {solution}
//             </div>

//           </div>

//         </section>

//       )}

//     </div>
//   );
// }


// /* Small helper icon */
// function BookIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//       <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
//     </svg>
//   );
// }


// function InfoItem({ number, title, text }) {
//   return (
//     <div className="info-feature">

//       <div className="info-feature-number">
//         {number}
//       </div>

//       <div>
//         <strong>{title}</strong>
//         <span>{text}</span>
//       </div>

//     </div>
//   );
// }




import { useState, useRef, useEffect } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Camera,
  Copy,
  Check,
  Trash2,
  Sparkles,
  ScanLine,
  Brain,
  ArrowRight,
  ShieldCheck,
  History,
  X,
  Loader2,
  Clock,
} from 'lucide-react';
import API from '../services/api';
import './ImageSolver.css';

const SUBJECTS = [
  'General',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
];

export default function ImageSolver({ user }) {
  const [imageBase64, setImageBase64] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [subject, setSubject] = useState('General');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);

  // History
  const [showHistory, setShowHistory] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [savedToast, setSavedToast] = useState(false);
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [viewingHistory, setViewingHistory] = useState(false);

  const fileInput = useRef(null);

  const showSavedToast = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError('');
    try {
      const { data } = await API.get('/image/history');
      setImageHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      setHistoryError(
        err.response?.data?.message || 'Failed to load history'
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory]);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImageBase64(reader.result);
      setImageUrl(URL.createObjectURL(file));
      setSolution('');
      setError('');
      setViewingHistory(false);
      setActiveHistoryId(null);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleImageChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!imageBase64) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    setError('');
    setSolution('');
    setViewingHistory(false);

    try {
      const base64Data =
        imageBase64.split(',')[1] || imageBase64;

      const { data } = await API.post('/image/solve', {
        imageBase64: base64Data,
        subject,
      });

      setSolution(data.solution);
      if (data.id) setActiveHistoryId(data.id);
      showSavedToast();

      if (showHistory) {
        fetchHistory();
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to analyze image'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearImage = () => {
    setImageBase64(null);
    setImageUrl(null);
    setSolution('');
    setError('');
    setViewingHistory(false);
    setActiveHistoryId(null);

    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  const loadHistoryItem = (item) => {
    setSubject(item.subject || 'General');
    setSolution(item.solution || '');
    setActiveHistoryId(item._id);
    setViewingHistory(true);
    setShowHistory(false);
    setError('');
    // Image is not stored in DB — only solution
    setImageBase64(null);
    setImageUrl(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  const getPreview = (text) => {
    if (!text) return 'No solution';
    return text.length > 80 ? text.slice(0, 80) + '...' : text;
  };

  return (
    <div className="image-page">

      {/* Background 3D Elements */}
      <div className="image-bg-orb image-bg-orb-1" />
      <div className="image-bg-orb image-bg-orb-2" />
      <div className="image-grid" />

      {/* Saved toast */}
      {savedToast && (
        <div className="image-saved-toast">
          <History size={14} />
          <span>Saved to History</span>
        </div>
      )}

      {/* History overlay + panel */}
      {showHistory && (
        <div
          className="image-history-overlay"
          onClick={() => setShowHistory(false)}
        />
      )}

      <aside
        className={`image-history-panel ${
          showHistory ? 'image-history-open' : ''
        }`}
      >
        <div className="image-history-header">
          <div className="image-history-title">
            <History size={18} />
            <span>Image Solver History</span>
          </div>
          <button
            type="button"
            className="image-history-close"
            onClick={() => setShowHistory(false)}
          >
            <X size={18} />
          </button>
        </div>

        <p className="image-history-hint">
          Solutions are auto-saved. Click any item to view the answer again.
          (Original image is not stored.)
        </p>

        <div className="image-history-list">
          {historyLoading && (
            <div className="image-history-loading">
              <Loader2 size={22} className="image-spin" />
              <span>Loading history...</span>
            </div>
          )}

          {historyError && (
            <div className="image-history-error">
              {historyError}
              <button type="button" onClick={fetchHistory}>
                Retry
              </button>
            </div>
          )}

          {!historyLoading &&
            !historyError &&
            imageHistory.length === 0 && (
              <div className="image-history-empty">
                <ScanLine size={32} />
                <p>No solutions yet</p>
                <span>Solve an image problem — it will appear here</span>
              </div>
            )}

          {!historyLoading &&
            imageHistory.map((item) => (
              <button
                key={item._id}
                type="button"
                className={`image-history-item ${
                  activeHistoryId === item._id
                    ? 'image-history-item-active'
                    : ''
                }`}
                onClick={() => loadHistoryItem(item)}
              >
                <div className="image-history-item-top">
                  <span className="image-history-subject">
                    {item.subject || 'General'}
                  </span>
                  <span className="image-history-time">
                    <Clock size={11} />
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <p className="image-history-preview">
                  {getPreview(item.solution)}
                </p>
              </button>
            ))}
        </div>
      </aside>

      {/* Header */}
      <header className="image-header">

        <div className="image-header-left">

          <div className="image-header-icon">
            <ScanLine size={26} />
            <span className="icon-glow" />
          </div>

          <div>
            <div className="image-eyebrow">
              <Sparkles size={13} />
              AI VISION ENGINE
            </div>

            <h1>Image Question Solver</h1>

            <p>
              Turn any STEM problem into a clear,
              step-by-step AI solution.
            </p>
          </div>

        </div>

        <div className="image-header-right">
          <button
            type="button"
            className={`image-history-toggle ${
              showHistory ? 'image-history-toggle-active' : ''
            }`}
            onClick={() => setShowHistory((v) => !v)}
            title="Solver History"
          >
            <History size={15} />
            <span>History</span>
          </button>

          <div className="image-header-badge">
            <span className="status-dot" />
            AI Ready
          </div>
        </div>

      </header>

      {viewingHistory && solution && (
        <div className="image-history-banner">
          <History size={15} />
          <span>Viewing past solution (image not stored)</span>
          <button type="button" onClick={clearImage}>
            New Solve
          </button>
        </div>
      )}

      {/* Main Workspace */}
      <div className="image-workspace">

        {/* Upload Card */}
        <section className="image-main-card">

          <div className="image-card-top">

            <div>
              <span className="image-card-number">01</span>

              <div>
                <h2>Upload Problem</h2>
                <p>
                  Upload a photo, screenshot or scanned
                  question.
                </p>
              </div>
            </div>

            <div className="image-mini-icon">
              <Brain size={20} />
            </div>

          </div>


          {/* Drop Zone */}
          <div
            className={`
              image-drop-zone
              ${dragging ? 'image-drop-zone-dragging' : ''}
              ${imageUrl ? 'image-has-preview' : ''}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() =>
              !imageUrl && fileInput.current?.click()
            }
          >

            {imageUrl ? (

              <div className="image-preview">

                <div className="preview-image-wrapper">
                  <img
                    src={imageUrl}
                    alt="Uploaded problem"
                  />

                  <div className="preview-scan-line" />
                </div>

                <div className="preview-overlay">
                  <div className="preview-status">
                    <Check size={14} />
                    Image Ready
                  </div>
                </div>

                <button
                  type="button"
                  className="image-clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearImage();
                  }}
                >
                  <Trash2 size={17} />
                </button>

              </div>

            ) : (

              <div className="image-drop-content">

                <div className="upload-3d-icon">
                  <div className="upload-icon-back" />
                  <div className="upload-icon-front">
                    <Upload size={34} />
                  </div>
                </div>

                <h3>
                  Drop your problem here
                </h3>

                <p>
                  or click anywhere to browse your device
                </p>

                <div className="image-format-list">
                  <span>PNG</span>
                  <span>JPG</span>
                  <span>WEBP</span>
                </div>

                <div className="upload-security">
                  <ShieldCheck size={14} />
                  Your image is securely processed
                </div>

              </div>
            )}

            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-file-input"
            />

          </div>


          {/* Controls */}
          <div className="image-controls">

            <div className="image-control-group">

              <label>
                <span>SUBJECT</span>
              </label>

              <div className="image-select-wrapper">
                <BookIcon />
                <select
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

            </div>


            <div className="image-action-buttons">

              <button
                type="button"
                className="image-secondary-btn"
                onClick={() =>
                  fileInput.current?.click()
                }
              >
                <Camera size={17} />
                Choose Image
              </button>

              <button
                type="button"
                className="image-solve-btn"
                onClick={handleSubmit}
                disabled={loading || !imageBase64}
              >

                {loading ? (
                  <>
                    <span className="image-spinner" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Solve with AI
                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </div>

          </div>


          {/* Error */}
          {error && (
            <div className="image-error">
              <span>!</span>
              {error}
            </div>
          )}

        </section>


        {/* Right Info Panel */}
        <aside className="image-info-panel">

          <div className="info-3d-orb">
            <div className="info-orb-inner">
              <Brain size={38} />
            </div>

            <div className="orb-ring orb-ring-1" />
            <div className="orb-ring orb-ring-2" />
          </div>

          <span className="info-label">
            AI VISION
          </span>

          <h2>
            Understand.
            <br />
            <span>Solve. Learn.</span>
          </h2>

          <p>
            STEMAI analyzes your uploaded problem and
            generates an easy-to-understand solution
            with reasoning.
          </p>

          <div className="info-features">

            <InfoItem
              number="01"
              title="Detect"
              text="AI reads your question"
            />

            <InfoItem
              number="02"
              title="Reason"
              text="Analyzes the problem"
            />

            <InfoItem
              number="03"
              title="Explain"
              text="Creates a clear solution"
            />

          </div>

        </aside>

      </div>


      {/* Solution */}
      {solution && (

        <section className="image-solution">

          <div className="solution-header">

            <div className="solution-title">

              <div className="solution-icon">
                <Check size={20} />
              </div>

              <div>
                <span>
                  {viewingHistory
                    ? 'PAST SOLUTION'
                    : 'AI ANALYSIS COMPLETE'}
                </span>
                <h2>Solution</h2>
              </div>

            </div>

            <button
              className="solution-copy-btn"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check size={15} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy Solution
                </>
              )}
            </button>

          </div>


          <div className="solution-content">

            <div className="solution-line" />

            <div className="image-solution-text">
              {solution}
            </div>

          </div>

        </section>

      )}

    </div>
  );
}


/* Small helper icon */
function BookIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}


function InfoItem({ number, title, text }) {
  return (
    <div className="info-feature">

      <div className="info-feature-number">
        {number}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

    </div>
  );
}

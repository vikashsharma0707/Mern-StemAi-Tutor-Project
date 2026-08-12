// // import { useState, useRef, useEffect } from 'react';
// // import { Send, Bot, User, Trash2, GraduationCap, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
// // import API from '../services/api';
// // import './ChatTutor.css';

// // const SUBJECTS = ['General', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

// // export default function ChatTutor({ user }) {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [subject, setSubject] = useState('General');
// //   const [chatId, setChatId] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [isListening, setIsListening] = useState(false);
// //   const [ttsEnabled, setTtsEnabled] = useState(false);
// //   const [speakingId, setSpeakingId] = useState(null);
// //   const messagesEnd = useRef(null);
// //   const inputRef = useRef(null);
// //   const recognitionRef = useRef(null);

// //   useEffect(() => {
// //     messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   useEffect(() => {
// //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// //     if (SpeechRecognition) {
// //       const recognition = new SpeechRecognition();
// //       recognition.continuous = false;
// //       recognition.interimResults = false;
// //       recognition.lang = 'en-US';
// //       recognition.onresult = (e) => { setInput(prev => prev + e.results[0][0].transcript); setIsListening(false); };
// //       recognition.onerror = () => setIsListening(false);
// //       recognition.onend = () => setIsListening(false);
// //       recognitionRef.current = recognition;
// //     }
// //     return () => { if (recognitionRef.current) recognitionRef.current.abort(); window.speechSynthesis.cancel(); };
// //   }, []);

// //   const toggleListening = () => {
// //     if (!recognitionRef.current) return;
// //     if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
// //     else { recognitionRef.current.start(); setIsListening(true); }
// //   };

// //   const speakText = (text, id) => {
// //     if (speakingId === id) { window.speechSynthesis.cancel(); setSpeakingId(null); return; }
// //     window.speechSynthesis.cancel();
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.rate = 0.95;
// //     utterance.onend = () => setSpeakingId(null);
// //     window.speechSynthesis.speak(utterance);
// //     setSpeakingId(id);
// //   };

// //   const handleSend = async (e) => {
// //     e.preventDefault();
// //     const text = input.trim();
// //     if (!text || loading) return;
// //     setMessages(prev => [...prev, { role: 'user', content: text }]);
// //     setInput('');
// //     setLoading(true);
// //     window.speechSynthesis.cancel();
// //     setSpeakingId(null);
// //     try {
// //       const { data } = await API.post('/chat/send', { chatId, message: text, subject });
// //       if (!chatId) setChatId(data.chatId);
// //       const assistantMsg = { role: 'assistant', content: data.reply };
// //       setMessages(prev => [...prev, assistantMsg]);
// //       if (ttsEnabled) {
// //         const utterance = new SpeechSynthesisUtterance(data.reply);
// //         utterance.rate = 0.95;
// //         utterance.onend = () => setSpeakingId(null);
// //         window.speechSynthesis.speak(utterance);
// //         setSpeakingId(`msg-${messages.length + 2}`);
// //       }
// //     } catch (err) {
// //       setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.response?.data?.message || 'Request failed'}` }]);
// //     } finally { setLoading(false); inputRef.current?.focus(); }
// //   };

// //   const handleNewChat = () => { setMessages([]); setChatId(null); setInput(''); window.speechSynthesis.cancel(); setSpeakingId(null); };
// //   const speechSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

// //   return (
// //     <div className="chat-page">
// //       <div className="chat-header">
// //         <div className="chat-header-info">
// //           <div className="chat-header-icon"><GraduationCap size={22} /></div>
// //           <div><h1 className="chat-title">AI Chat Tutor</h1><p className="chat-subtitle">Ask any STEM question</p></div>
// //         </div>
// //         <div className="chat-header-actions">
// //           <button className={`chat-voice-toggle ${ttsEnabled ? 'chat-voice-active' : ''}`} onClick={() => setTtsEnabled(!ttsEnabled)}>{ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>{ttsEnabled ? 'Voice On' : 'Voice Off'}</span></button>
// //           <select value={subject} onChange={(e) => setSubject(e.target.value)} className="chat-subject-select">{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select>
// //           <button className="btn btn-secondary btn-sm" onClick={handleNewChat}><Trash2 size={14} /> New Chat</button>
// //         </div>
// //       </div>

// //       <div className="chat-messages">
// //         {messages.length === 0 && (
// //           <div className="chat-empty">
// //             <GraduationCap size={48} />
// //             <h2>Start a conversation</h2>
// //             <p>Ask me anything about Math, Physics, Chemistry, Biology, or Computer Science</p>
// //             <div className="chat-suggestions">
// //               {['Explain quantum entanglement', 'How do I solve quadratic equations?', 'What is object-oriented programming?'].map(s => (
// //                 <button key={s} className="chat-suggestion" onClick={() => setInput(s)}>{s}</button>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //         {messages.map((msg, i) => (
// //           <div key={i} className={`chat-message chat-message-${msg.role}`}>
// //             <div className="chat-message-avatar">{msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}</div>
// //             <div className="chat-message-content">
// //               <div className="chat-message-sender">{msg.role === 'user' ? 'You' : 'STEMAI Tutor'}</div>
// //               <div className="chat-message-text">{msg.content}</div>
// //               {msg.role === 'assistant' && <button className={`chat-speak-btn ${speakingId === `msg-${i}` ? 'chat-speak-active' : ''}`} onClick={() => speakText(msg.content, `msg-${i}`)}>{speakingId === `msg-${i}` ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>}
// //             </div>
// //           </div>
// //         ))}
// //         {loading && <div className="chat-message chat-message-assistant"><div className="chat-message-avatar"><Bot size={18} /></div><div className="chat-message-content"><div className="chat-message-sender">STEMAI Tutor</div><div className="chat-typing"><span></span><span></span><span></span></div></div></div>}
// //         <div ref={messagesEnd} />
// //       </div>

// //       <form className="chat-input-area" onSubmit={handleSend}>
// //         {speechSupported && <button type="button" className={`chat-mic-btn ${isListening ? 'chat-mic-active' : ''}`} onClick={toggleListening}>{isListening ? <MicOff size={18} /> : <Mic size={18} />}</button>}
// //         <input ref={inputRef} type="text" placeholder={isListening ? 'Listening...' : 'Ask a STEM question...'} value={input} onChange={(e) => setInput(e.target.value)} disabled={loading} className="chat-input" />
// //         <button type="submit" className="chat-send-btn" disabled={loading || !input.trim()}><Send size={18} /></button>
// //       </form>
// //     </div>
// //   );
// // }




// import {
//   useState,
//   useRef,
//   useEffect,
// } from 'react';

// import {
//   Send,
//   Bot,
//   User,
//   Trash2,
//   GraduationCap,
//   Mic,
//   MicOff,
//   Volume2,
//   VolumeX,
//   Sparkles,
//   Atom,
//   Brain,
//   Zap,
//   ChevronDown,
// } from 'lucide-react';

// import API from '../services/api';
// import './ChatTutor.css';

// const SUBJECTS = [
//   'General',
//   'Mathematics',
//   'Physics',
//   'Chemistry',
//   'Biology',
//   'Computer Science',
// ];

// const SUGGESTIONS = [
//   {
//     icon: Atom,
//     text: 'Explain quantum entanglement',
//   },
//   {
//     icon: Brain,
//     text: 'How do I solve quadratic equations?',
//   },
//   {
//     icon: Zap,
//     text: 'What is object-oriented programming?',
//   },
// ];

// export default function ChatTutor({ user }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [subject, setSubject] = useState('General');
//   const [chatId, setChatId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [ttsEnabled, setTtsEnabled] = useState(false);
//   const [speakingId, setSpeakingId] = useState(null);

//   const messagesEnd = useRef(null);
//   const inputRef = useRef(null);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     messagesEnd.current?.scrollIntoView({
//       behavior: 'smooth',
//     });
//   }, [messages, loading]);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition ||
//       window.webkitSpeechRecognition;

//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();

//       recognition.continuous = false;
//       recognition.interimResults = false;
//       recognition.lang = 'en-US';

//       recognition.onresult = (e) => {
//         setInput(
//           (prev) =>
//             prev +
//             e.results[0][0].transcript
//         );

//         setIsListening(false);
//       };

//       recognition.onerror = () => {
//         setIsListening(false);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognitionRef.current = recognition;
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//       }

//       window.speechSynthesis.cancel();
//     };
//   }, []);

//   const toggleListening = () => {
//     if (!recognitionRef.current) return;

//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const speakText = (text, id) => {
//     if (speakingId === id) {
//       window.speechSynthesis.cancel();
//       setSpeakingId(null);
//       return;
//     }

//     window.speechSynthesis.cancel();

//     const utterance =
//       new SpeechSynthesisUtterance(text);

//     utterance.rate = 0.95;

//     utterance.onend = () => {
//       setSpeakingId(null);
//     };

//     window.speechSynthesis.speak(utterance);

//     setSpeakingId(id);
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();

//     const text = input.trim();

//     if (!text || loading) return;

//     setMessages((prev) => [
//       ...prev,
//       {
//         role: 'user',
//         content: text,
//       },
//     ]);

//     setInput('');
//     setLoading(true);

//     window.speechSynthesis.cancel();
//     setSpeakingId(null);

//     try {
//       const { data } = await API.post(
//         '/chat/send',
//         {
//           chatId,
//           message: text,
//           subject,
//         }
//       );

//       if (!chatId) {
//         setChatId(data.chatId);
//       }

//       const assistantMsg = {
//         role: 'assistant',
//         content: data.reply,
//       };

//       setMessages((prev) => [
//         ...prev,
//         assistantMsg,
//       ]);

//       if (ttsEnabled) {
//         const utterance =
//           new SpeechSynthesisUtterance(
//             data.reply
//           );

//         utterance.rate = 0.95;

//         utterance.onend = () => {
//           setSpeakingId(null);
//         };

//         window.speechSynthesis.speak(
//           utterance
//         );

//         setSpeakingId(
//           `msg-${messages.length + 2}`
//         );
//       }
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: `Error: ${
//             err.response?.data?.message ||
//             'Request failed'
//           }`,
//         },
//       ]);
//     } finally {
//       setLoading(false);
//       inputRef.current?.focus();
//     }
//   };

//   const handleNewChat = () => {
//     setMessages([]);
//     setChatId(null);
//     setInput('');

//     window.speechSynthesis.cancel();
//     setSpeakingId(null);

//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 100);
//   };

//   const speechSupported = !!(
//     window.SpeechRecognition ||
//     window.webkitSpeechRecognition
//   );

//   return (
//     <div className="chat-page">

//       {/* =================================================
//           BACKGROUND 3D EFFECT
//       ================================================= */}

//       <div className="chat-3d-background">
//         <div className="chat-grid" />

//         <div className="chat-orb orb-one" />
//         <div className="chat-orb orb-two" />
//         <div className="chat-orb orb-three" />

//         <div className="floating-particle particle-one" />
//         <div className="floating-particle particle-two" />
//         <div className="floating-particle particle-three" />
//         <div className="floating-particle particle-four" />
//       </div>

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <header className="chat-header">

//         <div className="chat-header-info">

//           <div className="chat-ai-logo">

//             <div className="chat-ai-logo-core">
//               <GraduationCap
//                 size={25}
//                 strokeWidth={2.3}
//               />
//             </div>

//             <span className="ai-logo-ring ring-one" />
//             <span className="ai-logo-ring ring-two" />

//           </div>

//           <div className="chat-title-wrapper">

//             <div className="chat-title-row">

//               <h1 className="chat-title">
//                 AI Chat Tutor
//               </h1>

//               <span className="chat-live-badge">
//                 <span />
//                 LIVE
//               </span>

//             </div>

//             <p className="chat-subtitle">
//               Your intelligent STEM learning companion
//             </p>

//           </div>

//         </div>

//         <div className="chat-header-actions">

//           {/* Voice */}

//           <button
//             type="button"
//             className={`chat-voice-toggle ${
//               ttsEnabled
//                 ? 'chat-voice-active'
//                 : ''
//             }`}
//             onClick={() =>
//               setTtsEnabled(!ttsEnabled)
//             }
//           >
//             {ttsEnabled ? (
//               <Volume2 size={15} />
//             ) : (
//               <VolumeX size={15} />
//             )}

//             <span>
//               {ttsEnabled
//                 ? 'Voice On'
//                 : 'Voice Off'}
//             </span>
//           </button>

//           {/* Subject */}

//           <div className="chat-subject-wrapper">

//             <select
//               value={subject}
//               onChange={(e) =>
//                 setSubject(e.target.value)
//               }
//               className="chat-subject-select"
//             >
//               {SUBJECTS.map((s) => (
//                 <option
//                   key={s}
//                   value={s}
//                 >
//                   {s}
//                 </option>
//               ))}
//             </select>

//             <ChevronDown
//               size={14}
//               className="subject-chevron"
//             />

//           </div>

//           {/* New chat */}

//           <button
//             className="chat-new-btn"
//             onClick={handleNewChat}
//           >
//             <Trash2 size={15} />
//             <span>New Chat</span>
//           </button>

//         </div>

//       </header>

//       {/* =================================================
//           MESSAGES
//       ================================================= */}

//       <main className="chat-messages">

//         {/* EMPTY STATE */}

//         {messages.length === 0 && (
//           <div className="chat-empty">

//             <div className="empty-ai-scene">

//               <div className="empty-ai-shadow" />

//               <div className="empty-ai-orb">

//                 <div className="empty-ai-orb-inner">
//                   <Bot size={48} />
//                 </div>

//                 <span className="orb-ring ring-a" />
//                 <span className="orb-ring ring-b" />
//                 <span className="orb-ring ring-c" />

//               </div>

//               <Sparkles
//                 className="sparkle sparkle-one"
//                 size={18}
//               />

//               <Sparkles
//                 className="sparkle sparkle-two"
//                 size={14}
//               />

//             </div>

//             <div className="empty-content">

//               <span className="empty-eyebrow">
//                 <Sparkles size={13} />
//                 AI POWERED LEARNING
//               </span>

//               <h2>
//                 What do you want
//                 <span> to learn?</span>
//               </h2>

//               <p>
//                 Ask anything about STEM.
//                 I'll explain difficult concepts
//                 in a simple and interactive way.
//               </p>

//             </div>

//             <div className="chat-suggestions">

//               {SUGGESTIONS.map(
//                 ({
//                   icon: Icon,
//                   text,
//                 }) => (
//                   <button
//                     key={text}
//                     className="chat-suggestion"
//                     onClick={() =>
//                       setInput(text)
//                     }
//                   >
//                     <span className="suggestion-icon">
//                       <Icon size={17} />
//                     </span>

//                     <span className="suggestion-text">
//                       {text}
//                     </span>

//                     <ChevronDown
//                       size={14}
//                       className="suggestion-arrow"
//                     />
//                   </button>
//                 )
//               )}

//             </div>

//           </div>
//         )}

//         {/* MESSAGES */}

//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`chat-message chat-message-${msg.role}`}
//           >

//             <div className="message-avatar-wrap">

//               <div className="chat-message-avatar">

//                 {msg.role === 'user' ? (
//                   <User size={17} />
//                 ) : (
//                   <Bot size={18} />
//                 )}

//               </div>

//               {msg.role ===
//                 'assistant' && (
//                 <span className="message-status-dot" />
//               )}

//             </div>

//             <div className="chat-message-content">

//               <div className="chat-message-top">

//                 <div className="chat-message-sender">
//                   {msg.role === 'user'
//                     ? user?.name || 'You'
//                     : 'STEMAI Tutor'}
//                 </div>

//                 {msg.role ===
//                   'assistant' && (
//                   <span className="ai-message-label">
//                     <Sparkles size={11} />
//                     AI
//                   </span>
//                 )}

//               </div>

//               <div className="chat-message-card">

//                 <div className="chat-message-text">
//                   {msg.content}
//                 </div>

//                 {msg.role ===
//                   'assistant' && (
//                   <button
//                     className={`chat-speak-btn ${
//                       speakingId ===
//                       `msg-${i}`
//                         ? 'chat-speak-active'
//                         : ''
//                     }`}
//                     onClick={() =>
//                       speakText(
//                         msg.content,
//                         `msg-${i}`
//                       )
//                     }
//                   >
//                     {speakingId ===
//                     `msg-${i}` ? (
//                       <VolumeX size={14} />
//                     ) : (
//                       <Volume2 size={14} />
//                     )}
//                   </button>
//                 )}

//               </div>

//             </div>

//           </div>
//         ))}

//         {/* THINKING */}

//         {loading && (
//           <div className="chat-message chat-message-assistant">

//             <div className="message-avatar-wrap">

//               <div className="chat-message-avatar ai-thinking-avatar">
//                 <Bot size={18} />
//               </div>

//               <span className="message-status-dot" />

//             </div>

//             <div className="chat-message-content">

//               <div className="chat-message-top">

//                 <div className="chat-message-sender">
//                   STEMAI Tutor
//                 </div>

//                 <span className="ai-message-label">
//                   <Sparkles size={11} />
//                   THINKING
//                 </span>

//               </div>

//               <div className="chat-message-card thinking-card">

//                 <div className="thinking-orb">
//                   <span />
//                   <span />
//                   <span />
//                 </div>

//                 <span className="thinking-text">
//                   Analyzing your question...
//                 </span>

//               </div>

//             </div>

//           </div>
//         )}

//         <div ref={messagesEnd} />

//       </main>

//       {/* =================================================
//           INPUT
//       ================================================= */}

//       <div className="chat-input-container">

//         <form
//           className={`chat-input-area ${
//             isListening
//               ? 'chat-input-listening'
//               : ''
//           }`}
//           onSubmit={handleSend}
//         >

//           {speechSupported && (
//             <button
//               type="button"
//               className={`chat-mic-btn ${
//                 isListening
//                   ? 'chat-mic-active'
//                   : ''
//               }`}
//               onClick={toggleListening}
//             >

//               {isListening ? (
//                 <MicOff size={19} />
//               ) : (
//                 <Mic size={19} />
//               )}

//             </button>
//           )}

//           <div className="chat-input-wrapper">

//             <input
//               ref={inputRef}
//               type="text"
//               placeholder={
//                 isListening
//                   ? 'Listening...'
//                   : 'Ask your STEM question...'
//               }
//               value={input}
//               onChange={(e) =>
//                 setInput(e.target.value)
//               }
//               disabled={loading}
//               className="chat-input"
//             />

//             <span className="input-shortcut">
//               ENTER
//             </span>

//           </div>

//           <button
//             type="submit"
//             className="chat-send-btn"
//             disabled={
//               loading ||
//               !input.trim()
//             }
//           >
//             <Send size={18} />
//           </button>

//         </form>

//         <div className="chat-input-hint">
//           <Sparkles size={11} />
//           STEMAI can make mistakes. Verify
//           important information.
//         </div>

//       </div>

//     </div>
//   );
// }



import {
  useState,
  useRef,
  useEffect,
} from 'react';

import {
  Send,
  Bot,
  User,
  Trash2,
  GraduationCap,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Atom,
  Brain,
  Zap,
  ChevronDown,
  History,
  X,
  MessageSquare,
  Clock,
  Loader2,
} from 'lucide-react';

import API from '../services/api';
import './ChatTutor.css';

const SUBJECTS = [
  'General',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
];

const SUGGESTIONS = [
  {
    icon: Atom,
    text: 'Explain quantum entanglement',
  },
  {
    icon: Brain,
    text: 'How do I solve quadratic equations?',
  },
  {
    icon: Zap,
    text: 'What is object-oriented programming?',
  },
];

export default function ChatTutor({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('General');
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);

  // History panel state
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [savedToast, setSavedToast] = useState(false);

  const messagesEnd = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, loading]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (e) => {
        setInput(
          (prev) =>
            prev +
            e.results[0][0].transcript
        );

        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);

  // Fetch chat history when panel opens
  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError('');
    try {
      const { data } = await API.get('/chat');
      setChatHistory(Array.isArray(data) ? data : []);
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

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text, id) => {
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.rate = 0.95;

    utterance.onend = () => {
      setSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);

    setSpeakingId(id);
  };

  const showSavedToast = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    const text = input.trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: text,
      },
    ]);

    setInput('');
    setLoading(true);

    window.speechSynthesis.cancel();
    setSpeakingId(null);

    try {
      const { data } = await API.post(
        '/chat/send',
        {
          chatId,
          message: text,
          subject,
        }
      );

      if (!chatId) {
        setChatId(data.chatId);
      }

      const assistantMsg = {
        role: 'assistant',
        content: data.reply,
      };

      setMessages((prev) => [
        ...prev,
        assistantMsg,
      ]);

      // Auto-saved to History (backend already persists)
      showSavedToast();

      // Refresh history list if panel is open
      if (showHistory) {
        fetchHistory();
      }

      if (ttsEnabled) {
        const utterance =
          new SpeechSynthesisUtterance(
            data.reply
          );

        utterance.rate = 0.95;

        utterance.onend = () => {
          setSpeakingId(null);
        };

        window.speechSynthesis.speak(
          utterance
        );

        setSpeakingId(
          `msg-${messages.length + 2}`
        );
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${
            err.response?.data?.message ||
            'Request failed'
          }`,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setChatId(null);
    setInput('');

    window.speechSynthesis.cancel();
    setSpeakingId(null);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Load a past chat from history
  const loadChat = (chat) => {
    if (!chat) return;

    setChatId(chat._id);
    setSubject(chat.subject || 'General');
    setMessages(
      (chat.messages || []).map((m) => ({
        role: m.role,
        content: m.content,
      }))
    );

    window.speechSynthesis.cancel();
    setSpeakingId(null);
    setShowHistory(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Delete a chat from history
  const deleteHistoryChat = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this chat from history?')) return;

    setDeletingId(id);
    try {
      await API.delete(`/chat/${id}`);
      setChatHistory((prev) => prev.filter((c) => c._id !== id));

      // If currently viewing this chat, start fresh
      if (chatId === id) {
        handleNewChat();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete chat');
    } finally {
      setDeletingId(null);
    }
  };

  const getChatPreview = (chat) => {
    const msgs = chat.messages || [];
    const firstUser = msgs.find((m) => m.role === 'user');
    return firstUser?.content?.slice(0, 60) || 'Empty chat';
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

  const speechSupported = !!(
    window.SpeechRecognition ||
    window.webkitSpeechRecognition
  );

  return (
    <div className="chat-page">

      {/* =================================================
          BACKGROUND 3D EFFECT
      ================================================= */}

      <div className="chat-3d-background">
        <div className="chat-grid" />

        <div className="chat-orb orb-one" />
        <div className="chat-orb orb-two" />
        <div className="chat-orb orb-three" />

        <div className="floating-particle particle-one" />
        <div className="floating-particle particle-two" />
        <div className="floating-particle particle-three" />
        <div className="floating-particle particle-four" />
      </div>

      {/* Saved to History Toast */}
      {savedToast && (
        <div className="chat-saved-toast">
          <History size={14} />
          <span>Saved to History</span>
        </div>
      )}

      {/* =================================================
          HISTORY PANEL (Slide-over)
      ================================================= */}

      {showHistory && (
        <div
          className="chat-history-overlay"
          onClick={() => setShowHistory(false)}
        />
      )}

      <aside
        className={`chat-history-panel ${
          showHistory ? 'chat-history-open' : ''
        }`}
      >
        <div className="chat-history-header">
          <div className="chat-history-title">
            <History size={18} />
            <span>Chat History</span>
          </div>
          <button
            type="button"
            className="chat-history-close"
            onClick={() => setShowHistory(false)}
          >
            <X size={18} />
          </button>
        </div>

        <p className="chat-history-hint">
          All AI conversations are auto-saved. Click any chat to resume.
        </p>

        <div className="chat-history-list">
          {historyLoading && (
            <div className="chat-history-loading">
              <Loader2 size={22} className="spin" />
              <span>Loading history...</span>
            </div>
          )}

          {historyError && (
            <div className="chat-history-error">
              {historyError}
              <button type="button" onClick={fetchHistory}>
                Retry
              </button>
            </div>
          )}

          {!historyLoading &&
            !historyError &&
            chatHistory.length === 0 && (
              <div className="chat-history-empty">
                <MessageSquare size={32} />
                <p>No chats yet</p>
                <span>Start a conversation — it will appear here</span>
              </div>
            )}

          {!historyLoading &&
            chatHistory.map((chat) => (
              <button
                key={chat._id}
                type="button"
                className={`chat-history-item ${
                  chatId === chat._id ? 'chat-history-item-active' : ''
                }`}
                onClick={() => loadChat(chat)}
              >
                <div className="chat-history-item-top">
                  <span className="chat-history-subject">
                    {chat.subject || 'General'}
                  </span>
                  <span className="chat-history-time">
                    <Clock size={11} />
                    {formatDate(chat.updatedAt || chat.createdAt)}
                  </span>
                </div>

                <p className="chat-history-preview">
                  {getChatPreview(chat)}
                  {(chat.messages?.[0]?.content?.length || 0) > 60
                    ? '...'
                    : ''}
                </p>

                <div className="chat-history-item-footer">
                  <span className="chat-history-count">
                    {chat.messages?.length || 0} messages
                  </span>

                  <button
                    type="button"
                    className="chat-history-delete"
                    onClick={(e) => deleteHistoryChat(chat._id, e)}
                    disabled={deletingId === chat._id}
                    title="Delete from history"
                  >
                    {deletingId === chat._id ? (
                      <Loader2 size={13} className="spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                  </button>
                </div>
              </button>
            ))}
        </div>
      </aside>

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="chat-header">

        <div className="chat-header-info">

          <div className="chat-ai-logo">

            <div className="chat-ai-logo-core">
              <GraduationCap
                size={25}
                strokeWidth={2.3}
              />
            </div>

            <span className="ai-logo-ring ring-one" />
            <span className="ai-logo-ring ring-two" />

          </div>

          <div className="chat-title-wrapper">

            <div className="chat-title-row">

              <h1 className="chat-title">
                AI Chat Tutor
              </h1>

              <span className="chat-live-badge">
                <span />
                LIVE
              </span>

            </div>

            <p className="chat-subtitle">
              Your intelligent STEM learning companion
            </p>

          </div>

        </div>

        <div className="chat-header-actions">

          {/* History */}
          <button
            type="button"
            className={`chat-history-toggle ${
              showHistory ? 'chat-history-toggle-active' : ''
            }`}
            onClick={() => setShowHistory((v) => !v)}
            title="Chat History"
          >
            <History size={15} />
            <span>History</span>
          </button>

          {/* Voice */}

          <button
            type="button"
            className={`chat-voice-toggle ${
              ttsEnabled
                ? 'chat-voice-active'
                : ''
            }`}
            onClick={() =>
              setTtsEnabled(!ttsEnabled)
            }
          >
            {ttsEnabled ? (
              <Volume2 size={15} />
            ) : (
              <VolumeX size={15} />
            )}

            <span>
              {ttsEnabled
                ? 'Voice On'
                : 'Voice Off'}
            </span>
          </button>

          {/* Subject */}

          <div className="chat-subject-wrapper">

            <select
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              className="chat-subject-select"
            >
              {SUBJECTS.map((s) => (
                <option
                  key={s}
                  value={s}
                >
                  {s}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="subject-chevron"
            />

          </div>

          {/* New chat */}

          <button
            className="chat-new-btn"
            onClick={handleNewChat}
          >
            <Trash2 size={15} />
            <span>New Chat</span>
          </button>

        </div>

      </header>

      {/* =================================================
          MESSAGES
      ================================================= */}

      <main className="chat-messages">

        {/* EMPTY STATE */}

        {messages.length === 0 && (
          <div className="chat-empty">

            <div className="empty-ai-scene">

              <div className="empty-ai-shadow" />

              <div className="empty-ai-orb">

                <div className="empty-ai-orb-inner">
                  <Bot size={48} />
                </div>

                <span className="orb-ring ring-a" />
                <span className="orb-ring ring-b" />
                <span className="orb-ring ring-c" />

              </div>

              <Sparkles
                className="sparkle sparkle-one"
                size={18}
              />

              <Sparkles
                className="sparkle sparkle-two"
                size={14}
              />

            </div>

            <div className="empty-content">

              <span className="empty-eyebrow">
                <Sparkles size={13} />
                AI POWERED LEARNING
              </span>

              <h2>
                What do you want
                <span> to learn?</span>
              </h2>

              <p>
                Ask anything about STEM.
                I&apos;ll explain difficult concepts
                in a simple and interactive way.
              </p>

            </div>

            <div className="chat-suggestions">

              {SUGGESTIONS.map(
                ({
                  icon: Icon,
                  text,
                }) => (
                  <button
                    key={text}
                    className="chat-suggestion"
                    onClick={() =>
                      setInput(text)
                    }
                  >
                    <span className="suggestion-icon">
                      <Icon size={17} />
                    </span>

                    <span className="suggestion-text">
                      {text}
                    </span>

                    <ChevronDown
                      size={14}
                      className="suggestion-arrow"
                    />
                  </button>
                )
              )}

            </div>

          </div>
        )}

        {/* MESSAGES */}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message chat-message-${msg.role}`}
          >

            <div className="message-avatar-wrap">

              <div className="chat-message-avatar">

                {msg.role === 'user' ? (
                  <User size={17} />
                ) : (
                  <Bot size={18} />
                )}

              </div>

              {msg.role ===
                'assistant' && (
                <span className="message-status-dot" />
              )}

            </div>

            <div className="chat-message-content">

              <div className="chat-message-top">

                <div className="chat-message-sender">
                  {msg.role === 'user'
                    ? user?.name || 'You'
                    : 'STEMAI Tutor'}
                </div>

                {msg.role ===
                  'assistant' && (
                  <span className="ai-message-label">
                    <Sparkles size={11} />
                    AI
                  </span>
                )}

              </div>

              <div className="chat-message-card">

                <div className="chat-message-text">
                  {msg.content}
                </div>

                {msg.role ===
                  'assistant' && (
                  <button
                    className={`chat-speak-btn ${
                      speakingId ===
                      `msg-${i}`
                        ? 'chat-speak-active'
                        : ''
                    }`}
                    onClick={() =>
                      speakText(
                        msg.content,
                        `msg-${i}`
                      )
                    }
                  >
                    {speakingId ===
                    `msg-${i}` ? (
                      <VolumeX size={14} />
                    ) : (
                      <Volume2 size={14} />
                    )}
                  </button>
                )}

              </div>

            </div>

          </div>
        ))}

        {/* THINKING */}

        {loading && (
          <div className="chat-message chat-message-assistant">

            <div className="message-avatar-wrap">

              <div className="chat-message-avatar ai-thinking-avatar">
                <Bot size={18} />
              </div>

              <span className="message-status-dot" />

            </div>

            <div className="chat-message-content">

              <div className="chat-message-top">

                <div className="chat-message-sender">
                  STEMAI Tutor
                </div>

                <span className="ai-message-label">
                  <Sparkles size={11} />
                  THINKING
                </span>

              </div>

              <div className="chat-message-card thinking-card">

                <div className="thinking-orb">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="thinking-text">
                  Analyzing your question...
                </span>

              </div>

            </div>

          </div>
        )}

        <div ref={messagesEnd} />

      </main>

      {/* =================================================
          INPUT
      ================================================= */}

      <div className="chat-input-container">

        <form
          className={`chat-input-area ${
            isListening
              ? 'chat-input-listening'
              : ''
          }`}
          onSubmit={handleSend}
        >

          {speechSupported && (
            <button
              type="button"
              className={`chat-mic-btn ${
                isListening
                  ? 'chat-mic-active'
                  : ''
              }`}
              onClick={toggleListening}
            >

              {isListening ? (
                <MicOff size={19} />
              ) : (
                <Mic size={19} />
              )}

            </button>
          )}

          <div className="chat-input-wrapper">

            <input
              ref={inputRef}
              type="text"
              placeholder={
                isListening
                  ? 'Listening...'
                  : 'Ask your STEM question...'
              }
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              disabled={loading}
              className="chat-input"
            />

            <span className="input-shortcut">
              ENTER
            </span>

          </div>

          <button
            type="submit"
            className="chat-send-btn"
            disabled={
              loading ||
              !input.trim()
            }
          >
            <Send size={18} />
          </button>

        </form>

        <div className="chat-input-hint">
          <Sparkles size={11} />
          STEMAI can make mistakes. Verify
          important information. Chats auto-save to History.
        </div>

      </div>

    </div>
  );
}

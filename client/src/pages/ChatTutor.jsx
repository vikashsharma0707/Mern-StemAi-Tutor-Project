import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, GraduationCap, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import API from '../services/api';
import './ChatTutor.css';

const SUBJECTS = ['General', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

export default function ChatTutor({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('General');
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const messagesEnd = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onresult = (e) => { setInput(prev => prev + e.results[0][0].transcript); setIsListening(false); };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
    return () => { if (recognitionRef.current) recognitionRef.current.abort(); window.speechSynthesis.cancel(); };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    else { recognitionRef.current.start(); setIsListening(true); }
  };

  const speakText = (text, id) => {
    if (speakingId === id) { window.speechSynthesis.cancel(); setSpeakingId(null); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingId(id);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    window.speechSynthesis.cancel();
    setSpeakingId(null);
    try {
      const { data } = await API.post('/chat/send', { chatId, message: text, subject });
      if (!chatId) setChatId(data.chatId);
      const assistantMsg = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, assistantMsg]);
      if (ttsEnabled) {
        const utterance = new SpeechSynthesisUtterance(data.reply);
        utterance.rate = 0.95;
        utterance.onend = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
        setSpeakingId(`msg-${messages.length + 2}`);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.response?.data?.message || 'Request failed'}` }]);
    } finally { setLoading(false); inputRef.current?.focus(); }
  };

  const handleNewChat = () => { setMessages([]); setChatId(null); setInput(''); window.speechSynthesis.cancel(); setSpeakingId(null); };
  const speechSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-header-icon"><GraduationCap size={22} /></div>
          <div><h1 className="chat-title">AI Chat Tutor</h1><p className="chat-subtitle">Ask any STEM question</p></div>
        </div>
        <div className="chat-header-actions">
          <button className={`chat-voice-toggle ${ttsEnabled ? 'chat-voice-active' : ''}`} onClick={() => setTtsEnabled(!ttsEnabled)}>{ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>{ttsEnabled ? 'Voice On' : 'Voice Off'}</span></button>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="chat-subject-select">{SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}</select>
          <button className="btn btn-secondary btn-sm" onClick={handleNewChat}><Trash2 size={14} /> New Chat</button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            <GraduationCap size={48} />
            <h2>Start a conversation</h2>
            <p>Ask me anything about Math, Physics, Chemistry, Biology, or Computer Science</p>
            <div className="chat-suggestions">
              {['Explain quantum entanglement', 'How do I solve quadratic equations?', 'What is object-oriented programming?'].map(s => (
                <button key={s} className="chat-suggestion" onClick={() => setInput(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message chat-message-${msg.role}`}>
            <div className="chat-message-avatar">{msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}</div>
            <div className="chat-message-content">
              <div className="chat-message-sender">{msg.role === 'user' ? 'You' : 'STEMAI Tutor'}</div>
              <div className="chat-message-text">{msg.content}</div>
              {msg.role === 'assistant' && <button className={`chat-speak-btn ${speakingId === `msg-${i}` ? 'chat-speak-active' : ''}`} onClick={() => speakText(msg.content, `msg-${i}`)}>{speakingId === `msg-${i}` ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>}
            </div>
          </div>
        ))}
        {loading && <div className="chat-message chat-message-assistant"><div className="chat-message-avatar"><Bot size={18} /></div><div className="chat-message-content"><div className="chat-message-sender">STEMAI Tutor</div><div className="chat-typing"><span></span><span></span><span></span></div></div></div>}
        <div ref={messagesEnd} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        {speechSupported && <button type="button" className={`chat-mic-btn ${isListening ? 'chat-mic-active' : ''}`} onClick={toggleListening}>{isListening ? <MicOff size={18} /> : <Mic size={18} />}</button>}
        <input ref={inputRef} type="text" placeholder={isListening ? 'Listening...' : 'Ask a STEM question...'} value={input} onChange={(e) => setInput(e.target.value)} disabled={loading} className="chat-input" />
        <button type="submit" className="chat-send-btn" disabled={loading || !input.trim()}><Send size={18} /></button>
      </form>
    </div>
  );
}

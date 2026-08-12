// // // import { useState, useEffect } from 'react';
// // // import { History as HistoryIcon, MessageSquare, FileQuestion, Image, BookOpen, Trash2, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
// // // import API from '../services/api';
// // // import './History.css';

// // // const TYPE_CONFIG = {
// // //   chat: { icon: MessageSquare, label: 'Chat', color: 'indigo' },
// // //   practice: { icon: FileQuestion, label: 'Practice', color: 'green' },
// // //   image: { icon: Image, label: 'Image', color: 'cyan' }
// // // };

// // // export default function HistoryPage({ user }) {
// // //   const [history, setHistory] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [typeFilter, setTypeFilter] = useState('all');
// // //   const [expandedItems, setExpandedItems] = useState({});

// // //   useEffect(() => { fetchHistory(); }, []);

// // //   const fetchHistory = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const { data } = await API.get('/history/all');
// // //       setHistory(data || []);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Failed to load history');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const toggleExpand = (id) => {
// // //     setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
// // //   };

// // //   const deleteItem = async (id, type) => {
// // //     if (!window.confirm('Are you sure you want to delete this item?')) return;
// // //     try {
// // //       await API.delete(`/history/${type}/${id}`);
// // //       setHistory(prev => prev.filter(item => item._id !== id));
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Failed to delete');
// // //     }
// // //   };

// // //   const filteredHistory = history.filter(item => {
// // //     const matchesSearch = searchTerm === '' ||
// // //       item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       item.preview?.toLowerCase().includes(searchTerm.toLowerCase());
// // //     const matchesType = typeFilter === 'all' || item.type === typeFilter;
// // //     return matchesSearch && matchesType;
// // //   });

// // //   const formatDate = (date) => {
// // //     const d = new Date(date);
// // //     const now = new Date();
// // //     const diff = now - d;
// // //     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
// // //     if (days === 0) return 'Today';
// // //     if (days === 1) return 'Yesterday';
// // //     if (days < 7) return `${days} days ago`;
// // //     return d.toLocaleDateString();
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="history-page">
// // //         <div className="history-header">
// // //           <div className="history-header-icon"><HistoryIcon size={24} /></div>
// // //           <div><h1>Learning History</h1><p>Review all your past sessions and activities</p></div>
// // //         </div>
// // //         <div className="history-loading card"><div className="spinner" /><p>Loading your history...</p></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="history-page">
// // //       <div className="history-header">
// // //         <div className="history-header-icon"><HistoryIcon size={24} /></div>
// // //         <div><h1>Learning History</h1><p>Review all your past sessions and activities</p></div>
// // //       </div>

// // //       {error && <div className="alert alert-error">{error}</div>}

// // //       <div className="history-controls card">
// // //         <div className="history-search">
// // //           <Search size={18} />
// // //           <input type="text" placeholder="Search through your history..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // //         </div>
// // //         <div className="history-filter">
// // //           <Filter size={16} />
// // //           <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
// // //             <option value="all">All Types</option>
// // //             <option value="chat">Chats</option>
// // //             <option value="practice">Practice</option>
// // //             <option value="image">Images</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       {filteredHistory.length === 0 ? (
// // //         <div className="history-empty card">
// // //           <BookOpen size={48} />
// // //           <h2>No History Found</h2>
// // //           <p>{searchTerm || typeFilter !== 'all' ? 'No items match your search criteria.' : 'Start learning to build your history!'}</p>
// // //         </div>
// // //       ) : (
// // //         <div className="history-list">
// // //           {filteredHistory.map(item => {
// // //             const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.chat;
// // //             const Icon = config.icon;
// // //             const isExpanded = expandedItems[item._id];

// // //             return (
// // //               <div key={item._id} className={`history-item card ${isExpanded ? 'expanded' : ''}`}>
// // //                 <div className="history-item-header">
// // //                   <div className={`history-item-type ${config.color}`}>
// // //                     <Icon size={16} />
// // //                     <span>{config.label}</span>
// // //                   </div>
// // //                   <span className="history-item-date">{formatDate(item.createdAt)}</span>
// // //                 </div>
// // //                 <div className="history-item-content">
// // //                   <h3 className="history-item-title">{item.title || item.subject || 'Untitled'}</h3>
// // //                   {item.topic && <span className="history-item-topic">{item.topic}</span>}
// // //                   <p className="history-item-preview">{item.preview || 'No preview available'}</p>
// // //                 </div>
// // //                 <div className="history-item-stats">
// // //                   {item.accuracy !== undefined && (
// // //                     <span className={`history-stat ${item.accuracy >= 70 ? 'good' : item.accuracy >= 40 ? 'medium' : 'low'}`}>
// // //                       {item.accuracy}% accuracy
// // //                     </span>
// // //                   )}
// // //                   {item.questionCount && <span className="history-stat">{item.questionCount} questions</span>}
// // //                   {item.difficulty && <span className="history-stat">{item.difficulty}</span>}
// // //                 </div>
// // //                 <div className="history-item-actions">
// // //                   <button className="btn btn-secondary btn-sm" onClick={() => toggleExpand(item._id)}>
// // //                     {isExpanded ? <><ChevronUp size={14} /> Collapse</> : <><ChevronDown size={14} /> Details</>}
// // //                   </button>
// // //                   <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item._id, item.type)}>
// // //                     <Trash2 size={14} />
// // //                   </button>
// // //                 </div>
// // //                 {isExpanded && (
// // //                   <div className="history-item-details">
// // //                     <div className="history-detail-section">
// // //                       <h4>Full Content</h4>
// // //                       <div className="history-detail-content">
// // //                         {item.messages && item.messages.length > 0 ? (
// // //                           <div className="history-messages">
// // //                             {item.messages.map((msg, i) => (
// // //                               <div key={i} className={`history-message ${msg.role}`}>
// // //                                 <span className="history-message-role">{msg.role === 'user' ? 'You' : 'AI'}</span>
// // //                                 <p className="history-message-text">{msg.content}</p>
// // //                               </div>
// // //                             ))}
// // //                           </div>
// // //                         ) : item.content ? (
// // //                           <p>{item.content}</p>
// // //                         ) : item.solution ? (
// // //                           <p>{item.solution}</p>
// // //                         ) : (
// // //                           <p className="history-no-content">No detailed content available</p>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                     {item.explanation && (
// // //                       <div className="history-detail-section">
// // //                         <h4>Explanation</h4>
// // //                         <p className="history-explanation">{item.explanation}</p>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }




// // import { useState, useEffect } from 'react';
// // import { History as HistoryIcon, MessageSquare, FileQuestion, Image, BookOpen, Trash2, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
// // import API from '../services/api';
// // import './History.css';

// // const TYPE_CONFIG = {
// //   chat: { icon: MessageSquare, label: 'Chat', color: 'indigo' },
// //   practice: { icon: FileQuestion, label: 'Practice', color: 'green' },
// //   image: { icon: Image, label: 'Image', color: 'cyan' }
// // };

// // export default function HistoryPage({ user }) {
// //   const [history, setHistory] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [typeFilter, setTypeFilter] = useState('all');
// //   const [expandedItems, setExpandedItems] = useState({});

// //   useEffect(() => { fetchHistory(); }, []);

// //   const fetchHistory = async () => {
// //     setLoading(true);
// //     try {
// //       const { data } = await API.get('/history/all');
// //       setHistory(data || []);
// //     } catch (err) {
// //       console.error("History Error:", err);
// //       setError(err.response?.data?.message || 'Failed to load history');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const toggleExpand = (id) => {
// //     setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
// //   };

// //   const deleteItem = async (id, type) => {
// //     if (!window.confirm('Are you sure you want to delete this item?')) return;
// //     try {
// //       await API.delete(`/history/${type}/${id}`);
// //       setHistory(prev => prev.filter(item => (item.id || item._id) !== id));
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to delete');
// //     }
// //   };

// //   const filteredHistory = history.filter(item => {
// //     const searchText = searchTerm.toLowerCase();
// //     const matchesSearch = !searchTerm || 
// //       (item.subject || '').toLowerCase().includes(searchText) ||
// //       (item.topic || '').toLowerCase().includes(searchText);
    
// //     const matchesType = typeFilter === 'all' || item.type === typeFilter;
// //     return matchesSearch && matchesType;
// //   });

// //   const formatDate = (date) => {
// //     if (!date) return 'Just now';
// //     const d = new Date(date);
// //     if (isNaN(d.getTime())) return 'Just now';

// //     const now = new Date();
// //     const diff = now - d;
// //     const days = Math.floor(diff / (1000 * 60 * 60 * 24));

// //     if (days === 0) return 'Today';
// //     if (days === 1) return 'Yesterday';
// //     if (days < 7) return `${days} days ago`;
// //     return d.toLocaleDateString();
// //   };

// //   if (loading) {
// //     return (
// //       <div className="history-page">
// //         <div className="history-header">
// //           <div className="history-header-icon"><HistoryIcon size={24} /></div>
// //           <div><h1>Learning History</h1><p>Review all your past sessions and activities</p></div>
// //         </div>
// //         <div className="history-loading card"><div className="spinner" /><p>Loading your history...</p></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="history-page">
// //       <div className="history-header">
// //         <div className="history-header-icon"><HistoryIcon size={24} /></div>
// //         <div><h1>Learning History</h1><p>Review all your past sessions and activities</p></div>
// //       </div>

// //       {error && <div className="alert alert-error">{error}</div>}

// //       <div className="history-controls card">
// //         <div className="history-search">
// //           <Search size={18} />
// //           <input 
// //             type="text" 
// //             placeholder="Search through your history..." 
// //             value={searchTerm} 
// //             onChange={(e) => setSearchTerm(e.target.value)} 
// //           />
// //         </div>
// //         <div className="history-filter">
// //           <Filter size={16} />
// //           <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
// //             <option value="all">All Types</option>
// //             <option value="chat">Chats</option>
// //             <option value="practice">Practice</option>
// //             <option value="image">Images</option>
// //           </select>
// //         </div>
// //       </div>

// //       {filteredHistory.length === 0 ? (
// //         <div className="history-empty card">
// //           <BookOpen size={48} />
// //           <h2>No History Found</h2>
// //           <p>{searchTerm || typeFilter !== 'all' ? 'No items match your search criteria.' : 'Start learning to build your history!'}</p>
// //         </div>
// //       ) : (
// //         <div className="history-list">
// //           {filteredHistory.map(item => {
// //             const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.chat;
// //             const Icon = config.icon;
// //             const itemId = item.id || item._id;
// //             const isExpanded = expandedItems[itemId];

// //             return (
// //               <div key={itemId} className={`history-item card ${isExpanded ? 'expanded' : ''}`}>
// //                 <div className="history-item-header">
// //                   <div className={`history-item-type ${config.color}`}>
// //                     <Icon size={16} />
// //                     <span>{config.label}</span>
// //                   </div>
// //                   <span className="history-item-date">{formatDate(item.date)}</span>
// //                 </div>

// //                 <div className="history-item-content">
// //                   <h3 className="history-item-title">
// //                     {item.subject || item.topic || 'Untitled'}
// //                   </h3>
// //                   {item.topic && <span className="history-item-topic">{item.topic}</span>}
// //                   <p className="history-item-preview">
// //                     {item.preview || 'No preview available'}
// //                   </p>
// //                 </div>

// //                 <div className="history-item-stats">
// //                   {item.score !== undefined && (
// //                     <span className="history-stat">
// //                       Score: {item.score}/{item.total}
// //                     </span>
// //                   )}
// //                   {item.difficulty && <span className="history-stat">{item.difficulty}</span>}
// //                 </div>

// //                 <div className="history-item-actions">
// //                   <button className="btn btn-secondary btn-sm" onClick={() => toggleExpand(itemId)}>
// //                     {isExpanded ? <><ChevronUp size={14} /> Collapse</> : <><ChevronDown size={14} /> Details</>}
// //                   </button>
// //                   <button className="btn btn-danger btn-sm" onClick={() => deleteItem(itemId, item.type)}>
// //                     <Trash2 size={14} />
// //                   </button>
// //                 </div>

// //                 {isExpanded && (
// //                   <div className="history-item-details">
// //                     <p className="history-no-content">Full details will be available soon...</p>
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// import { useState, useEffect } from 'react';
// import { History as HistoryIcon, MessageSquare, FileQuestion, Image, BookOpen, Trash2, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
// import API from '../services/api';
// import './History.css';

// const TYPE_CONFIG = {
//   chat: { icon: MessageSquare, label: 'Chat', color: 'indigo' },
//   practice: { icon: FileQuestion, label: 'Practice', color: 'green' },
//   image: { icon: Image, label: 'Image', color: 'cyan' }
// };

// export default function HistoryPage({ user }) {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [typeFilter, setTypeFilter] = useState('all');
//   const [expandedItems, setExpandedItems] = useState({});

//   useEffect(() => { fetchHistory(); }, []);

//   const fetchHistory = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const { data } = await API.get('/history/all');
      
//       // 🔥 Fixed: Backend object ya array dono handle karega
//       let historyData = [];
      
//       if (Array.isArray(data)) {
//         historyData = data;
//       } else if (data?.history && Array.isArray(data.history)) {
//         historyData = data.history;
//       } else if (data?.success && Array.isArray(data.history)) {
//         historyData = data.history;
//       }

//       setHistory(historyData);
//       console.log("✅ History Loaded:", historyData.length, "items");
      
//     } catch (err) {
//       console.error("History Error:", err);
//       setError(err.response?.data?.message || 'Failed to load history');
//       setHistory([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleExpand = (id) => {
//     setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const deleteItem = async (id, type) => {
//     if (!window.confirm('Are you sure you want to delete this item?')) return;
//     try {
//       await API.delete(`/history/${type}/${id}`);
//       setHistory(prev => prev.filter(item => (item.id || item._id) !== id));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to delete');
//     }
//   };

//   const filteredHistory = history.filter(item => {
//     const searchText = searchTerm.toLowerCase();
//     const matchesSearch = !searchTerm || 
//       (item.subject || '').toLowerCase().includes(searchText) ||
//       (item.topic || '').toLowerCase().includes(searchText);
    
//     const matchesType = typeFilter === 'all' || item.type === typeFilter;
//     return matchesSearch && matchesType;
//   });

//   const formatDate = (date) => {
//     if (!date) return 'Just now';
//     const d = new Date(date);
//     if (isNaN(d.getTime())) return 'Just now';

//     const now = new Date();
//     const diff = now - d;
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));

//     if (days === 0) return 'Today';
//     if (days === 1) return 'Yesterday';
//     if (days < 7) return `${days} days ago`;
//     return d.toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <div className="history-page">
//         <div className="history-header">
//           <div className="history-header-icon"><HistoryIcon size={24} /></div>
//           <div><h1>Learning History</h1><p>Review all your past sessions and activities</p></div>
//         </div>
//         <div className="history-loading card"><div className="spinner" /><p>Loading your history...</p></div>
//       </div>
//     );
//   }

//   return (
//     <div className="history-page">
//       <div className="history-header">
//         <div className="history-header-icon"><HistoryIcon size={24} /></div>
//         <div><h1>Learning History</h1><p>Review all your past sessions and activities</p></div>
//       </div>

//       {error && <div className="alert alert-error">{error}</div>}

//       <div className="history-controls card">
//         <div className="history-search">
//           <Search size={18} />
//           <input 
//             type="text" 
//             placeholder="Search through your history..." 
//             value={searchTerm} 
//             onChange={(e) => setSearchTerm(e.target.value)} 
//           />
//         </div>
//         <div className="history-filter">
//           <Filter size={16} />
//           <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
//             <option value="all">All Types</option>
//             <option value="chat">Chats</option>
//             <option value="practice">Practice</option>
//             <option value="image">Images</option>
//           </select>
//         </div>
//       </div>

//       {filteredHistory.length === 0 ? (
//         <div className="history-empty card">
//           <BookOpen size={48} />
//           <h2>No History Found</h2>
//           <p>{searchTerm || typeFilter !== 'all' ? 'No items match your search criteria.' : 'Start learning to build your history!'}</p>
//         </div>
//       ) : (
//         <div className="history-list">
//           {filteredHistory.map(item => {
//             const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.chat;
//             const Icon = config.icon;
//             const itemId = item.id || item._id;
//             const isExpanded = expandedItems[itemId];

//             return (
//               <div key={itemId} className={`history-item card ${isExpanded ? 'expanded' : ''}`}>
//                 <div className="history-item-header">
//                   <div className={`history-item-type ${config.color}`}>
//                     <Icon size={16} />
//                     <span>{config.label}</span>
//                   </div>
//                   <span className="history-item-date">{formatDate(item.date)}</span>
//                 </div>

//                 <div className="history-item-content">
//                   <h3 className="history-item-title">
//                     {item.subject || item.topic || 'Untitled'}
//                   </h3>
//                   {item.topic && <span className="history-item-topic">{item.topic}</span>}
//                   <p className="history-item-preview">
//                     {item.preview || 'No preview available'}
//                   </p>
//                 </div>

//                 <div className="history-item-stats">
//                   {item.score !== undefined && (
//                     <span className="history-stat">
//                       Score: {item.score}/{item.total}
//                     </span>
//                   )}
//                   {item.difficulty && <span className="history-stat">{item.difficulty}</span>}
//                 </div>

//                 <div className="history-item-actions">
//                   <button className="btn btn-secondary btn-sm" onClick={() => toggleExpand(itemId)}>
//                     {isExpanded ? <><ChevronUp size={14} /> Collapse</> : <><ChevronDown size={14} /> Details</>}
//                   </button>
//                   <button className="btn btn-danger btn-sm" onClick={() => deleteItem(itemId, item.type)}>
//                     <Trash2 size={14} />
//                   </button>
//                 </div>

//                 {isExpanded && (
//                   <div className="history-item-details">
//                     <p className="history-no-content">Full details will be available soon...</p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }








import { useState, useEffect } from 'react';
import {
  History as HistoryIcon,
  MessageSquare,
  FileQuestion,
  Image as ImageIcon,
  BookOpen,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock3,
  Activity,
  Layers3,
  ArrowUpRight,
} from 'lucide-react';

import API from '../services/api';
import './History.css';

const TYPE_CONFIG = {
  chat: {
    icon: MessageSquare,
    label: 'AI Chat',
    color: 'indigo',
    description: 'AI Tutor conversation',
  },
  practice: {
    icon: FileQuestion,
    label: 'Practice',
    color: 'green',
    description: 'AI generated practice',
  },
  image: {
    icon: ImageIcon,
    label: 'Image Solver',
    color: 'cyan',
    description: 'Image based solution',
  },
};

export default function HistoryPage({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await API.get('/history/all');

      let historyData = [];

      if (Array.isArray(data)) {
        historyData = data;
      } else if (data?.history && Array.isArray(data.history)) {
        historyData = data.history;
      } else if (data?.success && Array.isArray(data.history)) {
        historyData = data.history;
      }

      setHistory(historyData);
    } catch (err) {
      console.error('History Error:', err);
      setError(
        err.response?.data?.message || 'Failed to load history'
      );
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const deleteItem = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await API.delete(`/history/${type}/${id}`);

      setHistory((prev) =>
        prev.filter((item) => (item.id || item._id) !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to delete'
      );
    }
  };

  const filteredHistory = history.filter((item) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      (item.subject || '').toLowerCase().includes(searchText) ||
      (item.topic || '').toLowerCase().includes(searchText) ||
      (item.preview || '').toLowerCase().includes(searchText);

    const matchesType =
      typeFilter === 'all' || item.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const formatDate = (date) => {
    if (!date) return 'Just now';

    const d = new Date(date);

    if (isNaN(d.getTime())) return 'Just now';

    const now = new Date();
    const diff = now - d;

    const days = Math.floor(
      diff / (1000 * 60 * 60 * 24)
    );

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;

    return d.toLocaleDateString();
  };

  const totalChats = history.filter(
    (item) => item.type === 'chat'
  ).length;

  const totalPractice = history.filter(
    (item) => item.type === 'practice'
  ).length;

  const totalImages = history.filter(
    (item) => item.type === 'image'
  ).length;

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-background">
          <div className="history-orb history-orb-one" />
          <div className="history-orb history-orb-two" />
          <div className="history-grid" />
        </div>

        <div className="history-loading-screen">
          <div className="history-loader-orbit">
            <div className="history-loader-core">
              <HistoryIcon size={30} />
            </div>
          </div>

          <h2>Loading your learning universe</h2>
          <p>Preparing your activity timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      {/* BACKGROUND */}
      <div className="history-background">
        <div className="history-orb history-orb-one" />
        <div className="history-orb history-orb-two" />
        <div className="history-orb history-orb-three" />
        <div className="history-grid" />
      </div>

      <div className="history-content">

        {/* HEADER */}
        <header className="history-hero">
          <div className="history-hero-left">
            <div className="history-icon-3d">
              <div className="history-icon-glow" />
              <HistoryIcon size={30} />
            </div>

            <div>
              <div className="history-eyebrow">
                <Sparkles size={14} />
                YOUR LEARNING JOURNEY
              </div>

              <h1>Learning History</h1>

              <p>
                Review your AI conversations, practice sessions,
                visual solutions and learning activity.
              </p>
            </div>
          </div>

          <div className="history-live-card">
            <div className="live-dot" />
            <div>
              <strong>Learning Active</strong>
              <span>Your progress is being tracked</span>
            </div>
          </div>
        </header>

        {/* STATS */}
        <section className="history-stats">

          <div className="history-stat-card">
            <div className="stat-icon stat-indigo">
              <Activity size={21} />
            </div>

            <div>
              <span>Total Activities</span>
              <strong>{history.length}</strong>
            </div>

            <ArrowUpRight className="stat-arrow" size={18} />
          </div>

          <div className="history-stat-card">
            <div className="stat-icon stat-blue">
              <MessageSquare size={21} />
            </div>

            <div>
              <span>AI Conversations</span>
              <strong>{totalChats}</strong>
            </div>

            <ArrowUpRight className="stat-arrow" size={18} />
          </div>

          <div className="history-stat-card">
            <div className="stat-icon stat-green">
              <FileQuestion size={21} />
            </div>

            <div>
              <span>Practice Sessions</span>
              <strong>{totalPractice}</strong>
            </div>

            <ArrowUpRight className="stat-arrow" size={18} />
          </div>

          <div className="history-stat-card">
            <div className="stat-icon stat-cyan">
              <ImageIcon size={21} />
            </div>

            <div>
              <span>Image Solutions</span>
              <strong>{totalImages}</strong>
            </div>

            <ArrowUpRight className="stat-arrow" size={18} />
          </div>

        </section>

        {/* ERROR */}
        {error && (
          <div className="history-error">
            <span>{error}</span>
            <button onClick={fetchHistory}>Retry</button>
          </div>
        )}

        {/* FILTER PANEL */}
        <section className="history-toolbar">

          <div className="history-search-box">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search your learning history..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            )}
          </div>

          <div className="history-filter-box">
            <Filter size={17} />

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
            >
              <option value="all">All Activities</option>
              <option value="chat">AI Chats</option>
              <option value="practice">Practice</option>
              <option value="image">Image Solver</option>
            </select>
          </div>

          <div className="history-results-count">
            <Layers3 size={16} />
            {filteredHistory.length} results
          </div>

        </section>

        {/* EMPTY */}
        {filteredHistory.length === 0 ? (
          <div className="history-empty-3d">

            <div className="empty-orbit">
              <div className="empty-core">
                <BookOpen size={38} />
              </div>
            </div>

            <h2>No Learning History</h2>

            <p>
              {searchTerm || typeFilter !== 'all'
                ? 'Nothing matches your current search or filter.'
                : 'Start chatting, practicing, or solving problems to build your history.'}
            </p>

            {(searchTerm || typeFilter !== 'all') && (
              <button
                className="history-reset-btn"
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="history-timeline">

            <div className="timeline-line" />

            {filteredHistory.map((item, index) => {
              const config =
                TYPE_CONFIG[item.type] ||
                TYPE_CONFIG.chat;

              const Icon = config.icon;

              const itemId =
                item.id || item._id;

              const isExpanded =
                expandedItems[itemId];

              return (
                <article
                  key={itemId}
                  className={`history-card-3d ${
                    isExpanded ? 'history-card-expanded' : ''
                  }`}
                  style={{
                    '--delay': `${index * 0.07}s`,
                  }}
                >
                  {/* TIMELINE NODE */}
                  <div
                    className={`timeline-node ${config.color}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="history-card-inner">

                    {/* TOP */}
                    <div className="history-card-top">

                      <div
                        className={`history-type-pill ${config.color}`}
                      >
                        <Icon size={14} />
                        {config.label}
                      </div>

                      <div className="history-date">
                        <Clock3 size={14} />
                        {formatDate(item.date)}
                      </div>

                    </div>

                    {/* MAIN */}
                    <div className="history-card-main">

                      <div className="history-card-heading">

                        <div>
                          <span className="history-mini-label">
                            {item.subject || 'STEM LEARNING'}
                          </span>

                          <h3>
                            {item.topic ||
                              item.subject ||
                              'Untitled Activity'}
                          </h3>
                        </div>

                        <div className="history-floating-icon">
                          <Icon size={23} />
                        </div>

                      </div>

                      <p className="history-preview">
                        {item.preview ||
                          'No preview available for this activity.'}
                      </p>

                    </div>

                    {/* STATS */}
                    {(item.score !== undefined ||
                      item.difficulty) && (
                      <div className="history-card-meta">

                        {item.score !== undefined && (
                          <div className="history-meta-item">
                            <span>Score</span>
                            <strong>
                              {item.score}/{item.total}
                            </strong>
                          </div>
                        )}

                        {item.difficulty && (
                          <div className="history-meta-item">
                            <span>Difficulty</span>
                            <strong>
                              {item.difficulty}
                            </strong>
                          </div>
                        )}

                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="history-card-actions">

                      <button
                        className="history-details-btn"
                        onClick={() =>
                          toggleExpand(itemId)
                        }
                      >
                        {isExpanded ? (
                          <>
                            Hide Details
                            <ChevronUp size={16} />
                          </>
                        ) : (
                          <>
                            View Details
                            <ChevronDown size={16} />
                          </>
                        )}
                      </button>

                      <button
                        className="history-delete-btn"
                        onClick={() =>
                          deleteItem(
                            itemId,
                            item.type
                          )
                        }
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                    {/* EXPANDED */}
                    <div
                      className={`history-expanded ${
                        isExpanded
                          ? 'history-expanded-open'
                          : ''
                      }`}
                    >
                      <div className="expanded-content">
                        <div className="expanded-line" />

                        <div>
                          <span>
                            ACTIVITY DETAILS
                          </span>

                          <p>
                            Full details will be
                            available soon...
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
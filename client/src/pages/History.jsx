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
//     try {
//       const { data } = await API.get('/history/all');
//       setHistory(data || []);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to load history');
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
//       setHistory(prev => prev.filter(item => item._id !== id));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to delete');
//     }
//   };

//   const filteredHistory = history.filter(item => {
//     const matchesSearch = searchTerm === '' ||
//       item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.preview?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = typeFilter === 'all' || item.type === typeFilter;
//     return matchesSearch && matchesType;
//   });

//   const formatDate = (date) => {
//     const d = new Date(date);
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
//           <input type="text" placeholder="Search through your history..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
//             const isExpanded = expandedItems[item._id];

//             return (
//               <div key={item._id} className={`history-item card ${isExpanded ? 'expanded' : ''}`}>
//                 <div className="history-item-header">
//                   <div className={`history-item-type ${config.color}`}>
//                     <Icon size={16} />
//                     <span>{config.label}</span>
//                   </div>
//                   <span className="history-item-date">{formatDate(item.createdAt)}</span>
//                 </div>
//                 <div className="history-item-content">
//                   <h3 className="history-item-title">{item.title || item.subject || 'Untitled'}</h3>
//                   {item.topic && <span className="history-item-topic">{item.topic}</span>}
//                   <p className="history-item-preview">{item.preview || 'No preview available'}</p>
//                 </div>
//                 <div className="history-item-stats">
//                   {item.accuracy !== undefined && (
//                     <span className={`history-stat ${item.accuracy >= 70 ? 'good' : item.accuracy >= 40 ? 'medium' : 'low'}`}>
//                       {item.accuracy}% accuracy
//                     </span>
//                   )}
//                   {item.questionCount && <span className="history-stat">{item.questionCount} questions</span>}
//                   {item.difficulty && <span className="history-stat">{item.difficulty}</span>}
//                 </div>
//                 <div className="history-item-actions">
//                   <button className="btn btn-secondary btn-sm" onClick={() => toggleExpand(item._id)}>
//                     {isExpanded ? <><ChevronUp size={14} /> Collapse</> : <><ChevronDown size={14} /> Details</>}
//                   </button>
//                   <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item._id, item.type)}>
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//                 {isExpanded && (
//                   <div className="history-item-details">
//                     <div className="history-detail-section">
//                       <h4>Full Content</h4>
//                       <div className="history-detail-content">
//                         {item.messages && item.messages.length > 0 ? (
//                           <div className="history-messages">
//                             {item.messages.map((msg, i) => (
//                               <div key={i} className={`history-message ${msg.role}`}>
//                                 <span className="history-message-role">{msg.role === 'user' ? 'You' : 'AI'}</span>
//                                 <p className="history-message-text">{msg.content}</p>
//                               </div>
//                             ))}
//                           </div>
//                         ) : item.content ? (
//                           <p>{item.content}</p>
//                         ) : item.solution ? (
//                           <p>{item.solution}</p>
//                         ) : (
//                           <p className="history-no-content">No detailed content available</p>
//                         )}
//                       </div>
//                     </div>
//                     {item.explanation && (
//                       <div className="history-detail-section">
//                         <h4>Explanation</h4>
//                         <p className="history-explanation">{item.explanation}</p>
//                       </div>
//                     )}
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
import { History as HistoryIcon, MessageSquare, FileQuestion, Image, BookOpen, Trash2, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import API from '../services/api';
import './History.css';

const TYPE_CONFIG = {
  chat: { icon: MessageSquare, label: 'Chat', color: 'indigo' },
  practice: { icon: FileQuestion, label: 'Practice', color: 'green' },
  image: { icon: Image, label: 'Image', color: 'cyan' }
};

export default function HistoryPage({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/history/all');
      setHistory(data || []);
    } catch (err) {
      console.error("History Error:", err);
      setError(err.response?.data?.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteItem = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await API.delete(`/history/${type}/${id}`);
      setHistory(prev => prev.filter(item => (item.id || item._id) !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete');
    }
  };

  const filteredHistory = history.filter(item => {
    const searchText = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      (item.subject || '').toLowerCase().includes(searchText) ||
      (item.topic || '').toLowerCase().includes(searchText);
    
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatDate = (date) => {
    if (!date) return 'Just now';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Just now';

    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-header">
          <div className="history-header-icon"><HistoryIcon size={24} /></div>
          <div><h1>Learning History</h1><p>Review all your past sessions and activities</p></div>
        </div>
        <div className="history-loading card"><div className="spinner" /><p>Loading your history...</p></div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <div className="history-header-icon"><HistoryIcon size={24} /></div>
        <div><h1>Learning History</h1><p>Review all your past sessions and activities</p></div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="history-controls card">
        <div className="history-search">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search through your history..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="history-filter">
          <Filter size={16} />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="chat">Chats</option>
            <option value="practice">Practice</option>
            <option value="image">Images</option>
          </select>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="history-empty card">
          <BookOpen size={48} />
          <h2>No History Found</h2>
          <p>{searchTerm || typeFilter !== 'all' ? 'No items match your search criteria.' : 'Start learning to build your history!'}</p>
        </div>
      ) : (
        <div className="history-list">
          {filteredHistory.map(item => {
            const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.chat;
            const Icon = config.icon;
            const itemId = item.id || item._id;
            const isExpanded = expandedItems[itemId];

            return (
              <div key={itemId} className={`history-item card ${isExpanded ? 'expanded' : ''}`}>
                <div className="history-item-header">
                  <div className={`history-item-type ${config.color}`}>
                    <Icon size={16} />
                    <span>{config.label}</span>
                  </div>
                  <span className="history-item-date">{formatDate(item.date)}</span>
                </div>

                <div className="history-item-content">
                  <h3 className="history-item-title">
                    {item.subject || item.topic || 'Untitled'}
                  </h3>
                  {item.topic && <span className="history-item-topic">{item.topic}</span>}
                  <p className="history-item-preview">
                    {item.preview || 'No preview available'}
                  </p>
                </div>

                <div className="history-item-stats">
                  {item.score !== undefined && (
                    <span className="history-stat">
                      Score: {item.score}/{item.total}
                    </span>
                  )}
                  {item.difficulty && <span className="history-stat">{item.difficulty}</span>}
                </div>

                <div className="history-item-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => toggleExpand(itemId)}>
                    {isExpanded ? <><ChevronUp size={14} /> Collapse</> : <><ChevronDown size={14} /> Details</>}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteItem(itemId, item.type)}>
                    <Trash2 size={14} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="history-item-details">
                    <p className="history-no-content">Full details will be available soon...</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
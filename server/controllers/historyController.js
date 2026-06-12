// // import Chat from '../models/Chat.js';
// // import Practice from '../models/Practice.js';
// // import ImageSolution from '../models/ImageSolution.js';

// // export const getAllHistory = async (req, res) => {
// //   try {
// //     const [chats, practices, images] = await Promise.all([
// //       Chat.find({ user: req.user._id }).select('subject createdAt updatedAt').sort({ updatedAt: -1 }).limit(20),
// //       Practice.find({ user: req.user._id }).select('subject topic score totalQuestions difficulty createdAt').sort({ createdAt: -1 }).limit(20),
// //       ImageSolution.find({ user: req.user._id }).select('subject createdAt').sort({ createdAt: -1 }).limit(20)
// //     ]);
// //     const history = [
// //       ...chats.map(c => ({ type: 'chat', id: c._id, subject: c.subject, date: c.updatedAt })),
// //       ...practices.map(p => ({ type: 'practice', id: p._id, subject: p.subject, topic: p.topic, score: p.score, total: p.totalQuestions, difficulty: p.difficulty, date: p.createdAt })),
// //       ...images.map(i => ({ type: 'image', id: i._id, subject: i.subject, date: i.createdAt }))
// //     ].sort((a, b) => new Date(b.date) - new Date(a.date));
// //     res.json(history);
// //   } catch (e) { res.status(500).json({ message: e.message }); }
// // };


// import Chat from '../models/Chat.js';
// import Practice from '../models/Practice.js';
// import ImageSolution from '../models/ImageSolution.js';

// export const getAllHistory = async (req, res) => {
//   try {
//     const [chats, practices, images] = await Promise.all([
//       Chat.find({ user: req.user._id }).select('subject createdAt updatedAt').sort({ updatedAt: -1 }).limit(20),
//       Practice.find({ user: req.user._id }).select('subject topic score totalQuestions difficulty createdAt').sort({ createdAt: -1 }).limit(20),
//       ImageSolution.find({ user: req.user._id }).select('subject createdAt').sort({ createdAt: -1 }).limit(20)
//     ]);

//     const history = [
//       ...chats.map(c => ({ type: 'chat', id: c._id, subject: c.subject, date: c.updatedAt })),
//       ...practices.map(p => ({ 
//         type: 'practice', 
//         id: p._id, 
//         subject: p.subject, 
//         topic: p.topic, 
//         score: p.score, 
//         total: p.totalQuestions, 
//         difficulty: p.difficulty, 
//         date: p.createdAt 
//       })),
//       ...images.map(i => ({ type: 'image', id: i._id, subject: i.subject, date: i.createdAt }))
//     ].sort((a, b) => new Date(b.date) - new Date(a.date));

//     res.json(history);
//   } catch (error) {
//     console.error('History Error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };


import Chat from '../models/Chat.js';
import Practice from '../models/Practice.js';
import ImageSolution from '../models/ImageSolution.js';

export const getAllHistory = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const [chats, practices, images] = await Promise.all([
      Chat.find({ user: req.user._id })
        .select('subject createdAt updatedAt title')  // title bhi add kiya agar ho
        .sort({ updatedAt: -1 })
        .limit(15),

      Practice.find({ user: req.user._id })
        .select('subject topic score totalQuestions difficulty createdAt')
        .sort({ createdAt: -1 })
        .limit(15),

      ImageSolution.find({ user: req.user._id })
        .select('subject createdAt imageUrl')  // extra fields agar chahiye
        .sort({ createdAt: -1 })
        .limit(15)
    ]);

    // Better mapping with fallback values
    const history = [
      ...chats.map(c => ({
        type: 'chat',
        id: c._id,
        subject: c.subject || 'General',
        title: c.title || 'Chat Session',
        date: c.updatedAt || c.createdAt
      })),

      ...practices.map(p => ({
        type: 'practice',
        id: p._id,
        subject: p.subject || 'Unknown',
        topic: p.topic || 'No Topic',
        score: p.score || 0,
        total: p.totalQuestions || 0,
        difficulty: p.difficulty || 'medium',
        date: p.createdAt
      })),

      ...images.map(i => ({
        type: 'image',
        id: i._id,
        subject: i.subject || 'Image Solution',
        date: i.createdAt
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Debugging ke liye
    console.log(`📊 History fetched - Chats: ${chats.length}, Practices: ${practices.length}, Images: ${images.length}`);

    res.json({
      success: true,
      count: history.length,
      history
    });

  } catch (error) {
    console.error('❌ Get All History Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch history',
      error: error.message 
    });
  }
};
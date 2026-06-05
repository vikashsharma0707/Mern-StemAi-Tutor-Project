import ImageSolution from '../models/ImageSolution.js';
import { callOpenRouterVision } from '../utils/openrouter.js';

export const solveImage = async (req, res) => {
  try {
    const { image, subject } = req.body;
    if (!image) return res.status(400).json({ message: 'Image data is required' });

    const messages = [
      {
        role: 'system',
        content: `You are STEMAI Tutor, an expert at solving STEM problems from images. Analyze the image carefully and provide:
1. A clear identification of what the question/problem is asking
2. A step-by-step solution with explanations
3. Key concepts involved
4. Tips for similar problems

Subject context: ${subject || 'General STEM'}`,
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Please solve this problem from the image. Provide a detailed step-by-step solution.' },
          { type: 'image_url', image_url: { url: image } },
        ],
      },
    ];

    const solution = await callOpenRouterVision(messages);

    const record = new ImageSolution({
      userId: req.user.id,
      imageData: image.substring(0, 200),
      solution,
      subject: subject || 'General',
    });
    await record.save();

    res.json({ solution, solutionId: record._id });
  } catch (err) {
    console.error('Image solve error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to solve image question' });
  }
};

export const getImageHistory = async (req, res) => {
  try {
    const solutions = await ImageSolution.find({ userId: req.user.id })
      .select('-imageData')
      .sort({ createdAt: -1 })
      .limit(30);
    res.json(solutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

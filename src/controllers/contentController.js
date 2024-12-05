import Video from '../models/Video.js';
import Content from '../models/Content.js';

export const getContentByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;

    const content = await Content.findOne({ video: videoId });
    if (!content) return res.status(404).json({ message: 'Content not found' });

    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const addOrUpdateContent = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Check role permissions
    const role = req.user.role;
    if (role !== 'admin' && role !== 'content writer') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    let content = await Content.findOne({ video: videoId });
    if (content) {
      // Update existing content
      content.text = text;
    } else {
      // Create new content
      content = new Content({ video: videoId, text, createdBy: req.user.id });
    }

    await content.save();
    res.status(200).json({ message: 'Content saved successfully', content });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

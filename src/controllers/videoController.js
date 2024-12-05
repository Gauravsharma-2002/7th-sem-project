import Video from '../models/Video.js';
import { uploadToYouTube } from '../services/youtubeService.js';

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, roomId } = req.body;
    const filePath = req.file.path;

    const video = new Video({
      title,
      description,
      room: roomId,
      uploadedBy: req.user.id,
      url: filePath,
    });

    await video.save();
    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const publishToYouTube = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);

    const youtubeResponse = await uploadToYouTube(video.url, video.title, video.description);
    res.status(200).json({ message: 'Video published successfully', youtubeResponse });
  } catch (err) {
    res.status(500).json({ message: 'YouTube publishing failed', error: err.message });
  }
};

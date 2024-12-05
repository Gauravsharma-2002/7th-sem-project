import { google } from 'googleapis';
import fs from 'fs';

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,//edited here
  process.env.GOOGLE_REDIRECT_URI
);

const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

export const uploadToYouTube = async (filePath, title, description) => {
  const response = await youtube.videos.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: { title, description },
      status: { privacyStatus: 'private' },
    },
    media: { body: fs.createReadStream(filePath) },
  });

  return response.data;
};

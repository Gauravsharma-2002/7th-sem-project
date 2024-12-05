import Room from '../models/Room.js';
import User from '../models/User.js';

// Service function to add a user to a room
export const addUserToRoomService = async (roomId, userId, role) => {
  const room = await Room.findById(roomId);
  if (!room) throw new Error('Room not found');

  room.members.push({ user: userId, role });
  await room.save();

  const user = await User.findById(userId);
  if (user) {
    user.rooms.push(roomId);
    await user.save();
  }
  return room;
};

export const getRoomMembersService = async (roomId) => {
  const room = await Room.findById(roomId).populate('members.user', 'name email role');
  if (!room) throw new Error('Room not found');
  return room.members;
};

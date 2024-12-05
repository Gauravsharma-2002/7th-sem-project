import Room from '../models/Room.js';
import User from '../models/User.js';
import { generateInviteToken } from '../utils/generateToken.js';
import { sendEmail } from '../services/emailService.js';

export const createRoom = async (req, res) => {
  try {
    const { name, description } = req.body;

    const room = new Room({
      name,
      description,
      admin: req.user.id || "abcd",
      members: [{ user: req.user.id, role: 'admin' }],
    });

    await room.save();
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const inviteMember = async (req, res) => {
  try {
    const { email, role } = req.body;
    const roomId = req.params.id;

    const token = generateInviteToken({ email, role, roomId });
    const inviteLink = `${process.env.FRONTEND_URL}/join-room?token=${token}`;

    await sendEmail(email, 'Room Invitation', `Join the room: ${inviteLink}`);
    res.status(200).json({ message: 'Invitation sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const changeMemberRole = async (req, res) => {
  try {
    const { roleId, newRole } = req.body;
    const room = await Room.findById(req.params.id);

    const member = room.members.find((m) => m.user.toString() === roleId);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    member.role = newRole;
    await room.save();

    res.status(200).json({ message: 'Role updated successfully', room });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Controller function to add a user to a room
export const addUserToRoom = async (req, res) => {
  try {
    const { roomId } = req.params; // Room ID from the request parameters
    const { userId, role } = req.body; // User ID and role from the request body

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Add user to room's members
    room.members.push({ user: userId, role });
    await room.save();

    // Add room to the user's list of rooms
    const user = await User.findById(userId);
    if (user) {
      user.rooms.push(roomId);
      await user.save();
    }

    res.status(200).json({ message: 'User added to the room successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getRoomMembers = async (req, res) => {
  try {
    const { roomId } = req.params; // Room ID from the request parameters

    const room = await Room.findById(roomId).populate('members.user', 'name email role');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ members: room.members });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

import express from "express";
import {
  createRoom,
  inviteMember,
  changeMemberRole,
} from "../controllers/roomController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
  addUserToRoom,
  getRoomMembers,
} from "../controllers/roomController.js";

const router = express.Router();

// router.post('/', authMiddleware, createRoom);
router.post("/", createRoom);
// router.post('/:id/invite', authMiddleware, inviteMember);
router.post("/:id/invite", inviteMember);
// router.patch('/:id/role', authMiddleware, changeMemberRole);
router.patch("/:id/role", changeMemberRole);
// router.get('/:roomId/members', authMiddleware, roleMiddleware(['admin', 'editor']), getRoomMembers);
router.get("/:roomId/members", getRoomMembers);

export default router;

import express from "express";
import User from "../model/User.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/users",authenticate,authorizeRoles(['admin']), async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;

    const users = await User.findAndCountAll({
        where: { email: { [Op.like]: `%${search}%` } },
        limit: parseInt(limit),
        offset: (page - 1) * limit
    });
    res.json(users);
})

export default router;
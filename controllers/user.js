const User = require("../model/user");

// GET /api/user
async function getAllUsers(req, res) {
    try {
        const allUsers = await User.find({});
        return res.json(allUsers);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

// POST /api/user
async function createUser(req, res) {
    try {
        const body = req.body;

        const requiredFields = [
            "first_name",
            "last_name",
            "email",
            "gender",
            "job_title",
        ];

        const missingFields = requiredFields.filter(
            (field) => !body[field]
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                status: "Failed",
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }

        const existingUser = await User.findOne({
            email: body.email,
        });

        if (existingUser) {
            return res.status(409).json({
                status: "Failed",
                message: "Email already exists",
            });
        }

        const newUser = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title,
        });

        return res.status(201).json({
            message: "User created successfully",
            data: newUser,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

// GET /api/user/:id
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

// PATCH /api/user/:id
async function updateUser(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json({
            status: "Updated Successfully",
            data: updatedUser,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

// DELETE /api/user/:id
async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.json({
            status: "Deleted Successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
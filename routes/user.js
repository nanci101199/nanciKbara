const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/user");

router.route("/")
    .get(getAllUsers)
    .post(createUser);

router.route("/:id")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
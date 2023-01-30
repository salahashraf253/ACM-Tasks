import express from 'express';
const {createUser,updateUser,deleteUser}=require("../controller/UserController");
const router = express.Router();

router.post('/users', createUser);
router.patch('/users/:userId',updateUser);
router.delete('/users/:userId',deleteUser);

export default router;
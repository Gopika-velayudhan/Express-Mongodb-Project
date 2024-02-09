const controller = require("../controller/Admincontroller")

const express = require("express")
const route = express.Router()
const multer = require("multer")
const upload = multer({dest:"uploads/"});
const trycatch = require("../middleware/errorhandliing")
const verifyToken = require("../middleware/authMidleware")

route.use(express.json());

route.post("/register",trycatch(controller.register))
route.post("/login",trycatch(controller.login))
route.post("/users",verifyToken,upload.single('photo'),trycatch(controller.createuser))
route.get("/users",verifyToken,trycatch(controller.getallusers));
route.get("/users/:id",verifyToken,trycatch(controller.getuserbyid))
route.put("/users/:id",verifyToken,trycatch(controller.updateuserbyid))
route.delete("/users/:id",verifyToken,trycatch(controller.deleteuserbyid))

module.exports = route;

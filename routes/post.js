const express = require("express");
const router = new express.Router();
const postController = require("../controllers/posts");


router.post("/add-post",postController.addPost);

router.post("/get-post",postController.getPost);

module.exports = router;
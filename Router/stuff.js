const express = require('express');
// initializes the router
const router = express.Router();
const stuffControllers = require('../Controllers/stuff');
const auth = require('../Middlewares/auth');
const multer = require('../Middlewares/multer-config');

// Routes
router.get('/',auth,stuffControllers.getAllThing);
router.get('/:id',auth,stuffControllers.getOneThing);
router.put('/:id',auth,multer,stuffControllers.modifyOneThing);
router.delete('/:id',auth,stuffControllers.deleteOneThing);
router.post('/',auth,multer,stuffControllers.addOneThing)


module.exports = router;
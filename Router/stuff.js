const express = require('express');
// initializes the router
const router = express.Router();
const stuffControllers = require('../Controllers/stuff');
const auth = require('../Middlewares/auth')

// Routes
router.get('/',auth,stuffControllers.getAllThing);
router.get('/:id',auth,stuffControllers.getOneThing);
router.put('/:id',auth,stuffControllers.modifyOneThing);
router.delete('/:id',auth,stuffControllers.deleteOneThing);
router.post('/',auth,stuffControllers.addOneThing)


module.exports = router;
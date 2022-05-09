const express = require('express');
// initializes the router
const router = express.Router();
const stuffControllers = require('../Controllers/stuff');

// Routes
router.get('/',stuffControllers.getAllThing);
router.get('/:id',stuffControllers.getOneThing);
router.put('/:id',stuffControllers.modifyOneThing);
router.delete('/:id',stuffControllers.deleteOneThing);
router.post('/',stuffControllers.addOneThing)


module.exports = router;
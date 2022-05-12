const Thing = require('../Models/stuff');
const auth = require('../Middlewares/auth');
const fs = require('fs');

exports.getAllThing = (req, res, next) => {
    Thing.find()
        .then(allStuff => res.status(201).json({ catalogue: allStuff }))
        .catch(error => res.status(400).json({ errorMessage: error }))
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(201).json({ article: thing }))
        .catch(error => res.status(400).json({ errorMessage: error }))
}
/**
 * lets to update product already present in dataBase
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.modifyOneThing = (req, res, next) => {
    const newThingToSaved = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        : {
            ...req.body
        };
    Thing.updateOne({ _id: req.params.id }, { newThingToSaved })
        .then(() => res.status(200).json({ message: 'Article updated !' }))
        .catch(error => res.status(400).json({ errorMessage: error }))
}


/**
 * Lets to delete a product into dataBase,only product inserted by the user can be deleted 
 * Before deleting a product, this function delete at first the file in relation of the product
 *
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            if (auth.userId === thing.userId) {
                const fileName = thing.imageUrl.split('/images/')[1];
                fs.unlink(`/images/${fileName}`, ()=>{
                    Thing.deleteOne({_id: req.params.id})
                    .then(()=> res.status(200).json({message: 'Article deleted !'}))
                    .catch( error => res.status(400).json({error}))
                })
            } else {
                return res.status(400).json({ message: ' unauthorized request !' })
            }
        })
        .catch(error => res.status(400).json({ error }))
}
/**
 * lets to add an article supplied by user into dataBase
 * @param {*req} represents frontEnd request
 * @param {*res} represents backEnd response
 * @param {*next} method which lets to pass code's execution to next middleware
 */

exports.addOneThing = (req, res, next) => {
    const incomingData = JSON.parse(req.body.thing);
    delete incomingData._id;
    const newThing = new Thing({
        ...incomingData,
        imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    newThing.save()
        .then(newThing => res.status(200).json({ message: 'article added' }))
        .catch(error => res.status(400).json({ message: error }))
}
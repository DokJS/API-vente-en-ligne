const Thing = require('../Models/stuff');
exports.getAllThing = (req,res,next)=> {
    Thing.find()
    .then( allStuff => res.status(201).json({catalogue: allStuff}))
    .catch( error => res.status(400).json({errorMessage: error}))
};

exports.getOneThing = (req,res,next) => {
    Thing.findOne({_id:req.params.id})
    .then( thing => res.status(201).json({article: thing}))
    .catch( error => res.status(400).json({errorMessage: error}))
}

exports.modifyOneThing = (req,res,next)=> {
    // this define the thing which will replace the current thing
    const newThing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        price: req.body.userId
    })
    Thing.updateOne({_id:req.params.id},newThing)
    .then(()=> res.status(200).json({message: ' article modified'}))
    .catch(erro => res.status(400).json({message: 'modification failed'}))
}

exports.deleteOneThing = (req,res,next)=> {
    Thing.deleteOne({_id:req.params.id})
    .then( ()=> res.status(200).json({message: 'article deleted'}))
    .catch( error => res.status(400).json({errorMessage: error}))
}

exports.addOneThing = (req,res,next)=> {
    const newThing = new Thing({
        title:req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        price:req.body.price
    })
    newThing.save()
    .then( newThing => res.status(200).json({message: 'article added'}))
    .catch( error => res.status(400).json({message: error}))
}
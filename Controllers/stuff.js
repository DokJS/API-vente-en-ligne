const Thing = require('../Models/stuff');
const jwt = require('jsonwebtoken');
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

    
 // find the thing that user wanna delete
 // verify if user have authorization for delete them
 // if true delete the thing
 // else send errorMessage 
exports.deleteOneThing = (req,res,next)=> {
    Thing.findOne({_id: req.params.id})
    .then( thing => {
         const requestHeadersData = req.headers.authorization.split(' ');
         const token =  requestHeadersData[1];
         const requestUserId = jwt.verify(token, 'RANDOM_TOKEN_SECRET').userId;
         if(requestUserId === thing.userId){
             Thing.deleteOne({_id:req.params.id})
             .then(()=> res.status(200).json({message: 'article deleted !'}))
             .catch(error => res.status(400).json({error}));
         }else {
             return res.status(400).json({message: ' unauthorized request '})
         }
    })
    .catch()
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
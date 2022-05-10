const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Hash password supply by frontend
// create a new instance of User
// fill a instance of User with email and hashed password
// save this instance into DB
exports.signup = (req,res,next)=> {
bcrypt.hash(req.body.password,10)
.then( hashedPassword => {
    const newUser = new User({
        email:req.body.email,
        password: hashedPassword
    })
    newUser.save()
    .then( savedUser => res.status(201).json({message: 'user saved !'}))
    .catch( error => res.status(400).json({errorMessage: error}))
})
.catch( error => res.status(500).json({errorMessage: error}))

};
// research in DB an email which matches to current email
// if email exists, compare incoming password's hash and saved password's hash
// if doesn't exist, send an error message
exports.login = (req,res,next)=> {
    User.findOne({email:req.body.email})
    .then( foundUser =>{
        if(!foundUser){
            return res.status(400).json({message: 'utilisateur non trouvé !'})
        }
        bcrypt.compare(req.body.password,foundUser.password)
        .then( result =>{
            if(!result){
                return res.status(400).json({message: 'password incorrect !'})
            }
            return(res.status(200).json({
                userId:foundUser._id,
                token: jwt.sign(
                    {userId: foundUser._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn:'24h'}
                )
            }))
        } )
        .catch( error => res.status(500).json({comparErrorMessage: error}))
    })
    .catch(error => res.status(500).json({errorMessage: error}) )

}
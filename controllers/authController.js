const User = require('../models/userModels')
const bcrypt = require('bcryptjs')

exports.signUp = async(req,res) => {
    const {username, password} = req.body
  
    try{
      const hashpassword = await bcrypt.hash(password, 12)
      const newUser = await User.create({
        username,
        password: hashpassword, 
      })
      req.session.user = newUser;
      console.log(req.session.user);
      res.status(201).json({
        status: 'Success',
        data:{
            user: newUser
        }
      })
    }
    catch(err)
    {
      console.log(err)
      res.status(400).json({
        status: 'fail'
      })
    }
}

exports.login = async(req, res) => {
    const {username, password} = req.body;
    try{
      const user = await User.findOne({username})
      if(!user)
      {
        return res.status(404).json({
            status: 'Fail',
            message: "User not found"
        })
      }
      
      const isCorrect = await bcrypt.compare(password, user.password)
      if(isCorrect)
      {
        res.status(200).json({
            status: 'Success'
        })
      }
      else{
        res.status(400).json({
            status: 'Fail',
            message: 'Incorrect username or password',
        });
      }
    }
    catch(err)
    {
      console.log(err)
      res.status(400).json({
        status: 'fail'
      })
    }
}
const protect =  (req, res, next) => {
    console.log("entered", req.session.user)
    const { user } =  req.session;
    console.log ("User", user)
    console.log(req.user)
    if(!user)
    {
        return res.status(401).json({
            status: 'fail',
            message: 'unauthorized'
        })
    }
      
    req.user = user

    next();
};

module.exports = protect
const handleSignin = (req,res,db,bcrypt)=>{
    const {email, password} =req.body;
    if(!email || !password){
        return res.status(400).json('incorret submission')
    }
    db.select('email','hash').from('login')
    .where('email', '=', email)
    .then(data =>{
      const isVallid= bcrypt.compareSync(password, data[0].hash);
      if(isVallid){
          return db.select('*').from('users')
          .where('email','=',email)
          .then(user =>{
              res.json(user[0])
          })
          .catch(err=> res.status(400).json('No User Found'))
      }else{
           res.status(400).json('wrong email or password')
      }
    })
    .catch(err=> res.status(400).json('wrong email or password'))
}
module.exports={
    handleSignin:handleSignin
}
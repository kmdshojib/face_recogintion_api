// import { createRequire } from 'module';
// const require = createRequire(
//     import.meta.url
// );
const clarifai = require('clarifai');


const app = new Clarifai.App({
 apiKey: '9aa93ce48b66460f85b3b39e6a0b2cb2'
});
const handleApiCall =(req,res)=>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err => res.status(400).json('no api found'))
}


const handleImage=(req,res,db)=>{
    const { id } =req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to count entries'))
}
module.exports={
    handleImage:handleImage,
    handleApiCall
}
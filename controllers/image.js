const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey : '2f0ec11b74964e2a936e439d10814537'
  });

const requestApi = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{res.json(data)})
    .catch(err=>res.status(400).json('unable to request API'))
}

const handleImage = (postgresDB) => (req,res) => {
    const { id } = req.body;
    postgresDB('users').where('id','=', id)
    .increment('entries',1).returning('entries')
    .then(entries=>res.json(entries))
    .catch(err=>res.status(400).json('error updating entries'))
};

module.exports = {
    handleImage,
    requestApi
}
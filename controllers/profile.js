
const handleProfile = (postgresDB) => (req,res) => {
    const { id }=req.params;
    postgresDB.select('*').from('users').where({id})
    .then(user=>{
        if(user.length)
            res.json(user)
        else{
            res.status(404).json('User Not Found')
        }
    }).catch(err=>res.status(404).json('error getting user'))
};

module.exports = {
    handleProfile
}
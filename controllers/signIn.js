
const handleSignIn = (postgresDB,bcrypt) => (req,res) => {
    const {email, password} = req.body;
    if( !email || !password )
        return res.status(400).json('Incorrect informations')
    postgresDB.select('*').from('login').where('email','=',email)
    .then(credentials=>{
         const isValid = bcrypt.compareSync(password, credentials[0].password);
         if(isValid){
             postgresDB.select('*').from('users')
             .where('email', '=', email)
             .then(user=>{
                 res.json(user)
             })
             .catch(err=>res.status(400).json('Unable to signin'))
         }else{
             res.status(404).json('credentials are wrong!')
         }
    })
 };

 module.exports = {
    handleSignIn
 }
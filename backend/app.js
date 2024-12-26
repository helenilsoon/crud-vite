require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const  bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const User = require('./models/User');

app.get('/',(req,res)=>{
        res.status(200).json({
            msg: 'Bem Vindo ao backend',
            method:req.method
        });

})
// listar usuarios
app.get('/users', async(req,res)=>{
    const usuarios = await User.find()
    
    return res.status(200).json({usuarios});
})
app.post('/login',async(req,res) =>{
     const {email,password} =req.body;
    if(!email ){
       return res.status(400).json({msg:"email e obrigatorios"});
    }
    if( !password){
        return res.status(400).json({msg:"A senha obrigatorios"});
    }

    const user = await User.findOne({email:email});
    if(!user){
        return res.status(404).json({msg:"Usuário nâo encontrado"})
    }
    const checkPassword = await bcrypt.compare(password,user.password);

    if(!checkPassword){
        return res.status(422).json({msg:"senha invalida"});
    }
     return res.status(200).json({
        msg:"authenticated",
        token:user.token

     });

     
})

app.post('/register',async (req,res)=>{
    const {name,email,password,confirmPassword} = req.body;
    let tokenBody = req.body.token
    
 console.log(req.body)
    if(!name){
        return res.status(422).json({msg:"o nome e obrigatorio"});
    }
    if(!email){
        return res.status(422).json({msg:"o email e obrigatorio"});
    }
    if(!password){
        return res.status(422).json({msg:"o password e obrigatorio"});
    }
    if(confirmPassword !== password){
        return res.status(422).json({msg:"as senhas devem ser iguais"});
    }

    const userExists = await User.findOne({email:email})

    if(userExists){
        return res.status(422).json({msg:"email ja cadastrado"});
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password,salt);

    try{
        const secret  = process.env.SECRET;
        console.log(secret);
        const tokenJwt =jwt.sign({
            name,
            email
        },secret);
        // res.status(200).json({tokenJwt});
        tokenBody = tokenJwt
    }catch(error){
        res.status(500).json({msg:"Erro ao cadastrar token"})
        console.log('Erro ao cadastrar token',error);
    }

    const user = new User({
        name,
        email,
        password:passwordHash,
        token:tokenBody
    })
    try{
        await user.save();
        return res.status(201).json({msg:"Usuário criado com sucesso"})
    }catch(err){
        return res.status(500).json({msg:"Erro ao cadastrar usuarios"})
    }

})
const dbUser =process.env.DB_USER;
const dbPassword =process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.b99ep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
.then(()=>{
    app.listen(3001)
    console.log('Conectado ao banco de dados na porta 3001');
})
.catch((err)=>{
    console.log('erro ao conectar com o banco',err);
})

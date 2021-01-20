require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const axios=require('axios')
const { json } = require('body-parser')
const DataBase=require('./DataBase/connect')();
const word=require('./DataBase/model')
const {addToDataBase,getFromDataBase}=require('./utils')
const app=express()


//MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//ROUTES
app.get("/",async (req,res)=>{
    console.log("HII")
    word.find({},(err,array)=>{
        if(err)
        {
            console.log(err)
        }else if(array.length!=0){
            console.log("Hii it's working")
            res.send(JSON.stringify(array[0].Words));
        }
    })
    
})
app.post("/",(req,res)=>{
    res.send(JSON.stringify(Data))
})

app.post('/wordSubmit',(req,res)=>{
    const word=req.body.word.toLowerCase();
    const URL="https://od-api.oxforddictionaries.com/api/v2/entries/en-us/"+word;
    const obj={
          
    }
    axios.get(URL,{
        headers:{
            'app_id': process.env.APP_ID,
            'app_key': process.env.APP_KEY
        }
    }).then((response)=> response.data.results)
    .then((resu)=>resu[0].lexicalEntries)
    .then((data)=>{
      
        obj.wordCategory=data[0].lexicalCategory;
        obj.word=data[0].text;
        obj.history=data[0].entries[0].etymologies;
        return data[0].entries[0].senses;
    })
    .then((final)=>{
        obj.definition=final[0].definitions[0];
        obj.examples=final[0].examples;
        obj.otherDefinition=final[0].subsenses;
        obj.synonyms=final[0].synonyms;
    })
    .then(async ()=> await addToDataBase(obj))
    //.then(()=>console.log(obj))
    .then(()=>res.redirect("/"))
    .catch(error=> console.log(error)) 
})



app.listen(process.env.PORT || 5000,()=>console.log("Listening on Port 5000"))
var mongoose=require('mongoose');


const connection= async ()=>{
    try {
      const conn= await mongoose.connect('mongodb+srv://admin-devesh:devesh123@cluster0.azxo6.mongodb.net/vocab?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
      } 
      catch (error) {
        console.log(error);
      }
}
module.exports= connection;

//ohh= mongodb://localhost:27017/myapp
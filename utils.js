const word=require('./DataBase/model')
const mongoose=require('mongoose')

const impFunc={
    addToDataBase: async (obj)=>{
             /*const bookData= new word({
                  Words: obj
              })
              console.log(bookData)
             */
             await word.find({},(err,data)=>{
                  if(err)
                  {
                      return err
                  }else if(data.length==0)
                  {
                      console.log("YAYY")
                    const bookData=new word({
                        Words: obj
                    }) 
                    bookData.save()
                  }else{
                      console.log("WOahh")
                      console.log(data)
                      data[0].Words.push(obj);
                      data[0].save();
                  }
              })
    },
    getFromDataBase: async ()=>{
           var Array=[];
           console.log("NOO")
           await word.find({},(err,array)=>{
               if(err)
               {
                   console.log(err)
               }else if(array.length!=0){
                   console.log("Hii it's working")
                   Array=array[0].Words;
               }
           })
          
           return Array;
    }
}

module.exports=impFunc
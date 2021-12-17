const express = require("express");
const app = express();
app.use(express.json())
const fs = require('fs');


//post restful API for image upload
app.post('/export' , async(req,res)=>{
    try{
        const { detail_dimension } = req.body;
        const data = JSON.stringify(detail_dimension , null ,2);

        fs.appendFile('output.json' , data , (err)=>{
            if(err)
            console.log(err);
            else
            console.log("successful")
        })

}
catch(err){
    console.log(err)
}
})







app.listen(6000 , ()=>{
    console.log("server started successfully")
})



const express = require("express")
require("./db/conn")
const path = require("path")
const User = require("./models/usermessage")
const hbs = require("hbs")
const async = require("hbs/lib/async")
const app = express()
const port = process.env.PORT || 3000



//to use static website that is to directly import everything from public
//setting the path
const staticpath = path.join(__dirname,"../public")
//middleware

const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

hbs.registerPartials(partials_path)
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")))

app.use(function(error,req,res,next){
    res.send('500:internal server error',500)
})
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine", "hbs")
app.set("views", template_path)


app.get("/", (req,res)=> {
    res.render("index")
    // app.use(function(error,req,res,next){
    //     res.send('500:internal server error',500)
    // })
})

app.post("/contact" , async(req,res) => {
    try{
        // res.send(req.body)
        const userData = new User(req.body)
        await userData.save()
        res.status(201).render("index")
        //above only
    }catch(e){
        res.status(500).send(e)
    }
})

// app.get("", (req,res)=>{
//     res.send("hey")
// })


app.listen(port , () => {
    console.log("success");
})
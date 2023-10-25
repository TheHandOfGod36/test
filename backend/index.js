import mongoose, {Schema} from "mongoose";
import express from 'express'
import cors from 'cors' // domain.com <----> 777.com
let url = "mongodb+srv://test:test@cluster0.exfve21.mongodb.net/?retryWrites=true&w=majority";
// MERN - mongodb express react Node.js

const port = process.env.PORT || 3008

let app = express()
app.use(cors())
app.set('use engine', 'ejs')
mongoose.connect(url);

let gameSchema = {
  login: String,
  password: String,
  money: Number,
  userProducts: Array,
  email: String,
};

let db = mongoose.model("game", Schema(gameSchema));

app.get('/', function (req, res) {
  res.render('reg.ejs')

})

// http://127.0.0.1:5500/reg/asdf/sa;dfkjlasdl23/asdf@fal.com
app.get('/reg/:login/:password/:email', function (req, res) {
  let login = req.params.login;
  let password = req.params.password;
  let email = req.params.email;

  
db.insertMany([
  {
    login: login,
    password: password,
    money: 0,
    userProducts: [],
    email: email,
  },
]);

   res.send({ data: "success" });



})




app.get("/autorisation/:login/:password/:email", async function (req, res) {
  let login = req.params.login;
  let password = req.params.password;
  let email = req.params.email;

  let result = await db.find({login: login, password: password, email: email})

  console.log(result)
  if(result.length == 0){
    res.send({data: 'error'})
  }
  else {
    res.send({data: 'success'})
  }
});


let users = await db.find({})
console.log(users)

// http://localhost:3008/
app.listen(port);
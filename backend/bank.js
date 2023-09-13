// bank (login, money, cardNumber)

import mongoose, { Schema } from "mongoose";

let url = "mongodb+srv://test:test@cluster0.exfve21.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url);

let bankSchema = {
  login: String,
  money: Number,
  cardNumber: String,
};

let db = mongoose.model("bank", Schema(bankSchema));

db.insertMany([
    {
        login: 'user',
        money: 1000000,
        cardNumber: '16461273126547',
    },
])

let users = await db.find({login: 'user'});
console.log(users);
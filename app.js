require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post("/explain", async (req, res) => {

const code = req.body.code;

try{

const response = await axios({
method:"post",
url:"https://api.openai.com/v1/chat/completions",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},
data:{
model:"gpt-4o-mini",
messages:[
{
role:"user",
content:`Explain this code simply:\n\n${code}`
}
]
}
});

res.json({
explanation:response.data.choices[0].message.content
});

}
catch(error){

console.log(error.response.data || error.message);

res.status(500).json({error:"Error explaining code"});

}

});

app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});
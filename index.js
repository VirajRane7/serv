const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@12345678",
    database: "crud_contact"
}); 


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/get", (req, res)=> {

    const sqlGet = "SELECT * FROM contact_db"
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    })
})

app.post("/api/post", (req, res)=>{
    const {name , email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result)=>{
        if (error) {
            console.log(error);
        }
    });
});


app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('John', 'john@gmail.com', 433433131)";
//     db.query(sqlInsert,(error,result)=>{
//         console.log("Error ",error);
//         console.log("Result", result);
//         res.send("Hello Express");
// });
});

// app.get("/delete", (req, res) => {
//     const sqlInsert = "DELETE FROM contact_db WHERE name = 'John'";
//     db.query(sqlInsert,(error,result)=>{
//         console.log("Error ",error);
//         console.log("Result", result);
//         res.send("DELETED");
// });
// });

app.listen(5000, ()=> {
    console.log("Server is running on port 5000");
})
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();


app.use(cors());
app.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './client/src/uploads'); // Create an 'uploads' directory in your project
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"686075",
    database:"blogdb"
});



db.connect( err =>{
    if(err){
        console.log("Mysql error",err);
    }
    else{
        console.log("Connected to mysql")
    }
})

app.get("/api/items",(req,res)=>{
    const sql = "select * from blog_posts";
    db.query(sql,(err,results)=>{
        if(err){
            console.log("Mysql error",err);
        }
        else{
            res.status(200).json(results);  
        }

    })
    
})

// upload post 
app.post('/api/uploadpostimg', upload.single('image'), (req, res) => {
    const { filename } = req.file;
    const { title, content } = req.body;
    
    const {userid} = req.body.userid;
    console.log(filename,title,content,userid)
  
    const sql = 'INSERT INTO blog_posts (title, content, filename,user_id) VALUES (?, ?, ?,?)';
    db.query(sql, [title, content, filename,userid], (err, result) => {
      if (err) {
        console.error('MySQL error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).send('Image added successfully');
      }
      console.log(result);
    });
  });

app.post("/api/checkvaliduser",(req,res)=>{
    const { username, password } = req.body;
    // console.log(username)
    // console.log(password);
    const sql = "select * from users where username = ? and password_hash = ?";
    db.query(sql,[username,password],(err,result)=>{
        if(err){
            console.log("MySql err",err);
        }
        else if(result.length >0){
            // console.log(result[0].user_id)
           
            res.status(200).send({success:true, user:result[0].user_id});  
            console.log("Valid") 
        }else {
            // Invalid login
            res.status(401).send({ success: false, message: 'Invalid credentials' });
            console.log("not valid");
        }
    })
    // if(user === result.username && pass === result.password_hash){
    //     console.log("Valid")
    // }
    // else{
    //     console.log("not valid");
    // }
})

app.get("/User/:userId", (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT * FROM users WHERE user_id = ?";
    const query2 = "SELECT * FROM blog_posts WHERE user_id = ?";

    db.query(query, [userId], (err, userResults) => {
        if (err) {
            return res.status(500).send("Error querying database");
        }

        if (userResults.length === 0) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const user = userResults[0];

        db.query(query2, [userId], (err, postResults) => {
            if (err) {
                return res.status(500).send("Error querying blog posts of user");
            }
            const posts = postResults || [];
            // console.log(posts)

            return res.status(200).send({ success: true, user, posts });
        });
    });
});
app.post("/api/signup", (req, res) => {
    const { name, userName, password, email, pnumber, dob } = req.body;

    const query = "INSERT INTO users(username,email,password_hash,name,dob,phone_number) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [userName, email, password, name, dob, pnumber], (err, results) => {
        if (err) {
            console.error("Error inserting into the users table:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (results.affectedRows > 0) {
                res.status(200).send({ success: true, result: results });
            } else {
                res.status(404).send({ success: false, message: "Username already exists, choose another" });
            }
        }
    });
});


app.listen(5000,()=>{
    console.log("Server started at port 5000");
})
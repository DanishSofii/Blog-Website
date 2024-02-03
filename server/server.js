const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    }
  });

  const upload = multer({ storage: storage }).single('image');


const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DBNAME
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
app.post('/api/uploadpostimg', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        const { filename } = req.file;
        const { title, content, userid } = req.body;
  

        const userIdInt = parseInt(userid);
  
        if (isNaN(userIdInt)) {
          res.status(400).send('Invalid user ID');
          return;
        }
  
        const sql = 'INSERT INTO blog_posts (title, content, filename, user_id) VALUES (?, ?, ?, ?)';
        db.query(sql, [title, content, filename, userIdInt], (err, result) => {
          if (err) {
            console.error('MySQL error:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.status(201).send('Image added successfully');
          }
        });
      }
    });
  });
  
app.post("/api/checkvaliduser",(req,res)=>{
    const { username, password } = req.body;
    
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
        else if(userResults.length > 0){
            const user = userResults[0];
            return res.status(200).send({ success: true, user });

        }

        
    });
});

app.get("/getUserPosts/:userId", (req, res) => {
    const userId = req.params.userId;
    
    const q = "select * from blog_posts where user_id = ?";
    db.query(q, [userId], (err, posts) => {
        if (err) {  
            return res.status(500).send("Error querying database");
        }

        if (posts.length === 0) {
            return res.status(404).send({ success: false, message: "posts not found" });
        } else if(posts.length >0){
            const post = posts;   
            return res.status(200).send({ success: true, post });
        }
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

app.get("/api/search", (req, res) => {
    const searchQuery = req.query.q;
    const sql = "SELECT * FROM blog_posts WHERE title LIKE ? OR content LIKE ?";
    const queryParams = [`%${searchQuery}%`, `%${searchQuery}%`];
  
    db.query(sql, queryParams, (err, results) => {
      if (err) {
        console.log("MySQL error", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
// delete post

app.delete("/api/deletepost/:postId", (req, res) => {
    const postId = req.params.postId;
  
    const deletePostQuery = "DELETE FROM blog_posts WHERE post_id = ?";
    db.query(deletePostQuery, [postId], (err, result) => {
      if (err) {
        console.error("MySQL error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ success: true, message: "Post deleted successfully" });
        } else {
          res.status(404).json({ success: false, message: "Post not found" });
        }
      }
    });
  });


app.listen(5000,()=>{
    console.log("Server started at port 5000");
})
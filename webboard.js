const express = require("express");
const app = express();
// const port = 3000;
var mysql = require("mysql");
var bodyParser = require("body-parser");
var router = express.Router();

// app.set("view engine", "pug");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodelogin"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//app.get('/',(req,res) => res.send('hello world'));
router.get('/user',function(req, res){

    var val = req.session.user;
    res.render('home',{user:val});
});

router.get("/", (req, res) => {
  connection.query("SELECT * FROM posts", (err, result) => {
    var val = req.session.user;
    res.render("index", {
      posts: result
    });
  });
});


router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const author_name = req.body.author_name;
  const post = {
    title: title,
    content: content,
    author: author_name,
    created_at: new Date()
  };
  connection.query("INSERT INTO posts SET ?", post, err => {
    console.log("Data Inserted");
    return res.redirect("/");
  });
});

router.get("/edit/:id", (req, res) => {
  const edit_postID = req.params.id;

  connection.query(
    "SELECT * FROM posts WHERE id=?",
    [edit_postID],
    (err, results) => {
      if (results) {
        res.render("edit", {
          post: results[0]
        });
      }
    }
  );
});

router.post("/edit/:id", (req, res) => {
  const update_title = req.body.title;
  const update_content = req.body.content;
  const update_author_name = req.body.author_name;
  const userId = req.params.id;
  connection.query(
    "UPDATE `posts` SET title = ?, content = ?, author = ? WHERE id = ?",
    [update_title, update_content, update_author_name, userId],
    (err, results) => {
      if (results.changedRows === 1) {
        console.log("Post Updated");
      }
      return res.redirect("/");
    }
  );
});

router.get("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM `posts` WHERE id = ?",
    [req.params.id],
    (err, results) => {
      return res.redirect("/");
    }
  );
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = router;
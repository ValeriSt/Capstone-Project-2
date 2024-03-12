import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})
app.get("/about", (req, res) => {
    res.render("about.ejs");
})
app.get("/Rome", (req, res) => {
    res.render("Rome.ejs");
})

app.get("/Paris", (req, res) => {
    res.render("Paris.ejs");
})

app.get("/Barcelona", (req, res) => {
    res.render("Barcelona.ejs");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
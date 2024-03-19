import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;
const publications = [];
var startTime = new Date().getTime();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { publications: publications });
})
app.get("/about", (req, res) => {
    res.render("about.ejs");
})
app.get("/Italy", (req, res) => {
    res.render("Italy.ejs", { publications: publications });
})

app.get("/France", (req, res) => {
    res.render("France.ejs", { publications: publications }
    );
})

app.get("/Spain", (req, res) => {
    res.render("Spain.ejs", { publications: publications });
})
app.get("/publication", (req, res) => {
    res.render("publication.ejs");
})

app.post("/submit", (req, res) => {
    const { fName, Story, country } = req.body;

    publications.push({ fName, Story, country });

    if (country === "Other") {
        res.redirect("/");
    }else{
        res.redirect(`/${country}`)
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
let pageUrl = "";
let currentCity = ""; // Initialize variable to store current city

app.use(express.static("public"));
app.use(checkCurrentURL);

app.get("/", (req, res) => {
    res.render("index.ejs", {currentPage: req.currentPageURL});
})
app.get("/about", (req, res) => {
    res.render("about.ejs");
})
app.get("/Rome", (req, res) => {
    res.render("Rome.ejs", {currentPage: req.currentPageURL});
})

app.get("/Paris", (req, res) => {
    res.render("Paris.ejs", {currentPage: req.currentPageURL});
})

app.get("/Barcelona", (req, res) => {
    res.render("Barcelona.ejs", {currentPage: req.currentPageURL});
})
// Middleware to handle /publication route


function checkCurrentURL(req, res, next) {
    // Determine the current page URL
    const currentPageURL = `${req.originalUrl}`;

    // You can perform any checks or actions based on the current URL here
    if (currentPageURL === "/") {
        // If the current page is the home page
        currentCity = ""; // Reset current city when accessing the home page
    } else if (currentPageURL === "/Rome") {
        // If the current page is Rome
        currentCity = "Rome";
    } else if (currentPageURL === "/Paris") {
        app.get("Paris/publication", (req, res, next) => {
            if (currentCity == "Paris") {
                res.render("publication.ejs");
            } else {
                // Otherwise, render default publication page
                next();
            }
        });
    } else if (currentPageURL === "/Barcelona") {
        // If the current page is Barcelona
        currentCity = "Barcelona";
    } 
    
    // Call the next middleware function in the stack
    next();
}



// Register the checkCurrentURL middleware to be used for all routes
app.use(checkCurrentURL);



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
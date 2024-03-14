import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;
const publications = [];
// let currentCity = ""; // Initialize variable to store current city


app.use(express.static("public"));
// app.use(checkCurrentURL);

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
    // Assuming you save the new publication to your array
    publications.push({ fName, Story, country });
    // Render the "publication.ejs" template with the updated list of publications
    if (country === "Other") {
        res.redirect("/");
    }else{
        res.redirect(`/${country}`)
    }
});

// function checkCurrentURL(req, res, next) {
//     // Determine the current page URL
//     const currentPageURL = `${req.originalUrl}`;

//     // You can perform any checks or actions based on the current URL here
//     if (currentPageURL === "/") {
//         // If the current page is the home page
//         currentCity = ""; // Reset current city when accessing the home page
//     } else if (currentPageURL === "/Rome") {
//         // If the current page is Rome
//         currentCity = "Rome";
//     } else if (currentPageURL === "/Paris") {
//         app.get("Paris/publication", (req, res, next) => {
//             if (currentCity == "Paris") {
//                 res.render("publication.ejs");
//             } else {
//                 // Otherwise, render default publication page
//                 next();
//             }
//         });
//     } else if (currentPageURL === "/Barcelona") {
//         // If the current page is Barcelona
//         currentCity = "Barcelona";
//     } 
    
//     // Call the next middleware function in the stack
//     next();
// }



// Register the checkCurrentURL middleware to be used for all routes
// app.use(checkCurrentURL);



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
require('dotenv').config();

const express = require("express");
const db = require("./db"); 
const cors = require("cors");

const app = express();
const morgan = require("morgan");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("select * from restaurants");
        const restaurantRatingData = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id");
        
        res.json({
            Status : "Success",
            results: restaurantRatingData.rows.length,
            data: {
                restaurants: restaurantRatingData.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
   
});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req,res) => {
    console.log(req.params.id);

    try {
       const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", [
        req.params.id
    ]);
        // select * from restaurants where id = req.params.id

        const reviews = await db.query("select * from reviews where restaurant_id = $1", [
            req.params.id
        ]);
    res.status(200).json({
        data: {
            restaurant: restaurant.rows[0],
            reviews: reviews.rows
        },
    });

    } catch (err) {
        console.log(err);
    }
});

//Create a restaurant

app.post("/api/v1/restaurants", async (req, res) => {
     try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name,
            req.body.location, req.body.price_range
        ])
        console.log(results)
        res.status(201).json({
            data: {
                restaurant: results.rows[0],
            }
        });
     } catch(err) {
        console.log(err)
     }

});

//Update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {
       const results = await db.query(
        "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", 
        [req.body.name, req.body.location, req.body.price_range, req.params.id]);
       console.log(results)

       res.status(200).json({
        data: {
            restaurant: results.rows[0],
        }
    });
       
     } catch(err) {
        console.log(err)
     }
});

// Delete Restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const results = await db.query(
         "DELETE FROM restaurants where id = $1", 
         [req.params.id]);
 
        res.status(200).json({
        status: "success",
     });
        
      } catch(err) {
         console.log(err)
      }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", [
            req.params.id, req.body.name, req.body.review, req.body.rating
        ]);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
}
);


app.listen(port, () => {
    console.log("Console is up and listening on port", port);
});
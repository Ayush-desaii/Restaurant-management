const express = require("express");
const { pool, createTables } = require("./db")

const userRoute = require("./Routes/user")
const orderRoute = require("./Routes/order")
const itemRoute = require("./Routes/item")
const orderitemRoute = require("./Routes/orderitem")

const app = express();
app.use(express.json());




// API Route to Add a User
app.use("/users", userRoute);

// API Route to Get orders
app.use("/orders", orderRoute);

// item routes
app.use("/items", itemRoute);

// orderitem route
app.use("/orderitem", orderitemRoute);


// Initialize Database and Start Server
(async () => {
  await createTables();
  app.listen(3000, () => console.log("Server running on port 3000"));
})();

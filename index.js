const express = require("express");
const { pool, createTables } = require("./db")

const userRoute = require("./Routes/user")

const app = express();
app.use(express.json());




// API Route to Add a User
app.use("/users", userRoute);

// API Route to Get Users


// Initialize Database and Start Server
(async () => {
  await createTables();
  app.listen(3000, () => console.log("Server running on port 3000"));
})();

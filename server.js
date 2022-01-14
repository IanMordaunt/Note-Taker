// Dependencies
const express = require("express");
const htmlRoutes = require("./routes/html");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static("public"));
app.use("/", htmlRoutes);
// app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`Listening at https://localhost:${PORT}`));

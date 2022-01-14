const express = require("express");
const apiRoutes = require("./routes/api");
const htmlRoutes = require("./routes/html");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static("public"));
app.use('/api', apiRoutes)
app.use("/", htmlRoutes);


app.listen(PORT, () => console.log(`Listening at https://localhost:${PORT}`));

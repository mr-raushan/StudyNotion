const express = require("express");
const app = express();

const userRoutes = require("./route/User");
const profileRoutes = require("./route/Profile");
const courseRoutes = require("./route/Course");
const paymentRoutes = require("./route/Payment");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connection
database.connect();

//middleware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running.... ",
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...  `);
});

//24:00

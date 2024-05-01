import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser"
import postRoutes from "./routes/post.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(8000, () => {
    console.log("Connected to port 8000!");
});

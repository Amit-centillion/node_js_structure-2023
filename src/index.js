import { Router } from "express";
import userRoutes from "./routes/user"

const route = Router();

route.use("/user",userRoutes);

export default route
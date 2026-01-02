import express from "express";
import cors from "cors";
import imoveisRoutes from "./routes/imoveis.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// rotas
app.use("/imoveis", imoveisRoutes);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});

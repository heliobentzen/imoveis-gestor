import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const router = express.Router();

// Corrigir __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do db.json
const dbPath = path.join(__dirname, "../db.json");

// Configuração do multer
const upload = multer({
  dest: path.join(__dirname, "../uploads"),
});

// 🔹 GET /imoveis
router.get("/", (req, res) => {
  try {
    if (!fs.existsSync(dbPath)) {
      return res.json([]);
    }

    const data = fs.readFileSync(dbPath, "utf-8");
    const json = data ? JSON.parse(data) : [];

    res.json(json);
  } catch (error) {
    console.error("Erro no GET /imoveis:", error);
    res.status(500).json({ error: "Erro ao buscar imóveis" });
  }
});

// 🔹 POST /imoveis
router.post("/", upload.array("imagens"), (req, res) => {
  try {
    const data = fs.existsSync(dbPath)
      ? JSON.parse(fs.readFileSync(dbPath, "utf-8"))
      : [];

    const novoEmpreendimento = {
      id: Date.now(),
      ...req.body,
      imagens: req.files?.map((file) => file.filename) || [],
    };

    data.push(novoEmpreendimento);

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

    res.status(201).json(novoEmpreendimento);
  } catch (error) {
    console.error("Erro no POST /imoveis:", error);
    res.status(500).json({ error: "Erro ao salvar empreendimento" });
  }
});

export default router;

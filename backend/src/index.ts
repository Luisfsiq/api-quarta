import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Rota raiz para evitar "Cannot GET /"
app.get("/", (req, res) => {
  res.send("API OK");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Credenciais inv�lidas" });
    }

    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ 
      user: userWithoutPassword,
      token: "fake-jwt-token"
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, avatar } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Usu�rio j� existe" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        avatar
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ 
      user: userWithoutPassword,
      token: "fake-jwt-token"
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Erro ao criar usu�rio" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});

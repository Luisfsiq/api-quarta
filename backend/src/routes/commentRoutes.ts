import express from "express";
import { PrismaClient } from "@prisma/client";
import { validate } from "../middleware/validate";
import { createCommentSchema } from "../schemas/commentSchema";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ ROTA CORRIGIDA: POST /api/comments (mais simples)
router.post("/", validate(createCommentSchema), async (req, res) => {
  try {
    const { content, authorId, postId } = req.body;

    console.log("📝 Criando comentário para post:", postId);

    if (!content || !authorId || !postId) {
      return res.status(400).json({ error: "Content, authorId and postId are required" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    console.log("✅ Comentário criado:", comment.id);
    res.status(201).json(comment);
  } catch (error) {
    console.error("❌ Erro ao criar comentário:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

export default router;

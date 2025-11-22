import { prisma } from "@repo/db";
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware";
import "dotenv/config";

const HTTP_PORT = process.env.HTTP_PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.post("/project", authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  const userId = req.userId;
  if (!prompt || !userId) {
    return res.status(400).json({ message: "Bad Request" });
  }
  //add logic to get a name from the prompt
  const description = prompt.split("\n")[0];
  try {
    const project = await prisma.project.create({
      data: {
        description,
        userId: userId,
      },
    });
    res.json({ projectId: project.id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});

app.get("/projects", authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ message: "Bad Request" });
  }
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
    });

    res.json(projects);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(HTTP_PORT, () => {
  console.log("Server is running on port ", HTTP_PORT);
});

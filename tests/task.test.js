const request = require("supertest");
const app = require("../src/server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.task.deleteMany();
});

describe("Task API", () => {
  it("GET /tasks should return empty array", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /tasks should create task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", description: "testing" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  it("PATCH /tasks/:id/toggle should update status", async () => {
    const task = await prisma.task.create({
      data: { title: "Toggle", description: "toggle test" }
    });

    const res = await request(app).patch(`/tasks/${task.id}/toggle`);
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("DELETE /tasks/:id should remove task", async () => {
    const task = await prisma.task.create({
      data: { title: "Delete", description: "delete test" }
    });

    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.statusCode).toBe(204);
  });
});


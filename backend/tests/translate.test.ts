import request from "supertest";

describe("Translation API", () => {
  it("returns Georgian translation", async () => {
    const res = await request("http://localhost:3001")
      .post("/api/translate")
      .send({
        summary: "We discussed the Q3 marketing budget and cost-saving ideas.",
        decisions: ["Increase budget by 20%", "Cancel ad contract"],
        action_items: [
          { task: "Update spreadsheet", assignee: "Jina", deadline: "Friday" },
        ],
      });

    expect(res.status).toBe(200);
    expect(typeof res.body.translation).toBe("string");
    expect(res.body.translation.length).toBeGreaterThan(10);
  });
});

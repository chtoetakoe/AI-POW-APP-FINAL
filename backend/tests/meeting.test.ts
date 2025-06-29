import request from "supertest";

describe("AI Meeting Assistant API", () => {
  it("returns similar meetings", async () => {
    const res = await request("http://localhost:3001")
      .post("/api/semantic-search")
      .send({ query: "budget update" });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it(
    "returns image URL for a meeting",
    async () => {
      const res = await request("http://localhost:3001")
        .post("/api/generate-visual")
        .send({ meeting_id: "e83dcb9a-cdc9-4ad8-81f0-427f55f56794" }); 

      expect(res.status).toBe(200);

     
      expect(res.body.imageUrl).toMatch(
        /^https:\/\/.+\.(jpg|jpeg|png|webp)(\?.+)?$/
      );
    },
    20000 
  );
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

import request from "supertest";
import express from "express";
import { createReadStream } from "fs";
import path from "path";

// 🔁 adjust if your `src/index.ts` doesn't export app directly
import "../src/index"; // makes sure server runs

describe("AI Meeting Assistant API", () => {
  it("returns similar meetings", async () => {
    const res = await request("http://localhost:3001")
      .post("/api/semantic-search")
      .send({ query: "budget update" });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("returns image URL for a meeting", async () => {
    const res = await request("http://localhost:3001")
      .post("/api/generate-visual")
      .send({ meeting_id: "e83dcb9a-cdc9-4ad8-81f0-427f55f56794" });
  
    expect(res.status).toBe(200);
    expect(res.body.imageUrl).toMatch(/^https:\/\/.+\.(jpg|jpeg|png|webp)$/);
  }, 15000); // ✅ Increase timeout to 15 seconds
  

  // Optional: Uncomment if you want to test actual audio processing
  // it("uploads audio and gets summary", async () => {
  //   const audioPath = path.join(__dirname, "test_audio.mp3"); // Replace with your real file
  //   const res = await request("http://localhost:3001")
  //     .post("/api/process-meeting")
  //     .attach("audio", createReadStream(audioPath));

  //   expect(res.status).toBe(200);
  //   expect(res.body.summary).toBeDefined();
  //   expect(Array.isArray(res.body.decisions)).toBe(true);
  // });
});

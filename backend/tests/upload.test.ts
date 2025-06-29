import request from "supertest";
import path from "path";
import fs from "fs";

describe("Audio Upload & Insight Extraction", () => {
  it("processes an audio file and returns insights", async () => {
    const audioPath = path.join(__dirname, "test_audio.mp3");

    // Make sure the dummy file exists
    if (!fs.existsSync(audioPath)) {
      console.warn("⚠️ test_audio.mp3 not found. Skipping test.");
      return;
    }

    const res = await request("http://localhost:3001")
      .post("/api/process-meeting")
      .attach("audio", audioPath);

    expect(res.status).toBe(200);
    expect(typeof res.body.transcript).toBe("string");
    expect(typeof res.body.summary).toBe("string");
    expect(Array.isArray(res.body.decisions)).toBe(true);
    expect(Array.isArray(res.body.action_items)).toBe(true);
  });
});

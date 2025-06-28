import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transcribeRoute from "./routes/transcribe"; //  Import your route
import summarizeRoute from "./routes/summarize";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//  Use the route here BEFORE app.listen
app.use("/api/transcribe", transcribeRoute);

app.use("/api/summarize", summarizeRoute);


// Optional: Test route
app.get("/", (_req, res) => {
  res.send("KIU Meeting AI backend is running ✅");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

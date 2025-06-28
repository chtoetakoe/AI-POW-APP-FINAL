#  Smart Meeting Assistant

Smart Meeting Assistant is a full-stack web application that processes meeting recordings and delivers:

- ✅ Transcriptions with speaker content (Whisper API)
- ✅ GPT-4-powered meeting summaries, decisions, and action items
- ✅ Semantic search over past meetings using Embeddings API
- ✅ Similar meeting recommendations
- ✅ Visual summary generation with DALL·E 3
- ✅ Low-resource language support: 🌍 formal Georgian translation

---

## 🚀 Features

### 🔊 Audio Processing
- Upload `.mp3`, `.wav`, or `.m4a` meeting recordings
- Transcribed using OpenAI Whisper
- Processed in <30 seconds for 20–30 min files

### 📋 GPT-4 Insights
- Summarizes the meeting
- Extracts decisions and action items with assignees & deadlines
- Uses function calling for structured JSON output

### 🔍 Semantic Search & Similar Meetings
- Embeds meetings using `text-embedding-ada-002`
- Top 3 similar past meetings are recommended
- Manual search bar for natural-language queries

### 🎨 Visual Summaries
- GPT-4 generates a DALL·E prompt from the meeting content
- DALL·E 3 produces a visual summary image
- Saved and displayed in-app

### 🌍 Translation (Advanced AI Feature)
- Formal Georgian translation of summaries, decisions, and actions

---

## 🧑‍💻 Tech Stack

- **Frontend:** React + TypeScript + TailwindCSS
- **Backend:** Express + TypeScript + Supabase
- **AI:** OpenAI APIs – Whisper, GPT-4, DALL·E, Embeddings
- **Storage:** Supabase Postgres (with `pgvector` for embeddings)

---

## 🧪 Test Cases

Here are 3 representative test cases (manual or automated):

### 1. Upload Meeting Audio → Get Summary
**Given** a valid `.mp3` file,  
**When** the user uploads it,  
**Then** they receive a transcript, summary, decisions, and action items.

✅ *Covers Whisper, GPT-4 Function Calling*

---

### 2. Generate Visual Summary
**Given** a processed meeting with `meeting_id`,  
**When** the user clicks “🖼 Generate Visual Summary”,  
**Then** the system returns a DALL·E-generated image  
**And** saves it in Supabase under `visual_url`.

✅ *Covers GPT-4 + DALL·E API + Supabase write*

---

### 3. Manual Semantic Search
**Given** a query like `"marketing budget"`,  
**When** the user submits it via the search bar,  
**Then** the system returns a list of most relevant past meetings with content matches.

✅ *Covers Embeddings API + semantic ranking*

---

## ⚙️ How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ai-meeting-assistant.git
cd ai-meeting-assistant
````

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env  # Add your OpenAI + Supabase keys
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at:
[http://localhost:5173](http://localhost:5173) (frontend)
[http://localhost:3001](http://localhost:3001) (backend)

---

## 📦 Environment Variables

Create a `.env` file in the `backend/` folder:

```env
OPENAI_API_KEY=your-key
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---




from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Hugging Face pipeline for text generation
generator = pipeline("text-generation", model="gpt2", device=-1)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        generated_text = generator(f"Plan a trip: {request.message}", max_length=200, num_return_sequences=1)[0]["generated_text"]
        return {"reply": generated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

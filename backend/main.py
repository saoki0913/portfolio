from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.get("/")
async def root():
    return {"message": "Welcome to Portfolio API"}

@app.get("/api/projects")
async def get_projects():
    # 仮のプロジェクトデータ
    projects = [
        {
            "id": 1,
            "title": "E-commerce Platform",
            "description": "A full-stack e-commerce platform with user authentication and payment integration",
            "technologies": ["React", "TypeScript", "FastAPI", "PostgreSQL"],
            "github_url": "https://github.com/username/ecommerce",
            "project_url": "https://ecommerce-demo.com",
            "images": ["/ecommerce-1.jpg", "/ecommerce-2.jpg", "/ecommerce-3.jpg"]
        },
        {
            "id": 2,
            "title": "Task Management App",
            "description": "A collaborative task management application with real-time updates",
            "technologies": ["Next.js", "Tailwind CSS", "FastAPI", "WebSocket"],
            "github_url": "https://github.com/username/task-manager",
            "project_url": "https://task-manager-demo.com",
            "images": ["/task-manager-1.jpg", "/task-manager-2.jpg", "/task-manager-3.jpg"]
        },
        {
            "id": 3,
            "title": "Portfolio Website",
            "description": "A modern portfolio website built with Next.js and FastAPI",
            "technologies": ["Next.js", "React", "FastAPI", "Tailwind CSS"],
            "github_url": "https://github.com/username/portfolio",
            "project_url": "https://portfolio-demo.com",
            "images": ["/portfolio-1.jpg", "/portfolio-2.jpg", "/portfolio-3.jpg"]
        }
    ]
    return projects

@app.get("/api/skills")
async def get_skills():
    # 仮のスキルデータ
    skills = {
        "frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        "backend": ["Python", "FastAPI", "SQLAlchemy"],
        "other": ["Git", "Docker", "AWS"]
    }
    return skills

@app.post("/api/contact")
async def contact_form(form: ContactForm):
    try:
        # メール送信の設定
        sender_email = os.getenv("SMTP_EMAIL")
        sender_password = os.getenv("SMTP_PASSWORD")
        receiver_email = os.getenv("RECEIVER_EMAIL")

        # メールメッセージの作成
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = f"New Contact Form Submission from {form.name}"

        body = f"""
        Name: {form.name}
        Email: {form.email}
        Message: {form.message}
        """

        msg.attach(MIMEText(body, 'plain'))

        # メール送信
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)

        return {"message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
from fastapi import APIRouter, HTTPException, BackgroundTasks

from app.schemas.contact import ContactRequest, ContactResponse
from app.core.config import settings
from app.services.email import send_contact_email

router = APIRouter()

@router.post("/", response_model=ContactResponse)
async def send_contact_message(
    contact: ContactRequest,
    background_tasks: BackgroundTasks
):
    """
    問い合わせメッセージを送信
    """
    try:
        # メールをバックグラウンドタスクとして送信
        background_tasks.add_task(
            send_contact_email,
            name=contact.name,
            email=contact.email,
            subject=contact.subject,
            message=contact.message
        )
        
        # デバッグモードの場合は実際にメールを送信せず、ログに記録するだけ
        if not settings.EMAILS_ENABLED:
            return {
                "success": True,
                "message": "Email sending is disabled in debug mode, but your message was received."
            }
        
        # 成功レスポンス
        return {
            "success": True,
            "message": "Your message has been sent successfully. I'll get back to you soon!"
        }
    
    except Exception as e:
        # エラーの場合は例外をスロー
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send message: {str(e)}"
        ) 

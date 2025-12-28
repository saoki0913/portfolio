from supabase import Client as SupabaseClient
from app.domain.i_repository.i_contact_repository import IContactRepository
from app.domain.entity.contact import ContactRequest
from app.services.email import send_contact_email


class SupabaseContactRepository(IContactRepository):
    def __init__(self, client: SupabaseClient):
        self.client = client

    async def send_email(self, contact: ContactRequest) -> bool:
        """お問い合わせメール送信"""
        try:
            # メール送信サービスを使用
            await send_contact_email(contact)
            return True
        except Exception as e:
            print(f"Email sending failed: {e}")
            return False

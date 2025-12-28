from fastapi import HTTPException
from app.domain.i_repository.i_contact_repository import IContactRepository
from app.domain.entity.contact import ContactRequest, ContactResponse


class ContactUseCase:
    def __init__(self, repository: IContactRepository):
        self.repository = repository

    async def send_contact_email(self, contact: ContactRequest) -> ContactResponse:
        """お問い合わせメール送信"""
        success = await self.repository.send_email(contact)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to send email")
        return ContactResponse(success=True, message="お問い合わせを受け付けました")

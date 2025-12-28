from fastapi import APIRouter, Depends
from app.usecase.contact_usecase import ContactUseCase
from app.domain.entity.contact import ContactRequest, ContactResponse
from app.dependencies.dependency_injector import get_contact_usecase

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactResponse)
async def send_contact(
    contact: ContactRequest,
    usecase: ContactUseCase = Depends(get_contact_usecase)
):
    """お問い合わせ送信"""
    return await usecase.send_contact_email(contact)

from abc import ABC, abstractmethod
from app.domain.entity.contact import ContactRequest


class IContactRepository(ABC):
    @abstractmethod
    async def send_email(self, contact: ContactRequest) -> bool:
        """お問い合わせメール送信"""
        pass

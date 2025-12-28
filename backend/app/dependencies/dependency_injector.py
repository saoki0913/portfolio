from fastapi import Depends
from supabase import create_client, Client as SupabaseClient
from app.core.config import settings

# Repository imports
from app.infra.repository.supabase_work_repository import SupabaseWorkRepository
from app.infra.repository.supabase_skill_repository import SupabaseSkillRepository
from app.infra.repository.supabase_about_repository import SupabaseAboutRepository
from app.infra.repository.supabase_hero_repository import SupabaseHeroRepository
from app.infra.repository.supabase_contact_repository import SupabaseContactRepository

# UseCase imports
from app.usecase.work_usecase import WorkUseCase
from app.usecase.skill_usecase import SkillUseCase
from app.usecase.about_usecase import AboutUseCase
from app.usecase.hero_usecase import HeroUseCase
from app.usecase.contact_usecase import ContactUseCase


def get_supabase_client() -> SupabaseClient:
    """Supabaseクライアント取得"""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


def get_work_usecase(client: SupabaseClient = Depends(get_supabase_client)) -> WorkUseCase:
    """WorkUseCase取得（DI）"""
    repository = SupabaseWorkRepository(client)
    return WorkUseCase(repository)


def get_skill_usecase(client: SupabaseClient = Depends(get_supabase_client)) -> SkillUseCase:
    """SkillUseCase取得（DI）"""
    repository = SupabaseSkillRepository(client)
    return SkillUseCase(repository)


def get_about_usecase(client: SupabaseClient = Depends(get_supabase_client)) -> AboutUseCase:
    """AboutUseCase取得（DI）"""
    repository = SupabaseAboutRepository(client)
    return AboutUseCase(repository)


def get_hero_usecase(client: SupabaseClient = Depends(get_supabase_client)) -> HeroUseCase:
    """HeroUseCase取得（DI）"""
    repository = SupabaseHeroRepository(client)
    return HeroUseCase(repository)


def get_contact_usecase(client: SupabaseClient = Depends(get_supabase_client)) -> ContactUseCase:
    """ContactUseCase取得（DI）"""
    repository = SupabaseContactRepository(client)
    return ContactUseCase(repository)

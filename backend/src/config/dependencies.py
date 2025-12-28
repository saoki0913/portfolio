"""Dependency Injection Container"""
from supabase import create_client, Client
from src.config.settings import settings

# Repositories
from src.infra.repository.supabase_work_repository import SupabaseWorkRepository
from src.infra.repository.supabase_skill_repository import SupabaseSkillRepository
from src.infra.repository.supabase_about_repository import SupabaseAboutRepository
from src.infra.repository.supabase_hero_repository import SupabaseHeroRepository

# Services
from src.core.service.work_service import WorkService
from src.core.service.skill_service import SkillService
from src.core.service.about_service import AboutService
from src.core.service.hero_service import HeroService


# Supabaseクライアント（シングルトン）
_supabase_client: Client = None


def get_supabase_client() -> Client:
    """Supabaseクライアントを取得"""
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return _supabase_client


# Work関連の依存性
def get_work_service() -> WorkService:
    """WorkServiceを取得"""
    supabase = get_supabase_client()
    work_repository = SupabaseWorkRepository(supabase)
    return WorkService(work_repository)


# Skill関連の依存性
def get_skill_service() -> SkillService:
    """SkillServiceを取得"""
    supabase = get_supabase_client()
    skill_repository = SupabaseSkillRepository(supabase)
    return SkillService(skill_repository)


# About関連の依存性
def get_about_service() -> AboutService:
    """AboutServiceを取得"""
    supabase = get_supabase_client()
    about_repository = SupabaseAboutRepository(supabase)
    return AboutService(about_repository)


# Hero関連の依存性
def get_hero_service() -> HeroService:
    """HeroServiceを取得"""
    supabase = get_supabase_client()
    hero_repository = SupabaseHeroRepository(supabase)
    return HeroService(hero_repository)

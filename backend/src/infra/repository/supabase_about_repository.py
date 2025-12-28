"""Supabase About Repository Implementation"""
from typing import Optional
from supabase import Client
from src.core.entity.about import About, Education, Experience, SocialMedia
from src.core.repository.about_repository import AboutRepository


class SupabaseAboutRepository(AboutRepository):
    """Supabaseを使用したプロフィール情報のリポジトリ実装"""

    def __init__(self, supabase_client: Client):
        self.supabase = supabase_client

    def find_about_info(self) -> Optional[About]:
        """プロフィール情報を取得（学歴・職歴・SNS含む）"""
        # 基本プロフィール取得
        about_response = self.supabase.table("about").select("*").limit(1).execute()
        if not about_response.data:
            return None

        about_data = about_response.data[0]

        # 学歴取得
        education_response = self.supabase.table("education").select("*").order("start_date", desc=True).execute()
        education_list = [self._format_education(edu) for edu in education_response.data]

        # 職歴取得
        experience_response = self.supabase.table("experience").select("*").order("start_date", desc=True).execute()
        experience_list = [self._format_experience(exp) for exp in experience_response.data]

        # SNS取得
        social_media_response = self.supabase.table("social_media").select("*").execute()
        social_media_list = [SocialMedia.from_dict(sm) for sm in social_media_response.data]

        # Aboutエンティティを構築
        return About(
            name=about_data["name"],
            title=about_data["title"],
            summary=about_data["summary"],
            profile_image=about_data["profile_image"],
            bio=about_data["bio"],
            education=education_list,
            experience=experience_list,
            social_media=social_media_list
        )

    def _format_date(self, date_str: Optional[str]) -> str:
        """日付フォーマット (YYYY.M形式)"""
        if not date_str:
            return "現在"
        # ISO形式の日付文字列からYYYY.M形式に変換
        from datetime import datetime
        try:
            date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            return f"{date.year}.{date.month}"
        except:
            return date_str

    def _format_education(self, edu_data: dict) -> Education:
        """学歴データをフォーマット"""
        return Education(
            institution=edu_data["institution"],
            degree=edu_data["degree"],
            field=edu_data["field"],
            start_date=self._format_date(edu_data.get("start_date")),
            end_date=self._format_date(edu_data.get("end_date")),
            description=edu_data.get("description")
        )

    def _format_experience(self, exp_data: dict) -> Experience:
        """職歴データをフォーマット"""
        return Experience(
            company=exp_data["company"],
            position=exp_data["position"],
            start_date=self._format_date(exp_data.get("start_date")),
            end_date=self._format_date(exp_data.get("end_date")),
            description=exp_data.get("description"),
            achievements=exp_data.get("achievements")
        )

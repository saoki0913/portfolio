"""Supabase Skill Repository Implementation"""
from typing import List, Optional
from collections import defaultdict
from supabase import Client
from src.core.entity.skill import Skill, SkillCategory
from src.core.repository.skill_repository import SkillRepository


class SupabaseSkillRepository(SkillRepository):
    """Supabaseを使用したスキルのリポジトリ実装"""

    def __init__(self, supabase_client: Client):
        self.supabase = supabase_client

    def find_all(self, category: Optional[str] = None) -> List[Skill]:
        """全スキルを取得"""
        query = self.supabase.table("skills").select("*")

        if category is not None:
            query = query.eq("category", category)

        response = query.execute()
        return [Skill.from_dict(skill_data) for skill_data in response.data]

    def find_categories(self) -> List[SkillCategory]:
        """カテゴリごとにグループ化されたスキルを取得"""
        response = self.supabase.table("skills").select("*").execute()

        # カテゴリごとにグループ化
        category_map = defaultdict(list)
        for skill_data in response.data:
            skill = Skill.from_dict(skill_data)
            category_map[skill.category].append(skill)

        # SkillCategoryリストに変換
        return [
            SkillCategory(name=category, skills=skills)
            for category, skills in category_map.items()
        ]

    def get_category_names(self) -> List[str]:
        """全カテゴリ名を取得"""
        response = self.supabase.table("skills").select("category").execute()

        # 重複を削除してユニークなカテゴリリストを作成
        categories = set(item["category"] for item in response.data)
        return list(categories)

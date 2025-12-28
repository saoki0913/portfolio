"""Domain Exceptions - ビジネスロジック例外"""


class DomainException(Exception):
    """ドメイン層の基底例外クラス"""
    pass


class ResourceNotFoundException(DomainException):
    """リソースが見つからない場合の例外"""
    def __init__(self, resource_type: str, resource_id: str):
        self.resource_type = resource_type
        self.resource_id = resource_id
        super().__init__(f"{resource_type} with id '{resource_id}' not found")


class ValidationException(DomainException):
    """バリデーションエラーの例外"""
    def __init__(self, message: str):
        super().__init__(message)

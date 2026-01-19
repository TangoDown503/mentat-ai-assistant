# app/schemas.py
from pydantic import BaseModel, field_validator
from typing import Optional 

class AskRequest(BaseModel):
    question: Optional[str]

    @field_validator("question")
    @classmethod
    def question_must_not_be_empty(cls, v):
        if v is None or not v.strip():
            raise ValueError("Question cannot be empty")
        return v

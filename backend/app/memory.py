# def extract_long_term_memory(user_input: str) -> str | None:
#     if "i am" in user_input.lower():
#         return user_input
#     return None


# backend/app/memory.py

user_long_term_memory = {}

def update_memory(user_id: str, user_input: str):
    text = user_input.lower()

    memory = user_long_term_memory.get(user_id, {})

    if "sleep" in text:
        memory["sleep_issues"] = True

    if "stress" in text or "anxious" in text:
        memory["stress_level"] = "high"

    if "weight" in text or "diet" in text or "fitness" in text:
        memory["fitness_goal"] = "general fitness"

    user_long_term_memory[user_id] = memory


def get_memory(user_id: str) -> dict:
    return user_long_term_memory.get(user_id, {})

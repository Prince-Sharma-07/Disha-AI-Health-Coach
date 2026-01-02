def extract_long_term_memory(user_input: str) -> str | None:
    if "i am" in user_input.lower():
        return user_input
    return None

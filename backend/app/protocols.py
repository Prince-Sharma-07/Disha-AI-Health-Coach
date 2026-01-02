def match_protocols(user_input: str) -> str | None:
    """
    Rule-based medical protocols.
    These override LLM responses for safety-critical or common cases.
    """

    text = user_input.lower()

    # ======================
    # FEVER
    # ======================
    if any(word in text for word in ["fever", "high temperature", "temperature"]):
        return (
            "It sounds like you may have a fever. Please stay hydrated, get adequate rest, "
            "and monitor your temperature regularly. If the fever lasts more than 2 days, "
            "goes above 102°F (39°C), or is accompanied by severe symptoms like breathing "
            "difficulty or confusion, please consult a doctor."
        )

    # ======================
    # COMMON COLD
    # ======================
    if any(word in text for word in ["cold", "runny nose", "sneezing", "nasal congestion"]):
        return (
            "For common cold symptoms, make sure to rest well, drink warm fluids, "
            "and stay hydrated. Steam inhalation and warm saltwater gargles may help. "
            "Most colds resolve on their own within a few days. If symptoms worsen or "
            "persist beyond a week, consider consulting a doctor."
        )

    # ======================
    # COUGH
    # ======================
    if "cough" in text:
        return (
            "A mild cough can often be managed with warm fluids, honey (if suitable), "
            "and adequate rest. Avoid cold drinks and smoking. If the cough lasts more "
            "than 2 weeks, produces blood, or is associated with chest pain or shortness "
            "of breath, please seek medical advice."
        )

    # ======================
    # SORE THROAT
    # ======================
    if any(word in text for word in ["sore throat", "throat pain", "throat infection",]):
        return (
            "For a sore throat, try warm saltwater gargles, stay hydrated, and rest your voice. "
            "Warm fluids may provide relief. If you experience high fever, difficulty swallowing, "
            "or symptoms lasting more than a few days, consult a healthcare professional."
        )

    # ======================
    # HEADACHE
    # ======================
    if "headache" in text or "head pain" in text:
        return (
            "Headaches are often caused by stress, dehydration, or lack of sleep. "
            "Try resting in a quiet, dark room and drink enough water. "
            "If headaches are severe, persistent, or accompanied by vision problems, "
            "vomiting, or fever, please consult a doctor."
        )

    # ======================
    # STOMACH PAIN / DIGESTIVE ISSUES
    # ======================
    if any(word in text for word in ["stomach pain", "abdominal pain", "diarrhea", "loose motion"]):
        return (
            "For stomach discomfort or diarrhea, drink plenty of fluids and consider oral "
            "rehydration solutions (ORS). Eat light foods and avoid spicy or oily meals. "
            "If symptoms persist, worsen, or you notice blood in stools, seek medical care."
        )

    # ======================
    # VOMITING / NAUSEA
    # ======================
    if any(word in text for word in ["vomiting", "nausea", "throwing up"]):
        return (
            "If you are experiencing nausea or vomiting, try taking small sips of water or ORS "
            "and rest. Avoid heavy meals until symptoms improve. If vomiting is persistent, "
            "severe, or accompanied by dehydration or abdominal pain, consult a doctor."
        )

    # ======================
    # BODY ACHE / FATIGUE
    # ======================
    if any(word in text for word in ["body ache", "fatigue", "tired", "weakness"]):
        return (
            "Body aches and fatigue can occur due to viral infections, stress, or lack of rest. "
            "Ensure proper sleep, hydration, and light meals. If fatigue is severe, long-lasting, "
            "or affecting daily activities, it’s best to consult a healthcare provider."
        )

    # ======================
    # NO PROTOCOL MATCH
    # ======================
    return None

import bcrypt

users = {}  # simple dict as database substitute

def add_user(email, password):
    if email in users:
        return False
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users[email] = hashed_pw
    return True

def verify_user(email, password):
    if email not in users:
        return False
    return bcrypt.checkpw(password.encode("utf-8"), users[email])

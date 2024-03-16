class Config:
    with open('.credentials', 'r') as f:
        CLIENT_ID = f.readline().strip()
        CLIENT_SECRET = f.readline().strip()
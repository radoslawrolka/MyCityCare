class Config:
    with open('./backend/.credentials', 'r') as f:
        HOST = f.readline().strip()
        USER = f.readline().strip()
        PASSWORD = f.readline().strip()
        DATABASE = f.readline().strip()

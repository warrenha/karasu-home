# Karasu Home
A homepage for Karasu Ltd.

This front end project is build using vite, typescript, react and tailwindccs.

Changes to the github repo are auto uploaded to Cloudflare Pages.

### Running (Dev)
To build and run the development server:
```
pnpm run dev
```

Then in a browser (the url shown by vite):
```
http://localhost:5173/
```

### Building (Prod)
```
pnpm run build --base=/karasu/
```
This adds the base 'karasu' to urls, so assets can be found using an absolute path.

```
http://my-server.local/karasu
```

### Git & GitHub
This project was initialized as follows.

```
# Initialize the .git directory locally
cd karasu-home
git init -b main
git add .
git commit -m "Initial"

# Using multiple ssh keys & emails in ~/.ssh/config
ssh -T git@github.com
ssh -T git@github-wh.com

git config --list
git config --global user.name
git config --global user.email
git config --global user.email "my.user.name@gmail.com"

# Using 'github-wh.com' as defined in ~/.ssh/config
git remote add origin git@github-wh.com:warrenha/karasu-home.git
git remote -v
git push -u origin main
```

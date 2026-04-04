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

### Testing (Integration)
Tests are written using Vitest & React Testing Library.

To run the unit & integration tests:
```
pnpm test
```

### Testing (End-to-End)

Installed with:
```
%% pnpm create playwright
✔ Where to put your end-to-end tests? · test/playwright
✔ Add a GitHub Actions workflow? (Y/n) · true
✔ Install Playwright browsers (can be done manually via 'pnpm exec playwright install')? (Y/n) · true

Inside that directory, you can run several commands:

  pnpm exec playwright test
    Runs the end-to-end tests.

  pnpm exec playwright test --ui
    Starts the interactive UI mode.

  pnpm exec playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  pnpm exec playwright test example
    Runs the tests in a specific file.

  pnpm exec playwright test --debug
    Runs the tests in debug mode.

  pnpm exec playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    pnpm exec playwright test

And check out the following files:
  - ./test/playwright/example.spec.ts - Example end-to-end test
  - ./playwright.config.ts - Playwright Test configuration
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

Delete me v0.1
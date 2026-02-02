# Deploy Nabi-ken to GitHub

**Repo:** https://github.com/agvylegzhanin-r2d2/naviken  
**Live site (after enabling Pages):** https://agvylegzhanin-r2d2.github.io/naviken/

---

## Option A: Run the deploy script (easiest)

1. **Install Git** if you haven’t: https://git-scm.com/download/win (use default options, then restart the terminal).
2. Open **Command Prompt** or **PowerShell** in the project folder (`c:\Users\agvyl\srch`).
3. Run:
   - **Command Prompt:** `deploy-to-github.bat`
   - **PowerShell:** `.\deploy-to-github.ps1`
4. When asked for a commit message, press Enter or type one, then press Enter.
5. If Git asks to sign in, use your GitHub username and a **Personal Access Token** (not your password).  
   Create a token: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Generate new token** → enable **repo** → copy the token and paste it when Git asks for a password.

---

## Option B: Run commands manually

In a terminal in `c:\Users\agvyl\srch`:

```bash
git init
git add .
git commit -m "Initial commit: Nabi-ken website"
git branch -M main
git remote add origin https://github.com/agvylegzhanin-r2d2/naviken.git
git push -u origin main
```

Use your GitHub username and a **Personal Access Token** when Git asks for a password.

---

## Enable GitHub Pages (do this once on GitHub)

1. Open https://github.com/agvylegzhanin-r2d2/naviken
2. **Settings** → **Pages**
3. **Source:** Deploy from a branch  
4. **Branch:** `main` → **Folder:** `/ (root)`  
5. **Save**

After 1–2 minutes the site will be at: **https://agvylegzhanin-r2d2.github.io/naviken/**

---

## Update the site later

```bash
git add .
git commit -m "Describe your changes"
git push
```

GitHub Pages will redeploy automatically.

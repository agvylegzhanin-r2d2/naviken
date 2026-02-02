# Connect Namecheap Domain to GitHub Pages (naviken)

Your site is hosted at **https://agvylegzhanin-r2d2.github.io/naviken/**.  
To use your Namecheap domain (e.g. `naviken.com` or `www.naviken.com`), follow these steps.

---

## Part 1: Set up the domain in GitHub

1. Open your repo: **https://github.com/agvylegzhanin-r2d2/naviken**
2. Go to **Settings** → **Pages**
3. Under **Custom domain**, type your domain:
   - **Apex (root):** `yourdomain.com`  
   - **Or subdomain:** `www.yourdomain.com`
4. Click **Save**
5. Wait for DNS check. If you see “DNS check is still in progress”, finish Part 2 first, then it will turn green.

**Optional:** Check **Enforce HTTPS** after the domain works (GitHub will get a certificate for you).

---

## Part 2: Point your domain at GitHub (Namecheap DNS)

Log in to **Namecheap** → **Domain List** → click **Manage** next to your domain.

### Option A: Use a subdomain (e.g. `www.yourdomain.com`) — recommended

1. Go to **Advanced DNS**
2. Add or edit a **CNAME Record**:
   - **Type:** CNAME  
   - **Host:** `www`  
   - **Value:** `agvylegzhanin-r2d2.github.io`  
   - **TTL:** Automatic (or 300)
3. **Remove** any other CNAME for `www` if it conflicts.
4. Save.

Your site will be at **https://www.yourdomain.com** (after DNS propagates and you enabled the custom domain in GitHub).

---

### Option B: Use apex/root domain (e.g. `yourdomain.com`)

1. Go to **Advanced DNS**
2. Add these **A Records** (replace any existing A records for `@`):

   | Type | Host | Value           | TTL      |
   |------|------|-----------------|----------|
   | A    | @    | 185.199.108.153 | Automatic|
   | A    | @    | 185.199.109.153 | Automatic|
   | A    | @    | 185.199.110.153 | Automatic|
   | A    | @    | 185.199.111.153 | Automatic|

3. Add a **CNAME** for `www` (so `www` redirects to GitHub):

   | Type | Host | Value                     | TTL      |
   |------|------|---------------------------|----------|
   | CNAME| www  | agvylegzhanin-r2d2.github.io | Automatic|

4. Save.

In GitHub **Settings → Pages → Custom domain**, use **yourdomain.com** (no `www`).

---

## Part 3: Redirect apex to www (optional, on Namecheap)

If you use **Option B** and want `yourdomain.com` to redirect to `www.yourdomain.com`:

1. In Namecheap **Advanced DNS**, find **URL Redirect**
2. Add redirect: **yourdomain.com** → **https://www.yourdomain.com** (Permanent 301).

---

## Summary

| Goal                         | GitHub custom domain | Namecheap DNS |
|-----------------------------|----------------------|----------------|
| Use `www.yourdomain.com`     | `www.yourdomain.com` | CNAME `www` → `agvylegzhanin-r2d2.github.io` |
| Use `yourdomain.com` (root) | `yourdomain.com`     | A records for `@` → GitHub IPs (see table above) |

---

## Step 3: After you saved the DNS settings (what to do next)

**What “DNS update” means:** You already changed the records in Namecheap (Step 2). Now the internet needs a bit of time to use those new settings. That waiting time is “DNS propagation.”

**What you do:**

1. **Wait**  
   - Usually 15–30 minutes. Sometimes up to a few hours.  
   - You don’t need to do anything during this time.

2. **Check GitHub**  
   - Go to your repo → **Settings** → **Pages**.  
   - You’ll see a box for “Custom domain.”  
   - At first it may say something like “DNS check is still in progress” or show a warning.  
   - When everything is OK, you’ll see a green checkmark like “DNS check successful.”

3. **Turn on HTTPS (optional but recommended)**  
   - On the same **Pages** settings page, when the DNS check is green, you’ll see an option **“Enforce HTTPS.”**  
   - Check that box and save.  
   - Then your site will load with **https://** (secure padlock).

4. **Open your site**  
   - In your browser go to **https://www.yourdomain.com** (or **https://yourdomain.com** if you use the root domain).  
   - You should see your Nabi-ken site.  
   - If you see “site can’t be reached” or a blank page, wait a bit longer and try again; DNS might not be updated yet.

**In short:** After saving DNS in Namecheap, you wait, then when GitHub shows the green check, turn on “Enforce HTTPS” and visit your domain to confirm it works.

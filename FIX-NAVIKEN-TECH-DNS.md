# Fix "naviken.tech is improperly configured" (NotServedByPagesError)

This error means **naviken.tech** is set as your custom domain in GitHub Pages, but the domain’s DNS is **not pointing to GitHub’s servers**. You need to add the correct DNS records where you manage the domain (Namecheap, GoDaddy, Cloudflare, etc.).

---

## Step 1: Choose how you want the site to open

- **Option A:** Site opens at **www.naviken.tech** (recommended, simpler DNS)
- **Option B:** Site opens at **naviken.tech** (no www)

---

## Step 2: Add DNS records at your domain registrar

Log in where you manage **naviken.tech** (e.g. Namecheap → Domain List → **Manage** next to naviken.tech), then open **DNS** / **Advanced DNS** / **Manage DNS**.

### Option A – Use www.naviken.tech (recommended)

Add **one CNAME record**:

| Type  | Host | Value / Target / Points to        |
|-------|------|------------------------------------|
| CNAME | www  | **agvylegzhanin-r2d2.github.io**   |

- **Host:** `www` (or `www.naviken.tech` if the field asks for full name)
- **Value:** exactly `agvylegzhanin-r2d2.github.io` (no `https://`, no path)
- **TTL:** Automatic or 300

Remove any other CNAME for `www` if it exists. Save.

---

### Option B – Use naviken.tech (no www, apex domain)

Add **four A records** (one per IP):

| Type | Host | Value / IP        |
|------|------|-------------------|
| A    | @    | 185.199.108.153   |
| A    | @    | 185.199.109.153   |
| A    | @    | 185.199.110.153   |
| A    | @    | 185.199.111.153   |

- **Host:** `@` (means “naviken.tech”)
- Remove any old A records for `@` that point somewhere else.

Optionally add a CNAME for www so **www.naviken.tech** also works:

| Type  | Host | Value / Target                 |
|-------|------|---------------------------------|
| CNAME | www  | agvylegzhanin-r2d2.github.io   |

Save.

---

## Step 3: Set the custom domain in GitHub

1. Open: **https://github.com/agvylegzhanin-r2d2/naviken**
2. Go to **Settings** → **Pages**
3. Under **Custom domain**:
   - If you did **Option A:** enter **www.naviken.tech** and Save
   - If you did **Option B:** enter **naviken.tech** and Save
4. Wait 1–2 minutes. If it still shows an error, wait for DNS (up to 24–48 hours, often 15–30 minutes).
5. When the domain shows as verified (green checkmark), check **Enforce HTTPS** and Save.

---

## Step 4: Wait for DNS to propagate

- **NotServedByPagesError** will disappear once DNS points to GitHub.
- Propagation can take from a few minutes up to 24–48 hours.
- You can check resolution:
  - For **www:** `nslookup www.naviken.tech` → should eventually show GitHub-related IPs or `agvylegzhanin-r2d2.github.io`.
  - For **apex (naviken.tech):** `nslookup naviken.tech` → should show the four GitHub IPs above.

---

## Checklist

- [ ] DNS record(s) added at the registrar (CNAME for www **or** four A records for apex)
- [ ] **Value** is exactly **agvylegzhanin-r2d2.github.io** for CNAME (no typo, no `https://`)
- [ ] **Custom domain** in GitHub Pages matches what you set in DNS (www.naviken.tech **or** naviken.tech)
- [ ] Waited at least 5–15 minutes (or up to 48 hours) for DNS propagation
- [ ] After it turns green, enabled **Enforce HTTPS**

Once DNS is correct and propagated, the "naviken.tech is improperly configured" / NotServedByPagesError will go away and GitHub will serve your site at naviken.tech (or www.naviken.tech).

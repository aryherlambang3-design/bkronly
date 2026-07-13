# 🚀 Panduan Deploy ke Vercel

## Langkah 1: Push ke GitHub

### A. Setup Git dan Add Files
Jalankan command berikut di terminal (Command Prompt atau Git Bash):

```bash
# Inisialisasi git (jika belum)
git init

# Add semua files
git add .

# Commit dengan message
git commit -m "Initial commit - Wildlife Portfolio with editable stats"

# Rename branch ke main
git branch -M main

# Add remote repository
git remote add origin https://github.com/aryherlambang3-design/bkronly.git

# Push ke GitHub
git push -u origin main
```

Jika repository sudah ada di GitHub dan mau overwrite:
```bash
git push -f origin main
```

---

## Langkah 2: Deploy ke Vercel

### A. Import Project
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **"Add New Project"** atau **"Import Project"**
4. Pilih repository: `onlybkr-dev/portofolio`
5. Klik **"Import"**

### B. Configure Project
Vercel akan auto-detect Next.js settings. **JANGAN klik Deploy dulu!**

### C. Add Environment Variables ⚠️ WAJIB - HARUS DILAKUKAN!

**DATABASE_URL harus di-set sebelum deploy, jika tidak build akan gagal!**

1. Di halaman import, scroll ke **"Environment Variables"**
2. Tambahkan variable:
   - **Name**: `DATABASE_URL`
   - **Value**: 
     ```
     postgresql://neondb_owner:npg_OsUxW5ReXHQ1@ep-holy-hat-ao6p5pvi.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
     ```
   - **Environment**: Pilih semua (Production, Preview, Development)
3. Klik **"Add"**

⚠️ **PENTING**: Jangan skip step ini! Tanpa DATABASE_URL, build akan gagal dengan error "DATABASE_URL is required".

### D. Deploy
Klik **"Deploy"** button

Tunggu 2-3 menit sampai build selesai.

---

## Langkah 3: Verifikasi Deployment

### A. Check Website
1. Setelah deploy selesai, klik link yang diberikan Vercel
2. Example: `https://portofolio-xxx.vercel.app`
3. Homepage seharusnya langsung muncul dengan data default

### B. Check Dashboard
1. Akses: `https://portofolio-xxx.vercel.app/dashboard`
2. Seharusnya bisa edit profile dan portfolio

### C. Test Functionality
- ✅ Dark/Light mode toggle works
- ✅ Hero stats display correctly
- ✅ Portfolio gallery loads
- ✅ Dashboard can save changes

---

## Troubleshooting

### ❌ Error: "DATABASE_URL is required"

**Cause**: Environment variable tidak di-set di Vercel **SEBELUM** deploy pertama kali

**Solution**:
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add `DATABASE_URL` dengan value dari `.env.local`:
   ```
   postgresql://neondb_owner:npg_OsUxW5ReXHQ1@ep-holy-hat-ao6p5pvi.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
5. Environment: Pilih **Production, Preview, Development** (semua)
6. Klik **Save**
7. Go to **Deployments** → Click latest failed deployment → Click **"..."** → **"Redeploy"**

### ❌ Error: "e.db.insert is not a function"

**Cause**: DATABASE_URL tidak ada saat build, menyebabkan db object invalid

**Solution**: Sama seperti di atas - pastikan DATABASE_URL di-set di Vercel Environment Variables, lalu redeploy.

### ❌ Error: "Build failed"

**Cause**: Ada TypeScript atau syntax error

**Solution**:
1. Check Vercel build logs
2. Fix error di local
3. Commit dan push lagi
4. Vercel akan auto-redeploy

### ❌ Database Connection Failed

**Cause**: 
- DATABASE_URL salah
- Neon database suspended (free tier sleep after 7 days inactive)

**Solution**:
1. Check Neon dashboard apakah database active
2. Verify DATABASE_URL string benar
3. Test connection: buka `/api/health` seharusnya return `{"ok":true}`

### ❌ Images Not Loading

**Cause**: Using Instagram CDN URLs (blocked)

**Solution**:
- Upload images ke ImgBB.com atau Imgur.com
- Get direct link
- Update di Dashboard
- See `PANDUAN-URL-GAMBAR.md`

---

## Update Code (After First Deploy)

Setiap kali ada perubahan code:

```bash
# 1. Save dan test local
npm run dev

# 2. Add changes
git add .

# 3. Commit
git commit -m "Update hero stats feature"

# 4. Push to GitHub
git push origin main
```

Vercel akan **auto-deploy** setiap kali ada push ke main branch! 🎉

---

## Menggunakan Custom Domain (Optional)

### A. Buy Domain
Beli domain di:
- Niagahoster (Indonesia)
- Namecheap
- GoDaddy
- dll

### B. Add Domain di Vercel
1. Go to project Settings → **Domains**
2. Add your domain (e.g., `fikrimuhammad.com`)
3. Vercel akan kasih DNS records yang harus di-add
4. Copy DNS records

### C. Update DNS di Domain Provider
1. Login ke domain provider (e.g., Niagahoster)
2. Go to DNS Management
3. Add DNS records dari Vercel:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel IP)
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
4. Save

Wait 24-48 jam untuk DNS propagation.

---

## Environment Variables List

Variables yang perlu di-set di Vercel:

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | `postgresql://...` | ✅ Yes |

**How to add**:
1. Vercel Dashboard → Project → Settings
2. Environment Variables
3. Add variable
4. Select environments: Production, Preview, Development
5. Save

---

## Quick Reference Commands

```bash
# Check git status
git status

# Add all changes
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push origin main

# Force push (if needed)
git push -f origin main

# Pull latest
git pull origin main
```

---

## Support

**Build Errors?**
- Check Vercel deployment logs
- Look for red error messages
- Google the error or ask ChatGPT

**Database Errors?**
- Verify DATABASE_URL in Vercel settings
- Check Neon dashboard (database active?)
- Test `/api/health` endpoint

**Need Help?**
Contact: fikrimuh.barlian@gmail.com

---

## Status Checklist

After deploy, verify:

- [ ] Website accessible at Vercel URL
- [ ] Homepage loads with correct data
- [ ] Dark/Light mode toggle works
- [ ] Hero stats display correctly (10+ Years, 8K Cinema, etc)
- [ ] Portfolio gallery shows items
- [ ] Dashboard accessible at `/dashboard`
- [ ] Can edit and save profile in dashboard
- [ ] Can add/edit portfolio items
- [ ] Hero stats editable in dashboard
- [ ] Images load correctly
- [ ] `/api/health` returns `{"ok":true}`

---

**Selamat! 🎉 Portfolio sudah live di internet!**

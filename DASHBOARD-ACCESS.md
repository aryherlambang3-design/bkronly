# 🔐 Dashboard Access Guide

Dashboard link sudah dihilangkan dari public footer untuk keamanan.

## 🔗 How to Access Dashboard

### Method 1: Direct URL
Ketik langsung di browser:
```
https://your-domain.vercel.app/dashboard
```

Example (local):
```
http://localhost:3000/dashboard
```

Example (production):
```
https://bkronly.vercel.app/dashboard
```

### Method 2: Bookmark
1. Akses dashboard URL sekali
2. Bookmark halaman tersebut (Ctrl+D atau Cmd+D)
3. Gunakan bookmark untuk akses selanjutnya

### Method 3: Password Manager
Simpan dashboard URL di password manager favorit (1Password, LastPass, Bitwarden, dll)

---

## 🔒 Security Recommendations

### 1. Add Authentication (Recommended)
Dashboard saat ini **tidak memiliki password protection**. Siapapun yang tahu URL bisa mengakses.

**Quick Fix Options:**

#### Option A: Vercel Password Protection (Easiest)
1. Go to Vercel Dashboard → Your Project → Settings
2. Go to **"Deployment Protection"**
3. Enable **"Password Protection"**
4. Set password
5. Save

Vercel akan meminta password setiap kali akses website (including dashboard).

#### Option B: Environment Variable Check (Medium)
Add simple password check di dashboard:

```typescript
// src/app/dashboard/page.tsx
export default async function DashboardPage() {
  // Simple password check (put in environment variable)
  const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;
  
  // Show password prompt if not authenticated
  // (implement session or cookie check)
  
  // ... rest of code
}
```

#### Option C: Next-Auth (Advanced)
Implement proper authentication dengan NextAuth.js:
- Google OAuth
- GitHub OAuth
- Email/Password
- etc

### 2. Restrict by IP (Advanced)
Di Vercel Pro plan, bisa restrict akses dashboard hanya dari IP tertentu.

### 3. Hide Dashboard Route
Ganti `/dashboard` ke route yang lebih obscure:
- `/admin-cms-2024`
- `/manage-content-xyz`
- `/control-panel-abc`

Edit di folder structure:
```
src/app/dashboard/ → src/app/your-secret-route/
```

---

## 📋 Dashboard Features

Dari dashboard, Anda bisa edit:

### Biography & Socials Tab:
- ✅ Filmmaker Name & Professional Title
- ✅ Short Summary & Full Biography
- ✅ Profile Picture URL
- ✅ Hero Background Image URL
- ✅ Instagram & YouTube URLs
- ✅ Contact Email
- ✅ Field Location
- ✅ Production Gear Setup (line by line)
- ✅ YouTube Video Views Counter
- ✅ Hero Stats Cards (4 stats dengan value & label)

### Portfolio Tab:
- ✅ Add new portfolio items
- ✅ Edit existing items
- ✅ Delete items
- ✅ Upload Photo Image URL
- ✅ Add YouTube Video URL (optional)
- ✅ Set Category (Rainforest, Islands, Ocean, Savannah, Behind the Scenes)
- ✅ Set Location Shot
- ✅ Set Display Order (manual sorting)
- ✅ Mark as Featured

---

## 🚨 If Dashboard Link is Exposed

Jika URL dashboard terbuka ke publik dan Anda khawatir:

1. **Quick Fix**: Enable Vercel Password Protection
2. **Medium Fix**: Add authentication layer
3. **Long Fix**: Implement full auth system (NextAuth, Clerk, Auth0)

---

## 📝 Admin Credentials Reference

**Dashboard URL**: `https://your-domain.vercel.app/dashboard`

**Protection**: ⚠️ Currently NONE (anyone with URL can access)

**Recommendation**: Enable Vercel Password Protection or add authentication

---

## 🔗 Useful Links

- **Homepage**: `/`
- **Dashboard**: `/dashboard`
- **API Health Check**: `/api/health`
- **Portfolio Section**: `/#portfolio`
- **Contact Section**: `/#contact`
- **About Section**: `/#about`
- **Gear Section**: `/#gear`

---

## 📞 Support

Jika lupa dashboard URL atau butuh bantuan akses:
- Check bookmark browser
- Check deployment URL di Vercel dashboard
- Contact: fikrimuh.barlian@gmail.com

---

**⚠️ Important**: Jangan share dashboard URL di public! Simpan di tempat aman.

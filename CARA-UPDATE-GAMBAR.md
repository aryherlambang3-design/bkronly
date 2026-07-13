# 📸 Cara Update Gambar & Konten

## ✅ Cara Mudah: Gunakan Dashboard CMS

### 1. Buka Dashboard
- Klik tombol **"Manage CMS Dashboard"** di header website
- Atau langsung ke: `http://localhost:3000/dashboard`

### 2. Update Gambar Profile
1. Klik tab **"Biography & Socials Settings"**
2. Scroll ke sidebar kanan
3. Di bagian **"Profile Picture URL"**:
   - Paste URL gambar baru
   - Lihat preview langsung di bawahnya
4. Klik tombol **"Save Bio & Settings"** di atas

### 3. Update Hero Background
1. Masih di tab "Biography & Socials Settings"
2. Di bagian **"Hero Wide Background URL"**:
   - Paste URL gambar baru
   - Preview akan muncul otomatis
3. Klik **"Save Bio & Settings"**

### 4. Update Portfolio Items
1. Klik tab **"Portfolio Photo & Video Items"**
2. Untuk item baru: Isi form di kiri
3. Untuk edit item lama: Klik tombol **Edit** di card portfolio
4. Paste URL gambar/video
5. Klik **"Save Entry"**

## 🔄 Setelah Save

### Jika Perubahan Belum Muncul:

**Cara 1: Hard Refresh Browser**
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Cara 2: Clear Cache & Reload**
1. Buka DevTools (F12)
2. Klik kanan tombol refresh
3. Pilih "Empty Cache and Hard Reload"

**Cara 3: Restart Dev Server**
```powershell
# Stop server: Ctrl + C
# Start ulang:
npm run dev
```

## 📝 Tips Mendapatkan URL Gambar

### Dari Instagram:
1. Buka foto di browser (bukan app)
2. Klik kanan pada gambar
3. Pilih "Open Image in New Tab"
4. Copy URL dari address bar

### Dari Pexels/Unsplash:
1. Klik tombol "Download"
2. Klik kanan "Copy Image Address"
3. Paste di Dashboard

### Upload ke Image Hosting (Recommended):
- **ImgBB**: https://imgbb.com (gratis, unlimited)
- **Imgur**: https://imgur.com
- **Cloudinary**: https://cloudinary.com

## ⚡ Shortcut: Update via Script

Jika Dashboard lambat, bisa pakai script:

```powershell
# Edit file update-image-quick.js
# Ganti NEW_IMAGE_URL dengan URL baru
# Jalankan:
node update-image-quick.js
```

## 🎯 Troubleshooting

### Gambar Tidak Muncul
- ✅ Pastikan URL dimulai dengan `https://`
- ✅ Buka URL di browser baru, pastikan gambar bisa diakses
- ✅ Jangan gunakan URL dari private account

### Perubahan Tidak Tersimpan
- ✅ Cek ada notifikasi hijau "Success" setelah save
- ✅ Jika error merah, baca pesan errornya
- ✅ Restart dev server jika perlu

### Preview Gambar Tidak Update
- Preview di Dashboard update otomatis
- Preview di website butuh refresh browser

---

**💡 Pro Tip**: Gunakan Hard Refresh (`Ctrl+Shift+R`) setelah save di Dashboard untuk langsung melihat perubahan!

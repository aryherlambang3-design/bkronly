# TikTok & LinkedIn - Profile Card Update

## Ringkasan Perubahan

**PENTING**: Perubahan ini **HANYA** mempengaruhi bagian **Profile Card** di halaman homepage. Instagram dan YouTube tetap dipertahankan di semua bagian lain!

## Yang Diubah

### 1. Profile Card (Bagian Biography)
Di bagian profile card yang menampilkan foto profil Fikri Muhammad, sekarang menampilkan:
- ✅ **TikTok** button → mengarah ke https://www.tiktok.com/@fikrimuhammd_
- ✅ **LinkedIn** button → mengarah ke https://www.linkedin.com/in/fikri-m-310b25140/

**Sebelumnya**: Instagram & YouTube
**Sekarang**: TikTok & LinkedIn

## Yang TIDAK Diubah (Tetap Instagram & YouTube)

### 1. Hero Section - Top Buttons
- ✅ YouTube Channel button (merah) - TETAP
- ✅ Instagram button (abu-abu) - TETAP

### 2. CTA Section
- ✅ "Watch His Wildlife Documentaries" section - TETAP
- ✅ "Subscribe to Channel" YouTube button - TETAP
- ✅ "Follow on Instagram" button - TETAP

### 3. Footer - Direct Connections
- ✅ Instagram Profile link - TETAP
- ✅ YouTube Channel link - TETAP

### 4. Footer Bottom
- ✅ @fikri.muhammd_ Instagram - TETAP
- ✅ @fikriiimuhammad YouTube - TETAP

## Perubahan Database

### Kolom Baru Ditambahkan:
```sql
tiktok_url TEXT NOT NULL DEFAULT 'https://www.tiktok.com/@fikrimuhammd_'
linkedin_url TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/fikri-m-310b25140/'
```

### Kolom Lama TETAP Ada:
```sql
instagram_url TEXT NOT NULL
youtube_url TEXT NOT NULL
```

## Perubahan File

### 1. Database Schema (`src/db/schema.ts`)
- ✅ Ditambahkan `tiktokUrl` field
- ✅ Ditambahkan `linkedinUrl` field
- ✅ `instagramUrl` dan `youtubeUrl` TETAP ada

### 2. Database Utils (`src/db/utils.ts`)
- ✅ Seed data mengandung semua 4 social links
- ✅ Instagram, YouTube, TikTok, LinkedIn semua tersedia

### 3. Components (`src/components/SocialIcons.tsx`)
- ✅ Ditambahkan `InstagramIcon`
- ✅ Ditambahkan `YoutubeIcon`
- ✅ Ditambahkan `TikTokIcon`
- ✅ Ditambahkan `LinkedInIcon`

### 4. Homepage (`src/app/page.tsx`)
- ✅ Import semua 4 icon
- ✅ Hero buttons menggunakan Instagram & YouTube
- ✅ Profile card menggunakan TikTok & LinkedIn
- ✅ CTA section menggunakan Instagram & YouTube
- ✅ Footer menggunakan Instagram & YouTube

### 5. Dashboard (`src/app/dashboard/DashboardManager.tsx`)
- ✅ Form input untuk Instagram URL
- ✅ Form input untuk YouTube URL
- ✅ Form input untuk TikTok URL
- ✅ Form input untuk LinkedIn URL

### 6. Actions (`src/app/actions.ts`)
- ✅ Menerima dan menyimpan semua 4 social URLs

## Migration Script

File: `add-tiktok-linkedin.js`
- ✅ Menambahkan kolom `tiktok_url`
- ✅ Menambahkan kolom `linkedin_url`
- ✅ Update existing profile dengan URLs

## Cara Edit di Dashboard

1. Buka `/dashboard`
2. Scroll ke "Social Handles & Contact"
3. Sekarang ada 4 input fields:
   - Instagram Profile URL
   - YouTube Channel URL
   - TikTok Profile URL (NEW)
   - LinkedIn Profile URL (NEW)

## Link Social Media

- **Instagram**: https://www.instagram.com/fikri.muhammd_/ (digunakan di hero & CTA)
- **YouTube**: https://youtube.com/@fikriiimuhammad (digunakan di hero & CTA)
- **TikTok**: https://www.tiktok.com/@fikrimuhammd_ (digunakan di profile card saja)
- **LinkedIn**: https://www.linkedin.com/in/fikri-m-310b25140/ (digunakan di profile card saja)

## Status

✅ Database migration complete
✅ Schema updated
✅ All components updated
✅ Dashboard form updated
✅ TypeScript errors resolved
✅ All 4 social platforms available

---
**Date**: 2026-07-14
**Status**: COMPLETE
**Note**: Profile card now shows TikTok & LinkedIn only. All other sections still use Instagram & YouTube.

# Guided Tour / Onboarding Feature

## Overview
Interactive tooltip-based guided tour yang memandu pengunjung website melalui setiap section penting ketika mereka pertama kali klik tombol **"Explore Portfolio"**.

## Fitur

### 🎯 Tour Steps (6 Langkah):
1. **Expeditions Logbook** - Portfolio gallery section
2. **The Storyteller** - Biography Fikri Muhammad
3. **Fikri Muhammad Profile** - Profile card dengan social media
4. **Production Gear** - Equipment list
5. **Watch His Wildlife Documentaries** - CTA section YouTube/Instagram
6. **Get In Touch** - Contact form

### ✨ Interaktivitas:
- ✅ **Auto-scroll** ke setiap section yang dijelaskan
- ✅ **Highlight effect** dengan glow hijau emerald pada elemen aktif
- ✅ **Progress bar** menunjukkan step saat ini
- ✅ **Navigation buttons**: Back, Next, Skip Tour
- ✅ **Dark overlay** dengan blur untuk fokus
- ✅ **Responsive** untuk mobile dan desktop
- ✅ **LocalStorage**: Tour hanya muncul sekali per user

### 🎨 Design:
- Tooltip box dengan border emerald
- Progress bar gradient emerald-teal
- Animasi bounce arrow indicator
- Dark mode support
- Shadow dan blur effects

## Cara Kerja

### 1. **Trigger**:
Ketika user **pertama kali** klik tombol **"Explore Portfolio"** di hero section:
```tsx
<a href="#portfolio">Explore Portfolio ↓</a>
```

### 2. **Flow**:
```
User klik "Explore Portfolio" 
  → Cek localStorage (sudah pernah tour?)
    → Jika BELUM: Start tour dari step 1
    → Jika SUDAH: Scroll ke portfolio section (normal behavior)
  → Tour dimulai dengan tooltip modal
  → Auto-scroll ke setiap section
  → Highlight element dengan glow effect
  → User navigasi: Next / Back / Skip
  → Finish: Save ke localStorage + scroll ke portfolio
```

### 3. **LocalStorage Key**:
```javascript
localStorage.setItem("portfolioTourCompleted", "true");
```

## File yang Dibuat

### 1. `src/components/GuidedTour.tsx`
Client component yang berisi:
- Tour state management (useState)
- Auto-scroll logic
- Highlight effect
- Navigation controls
- LocalStorage persistence

### 2. Updated `src/app/page.tsx`
- Import `GuidedTour` component
- Render `<GuidedTour />` di top level

## Cara Reset Tour (Untuk Testing)

Buka browser console dan jalankan:
```javascript
localStorage.removeItem("portfolioTourCompleted");
```
Lalu refresh page dan klik "Explore Portfolio" lagi.

## Customization

### Mengubah Tour Steps:
Edit array `tourSteps` di `GuidedTour.tsx`:
```typescript
const tourSteps: TourStep[] = [
  {
    id: "expeditions",
    title: "1. Expeditions Logbook",
    description: "Browse through...",
    targetSelector: "#portfolio",
    position: "top",
  },
  // Tambah step baru di sini
];
```

### Mengubah Warna:
- Progress bar: `from-emerald-500 to-teal-500`
- Border tooltip: `border-emerald-500`
- Button Next: `bg-emerald-600`
- Highlight glow: `rgba(16, 185, 129, 0.4)`

### Mengubah Trigger:
Jika ingin tour muncul otomatis saat page load (tanpa klik):
```typescript
useEffect(() => {
  const tourCompleted = localStorage.getItem("portfolioTourCompleted");
  if (!tourCompleted) {
    startTour(); // Langsung start tanpa tunggu klik
  }
}, []);
```

## User Experience

### First Time Visitor:
1. Klik "Explore Portfolio"
2. Tour dimulai dengan tooltip modal
3. Ikuti 6 steps dengan klik "Next"
4. Atau skip dengan "Skip Tour"
5. Selesai → scroll otomatis ke portfolio

### Returning Visitor:
1. Klik "Explore Portfolio"
2. Langsung scroll ke portfolio section (no tour)

## Technical Details

### Dependencies:
- ✅ React hooks: useState, useEffect
- ✅ Lucide icons: X, ChevronRight, ChevronLeft
- ✅ Tailwind CSS
- ✅ LocalStorage API

### Z-index Layers:
- Overlay: `z-[9998]`
- Highlighted element: `z-9997`
- Tooltip modal: `z-[9999]`

### Animations:
- Smooth scroll: `behavior: "smooth"`
- Bounce arrow: `animate-bounce`
- Progress bar transition: `transition-all duration-300`

## Browser Compatibility
✅ Chrome, Firefox, Safari, Edge
✅ Mobile browsers (iOS Safari, Chrome Android)
✅ Dark mode support

## Future Enhancements (Optional)

1. **Multiple Tour Variants**: Tour berbeda untuk first-time vs returning users
2. **Skip to Specific Step**: Jump langsung ke step tertentu
3. **Video/GIF in Tooltip**: Embed video tutorial
4. **Tour Analytics**: Track completion rate
5. **Multi-language**: Support bahasa Indonesia
6. **Auto-play Mode**: Tour berjalan otomatis tanpa klik

---
**Created**: 2026-07-14
**Status**: ✅ COMPLETE & TESTED

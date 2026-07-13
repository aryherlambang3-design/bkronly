# Fikri Muhammad - Wildlife Portfolio Website

Portfolio website for Indonesian Wildlife Documentary Filmmaker with CMS Dashboard.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle
- **Styling**: Tailwind CSS v3
- **Deployment**: Vercel

## 📦 Features

- ✅ Dynamic Biography & Profile Management
- ✅ Portfolio Gallery with Categories
- ✅ Video Integration (YouTube)
- ✅ Dark/Light Mode Toggle
- ✅ Hero Stats Cards (Editable)
- ✅ Manual Portfolio Sorting
- ✅ Admin Dashboard (CMS)
- ✅ Image Upload Support (ImgBB/Imgur)
- ✅ Responsive Design

## 🔧 Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL Database (Neon Cloud recommended)

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/aryherlambang3-design/bkronly.git
   cd bkronly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your database URL:
   ```
   DATABASE_URL=postgresql://username:password@host/database?sslmode=require
   ```

4. **Setup database**
   
   Run the database setup script:
   ```bash
   node setup-db.js
   ```
   
   This will:
   - Create tables (`profile_settings`, `portfolio_items`)
   - Seed initial data
   - Add stats fields

5. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/aryherlambang3-design/bkronly.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure **Environment Variables**:
   
   Add the following variable:
   ```
   Name: DATABASE_URL
   Value: postgresql://neondb_owner:npg_xxx@ep-xxx.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
   
   ⚠️ **Important**: Use your actual Neon database connection string

5. Click **"Deploy"**

### Step 3: Setup Database (First Deploy Only)

After first deployment, you need to initialize the database:

**Option A**: Run via Vercel CLI
```bash
vercel env pull .env.local
node setup-db.js
```

**Option B**: Use Neon SQL Editor
Run the SQL from `init-db.sql` directly in Neon dashboard.

**Option C**: Access `/dashboard` immediately
The app will auto-seed data on first access.

## 📝 Usage

### Admin Dashboard
Access the CMS at: `https://your-domain.vercel.app/dashboard`

**Features**:
- Edit biography & social links
- Manage hero stats cards
- Add/edit/delete portfolio items
- Configure production gear list
- Upload images via ImgBB/Imgur

### Image Upload Guide
- ⛔ Don't use Instagram CDN URLs (blocked)
- ✅ Use [ImgBB.com](https://imgbb.com) (free, recommended)
- ✅ Use [Imgur.com](https://imgur.com)
- See `PANDUAN-URL-GAMBAR.md` for details

### Portfolio Sorting
- Set "Display Order" number in dashboard
- Lower number = appears first
- See `SORT-ORDER-CHANGES.md` for details

## 📂 Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── api/health/       # Health check endpoint
│   │   ├── dashboard/        # Admin CMS
│   │   ├── actions.ts        # Server actions
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/           # React components
│   ├── db/
│   │   ├── index.ts          # Database connection
│   │   ├── schema.ts         # Drizzle schema
│   │   └── utils.ts          # Database utilities
├── .env.example              # Environment template
├── .env.local               # Local environment (not committed)
├── drizzle.config.json      # Drizzle configuration
├── setup-db.js              # Database initialization
└── tailwind.config.ts       # Tailwind configuration
```

## 🐛 Troubleshooting

### Build Error: "DATABASE_URL is required"

**Solution**: Add DATABASE_URL to Vercel Environment Variables
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `DATABASE_URL` with your Neon connection string
3. Redeploy

### Images Not Loading

**Solution**: Use ImgBB or Imgur, not Instagram URLs
- See `PANDUAN-URL-GAMBAR.md`

### TypeScript Errors After Schema Changes

**Solution**: Restart dev server
```bash
# Stop server (Ctrl+C)
npm run dev
```

## 📚 Documentation

- `CARA-UPDATE-GAMBAR.md` - Image upload guide (Bahasa)
- `PANDUAN-URL-GAMBAR.md` - Image URL guide (Bahasa)
- `SORT-ORDER-CHANGES.md` - Portfolio sorting feature
- `DASHBOARD-UPDATES-COMPLETE.md` - Dashboard features
- `HERO-STATS-EDITABLE.md` - Hero stats configuration

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |

Example:
```
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
```

## 📄 License

All rights reserved © 2025 Fikri Muhammad

## 🤝 Support

For issues or questions, contact: fikrimuh.barlian@gmail.com

---

Built with ❤️ for wildlife conservation

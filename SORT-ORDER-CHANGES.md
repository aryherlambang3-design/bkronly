# ✅ Sort Order Feature - Changes Made

## Database Changes
- ✅ Added `sort_order` column to `portfolio_items` table
- ✅ Migration script executed successfully
- ✅ Initial values set based on IDs

## Code Changes Made

### 1. Schema (`src/db/schema.ts`)
- ✅ Added `sortOrder: integer("sort_order").default(0).notNull()`

### 2. Utils (`src/db/utils.ts`)  
- ✅ Added `.orderBy(portfolioItems.sortOrder)` to getPortfolioItems()

### 3. Actions (`src/app/actions.ts`)
- ✅ Added sortOrder parameter handling in savePortfolioItem()

### 4. DashboardManager Interface
- ✅ Added `sortOrder: number` to PortfolioItem interface
- ✅ Added sortOrder to editingItem state (default: 0)
- ✅ Added `formData.append("sortOrder")` in submit handler

## Manual Steps Needed

### Add Sort Order Input Field in Dashboard

Find this section in `DashboardManager.tsx` (around line 340-360):

```tsx
{/* Category & Location */}
<div className="grid grid-cols-2 gap-4">
  <div className="space-y-1.5">
    <label className="font-semibold text-zinc-400 uppercase">Category</label>
    ...
  </div>
  <div className="space-y-1.5">
    <label className="font-semibold text-zinc-400 uppercase">Location Shot</label>
    ...
  </div>
</div>
```

**Change `grid-cols-2` to `grid-cols-3`** and add this field:

```tsx
<div className="space-y-1.5">
  <label className="font-semibold text-zinc-400 uppercase flex items-center gap-1">
    Display Order
    <span className="text-[9px] text-zinc-500 font-normal lowercase">(lower number = first)</span>
  </label>
  <input
    type="number"
    min="0"
    value={editingItem.sortOrder || 0}
    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) || 0 })}
    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    placeholder="0"
  />
</div>
```

### Also Update All Reset Form Calls

Search for all instances of:
```tsx
setEditingItem({
  id: undefined,
  title: "",
  description: "",
  imageUrl: "",
  videoUrl: "",
  category: "Rainforest",
  locationShot: "",
  isFeatured: false,
})
```

Add `sortOrder: 0,` to each one.

### And Update startEditing Function

Find `const startEditing = (item: PortfolioItem)` and make sure it includes:
```tsx
sortOrder: item.sortOrder,
```

## How to Use

1. Open Dashboard
2. Edit atau create portfolio item
3. Set "Display Order" number:
   - 1 = akan muncul pertama
   - 2 = muncul kedua
   - 10 = muncul kesepuluh
   - dst
4. Save
5. Items akan muncul berdasarkan urutan angka (ascending)

## Quick Script untuk Auto-numbering

Jika ingin reset semua order secara berurutan:

```sql
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) as new_order
  FROM portfolio_items
)
UPDATE portfolio_items
SET sort_order = numbered.new_order
FROM numbered
WHERE portfolio_items.id = numbered.id;
```

Jalankan di database atau buat node script.

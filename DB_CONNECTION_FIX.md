# ⚠️ DATABASE CONNECTION STRING ISSUE

## Problem
Prisma migration gagal dengan error "Tenant or user not found" - ini berarti format connection string salah.

## Solusi: Dapatkan Connection String dari Supabase Dashboard

### Langkah-langkah:

1. **Buka Supabase Dashboard**
   - https://supabase.com/dashboard
   - Pilih project: `vjhtsxyytxzzmpcjsbod`

2. **Klik Settings > Database**

3. **Scroll ke "Connection string"**

4. **PILIH TAB "URI" (BUKAN Pooling)**
   - Ini penting! Untuk migrations, pakai URI direct connection

5. **Copy connection string yang ditampilkan**
   - Akan terlihat seperti:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
   
6. **GANTI [YOUR-PASSWORD] dengan password database Anda**
   - Password: `SB24id0c84ZsLt` (sepertinya ini password Anda)

7. **Update `backend/.env` line 4:**
   ```env
   DATABASE_URL="[paste connection string dari dashboard]"
   ```

### Contoh Format yang Benar:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.vjhtsxyytxzzmpcjsbod.supabase.co:5432/postgres"
```

### ⚠️ Catatan Penting:
- **Jangan** gunakan `*.pooler.supabase.com` untuk migrations
- **Gunakan** `db.*.supabase.co:5432` (direct connection)
- Pastikan password-nya benar (tanpa bracket!)

### Setelah Update, Test Lagi:
```bash
cd backend
npx prisma migrate dev --name init
```

---

## Alternatif: Jika Lupa Password

Jika lupa password database:
1. Settings > Database
2. Scroll ke "Database password"
3. Klik "Generate new password"
4. Simpan password baru
5. Update DATABASE_URL dengan password baru

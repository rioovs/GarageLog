# Prisma Migration Troubleshooting

Migration command is hanging. Ini kemungkinan karena:

1. **Pooler port 6543 tidak mendukung migrations** - Prisma migrate membutuhkan DDL commands yang tidak didukung oleh pgbouncer transaction mode
2. **Connection timeout** - Pooler connection mungkin membutuhkan parameter tambahan

## Solusi: Gunakan Direct Connection tanpa Pooler

Untuk **migrations**, gunakan direct connection:

```env
DATABASE_URL="postgresql://postgres:SB24id0c84ZsLt@db.vjhtsxyytxzzmpcjsbod.supabase.co:5432/postgres"
```

Tapi jika direct connection tetap error "Can't reach database", kemungkinan:
- Supabase project di-pause (free tier)
- Password salah
- IP address diblokir

## Alternative: Skip Migrations, Use Prisma DB Push

Untuk development, bisa gunakan `prisma db push` instead of `migrate`:

```bash
npx prisma db push
```

`db push` lebih fleksibel dan tidak membuat migration files, cocok untuk development.

## Atau: Buat Tables Manual di Supabase

1. Buka Supabase Dashboard > Table Editor
2. Buat tables manual sesuai schema
3. Lalu run `prisma db pull` untuk sync schema

Mana yang mau dicoba?

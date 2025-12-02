# ⚠️ PERBAIKI DULU SEBELUM TESTING!

## Masalah di backend/.env:

**Line 9 - SUPABASE_SERVICE_ROLE_KEY SALAH!**

Anda menggunakan **anon key** untuk service role. Ini terlihat dari JWT payload:
```
"role":"anon"  ← ini anon key, bukan service_role!
```

## Cara Benarnya:

1. Buka https://supabase.com/dashboard
2. Pilih project: vjhtsxyytxzzmpcjsbod
3. Settings > API
4. Di "Project API keys", ada **2 keys**:
   
   **anon (public)** - untuk frontend:
   ```
   eyJhbGci...(role:anon)...  ← ini yang sekarang Anda pakai di SERVICE_ROLE_KEY
   ```
   
   **service_role (secret)** - untuk backend:
   ```
   eyJhbGci...(role:service_role)...  ← COPY YANG INI!
   ```

5. Ganti line 9 di `backend/.env` dengan service_role key yang benar

## ✅ Config yang benar:

**backend/.env:**
```env
SUPABASE_SERVICE_ROLE_KEY="eyJhbGci... (yang role:service_role)"
```

**frontend/.env.local:**
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci... (yang role:anon) ✓ sudah benar
```

---

## Setelah diperbaiki, test dengan:

```bash
cd backend
node test-supabase-connection.js
```

Jika berhasil, akan muncul:
```
✓ API connection successful
✓ Auth service working
✓ Database accessible
✅ Connection test completed!
```

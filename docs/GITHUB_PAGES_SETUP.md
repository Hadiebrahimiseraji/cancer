# تنظیم GitHub Pages
# GitHub Pages Setup Guide

## ✅ شروع سریع

پروژه شما آماده است! برای فعال کردن وب‌سایت:

### 1️⃣ رفتن به تنظیمات ریپو

```
GitHub.com → medpromx/cancer → Settings
```

### 2️⃣ GitHub Pages فعال کنید

```
Settings → Pages (در سمت چپ)

Source:
├─ Deploy from a branch
└─ Branch: main / (root)
   └─ Save

⏳ منتظر 1-2 دقیقه باشید
```

### 3️⃣ لینک وب‌سایت

```
https://medpromx.github.io/cancer
```

---

## 🔍 بررسی وضعیت

### راه 1: Through Settings
```
Settings → Pages → "Your site is live at..."
```

### راه 2: Direct URL
```
https://medpromx.github.io/cancer
```

---

## 🔧 نحوه کار

### خودکار (GitHub Actions)
```
commit → push → GitHub Actions runs → Deploy
```

فایل تنظیمات:
```
.github/workflows/deploy.yml
```

### دستی (اگر نیاز باشد)
```
Settings → Pages → Manual Deploy
```

---

## 📁 ساختار فایل‌ها

```
medpromx/cancer/
├── index.html          ← صفحه اصلی
├── config.js           ← تنظیمات
├── app.js              ← منطق
├── data/patients.csv   ← داده‌ها
├── README.md           ← مستندات
└── .github/workflows/  ← GitHub Actions
```

---

## ✨ فاز‌های Deployment

### 1. Initial Push
```
✓ Commit & Push
✓ GitHub Actions شروع می‌شود
⏳ 1-2 دقیقه برای build
✓ سایت آنلاین می‌شود
```

### 2. Updates
```
✓ هر commit خودکار deploy می‌شود
✓ داده‌ها (CSV) روزرسانی می‌شود
✓ لایو شدن: تا 2 دقیقه
```

### 3. Rollback
```
اگر مشکلی داشت:
git revert <commit_hash>
git push
```

---

## 🐛 حل مشکلات

### مشکل: 404 Error
**دلیل**: صفحه بروز نشده  
**حل**:
```
1. Hard Refresh: Ctrl+Shift+R
2. منتظر باشید 2-3 دقیقه
3. GitHub Actions رو بررسی کنید
```

### مشکل: CSS/JS نمایش نمی‌شود
**دلیل**: Cache یا مسیر اشتباه  
**حل**:
```
1. صفحه refresh کنید
2. Browser console بررسی کنید (F12)
3. Developers Tools → Network tab
```

### مشکل: GitHub API کار نمی‌کند
**دلیل**: Token مشکل دارد  
**حل**:
```
1. Token جدید درست کنید
2. Token validity 30 روز بررسی کنید
3. repo scope عم دسترسی فعال باشد
```

---

## 🧪 تست کردن

### Local Testing
```bash
# ساده ترین روش:
python -m http.server 8000
# یا
npx live-server
```

سپس:
```
http://localhost:8000
```

### GitHub Pages Testing
```
https://medpromx.github.io/cancer
```

---

## 📊 Monitoring

### GitHub Actions
```
Actions → Workflow Runs
```

دنبال کنید:
- ✓ Commit ID
- ⏱️ زمان deployment
- ❌ خطاها (اگر وجود داشته باشند)

### Pages Status
```
Settings → Pages → Status
```

---

## 📚 مراجع

- GitHub Pages: https://pages.github.com/
- GitHub Actions: https://github.com/features/actions
- Static Sites: https://docs.github.com/pages

---

## ⚡ Quick Commands

```bash
# مشاهده وضعیت
git status

# آخرین commits
git log --oneline

# نام دامنه GitHub Pages
git remote get-url origin

# Deploy دستی (نادر)
git push origin main:gh-pages
```

---

**تمام شد!** 🎉  
سایت شما اماده برای استفاده است.

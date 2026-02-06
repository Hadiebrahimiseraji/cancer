# نظام پرسشنامه سرطان و حفظ باروری
# Cancer Patient Questionnaire System

سیستم جامع ثبت اطلاعات بیماران مراکز درمانی شمال ایران

## 🚀 شروع سریع

### 1. GitHub Token ست کنید
```
1. https://github.com/settings/tokens → New Token
2. Scope: repo ✓
3. Copy Token
4. سایت: Ctrl+G → Token Paste
```

### 2. فرم را پر کنید
- اطلاعات بیمار را وارد کنید
- **Ctrl+Enter** برای ذخیره
- داده‌ها خودکار ذخیره می‌شود

### 3. داده‌ها دانلود کنید
```
دکمه "دانلود CSV" برای صادرات
```

## 📋 ساختار پروژه

```
cancer/
├── index.html            # فرم اصلی ویب
├── config.js             # تنظیمات و داده‌های ثابت
├── app.js                # GitHub API و State Management
├── data/patients.csv     # پایگاه داده
├── package.json
├── README.md
└── .github/workflows/
```

## 🔧 تنظیمات GitHub

### Personal Access Token
1. **Creating**: https://github.com/settings/tokens/new
2. **Scope**: ✓ repo (full control)
3. **Copy**: Token رو کپی کنید
4. **Add to Site**: Ctrl+G → چسبانید

## ⚙️ معماری

### Data Flow
```
Form Input
    ↓
JavaScript (app.js)
    ↓
State Manager (localStorage)
    ↓
GitHub Manager (REST API)
    ↓
GitHub Repository (/data/patients.csv)
```

### LocalStorage
- فوری ذخیره
- Offline support
- Browser persistence

### GitHub API
- Backup داده‌ها
- Version control
- Collaboration ready

## 📱 ویژگی‌های فرم

### بخش‌های اطلاعاتی
1. **اطلاعات ضروری** - جنسیت، استان (الزامی)
2. **مشخصات شناسایی** - کد بیمار، سن
3. **مشخصات دموگرافیک** - تحصیلات، محل سکونت، وضعیت تأهل
4. **تشخیص سرطان** - نوع، مرحله، گرید (شرطی)
5. **درمان** - روش‌های درمانی
6. **سابقه** - بارداری (ویژه برای زنان)
7. **نکات اضافی** - توضیحات و نکات

### میانبرهای صفحه کلید
| کلید | عملکرد |
|------|--------|
| **Ctrl+Enter** | ذخیره رکورد |
| **Ctrl+R** | پاک کردن فرم |
| **Ctrl+G** | تنظیم GitHub Token |

## 🔐 امنیت و حریم خصوصی

### Token Management
- Token **محلی** ذخیره می‌شود (localStorage)
- هیچ Token در کد ثابت نیست
- کاربر خود Token خود را وارد می‌کند

### API Security
- تمام ارتباط HTTPS
- GitHub REST API v3
- Personal token authentication

### Data Protection
- CSV files plain-text
- No encryption needed (hospital network)
- Git history for audit trail

## 📊 فرمت داده‌ها

### CSV Headers
```
ردیف,تاریخ,کد_شناسایی,سن,جنسیت,استان,شهرستان,تحصیلات,محل_سکونت,
وضعیت_تأهل,سن_تشخیص,ماه_تشخیص,سال_تشخیص,نوع_سرطان,درجه,مرحله,
نوع_درمان,بارداری,نکات
```

### Sample Record
```csv
1,1403/11/16 14:30,AM1,42,زن,گیلان,رشت,کارشناسی,شهری,متأهل,35,3,1393,سرطان پستان,2,II,شیمی,2,نکاتی ندارد
```

## 🌐 GitHub Pages

### Auto Deploy
- Repo is public
- GitHub Pages enabled
- URL: https://medpromx.github.io/cancer

## 🪧 رفع مشکلات

### Token Issues
- ✓ صادرات repo scope
- ✓ Token validity (revoke & recreate)
- ✓ Clear browser cache
- ✓ Private repos need extra config

### Data Issues
- Check Console (F12) for errors
- localStorage data persists
- CSV in GitHub repo visible

### Access Issues
- GitHub Pages takes 1-2 min to deploy
- Hard refresh (Ctrl+Shift+R)
- Check repo permissions

## 📚 مراجع

- [GitHub REST API](https://docs.github.com/en/rest)
- [GitHub Pages Docs](https://pages.github.com/)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

## 📄 لایسنس

MIT License - استفاده برای اهداف پزشکی آزاد

---

**Platform**: GitHub Pages + REST API
**Language**: Farsi (فارسی) + English
**Maintained By**: Medical Institution, Northern Iran

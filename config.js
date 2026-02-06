// GitHub Configuration
const GITHUB_CONFIG = {
  // ⚠️ جایگزین کنید با مقادیر واقعی
  GITHUB_TOKEN: localStorage.getItem('github_token') || '', // Token بیمار حق دسترسی
  GITHUB_REPO: 'cancer', // نام ریپو
  GITHUB_OWNER: 'medpromx', // صاحب ریپو
  GITHUB_BRANCH: 'main', // شاخه اصلی
  DATA_FILE_PATH: 'data/patients.csv' // مسیر فایل CSV
};

// Province Data
const PROVINCE_DATA = {
  'GIL': [
    'رشت', 'بندر انزلی', 'لاهیجان', 'لنگرود', 'رودسر', 'آستارا',
    'آستانه‌اشرفیه', 'فومن', 'ماسال', 'تالش', 'رودبار', 'صومعه‌سرا',
    'سیاهکل', 'کلاچای', 'سایر'
  ],
  'MAZ': [
    'ساری', 'بابل', 'آمل', 'قائم‌شهر', 'نوشهر', 'چالوس',
    'نور', 'محمودآباد', 'تنکابن', 'رامسر', 'بابلسر', 'بهشهر',
    'فریدون‌کنار', 'جویبار', 'سوادکوه', 'کلاردشت', 'سایر'
  ],
  'GOL': [
    'گرگان', 'گنبد کاووس', 'علی‌آباد کتول', 'رامیان', 'کردکوی', 'آق‌قلا',
    'مینودشت', 'بندر ترکمن', 'بندر گز', 'کلاله', 'مراوه‌تپه', 'گالیکش', 'سایر'
  ]
};

// CSV Headers
const CSV_HEADERS = [
  'ردیف', 'تاریخ', 'کد_شناسایی', 'سن', 'جنسیت', 'استان', 'شهرستان',
  'تحصیلات', 'محل_سکونت', 'وضعیت_تأهل', 'سن_تشخیص', 'ماه_تشخیص',
  'سال_تشخیص', 'نوع_سرطان', 'درجه', 'مرحله', 'نوع_درمان',
  'مشاوره_باروری', 'اندیکاسیون_باروری', 'بارداری', 'زایمان', 'فرزند',
  'قاعدگی', 'بلوغ', 'پیشگیری', 'نکات'
];

// Validate Token
function validateGitHubToken() {
  if (!GITHUB_CONFIG.GITHUB_TOKEN) {
    console.warn('⚠️ GitHub Token not set. Setup required.');
    return false;
  }
  return true;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GITHUB_CONFIG, PROVINCE_DATA, CSV_HEADERS, validateGitHubToken };
}

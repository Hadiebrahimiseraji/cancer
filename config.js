// ============ Configuration ============
const CONFIG = {
    // Application metadata
    APP_NAME: 'سیستم جامع پرسشنامه سرطان و حفظ باروری',
    VERSION: '2.0.0',
    RELEASE_DATE: '۱۴۰۴/۱۱/۱۷',
    
    // Storage keys
    STORAGE_KEY: 'cancer_form_records',
    STORAGE_ID_KEY: 'cancer_form_id',
    CENTERS_KEY: 'clinical_centers',
    SELECTED_CENTER_KEY: 'selected_center',
    SESSION_LOGIN_KEY: 'loggedIn',
    
    // Default credentials (frontend security - change before production)
    DEFAULT_USER: 'draghajanidelavar',
    DEFAULT_PASS: 'admin',
    
    // GitHub Configuration
    GITHUB: {
        OWNER: 'Hadiebrahimiseraji',
        REPO: 'cancer',
        BRANCH: 'main',
        TOKEN_STORAGE_KEY: 'github_token'
    },
    
    // Default clinical centers
    DEFAULT_CENTERS: [
        'مرکز امیرکلا',
        'مرکز امام ساری',
        'بیمارستان رازی'
    ],
    
    // Counties by province
    COUNTIES: {
        'GIL': ['رشت', 'فومن', 'لاهیجان', 'تالش', 'سیاهکل', 'ماسال', 'صومعه سرا'],
        'MAZ': ['ساری', 'بابل', 'آمل', 'قائمشهر', 'نور', 'بهشهر', 'نکا'],
        'GOL': ['گرگان', 'گنبد', 'آق‌قلا', 'مینودشت', 'کردکوی', 'رامیان']
    },
    
    // Form fields for export
    CSV_HEADERS: [
        'ردیف',
        'تاریخ',
        'کد_شناسایی',
        'سن',
        'جنسیت',
        'استان',
        'شهرستان',
        'تحصیلات',
        'محل_سکونت',
        'وضعیت_تأهل',
        'سن_تشخیص',
        'ماه_تشخیص',
        'سال_تشخیص',
        'نوع_سرطان',
        'درجه',
        'مرحله',
        'نوع_درمان',
        'مشاوره_باروری',
        'اندیکاسیون_باروری',
        'بارداری',
        'زایمان',
        'فرزند',
        'قاعدگی',
        'بلوغ',
        'پیشگیری',
        'نکات',
        'مرکز',
        'پرسشنامه'
    ],
    
    // Gender-specific fields
    GENDER_FIELDS: {
        FEMALE: {
            fertility_fields: ['pregnancyCount', 'birthCount', 'childrenCount', 'menstruation'],
            male_specific: []
        },
        MALE: {
            fertility_fields: ['puberty'],
            female_specific: ['pregnancyCount', 'birthCount', 'childrenCount', 'menstruation']
        }
    },
    
    // Questionnaire modes
    QUESTIONNAIRE_MODES: {
        PRIMARY: 'primary',      // سرطان و حفظ باروری
        SECONDARY: 'secondary'   // پزشکی
    },
    
    // Cancer types
    CANCER_TYPES: {
        WOMEN: [
            { value: 'ACUTE_LEUKEMIA', label: 'لوسمی حاد' },
            { value: 'HODGKIN_LYMPHOMA', label: 'لنفوم هاجکین' },
            { value: 'NON_HODGKIN_LYMPHOMA', label: 'لنفوم غیر هاجکین' },
            { value: 'BREAST', label: 'سرطان پستان' },
            { value: 'CERVIX', label: 'سرطان رحم' },
            { value: 'OVARY', label: 'سرطان تخمدان' },
            { value: 'OTHER', label: 'سایر' }
        ],
        MEN: [
            { value: 'ACUTE_LEUKEMIA', label: 'لوسمی حاد' },
            { value: 'HODGKIN_LYMPHOMA', label: 'لنفوم هاجکین' },
            { value: 'TESTIS', label: 'سرطان بیضه' },
            { value: 'PROSTATE', label: 'سرطان پروستات' },
            { value: 'CNS', label: 'تومور CNS' },
            { value: 'OTHER', label: 'سایر' }
        ]
    },
    
    // Treatment types
    TREATMENT_TYPES: [
        { value: 'CHEMO', label: 'شیمی‌درمانی' },
        { value: 'RADIO', label: 'رادیوتراپی' },
        { value: 'BOTH', label: 'هر دو' },
        { value: 'SURGERY', label: 'جراحی' },
        { value: 'OTHER', label: 'سایر' }
    ],
    
    // UI Messages
    MESSAGES: {
        LOGIN_SUCCESS: 'ورود موفق',
        LOGIN_FAILED: 'نام کاربری یا رمز عبور اشتباه است',
        RECORD_SAVED: 'ذخیره شد',
        NO_RECORDS: 'هیچ رکوردی برای دانلود وجود ندارد',
        EMPTY_CENTER: 'نام مرکز جدید را وارد کنید',
        EMPTY_COUNTY: 'شهر دیگر را وارد کنید',
        GITHUB_UPLOAD_SUCCESS: 'اطلاعات با موفقیت آپلود شد',
        GITHUB_UPLOAD_FAILED: 'خطا در آپلود'
    }
};

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.generate': 'Generate',
    'nav.faq': 'FAQ',
    'nav.about': 'About',
    
    'home.hero.badge': 'Next-Generation AI Sensitivity',
    'home.hero.title1': 'Dominate with',
    'home.hero.title2': 'Perfect Settings',
    'home.hero.desc': 'Stop guessing. Our advanced AI analyzes your exact device specifications—RAM, Processor, Screen Size, and Refresh Rate—to generate the ultimate Free Fire sensitivity tailored just for you.',
    'home.hero.btn': 'Generate Sensitivity',
    
    'home.features.title': 'Why AI Sensitivity?',
    'home.features.desc': 'Our local AI engine processes your hardware specs securely to deliver unmatched precision.',
    
    'home.f1.title': 'Hardware Aware',
    'home.f1.desc': 'Analyzes screen resolution, refresh rate, and processing power to compute optimal turning speeds.',
    'home.f2.title': 'Lightning Fast',
    'home.f2.desc': 'Generates settings instantly using a client-side AI model without requiring a persistent internet connection.',
    'home.f3.title': '100% Private',
    'home.f3.desc': 'Your device information never leaves your browser. All computations are performed locally for maximum security.',
    
    'home.testimonials.title': 'Trusted by Players',
    
    'generate.title': 'Generate Your Settings',
    'generate.desc': 'Fill in your exact device specifications for the most accurate AI prediction.',
    'generate.deviceInfo': 'Device Information',
    'generate.hardware': 'Hardware Specifications',
    'generate.display': 'Display',
    'generate.gaming': 'Gaming Preferences',
    'generate.btn': 'Generate Settings',
    'generate.btn.loading': 'Generating...',
    'generate.msg': 'AI Model will be added in the next stage.',
    
    'faq.title': 'Frequently Asked Questions',
    'faq.desc': 'Everything you need to know about our sensitivity generator.',
    
    'about.title': 'About AI Sensitivity',
    
    'contact.title': 'Get in Touch',
    'contact.desc': 'Have questions or feedback? We\'d love to hear from you.',
    
    'footer.desc': 'Generate perfect, personalized Free Fire sensitivity settings based on your unique device hardware utilizing advanced AI.',
    'footer.legal': 'Legal',
    'footer.company': 'Company',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.generate': 'إنشاء',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.about': 'حول',
    
    'home.hero.badge': 'حساسية الذكاء الاصطناعي من الجيل القادم',
    'home.hero.title1': 'سيطر مع',
    'home.hero.title2': 'الإعدادات المثالية',
    'home.hero.desc': 'توقف عن التخمين. يحلل ذكاؤنا الاصطناعي المتقدم مواصفات جهازك بدقة — ذاكرة الوصول العشوائي (RAM)، المعالج، حجم الشاشة، ومعدل التحديث — لإنشاء حساسية فري فاير القصوى المخصصة لك فقط.',
    'home.hero.btn': 'إنشاء الحساسية',
    
    'home.features.title': 'لماذا AI Sensitivity؟',
    'home.features.desc': 'يعالج محرك الذكاء الاصطناعي المحلي مواصفات أجهزتك بأمان لتقديم دقة لا مثيل لها.',
    
    'home.f1.title': 'مدرك للأجهزة',
    'home.f1.desc': 'يحلل دقة الشاشة ومعدل التحديث وقوة المعالجة لحساب سرعات الدوران المثالية.',
    'home.f2.title': 'سريع كالبرق',
    'home.f2.desc': 'ينشئ الإعدادات على الفور باستخدام نموذج ذكاء اصطناعي من جانب العميل دون الحاجة إلى اتصال دائم بالإنترنت.',
    'home.f3.title': 'خاص 100%',
    'home.f3.desc': 'لا تترك معلومات جهازك متصفحك أبدًا. يتم إجراء جميع الحسابات محليًا لأقصى درجات الأمان.',
    
    'home.testimonials.title': 'موثوق من قبل اللاعبين',
    
    'generate.title': 'إنشاء إعداداتك',
    'generate.desc': 'املأ مواصفات جهازك الدقيقة للحصول على تنبؤ الذكاء الاصطناعي الأكثر دقة.',
    'generate.deviceInfo': 'معلومات الجهاز',
    'generate.hardware': 'مواصفات الأجهزة',
    'generate.display': 'الشاشة',
    'generate.gaming': 'تفضيلات اللعب',
    'generate.btn': 'إنشاء الإعدادات',
    'generate.btn.loading': 'جاري الإنشاء...',
    'generate.msg': 'سيتم إضافة نموذج الذكاء الاصطناعي في المرحلة القادمة.',
    
    'faq.title': 'الأسئلة الشائعة',
    'faq.desc': 'كل ما تحتاج لمعرفته حول مولد الحساسية الخاص بنا.',
    
    'about.title': 'حول AI Sensitivity',
    
    'contact.title': 'تواصل معنا',
    'contact.desc': 'هل لديك أسئلة أو ملاحظات؟ نود أن نسمع منك.',
    
    'footer.desc': 'قم بإنشاء إعدادات حساسية فري فاير مثالية وشخصية بناءً على أجهزة جهازك الفريدة باستخدام الذكاء الاصطناعي المتقدم.',
    'footer.legal': 'قانوني',
    'footer.company': 'الشركة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.about': 'معلومات عنا',
    'footer.contact': 'اتصل بنا',
    'footer.rights': 'جميع الحقوق محفوظة.'
  }
} as const;

export type TranslationKey = keyof typeof translations.en;

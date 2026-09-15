export type Specialty = {
  id: string;
  no: string;
  name: string;
  nameEn: string;
  count: number;
};

export type Chamber = {
  hospitalId: string;
  hospitalName: string;
  days: string;
  time: string;
  fee: string;
};

export type Doctor = {
  id: string;
  name: string;
  degree: string;
  specialtyId: string;
  specialty: string;
  experience: string;
  regNo: string;
  area: string;
  chambers: Chamber[];
  featured?: boolean;
  photo?: string; // base64 data URL
};

export type Hospital = {
  id: string;
  name: string;
  type: string;
  area: string;
  address: string;
  phone: string;
  beds?: string;
  facilities: string[];
  doctorCount: number;
  photo?: string; // photo URL or base64
};

export const specialties: Specialty[] = [
  { id: "medicine", no: "০১", name: "মেডিসিন", nameEn: "Medicine", count: 34 },
  { id: "gynae", no: "০২", name: "গাইনি ও প্রসূতি", nameEn: "Gynae & Obs", count: 21 },
  { id: "shishu", no: "০৩", name: "শিশু রোগ", nameEn: "Paediatrics", count: 19 },
  { id: "hridrog", no: "০৪", name: "হৃদরোগ", nameEn: "Cardiology", count: 12 },
  { id: "chormo", no: "০৫", name: "চর্ম ও যৌন", nameEn: "Dermatology", count: 14 },
  { id: "danto", no: "০৬", name: "দন্ত রোগ", nameEn: "Dental", count: 17 },
  { id: "chokh", no: "০৭", name: "চক্ষু রোগ", nameEn: "Ophthalmology", count: 9 },
  { id: "orthopedics", no: "০৮", name: "অর্থোপেডিক্স", nameEn: "Orthopaedics", count: 11 },
  { id: "nak-kan-gola", no: "০৯", name: "নাক-কান-গলা", nameEn: "ENT", count: 8 },
  { id: "manosik", no: "১০", name: "মানসিক রোগ", nameEn: "Psychiatry", count: 6 },
  { id: "neurology", no: "১১", name: "নিউরোমেডিসিন ও নিউরোলজি", nameEn: "Neurology", count: 15 },
  { id: "nephrology", no: "১২", name: "কিডনি রোগ (নেফ্রোলজি)", nameEn: "Nephrology", count: 10 },
  { id: "urology", no: "১৩", name: "ইউরোলজি (মূত্ররোগ)", nameEn: "Urology", count: 8 },
  { id: "gastroenterology", no: "১৪", name: "লিভার ও পরিপাকতন্ত্র", nameEn: "Gastroenterology", count: 12 },
  { id: "surgery", no: "১৫", name: "জেনারেল ও ল্যাপারোস্কোপিক সার্জারি", nameEn: "General Surgery", count: 18 },
  { id: "oncology", no: "১৬", name: "ক্যান্সার রোগ (অনকোলজি)", nameEn: "Oncology", count: 7 },
  { id: "diabetes", no: "১৭", name: "ডায়াবেটিস ও হরমোন রোগ", nameEn: "Endocrinology", count: 14 },
  { id: "physiotherapy", no: "১৮", name: "ফিজিক্যাল মেডিসিন ও রিহ্যাভ", nameEn: "Physical Medicine", count: 9 },
  { id: "buke-rog", no: "১৯", name: "বক্ষব্যাধি ও অ্যাজমা", nameEn: "Pulmonology", count: 11 },
  { id: "plastic-surgery", no: "২০", name: "প্লাস্টিক ও বার্ন সার্জারি", nameEn: "Plastic Surgery", count: 5 },
];

export const hospitals: Hospital[] = [
  {
    id: "rmch",
    name: "রাজশাহী মেডিকেল কলেজ হাসপাতাল",
    type: "সরকারি হাসপাতাল",
    area: "লক্ষ্মীপুর, রাজশাহী",
    address: "লক্ষ্মীপুর, রাজশাহী — ৬০০০",
    phone: "০৭২১-৭৭২১৫০",
    beds: "১২০০+",
    facilities: ["জরুরি বিভাগ", "আইসিইউ", "অপারেশন থিয়েটার", "রক্তের ব্যাংক"],
    doctorCount: 42,
  },
  {
    id: "popular-rajshahi",
    name: "পপুলার ডায়াগনস্টিক সেন্টার",
    type: "ডায়াগনস্টিক ও কনসালটেশন",
    area: "শাহেব বাজার, রাজশাহী",
    address: "সাহেব বাজার জিরো পয়েন্ট, রাজশাহী",
    phone: "০৭২১-৭৬৩৪৪২",
    facilities: ["প্যাথলজি ল্যাব", "আল্ট্রাসনোগ্রাম", "এক্স-রে", "ইসিজি"],
    doctorCount: 23,
  },
  {
    id: "islami-bank",
    name: "ইসলামী ব্যাংক হাসপাতাল রাজশাহী",
    type: "বেসরকারি হাসপাতাল",
    area: "উপশহর, রাজশাহী",
    address: "উপশহর নিউ মার্কেট এলাকা, রাজশাহী",
    phone: "০৭২১-৮১২৩৩৪",
    beds: "১৫০",
    facilities: ["আইসিইউ", "সিসিইউ", "ডায়ালাইসিস", "ফার্মেসি"],
    doctorCount: 31,
  },
  {
    id: "medinova",
    name: "মেডিনোভা মেডিকেল সার্ভিসেস",
    type: "ডায়াগনস্টিক সেন্টার",
    area: "কাজলা, রাজশাহী",
    address: "কাজলা বাসস্ট্যান্ড সংলগ্ন, রাজশাহী",
    phone: "০৭২১-৭৫৯৯০১",
    facilities: ["এমআরআই", "সিটি স্ক্যান", "প্যাথলজি"],
    doctorCount: 15,
  },
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "ডা. মাহমুদুল হাসান",
    degree: "এমবিবিএস, এফসিপিএস (মেডিসিন)",
    specialtyId: "medicine",
    specialty: "মেডিসিন বিশেষজ্ঞ",
    experience: "১৮ বছর",
    regNo: "BMDC-A-৪৪৫২১",
    area: "শাহেব বাজার, রাজশাহী",
    featured: true,
    chambers: [
      { hospitalId: "popular-rajshahi", hospitalName: "পপুলার ডায়াগনস্টিক সেন্টার", days: "শনি, সোম, বুধ", time: "বিকাল ৫টা - রাত ৯টা", fee: "৳ ৬০০" },
      { hospitalId: "rmch", hospitalName: "রাজশাহী মেডিকেল কলেজ হাসপাতাল", days: "রবি, মঙ্গল", time: "সকাল ৯টা - দুপুর ২টা", fee: "সরকারি ফি" },
    ],
  },
  {
    id: "2",
    name: "ডা. ফারহানা ইয়াসমিন",
    degree: "এমবিবিএস, এমসিপিএস (গাইনি)",
    specialtyId: "gynae",
    specialty: "গাইনি ও প্রসূতি বিশেষজ্ঞ",
    experience: "১৪ বছর",
    regNo: "BMDC-A-৫১২০৯",
    area: "উপশহর, রাজশাহী",
    featured: true,
    chambers: [
      { hospitalId: "islami-bank", hospitalName: "ইসলামী ব্যাংক হাসপাতাল রাজশাহী", days: "শনি - বৃহস্পতি", time: "বিকাল ৪টা - রাত ৮টা", fee: "৳ ৮০০" },
    ],
  },
  {
    id: "3",
    name: "ডা. রফিকুল ইসলাম",
    degree: "এমবিবিএস, ডিসিএইচ (শিশু)",
    specialtyId: "shishu",
    specialty: "শিশু রোগ বিশেষজ্ঞ",
    experience: "২২ বছর",
    regNo: "BMDC-A-৩৩১৭৮",
    area: "কাজলা, রাজশাহী",
    chambers: [
      { hospitalId: "medinova", hospitalName: "মেডিনোভা মেডিকেল সার্ভিসেস", days: "শুক্র, শনি, রবি", time: "সন্ধ্যা ৬টা - রাত ৯টা", fee: "৳ ৫০০" },
    ],
  },
  {
    id: "4",
    name: "ডা. আনিসুর রহমান",
    degree: "এমবিবিএস, এমডি (কার্ডিওলজি)",
    specialtyId: "hridrog",
    specialty: "হৃদরোগ বিশেষজ্ঞ",
    experience: "১৬ বছর",
    regNo: "BMDC-A-৪৮৯০২",
    area: "লক্ষ্মীপুর, রাজশাহী",
    featured: true,
    chambers: [
      { hospitalId: "rmch", hospitalName: "রাজশাহী মেডিকেল কলেজ হাসপাতাল", days: "রবি - বৃহস্পতি", time: "সকাল ১০টা - দুপুর ১টা", fee: "সরকারি ফি" },
      { hospitalId: "popular-rajshahi", hospitalName: "পপুলার ডায়াগনস্টিক সেন্টার", days: "শুক্র", time: "বিকাল ৩টা - সন্ধ্যা ৭টা", fee: "৳ ১০০০" },
    ],
  },
  {
    id: "5",
    name: "ডা. সাবিনা আক্তার",
    degree: "এমবিবিএস, ডিডিভি (চর্ম)",
    specialtyId: "chormo",
    specialty: "চর্ম ও যৌন রোগ বিশেষজ্ঞ",
    experience: "১০ বছর",
    regNo: "BMDC-A-৫৫৭৩৪",
    area: "শাহেব বাজার, রাজশাহী",
    chambers: [
      { hospitalId: "popular-rajshahi", hospitalName: "পপুলার ডায়াগনস্টিক সেন্টার", days: "শনি, সোম, বুধ, শুক্র", time: "বিকাল ৫টা - রাত ৮টা", fee: "৳ ৫৫০" },
    ],
  },
  {
    id: "6",
    name: "ডা. তানভীর আহমেদ",
    degree: "বিডিএস, এমসিপিএস (ডেন্টাল)",
    specialtyId: "danto",
    specialty: "দন্ত রোগ বিশেষজ্ঞ",
    experience: "৯ বছর",
    regNo: "BMDC-D-১২৪৪৫",
    area: "উপশহর, রাজশাহী",
    chambers: [
      { hospitalId: "islami-bank", hospitalName: "ইসলামী ব্যাংক হাসপাতাল রাজশাহী", days: "প্রতিদিন", time: "সকাল ১০টা - রাত ৮টা", fee: "৳ ৪০০" },
    ],
  },
];

export const cityStats = {
  city: "রাজশাহী",
  doctors: 156,
  hospitals: 24,
  specialties: 10,
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export type AboutInfo = {
  headline: string;
  description: string;
  points: { iconName: string; title: string; body: string }[];
};

export const defaultAboutInfo: AboutInfo = {
  headline: "একটা সহজ প্রশ্ন থেকে Medoro-র শুরু।",
  description: '"কোন ডাক্তার কখন বসেন, কোথায় বসেন" — এই সাধারণ প্রশ্নের উত্তর খুঁজতে আমাদের অনেককেই আত্মীয়-স্বজনকে ফোন করতে হয়, ফেসবুক গ্রুপে পোস্ট দিতে হয়। Medoro বানানো হয়েছে এই ঝামেলা দূর করতে — নির্ভরযোগ্য, হালনাগাদ তথ্য এক জায়গায়।',
  points: [
    {
      iconName: "ShieldCheck",
      title: "যাচাইকৃত তথ্য",
      body: "প্রতিটি ডাক্তার ও হাসপাতালের তথ্য আমাদের ফিল্ড টিম সরাসরি যোগাযোগ করে যাচাই করে, তারপর তালিকাভুক্ত করে।",
    },
    {
      iconName: "MapPin",
      title: "রাজশাহী থেকে শুরু",
      body: "আমরা একটি এলাকায় গভীরভাবে কাজ করে শুরু করছি, যাতে তথ্যের নির্ভরযোগ্যতা বজায় থাকে — তারপর ধাপে ধাপে অন্য বিভাগে ছড়িয়ে যাব।",
    },
    {
      iconName: "Users",
      title: "সবার জন্য বিনামূল্যে",
      body: "রোগী হিসেবে ডাক্তার খোঁজা, চেম্বারের তথ্য দেখা — এই প্ল্যাটফর্মে সবসময় সম্পূর্ণ বিনামূল্যে থাকবে।",
    },
    {
      iconName: "BookOpen",
      title: "স্বাস্থ্য শিক্ষা",
      body: "ডাক্তারদের পরামর্শ নিয়ে সহজ ভাষায় স্বাস্থ্য বিষয়ক লেখা প্রকাশ করি, যাতে মানুষ প্রাথমিক সিদ্ধান্ত নিজেই নিতে পারে।",
    },
  ],
};

export const articles: Article[] = [
  {
    id: "1",
    title: "গরমে ডায়রিয়া প্রতিরোধে করণীয়",
    excerpt: "বর্ষার শুরুতে পানিবাহিত রোগ বেড়ে যায় — সাধারণ সতর্কতা ও কখন ডাক্তার দেখাবেন তার নির্দেশিকা।",
    category: "মেডিসিন",
    date: "১২ আগস্ট, ২০২৬",
    readTime: "৪ মিনিট",
  },
  {
    id: "2",
    title: "গর্ভাবস্থায় প্রথম তিন মাসে যা জানা জরুরি",
    excerpt: "নিয়মিত চেকআপের সময়সূচি, খাদ্যাভ্যাস আর সতর্কীকরণ লক্ষণ নিয়ে একজন গাইনি বিশেষজ্ঞের পরামর্শ।",
    category: "গাইনি ও প্রসূতি",
    date: "০৫ আগস্ট, ২০২৬",
    readTime: "৬ মিনিট",
  },
  {
    id: "3",
    title: "শিশুর টিকাদান সময়সূচি: একটি সহজ গাইড",
    excerpt: "জন্ম থেকে পাঁচ বছর পর্যন্ত বাংলাদেশের জাতীয় টিকাদান কর্মসূচির সম্পূর্ণ সময়সূচি।",
    category: "শিশু রোগ",
    date: "২৯ জুলাই, ২০২৬",
    readTime: "৫ মিনিট",
  },
  {
    id: "4",
    title: "উচ্চ রক্তচাপ নিয়ন্ত্রণে জীবনযাত্রায় পরিবর্তন",
    excerpt: "ওষুধের পাশাপাশি খাদ্যাভ্যাস ও ব্যায়ামে যে পরিবর্তনগুলো হৃদরোগ বিশেষজ্ঞরা সুপারিশ করেন।",
    category: "হৃদরোগ",
    date: "১৮ জুলাই, ২০২৬",
    readTime: "৭ মিনিট",
  },
];

export type CityEntry = {
  id: string;
  name: string;
  division: string;
  status: "live" | "coming-soon";
  doctors?: number;
};

export const cities: CityEntry[] = [
  { id: "rajshahi", name: "রাজশাহী", division: "রাজশাহী বিভাগ", status: "live", doctors: 156 },
  { id: "dhaka", name: "ঢাকা", division: "ঢাকা বিভাগ", status: "coming-soon" },
  { id: "chattogram", name: "চট্টগ্রাম", division: "চট্টগ্রাম বিভাগ", status: "coming-soon" },
  { id: "khulna", name: "খুলনা", division: "খুলনা বিভাগ", status: "coming-soon" },
  { id: "sylhet", name: "সিলেট", division: "সিলেট বিভাগ", status: "coming-soon" },
  { id: "barishal", name: "বরিশাল", division: "বরিশাল বিভাগ", status: "coming-soon" },
  { id: "rangpur", name: "রংপুর", division: "রংপুর বিভাগ", status: "coming-soon" },
  { id: "mymensingh", name: "ময়মনসিংহ", division: "ময়মনসিংহ বিভাগ", status: "coming-soon" },
];

// ---- Emergency services ----
export type Ambulance = { id: string; provider: string; type: string; area: string; phone: string; available: string };
export const ambulances: Ambulance[] = [
  { id: "1", provider: "রাজশাহী মেডিকেল কলেজ হাসপাতাল অ্যাম্বুলেন্স", type: "আইসিইউ সাপোর্ট", area: "লক্ষ্মীপুর", phone: "০১৭১১-১১২২৩৩", available: "২৪ ঘণ্টা" },
  { id: "2", provider: "রেড ক্রিসেন্ট অ্যাম্বুলেন্স সার্ভিস", type: "সাধারণ", area: "শাহেব বাজার", phone: "০১৮১২-৪৪৫৫৬৬", available: "২৪ ঘণ্টা" },
  { id: "3", provider: "ইসলামী ব্যাংক হাসপাতাল অ্যাম্বুলেন্স", type: "ফ্রিজিং (মরদেহ পরিবহন)", area: "উপশহর", phone: "০১৯১৩-৭৭৮৮৯৯", available: "২৪ ঘণ্টা" },
  { id: "4", provider: "সেবা অ্যাম্বুলেন্স সার্ভিস", type: "সাধারণ ও আইসিইউ", area: "কাজলা", phone: "০১৬১৪-৫৫৬৬৭৭", available: "২৪ ঘণ্টা" },
];

export type BloodBank = { id: string; name: string; area: string; phone: string; note: string };
export const bloodBanks: BloodBank[] = [
  { id: "1", name: "রাজশাহী মেডিকেল কলেজ হাসপাতাল ব্লাড ব্যাংক", area: "লক্ষ্মীপুর", phone: "০৭২১-৭৭২১৫০", note: "সরকারি, সব গ্রুপ সাধারণত মজুত থাকে" },
  { id: "2", name: "সন্ধানী ব্লাড ব্যাংক, রাজশাহী", area: "মেডিকেল কলেজ ক্যাম্পাস", phone: "০১৭১৭-৯৯৮৮৭৭", note: "স্বেচ্ছাসেবী সংগঠন, ভলান্টিয়ার ডোনার নেটওয়ার্ক" },
  { id: "3", name: "কোয়ান্টাম ব্লাড ব্যাংক", area: "শাহেব বাজার", phone: "০১৮১৯-৬৬৭৭৮৮", note: "প্রতিদিন সকাল ৯টা - রাত ৯টা" },
];

export type OxygenProvider = { id: string; name: string; area: string; phone: string; service: string };
export const oxygenProviders: OxygenProvider[] = [
  { id: "1", name: "রাজশাহী অক্সিজেন সার্ভিস", area: "শাহেব বাজার", phone: "০১৭১৫-৩৩৪৪৫৫", service: "সিলিন্ডার ভাড়া ও রিফিল, হোম ডেলিভারি" },
  { id: "2", name: "মেডিকেয়ার অক্সিজেন সাপ্লাই", area: "উপশহর", phone: "০১৮১৬-২২৩৩৪৪", service: "কনসেন্ট্রেটর ভাড়া, জরুরি ডেলিভারি" },
];

export type Hotline = { id: string; name: string; number: string };
export const hotlines: Hotline[] = [
  { id: "1", name: "জাতীয় স্বাস্থ্য সহায়তা", number: "১৬২৬৩" },
  { id: "2", name: "জাতীয় জরুরি সেবা", number: "৯৯৯" },
  { id: "3", name: "ফায়ার সার্ভিস", number: "১৬১৬৩" },
  { id: "4", name: "নারী ও শিশু নির্যাতন প্রতিরোধ", number: "১০৯" },
  { id: "5", name: "বিষক্রিয়া তথ্যকেন্দ্র (NPIC, BSMMU)", number: "০১৭৮৮-১৪৬১৪৬" },
];

// ---- Medicine directory ----
export type Generic = { id: string; name: string; class: string; brandCount: number; uses: string };
export const generics: Generic[] = [
  { id: "1", name: "প্যারাসিটামল", class: "ব্যথা ও জ্বরনাশক", brandCount: 142, uses: "জ্বর, ব্যথা কমাতে ব্যবহৃত হয়" },
  { id: "2", name: "অ্যামোক্সিসিলিন", class: "অ্যান্টিবায়োটিক", brandCount: 68, uses: "ব্যাকটেরিয়াজনিত সংক্রমণে ব্যবহৃত" },
  { id: "3", name: "ওমিপ্রাজল", class: "গ্যাস্ট্রিক/এসিডিটি", brandCount: 91, uses: "গ্যাস্ট্রিক আলসার, অ্যাসিডিটির চিকিৎসায়" },
  { id: "4", name: "মেটফরমিন", class: "ডায়াবেটিস", brandCount: 54, uses: "টাইপ ২ ডায়াবেটিস নিয়ন্ত্রণে" },
  { id: "5", name: "সেট্রিজিন", class: "অ্যান্টিহিস্টামিন", brandCount: 37, uses: "অ্যালার্জি, চুলকানি, সর্দিতে ব্যবহৃত" },
  { id: "6", name: "অ্যামলোডিপিন", class: "উচ্চ রক্তচাপ", brandCount: 45, uses: "উচ্চ রক্তচাপ নিয়ন্ত্রণে ব্যবহৃত" },
];

export type Indication = { id: string; name: string; specialty: string; genericIds: string[] };
export const indications: Indication[] = [
  { id: "1", name: "জ্বর", specialty: "মেডিসিন", genericIds: ["1"] },
  { id: "2", name: "উচ্চ রক্তচাপ", specialty: "হৃদরোগ", genericIds: ["6"] },
  { id: "3", name: "ডায়াবেটিস", specialty: "মেডিসিন / এন্ডোক্রাইনোলজি", genericIds: ["4"] },
  { id: "4", name: "গ্যাস্ট্রিক/আলসার", specialty: "গ্যাস্ট্রোএন্টেরোলজি", genericIds: ["3"] },
  { id: "5", name: "অ্যালার্জি", specialty: "চর্ম রোগ", genericIds: ["5"] },
];

export type PharmacyOpen = { id: string; name: string; area: string; phone: string; hours: string };
export const pharmacies24: PharmacyOpen[] = [
  { id: "1", name: "লাজ ফার্মা, শাহেব বাজার শাখা", area: "শাহেব বাজার", phone: "০৭২১-৮৬৬৭৭৭", hours: "২৪ ঘণ্টা খোলা" },
  { id: "2", name: "আরোগ্য ফার্মেসি", area: "উপশহর", phone: "০১৭১২-৩৪৫৬৭৮", hours: "২৪ ঘণ্টা খোলা" },
  { id: "3", name: "মেডিপ্লাস ফার্মেসি, কাজলা", area: "কাজলা", phone: "০১৮১৩-৯৮৭৬৫৪", hours: "রাত ২টা পর্যন্ত খোলা" },
];

// ---- Community Q&A ----
export type Question = { id: string; question: string; askedBy: string; time: string; answers: number; category: string };
export const questions: Question[] = [
  { id: "1", question: "সন্তান জন্মের কতদিন পর প্রথম টিকা দিতে হয়?", askedBy: "একজন ব্যবহারকারী", time: "২ দিন আগে", answers: 3, category: "শিশু রোগ" },
  { id: "2", question: "প্রতিদিন কতটুকু পানি পান করা উচিত?", askedBy: "একজন ব্যবহারকারী", time: "৪ দিন আগে", answers: 5, category: "সাধারণ স্বাস্থ্য" },
  { id: "3", question: "ডায়াবেটিস থাকলে কী কী খাবার এড়িয়ে চলা উচিত?", askedBy: "একজন ব্যবহারকারী", time: "১ সপ্তাহ আগে", answers: 7, category: "মেডিসিন" },
  { id: "4", question: "গর্ভাবস্থায় প্রথম চেকআপ কখন করানো উচিত?", askedBy: "একজন ব্যবহারকারী", time: "১ সপ্তাহ আগে", answers: 4, category: "গাইনি ও প্রসূতি" },
];

// ---- Caregivers / Nurses ----
export type Caregiver = { id: string; name: string; type: string; experience: string; area: string; rate: string; phone: string };
export const caregivers: Caregiver[] = [
  { id: "1", name: "নার্স রেহানা বেগম", type: "রেজিস্টার্ড নার্স", experience: "৮ বছর", area: "শাহেব বাজার", rate: "৳ ৮০০/শিফট", phone: "০১৭২২-১১২২৩৩" },
  { id: "2", name: "কেয়ারগিভার আব্দুল করিম", type: "রোগী পরিচর্যাকারী", experience: "৫ বছর", area: "উপশহর", rate: "৳ ৬০০/শিফট", phone: "০১৮২৩-২২৩৩৪৪" },
  { id: "3", name: "নার্স সুমাইয়া আক্তার", type: "আইসিইউ প্রশিক্ষিত নার্স", experience: "৬ বছর", area: "লক্ষ্মীপুর", rate: "৳ ১০০০/শিফট", phone: "০১৯২৪-৩৩৪৪৫৫" },
];

// ---- Physiotherapy centers ----
export type PhysioCenter = { id: string; name: string; area: string; phone: string; services: string[] };
export const physioCenters: PhysioCenter[] = [
  { id: "1", name: "রাজশাহী ফিজিওথেরাপি সেন্টার", area: "শাহেব বাজার", phone: "০৭২১-৭৭৮৮৯৯", services: ["স্পোর্টস ইনজুরি", "স্ট্রোক রিহ্যাব", "ব্যাক পেইন"] },
  { id: "2", name: "কেয়ার ফিজিও ক্লিনিক", area: "উপশহর", phone: "০১৭২৫-৪৪৫৫৬৬", services: ["পোস্ট-সার্জারি রিকভারি", "আর্থ্রাইটিস ম্যানেজমেন্ট"] },
];

// ---- Telemedicine ----
export type TeleDoctor = { id: string; doctorId: string; nextSlot: string; fee: string };
export const teleDoctors: TeleDoctor[] = [
  { id: "1", doctorId: "1", nextSlot: "আজ, সন্ধ্যা ৭:৩০", fee: "৳ ৫০০" },
  { id: "2", doctorId: "3", nextSlot: "আগামীকাল, সকাল ১০টা", fee: "৳ ৪০০" },
  { id: "3", doctorId: "5", nextSlot: "আজ, রাত ৮টা", fee: "৳ ৪৫০" },
];

// ---- Equipment rental ----
export type Equipment = { id: string; name: string; rate: string; deposit: string; provider: string; phone: string };
export const equipment: Equipment[] = [
  { id: "1", name: "হুইলচেয়ার", rate: "৳ ১০০/দিন", deposit: "৳ ১০০০", provider: "মেডিকেয়ার ইকুইপমেন্ট", phone: "০১৮১৬-২২৩৩৪৪" },
  { id: "2", name: "অক্সিজেন কনসেন্ট্রেটর", rate: "৳ ৫০০/দিন", deposit: "৳ ৫০০০", provider: "রাজশাহী অক্সিজেন সার্ভিস", phone: "০১৭১৫-৩৩৪৪৫৫" },
  { id: "3", name: "হাসপাতাল বেড", rate: "৳ ২০০/দিন", deposit: "৳ ২০০০", provider: "মেডিকেয়ার ইকুইপমেন্ট", phone: "০১৮১৬-২২৩৩৪৪" },
  { id: "4", name: "নেবুলাইজার", rate: "৳ ৮০/দিন", deposit: "৳ ৫০০", provider: "মেডিকেয়ার ইকুইপমেন্ট", phone: "০১৮১৬-২২৩৩৪৪" },
];

// ---- NGO / Free camps ----
export type Camp = { id: string; title: string; org: string; date: string; area: string; note: string };
export const camps: Camp[] = [
  { id: "1", title: "ফ্রি চক্ষু পরীক্ষা ক্যাম্প", org: "রাজশাহী লায়ন্স আই হাসপাতাল", date: "২৮ আগস্ট, ২০২৬", area: "উপশহর কমিউনিটি সেন্টার", note: "বিনামূল্যে চোখ পরীক্ষা ও চশমা বিতরণ" },
  { id: "2", title: "ডায়াবেটিস স্ক্রিনিং ক্যাম্প", org: "রাজশাহী ডায়াবেটিক এসোসিয়েশন", date: "০৫ সেপ্টেম্বর, ২০২৬", area: "শাহেব বাজার মিলনায়তন", note: "ফ্রি ব্লাড সুগার টেস্ট" },
  { id: "3", title: "রক্তদান কর্মসূচি", org: "সন্ধানী, রাজশাহী মেডিকেল কলেজ", date: "১২ সেপ্টেম্বর, ২০২৬", area: "মেডিকেল কলেজ ক্যাম্পাস", note: "স্বেচ্ছায় রক্তদান কর্মসূচি" },
];

// ---- Health notices ----
export type Notice = { id: string; title: string; body: string; date: string; severity: "info" | "alert" };
export const notices: Notice[] = [
  { id: "1", title: "ডেঙ্গু সতর্কতা", body: "রাজশাহীতে সম্প্রতি ডেঙ্গু রোগীর সংখ্যা বাড়ছে। বাড়ির আশেপাশে পানি জমতে দেবেন না, জ্বর হলে দ্রুত পরীক্ষা করান।", date: "১৮ আগস্ট, ২০২৬", severity: "alert" },
  { id: "2", title: "জাতীয় টিকাদান সপ্তাহ", body: "২৫-৩১ আগস্ট শিশুদের জন্য বিশেষ টিকাদান কর্মসূচি চলবে নিকটস্থ কমিউনিটি ক্লিনিকে।", date: "১৫ আগস্ট, ২০২৬", severity: "info" },
];

// ---- FAQ / Glossary ----
export type FaqTerm = { id: string; term: string; explanation: string };
export const faqTerms: FaqTerm[] = [
  { id: "1", term: "BMDC রেজিস্ট্রেশন", explanation: "বাংলাদেশ মেডিকেল অ্যান্ড ডেন্টাল কাউন্সিল কর্তৃক প্রদত্ত নিবন্ধন নম্বর, যা প্রমাণ করে একজন ডাক্তার বৈধভাবে চিকিৎসা করার অনুমতিপ্রাপ্ত।" },
  { id: "2", term: "জেনেরিক নাম", explanation: "একটি ওষুধের মূল রাসায়নিক উপাদানের নাম, যা ব্র্যান্ড নাম নির্বিশেষে সব জায়গায় একই থাকে।" },
  { id: "3", term: "কনসালটেশন ফি", explanation: "ডাক্তার দেখানোর জন্য চেম্বারে পরিশোধ করতে হয় এমন ফি, যা ডাক্তারভেদে ভিন্ন হয়।" },
  { id: "4", term: "টেলিমেডিসিন", explanation: "ফোন বা ভিডিও কলের মাধ্যমে দূর থেকে ডাক্তারের পরামর্শ নেওয়ার ব্যবস্থা।" },
];

// ---- Jobs ----
export type Job = { id: string; title: string; hospital: string; type: string; area: string };
export const jobs: Job[] = [
  { id: "1", title: "স্টাফ নার্স", hospital: "ইসলামী ব্যাংক হাসপাতাল রাজশাহী", type: "ফুল-টাইম", area: "উপশহর" },
  { id: "2", title: "মেডিকেল টেকনোলজিস্ট (ল্যাব)", hospital: "পপুলার ডায়াগনস্টিক সেন্টার", type: "ফুল-টাইম", area: "শাহেব বাজার" },
  { id: "3", title: "রিসেপশনিস্ট", hospital: "মেডিনোভা মেডিকেল সার্ভিসেস", type: "পার্ট-টাইম", area: "কাজলা" },
];

// ---- Reviews ----
export type Review = { id: string; doctorId: string; name: string; rating: number; comment: string; time: string };
export const reviews: Review[] = [
  { id: "1", doctorId: "1", name: "একজন রোগী", rating: 5, comment: "খুব ভালোভাবে সময় দিয়ে সমস্যা শুনেছেন, পরামর্শও কার্যকর ছিল।", time: "৩ সপ্তাহ আগে" },
  { id: "2", doctorId: "1", name: "একজন রোগী", rating: 4, comment: "চেম্বারে কিছুটা অপেক্ষা করতে হয়েছে, তবে চিকিৎসা ভালো।", time: "১ মাস আগে" },
  { id: "3", doctorId: "2", name: "একজন রোগী", rating: 5, comment: "গর্ভাবস্থায় খুব যত্ন সহকারে দেখেছেন, ধন্যবাদ ডাক্তার।", time: "২ সপ্তাহ আগে" },
];

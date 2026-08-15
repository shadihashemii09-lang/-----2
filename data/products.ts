import type { Category, Collection, CollectionSlug, Product } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "blouse",
    label: "شومیز",
    description: "شومیزهای نرم با برش آزاد و یقه‌های لطیف",
  },
  {
    slug: "dress",
    label: "پیراهن",
    description: "پیراهن‌هایی با دامن رها و سیلوئت زنانه",
  },
  {
    slug: "trousers",
    label: "شلوار",
    description: "شلوارهای فاق بلند با پاچه‌ای تمیز و راحت",
  },
  {
    slug: "coat",
    label: "کت و مانتو",
    description: "کت‌هایی با وزن درست و خطوط پاک برای فصل‌های سرد",
  },
  {
    slug: "set",
    label: "ست",
    description: "ست‌های دو تکه؛ یک پوشش کامل، بدون دغدغه",
  },
];

export const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label]),
);

export const COLLECTIONS: Collection[] = [
  {
    slug: "spring",
    name: "بهار",
    tagline: "شکوفه در خطوط نرم",
    description:
      "رنگ‌های روشنِ آغاز فصل، پارچه‌های تنفس‌پذیر و شومیزهایی که هوای تازه را به تن می‌کنند.",
    art: "/images/collection-spring.svg",
    accent: "#B98A7D",
    productSlugs: ["sepide", "nasim", "raha", "taraneh"],
  },
  {
    slug: "summer",
    name: "تابستان",
    tagline: "سایه‌های خنک روزهای بلند",
    description:
      "پیراهن‌های سبک و شلوارهایی با لمسِ ابریشمی؛ برای عصرهای گرم و شب‌های بلند تابستان.",
    art: "/images/collection-summer.svg",
    accent: "#9AA18B",
    productSlugs: ["maah", "ghazal", "delara", "aram"],
  },
  {
    slug: "autumn",
    name: "پاییز",
    tagline: "گرمای خاموش در سایه‌های خاکی",
    description:
      "کت‌های سنگین، رنگ‌های زمین و ست‌هایی که لایه‌لایه می‌نشینند؛ برای فصل سرد، با ظرافت.",
    art: "/images/collection-autumn.svg",
    accent: "#B3A896",
    productSlugs: ["shida", "sara", "mehr", "pegah", "ava", "tooba", "nora", "yalda"],
  },
];

export const COLLECTION_LABEL: Record<string, string> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.slug, c.name]),
);

const art = (slug: string) => `/images/products/${slug}.svg`;

export const PRODUCTS: Product[] = [
  {
    slug: "sepide",
    name: "شومیز سپیده",
    category: "blouse",
    price: 1890000,
    oldPrice: 2290000,
    description:
      "شومیز سپیده با پارچه‌ای لطیف از کتان و برشی آزاد، برای آن لحظه‌هایی که می‌خواهی ساده و درخشان باشی. یقه‌ی هفتِ نرم و آستین‌های پفی، حال و هوای روزهای اول بهار را به تنت می‌آورند.",
    details: [
      "یقه هفت با دکمه‌های مرواریدی",
      "آستین پفی با سرآستین کشی",
      "قد: ۶۲ سانتی‌متر",
      "برش آزاد و راحت",
    ],
    fabrics: ["۶۵٪ پنبه", "۳۰٪ ویسکوز", "۵٪ الاستان"],
    colors: [
      { name: "رز دودی", hex: "#B98A7D" },
      { name: "شنی", hex: "#CBB9A8" },
      { name: "کرم", hex: "#EDE7DD" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("sepide"),
    accent: "#B98A7D",
    collection: "spring",
    featured: true,
    isNew: true,
  },
  {
    slug: "maah",
    name: "شومیز ماه",
    category: "blouse",
    price: 1450000,
    description:
      "شومیز ماه، انتخابی همیشه‌خوب برای روزهای خاکستری؛ پارچه‌ای کرم با بافت نخی و برشی که با هر بدن هماهنگ می‌شود. آرام، دقیق و بی‌تکلف.",
    details: ["یقه گرد با سرآستین دکمه‌دار", "چاک ریز پشت", "قد: ۵۸ سانتی‌متر"],
    fabrics: ["۱۰۰٪ کتان"],
    colors: [
      { name: "شنی", hex: "#CBB9A8" },
      { name: "سفید نرم", hex: "#F3EEE6" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("maah"),
    accent: "#CBB9A8",
    collection: "summer",
  },
  {
    slug: "shida",
    name: "شومیز شیدا",
    category: "blouse",
    price: 1520000,
    description:
      "شومیز شیدا با رنگ خاکستری-آبیِ ملایم، آن تک‌تکه‌ی معدودی است که با همه‌ی کمدت می‌نشیند. از جنس ساتنِ کدر با درخششی خاموش و لطیف.",
    details: ["یقه گرد ساده", "آستین بلند با چاک", "قد: ۶۰ سانتی‌متر"],
    fabrics: ["۶۰٪ ساتن ویسکوز", "۴۰٪ پنبه"],
    colors: [
      { name: "خاکستری آبی", hex: "#8E94A6" },
      { name: "سنگ", hex: "#A9A69E" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("shida"),
    accent: "#8E94A6",
    collection: "autumn",
    isNew: true,
  },
  {
    slug: "taraneh",
    name: "شومیز ترانه",
    category: "blouse",
    price: 1390000,
    description:
      "شومیز ترانه از پارچه‌ی ابریشمی-پنبه با بافت ریز؛ ساده‌ای که در عین سادگی خودش را نشان می‌دهد. رنگ عاج گرمِ آن، روشن‌ترین نور ممکن برای هر استایلی است.",
    details: ["یقه هفت عمیق", "دکمه‌های صدفی", "قد: ۵۷ سانتی‌متر"],
    fabrics: ["۵۵٪ ابریشم مصنوعی", "۴۵٪ پنبه"],
    colors: [
      { name: "عاج گرم", hex: "#DDCDBD" },
      { name: "کرم", hex: "#EDE7DD" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("taraneh"),
    accent: "#DDCDBD",
    collection: "spring",
    isNew: true,
  },
  {
    slug: "nasim",
    name: "پیراهن نسیم",
    category: "dress",
    price: 2350000,
    oldPrice: 2650000,
    description:
      "پیراهن نسیم با دامنی رها و رنگی از سبزِ مریم‌گلی؛ درست مثل اسمش، سبک و تازه. پارچه‌ی لطیف لی، با هر نسیم می‌رقصد و در هر مهمانیِ روز، ستاره‌ی کمد توست.",
    details: [
      "دامن گشاد و قد بلند",
      "کمر جمع‌شونده",
      "قد: ۱۱۵ سانتی‌متر",
      "قابل پوشیدن با کمربند",
    ],
    fabrics: ["۸۰٪ لیوسل", "۲۰٪ پنبه"],
    colors: [
      { name: "مریم‌گلی", hex: "#9AA18B" },
      { name: "شنی", hex: "#CBB9A8" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("nasim"),
    accent: "#9AA18B",
    collection: "spring",
    featured: true,
    isNew: true,
  },
  {
    slug: "ghazal",
    name: "پیراهن غزل",
    category: "dress",
    price: 1980000,
    description:
      "پیراهن غزل با رنگ مه‌آلودِ آبی و سیلوئتی روان، برای عصرهایی که می‌خواهی متفاوت باشی؛ ظرافتِ یک پیراهن کلاسیک در مدلی کاملاً مدرن.",
    details: ["دامن کلوش", "آستین پفی کوتاه", "قد: ۱۱۰ سانتی‌متر"],
    fabrics: ["۷۰٪ ویسکوز", "۳۰٪ پلی‌استر"],
    colors: [
      { name: "آبی مه", hex: "#A9B2B8" },
      { name: "سنگ", hex: "#A9A69E" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("ghazal"),
    accent: "#A9B2B8",
    collection: "summer",
  },
  {
    slug: "delara",
    name: "پیراهن دلارا",
    category: "dress",
    price: 2150000,
    oldPrice: 2450000,
    description:
      "پیراهن دلارا با رنگِ رزِ شنی و پارچه‌ای که مثل آب می‌ریزد؛ برای آن قرارهایی که تا نیمه‌شب ادامه پیدا می‌کنند و تو هنوز می‌درخشی.",
    details: ["یقه هفت لطیف", "پشت باز با گره", "قد: ۱۱۲ سانتی‌متر"],
    fabrics: ["۹۰٪ ساتن", "۱۰٪ الاستان"],
    colors: [
      { name: "رز شنی", hex: "#C9A79A" },
      { name: "رز دودی", hex: "#B98A7D" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("delara"),
    accent: "#C9A79A",
    collection: "summer",
    featured: true,
    isNew: true,
  },
  {
    slug: "raha",
    name: "شلوار رها",
    category: "trousers",
    price: 1290000,
    description:
      "شلوار رها با پاچه‌های پهن و کمری که تا می‌خورد، الگویی بی‌عیب برای تمام روزهای شلوغ است. راحت، تمیز و بی‌نقص با هر تاپ.",
    details: ["فاق بلند", "کمر کشی به‌همراه بند", "قد: ۱۰۵ سانتی‌متر"],
    fabrics: ["۷۵٪ ویسکوز", "۲۵٪ پنبه"],
    colors: [
      { name: "طوسی", hex: "#A79B8C" },
      { name: "رز شنی", hex: "#C9A79A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("raha"),
    accent: "#A79B8C",
    collection: "spring",
    featured: true,
  },
  {
    slug: "aram",
    name: "شلوار آرام",
    category: "trousers",
    price: 1180000,
    description:
      "شلوار آرام؛ از جنس سنگِ صاف و رنگ‌های خاکیِ واقعی. برشی مستقیم که نه چسبان است نه گشاد؛ درست همان تعادلی که دنبالش بودی.",
    details: ["برش راسته", "جیب‌های اریب", "قد: ۹۸ سانتی‌متر"],
    fabrics: ["۹۵٪ پنبه", "۵٪ الاستان"],
    colors: [
      { name: "سنگ", hex: "#A9A69E" },
      { name: "خاکی", hex: "#9B9A94" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("aram"),
    accent: "#A9A69E",
    collection: "summer",
  },
  {
    slug: "sara",
    name: "شلوار سارا",
    category: "trousers",
    price: 1240000,
    description:
      "شلوار سارا با رنگ طوسیِ خنثی، گزینه‌ی امنِ روزهای مهم است. پارچه‌ای مقاوم با درخشش کم که سال‌ها بعد هم نو به نظر می‌رسد.",
    details: ["کمر صاف", "چین پاچه", "قد: ۱۰۲ سانتی‌متر"],
    fabrics: ["۶۵٪ پلی‌استر", "۳۵٪ ویسکوز"],
    colors: [
      { name: "طوسی", hex: "#9B9A94" },
      { name: "خاکی", hex: "#8B8577" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("sara"),
    accent: "#9B9A94",
    collection: "autumn",
  },
  {
    slug: "mehr",
    name: "کت مهر",
    category: "coat",
    price: 3950000,
    description:
      "کت مهر، همراهِ ساده‌ی فصل‌های سرد. پارچه‌ای سنگین با وزن درست، یقه‌ای که تا گلو بالا می‌آید و رنگی که با همه‌چیز می‌نشیند؛ سرمایه‌گذاری‌ای برای سال‌ها.",
    details: ["یقه انگلیسی", "آستر ساتن", "قد: ۹۰ سانتی‌متر"],
    fabrics: ["۸۵٪ پشم", "۱۵٪ ویسکوز"],
    colors: [
      { name: "گِریژ", hex: "#B3A896" },
      { name: "رز دودی", hex: "#B98A7D" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("mehr"),
    accent: "#B3A896",
    collection: "autumn",
    featured: true,
  },
  {
    slug: "pegah",
    name: "مانتو پگاه",
    category: "coat",
    price: 2690000,
    description:
      "مانتو پگاه با رنگِ رُزِ کمرنگِ سپیده‌دم؛ لایه‌ی نرمِ روزهای بهاری. از جنس کشمیر با خطوطی پاک، سبک و کم‌وزن.",
    details: ["یقه گرد", "جیب‌های جادار", "قد: ۷۵ سانتی‌متر"],
    fabrics: ["۷۰٪ کشمیر", "۳۰٪ نایلون"],
    colors: [
      { name: "رز کمرنگ", hex: "#D5B8AC" },
      { name: "عاج گرم", hex: "#DDCDBD" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("pegah"),
    accent: "#D5B8AC",
    collection: "autumn",
  },
  {
    slug: "ava",
    name: "کت آوا",
    category: "coat",
    price: 3490000,
    description:
      "کت آوا با برش بلند و سیلوئت صاف، همان ظاهری را دارد که همیشه در فروشگاه‌ها دنبالش بوده‌ای؛ بدون اضافه‌کاری، فقط تمیز و کامل.",
    details: ["برش صاف و بلند", "یقه بیلبورد", "قد: ۹۵ سانتی‌متر"],
    fabrics: ["۸۰٪ پلی‌استر", "۲۰٪ ویسکوز"],
    colors: [
      { name: "قهوه‌ای خاکی", hex: "#8B8577" },
      { name: "گِریژ", hex: "#B3A896" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("ava"),
    accent: "#8B8577",
    collection: "autumn",
  },
  {
    slug: "tooba",
    name: "ست طوبا",
    category: "set",
    price: 2890000,
    description:
      "ست طوبا، یک تاپ کراپِ شیک و یک شلوار همرنگ؛ دو تکه که با هم یک پوشش کامل‌اند و هرکدام جدا، دنیای خودشان را دارند.",
    details: ["ست دو تکه", "تاپ کراپ با آستین پفی", "شلوار با کمر کشی"],
    fabrics: ["۸۵٪ ویسکوز", "۱۵٪ پنبه"],
    colors: [
      { name: "سفال", hex: "#B48A76" },
      { name: "شنی", hex: "#CBB9A8" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("tooba"),
    accent: "#B48A76",
    collection: "autumn",
    featured: true,
  },
  {
    slug: "nora",
    name: "ست نورا",
    category: "set",
    price: 2750000,
    description:
      "ست نورا در رنگ زیتونیِ کمرنگ؛ فرمی نرم و بدون خط، برای روزهایی که راحتی را با استایل می‌خواهی.",
    details: ["ست دو تکه", "تاپ یقه هفت", "شلوار فاق بلند"],
    fabrics: ["۹۰٪ لیوسل", "۱۰٪ الاستان"],
    colors: [
      { name: "زیتونی", hex: "#A9A68B" },
      { name: "مریم‌گلی", hex: "#9AA18B" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("nora"),
    accent: "#A9A68B",
    collection: "autumn",
    isNew: true,
  },
  {
    slug: "yalda",
    name: "ست یلدا",
    category: "set",
    price: 3100000,
    description:
      "ست یلدا با رنگ یاسیِ خاکی و پارچه‌ای که به آرامی روی بدن می‌نشیند؛ برای شب‌های بلند یلدا و قصه‌هایش.",
    details: ["ست دو تکه", "تاپ کشباف", "دامن بلند"],
    fabrics: ["۷۰٪ ویسکوز", "۳۰٪ پنبه"],
    colors: [
      { name: "یاسی خاکی", hex: "#B79BA8" },
      { name: "رز شنی", hex: "#C9A79A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    art: art("yalda"),
    accent: "#B79BA8",
    collection: "autumn",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCollectionProducts(slug: CollectionSlug): Product[] {
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return [];
  return collection.productSlugs
    .map((s) => getProduct(s))
    .filter((p): p is Product => Boolean(p));
}

export function getRelatedProducts(product: Product): Product[] {
  return PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(PRODUCTS.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, 4);
}

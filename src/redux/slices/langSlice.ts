import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '@/types';

export const DICTIONARY = {
  en: {
    nav: {
      findCreators: 'Find Creators',
      forBrands: 'For Brands',
      forCreators: 'For Creators',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      faq: 'FAQ',
      login: 'Log in',
      getStarted: 'Get Started',
      brandWorkspace: 'Brand Workspace',
      creatorWorkspace: 'Creator Workspace',
      joinAsCreator: 'Join as a Creator',
    },
    hero: {
      tagline: 'REAL CREATORS. REAL IMPACT.',
      title: 'The right creators for your brand.',
      subtitle:
        'Discover, collaborate and grow with verified creators across all platforms — in one place.',
      searchPlaceholder: 'Search creators, keywords, or niches...',
      allCategories: 'All Categories',
      allPlatforms: 'All Platforms',
      findCreatorsBtn: 'Find Creators',
      joinAsCreatorLink: 'Join as a Creator →',
      reachBadge: '10,000,000+ Reach Across Creators',
    },
    discovery: {
      title: 'Discover amazing creators',
      subtitle: 'Find the right creators to bring your brand to life — across all platforms and niches.',
      searchPlaceholder: 'Search creators, keywords or niches...',
    },
    valueProps: {
      title: 'Everything you need.\nIn one place.',
    },
    featured: {
      title: 'Featured Creators',
      subtitle: 'Discover talented creators across different niches.',
      viewAll: 'View all creators',
      viewProfile: 'View Profile →',
      from: 'from',
    },
    collab: {
      title: 'Two ways to partner with creators.',
      subtitle: 'Choose whether you want high-performing raw ad creative or direct access to a dedicated follower base.',
      contentCreationTitle: 'Content Creation (UGC)',
      sponsoredPostingTitle: 'Sponsored Posting',
    },
    howItWorks: {
      title: 'How Influverse Works',
      subtitle: 'A seamless, protected four-step workflow built on transparent escrow and verified delivery.',
    },
    pricing: {
      title: 'Transparent, Pay-Per-Campaign Pricing',
      subtitle: 'No monthly software lock-ins. We charge a flat 15% marketplace escrow fee to brands on successful creator hires.',
    },
    creatorInvite: {
      title: 'Turn your passion into predictable brand deals.',
      subtitle: 'Join thousands of verified creators monetizing their content. Set your own prices in EUR, receive upfront funded offers, and never chase unpaid invoices again.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about booking creators, escrow protection, and deliverables.',
    },
  },
  de: {
    nav: {
      findCreators: 'Creator finden',
      forBrands: 'Für Marken',
      forCreators: 'Für Creator',
      howItWorks: 'So funktioniert es',
      pricing: 'Preise',
      faq: 'FAQ',
      login: 'Anmelden',
      getStarted: 'Kostenlos starten',
      brandWorkspace: 'Marken-Bereich',
      creatorWorkspace: 'Creator-Bereich',
      joinAsCreator: 'Als Creator beitreten',
    },
    hero: {
      tagline: 'ECHTE CREATOR. ECHTER IMPACT.',
      title: 'Die passenden Creator für Ihre Marke.',
      subtitle:
        'Entdecken, kooperieren und wachsen Sie mit verifizierten Creatorn auf allen Plattformen — an einem Ort.',
      searchPlaceholder: 'Creator, Keywords oder Nischen suchen...',
      allCategories: 'Alle Kategorien',
      allPlatforms: 'Alle Plattformen',
      findCreatorsBtn: 'Creator finden',
      joinAsCreatorLink: 'Als Creator beitreten →',
      reachBadge: '10.000.000+ Gesamtreichweite',
    },
    discovery: {
      title: 'Großartige Creator entdecken',
      subtitle: 'Finden Sie die passenden Talente für Ihre Markenbotschaft — über alle Plattformen hinweg.',
      searchPlaceholder: 'Creator, Keywords oder Nischen suchen...',
    },
    valueProps: {
      title: 'Alles, was Sie brauchen.\nAn einem Ort.',
    },
    featured: {
      title: 'Ausgewählte Creator',
      subtitle: 'Entdecken Sie talentierte Creator aus verschiedenen Nischen.',
      viewAll: 'Alle Creator anzeigen',
      viewProfile: 'Profil ansehen →',
      from: 'ab',
    },
    collab: {
      title: 'Zwei Wege der Kooperation.',
      subtitle: 'Wählen Sie zwischen hochkonvertierendem UGC-Werbematerial und gesponserten Posts.',
      contentCreationTitle: 'Content-Erstellung (UGC)',
      sponsoredPostingTitle: 'Gesponserter Post',
    },
    howItWorks: {
      title: 'So funktioniert Influverse',
      subtitle: 'Ein transparenter, durch Treuhand geschützter 4-Schritte-Ablauf mit verifizierter Abnahme.',
    },
    pricing: {
      title: 'Transparente Preisgestaltung pro Kampagne',
      subtitle: 'Keine Abofallen. Feste 15% Treuhandgebühr für Marken bei erfolgreicher Buchung.',
    },
    creatorInvite: {
      title: 'Verwandeln Sie Kreativität in planbare Markenverträge.',
      subtitle: 'Schließen Sie sich tausenden verifizierten Creatorn an. Bestimmen Sie Ihre EUR-Preise selbst und erhalten Sie vorab finanzierte Angebote.',
    },
    faq: {
      title: 'Häufig gestellte Fragen',
      subtitle: 'Alles Wissenswerte über Creator-Buchungen, Treuhandschutz und Abnahmeprozesse.',
    },
  },
};

export type Translations = typeof DICTIONARY.en;

interface LangState {
  currentLang: Language;
  t: Translations;
}

const initialState: LangState = {
  currentLang: 'en',
  t: DICTIONARY.en,
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLang = action.payload;
      state.t = DICTIONARY[action.payload] || DICTIONARY.en;
    },
    toggleLanguage: (state) => {
      const nextLang = state.currentLang === 'en' ? 'de' : 'en';
      state.currentLang = nextLang;
      state.t = DICTIONARY[nextLang] || DICTIONARY.en;
    },
  },
});

export const { setLanguage, toggleLanguage } = langSlice.actions;
export default langSlice.reducer;

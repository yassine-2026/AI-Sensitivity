import { useAppStore } from '@/store';
import { translations, TranslationKey } from '@/utils/i18n';

export const useTranslation = () => {
  const { language } = useAppStore();

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return { t, language };
};

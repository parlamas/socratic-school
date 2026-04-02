//src/app/grammar/types/index.ts

export interface Language {
  name: string;
  sections: string[];
}

export interface SymposiumPageProps {}

export interface LanguageBlockProps {
  language: Language;
  langIndex: number;
  currentSection: number;
  isSwelled: boolean;
  onSwell: (index: number) => void;
  onRetreat: (index: number) => void;
  isSingleView: boolean;
}

export interface SectionPaginationProps {
  currentSection: number;
  totalSections: number;
  onPrevSection: () => void;
  onNextSection: () => void;
  onGoToSection: (index: number) => void;
}
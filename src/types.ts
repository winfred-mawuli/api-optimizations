export interface Slide {
  title: string;
  subtitle?: string;
  duration: string;
  objectives?: string[];
  content: SlideContent[];
}

export type SlideContent = 
  | string
  | CodeContent
  | ListContent
  | ComparisonContent
  | BenefitContent
  | WarningContent
  | TipContent
  | TableContent;

export interface CodeContent {
  type: 'code';
  code: string;
  language?: string;
}

export interface ListContent {
  type: 'list';
  items: string[];
}

export interface ComparisonContent {
  type: 'comparison';
  bad: {
    title: string;
    code?: string;
    description?: string;
  };
  good: {
    title: string;
    code?: string;
    description?: string;
  };
}

export interface BenefitContent {
  type: 'benefit';
  text: string;
}

export interface WarningContent {
  type: 'warning';
  text: string;
}

export interface TipContent {
  type: 'tip';
  text: string;
}

export interface TableContent {
  type: 'table';
  headers: string[];
  rows: string[][];
}
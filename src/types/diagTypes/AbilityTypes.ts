interface AbilityTypes {
  cdId: string;
  cdNm: string;
  cdDesc?: string;
  upCdId?: string;
  cdDiv?: string;
  children?: AbilityTypes[];
}

export type { AbilityTypes };

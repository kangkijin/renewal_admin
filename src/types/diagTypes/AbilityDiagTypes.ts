/** C: 핵심역량 / P: 교수역량 / M: 전공능력 */
type abilityCategory = "C" | "P" | "M" | null;

/** A: 평균 / S: 합 */
type abilityCalcDiv = "A" | "S" | null;

interface AbilityDiagMngTypes {
  damId: number;
  damTitle: string;
  damAbilityCategory: abilityCategory;
  dapId: number;
  diagActTarget: string;
  frgnYn: ynTypes;
  damStrDate: Date;
  damEndDate: Date;
  regId: string;
  regDate: Date;
  updId?: string | null;
  updDate?: Date | null;
  useYn: ynTypes;
  delYn: ynTypes;
}

/** 진단지 정보 */
interface AbilityDiagPaperTypes {
  /** 진단지 ID */
  dapId: number | null;
  /** 진단지 명 */
  dapTitle: string;
  /** 페이지 당 출력 문항 수 */
  dapViewCnt: number | "n" | null;
  /** 페이지 당 출력 문항 수 n개 선택 시 값 */
  perPageCnt: number;
  /** 점수 산정 방식 */
  dapCalcDiv: abilityCalcDiv;
  /** 역량 종류 C/P/M */
  dapAbilityCategory: abilityCategory;
  /** 진단지 안내 */
  dapGuide?: string;
  /** 문항 배점 */
  dapScore: number | null;
  /** 문항 당 척도 수 */
  dapAnsCnt: number;
  /** 문항 보기 */
  dapAnsInfo: AbilityDiagAnsInfoTypes[];
  /** 등록자 */
  regId?: string;
  /** 등록일 */
  regDate?: Date;
  /** 수정자 */
  updId?: string | null;
  /** 수정일 */
  updDate?: Date | null;
  /** 사용여부 */
  useYn?: ynTypes;
  /** 삭제여부 */
  delYn?: ynTypes;
}

/**
 * 문항 보기 정보
 * @comment DB에는 title과 score가 합쳐져서 들어간다 (구분자 "|")
 */
interface AbilityDiagAnsInfoTypes {
  /** 문항 보기별 내용 */
  dapAnsTitle: string | null;
  /** 문항 보기별 점수 */
  dapAnsScore: number | null;
}

interface AbilityDiagQusTypes {
  daqId: number | null;
  dapId: number | null;
  daqTitle: string;
  daqScore: string | null;
  daqOrder: number;
  upAbilityCd: string;
  abilityCd: string;
  rvrsYn: ynTypes;
  regId?: string;
  regDate?: Date;
}

interface AbilityDiagQusExcelForm {
  upAbilityCd: string;
  abilityCd: string;
  daqTitle: string;
  rvrsYn: ynTypes;
}

export type {
  AbilityDiagMngTypes,
  AbilityDiagPaperTypes,
  AbilityDiagQusTypes,
  AbilityDiagQusExcelForm,
  AbilityDiagAnsInfoTypes,
};

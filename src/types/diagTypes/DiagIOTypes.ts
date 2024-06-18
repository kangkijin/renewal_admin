export interface AnsOuputTypes {
  /** 문항 답변 명 */
  title: string;
  /** 문항 답변 별 점수 */
  score?: number;
  /** 문항 답변 순서 */
  order: number;
  /** 분기형 문항 연계페이지 */
  relationPage?: number | null;
  /** 문항 답변 이미지 */
  img?: string;
}

/**
 * 문항 구분
 * CHOICE 객관식 | OPEN 주관식 | SCALE 척도형 | BRANCH 분기
 */
export type qusTypes = "CHOICE" | "OPEN" | "SCALE" | "BRANCH";

/**
 * 문항 답변 상태 구분
 * null 미체크 | checked 체크 | correct 정답 | wrong 오답 | cancel 취소
 */
type ansStatus = null | "checked" | "correct" | "wrong" | "cancel";

export interface QusOutputTypes {
  /** 문항 타입 */
  type: qusTypes | null;
  /** 문항 명 */
  title: string;
  /** 문항 힌트 */
  hint?: string;
  /** 문항 번호 */
  order: number;
  /** 문항이 속한 페이지 */
  pageNo: number;
  /** 문항 별 점수 */
  score?: number;
  /** 문항 답변 중복 허용여부 */
  multiYn: ynTypes;
  /** 문항 이미지 */
  img?: string;
  // /** 문항 답변 상태 */
  ansSts?: ansStatus;
  /** 문항의 답변 갯수 */
  ansCnt?: number;
  /** 문항 답변정보 */
  ansInfo: AnsOuputTypes[];
}

/**
 * 연계 구분
 * N 미연계 | S 연계 출발점 | T 연계 타겟
 */
type relatedType = "N" | "S" | "T";

export interface PaperOutputTypes {
  /** 연계페이지 여부 */
  relatedDiv: relatedType;
  /** 문항 정보 */
  qusInfo: QusOutputTypes[];
}

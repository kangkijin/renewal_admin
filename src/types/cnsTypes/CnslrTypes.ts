type cnslrInOutType = "내부" | "외부" | null;
export interface CnslrTypes {
  /** 상담사 ID */
  cnslrId: string;
  /** 상담사 내부 / 외부 구분 */
  cnslrInOut: cnslrInOutType;
  /** 상담사명 */
  cnslrNm: string;
  /** 상담사 연락처 */
  cnslrPh: string;
  /** 상담사 이메일 */
  cnslrEmail: string;
  /** 상담사 부서명 */
  cnslrDeptNm: string;
  /** 상담사 활동 여부 */
  cnslrActYn: string;
  /** 상담사 특이사항 */
  cnslrSgnfc: string;
}

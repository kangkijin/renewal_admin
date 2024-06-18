export interface userTypes {
  userId: string;
  korNm: string;
  engNm: string;
  colgCd: string;
  colgCdNm: string;
  hakguaCd: string;
  hakguaCdNm: string;
  majorCd: string;
  majorCdNm: string;
  gradeCd: string;
  gradeCdNm: string;
  shregSt: string;
  shregStNm: string;
  sexCd: string;
  sexCdNm: string;
  birthDt: string;
  email: string;
  ph: string;
  guideProfNm: string;
  guideProfNo: string;
  entrDt: string;
  grdtDt: string;
  telNo: string;
  adr: string;
  grdtYn: ynTypes;
  grdtYear: string;
  credit: string;
  frgnYn: ynTypes;
  handicapYn: ynTypes;
}

export interface stfTypes {
  stfId: string;
  korNm: string;
  stfDivCd: string;
  stfDiv: string;
  stfPstnCd: string;
  stfPstnNm: string;
  deptCd: string;
  deptNm: string;
  telNo: string;
  ph: string;
  email: string;
  useFg: string;
  sexCd: string;
  sexCdNm: string;
}

export interface deptTypes {
  deptCd: string;
  deptKorNm: string;
  fullDeptNm: string;
  deptDiv: string;
  upDeptCd: string;
  useFg: string;
  useFgNm: string;
}

export interface sbjtTypes {
  sbjtKeyId: string;
  sbjtKorNm: string;
  sbjtEngNm: string;
  sbjtCredit: string;
  sbjtTypeCd: string;
  sbjtTypeNm: string;
  colgCd: string;
  colgCdNm: string;
  hakguaCd: string;
  hakguaCdNm: string;
  sbjtAbilityCdId1: string;
  sbjtAbilityCdId2: string;
  sbjtAbilityCdId3: string;
  sbjtProfNo: string;
  sbjtProfName: string;
  sbjtYear: string;
  sbjtTerm: string;
}

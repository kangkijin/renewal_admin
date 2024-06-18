const StringUtil = {
  /** String이 비어있는지 검증 */
  isEmpty(item?: string) {
    let sts = false;
    if (item === null || item === undefined || item === "") {
      sts = true;
    }
    return sts;
  },

  /** 2차원 String Array를 Json Array로 변환 */
  r2StringToJsonArr(r2String: string[][], mapper: string[]) {
    const returnArr = [] as Array<Record<string, string>>;

    r2String.forEach((item) => {
      const record = {} as Record<string, string>;
      item.forEach((data, idx) => {
        record[mapper[idx]] = data;
      });
      returnArr.push(record);
    });

    return returnArr;
  },
};

export default StringUtil;

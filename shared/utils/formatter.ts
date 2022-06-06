/**
 * @param {number} 1000
 * @return {string} '1,000'
 */
const commaNumber = (value: number) => {
  return value ? value.toLocaleString() : '0';
};

export { commaNumber };

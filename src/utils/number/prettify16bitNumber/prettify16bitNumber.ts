function prettify16bitNumber(number: number): string {
  return `0x${number.toString(16).padStart(4, '0')}`;
}

export default prettify16bitNumber;

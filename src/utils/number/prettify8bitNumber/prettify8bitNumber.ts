function prettify8bitNumber(number: number): string {
  return `0x${number.toString(16).padStart(2, '0')}`;
}

export default prettify8bitNumber;

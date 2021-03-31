import InstructionSize from './instructionSize';

describe('InstructionSize constant', () => {
  test('should be defined', () => {
    expect(InstructionSize).toBeDefined();
  });

  test('should be 2 for 16 bit command', () => {
    expect(InstructionSize).toEqual(2);
  });
});

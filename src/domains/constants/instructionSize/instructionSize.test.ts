import InstructionSize from './instructionSize';

describe('InstructionSize constant', () => {
  test('should be defined', () => {
    expect(InstructionSize).toBeDefined();
  });

  test('should be equal to 1', () => {
    expect(InstructionSize).toEqual(1);
  });
});

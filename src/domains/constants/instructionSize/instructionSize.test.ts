import {
  InstructionSize,
  InstructionSizeInBits,
  InstructionSizeInBytes,
} from './instructionSize';

describe('InstructionSize constant', () => {
  test('should be defined', () => {
    expect(InstructionSize).toBeDefined();
  });

  test('should be 2 for 16 bit command', () => {
    expect(InstructionSize).toEqual(2);
  });

  test('InstructionSizeInBits should be 16 for 16 bit command', () => {
    expect(InstructionSizeInBits).toEqual(16);
  });

  test('InstructionSizeInBytes should be 2 for 16 bit command', () => {
    expect(InstructionSizeInBytes).toEqual(2);
  });
});

import { Instruction, InstructionSize } from './instruction.constant';

describe('Instruction constant', () => {
  test('InstructionSize for 16 bit command should be 2', () => {
    expect(InstructionSize).toBeDefined();
    expect(InstructionSize).toEqual(2);
  });

  test('Instruction should be a valid 16 bit numbers', () => {
    const enumValues = Object.values(Instruction);
    const numberEnumValues = enumValues.filter((value) =>
      Number(value)
    ) as Instruction[];

    expect(numberEnumValues.length).toEqual(enumValues.length / 2);
    expect(numberEnumValues.every((num) => num >= 0 && num <= 255)).toBe(true);
  });
});

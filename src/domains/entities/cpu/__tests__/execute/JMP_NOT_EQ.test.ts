import { Instruction, Register } from 'domains/constants';
import { MemoryEntity, CPUEntity } from 'domains/entities';

describe('CPU JMP_NOT_EQ instruction execution', () => {
  test('should jump IP to address when ACC value not equal with literal value', () => {
    const memory = new MemoryEntity(8);
    const writableBytes = new Uint8Array(memory.buffer);

    let i = 0;

    writableBytes[i] = Instruction.JMP_NOT_EQ;
    writableBytes[(i += 1)] = 0x00;
    writableBytes[(i += 1)] = 0x00;
    writableBytes[(i += 1)] = 0x00;
    writableBytes[(i += 1)] = 0x08;

    const CPU = new CPUEntity(memory);

    CPU.setRegisterValue(Register.ACC, 0x0100);
    CPU.step();

    expect(CPU.getRegisterValue(Register.IP)).toEqual(0x0008);
  });

  test('should not jump IP to address when ACC equal with literal value', () => {
    const memory = new MemoryEntity(8);
    const writableBytes = new Uint8Array(memory.buffer);

    let i = 0;

    writableBytes[i] = Instruction.JMP_NOT_EQ;
    writableBytes[(i += 1)] = 0x01;
    writableBytes[(i += 1)] = 0x00;
    writableBytes[(i += 1)] = 0x00;
    writableBytes[(i += 1)] = 0x08;

    const CPU = new CPUEntity(memory);

    CPU.setRegisterValue(Register.ACC, 0x0100);
    CPU.step();

    expect(CPU.getRegisterValue(Register.IP)).toEqual(0x0005);
  });
});

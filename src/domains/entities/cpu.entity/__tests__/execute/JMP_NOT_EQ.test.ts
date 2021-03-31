import { Instruction } from 'domains/constants/instruction';
import { Register } from 'domains/constants/register';
import { MemoryEntity } from 'domains/entities/memory.entity';
import { CPUEntity } from 'domains/entities/cpu.entity';

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

    CPU.setRegister(Register.ACC, 0x0100);
    CPU.step();

    expect(CPU.getRegister(Register.IP)).toEqual(0x0008);
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

    CPU.setRegister(Register.ACC, 0x0100);
    CPU.step();

    expect(CPU.getRegister(Register.IP)).toEqual(0x0005);
  });
});

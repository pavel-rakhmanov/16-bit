import { Instruction } from 'domains/constants/instruction';
import { Register } from 'domains/constants/register';
import { MemoryEntity } from 'domains/entities/memory.entity';
import { CPUEntity } from 'domains/entities/cpu.entity';

const MEMORY = new MemoryEntity(8);
const WRITABLE_BYTES = new Uint8Array(MEMORY.buffer);

let i = 0;

WRITABLE_BYTES[i] = Instruction.ADD_REG_REG;
WRITABLE_BYTES[(i += 1)] = Register.R1;
WRITABLE_BYTES[(i += 1)] = Register.R2;

const CPU = new CPUEntity(MEMORY);

CPU.setRegister(Register.R1, 0x0100);
CPU.setRegister(Register.R2, 0x0100);
CPU.step();

describe('CPU ADD_REG_REG instruction execution', () => {
  test('registers value should be summed up in ACC register', () => {
    expect(CPU.getRegister(Register.ACC)).toEqual(0x0200);
  });
});

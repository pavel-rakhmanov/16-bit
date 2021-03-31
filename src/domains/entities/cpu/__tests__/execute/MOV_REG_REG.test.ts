import { Instruction, Register } from 'domains/constants';
import { MemoryEntity, CPUEntity } from 'domains/entities';

const MEMORY = new MemoryEntity(8);
const WRITABLE_BYTES = new Uint8Array(MEMORY.buffer);

let i = 0;

WRITABLE_BYTES[i] = Instruction.MOV_REG_REG;
WRITABLE_BYTES[(i += 1)] = Register.R1;
WRITABLE_BYTES[(i += 1)] = Register.R2;

const CPU = new CPUEntity(MEMORY);

CPU.setRegister(Register.R1, 0x0100);
CPU.step();

describe('CPU MOV_REG_REG instruction execution', () => {
  test('register value should be moved to register', () => {
    expect(CPU.getRegister(Register.R2)).toEqual(0x0100);
  });
});

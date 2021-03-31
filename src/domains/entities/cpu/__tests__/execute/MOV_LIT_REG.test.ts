import { Instruction, Register } from 'domains/constants';
import { MemoryEntity, CPUEntity } from 'domains/entities';

const MEMORY = new MemoryEntity(8);
const WRITABLE_BYTES = new Uint8Array(MEMORY.buffer);

let i = 0;

WRITABLE_BYTES[i] = Instruction.MOV_LIT_REG;
WRITABLE_BYTES[(i += 1)] = 0x01;
WRITABLE_BYTES[(i += 1)] = 0x00;
WRITABLE_BYTES[(i += 1)] = Register.R1;

const CPU = new CPUEntity(MEMORY);

CPU.step();

describe('CPU MOV_LIT_REG instruction execution', () => {
  test('literal value should be moved to register', () => {
    expect(CPU.getRegister(Register.R1)).toEqual(0x0100);
  });
});

import { Instruction, Register } from 'domains/constants';
import { MemoryEntity, CPUEntity } from 'domains/entities';

const MEMORY = new MemoryEntity(8);
const WRITABLE_BYTES = new Uint8Array(MEMORY.buffer);

let i = 0;

WRITABLE_BYTES[i] = Instruction.ADD_REG_REG;
WRITABLE_BYTES[(i += 1)] = Register.R1;
WRITABLE_BYTES[(i += 1)] = Register.R2;

const CPU = new CPUEntity(MEMORY);

CPU.setRegisterValue(Register.R1, 0x0100);
CPU.setRegisterValue(Register.R2, 0x0100);
CPU.step();

describe('CPU ADD_REG_REG instruction execution', () => {
  test('registers value should be summed up in ACC register', () => {
    expect(CPU.getRegisterValue(Register.ACC)).toEqual(0x0200);
  });
});

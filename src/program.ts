import { MemoryEntity } from 'domains/entities';
import { Instruction, Register } from 'domains/constants';

const memory = new MemoryEntity(256 * 256);
const writableBytes = new Uint8Array(memory.buffer);

let i = 0;

writableBytes[i] = Instruction.MOV_MEM_REG;
writableBytes[(i += 1)] = 0x01;
writableBytes[(i += 1)] = 0x00;
writableBytes[(i += 1)] = Register.R1;

writableBytes[(i += 1)] = Instruction.MOV_LIT_REG;
writableBytes[(i += 1)] = 0x00;
writableBytes[(i += 1)] = 0x01;
writableBytes[(i += 1)] = Register.R2;

writableBytes[(i += 1)] = Instruction.MOV_REG_REG;
writableBytes[(i += 1)] = Register.R1;
writableBytes[(i += 1)] = Register.R2;

writableBytes[(i += 1)] = Instruction.MOV_REG_MEM;
writableBytes[(i += 1)] = Register.ACC;
writableBytes[(i += 1)] = 0x01;
writableBytes[(i += 1)] = 0x00;

writableBytes[(i += 1)] = Instruction.JMP_NOT_EQ;
writableBytes[(i += 1)] = 0x00;
writableBytes[(i += 1)] = 0x03;
writableBytes[(i += 1)] = 0x00;
writableBytes[(i += 1)] = 0x00;

export default memory;

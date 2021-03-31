/* eslint-disable no-plusplus */

import { MemoryEntity } from 'domains/entities/memory.entity';
import { Instruction, Register } from 'domains/constants';

const memory = new MemoryEntity(256 * 256);
const writableBytes = new Uint8Array(memory.buffer);

let i = 0;

writableBytes[i++] = Instruction.MOV_MEM_REG;
writableBytes[i++] = 0x01;
writableBytes[i++] = 0x00;
writableBytes[i++] = Register.R1;

writableBytes[i++] = Instruction.MOV_LIT_REG;
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x01;
writableBytes[i++] = Register.R2;

writableBytes[i++] = Instruction.ADD_REG_REG;
writableBytes[i++] = Register.R1;
writableBytes[i++] = Register.R2;

writableBytes[i++] = Instruction.MOV_REG_MEM;
writableBytes[i++] = Register.ACC;
writableBytes[i++] = 0x01;
writableBytes[i++] = 0x00;

writableBytes[i++] = Instruction.JMP_NOT_EQ;
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x03;
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x00;

export default memory;

import { Instruction, Register } from './domains/constants';
import { CPUEntity } from './domains/entities/cpu.entity';
import { MemoryEntity } from './domains/entities/memory.entity';

const memory = new MemoryEntity(256*256);
const writableBytes = new Uint8Array(memory.buffer);

let i = 0;

writableBytes[i += 1] = Instruction.MOV_LIT_REG;
writableBytes[i += 1] = 0x12;
writableBytes[i += 1] = 0x34;
writableBytes[i += 1] = Register.R1;

writableBytes[i += 1] = Instruction.MOV_LIT_REG;
writableBytes[i += 1] = 0xab;
writableBytes[i += 1] = 0xcd;
writableBytes[i += 1] = Register.R2;

writableBytes[i += 1] = Instruction.ADD_REG_REG;
writableBytes[i += 1] = Register.R1;
writableBytes[i += 1] = Register.R2;

writableBytes[i += 1] = Instruction.MOV_REG_MEM;
writableBytes[i += 1] = Register.ACC;
writableBytes[i += 1] = 0x01;
writableBytes[i += 1] = 0x00;

const cpu = new CPUEntity(memory);


for (let a = 0; a < i; a += 1) {
  console.log(`- [${a + 1}] tick -----------------------------------`)

  cpu.step();
  cpu.debug();
  cpu.viewMemoryAt(cpu.getRegister(Register.IP))
  cpu.viewMemoryAt(0x0100);
}

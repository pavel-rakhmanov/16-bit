import { Instruction } from './domains/constants/instruction';
import { CPUEntity } from './domains/entities/cpu.entity';
import { MemoryEntity } from './domains/entities/memory.entity';

const memory = new MemoryEntity(256);
const writableBytes = new Uint8Array(memory.buffer);

writableBytes[0] = Instruction.MOV_LIT_R1;
writableBytes[1] = 0x12;
writableBytes[2] = 0x34;

writableBytes[3] = Instruction.MOV_LIT_R2;
writableBytes[4] = 0xab;
writableBytes[5] = 0xcd;

writableBytes[6] = Instruction.ADD_REG_REG;
writableBytes[7] = 2;
writableBytes[8] = 3;

const cpu = new CPUEntity(memory);

for (let i = 0; i < 3; i += 1) {
  if (i === 0) {
    cpu.debug();
  }

  cpu.step();
  cpu.debug();
}

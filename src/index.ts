import { CPUEntity } from "./domains/entities/cpu.entity";
import { MemoryEntity } from "./domains/entities/memory.entity";

const memory = new MemoryEntity(256);
const cpu = new CPUEntity(memory);



import { CPUEntity } from './cpu.entity';
import { MemoryEntity } from '../memory.entity';

const memory = new MemoryEntity(256);
const CPU = new CPUEntity(memory);

// describe('CPU entity', () => {
//     // todo: memory limits
// });

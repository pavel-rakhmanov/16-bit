import { Register } from './domains/constants';
import { CPUEntity } from './domains/entities/cpu.entity';

import propgramm from './programm';

const cpu = new CPUEntity(propgramm);

console.log(`- [initial] step --------------------------------`)

cpu.debug();
cpu.viewMemoryAt(cpu.getRegister(Register.IP))
cpu.viewMemoryAt(0x0100);

for (let i = 0; i < 20; i += 1) {
  console.log(`- [${i + 1}] step ------------------------------------`)

  cpu.step();
  cpu.debug();
  cpu.viewMemoryAt(cpu.getRegister(Register.IP))
  cpu.viewMemoryAt(0x0100);
}

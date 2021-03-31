import { Register } from 'domains/constants';
import { CPUEntity } from 'domains/entities/cpu.entity';

import propgramm from './programm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline');

const cpu = new CPUEntity(propgramm);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

cpu.debug();
cpu.viewMemoryAt(cpu.getRegister(Register.IP));
cpu.viewMemoryAt(0x0100);

rl.on('line', () => {
  cpu.step();
  cpu.debug();
  cpu.viewMemoryAt(cpu.getRegister(Register.IP));
  cpu.viewMemoryAt(0x0100);
});

import { Register } from 'domains/constants';
import { CPUEntity } from 'domains/entities';

import program from './program';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline');

const cpu = new CPUEntity(program);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

cpu.debug();
program.printMemorySnapshot(cpu.getRegisterValue(Register.IP));
program.printMemorySnapshot(0x0100);

rl.on('line', () => {
  cpu.step();
  cpu.debug();
  program.printMemorySnapshot(cpu.getRegisterValue(Register.IP));
  program.printMemorySnapshot(0x0100);
});

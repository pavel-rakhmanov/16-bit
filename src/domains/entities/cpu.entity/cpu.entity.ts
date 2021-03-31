import {
  Register,
  Instruction,
  InstructionSize,
} from '../../constants';

import { MemoryEntity } from '../memory.entity';

export class CPUEntity {
  constructor(private readonly _memory: MemoryEntity) {
    this.memory = _memory;

    this.registers = Object.values(Register);

    this.registersMemory = new MemoryEntity(
      this.registers.length * InstructionSize
    );

    this.registersMap = this.registers.reduce((map, register, index) => {
      map.set(register, index * InstructionSize);

      return map;
    }, new Map());
  }

  private readonly memory: MemoryEntity;

  private readonly registers: Register[];

  private readonly registersMap: Map<Register, number>;

  private readonly registersMemory: MemoryEntity;

  private getRegister(register: Register): number {
    const registerIndexInMemory = this.registersMap.get(register);

    if (registerIndexInMemory === undefined) {
      throw new Error(`[CPU] getRegister: No such register "${register}"`);
    }

    return this.registersMemory.getUint16(registerIndexInMemory);
  }

  private setRegister(register: Register, value: number): void {
    const registerIndexInMemory = this.registersMap.get(register);

    if (registerIndexInMemory === undefined) {
      throw new Error(`[CPU] setRegister: No such register "${register}"`);
    }

    return this.registersMemory.setUint16(registerIndexInMemory, value);
  }

  private fetch8() {
    const nextInstructionAddress = this.getRegister(
      Register.InstructionPointer
    );
    const instruction = this.memory.getUint8(nextInstructionAddress);
    this.setRegister(Register.InstructionPointer, nextInstructionAddress + 1);

    return instruction;
  }

  private fetch16() {
    const nextInstructionAddress = this.getRegister(
      Register.InstructionPointer
    );
    const instruction = this.memory.getUint16(nextInstructionAddress);
    this.setRegister(Register.InstructionPointer, nextInstructionAddress + 2);

    return instruction;
  }

  private execute(instruction: number) {
    switch (instruction) {
      case Instruction.MOV_LIT_R1: {
        const literalValue = this.fetch16();
        this.setRegister(Register.R1, literalValue);

        break;
      }
      case Instruction.MOV_LIT_R2: {
        const literalValue = this.fetch16();
        this.setRegister(Register.R2, literalValue);

        break;
      }
      case Instruction.ADD_REG_REG: {
        const r1 = this.fetch8();
        const r2 = this.fetch8();
        const r1Value = this.registersMemory.getUint16(r1 * InstructionSize);
        const r2Value = this.registersMemory.getUint16(r2 * InstructionSize);

        this.setRegister(Register.Accumulator, r1Value + r2Value);

        break;
      }
      default: {
        break;
      }
    }
  }

  private takeRegistersSnapshot(): { register: Register; value: string }[] {
    return this.registers.map((register) => ({
      register,
      value: `0x${this.getRegister(register)
        .toString(InstructionSize * 8)
        .padStart(4, '0')}`,
    }));
  }

  public step(): void {
    const instruction = this.fetch8();

    return this.execute(instruction);
  }

  public debug(metaData?: unknown): void {
    if (metaData) {
      // eslint-disable-next-line no-console
      console.log(`meta: ${JSON.stringify(metaData)}`);
    }
    // eslint-disable-next-line no-console
    console.table(this.takeRegistersSnapshot());
  }
}

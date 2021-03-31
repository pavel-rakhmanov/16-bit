import {
  Register,
  Instruction,
  InstructionSize,
} from 'domains/constants';

import { MemoryEntity } from 'domains/entities/memory.entity';

export class CPUEntity {
  constructor(private readonly _memory: MemoryEntity) {
    this.memory = _memory;

    this.registers = Object.values(Register).reduce((acc: Register[], value) => {
      if (typeof value !== 'string') {
        acc.push(value);
      }

      return acc;
    }, []);

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

  getRegister(register: Register): number {
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
      Register.IP
    );
    const instruction = this.memory.getUint8(nextInstructionAddress);
    this.setRegister(Register.IP, nextInstructionAddress + 1);

    return instruction;
  }

  private fetch16() {
    const nextInstructionAddress = this.getRegister(
      Register.IP
    );
    const instruction = this.memory.getUint16(nextInstructionAddress);
    this.setRegister(Register.IP, nextInstructionAddress + 2);

    return instruction;
  }

  private execute(instruction: number) {
    switch (instruction) {
      case Instruction.MOV_LIT_REG: {
        const value = this.fetch16();
        const register = (this.fetch8() % this.registers.length) * 2;

        this.registersMemory.setUint16(register, value);

        break;
      }
      case Instruction.MOV_REG_REG: {
        const registerFrom = (this.fetch8() % this.registers.length) * 2;
        const registerTo = (this.fetch8() % this.registers.length) * 2;
        const value = this.registersMemory.getUint16(registerFrom);

        this.registersMemory.setUint16(registerTo, value);

        break;
      }
      case Instruction.MOV_REG_MEM: {
        const registerFrom = (this.fetch8() % this.registers.length) * 2;
        const address = this.fetch16();
        const value = this.registersMemory.getUint16(registerFrom);

        this.memory.setUint16(address, value);

        break;
      }
      case Instruction.MOV_MEM_REG: {
        const address = this.fetch16();
        const registerTo = (this.fetch8() % this.registers.length) * 2;
        const value = this.memory.getUint16(address);

        this.registersMemory.setUint16(registerTo, value);

        break;
      }
      case Instruction.ADD_REG_REG: {
        const r1 = this.fetch8();
        const r2 = this.fetch8();
        const r1Value = this.registersMemory.getUint16(r1 * InstructionSize);
        const r2Value = this.registersMemory.getUint16(r2 * InstructionSize);

        this.setRegister(Register.ACC, r1Value + r2Value);

        break;
      }
      case Instruction.JMP_NOT_EQ: {
        const value = this.fetch16();
        const address = this.fetch16();

        if (value !== this.getRegister(Register.ACC)) {
          this.setRegister(Register.IP, address)
        }

        break;
      }
      default: {
        break;
      }
    }
  }

  private takeRegistersSnapshot(): { register: string; value: string }[] {
    return this.registers.map((register) => ({
      register: Register[register],
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

  public viewMemoryAt(address: number): void {
    const next8Bytes = Array.from({ length: 8 }).map((_, index) => {
      const value = this.memory.getUint8(address + index);
      return `0x${value.toString(16).padStart(2, '0')}`
    });
    
    // eslint-disable-next-line no-console
    console.log(`0x${address.toString(16).padStart(4, '0')}: ${next8Bytes.join(' ')}`)
  }
}

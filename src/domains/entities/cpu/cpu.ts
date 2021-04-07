import { Register, Instruction } from 'domains/constants';
import MemoryEntity from 'domains/entities/memory';
import { getEnumNumberValues } from 'utils/enum';
import { prettify16bitNumber } from 'utils/number';

// TODO: clearer name and import from constants
const TWO_BYTES = 2;

class CPUEntity {
  constructor(private readonly memory: MemoryEntity) {
    const registers = getEnumNumberValues(Register);

    this.registersMemory = new MemoryEntity(registers.length * TWO_BYTES);

    this.registersMap = registers.reduce((map, register, index) => {
      map.set(register, index * TWO_BYTES);

      return map;
    }, new Map());
  }

  private readonly registersMap: Map<Register, number>;

  public readonly registersMemory: MemoryEntity;

  public getRegisterValue(register: Register): number {
    const registerIndexInMemory = this.registersMap.get(register);

    if (registerIndexInMemory === undefined) {
      throw new Error(`[CPU] getRegisterValue: No such register "${register}"`);
    }

    return this.registersMemory.getUint16(registerIndexInMemory);
  }

  public setRegisterValue(register: Register, value: number): void {
    const registerIndexInMemory = this.registersMap.get(register);

    if (registerIndexInMemory === undefined) {
      throw new Error(`[CPU] setRegisterValue: No such register "${register}"`);
    }

    return this.registersMemory.setUint16(registerIndexInMemory, value);
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

    this.printRegistersSnapshot();
  }

  public takeRegistersSnapshot(): { register: string; value: number }[] {
    return [...this.registersMap.keys()].map((register) => ({
      register: Register[register],
      value: this.getRegisterValue(register),
    }));
  }

  public printRegistersSnapshot(): void {
    // eslint-disable-next-line no-console
    console.log('┌────────────────────┐');
    // eslint-disable-next-line no-console
    console.log('| registers snapshot |');
    // eslint-disable-next-line no-console
    console.table(
      this.takeRegistersSnapshot().reduce(
        (acc: { [key: string]: string }, registerSnapshot) => ({
          ...acc,
          [registerSnapshot.register]: prettify16bitNumber(
            registerSnapshot.value
          ),
        }),
        {}
      )
    );
  }

  private fetch8() {
    const nextInstructionAddress = this.getRegisterValue(Register.IP);
    this.setRegisterValue(Register.IP, nextInstructionAddress + 1);

    return this.memory.getUint8(nextInstructionAddress);
  }

  private fetch16() {
    const nextInstructionAddress = this.getRegisterValue(Register.IP);
    this.setRegisterValue(Register.IP, nextInstructionAddress + 2);

    return this.memory.getUint16(nextInstructionAddress);
  }

  private getRegisterIndex(register: Register): number {
    const registerIndexInMemory = this.registersMap.get(register);

    if (registerIndexInMemory === undefined) {
      throw new Error(`[CPU] getRegisterValue: No such register "${register}"`);
    }

    return registerIndexInMemory;
  }

  private execute(instruction: number) {
    switch (instruction) {
      case Instruction.MOV_LIT_REG: {
        const value = this.fetch16();
        const register = this.getRegisterIndex(this.fetch8());

        this.registersMemory.setUint16(register, value);

        break;
      }
      case Instruction.MOV_REG_REG: {
        const registerFrom = this.getRegisterIndex(this.fetch8());
        const registerTo = this.getRegisterIndex(this.fetch8());
        const value = this.registersMemory.getUint16(registerFrom);

        this.registersMemory.setUint16(registerTo, value);

        break;
      }
      case Instruction.MOV_REG_MEM: {
        const registerFrom = this.getRegisterIndex(this.fetch8());
        const address = this.fetch16();
        const value = this.registersMemory.getUint16(registerFrom);

        this.memory.setUint16(address, value);

        break;
      }
      case Instruction.MOV_MEM_REG: {
        const address = this.fetch16();
        const registerTo = this.getRegisterIndex(this.fetch8());
        const value = this.memory.getUint16(address);

        this.registersMemory.setUint16(registerTo, value);

        break;
      }
      case Instruction.ADD_REG_REG: {
        const register1 = this.getRegisterIndex(this.fetch8());
        const register2 = this.getRegisterIndex(this.fetch8());
        const register1Value = this.registersMemory.getUint16(register1);
        const register2Value = this.registersMemory.getUint16(register2);

        this.setRegisterValue(Register.ACC, register1Value + register2Value);

        break;
      }
      case Instruction.JMP_NOT_EQ: {
        const value = this.fetch16();
        const address = this.fetch16();

        if (value !== this.getRegisterValue(Register.ACC)) {
          this.setRegisterValue(Register.IP, address);
        }

        break;
      }
      default: {
        break;
      }
    }
  }
}

export default CPUEntity;

enum Instruction {
  /** move literal value to register */
  MOV_LIT_REG = 0x10,
  /** move memory value to register */
  MOV_MEM_REG = 0x11,
  /** move register value to memory */
  MOV_REG_MEM = 0x12,
  /** move register value to register */
  MOV_REG_REG = 0x13,
  /** add register value with register value */
  ADD_REG_REG = 0x14,
  /** jump if not equail */
  JMP_NOT_EQ = 0x15,
}

export default Instruction;

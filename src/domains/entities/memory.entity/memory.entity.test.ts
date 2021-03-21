import { MemoryEntity } from './memory.entity';

describe('Memory entity', () => {
  test('Init memory based on passed size', () => {
    const memorySizes = [0, 8, 16];

    expect(
      memorySizes.every(
        (memorySize) =>
          new MemoryEntity(memorySize).view.byteLength === memorySize
      )
    ).toBe(true);
  });

  test('Correctly work with Uint8', () => {
    const VALUE = 42;
    const OFFSET = 0;
    const memory = new MemoryEntity(16);

    memory.setUint8(OFFSET, VALUE);

    expect(memory.getUint8(OFFSET)).toEqual(VALUE);
  });

  test('Correctly work with Uint16', () => {
    const VALUE = 42;
    const OFFSET = 0;
    const memory = new MemoryEntity(16);

    memory.setUint16(OFFSET, VALUE);

    expect(memory.getUint16(OFFSET)).toEqual(VALUE);
  });
});

import { prettify16bitNumber, prettify8bitNumber } from 'utils/number';

class MemoryEntity extends DataView {
  constructor(_sizeInBytes: number) {
    const arrayBuffer = new ArrayBuffer(_sizeInBytes);

    super(arrayBuffer);

    this.arrayBuffer = arrayBuffer
  }

  private readonly arrayBuffer: ArrayBuffer;

  public takeMemorySnapshot(
    address: number,
    window = 8
  ): { address: number; memorySlice: number[] } {
    return {
      address,
      memorySlice: [
        ...new Uint8Array(
          this.arrayBuffer.slice(address, address + window)
        ),
      ],
    };
  }

  public printMemorySnapshot(address: number, window = 8): void {
    const memorySnapshot = this.takeMemorySnapshot(address, window);

    const titleString = ` memory snapshot `;
    const addressTitleString = ` addr. `;
    const memorySliceTitleString = ` memory `;
    const addressString = ` ${prettify16bitNumber(memorySnapshot.address)} `;
    const memorySliceString = ` ${memorySnapshot.memorySlice
      .map((value) => prettify8bitNumber(value))
      .join(' ')} `;
    const dataString = `|${addressString}|${memorySliceString}|`;

    // eslint-disable-next-line no-console
    console.log(`┌${new Array(dataString.length - 2).fill('─').join('')}┐`);
    // eslint-disable-next-line no-console
    console.log(
      `|${titleString}${new Array(dataString.length - titleString.length - 2)
        .fill(' ')
        .join('')}|`
    );
    // eslint-disable-next-line no-console
    console.log(
      `┌────────┬${new Array(memorySliceString.length).fill('─').join('')}┐`
    );
    // eslint-disable-next-line no-console
    console.log(
      `| ${addressTitleString}|${memorySliceTitleString} ${new Array(
        memorySliceString.length - memorySliceTitleString.length - 1
      )
        .fill(' ')
        .join('')}|`
    );
    // eslint-disable-next-line no-console
    console.log(
      `├────────┼${new Array(memorySliceString.length).fill('─').join('')}┤`
    );
    // eslint-disable-next-line no-console
    console.log(dataString);
    // eslint-disable-next-line no-console
    console.log(
      `└────────┴${new Array(memorySliceString.length).fill('─').join('')}┘`
    );
  }
}

export default MemoryEntity;

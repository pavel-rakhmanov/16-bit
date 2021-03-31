import { prettify16bitNumber, prettify8bitNumber } from "src/utils/number";

export class MemoryEntity {
  constructor(private readonly _sizeInBytes: number) {
    this.arrayBuffer = new ArrayBuffer(_sizeInBytes);
    this.dataView = new DataView(this.arrayBuffer);
  }

  private readonly arrayBuffer;

  private readonly dataView;

  get buffer(): ArrayBuffer {
    return this.arrayBuffer;
  }

  get view(): DataView {
    return this.dataView;
  }

  get getUint8(): DataView['getUint8'] {
    return this.view.getUint8.bind(this.view);
  }

  get setUint8(): DataView['setUint8'] {
    return this.view.setUint8.bind(this.view);
  }

  get getUint16(): DataView['getUint16'] {
    return this.view.getUint16.bind(this.view);
  }

  get setUint16(): DataView['setUint16'] {
    return this.view.setUint16.bind(this.view);
  }

  public takeMemorySnapshot(address: number, window = 8): { address: number, memorySlice: number[] } {
    const realWindow = Math.min(window, this.arrayBuffer.byteLength - address);

    return {
      address,
      memorySlice: [... new Uint8Array(this.arrayBuffer.slice(address, address + realWindow))]
    }
  }

  public printMemorySnapshot(address: number, window = 8): void {
    const memorySnapshot = this.takeMemorySnapshot(address, window);

    const titleString = ` memory snapshot `
    const addressTitleString = ` addr. `
    const memorySliceTitleString = ` memory `
    const addressString = ` ${prettify16bitNumber(memorySnapshot.address)} `;
    const memorySliceString = ` ${memorySnapshot.memorySlice.map(value => prettify8bitNumber(value)).join(' ')} `;
    const dataString = `|${addressString}|${memorySliceString}|`

    // eslint-disable-next-line no-console
    console.log(`┌${new Array(dataString.length - 2).fill('─').join('')}┐`)
    // eslint-disable-next-line no-console
    console.log(`|${titleString}${new Array(dataString.length - titleString.length - 2).fill(' ').join('')}|`)
    // eslint-disable-next-line no-console
    console.log(`┌────────┬${new Array(memorySliceString.length).fill('─').join('')}┐`);
    // eslint-disable-next-line no-console
    console.log(`| ${addressTitleString }|${memorySliceTitleString} ${new Array(memorySliceString.length - memorySliceTitleString.length - 1).fill(' ').join('')}|`)
    // eslint-disable-next-line no-console
    console.log(`├────────┼${new Array(memorySliceString.length).fill('─').join('')}┤`);
    // eslint-disable-next-line no-console
    console.log(dataString);
    // eslint-disable-next-line no-console
    console.log(`└────────┴${new Array(memorySliceString.length).fill('─').join('')}┘`);

  }
}

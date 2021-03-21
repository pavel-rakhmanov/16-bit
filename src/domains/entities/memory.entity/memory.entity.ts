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
}

export class MemoryEntity {
  constructor(private readonly _sizeInBytes: number) {
    this._arrayBuffer = new ArrayBuffer(_sizeInBytes);
    this._dataView = new DataView(this._arrayBuffer);
  }

  private _arrayBuffer;

  private _dataView;

  get getUint8(): DataView['getUint8'] {
    return this._dataView.getUint8;
  }

  get getUint16(): DataView['getUint16'] {
    return this._dataView.getUint16;
  }

  get setUint16(): DataView['setUint16'] {
    return this._dataView.setUint16;
  }
}

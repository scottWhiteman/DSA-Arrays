const Memory = require('./memory.js');
let memory = new Memory();

class newArray {
  constructor() {
    this.length = 0;
    this.capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  push(value) {
    if (this.length >= this.capacity) {
      this._resize((this.length + 1) * newArray.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  pop() {
    if (this.length === 0) {
      throw new Error('Index error');
    }
    this.length--;
    return memory.get(this.ptr+this.length-1);
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this.capacity) {
      this._resize((this.length + 1) * newArray.SIZE_RATIO)
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + this.index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1)
    this.length--;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);

    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this.capacity = size;
  }
}

newArray.SIZE_RATIO = 3;

module.exports = newArray;
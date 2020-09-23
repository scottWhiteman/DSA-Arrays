class Memory {
    constructor() {
        this.memory = new Float64Array(1024);
        this.head = 0;
    }
  
    allocate(size) {
        if (this.head + size > this.memory.length) {
            return null;
        }
        //get current head value
        let start = this.head;
        //increase head size by given size
        this.head += size;
        //return previous head value
        return start;
    }
  
    free(ptr) {}
  
    copy(toIdx, fromIdx, size) {
        if (fromIdx === toIdx) {
            return;
        }
  
        if (fromIdx > toIdx) {
            // Iterate forwards
            for (let i = 0; i < size; i++) {
                this.set(toIdx + i, this.get(fromIdx + i));
            }
        } else {
            // Iterate backwards
            for (let i = size - 1; i >= 0; i--) {
                //Reassign values
                this.set(toIdx + i, this.get(fromIdx + i));
            }
        }
    }
  
    get(ptr) {
        return this.memory[ptr];
    }
  
    set(ptr, value) {
        this.memory[ptr] = value;
    }
  }
  
  module.exports = Memory;
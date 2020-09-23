const Memory = require('./memory.js');
let memory = new Memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }
    
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    push(value) {
        if (this.length >= this._capacity) {
            //increase size of array by size ratio
            //(current length + 1) * size ratio
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        console.log(`pushing to ${this.ptr + this.length}, ptr=${this.ptr}, length=${this.length}`)
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }

    _resize(size) {
        //get current head of memory: eg 0, size = 3
        const oldPtr = this.ptr;
        //get new head of memory: eg 0 before first push
        //new pointer becomes end of previous length
        this.ptr = memory.allocate(size);
        
        console.log(`old ptr/head: ${oldPtr}, new ptr/head: ${this.ptr}`);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
}

Array.SIZE_RATIO = 3;

module.exports = Array
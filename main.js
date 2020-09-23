const Array = require('./array');
const newArray = require('./newArray');

function main() {
    Array.SIZE_RATIO = 3;

    let arr = new newArray();

    // arr.push(3);
    // arr.push(5);
    // arr.push(15);
    // arr.push(19);
    // arr.push(45);
    // arr.push(10);
    
    //Displays (Array {length: 6, capacity: 12, ptr: 3})
    //console.log(arr)
    
    // arr.pop();
    // arr.pop();
    // arr.pop();

    //Displays (Array {length: 3, capacity: 12, prt: 3})
    //console.log(arr);

    //Displays 3
    //console.log(arr.get(0));

    for (let i = arr.length-1; i >= 0; i--) {
        arr.pop();
    }

    arr.push('tauhida');
    //Displays NaN, for not a number.  May be due to the memory array taking in floats, which only includes numbers
    console.log(arr.get(0));

    //the resize function is meant to allocate additional blocks for the array to use if the length matches or exceeds the current array capacity
    //It also sets the pointer to the first of the new set of allocated blocks
}

// O(N): Increases based on the size the string, since it must search the entire string for spaces to replace
function urlString(str) {
    let urlified = str;
    let index = urlified.indexOf(' ');
    while (index !== -1) {
        urlified = urlified.slice(0, index) + '%20' + urlified.slice(index + 1);
        index = urlified.indexOf(' ');
        console.log(urlified);
    }
    return urlified;
}

// O(N): Increases based on the length of the array.  It must scan through the array to determine filtering
function filterArray(arr) {
    const filteredArr = []
    arr.forEach(num => {
        if (num >= 5) {
            filteredArr.push(num);
        }
    })
    return filteredArr;
}

// O(N): Increases based no the length of the array.  Must scan through the array to confirm that the largest sum has been found
function maxSum(arr) {
    let largestSum = arr[0];
    let current = 0;
    arr.forEach(num => {
        current += num;
        largestSum = current > largestSum ? current : largestSum;
    })
    return largestSum;
}
// O(NlogN): By nature of the sorted arrays, it is possible to time for the larger array.  If they are not sorted, it would likely be O(N^2)
function mergeArrays(arr, arr2) {
    let smallArr;
    let largeArr;
    if (arr.length >= arr2.length) {
        largeArr = arr;
        smallArr = arr2;
    } else {
        largeArr = arr2;
        smallArr = arr;
    }

    smallArr.forEach(num => {
        let startIndex = 0;
        let endIndex = largeArr.length - 1;
        let curIndex;
        console.log(largeArr.length)
        while (startIndex <= endIndex) {
            curIndex = Math.floor((endIndex + startIndex) / 2);
            if (largeArr[curIndex] < num) {
                startIndex = curIndex + 1;
                curIndex++;
            }
            else if (largeArr[curIndex] > num) {
                endIndex = curIndex - 1;
            }
            else {
                break;
            }
        }
        largeArr.splice(curIndex, 0, num); 
    })
    return largeArr;
}

// O(N^2): There are two arrays that need to be searched through. Since there is no sorting, there does not seem to be a way to truncate the search time
function removeCharacters(str, remove) {
    let newStr = str;
    for (let i = 0; i < newStr.length; i++) {
        for (let j = 0; j < remove.length; j++) {
            if (newStr.charAt(i) === remove.charAt(j)) {
                newStr = newStr.slice(0, i) + newStr.slice(i+1);
                i--;
            }
        }
    }
    return newStr;
}

// O(N^2): While there is only one array, it is iterated as though there were two arrays to get the products
function products(arr) {
    return arr.map((num, index) => {
        let total = 1;
        for (let i = 0; i < arr.length; i++) {
            if (i !== index) {
                total *= arr[i];
            }
        }
        return total;
    })
}
// O(N^4): Though at two arrays, they must be searched through for cases, before running another set of iterations to change the values of the arrays
function twoDimensionArray(arr) {
    const newArr = arr;
    const deadColumns = newArr[0].map(num => 1);
    const deadRows = newArr.map(num => 1);

    //Rows
    for (let i = 0; i < newArr.length; i++) {
        //Columns
        for (let j = 0; j < newArr[i].length; j++) {
            if (newArr[i][j] === 0) {
                deadColumns[j] = 0;
                deadRows[i] = 0;
            }
        }
    }
    for (let i = 0; i < newArr.length; i++) {
        //Columns
        for (let j = 0; j < newArr[i].length; j++) {
            if (deadColumns[j] === 0 || deadRows[i] === 0) {
                newArr[i][j] = 0;
            }
        }
    }
    return newArr;
}

// O(N): By rearranging the string within the same iteration, the loop only needs to be based on the length of the second string
function stringRotation(str1, str2) {
    for (let i = 0; i < str2.length; i++) {
        rotatedStr = str2.substring(i, str2.length) + str2.substring(0, i);
        if (rotatedStr === str1) {
            return true
        }
    }
    return false;
}
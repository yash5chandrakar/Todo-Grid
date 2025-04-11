// Question 1: DSA Given an array of integers, return the length of the longest increasing subsequence.
// A subsequence is a sequence that can be derived from the array by deleting some or no elements
// without changing the order of the remaining elements.For example, given the array[10, 9, 2, 5, 3, 7, 101, 18],
// the longest increasing subsequence is[2, 3, 7, 101], and its length is 4.

// Examples  : [1,2,3] - 3 || [1,1,2,3] - 3 || []
// Method to Achieve - Recursion

// let myArray = [10, 9, 2, 5, 3, 7, 101, 18];
let myArray = [1, 1, 2, 3];


const getLISLength = (arr) => {
    if (arr?.length == 0) {
        return 0
    }
    let resultValue = getLISLengthHelper(-1, 0, arr)

    return resultValue
}

const getLISLengthHelper = (last, current, arr) => {
    if (current === arr?.length) return 0;

    let taken = 0;
    if (last === -1 || arr[current] > arr[last]) {
        taken = 1 + getLISLengthHelper(current, current + 1, arr);
    }

    let notTaken = getLISLengthHelper(last, current + 1, arr);

    return Math.max(taken, notTaken);
}

console.log(getLISLength(myArray))


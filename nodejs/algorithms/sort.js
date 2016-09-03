/**
 * bubble Sort
 */
(function test() {

function bubbleSort(arr) {
	var isBubbled = false;
	for (var i = 0; i < arr.length; i++) {
		isBubbled = bubble(arr, 0, arr.length - i);
		if (!isBubbled) break;
	}
}

function bubble(arr, from, to) {
	var isBubbled = false;
	for (var i = from; i < to; i++) {
		if (arr [i] > arr [i + 1]) {
			isBubbled = true;
			swap(arr, i, i + 1);
		}
	}
	return isBubbled;
}

function swap(arr, i, j) {
	var temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}


var arr = [3, 5, 2, 1, 6, 7, 8, 10, 9, 4, 12, 11, 90, 56];
console.log("before: " + arr);
bubbleSort(arr);
console.log("after: " + arr);

})();

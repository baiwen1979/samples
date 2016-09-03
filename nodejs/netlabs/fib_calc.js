function fib(n) {
	if (n < 2) {
		return 1;
	}
	return fib(n - 2) + fib(n - 1);
}

var input = parseInt(process.argv[2], 10);
console.log('input = ' + input);
process.send({ result: fib(input)});
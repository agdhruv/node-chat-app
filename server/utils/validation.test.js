const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		var str = 123;
		var result = isRealString(str);
		expect(result).toBe(false);
	});

	it('should reject string with only spaces', () => {
		var str = '   ';
		var result = isRealString(str);
		expect(result).toBe(false);
	});

	it('should allow strings with non-space characters', () => {
		var str = '   lotr';
		var result = isRealString(str);
		expect(result).toBe(true);
	});
});
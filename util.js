// checks to see if number is odd or even
export const numberParity = (num) => {
  if (num % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
};

// Checks if the number is an amstrong number
export const numberIsAmstrong = (num) => {
  const numArray = String(Math.abs(num)).split(""); //converts the number to a string then splits it into an array of strings
  const numLength = numArray.length;

  const numSum = numArray.reduce((acc, num) => {
    return acc + Math.pow(Number(num), numLength);
  }, 0);

  return numSum === Math.abs(num); //returns true if number is amstrong and false otherwise
};

// sums up the individual numbers in the digit
export const sumOfDigits = (num) => {
  const numArray = String(Math.abs(num)).split("");
  const sum = numArray.reduce((acc, num) => {
    return acc + Number(num);
  }, 0);
  return sum;
};

// checks if number is prime
export const numberIsPrime = (num) => {
  if (num < 2) {
    return false;
  }
  if (num === 2 || num === 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

// checks if number is a perfect number
export const numberIsPerfect = (num) => {
  if (num == 0) return false;
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }

  return sum === Number(num);
};

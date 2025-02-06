import express, { json } from "express";
import cors from "cors";
import axios from "axios";

// importing helper functions
/*import {
  numberIsAmstrong,
  numberIsPerfect,
  numberIsPrime,
  numberParity,
  sumOfDigits,
} from "./helper_functions.js";*/


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());


// checks to see if number is odd or even
const numberParity = (num) => {
  if (num % 2 === 0) {
    return "even";
  } else {
    return "odd";
  }
};

// Checks if the number is an amstrong number
const numberIsAmstrong = (num) => {
  const numArray = String(Math.abs(num)).split(""); //converts the number to a string then splits it into an array of strings
  const numLength = numArray.length;

  const numSum = numArray.reduce((acc, num) => {
    return acc + Math.pow(Number(num), numLength);
  }, 0);

  return numSum === Math.abs(num); //returns true if number is amstrong and false otherwise
};


// sums up the individual numbers in the digit
const sumOfDigits = (num) => {
  const numArray = String(Math.abs(num)).split("");
  const sum = numArray.reduce((acc, num) => {
    return acc + Number(num);
  }, 0);
  return sum;
};

// checks if number is prime
const numberIsPrime = (num) => {
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
const numberIsPerfect = (num) => {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }

  return sum === Number(num);
};



// Define the get route for the API
app.get("/api/classify-number?:number", async (req, res) => {
  const number = Number(req.query.number);

  // user input validation
  if (!number || isNaN(number)) {
    res.status(400).json({
      number: req.query.number,
      error: true,
    });
  }

  // handling user input of non integers
  if (!Number.isInteger(number)) {
    res.status(400).json({
      number: "float",
      error: true,
    });
  }

  const numberProperties = [];

  if (numberIsAmstrong(number)) {
    numberProperties.push("armstrong"); // adds 'armstrong' to the numberProperties array if number is amstrong true
  }

  if (numberParity(number) === "even") {
    numberProperties.push("even"); // adds 'even' to numberProperties array if true
  } else {
    numberProperties.push("odd"); // adds 'odd' to numberProperties array if true
  }

  let funFact = "";

  // getting fun fact from the numbersapi
  try {
    const response = await axios.get(`http://numbersapi.com/${number}/math`);
    funFact = response.data;
  } catch (error) {
    res.json({ error: "failed to fetch fun fact" });
  }

  const resData = {
    number: number,
    is_prime: numberIsPrime(number),
    is_perfect: numberIsPerfect(number),
    properties: numberProperties,
    digit_sum: sumOfDigits(number),
    fun_fact: funFact,
  };

  res.status(200).json(resData);
});

app.listen(PORT, () => {
  console.log("Server currently running on http://localhost:" + PORT);
});
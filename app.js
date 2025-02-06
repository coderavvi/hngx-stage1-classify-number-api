import express, { json } from "express";
import cors from "cors";
import axios from "axios";

// importing helper functions
import {
  numberIsAmstrong,
  numberIsPerfect,
  numberIsPrime,
  numberParity,
  sumOfDigits,
} from "./util.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());




// Define the get route for the API
app.get("/api/classify-number?:number", async (req, res) => {
  const number = Number(req.query.number);

  // user input validation
  if (!number || isNaN(number) || !Number.isInteger(number)) {
    res.status(400).json({
      number: req.query.number,
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

    const resData = {
    number: number,
    is_prime: numberIsPrime(number),
    is_perfect: numberIsPerfect(number),
    properties: numberProperties,
    digit_sum: sumOfDigits(number),
    fun_fact: funFact,
  };

  res.status(200).json(resData);
    
  } catch (error) {
    res.json({ error: "failed to fetch fun fact" });
  }


});

app.listen(PORT, () => {
  console.log("Server currently running on http://localhost:" + PORT);
});

#  HNG BACKEND DEVS LEVEL 1 PROJECT: Classify Number API

## Description

This is a simple API that returns a JSON response of a number detailing it's properties such as if it is prime, perfect, even or odd, amstrong, and the sum of the individual digits of the number.

## Setup Instrudctions

### Prerequisites

To run this API on your local device, make sure the following are installed

- [Node.js](https://nodejs.org)
- npm (npm comes with Node.js)

### Installation

- clone the repository

```bash
git clone https://github.com/coderavvi/hngx-stage1-classify-number-api.git
```

- Navigate to the directory

```bash
cd hngx_stage1-classify-api
```

- Install dependencies

```bash
npm install
```

- Start the server

```bash
node app.js
```

The server will start on `http://localhost:3000/` by default

## API Documentation

### Endpoint

- Local development URL: `http://localhost:3000/api/classify-number`
- Production URL: `https://hngx-stage1-classify-number-api.vercel.app/api/classify-number`

### Request format

- method `GET`
- headers `none`
- body `none`
- query `number`

### Response Format
(200 OK)

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["amstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is a narcissistic number."
}
```
### Error
(400 Bad Request)

```json
{
    "number": "alphabet",
    "error": true
}
```
### Example Usage
Using axios
```js
app.get('/:number', async (req, res) => {
    const response = await axios.get()
    console.log(response.data);
});
```
## Author
coderavvi

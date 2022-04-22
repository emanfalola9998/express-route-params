import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get<{exampleRouteParameter: string}>("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get<{numOne: string, numTwo:string}>("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  // destructured object to access numOne, numTwo
  const multiplication = parseInt(numOne) * parseInt(numTwo);
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{whatever: string}>("/shout/:whatever", (req, res) => {
  const shoutWhatever = req.params.whatever;
  res.json({
    shout: shoutWhatever,
    message: `I am shouting back at you: ${shoutWhatever}`,
  });
});

app.get<{number1: string, number2: string, number3:string}>("/add/:number1/:number2/:number3?", (req, res) => {
  let {number1, number2, number3}= req.params
  if (number3 === undefined){
    number3 = "0"
  }
  const add = parseInt(number1) + parseInt(number2) + parseInt(number3)
  res.json({
    original: `${number1} + ${number2} + ${number3}`,
    result: add,
  })
})

app.get<{animal:string}>("/eat/:animal", (req,res) =>{
  const typeAnimal = req.params.animal
  res.json({
    message: `Yum Yum - you ate a ${typeAnimal}`,
  })
})


// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});

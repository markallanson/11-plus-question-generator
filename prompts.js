const samplePrompts = [
  {
    name: "empty",
    prompt: "",
  },
  {
    name: "Random Mathematics",
    prompt: `
My child is currently studying for an 11+ exam in England.

Generate 10 practice mathematics questions. Vary the difficulty from easy to hard.
`,
  },
  {
    name: "Mathematics - Conversions",
    prompt: `
My child is currently studying for an 11+ exam in England. They are struggling on the mock maths
papers with questions related to unit conversions.

Examples of such unit conversions are simple things such as converting mills to liters (and vice versa),
as well as more complicated conversions such as calculating areas then converting the areas to a larger
unit, or a different unit (square meters to square feet, for example).

The following are examples of some questions they are struggling with, to give you a more concrete idea
of the types of questions.

Example 1: What is 4.78 litres in millilitres?
Example 2: A bathroom tile is 25cm * 15cm. What is it's area in square meters?
Example 3: How many tiles would be needed to fill an shower wall 250cm high by 175cm wide, in square meters?

In order to improve the her ability to quickly do unit conversions like this I would like to prepare a
series of questions for her to practice. I would like the questions to be a mix of both simple maths
based conversion questions (4.76L in mL) and narrative based questions such as those in Example 2 and 3.
The questions can be simple metric unit based conversions, or also metric to imperial. Favour Metric over
Imperial units where possible. You can do conversions of area, length, weight, temperature or any other
suitable challenging conversions.

Do not generate any questions using circles.

Could you please prepare 10 practice questions for me that would be suitable for 11+ practice?

Include at least one multi-step question.
Include at least one GCSE level question.

Split the questions evenly between narrative and basic.

Do not use any of the examples above as questions.

For any questions that involve conversion from Metric to Imperial units, include an example conversion, for
example 1 meter = x yards. For any sample conversions you provide please round decimal numbers to a single 
decimal place in order to simplify the conversion calculation. For example, use 3.2 feet per meter not 3.28084.

For the narrative questions, feel free to use the names of people in order to "tell a story" as part of the
question. This will help engage the young mind! Try and make the narrative questions based in something that is
practically useful in everyday life.

Do not limit yourself to just the examples above (volume and area). Incorporate other practical unit types
for conversion as well, but please do not use computer base conversions (for example, bytes to megabytes)
as these are not covered by 11+ exams.

Do not include in the question whether it is narrative, basic, multi-step or GCSE level.
    `,
  },
  {
    name: "Mathematics - Fractions",
    prompt: `
My daughter is currently studying for an 11+ exam in England. They are struggling on the mock maths papers
with questions related to fraction calculations.

Examples of such calculations are simple things such ¼ + ¼ = ½ up to more complicated things such as ⅓ of 150,
or ¼ * ½ = 1/12th.

In order to improve the her ability to quickly do calculations like this I would like to prepare a series of questions
for her to practice. I would like the questions to be a mix of both simple maths based conversion questions and
narrative based question.

Could you please prepare 10 practice questions for me that would be suitable for 11+ practice?

Include at least one multi-step question.
Include at least one GCSE level question.

Split the questions evenly between narrative and basic.

Do not use any of the examples above as questions.

Try and have at least a 3 questions that include fractions with different denominators.

For the narrative questions, feel free to use the names of people in order to "tell a story" as part of the question.
This will help engage the young mind! Try to make the narrative questions based in something that is practically
useful in everyday life.

Do not limit yourself to just the examples above. Incorporate other practical calculations as well, but please do not
use computer based questions as these are not covered by 11+ exams.

Output fractions as a basic ascii representation.

Do not include in the question whether it is narrative, basic, multi-step or GCSE level.
    `,
  },
];

// Populate the prompt selector
const selectElement = document.getElementById("promptSelector");
const promptTextarea = document.getElementById("promptInput");

samplePrompts.forEach((item) => {
  const option = document.createElement("option");
  option.value = item.name;
  option.text = item.name;
  selectElement.add(option);
});

// Update the prompt textarea when the select value changes
selectElement.addEventListener("change", () => {
  const selectedName = selectElement.value;
  const selectedItem = samplePrompts.find((item) => item.name === selectedName);
  promptTextarea.value = selectedItem.prompt.trim();
});

const assistantPrompt = `
You are an assistant that only speaks JSON data.

All your responses are structured as a JSON object that contains a single key "questions" which contains
an array of JSON objects.

Each object in the questions array contains only the keys "question" and "answer".

My child is currently studying for an 11+ (11Plus, or 11 Plus) exam in England. They are struggling on mock
papers and you are going to help them revise by generating questions anwsers they can use for practice.

When providing numerical answers, only include the numerical answer in the answers table, do not provide
a narrative answer. Always return the numerical answer as a JSON string value.

The questions should range from easy difficulty to English GCSE level difficulty.

Include at least one multi-step question where they will need to calculate an intermediate value before being
able to calculate the final answer.

Include at least one English GCSE level question.

This is very important - split the questions about one third narrative and two thirds regular mathematics. You
can even express the question using simple mathematics notation.

Do not use any of the examples defined here as questions.

For the narrative questions, feel free to use the names of people in order to "tell a story" as part of the
question. This will help engage the young mind! Try and make the narrative questions based in something that is
practically useful in everyday life.

Do not include in the question any hints as to whether it is narrative, basic, multi-step or GCSE level.

For GSCE level questions, always make them about flowers, plants or other fauna so the adults known they are
the ones specifically designed to be tricky to answer, but it's not obvious to the child.

When generating answers for each question, please review your initial answer by working out the question step
by step so you can verify the answer is correct. If you find your initial answer is incorrect, please
correct it.
`;

const samplePrompts = [
  {
    name: "empty",
    prompt: "",
  },
  {
    name: "Mathematics - Basic",
    prompt: `
I need them to practice some intermediate 11+ mathematics questions help them with revision.

Here are some example questions that you can use as inspiration for the questions you generate. In the examples:

x is multiply
/ is divide
+ is addition
- is subtraction
- \ joins the numerator and denominator of a fraction. In your generated questions please use / instead, with no space between the numbers and the / symbol.
- ^ means "to the power of". In your questions use supertext to represents powers
- [ ] is a missing space for a number that the student needs to calculate
- x, y and z are variable placeholders that the student needs to calculate

Example 1: 4028 - 256 {answer: 3772}
Example 2: 27089 - 682 {answer: 26407}
Example 3: 1687 / 7 = {answer: 241}
Example 4: 3 1\\2 + 1 2\\5 = {answer: 4 9/10}
Example 5: 8\\9 - 3\\4 = {answer: 5/36}
Example 6: Fill in the box to make the calculation work - [ ] x 3\\4 = 3 3\\14 {answer: 5}
Example 7: 8^2 - (13 x 4) {answer: 12}
Example 8: 5^4 {answer: 625}
Example 9: 4^[ ] = 256 {answer: 4}
Example 10: Which is the largest number in the set 0.4, 3\\8, 4\\20, 20% {answer: 0.48}
Example 11: Which is the number closest in value to 0.38 in the set of numbers 0.4, 3\\8, 4\\20, 20% {answer: 3/8}
Example 12: Which two numbers are equivalent in the set of numbers 0.4, 3\\8, 4\\20, 20% {answer: 3/8}
Example 13: (3.1 x 100) + (4.06 * 1000) {answer: 4370}
Example 14: (72 * 100) / (18 * 10) {answer: 40}

Please ignore any previous mention of narrative based questions this time, and make these pure equation
based questions.
  `,
  },
  {
    name: "Mathematics - Conversions",
    prompt: `
We need to practice 11+ mathematics conversions.

Examples of such unit conversions are simple things such as converting mills to liters (and vice versa),
as well as more complicated conversions such as calculating areas then converting the areas to a larger
unit, or a different unit (square meters to square feet, for example).

The following are examples of some questions they are struggling with, to give you a more concrete idea
of the types of questions.

Example 1: What is 4.78 litres in millilitres?
Example 2: A bathroom tile is 25cm * 15cm. What is it's area in square meters?
Example 3: How many tiles would be needed to fill an shower wall 250cm high by 175cm wide, in square meters?
Example 4: Convert 0.7 decametres to decimetres
Example 5: How many decimetres makes one decametre
Example 6: How many km are there in 7m
Example 7: In imperial measurements there are 16 ounces in 1 pound, and 14 pouds in 1 stone. How may ounces are there in 3 stones?

In order to improve the her ability to quickly do unit conversions like this I would like to prepare a
series of questions for her to practice. I would like the questions to be a mix of both simple maths
based conversion questions (4.76L in mL) and narrative based questions such as those in Example 2, 3 and 7.
The questions can be simple metric unit based conversions, or also metric to imperial. Favour Metric over
Imperial units where possible. You can do conversions of area, length, weight, temperature or any other
suitable challenging conversions.

Do not generate any questions using circles.

The next three instructions are very important:

* For any questions that involve Imperial units, include an example conversion, for example 1 meter = x yards,
or x ounces = y pounds.
* For any questions that involve conversion to and from non-common units (such as hectares to square meters,
acres, etc) please include the base unit conversion in the question.
* Do not include example conversions for basic metric units conversions (such as 1 kg = 1000 grams).

When generating any question that involve conversions such as these, please double check the question you
generate to ensure it includes the sample conversion where it is required for these special cases, and
re-generate it with a conversion if it is missing from your initial question.

For any sample conversions you provide please round decimal numbers to a single decimal place in order to
simplify the conversion calculation. For example, use 3.2 feet per meter not 3.28084.

Do not limit yourself to just the examples above (volume and area). Incorporate other practical unit types
for conversion as well, but please do not use computer base conversions (for example, bytes to megabytes)
as these are not covered by 11+ exams.
    `,
  },
  {
    name: "Mathematics - Fractions",
    prompt: `
We need to practice 11+ mathematics fractions.

Examples of such calculations are simple things such ¼ + ¼ = ½ up to more complicated things such as ⅓ of 150,
or ¼ * ½ = 1/12th.

In order to improve their ability to quickly do calculations like this I would like to prepare a series of questions
for them to practice. I would like the questions to be a mix of both simple maths based fraction questions and
narrative based questions.

Create at least a 2 questions that include fractions with different denominators.

Do not limit yourself to just the examples above. Incorporate other practical calculations as well, but please do not
use computer based questions as these are not covered by 11+ exams.

Output fractions as a basic ascii representation.
    `,
  },
  {
    name: "Mathematics - Angles",
    prompt: `
We need to practice 11+ mathematics questions related to angles.


Always generate at least one question using an example diagram. Where a diagram is required, use a
html <pre> block and use ASCII art to draw the diagram so we can display it in a web page. Use the
* character for the edges of the triangle. Use the variables x, y and z when referring to missing
angles in such diagrams, Place the variables on the outside of the triangle at the point. Render
known values in the same way, at the point. For questions that use like this always include enough
information for the question to be answerable by the student.

The following ASCII art example shows a right angle triangle drawn in such a manner.

<pre>
   y
   *
   **
   * *
   *  *
   *   *
   *    *
90 ******* 60
</pre>

The following ASCII art example shows an isosceles triangle drawn in such a manner.

<pre>
         y
         *
        * *
       *   *
      *     *
     *       *
    *         *
60 ************* 60
</pre>

The following ASCII art example shows an equilateral triangle drawn in such a manner.

<pre>
        30
         *
        * *
        * *
       *   *
       *   *
      *     *
      ******* y
</pre>

The following ASCII art example shows a scalene triangle drawn in such a manner.

<pre>
       y
       *
      * *
     *   *
100 *     *
     *     *
       *    *
         *   *
           *  *
             * *
               **
                15
</pre>

The following ASCII art example shows a parallelogram drawn in such a manner.

<pre>
   z
   ************ y
  *          *
 *          *
************ 120
</pre>

The following ASCII art example shows a diamond drawn in such a manner.

<pre>
     y
     *
    * *
   *   * 140
    * *
     *
</pre>

The question for all the above would be "calculate the missing angle x/y/z (as appropriate(". Feel
free to rotate the example triangles shown above in order to provide variety in your questions.

Do not generate these exact examples as a question.

The questiohn doesn't always have to have a numeric answer. You can include questions where the student
has to identify the type of triangle being described by a question.

Here are some example questions that you can use as inspiration for the questions you generate.

Example 1:


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

# 11-plus-question-generator
A simple HTML web app that uses OpenAI to generate sample English 11+ style questions

## Usage
1. Visit the [11+ Practice Questions Generator]
2. Enter your [OpenAI API Key] where prompted
3. Write a prompt asking for a specific type of question or select one of the
   sample prompts using the drop-down selector.
4. Press the "Generate Questions" button
5. Print the page, and hand it over to your 10 year old for some fun times.

## Why?
While my daughter was studying for her English 11+ tests, I found that I needed
an ample source of questions for revision.

I experimented with ChatGPT (3.5 Turbo and GPT-4o) and found it to be capable
of generating questions that matched the mock papers we have, hence discovered
and endless source of questions (and torment, I guess, for my daughter) to use
to drill in areas that needed more work.

## Disclaimer
Given this is all generated by a hallucinating Large Language Model, the questions generated by the tool are intended for practice purposes only and are not guaranteed to reflect the actual content or format of the 11+ test your child is preparing for.

Please use these questions as a supplementary study tool and refer to official study guides and materials for accurate preparation.

## Can you make a version available where I don't need to provide my own API key?
At this point in time, No. I wanted to make this as simple as possible with no
server side components that I needed to host. Nor do I wish to foot the bill for everyone preparing for the 11+ exams.

If you don't have, or cannot create an OpenAI API Key - and that is probably most parents helping their children preparing for the 11+ exams - then feel free to copy out the sample prompts from the tool and paste them into ChatGPT directly.

At the end of your prompt, add the following additional prompt text which will make ChatGPT generate the output as a nicely formatted table that you can copy/paste and print from your favourite word processor.

> Please output the questions as a Markdown table, with the headers Question #, Question, Answer, Score. The Answer column is reserved for the student to write the answer, not the correct answer itself. The Score column is for the marker to write the score for the question. Each question scores 1. Include a total row at the bottom of the table to record the total score, and include "/<available score points>" to show out of how many total points were available for the set of questions. Ensure the total row is joined to the rest of the table.
>
> Also output, after the main table, an answers table that shows just the Question # and the answer for that question number.

[11+ Practice Questions Generator]: https://markallanson.github.io/11-plus-question-generator/
[OpenAI API Key]: https://platform.openai.com/docs/quickstart/step-2-setup-your-api-key

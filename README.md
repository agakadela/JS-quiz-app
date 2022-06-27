<h1 align="center">QUIZ APP</h1>

## About The Project

QUIZ APP is a simple project to create quizes. It based on [Quizzler app](https://github.com/wasimreja/Quizzler).
You can customize it and add your own questions. It is made within the [Coder Woman project](https://coderwoman.com).

## Tech Stack

- HTML
- CSS
- JavaScript

## Demo

You can see the demo [here](https://agakadela.github.io/JS-quiz-app/).

![](https://user-images.githubusercontent.com/14938482/175976560-5b620fce-bebc-41ed-b29f-563aa581a8b7.mov)

## Installation

Download the project from [GitHub](https://github.com/agakadela/JS-quiz-app/archive/refs/heads/master.zip) and unzip it.

## Configuration

You can configure the project by editing the `data.json` file.
Every time you run the project, questions array will be shuffled, so every time you run the project, you will get different questions.

1. Add your **questions** to the `data.json` file.
   It is a set of objects. Each object has the following properties:

   - `question`: The question text.
   - `options`: An array of answers.
   - `answerId`: The correct answer. It counts from 0.

     Example:

   ```
    {
      "question": "Which one is the type of a javascript file?",
      "options": [".ts", ".js", ".jsx", ".j"],
      "answerId": 1
    },
   ```

2. Change the **title** of the quiz.
   To change the title, edit the `data.json` file and change the `title` property.
   Example:
   ```
     "title": "My fantastic quiz",
   ```
3. Change **description** of the quiz.
   To change the description, edit the `data.json` file and change the `description` property.
   Example:
   ```
     "description": "This is a quiz about javascript.",
   ```
4. Change **timer** of the quiz- how long the quiz will be in seconds.
   To change the timer, edit the `data.json` file and change the `timer` property.
   Example:
   ```
     "timer": 80,
   ```
5. Change the **questions** count of the quiz.
   To change the questions count, edit the `data.json` file and change the `questionsCount` property.
   Example:
   ```
     "questionsCount": 10,
   ```
6. Change **image** of the quiz.
   To change the image, you need to add the image to the `img` folder, then add the image name to the `data.json` file in "image" field.
   Example:
   ```
   "image": "img/image.png"
   ```

## Default settings:

```
{
  "questions": [
    {
      "question": "Which one is the type of a javascript file?",
      "options": [".ts", ".js", ".jsx", ".j"],
      "answerId": 1
    },
    {
      "question": "Inside which HTML element do we put the JavaScript?",
      "options": ["<scripting>", "<script>", "<js>", "<javascript>"],
      "answerId": 1
    },
    {
      "question": "Where is the correct place to insert a JavaScript?",
      "options": [
        "The <head> section",
        "Both the <head> section and the <body> section are correct",
        "The <body> section",
        "Anywhere in the HTML document"
      ],
      "answerId": 0
    },
    {
      "question": "What is the correct syntax for referring to an external script called \"myScript.js\"?",
      "options": [
        "<script src=\"myScript.js\" type=\"text/javascript\"</script>",
        "<script name=\"myScript.js\" type=\"text/javascript\"</script>",
        "<script href=\"myScript.js\" type=\"text/javascript\"</script>",
        "<script src=\"myScript.js\" type=\"text/javascript\"</script>"
      ],
      "answerId": 3
    },
    {
      "question": "How do you write \"I'm JavaScript\" in an alert box?",
      "options": [
        "msgBox(\"I'm JavaScript!\")",
        "alert(\"I'm JavaScript!\")",
        "msg(\"I'm JavaScript!\")",
        "alertBox(\"I'm JavaScript!\")"
      ],
      "answerId": 1
    },
    {
      "question": "How do you create a function in JavaScript?",
      "options": [
        "function = myFunction()",
        "function myFunction()",
        "function:myFunction()",
        "function myFunction()"
      ],
      "answerId": 1
    },
    {
      "question": "How do you call a function named \"myFunction\"?",
      "options": [
        "call function myFunction()",
        "call myFunction()",
        "myFunction()",
        "myFunction call()"
      ],
      "answerId": 3
    },
    {
      "question": "How do you create a function in JavaScript?",
      "options": [
        "function = myFunction()",
        "function myFunction()",
        "function:myFunction()",
        "function myFunction()"
      ],
      "answerId": 1
    },
    {
      "question": "How do you call a function named \"myFunction\"?",
      "options": [
        "call function myFunction()",
        "call myFunction()",
        "myFunction()",
        "myFunction call()"
      ]
    }
  ],
  "question": "My Quiz",
  "description": "This is a test quiz to test your knowledge",
  "time": 60,
  "questionsCount": 5,
  "image": "img/default.jpg"
}

```

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const dir = "./csv";

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// open up the writeable stream
let fileName = `${new Date().getTime()}.csv`;
const stream = fs.createWriteStream(`./csv/${fileName}`, { flags: "a" });

/**
 * Take axios response and write data to csv file
 * @param {AxiosResponse<*>} response
 */
const processData = (response) => {
  // extract data
  let html = response.data;
  // introduce `<html>`, `<head>`, and `<body>` elements if they are not already present
  const $ = cheerio.load(html);
  let questions = "";
  // Start your coding. I am using `$` as the variable name for cheerio. You can use any other variable name.
  // This scrapper will get all the questions and answers from the website. First I am getting all the questions and answers from the website.
  $(".single-question", html).each(function () {
    //   Now take the question and answer from the website and store it in variables.
    const question = $(this).find("h2 > div.question-main").text().trim();
    if (question !== "") {
      const a = $(this)
        .find(
          "div.question-inner > div > div > p:nth-child(1) > label:nth-child(3)"
        )
        .text();
      const b = $(this)
        .find(
          "div.question-inner > div > div > p:nth-child(2) > label:nth-child(3)"
        )
        .text();
      const c = $(this)
        .find(
          "div.question-inner > div > div > p:nth-child(3) > label:nth-child(3)"
        )
        .text();
      const d = $(this)
        .find(
          "div.question-inner > div > div > p:nth-child(4) > label:nth-child(3)"
        )
        .text();
      const e = $(this)
        .find(
          "div.question-inner > div > div > p:nth-child(5) > label:nth-child(3)"
        )
        .text();
      const answer = $(this)
        .find(
          "div.row.answer_container > div > div > div:nth-child(2) > strong"
        )
        .text();
      const solution = $(this)
        .find("div.row.answer_container > div > div > div:nth-child(3)")
        .html()
        .trim()
        .replace(/(\r\n|\n|\r|\t)/gm, "");
      let correctAnswer = answer.split(" ")[2].toLowerCase();
      questions += `${question}|${a}|${b}|${c}|${d}|${
        e === "" ? "None" : e
      }|${eval(correctAnswer)}|${solution}\n`;
    }
  });
  // write data to csv file
  stream.write(questions);
};

/**
 * Make request with dynamic url
 * @param {string} url url to get data
 * @param {string} message after complete message
 */
const requestUrl = async (url, message) => {
  return await axios(url)
    .then((response) => {
      // Get data from response and write to csv file
      processData(response);
      //   Show message after complete
      console.log(message);
    })
    .catch((err) => console.log(err));
};

// Start loop with last page number
let lastPage = 14;
let baseUrl = `https://www.examveda.com`;
let subject = `arithmetic-ability`;
let topic = `practice-mcq-question-on-time-and-work`;
let section = `1`;

/**
 * Wait 3 second and send paginated request to url
 * @param {int} i current page number
 */
(function myLoop(i) {
  // This is the setTimeout() function. It will delay the execution of the next line of code in the setTimeout() for 5 seconds.
  // It will execute till we have reached the last page.
  setTimeout(function () {
    requestUrl(
      `${baseUrl}/${subject}/${topic}/?section=${section}&page=${i}`,
      `Page ${i} scrapping  complete..`
    );
    if (--i) myLoop(i); //  decrement i and call myLoop again if i > 0
  }, 5000);
})(lastPage);

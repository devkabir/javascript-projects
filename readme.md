# Web Scraper made with Node.js :tada:

With Cheerio and Axios, I created this scrapper. It will pull content from a website and create a csv file according to your specifications.
[My exam software](https://github.com/devkabir/laravel-projects/tree/laravel-exam-app) uses this code to scrape "examveda.com" and generate a csv file.

# How this will work ? :rocket:
1. From the url, Axios will retrieve web content. 
2. Cheerio decodes markup and offers a set of APIs for navigating and interacting with the generated data structure. 
3. The provided data is asynchronously appended to a csv file using the `fs.appendFile()` method.

# How to start ?
:pushpin: Copy and pase 
```bash
git clone https://github.com/kabirkhyrul/js-web-scrapper.git
cd js-web-scrapper
npm install
```
:pushpin: change selectors in `index.js:24` function. that's it.

:pushpin: run `npm run start`

:pushpin: check `csv/` for csv file.

You can upload this csv to your script via api or as you desire. 


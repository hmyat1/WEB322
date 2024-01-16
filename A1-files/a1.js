/**********************************************************************************
WEB322 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
** Name: __Hla Myint Myat_____  Student ID: ___________185923216_______________ Date: ________15.1.24______
**********************************************************************************/

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//To process user input
function processUserInput() {
  rl.question('Do you wish to process a File (f) or directory (d): ', (answer) => {
    if (answer.toLowerCase() === 'f') {
      rl.question('Enter the name of the file to analyze: ', (fileName) => {
        console.log(`PENDING: Process file ${fileName}`);
        processFile(fileName);  // Calling function to process file
        rl.close();
      });
    } else if (answer.toLowerCase() === 'd') {
      rl.question('Enter the name of the directory to analyze: ', (dirName) => {
        console.log(`PENDING: Process directory ${dirName}`); 
        processDirectory(dirName);  // Calling function to process directory
        rl.close();
      });
    } else {
      console.log('Invalid Selection');
      rl.close();
    }
  });
}

processUserInput(); // Calling the function for user input

//To process a file
function processFile(fileName) {
  try {
    const fileContent = fs.readFileSync(fileName, 'utf8');
    const cleanedContent = fileContent.toString().replace(/\s+/g, ' ');
    const words = cleanedContent.replace(/[^\w\s\']/g, '').split(' ');

    console.log(`Number of Characters (including spaces): ${cleanedContent.length}`);
    console.log(`Number of Words: ${words.length}`);
    console.log(`Longest Word: ${getLongestWord(words)}`);

    // Optional: Adding logic to find the most repeated word
    const mostRepeatedWord = getMostRepeatedWord(words);
    if (mostRepeatedWord) {
      console.log(`Most Repeated Word: ${mostRepeatedWord.word} - ${mostRepeatedWord.count} times`);
    }
  } catch (err) {
    console.log(err.message);
  }
}

//To get the longest word
function getLongestWord(words) {
  return words.reduce((longest, word) => (word.length > longest.length ? word : longest), '');
}

//To get the most repeated word
function getMostRepeatedWord(words) {
  const wordCount = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);
  return { word: sortedWords[0], count: wordCount[sortedWords[0]] };
}

//To process a directory
function processDirectory(dirName) {
  try {
    const files = fs.readdirSync(dirName).sort().reverse();
    console.log(`Files (reverse alphabetical order): ${files.join(', ')}`);
    
    // Optional:Adding data for each file (in bytes)
    files.forEach((file) => {
      const filePath = `${dirName}/${file}`;
      const stats = fs.statSync(filePath);
      console.log(`${file}: ${stats.size} bytes`);
    });
  } catch (err) {
    console.log(err.message);
  }
}

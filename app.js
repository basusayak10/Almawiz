/*
Run npm install to add the node_modules package
In terminal of IDE, type "node app" or "node app.js" (Both should work)
Check data.json to see if file content parsed correctly 
*/

const fs = require('fs'); // using file system module
const pdfparse = require ('pdf-parse'); // using pdf-parse module to parse pdf, additional info can be found at https://www.npmjs.com/package/pdf-parse
const readline = require('readline-sync'); // using module to scan input
const fileName = readline.question("Enter PDF file name (with .pdf) "); //Enter PDF name with .pdf to parse 
const document = fs.readFileSync(fileName); // Synchonously read file data


//using pdfparse function to parse the data, then() method to return a promise of the data; if it doesn't work, it will go to the catch block      
pdfparse(document).then((data) => { 
        var str = ""; 
        var abstractArr = ["ABSTRACT", "Introduction", "Abstract", "INTRODUCTION"];
        var caseArr = ["CASE REPORT", "2. Case"];
        var discussionArr = ["Discussion", "DISCUSSION"];
        var conclusionArr = ["CONCLUSION", "Conclusion"];
        var referenceArr = ["References", "REFERENCES"];
        var startAbstract = 0, endAbstract = 0, startHeader = 0, endHeader = 0, startCase = 0, endCase = 0, lengthCase = 0, startDiscussion = 0, endDiscussion = 0, lengthDiscussion = 0, startConclusion = 0, endConclusion = 0;
        //will enter file name from the input given by the user to store into a property of the object for reference
        obj.file_name = fileName;
        //storing title from property of pdf-parse module 
        obj.title = data.info.Title;
        //store all word content from PDF document into a string variable; extracted with .text 
        str = data.text; 
        //extract all content from the author of the article which is found right below the title to the start of the abstract/introduction
        if (str.includes(data.info.Author)) {
                startHeader = str.search(data.info.Author);
        }
        for (var a = 0; a < abstractArr.length; a++) {
                if (str.includes(abstractArr[a])) {
                        startAbstract = str.search(abstractArr[a]) + abstractArr[a].length;
                        endHeader = startAbstract - abstractArr[a].length;
                }
        }
        //enter the data into the header attribute of the object
        obj.header = str.substring(startHeader, endHeader);
        //extract all content from the abstract of the article to the start of the case report
        for (var cs = 0; cs < caseArr.length; cs++) {
                if (str.includes(caseArr[cs])) {
                        lengthCase = caseArr[cs].length;
                        endAbstract = str.search(caseArr[cs]);  
                }
        }
        //enter the data into the abstract attribute of the object
        obj.abstract = str.substring(startAbstract, endAbstract);
        //extract all content from the case of the article to the start of the discussion
        startCase = endAbstract + lengthCase;
        for (var d = 0; d < discussionArr.length; d++) {
                if (str.includes(discussionArr[d])) {
                        lengthDiscussion = discussionArr[d].length;
                        endCase = str.search(discussionArr[d]);
                }
        }
        //enter the data into the case
        obj.case = str.substring(startCase, endCase);
        //extract all content from the discussion of the article to the start of the conclusion
        startDiscussion = endCase + lengthDiscussion;
        for (var c = 0; c < conclusionArr.length; c++) {
                if (str.includes(conclusionArr[c])) {
                        lengthConclusion = discussionArr[c].length;
                        endDiscussion = str.search(conclusionArr[c]);
                }
        }
        //enter the data into the discussion
        obj.discussion = str.substring(startDiscussion, endDiscussion);
        //extract all content from the conclusion of the article to the start of the references to get rid of unnecessary text content
        startConclusion = endDiscussion + lengthConclusion;
        for (var r = 0; r < referenceArr.length; r++) {
                if (str.includes(referenceArr[r])) {
                        endConclusion = str.search(referenceArr[r]);
                }
        }
        //enter the data into the conclusion
        obj.conclusion = str.substring(startConclusion, endConclusion);
        //stringify object to send to a server
        const jsonFormat = JSON.stringify(obj);
        /* 
        synchronously write the object content to the json file (data.json) after object is filled up with information
        (data.json will now be filled with the object content)
        */
        fs.writeFile('./data.json', jsonFormat, 'utf8', (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                } 
        });
//catch block if function fails to parse PDF Document 
}) .catch(() => {
                console.log("The PDF File/Document can not be extracted");
        })

//result object 
var obj = 
{
        file_name: "",
        title: "",
        header: "",
        abstract: "",
        case: "",
        discussion: "",
        conclusion: ""
}

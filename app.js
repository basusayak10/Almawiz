const fs = require('fs');
const pdfparse = require ('pdf-parse');
const document = fs.readFileSync('Literature_300.pdf'); //Only field we need to change depending on pdf file name

pdfparse(document).then((data) => {
        var str = "";
        var abstractArr = ["ABSTRACT", "Introduction", "Abstract", "INTRODUCTION"];
        var caseArr = ["CASE REPORT", "2. Case"];
        var discussionArr = ["Discussion", "DISCUSSION"];
        var conclusionArr = ["CONCLUSION", "Conclusion"];
        var referenceArr = ["References", "REFERENCES"];
        var startAbstract = 0, endAbstract = 0, startCase = 0, endCase = 0, lengthCase = 0, startDiscussion = 0, endDiscussion = 0, lengthDiscussion = 0, startConclusion = 0, endConclusion = 0;
        obj.title = data.info.Title;
        str = data.text;
        for (var a = 0; a < abstractArr.length; a++) {
                if (str.includes(abstractArr[a])) {
                        startAbstract = str.search(abstractArr[a]) + abstractArr[a].length;
                }
        }
        for (var cs = 0; cs < caseArr.length; cs++) {
                if (str.includes(caseArr[cs])) {
                        lengthCase = caseArr[cs].length;
                        endAbstract = str.search(caseArr[cs]);  
                }
        }
        obj.abstract = str.substring(startAbstract, endAbstract);
        startCase = endAbstract + lengthCase;
        for (var d = 0; d < discussionArr.length; d++) {
                if (str.includes(discussionArr[d])) {
                        lengthDiscussion = discussionArr[d].length;
                        endCase = str.search(discussionArr[d]);
                }
        }
        obj.case = str.substring(startCase, endCase);
        startDiscussion = endCase + lengthDiscussion;
        for (var c = 0; c < conclusionArr.length; c++) {
                if (str.includes(conclusionArr[c])) {
                        lengthConclusion = discussionArr[c].length;
                        endDiscussion = str.search(conclusionArr[c]);
                }
        }
        obj.discussion = str.substring(startDiscussion, endDiscussion);
        startConclusion = endDiscussion + lengthConclusion;
        for (var r = 0; r < referenceArr.length; r++) {
                if (str.includes(referenceArr[r])) {
                        endConclusion = str.search(referenceArr[r]);
                }
        }
        obj.conclusion = str.substring(startConclusion, endConclusion);
        console.log(obj); 
        
}) .catch((error) => {
                console.log("The PDF File/Document can not be extracted");
        })


var obj = 
{
        title: "",
        abstract: "",
        case: "",
        discussion: "",
        conclusion: ""
}

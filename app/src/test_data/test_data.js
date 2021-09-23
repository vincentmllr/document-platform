import { Thesis, Author, Examiner, Review } from "../model"; 


var idIncrementer = 0;

// Vielleicht daher https://www.qmss.columbia.edu/thesis-titles/
export const testTitles = [
    "The American Dream—Deferred (2013)",
    "Job Satisfaction and Employee Turnover Intention: What does Organizational Culture Have To Do With It?",
    "What Factors Are Associated With Poor Households Engaging in Entrepreneurship?",
    "Uncertainty in measuring Sustainable Development: An application for the Sustainability-adjusted HDI",
    "Homeownership and Child Welfare in Unstable Times",
    "On the Evaluation of Conditional Cash Transfer Programs",
    "Financial Crisis and Bank Failure Prediction: Learning Lessons from the Great Recession",
    "Starbucks and its Peers: Corporate Social Responsibility and Corporate Financial Performance",
    "Statistical Arbitrage Strategies and Profit Potential in Commodity Futures Markets ",
    "An Approach to Lending with Heterogeneous Borrowers"
];

export const testAuthorNames = [
    "Max Mustermann",
    "Frederik Schmidt",
    "Andreas Green",
    "Trinity Bean",
    "Meredith Vance",
    "Demarion Goodwin",
    "Emery Obrien",
    "Abagail Simon",
    "Aubree Glenn",
    "Brynlee Simpson",
    "Aidyn Blankenship",
    "Landen Hamilton",
    "Jair Wolfe",
    "Andy Cantrell"
];

export const testExaminerNames = [
    "Benjamin Sturm",
    "Max Mustermann",
    "Frederik Schmidt",
    "Andreas Green",
    "Trinity Bean",
    "Meredith Vance",
    "Demarion Goodwin",
    "Emery Obrien",
    "Abagail Simon",
    "Aubree Glenn",
    "Brynlee Simpson",
    "Aidyn Blankenship",
    "Landen Hamilton",
    "Jair Wolfe",
    "Andy Cantrell"
];

export const testCountries = ["Germany"];

export const testUniversities = ["Karlsruhe Institute of Technology"];

export const testEmails = ["@kit.edu"];

export const testFieldOfStudies = ["Computer Science", "Physics", "Engineering", "Industrial Engineering and Business Administration", "Biology", "Chemistry"];

export const testInstitutes = ["Institute of Applied Informatics and Formal Description Methods"];

export const testWebsites = ["aifb.kit.edu"];

export const testLanguages = ["German", "English"];

export const testStudyInterests = ["Artificial Intelligence", "Distributed Ledger Technology"];

export const testGrades = ["1.3","2.7","3.1","1.0","2.3","2.0","1.7"];

export const testAbstracts = ["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."];

export const testYears = ["2011", "2007", "1998", "2016", "2020", "2021", "2019", "2018"];

export const testMetaMaskAddresses = ["0x388Ef493FaD03e3C73844Be82317017dEfdf6899"];

export const testFilesBase64 = ["data:application/pdf;base64,TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNldGV0dXIgc2FkaXBzY2luZyBlbGl0ciwgc2VkIGRpYW0gbm9udW15IGVpcm1vZCB0ZW1wb3IgaW52aWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdXlhbSBlcmF0LCBzZWQgZGlhbSB2b2x1cHR1YS4gQXQgdmVybyBlb3MgZXQgYWNjdXNhbSBldCBqdXN0byBkdW8gZG9sb3JlcyBldCBlYSByZWJ1bS4gU3RldCBjbGl0YSBrYXNkIGd1YmVyZ3Jlbiwgbm8gc2VhIHRha2ltYXRhIHNhbmN0dXMgZXN0IExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2V0ZXR1ciBzYWRpcHNjaW5nIGVsaXRyLCBzZWQgZGlhbSBub251bXkgZWlybW9kIHRlbXBvciBpbnZpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1eWFtIGVyYXQsIHNlZCBkaWFtIHZvbHVwdHVhLiBBdCB2ZXJvIGVvcyBldCBhY2N1c2FtIGV0IGp1c3RvIGR1byBkb2xvcmVzIGV0IGVhIHJlYnVtLiBTdGV0IGNsaXRhIGthc2QgZ3ViZXJncmVuLCBubyBzZWEgdGFraW1hdGEgc2FuY3R1cyBlc3QgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQu"];

export const testFilePaths = ["./data/testpdf.pdf"];

export const testFileNames = ["testpdf.pdf"];

export const randomElement = (items) => {
    return items[Math.floor(Math.random()*items.length)];
};

const fileToBase64 = (file) => {

    const callBackFunction = (error, result) => {
        if (result) {
            return result;
        };
    };
  
    if(file !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callBackFunction(null, reader.result);
        reader.onerror = (error) => callBackFunction(error, null);
    }

};

export const getRandomThesis = (file, fileBase64) => {

    idIncrementer ++;

    return (
        new Thesis(
            idIncrementer,
            randomElement(testTitles),
            new Author(
                randomElement(testAuthorNames),
                randomElement(testEmails),
                randomElement(testUniversities),
                randomElement(testFieldOfStudies),
                randomElement(testStudyInterests),
                randomElement(testMetaMaskAddresses)),
            new Examiner(
                randomElement(testExaminerNames),
                randomElement(testEmails),
                randomElement(testUniversities),
                randomElement(testInstitutes),
                randomElement(testWebsites),
                randomElement(testMetaMaskAddresses)),
            randomElement(testYears),
            randomElement(testLanguages),
            randomElement(testCountries),
            randomElement(testUniversities),
            randomElement(testAbstracts),
            randomElement(testGrades),
            file,
            fileBase64,
            "no filepath set", 
            file.name,
            [new Review(4, 5, 3)]
        )
    );
};
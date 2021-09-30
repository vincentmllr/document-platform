import { Thesis, Author, Examiner, Review } from "../model"; 
const elastic = require("../elastic");


var idIncrementer = 0;
const testAuthorAddress = "0x5fe9dD4c80ab7742B62Fb40CE1fBE37D226645A1";
const testExaminerAddress = "0x388Ef493FaD03e3C73844Be82317017dEfdf6899";

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

const getRandomReviews = () => {

    let randomReviewElement = () => Math.random()*5;

    let randomReviews = [];
    for(let i = 0; i < 25; i++) {
        randomReviews.push(new Review(randomReviewElement, randomReviewElement, randomReviewElement));

    }

    return randomReviews;

};

export const testTheses = [
    // This list will be used in combination with the test files to fill the blockchain
    // This is a template how to add test thesis data to this list
    // new Thesis (
    //     0, // Use first x ids starting from 0
    //     "Title",
    //     new Author(
    //         "Author Name",
    //         "Author Email", // Look for university url and add firstname and lastname of author
    //         "Author University",
    //         "Author Field of Study",
    //         "Author Study Interest", //Use main topics of thesis instead
    //         testAuthorAddress
    //     ),
    //     new Examiner(
    //         "Examiner Name",
    //         "Examiner Email", // Look for university url and add firstname and lastname of exmainer
    //         "Examiner University",
    //         "Examiner Institute",
    //         "Examiner/Institute Website",
    //         testExaminerAddress
    //     ),
    //     "Year",
    //     "Language",
    //     "Country",
    //     "University",
    //     "Abstract", // If there is no abstract, use the first paragraph of the thesis; watch out for special letters when copying from the pdf (marked with a question mark, delete them)
    //     "Grade", // Use random grade as string
    //     undefined, // File object goes here, will be added at test file upload
    //     "", // Leave fileBase64 empty, will be added at test file upload
    //     "", // Leave filepath empty
    //     "", // filename is used to identify the file at test file upload
    //     []
    // ),
    new Thesis (
        0,
        "Die Erweiterung des Asia-Europe Meeting – diminished multilateralism oder Erfolg des Interregionalismus?",
        new Author(
            "Sophie Veauthier",
            "sophie.veauthier@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "Interregionalism Multilateralism Neorealism",
            testAuthorAddress
        ),
        new Examiner(
            "Prof. Dr. Thomas Diez",
            "thomas.diez@uni-tuebingen.de",
            "University of Tübingen",
            "Institute of Political Science",
            "www.uni-tuebingen.de",
            testExaminerAddress
        ),
        "2012",
        "German",
        "Germany",
        "University of Tübingen",
        "Ungeachtet der bestehenden Konflikte und Probleme stellt Asien die Region mit der größten Dynamik in der Welt dar. Zu ihr gehören drei Giganten: Japan, China und Indien, die international immer mehr an Gewicht gewinnen. Aus diesem Grund muss das Verhältnis der Europäischen Union zu dieser Region besonders durchdacht und positiv sein […]. (Europäisches Parlament 2001) Dieses Zitat des Abgeordneten Marset Campos des europäischen Parteienbündnisses „Vereinte Europäische Linke/Nordische Grüne Linke“ (GUE/NGL) aus einer Plenardebatte des Europäischen Parlaments 2001 ist auch heute – ungeachtet von Parteizugehörigkeiten – aktuell. Insbesondere China ist für die Europäische Union (EU) ein wichtiger Handelspartner, nach Importen der wichtigste, nach Exporten der zweitwichtigste weltweit (Eurostat 2012). Mit allen drei Ländern, Japan, China und Indien, steht die EU über das Asia-Europe Meeting (ASEM) im Dialog. Das ASEM ist ein interregionales Forum, das 1996 gegründet wurde und einen Kooperationsprozess zwischen zwei Regionen initiiert hat, die als Akteure bis dato weder auf europäischer noch auf asiatischer Seite in dieser Konstellation existierten (Bersick 2004a: 19). Während China und Japan bereits seit der Gründung des ASEM 1996 Mitglieder sind, ist Indien erst 2008 beigetreten. Weder der Beitritt Indiens, noch der Beitritt Neuseelands und Australiens 2010 waren 2001 bereits absehbar.",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Veauthier_BA-Arbeit.pdf", // filename is used to identify the file at test file upload
        []
    ),
    // new Thesis (
    //     1,
    //     "An Analysis of the Three-Step Test in International and EC Copyright Law",
    //     new Author(
    //         "Martin Senftlebe",
    //         "Author Email", // Look for university url and add firstname and lastname of author
    //         "Author University",
    //         "Author Field of Study",
    //         "Author Study Interest", //Use main topics of thesis instead
    //         testAuthorAddress
    //     ),
    //     new Examiner(
    //         "P.F. van der Heijden",
    //         "Examiner Email", // Look for university url and add firstname and lastname of exmainer
    //         "Examiner University",
    //         "Examiner Institute",
    //         "Examiner/Institute Website",
    //         testExaminerAddress
    //     ),
    //     "2004",
    //     "English",
    //     "Netherlands",
    //     "University of Amsterdam",
    //     "Thee three-step test by which limitations on exclusive copyrights are confined to 'certain speciall cases' which do not conflict with a 'normal exploitation of the work' and do not 'unreasonablyy prejudice the legitimate interests of the author' is among the most enduring off standards affecting limitations on intellectual properly rights. Its field of application is the delicatee balance between exclusive rights and sufficient breathing space for the free Row off ideas and information. However, the emerging information society has thrown numerous unforeseenn obstacles in the once-clear path of its implementation. Can the traditional balancee between grants and reservations of copyright law be recalibrated along the lines off the three-step test in order to meet current and future needs? Controversies over this cruciall question in Europe, the U.S., Australia, and elsewhere, as well as in two significant WTOO panels in 2000 have brought the three-step test into focus, the essential principle governingg copyright limitations in the information society. Investigatingg the development, structure, and function of the three-step test in international copyrightt law with thoroughness and precision. Copyright, Limitations and the Three-Step TestTest offers a close and insightful analysis of its continuing utility for the twenty-first century. Thee book includes: viablee restatements of the rationales of copyright protection for the emerging IP environment; ; neww insights into the relationship between copyright protection and copyright limitations; in-depthh explanation of the structure and functioning of the three-step test; detailedd interpretations of each criterion of the test; discussionn of the two WTO panel reports dealing with the test; aa proposal for the further improvement of the copyright system and the international rules governingg copyright law; detailedd information about international conference material concerning the test; and discussionn of potential future trends in copyright law. Thee author provides many examples that demonstrate the test's impact on different types of limitations,, such as private use privileges and the U.S. fair use doctrine. He explains the test'ss role in the European Copyright Directive. The detailed examination and explanation off the three-step test will be of extraordinary value to policymakers, judges, and lawyers in thee field of intellectual property law seeking to react adequately to the challenges of the digitall environment.", // If there is no abstract, use the first paragraph of the thesis; watch out for special letters when copying from the pdf (marked with a question mark, delete them)
    //     "2.0", // Use random grade as string
    //     undefined, // File object goes here, will be added at test file upload
    //     "", // Leave fileBase64 empty, will be added at test file upload
    //     "", // Leave filepath empty
    //     "37378_Thesis.pdf", // filename is used to identify the file at test file upload
    //     []
    // ),
];

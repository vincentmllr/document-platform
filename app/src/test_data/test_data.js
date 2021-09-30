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


new Thesis (
        1,
        "Ann Analysis of the Three-Step Test in Internationall and EC Copyright Law",
        new Author(
            "Martinn Senftlebe",
            "martin.senftlebe@uni-amsterdam.de",
            "University of Amsterdam",
            "Rechtsgeleerdheid",
            "Rechtsgeleerdheid",
            testAuthorAddress
        ),
        new Examiner(
            "Prof. mr. P.B. Hugenholt",
            "p.m.hugenholt@uni-amsterdam.de",
            "University of Amsterdam",
            "Rechtsgeleerdheid",
            "www.uni-amsterdam.de",
            testExaminerAddress
        ),
        "2004",
        "English",
        "Netherlands",
        "University of Amsterdam",
        "Thee three-step test by which limitations on exclusive copyrights are confined to 'certain speciall cases' which do not conflict with a 'normal exploitation of the work' and do not 'unreasonablyy prejudice the legitimate interests of the author' is among the most enduring off standards affecting limitations on intellectual properly rights. Its field of application is the delicatee balance between exclusive rights and sufficient breathing space for the free Row off ideas and information. However, the emerging information society has thrown numerous unforeseenn obstacles in the once-clear path of its implementation. Can the traditional balancee between grants and reservations of copyright law be recalibrated along the lines off the three-step test in order to meet current and future needs? Controversies over this cruciall question in Europe, the U.S., Australia, and elsewhere, as well as in two significant WTOO panels in 2000 have brought the three-step test into focus, the essential principle governingg copyright limitations in the information society. Investigatingg the development, structure, and function of the three-step test in international copyrightt law with thoroughness and precision. Copyright, Limitations and the Three-Step TestTest offers a close and insightful analysis of its continuing utility for the twenty-first century. Thee book includes: viablee restatements of the rationales of copyright protection for the emerging IP environment; ; neww insights into the relationship between copyright protection and copyright limitations; in-depthh explanation of the structure and functioning of the three-step test; detailedd interpretations of each criterion of the test; discussionn of the two WTO panel reports dealing with the test; aa proposal for the further improvement of the copyright system and the international rules governingg copyright law; detailedd information about international conference material concerning the test; and discussionn of potential future trends in copyright law. Thee author provides many examples that demonstrate the test's impact on different types of limitations,, such as private use privileges and the U.S. fair use doctrine. He explains the test'ss role in the European Copyright Directive. The detailed examination and explanation off the three-step test will be of extraordinary value to policymakers, judges, and lawyers in thee field of intellectual property law seeking to react adequately to the challenges of the digitall environment.",
        "2.3",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "37378_Thesis.pdf",
        []
    ),

       new Thesis (
        2,
        "AMBIGUITÄT ALS CHANCE ODER PROBLEM? Zur Deutungsoffenheit von Menschenrechtsnormen und ihrer integrativen Wirkung am Beispiel des IStGH",
        new Author(
            "Bettina Ahrens",
            "bettina.ahrens@student.uni-tuebingen.de",
            "University of Tübingen",
            "Politikwissenschaft",
            " Politikwissenschaft",
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
        "Wenn von Ambiguität im Zusammenhang mit Menschenrechtsnormen die Rede ist, dann ist es keine überraschende Reaktion, wenn der fehlenden Eindeutigkeit der Normen mit Skepsis begegnet wird. Damit Normen implementiert werden und effektiv wirken können, scheint es doch notwendig, dass genau und im Detail feststeht, was darunter jeweils zu verstehen ist – oder? Diese Position nimmt etwa der amerikanische Philosoph James Griffin ein, der die Vagheit von Menschenrechtsnormen kritisiert und behauptet, einige dieser Normen seien so schlecht formuliert, dass ihre Interpretation an einen Neuentwurf grenze (vgl. 2001: 26). Nun ist es aber offensichtlich so, dass die Menschenrechte als Gesamtkonzept trotz ihrer stetigen Interpretationsbedürftigkeit, Ambiguität und Uneindeutigkeit dennoch zu einem zentralen Element des internationalen politischen Diskurses geworden sind. Den Ausgangspunkt dieser Entwicklung seit der Nachkriegszeit bildet die bereits über 60 Jahre zurückliegende Annahme der Allgemeinen Erklärung der Menschenrechte (Universal Declaration of Human Rights, UDHR) durch die Generalversammlung der Vereinten Nationen (UN). Das in der UDHR seinen Ursprung nehmende Menschenrechtsregime ist seither nicht unverändert geblieben, sondern hat sich sowohl in seinen normativen Grundlagen als auch institutionell weiterentwickelt und ausdifferenziert. Während die UDHR noch eine rechtlich nicht bindende Willensbekundung der Staatenwelt darstellt, dienten die in ihr festgeschriebenen Prinzipien als Grundlage für den jeweils 1966 verabschiedeten Zivil- bzw. Sozialpakt (beide seit 1976 in Kraft), deren Bestimmungen nach der Ratifikation für die jeweiligen Staaten verbindlich sind. Noch einmal neue Legitimation durch die Mitgliedstaaten der gewachsenen UN erhielten die UDHR und das Menschenrechtsregime insgesamt mit dem Abschlussdokument der Weltmenschenrechtskonferenz 1993, der Wiener Erklärung. Dort heißt es im Wortlaut:",
        "1.3",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Ahrens_Ambiguität_als_Chance_oder_Problem.pdf", // filename is used to identify the file at test file upload
        []
    ),



  new Thesis (
        3,
        "Orientalism light: Eine Analyse der Identitätskonstruktion durch Othering in der Europäischen Union",
        new Author(
            "Jonas Göcke",
            "jonas.goecke@uni-tuebingen.de",
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
        "2016",
        "German",
        "Germany",
        "University of Tübingen",
        "Die vorliegende Analyse zeigt, dass sich die ausgewählten Kommissare in ihren Reden und die Europäischen Kommission in ihren Veröffentlichungen von der „Islamischen Welt“ abgrenzen, um verschiedene Dimensionen einer EUropäischen Identität zu konstruieren. Abgrenzungsobjekte sind dabei die MENA-Region, der „Süden“, die (südliche) Nachbarschaft sowie einzelne Staaten, Terrorismus und Migration/Flüchtlinge. Der Islam als Religion kommt in den Reden und Veröffentlichungen selten vor, steht aber, ohne direkt genannt zu werden, in Zusammenhang mit Terrorismus und Migration. Die Abgrenzung findet statt, indem diese Abgrenzungsobjekte wahlweise als bedrohlich, instabil, Normen verletzend oder wirtschaftlich unterentwickelt dargestellt oder kriminalisiert werden. Dadurch werden unterschiedliche EUropa-Bilder konstruiert: EUropa als Raum der Stabilität und des Friedens, EUropa der gemeinsamen Werte, EU als Helfer, EUropa als Einheit. Dieser „neue Orientalismus“ ist allerdings nicht so eindeutig, wie Teile der Theorie des Othering und des Konzepts des Orientalismus vermuten lassen würden. Stattdessen existieren unterschiedliche Narrative und Identitätsangebote nebeneinander. Zum einen wird die Region tatsächlich homogenisiert und darüber eine EUropäische Identität konstruiert, zum anderen werden aber auch innerhalb der Region verschiedene Länder differenziert und Möglichkeiten der Integration geschaffen. Die mental gezogene Grenze zwischen EUropa und Nicht-EUropa ist also durchaus permeabel, ein Orientalismus light sozusagen. Überschritten wird sie aber grundsätzlich nur durch die Übernahme als europäisch bezeichneter Werte und Normen. Die in dieser Arbeit vorgenommene Untersuchung der Identitätskonstruktion durch Othering gegenüber der „Islamischen Welt“ und dem Islam kann in Zukunft weitergeführt werden. Nachfolgend sollte eine Perspektive auf den Gesamtdiskurs erarbeitet werden, da ausschließlich Kommissionsdokumente analysiert wurden. Hier könnte eine Untersuchung von Veröffentlichungen des Europäischen Parlamentes, des Rates der EU oder auch der breiteren europäischen Öffentlichkeit gewinnbringend sein, da der Diskurs einer EUropäischen Identität nicht nur durch einen Akteur bestimmt wird. Interessant wäre außerdem eine Analyse der Entwicklung des diskursiven Verhältnisses der EU zur „Islamischen Welt“: Welchen 30 Einfluss haben zum Beispiel Ereignisse wie die Terroranschläge in Paris im Januar und November 2015, die Verschärfung der sogenannten Flüchtlingskrise im August 2015 oder das Türkei-Abkommen vom März 2016 auf die Identitätskonstruktion durch Othering? Die Wirkung dieser Konstruktion auf unterschiedliche Politikbereiche und -entscheidungen könnte ebenfalls untersucht werden. Wie wirkt sich Othering auf die Beitrittsverhandlungen mit der Türkei aus? Welchen Einfluss hat die so konstruierte Identität auf die Nachbarschaftspolitik? Nicht zuletzt betrifft die Frage nach der Wirkung von Identitätskonstruktion auch die europäische Bevölkerung, da diese der Adressat der Konstruktion ist: Identifizieren sich die Bürger stärker mit der EU, stärk diese Identifikation die Vorstellung von Europa und trägt so zu einer höheren Legitimität bei? Wie wirkt sich die Exklusion bestimmter Gruppen und Entitäten auf die Legitimität aus? Insgesamt zeigt diese Arbeit, dass Othering gegen die genannten Abgrenzungsobjekte eine große Rolle in der Konstruktion einer EUropäischen Identität spielt. Dennoch bietet die Identitätskonstruktion eine Reihe von Anknüpfungspunkten und Integrationsmöglichkeiten für das konstruierte Andere, wenn auch nur unter der Bedingung der freiwilligen oder erzwungenen Übernahme „europäischer“ Werte. Diese Ambivalenzen in der Identitätskonstruktion zwischen der Abgrenzung einerseits und der Integration andererseits bieten Möglichkeiten zu einer inklusiveren EUropäischen Identität. Außerdem wird die EU gezwungen, die dort in Abgrenzung vom Anderen konstruierten Werte sowohl nach außen als auch nach innen einzuhalten, weil nur so die positive Selbstdarstellung aufrechterhalten werden kann. Die Abgrenzung von der Nichteinhaltung von Menschenrechten, die, werden sie in vielen EU-Dokumenten auch als „europäische“ Werte bezeichnet, universell gelten (sollen), führt dazu, dass die EU diese Rechte verteidigen muss. Außerdem setzt die Möglichkeit zur Integration die EU unter Druck, sobald die propagierten Normen in anderen Staaten eingehalten werden. Eine dauerhafte Ausgrenzung ist daher nicht ohne Weiteres möglich.",
        "2.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "BA_Goecke_Orientalism_Light.pdf", // filename is used to identify the file at test file upload
        []
    ),


   new Thesis (
        4,
        "Adipositas und Körperbild Unterschiede im Körperbild zwischen adipösen und normalgewichtigen Personen",
        new Author(
            "Madlaina Bezzola",
            "-",
            "Hochschule für Angewandte Wissenschaften ZHAW",
            "klinische Psychologie",
            "klinische Psychologie",
            testAuthorAddress
        ),
        new Examiner(
            "Andrea Studer Burkhard",
            "-",
            "Hochschule für Angewandte Wissenschaften ZHAW",
            "Angewandte Psychologie",
            "www.psychologie.zhaw.ch",
            testExaminerAddress
        ),
        "2014",
        "German",
        "Austria",
        "Hochschule für Angewandte Wissenschaften ZHAW",
        "In der Schweiz hat sich der Anteil adipöser Personen in den letzten 20 Jahren beinahe verdoppelt. Experten sprechen von einer ‚pandemieartigen’ Verbreitung der Krankheit die einher geht mit erheblichen gesundheitlichen Risiken. Zudem sind Personen mit Adipositas einem grossen psychosozialen Druck ausgesetzt, denn in verschiedenen Medien wird das Schönheitsideal eines schlanken Körpers vermittelt. Sie leiden häufig unter Stigmatisierungen und Diskriminierungen. Die erlebten Diskriminierungen können negative Folgen auf den Selbstwert und auf das Körperbild haben. Die vorliegende empirische Arbeit untersucht die Unterschiede zwischen adipösen und normalgewichtigen erwachsenen Personen hinsichtlich ihres Körperbildes und der Big 5- Persönlichkeitsmerkmale. Zur empirischen Untersuchung der Fragestellung wurde eine quantitative Erhebung in Form eines Online-Fragebogens gewählt. Hierfür wurden die beiden Messinstrumente FKB-20 (Fragebogen zum Körperbild) und NEO-FFI (NEO Fünf-Faktoren Inventar) eingesetzt. Der Fragebogen wurde an adipöse und normalgewichtige Probanden verschickt. Insgesamt haben 32 adipöse und 93 normalgewichtige Personen an der Umfrage teilgenommen. Die Auswertung des Fragebogens zeigt, dass adipöse Personen über ein signifikant negativeres Körperbild verfügen als normalgewichtige Personen. Bei den Persönlichkeitsmerkmalen konnten keine eindeutigen Unterschiede zwischen den beiden Gruppen festgestellt werden. Hingegen zeigten sich folgende Zusammenhänge zwischen den Persönlichkeitsmerkmalen und dem Körperbild: Ein hoher Neurotizismus-Wert kann ein negatives Körperbild vorhersagen und die Dimensionen Offenheit für Veränderungen, Extraversion und Verträglichkeit korrelieren mit einem positiven Körperbild. Aus den Ergebnissen werden Schlussfolgerungen auf gesellschaftlicher und individueller Ebene gezogen.",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Bachelorarbeit_MBezzola_korr.pdf", // filename is used to identify the file at test file upload
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

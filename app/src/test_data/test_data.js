import { Thesis, Author, Examiner, Review } from "../model"; 

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
        "The expansion of the Asia-Europe Meeting - diminished multilateralism or success of interregionalism?",
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
        getRandomReviews()
    ),


new Thesis (
        1,
        "Ann Analysis of the Three-Step Test in Internationall and EC Copyright Law",
        new Author(
            "Martinn Senftlebe",
            "martin.senftlebe@uni-amsterdam.de",
            "University of Amsterdam",
            "law",
            "law society policymakers",
            testAuthorAddress
        ),
        new Examiner(
            "Prof. mr. P.B. Hugenholt",
            "p.m.hugenholt@uni-amsterdam.de",
            "University of Amsterdam",
            "law",
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
        "AMBIGUITY AS AN OPPORTUNITY OR PROBLEM? On the openness of interpretation of human rights norms and their integrative effect using the example of the ICC",
        new Author(
            "Bettina Ahrens",
            "bettina.ahrens@student.uni-tuebingen.de",
            "University of Tübingen",
            "Political science",
            "Politicalscience Human-rights-norms United-Nations",
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
        "Orientalism light: An analysis of the identity construction through othering in the European Union",
        new Author(
            "Jonas Göcke",
            "jonas.goecke@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "EuropeanCommission European-identity criminality",
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
        "Obesity and body image Differences in body image between obese and normal weight people",
        new Author(
            "Madlaina Bezzola",
            "-",
            "University of Applied Sciences ZHAW",
            "clinical psychology",
            "clinicalpsychology obese Discrimination",
            testAuthorAddress
        ),
        new Examiner(
            "Andrea Studer Burkhard",
            "-",
            "University of Applied Sciences ZHAW",
            "clinical psychology",
            "www.psychologie.zhaw.ch",
            testExaminerAddress
        ),
        "2014",
        "German",
        "Austria",
        "University of Applied Sciences ZHAW",
        "In der Schweiz hat sich der Anteil adipöser Personen in den letzten 20 Jahren beinahe verdoppelt. Experten sprechen von einer ‚pandemieartigen’ Verbreitung der Krankheit die einher geht mit erheblichen gesundheitlichen Risiken. Zudem sind Personen mit Adipositas einem grossen psychosozialen Druck ausgesetzt, denn in verschiedenen Medien wird das Schönheitsideal eines schlanken Körpers vermittelt. Sie leiden häufig unter Stigmatisierungen und Diskriminierungen. Die erlebten Diskriminierungen können negative Folgen auf den Selbstwert und auf das Körperbild haben. Die vorliegende empirische Arbeit untersucht die Unterschiede zwischen adipösen und normalgewichtigen erwachsenen Personen hinsichtlich ihres Körperbildes und der Big 5- Persönlichkeitsmerkmale. Zur empirischen Untersuchung der Fragestellung wurde eine quantitative Erhebung in Form eines Online-Fragebogens gewählt. Hierfür wurden die beiden Messinstrumente FKB-20 (Fragebogen zum Körperbild) und NEO-FFI (NEO Fünf-Faktoren Inventar) eingesetzt. Der Fragebogen wurde an adipöse und normalgewichtige Probanden verschickt. Insgesamt haben 32 adipöse und 93 normalgewichtige Personen an der Umfrage teilgenommen. Die Auswertung des Fragebogens zeigt, dass adipöse Personen über ein signifikant negativeres Körperbild verfügen als normalgewichtige Personen. Bei den Persönlichkeitsmerkmalen konnten keine eindeutigen Unterschiede zwischen den beiden Gruppen festgestellt werden. Hingegen zeigten sich folgende Zusammenhänge zwischen den Persönlichkeitsmerkmalen und dem Körperbild: Ein hoher Neurotizismus-Wert kann ein negatives Körperbild vorhersagen und die Dimensionen Offenheit für Veränderungen, Extraversion und Verträglichkeit korrelieren mit einem positiven Körperbild. Aus den Ergebnissen werden Schlussfolgerungen auf gesellschaftlicher und individueller Ebene gezogen.",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Bachelorarbeit_MBezzola_korr.pdf", // filename is used to identify the file at test file upload
        []
    ),

new Thesis (
        5,
        "Subjunctive Bordering. Governing the future at the EUropean border.",
        new Author(
            "Nicolas Gäckle",
            "nicolas.gaeckle@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "Frontex EU-border Middle-East",
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
        "2020",
        "German",
        "Germany",
        "University of Tübingen",
        "In 2011, Frontex brought the future into being. This took the relatively unspectacular form of publishing a ‘Forward Study of European Border Checks’ (Frontex, 2011). Commissioned by Frontex, in this study consultants from Liron Systems Ltd. as well as academic researchers from the University of Southampton, UK, and the University of Ben Gurion, Israel, imagined different future scenarios relevant to EU border management on the grounds of what they perceived to be the status quo. While some of their scenarios – most notably the ‘Wild Card’ of uprisings in the Middle East – proofed to be surprisingly close to the ‘real future’ that eventually unfolded, the study understood itself more as an exercise in “triggering interest among practitioners and managers alike, to think about the future and futures risks and research them further” (Frontex, 2011: 95) than in prediction. The study offers a decidedly extravagant gaze on the border, confronting an unknowable future through imaginative capacities. Moving forward in time to the year 2018, and heading 982 km up north geographically, from the Frontex headquarters on Plac Europejski 6 in Warsaw, Poland to the ‘Swissôtel’ on Tornimäe 3 in Tallinn, Estonia, a conference hosted by eu-LISA (European Union Agency for the Operational Management of Large-Scale IT Systems in the Area of Freedom, Security and Justice) discusses how – and if for that matter – the EU border will be ‘Getting Smarter Through Technology’ (eu-LISA, 2018). After half an hour has passed with a welcome coffee and registration matters and once the directors of eu-LISA and Frontex, Mr. Garkov and Mr. Leggeri, have delivered their keynote addresses, a panel discussing the ‘Future of information driven integrated border management’ is scheduled from 10am to 11am. According to the official conference report, a major concern in this first discussion were the implications of the ‘new’ knowledge promised through the interoperability of a range of already existing or emerging databases within the European Union (eu-LISA, 2018: 16ff). In contrast to the 2011 study, the future here emerges through ever more nuanced forms of risk analysis.",
        "1.3",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Gaeckle_2020.pdf", // filename is used to identify the file at test file upload
        []
    ),



   new Thesis (
        6,
        "Here Goes the Neighbourhood Deconstructing Migration Discourse in Russia",
        new Author(
            "Elizaveta Gaufman",
            "elizaveta.gaufman@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "European North-African refugees Russian-citizens",
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
        "A typical European horror-scenario would include hordes of uneducated primitive newcomers who came to feast on the Western welfare system, causing a wave of crime and replacing crosses with crescents on their way1. With the expulsion of the Roma by the French government (The Economist 2010a) and the closing of borders for North African refugees (Reuters 2011), parties with a nationalistic agenda winning seats in Finnish, Dutch, Danish and Italian parliaments (Von Ertel, et al. 2011) Russia stands out with its violent outbursts of xenophobia (BBC 2010, Elder 2010) that is not only directed at international migrants, but also at the Russian citizens who come from other Russian regions and don’t conform with a stereotypical ethnic Russian appearance. Several authors (Delanty, Millward 2007, 141) argue that Europe in general is experiencing a new form of racism that was dubbed ‘cultural’ or ‘symbolic’ racism which is directed at immigrants and refugees and plays on ‘common-sense’ cross-group differences (van Dijk 1985).",
        "1.0",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Gaufman_Here_Goes_the_Neighbourhood.pdf", // filename is used to identify the file at test file upload
        []
    ),   



    new Thesis (
        7,
        "SECURITIZATION OF CLIMATE CHANGE TOWARDS AN ACCOUNT OF DIFFERENT FRAMES SECURITIZING CLIMATE CHANGE",
        new Author(
            "Julia Grauvogel",
            "julia.grauvogel@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "climate-change United-Kingdom UK",
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
        "2013",
        "German",
        "Germany",
        "University of Tübingen",
        "On 17 April 2007 the Security Council held its first ever session on climate change. The United Kingdom had initiated the debate to discuss the security implications of global warming, suggesting in a background paper that climate change has the potential to threaten international peace and security by exacerbating border disputes, resource shortages, migration and humanitarian crises (UN Security Council 2007a). In the same year, the Nobel Peace Price was awarded to former US vice-president Al Gore and the International Panel on Climate Change (IPCC) for their efforts to spread information about anthropogenic global warming and potential counter-measures. In his acceptance speech for the IPCC, its chairman Rajendra Pachauri emphasized that the award was an acknowledgement of the threats to stability and human security caused by climate change. Some characterize the year 2007 as a turning point in the conceptualization of security (Brauch 2008: 12), but environmental concerns are not totally new on the agenda of security studies.",
        "1.3",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Julia_Grauvogel_Securitization_of_Climate_Change.pdf", // filename is used to identify the file at test file upload
        []
    ),  


    new Thesis (
        8,
        "(COUNTER-)HEGEMONY AND SUSTAINABLE DEVELOPMENT: THE STRUGGLE BETWEEN ANTHROPOCENTRIC AND ECOCENTRIC DISCOURSES IN THE REALM OF THE RI +20 CONFERENCE",
        new Author(
            "Judith Kron",
            "judith.kron@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "climate-change global poverty society",
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
        "2013",
        "German",
        "Germany",
        "University of Tübingen",
        "In light of multiple current global crises such as climate change, resource depletion and destruction of biodiversity, global poverty and inequality, and the crisis of the global economic and financial system, one receives the impression that ‘things can’t go on like this’. Civilization in its current configuration seems to have reached a dead-end. Gabriela Oliveira de Paula and Rachel Negrão Cavalcanti put it like this: “We only have to observe what is happening with the world to notice that the western model of economic growth, founded on efficiency and on unlimited growth, has failed and that it does not provide most of society with even the basic conditions for living” (Oliveira de Paula & Negrão Cavalcanti 2000: 109). Peter Schmuck identifies a growing consensus in society about the fact that humanity causes existential problems for itself and the whole biosphere and that there is a need for fundamental changes (Schmuck 2005: 85). In the last decades a discourse evolved and became widely accepted that calls for a revision of the development pattern and that centres around the term ‘sustainable development’. This thesis is concerned with the concept of sustainable development (SD). It argues that it is highly contested, namely that there are two principal competing conceptions of SD. They differ in regard to the fundamentality of the advocated changes of the socio-economic order. One pursues a rather anthropocentric, the other a rather ecocentric discourse.",
        "2.3",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Kron_Counter_Hegemony_and_Sustainable_Development.pdf", // filename is used to identify the file at test file upload
        []
    ),       


    new Thesis (
        9,
        "The expansion of the Asia-Europe Meeting - diminished multilateralism or success of interregionalism?",
        new Author(
            "Louiza Charalambous",
            "louiza.charalambous@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "society childhood",
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
        "2019",
        "German",
        "Germany",
        "University of Tübingen",
        "Melina and I are sitting in a café in the old town of Nicosia, very close to the Green Line that divides Cyprus into a Turkish Cypriot north and a Greek Cypriot south. A few weeks ago Melina started an internship at a non-governmental organization (NGO) working both north and south of the Green Line and employing both Greek and Turkish Cypriots. As part of her internship, Melina has crossed to the north for the first time. Growing up, she knew about the ‘other side’ only what she had heard from her family and at school namely that “they took our villages and threw us out of our homes”. While for her parents, who are both refugees from villages in the Kyrenia area in the northern part of the island, the home in the north has always been associated with great longing, Melina tells me that she could never fully understand and relate to that as her Cyprus only went as far as the Green Line. She has therefore tried to avoid everything concerning the conflict. By choosing this particular internship, however, she was now in regular contact with the north and Turkish Cypriots. As the opening statement illustrates, this has led her to reconsider many of her views and perspectives, a fact she is now trying to navigate with the stories of her childhood.",
        "2.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "MA-Charalambous.pdf", // filename is used to identify the file at test file upload
        []
    ),

   new Thesis (
        10,
        "What about Sovereignty? Security and Defence Integration within the EU and Constructions of Sovereignty",
        new Author(
            "Eva-Maria Brändle",
            "eva-marie.braendle@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "European Parliament Politics Macron",
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
        "2021",
        "German",
        "Germany",
        "University of Tübingen",
        "French President Emmanuel Macron is not reluctant to use the term sovereignty. In fact, if one follows his public speeches, it becomes obvious that he uses the very term quite often. In early 2020, for example, Macron elaborates on sovereignty in a speech at the ‘École de Guerre’– the training facility for prospective senior officers of the French armed forces in Paris. In his speech, he clearly emphasises that defence is at the heart of French sovereignty (Macron 2020). This may not seem particularly remarkable: after all, few would challenge the fact that sovereignty is important to national leaders in one way or another. Macron, however, does not leave it at French sovereignty. The French President is also eager to give programmatic speeches on the European Union (EU), in which he calls for European sovereignty. In this context, Macron insists on a “Europe de la Défense” (Macron 2017c) and presents himself as a fierce advocate of the Permanent Structured Cooperation (PESCO), which aims at deepening defence cooperation between 25 Member States of the EU (PESCO 2021). Some researchers and quite a few observers of the political sphere even regard PESCO as an institutional step towards a European army or at least a streamlined European Defence Union (von Achenbach 2017; Dembinski/Peters 2018: 1; Hughes 2018: 28). This obviously does not deter Macron from supporting the project – on the contrary, he too has proposed the creation of a European army (Bennhold/Erlanger 2018). Macron’s support of PESCO might seem surprising considering his statement on French sovereignty in front of the prospective officers at the ‘École de Guerre’: is sovereignty, especially in the crucial matter of defence, not something jealously guarded by states and irreconcilable with a ‘hand-over’ of power to international organisations? And if not, what does sovereignty mean? I am interested in this question both in the context of the French discourse around PESCO but also in, and in comparison to, the German discourse around this institutional landmark of European defence cooperation.",
        "2.0",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "MA_Braendle_Eva-Maria_Discourses_of_Sovereignty.pdf", // filename is used to identify the file at test file upload
        []
    ),

new Thesis (
        11,
        "Securitization and Data Protection: The Case of the Passenger Name Record Agreements and Security Knowledge",
        new Author(
            "Owe Langfeldt",
            "o.langfeldt@googlemail.com",
            "University of Tübingen",
            "Political Science",
            "International Civil Aviation Organization diplomatic",
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
        "2010",
        "English",
        "Germany",
        "University of Tübingen",
        "In the aftermath of 9/11, a plethora of measures to increase air transport security were enacted around the world. Organisations such as the International Civil Aviation Organization (ICAO) promulgated new standards and some states made unilateral changes, for example allowing armed “air marshals” on planes. Some of these new policies were uncontroversial, such as reinforcing cockpit doors; others caused heated discussions and diplomatic impasses. While there certainly are risks in aviation, perceptions differ a lot (Thomson et al. 2004), and there is no consensus on which remedies are to be chosen.",
        "2.3",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "MA_Langfeldt__web.pdf", // filename is used to identify the file at test file upload
        []
    ),



    new Thesis (
        12,
        "The English School Meets Africa: The African Regional International Society on Its Way to Solidarism?",
        new Author(
            "Julia Verena Klein",
            "juliaverena.klein@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "Africa International-relations solidarity",
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
        "2014",
        "German",
        "Germany",
        "University of Tübingen",
        "Diese Magisterarbeit überträgt die aus der Englischen Schule der Internationalen Beziehungen stammenden Konzepte des Pluralismus und Solidarismus auf die afrikanische regionale internationale Gesellschaft. An Barry Buzan anknüpfend wird dabei davon ausgegangen, dass Pluralismus und Solidarismus sich primär durch die Art und Anzahl der geteilten Werte unterscheiden und ineinander übergehende Positionen auf einem Spektrum darstellen. Je höher die Anzahl der sich auf Kooperation und Konvergenz beziehenden gemeinsamen Werte einer Gruppe von Staaten ist, als umso solidaristischer ist diese anzusehen. Werden hingegen nur wenige Werte geteilt und beziehen sich diese eher auf die Bewahrung der einzelstaatlichen Souveränität, so ist von Pluralismus zu sprechen. Weiterhin wird in der Arbeit das Konzept der internationalen Gesellschaft angewendet und gezeigt, dass in Afrika seit der Gründungszeit der Organisation für Afrikanische Einheit eine regionale internationale Gesellschaft existiert, die heutzutage deckungsgleich mit der Afrikanischen Union ist. Der Kern der Arbeit bezieht sich auf die Frage, ob diese zunächst pluralistische afrikanische regionale internationale Gesellschaft, die nur wenige gemeinsame Werte verfolgte, aufgrund von Veränderungen in den letzten Jahrzehnten nunmehr im solidaristischen Teil des Spektrums nach Buzan zu verorten ist. Zur Beantwortung dieser Frage werden die Veränderungen untersucht, die in den Bereichen (1) „Menschenrechte“, (2) „Interventionsrecht in die Mitgliedsstaaten“ und (3) „wirtschaftliche Kooperation und Integration“ stattgefunden haben. Als Ergebnis zeigt sich, dass die afrikanische regionale internationale Gesellschaft vor allem in den Bereichen der wirtschaftlichen Kooperation und Integration und der Menschenrechte aufgrund der Verfolgung gemeinsamer Werte Veränderungen in Richtung Solidarismus verzeichnet. Gleichzeitig jedoch nehmen auch Staatssouveränität und Interventionsverbot und somit pluralistische Prinzipien immer noch Schlüsselpositionen in dieser internationalen Gesellschaft ein. Da jedoch verschiedene Entwicklungen innerhalb Afrikas darauf hindeuten, dass Staatssouveränität nicht mehr als absolut angesehen wird und da Staaten in einzelnen Bereichen inzwischen eine Einmischung in ihre inneren Angelegenheiten zulassen, kommt die Arbeit zu dem Ergebnis, dass innerhalb der heutigen afrikanischen regionalen internationalen Gesellschaft die solidaristischen Elemente leicht überwiegen. Die afrikanische regionale internationale Gesellschaft ist deshalb im solidaristischen Bereich des PluralismusSolidarismus Spektrums zu verorten.",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Magisterarbeit_Julia_Klein.pdf", // filename is used to identify the file at test file upload
        []
    ),

   new Thesis (
        13,
        "Power of words? A theoretical draft of the possible effects of verbal criticism on major powers violating human rights using the example of the Russian anti-terrorist operation in Chechnya",
        new Author(
            "Konstanze Jüngling",
            "camjuengling@t-online.de",
            "University of Tübingen",
            "Political Science",
            "war looted Army ",
            testAuthorAddress
        ),
        new Examiner(
            "Dr. Thomas Nielebock",
            "thomas.nielebock@uni-tuebingen.de",
            "University of Tübingen",
            "Institute of Political Science",
            "www.uni-tuebingen.de",
            testExaminerAddress
        ),
        "2010",
        "German",
        "Germany",
        "University of Tübingen",
        "Mitte Dezember 1999 wurde es auf einmal wieder ruhig in Alchan-Jurt3 . Zwei Wochen lang war das Dorf bei Grosny von russischen4 Soldaten abgeriegelt worden. Die Armeemitglieder hatten die Häuser nach feindlichen Kämpfern durchkämmt, hatten Granaten in Keller geworfen, Frauen vergewaltigt, anschließend hatten sie die Gemeinde systematisch geplündert.5 Als Mitte Dezember schließlich Stille einkehrte in Alchan-Jurt, stand fest, dass bis zu 41 Menschen die „Säuberungsaktion“ nicht überlebt hatten.6 Die russische Militärführung wies jegliche Verantwortung für die Vorfälle zurück",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Masterarbeit_Jüngling.pdf", // filename is used to identify the file at test file upload
        []
    ),


    new Thesis (
        14,
        "Democracy Promotion in the Middle East: A comparison of US and EU rhetoric and policies",
        new Author(
            "Kelly Neudorfer",
            "kelly.neudorfer@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "Democracy World-War-II Western-Europe",
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
        "2009",
        "English",
        "Germany",
        "University of Tübingen",
        "Democracy promotion as a goal of foreign policy can be traced back to US President Woodrow Wilson‟s call for the League of Nations in order “to vindicate the principles of peace and justice in the life of the world as against selfish and autocratic power and to set up amongst the really free and self-governed peoples of the world such a concert of purpose and of action as will henceforth insure the observance of those principles” (Heckscher 1956: 277; Dalacoura 2005: 963). While this continued to be a reason (at least rhetorically) for especially the United States to intervene in the European theater in World War II, during the Cold War democracy promotion was put on hold in the “third world” according to the much-repeated witticism “He‟s a bastard, but at least he‟s our bastard” attributed to several US presidents about various notorious autocratic allies.1 Although democracies in Western Europe – particularly Germany – and Japan were erected and consolidated with the support of the United States, this push to democratize was not carried over into those parts of the world in which US influence was contested by the USSR (Southeast Asia, the Middle East, or Latin America, for example). The logic behind this reluctance to push for democracy was partially based on a purported dichotomy of democratization and stability, supported by a theory propagated by Samuel Huntington that authoritarian, and particularly military, regimes, were more stable during transition periods than if elected regimes tried to take power at the beginning of a transition toward democracy (Huntington: 1968). A statement made by Henry Kissinger before the US undermined the elected Allende regime in Chile in June of 1970 aptly summarizes the foreign policy priority of containment over democracy promotion during the Cold War: “I don‟t see why we need to stand by and watch a country go communist because of the irresponsibility of its own people” (Kissinger quoted in Smith 2000: 66). After the fall of the Berlin Wall and collapse of the Soviet Union, however, the dangers associated with political instability during the Cold War – namely, that a country aligned with the United States would realign with the Soviet Union – disappeared.",
        "2.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Neudorfer_MA_Democracy_Promotion.pdf", // filename is used to identify the file at test file upload
        []
    ),


    new Thesis (
        15,
        "Thinking with Railings The role of metaphors in communicating threats",
        new Author(
            "Jan Robert Schulz",
            "jrschulz@web.de",
            "University of Tübingen",
            "Political Science",
            "constructivism politics Security research",
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
        "2010",
        "German",
        "Germany",
        "University of Tübingen",
        "Der Konstruktivismus nimmt an, dass wir keinen objektiven Zugang zur sozialen Realität haben. Sprache spielt eine zentrale Rolle in unserem Verständnis und Erleben von Realität. Realität wird dabei nicht durch eine beschreibende Sprache vermittelt, sondern vielmehr durch sie konstruiert. Wenn Sprache als der Schlüssel zur sozialen Realität angesehen wird, ist verständlich, warum sie der Hauptuntersuchungsgegenstand der Diskursanalyse ist. Der Prozess der Konstruktion sozialer Realität steht im Mittelpunkt dieses Forschungszweiges. Das Schlüsselwort unserer Zeit heißt Kommunikation. Dies gilt gerade für die Politik und Politikwissenschaft. Die Leistungsfähigkeit der Politik wird zunehmend durch deren Kommunikationsfähigkeit bestimmt (Hoinle 1999, 3–5). Ein besonders spannendes Feld der politischen Kommunikation ist die Kommunikation von Bedrohungen. Viele Maßnahmen werden durch den Verweis auf bestimmte Bedrohungen legitimiert. Dies gilt für alle Politikfelder, für Innen- und Außenpolitik. Umso wichtiger erscheint es in diesem Zusammenhang für die Politikwissenschaft, ein Untersuchungsinstrument zur Verfügung zu stellen, um die Prozesse von Bedrohungskonstruktionen analysieren zu können. Ole Wæver und Barry Buzan haben mit ihrem Konzept der securitization ein bereits viel benutztes Forschungswerkzeug geschaffen (Wæver 1995; Buzan, Wæver und Wilde 1998). Es ist das meist beachtete Konzept der sich seit Anfang der 1990er Jahre entwickelnden konstruktivistischen Sicherheitsforschung. Obwohl die Versicherheitlichungstheorie metatheoretisch, theoretisch und methodisch unterentwickelt ist, hat es eine enorme Anziehungskraft. Dieser Anziehungskraft konnte auch ich mich nicht entziehen.",
        "2.3",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Schulz_Denken_mit_Geländer_BA-Arbeit.pdf", // filename is used to identify the file at test file upload
        []
    ),


    new Thesis (
        16,
        "CLIMATE CHANGE AND SECURITY IN THE US POLITICAL DISCOURSE An analysis of approaches to securitization in the US Congress",
        new Author(
            "Hanna Spanhel",
            "hanna.spanhel@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "CLIMATE-CHANGE US-Congress politics",
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
        "In den vergangenen Jahren wird der globale Klimawandel sowohl in der wissenschaftlichen als auch in der politischen Debatte zunehmend als Bedrohung für die Sicherheit dargestellt. Im April 2007 wurde das Thema Klimawandel erstmals auch vom UN-Sicherheitsrat aufgegriffen und von UNGeneralsekretär Ban Ki-Moon als mögliche treibende Kraft für zukünftige Kriege und Konflikte bezeichnet (vgl. BBC 2007*1 ). Auch in den USA wird das Thema Klimawandel mehr und mehr als Sicherheitsbedrohung für den eigenen Staat wahrgenommen. So titelte die New York Times im August 2009: „Climate Change Seen as Threat to the U.S. Security“ und berichtete über die Warnungen von US-Militärs und Geheimdienst-Beratern in Bezug auf das Thema: The changing global climate will pose profound strategic challenges to the Unites States in coming decades, raising the prospect of military intervention to deal with the effects of violent storms, drought, mass migration and pandemics, military and intelligence analysts say. (Broder 2009) Seit 2007 erschienen in den USA mehrere Berichte und Gutachten zum Klimawandel und dessen Auswirkungen auf die Sicherheit. In „National Security and the Threat of Climate Change“ des „Center for a Naval Analysis“ (CNA 2007) warnten ehemalige US-Militärs, dass der Klimawandel als Multiplikator für bestehende Instabilitäten wirken und beispielsweise durch Ressourcenverknappung, klimabedingte Migration oder die Ausbreitung von Krankheiten letztlich zu Staatsversagen, Extremismus und Konflikten führen kann (vgl. CNA 2007: 6). Zwar fand gerade diese Studie in der amerikanischen Öffentlichkeit große Beachtung – dennoch wird dem Klimawandel in den USA trotz dieser Bedrohungswahrnehmung auch in den vergangenen Jahren politisch kaum aktiv begegnet. Vielmehr gelten die Vereinigten Staaten als „Bremser“ im internationalen Klimaschutz und sind bislang nicht bereit, sich zu konkreten Emissionsreduktionen zu verpflichten. Das ausbleibende Handeln trotz zunehmender Warnungen erscheint zunächst als widersprüchlich, ließe doch die zunehmende Wahrnehmung des Klimawandels als Sicherheitsbedrohung vielmehr aktives, politisches Handeln vermuten. Um dies genauer beurteilen und den Widerspruch aufklären zu können, bedarf es eines Blicks auf den politischen Diskurs der USA zum Thema Klimawandel – vielmehr auf den Diskurs der Entscheidungsfinder und Gesetzgeber im Kongress. Inwiefern wird der Klimawandel auch von amerikanischen Politikern als solch ein Problem für die Sicherheit dargestellt – und was bedeutet dies im Hinblick auf konkretes Handeln in Bezug auf den Klimawandel? In den vergangenen Jahren wird der globale Klimawandel sowohl in der wissenschaftlichen als auch in der politischen Debatte zunehmend als Bedrohung für die Sicherheit dargestellt. Im April 2007 wurde das Thema Klimawandel erstmals auch vom UN-Sicherheitsrat aufgegriffen und von UNGeneralsekretär Ban Ki-Moon als mögliche treibende Kraft für zukünftige Kriege und Konflikte bezeichnet (vgl. BBC 2007*1 ). Auch in den USA wird das Thema Klimawandel mehr und mehr als Sicherheitsbedrohung für den eigenen Staat wahrgenommen. So titelte die New York Times im August 2009: „Climate Change Seen as Threat to the U.S. Security“ und berichtete über die Warnungen von US-Militärs und Geheimdienst-Beratern in Bezug auf das Thema: The changing global climate will pose profound strategic challenges to the Unites States in coming decades, raising the prospect of military intervention to deal with the effects of violent storms, drought, mass migration and pandemics, military and intelligence analysts say. (Broder 2009) Seit 2007 erschienen in den USA mehrere Berichte und Gutachten zum Klimawandel und dessen Auswirkungen auf die Sicherheit. In „National Security and the Threat of Climate Change“ des „Center for a Naval Analysis“ (CNA 2007) warnten ehemalige US-Militärs, dass der Klimawandel als Multiplikator für bestehende Instabilitäten wirken und beispielsweise durch Ressourcenverknappung, klimabedingte Migration oder die Ausbreitung von Krankheiten letztlich zu Staatsversagen, Extremismus und Konflikten führen kann (vgl. CNA 2007: 6). Zwar fand gerade diese Studie in der amerikanischen Öffentlichkeit große Beachtung – dennoch wird dem Klimawandel in den USA trotz dieser Bedrohungswahrnehmung auch in den vergangenen Jahren politisch kaum aktiv begegnet. Vielmehr gelten die Vereinigten Staaten als „Bremser“ im internationalen Klimaschutz und sind bislang nicht bereit, sich zu konkreten Emissionsreduktionen zu verpflichten. Das ausbleibende Handeln trotz zunehmender Warnungen erscheint zunächst als widersprüchlich, ließe doch die zunehmende Wahrnehmung des Klimawandels als Sicherheitsbedrohung vielmehr aktives, politisches Handeln vermuten. Um dies genauer beurteilen und den Widerspruch aufklären zu können, bedarf es eines Blicks auf den politischen Diskurs der USA zum Thema Klimawandel – vielmehr auf den Diskurs der Entscheidungsfinder und Gesetzgeber im Kongress. Inwiefern wird der Klimawandel auch von amerikanischen Politikern als solch ein Problem für die Sicherheit dargestellt – und was bedeutet dies im Hinblick auf konkretes Handeln in Bezug auf den Klimawandel?",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Spanhel_Klimawandel_Sicherheit_politischen_Diskurs_USA.pdf", // filename is used to identify the file at test file upload
        []
    ),


   new Thesis (
        17,
        "Hybrid courts of justice and their legitimacy in the population Do hybrid courts of justice have a high level of legitimacy in the population due to strong ownership?",
        new Author(
            "Lisa Maren Steller",
            "lisa.steller@uni-tuebingen.de",
            "University of Tübingen",
            "Political Science",
            "Courts Justice Judges hybrid-courts europ",
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
        "2013",
        "German",
        "Germany",
        "University of Tübingen",
        "Die neuste Form von internationalen Gerichtshöfen stellen hybriden Gerichtshöfe dar. Durch sie sollen solche Personen verfolgt werden, die gegen grundsätzliche Regelungen des Völkerrechts, wie Völkermord und Verbrechen gegen die Menschlichkeit, verstoßen haben. Hybride Gerichtshöfe weisen dabei einige Besonderheiten auf. So sind sie nicht ausschließlich international, sondern vereinen auch nationale Komponenten, wie die Anwendung von nationalem Recht und die teilweise Besetzung der Richterschaft durch nationale Richter1 . Während es nationalen Gerichten nach einem Konflikt oft an unabhängigen Richtern und Strafverfolgungsorganen fehlt, können internationale Gerichtshöfe diese garantieren. Doch auch die Errichtung von internationalen Gerichten kommt zu einem Preis, wie die Erfahrungen der AdHoc Tribunale für Ruanda und das ehemalige Jugoslawien Anfang der 1990er Jahre zeigten. Diese waren mit hohen Kosten, langen Verhandlungsdauern und dem Problem auf Grund der physischen Distanz der Bevölkerung zu den dort verhandelten Prozessen verbunden. Insbesondere letzteres führte zu einer mangelnden Identifizierung der Bevölkerung mit den Prozessen. Das Modell der hybriden Gerichtshöfe sollte diese Probleme der jeweils nationalen oder internationalen Gerichte umgehen, sowie die Stärken Beider vereinen.",
        "2.0",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "Steller_Hybride_Gerichtshöfe_BA.pdf", // filename is used to identify the file at test file upload
        []
    ),


 new Thesis (
        18,
        "How promising are the competence dimensions of the sales report? A correlation study on the sales report with the recruitment recommendations of the assessors in an assessment center for potential customer advisors",
        new Author(
            "Helen Burri",
            "-",
            "Zurich University of Applied Sciences",
            "Arbeits- und Organisationspsychologie",
            "potential customer advisors Instrument sales report",
            testAuthorAddress
        ),
        new Examiner(
            "Jack Rietiker, dipl. Psych. FH ",
            "-",
            "Zurich University of Applied Sciences",
            "Applied Psychology Department",
            "www.psychologie.zhaw.ch",
            testExaminerAddress
        ),
        "2012",
        "German",
        "Austria",
        "Zurich University of Applied Sciences",
        "In der vorliegenden empirisch quantitativen Bachelorarbeit wird das Instrument Sales Report im Zu sammenhang mit der Anstellungsempfehlung der Assessoren untersucht. Der Sales Report ist eine Selbsteinschätzung, welcher auf einem Persönlichkeits- und Motivationsfragebogen basiert. In einem Assessment der PostFinance für Kundenberatende werden diese Fragebogen eingesetzt. Der Sales Re port unterstützt die Assessoren bei der Bewertung der Kandidaten bezüglich einer Anstellungsempfeh lung. Durch Korrelationsberechnungen musste festgestellt werden, dass die fünf Kompetenzen des Sales Reports, die bei der Herleitung der Hypothesen als erfolgsrelevant erachtet wurden, verworfen werden mussten. Dafür wurden drei weitere signifikant korrelierende Resultate eruiert: „Aufmerksam zuhören und Verhalten interpretieren“ korreliert negativ, „strategisch denken“ und „präsentieren“ korrelieren positiv mit den Empfehlungen der Assessoren. Die Kompetenz „Präsentieren“ scheint erfolgsverspre chend für die Tätigkeit als Kundenberatungspersonen. Die Forschungsergebnisse aus der Theorie un terstreichen diese Annahme teilweise. Sie postulieren, dass eine hohe Leistungsorientierung, Einfluss nehmen auf andere und eine hohe Selbstüberwachung wichtige Merkmale für den beruflichen Erfolg darstellen (Nerdinger, 2001).",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "ba0007.pdf", // filename is used to identify the file at test file upload
        []
    ),

new Thesis (
        19,
        "Are your parents sometimes afraid of you? When children threaten or beat their parents",
        new Author(
            "Helen Burri",
            "-",
            "Zurich University of Applied Sciences",
            "Arbeits- und Organisationspsychologie",
            "violence threaten parents children",
            testAuthorAddress
        ),
        new Examiner(
            "Jack Rietiker, dipl. Psych. FH ",
            "-",
            "Zurich University of Applied Sciences",
            "Applied Psychology Department",
            "www.psychologie.zhaw.ch",
            testExaminerAddress
        ),
        "2008",
        "German",
        "Austria",
        "Zurich University of Applied Sciences",
        "Die vorliegende Arbeit befasst sich mit dem Phänomen Elternmisshandlung. Um die Gefühle von betroffenen Eltern und Jugendlichen vor, während und nach einem Übergriff besser verstehen zu können, wurden betroffene Personen mittels Fragebogen und ergänzenden Interviews befragt. Die Erhebung wurde von den Fragestellungen geleitet, wie sich Eltern und Jugendliche in Eskalationssituationen fühlen, welche Faktoren die Entwicklung dieses Phänomens begünstigen und ob es Möglichkeiten gibt, die Übergriffe zu verhindern. Zu Beginn der Arbeit wurde die theoretische Grundlage für die nachfolgende Untersuchung gelegt. Dabei wurden die Gewaltentwicklung, die Gewalt von Minderjährigen gegenüber ihren Eltern und mögliche Präventions- und Interventionsmöglichkeiten vorgestellt. Die darauffolgende Untersuchung mit Eltern und Jugendlichen ergab, dass in Übergriffsituationen alle Betroffenen hilflos, traurig und überfordert sind. Zudem konnten gewaltbegünstigende Faktoren herausgearbeitet werden und entsprechende Präventionsansätze generiert werden. Aufgrund des Ergebnisses, dass Übergriffe verhindert werden können, wurden konkrete Interventionsmöglichkeiten diskutiert. Als weiteres Ergebnis der Untersuchung wurde deutlich, dass Elternmisshandlung in der Öffentlichkeit thematisiert werden muss. Nur so wird es möglich, dieses schambesetzte Thema zu enttabuisieren, die Gesellschaft dazu zu ermutigen, Betroffene zu unterstützen und Hilfsangebote erarbeiten und anbieten zu können.",
        "2.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "ba0109.pdf", // filename is used to identify the file at test file upload
        []
    ),


new Thesis (
        20,
        "Life satisfaction despite traumatic brain injury The way back to a (satisfied) life?",
        new Author(
            "Andrea Elisabeth Filliger",
            "-",
            "Zurich University of Applied Sciences",
            "Career and rehabilitation advice",
            "brain injury rehabilitation Children traumatic",
            testAuthorAddress
        ),
        new Examiner(
            "Alexa Anthenien, lic phil ",
            "-",
            "Zurich University of Applied Sciences",
            "Applied Psychology Department",
            "www.psychologie.zhaw.ch",
            testExaminerAddress
        ),
        "2010",
        "German",
        "Austria",
        "Zurich University of Applied Sciences",
        "Die vorliegende Arbeit untersucht die Lebenszufriedenheit von Menschen, welche in der Vergangenheit ein Schädel-Hirn-Trauma erlitten haben. Die Daten wurden mittels persönlich an spezifischen Anlässen verteilten Fragebögen ermittelt. Von zwölf retournierten Fragebögen konnten deren elf für eine deskriptive Auswertung verwendet werden und somit reichen die ermittelten Werte nicht für eine repräsentative Studie. Folgender Hypothese wird in dieser Untersuchung nachgegangen: Menschen mit einem Schädel-Hirn-Trauma, die auch eine Psychotherapie gemacht haben, zeigen in den relevanten Aspekten der allgemeinen Lebenszufriedenheit (Gesundheit, Arbeit und Beruf, Finanzielle Lage, Freizeit, Ehe und Partnerschaft, Beziehung zu den eigenen Kindern, eigene Person, Sexualität, Freunde/Bekannte/Verwandte, Wohnung) höhere Werte/ Summen als Menschen mit Schädel-Hirn-Trauma, welche bis jetzt keine Psychotherapie gehabt haben. Die Ergebnisse stützen diese Hypothese nur zum Teil, so zeigt sich nicht in sämtlichen Lebensbereichen eine höhere Lebenszufriedenheit und da die Stichprobengrösse zu klein ist für eine repräsentative Aussage, kann nur von Tendenzen gesprochen werden. Es scheint jedoch tatsächlich eine Tendenz zu höherer Lebenszufriedenheit von Menschen, welche ein Schädel-Hirn-Trauma erlebt haben und eine Psychotherapie gemacht haben, gegenüber von Schädel-Hirn-Traumatisierten, welche keine Psychotherapie gemacht haben, zu geben.",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "ba0116.pdf", // filename is used to identify the file at test file upload
        []
    ),

new Thesis (
        21,
        "Investigation of the methodological loyalty of integrative body psychotherapists",
        new Author(
            "Anika Veigel",
            "-",
            "Zurich University of Applied Sciences",
            "Career and rehabilitation advice",
            "psychotherapists Body Therapy",
            testAuthorAddress
        ),
        new Examiner(
            "Dr. phil. Agnes von Wyl",
            "-",
            "Zurich University of Applied Sciences",
            "Applied Psychology Department",
            "www.psychologie.zhaw.ch",
            testExaminerAddress
        ),
        "2010",
        "German",
        "Austria",
        "Zurich University of Applied Sciences",
        "Im Rahmen einer ambulanten Praxisstudie wurde die Methodentreue der einzelnen integrativen Körperpsychotherapeuten untersucht. Als Messinstrument wurde der QSort nach Jones (1998) verwendet. Es wurden 18 Klienten mit je drei Therapiesitzungen (54 Therapiegespräche) durch zwei unabhängige Beobachter mit dem Q-Sort, bestehend aus 100 verschiedenen Items, ausgewertet. Durch ein Expertenteam wurde eine prototypische Ideal-Therapiestunde mit dem Q-Sort bewertet. Die Mittelwerte der geschätzten Therapiegespräche wurden mit den Mittelwerten des Prototyps verglichen. Die Ergebnisse zeigen sehr deutlich, dass über 70% der Therapiegespräche Items signifikant von den Prototyp-Items abweichen. Dies bestätigt einen eklektischen und methodenpluralistischen Behandlungsansatz der Therapeuten. Es ist davon auszugehen, dass die Arbeitsweise unter den Therapeuten heterogen ist. Das vorliegende Forschungsergebnis ist insbesondere aufschlussreich für die „Integrative Körperpsychotherapie“ und den Ansatz der methodenpluralistischen Arbeitsweise der Therapeuten.",
        "1.3",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "ba0117.pdf", // filename is used to identify the file at test file upload
        []
    ),



new Thesis (
        22,
        "Compliance and Trust of Schizophrenic Patients A Comparison of Forensic and General Psychiatry",
        new Author(
            "Stefanie Flühler",
            "-",
            "Zurich University of Applied Sciences",
            "Klinische Psychologie",
            "Compliance schizophrenia trust",
            testAuthorAddress
        ),
        new Examiner(
            "lic. phil. Yves Wetli",
            "-",
            "Zurich University of Applied Sciences",
            "Applied Psychology Department",
            "www.psychologie.zhaw.ch",
            testExaminerAddress
        ),
        "2011",
        "German",
        "Austria",
        "Zurich University of Applied Sciences",
        "Die vorliegende empirische Arbeit untersucht schizophrene Patientinnen und Patienten in Bezug auf die zwei Faktoren „Compliance“ und „Vertrauen“. Das soziale Vertrauen ist ein wichtiger Faktor für den Aufbau einer gewinnbringenden therapeutischen Beziehung, deren Bedeutsamkeit für das Therapieergebnis in der Forschung vielfach belegt wurde. Eine bekannte Problematik ist die Behandlungscompliance bei schizophrenen Personen. Aufbauend auf dem theoretischen Hintergrund zum Krankheitsbild Schizophrenie wurden Unterschiede zwischen Allgemeinpsychiatrie und dem spezifischen Fachgebiet der Forensik herausgearbeitet. Die Stichproben wurden anhand von zwei bestehenden Fragebogen miteinander verglichen. Mittels Experteneinschätzung wurden die Daten von drei verschiedenen Berufsgruppen erhoben. Die befragten Personen stehen in direkter therapeutischer oder pflegerischer Beziehung zu den untersuchten Patientinnen und Patienten. Die Ergebnisse zeigen, dass Compliance und Vertrauen in einem positiven Zusammenhang zueinander stehen. Weiter wurde ersichtlich, dass sich die forensische Stichprobe in Bezug auf das Vertrauen nicht von der Vergleichsgruppe unterscheidet, in Bezug auf die Compliance zeigte sich hingegen ein Unterschied. In der forensischen Stichprobe wurden zusätzlich die Unterschiede zwischen den einzelnen einschätzenden Fachgruppen herausgearbeitet. Das Vertrauen der untersuchten Personen wird von allen Gruppen ähnlich eingeschätzt, die Ergebnisse zeigen keine statistisch belegbaren Unterschiede. In der Einschätzung der Compliance unterscheiden sich die Gruppen. Da die Daten mittels Fremdeinschätzungen erhoben wurden, sind keine Aussagen zur Sichtweise der Patientinnen und Patienten bezüglich Vertrauen und Compliane möglich.",
        "1.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "ba0141.pdf", // filename is used to identify the file at test file upload
        []
    ),


new Thesis (
        23,
        "A SAMPLE RESEARCH PAPER/THESIS/DISSERTATION ON ASPECTS OF ELEMENTARY LINEARY ALGEBRA",
        new Author(
            "James Smith",
            "-",
            "Southern Illinois University Carbondale",
            "Mathematics",
            "ALGEBRA LINEARY Mathematics",
            testAuthorAddress
        ),
        new Examiner(
            "Dr. J. Jones",
            "-",
            "Southern Illinois University Carbondale",
            "Department of Mathematics",
            "https://siu.edu/",
            testExaminerAddress
        ),
        "2010",
        "English",
        "US",
        "Southern Illinois University Carbondale",
        "NAME OF STUDENT, for the Doctor of Philosophy degree in MAJOR FIELD, presented on DATE OF DEFENSE, at Southern Illinois University Carbondale. (Do not use abbreviations.) TITLE: A SAMPLE RESEARCH PAPER ON ASPECTS OF ELEMENTARY LINEAR ALGEBRA MAJOR PROFESSOR: Dr. J. Jones (Begin the abstract here, typewritten and double-spaced. A thesis abstract should consist of 350 words or less including the heading. A page and one-half is approximately 350 words.)",
        "2.7",// Use random grade as string
        undefined, // File object goes here, will be added at test file upload
        "", // Leave fileBase64 empty, will be added at test file upload
        "", // Leave filepath empty
        "thesis.pdf", // filename is used to identify the file at test file upload
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

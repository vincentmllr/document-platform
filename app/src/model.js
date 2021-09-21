
export class Thesis {

    constructor(
        id=0,
        title="",
        author=new Author(),
        examiner=new Examiner(),
        year = "",
        language = "",
        country = "",
        university = "",
        abstract = "",
        grade = "",
        file = "",
        fileBase64 = "",
        filePath = "",
        fileName = "",
        reviews =[]
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.examiner = examiner;
        this.year = year;
        this.language = language;
        this.country = country;
        this.university = university;
        this.abstract = abstract;
        this.grade = grade;
        this.file = file;
        this.fileBase64 = fileBase64;
        this.filePath = filePath;
        this.fileName = fileName;
        this.reviews = reviews;
    }

}

export class Author {

    constructor (
        name = "",
        email = "",
        university = "",
        fieldOfStudy = "",
        studyInterests = "",
        metaMaskAddress = ""
    ) {
        this.name = name;
        this.email = email;
        this.university = university;
        this.fieldOfStudy = fieldOfStudy;
        this.studyInterests = studyInterests;
        this.metaMaskAdress = metaMaskAddress;
    }

}

export class Examiner {

    constructor (
        name = "", 
        email = "",
        university = "",
        institute = "",
        website = "",
        metaMaskAddress = ""
    ) {
        this.name = name;
        this.email = email;
        this.university = university;
        this.institute = institute;
        this.website = website;
        this.metaMaskAdress = metaMaskAddress;
    }
}

export class Review {

    constructor (general, relevance, methodology) {
        this.general = general;
        this.relevance = relevance;
        this.methodology = methodology;
    }

}
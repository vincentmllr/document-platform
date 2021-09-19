
export class Thesis {

    constructor(id, title, author, examiner, date, language, country, abstract, grade, file, fileBase64, filePath, fileName, reviews){
        this.id = id;
        this.title = title;
        this.author = author;
        this.examiner = examiner;
        this.date = date;
        this.language = language;
        this.country = country;
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

    constructor (name, email, university, fieldOfStudy, studyInterests, metaMaskName) {
        this.name = name;
        this.email = email;
        this.university = university;
        this.fieldOfStudy = fieldOfStudy;
        this.studyInterests = studyInterests;
        this.metaMaskName = metaMaskName;
    }

}

export class Examiner {

    constructor (name, email, university, institute, website, metaMaskName) {
        this.name = name;
        this.email = email;
        this.university = university;
        this.institute = institute;
        this.website = website;
        this.metaMaskName = metaMaskName;
    }
}

export class Review {

    constructor (general, relevance, methodology) {
        this.general = general;
        this.relevance = relevance;
        this.methodology = methodology;
    }

}
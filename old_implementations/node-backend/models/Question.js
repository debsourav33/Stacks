class Question{
    constructor(id,title,description,userName, votes = 0){
        this.id = id;
        this.title = title;
        this.description = description;
        this.userName = userName;
        this.votes = votes;
    }
}

module.exports = Question;
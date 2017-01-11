class People {
    constructor(firstName, secondName) {
        this.firstName = firstName;
        this.secondName = secondName;
    }

    getName(){
        console.log('First name: ' + this.firstName + '\n' + 'Second Name: ' + this.secondName);
    }
}

module.exports = People;
const ResponseDto = require("./ResponseDto");

class ProfessorResponseDto extends ResponseDto{
    constructor(status, message, data){
        super(status, message)
        this.data = data;
    }
}

module.exports = ProfessorResponseDto
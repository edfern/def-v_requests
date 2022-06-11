const ResponseDto = require("./ResponseDto");

class LoginResponseDto extends ResponseDto{
    constructor(status, message, data){
        super(status, message)
        this.data = data;
    }
}

module.exports = LoginResponseDto
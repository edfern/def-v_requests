const ResponseDto = require("./ResponseDto");

class SolicitudeResponseDto extends ResponseDto{
    constructor(status, message, data){
        super(status, message)
        this.data = data;
    }
}

module.exports = SolicitudeResponseDto
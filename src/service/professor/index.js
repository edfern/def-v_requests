const query = require('../../config/config');
const ProfessorResponseDto = require('../../dto/ProfessorResponseDto');
const { PROFESSOR_BY_NAME } = require('../../util/util');

const getAllProfessors = async () =>{
    try{
        let listProfessor  = await query(PROFESSOR_BY_NAME)
        if (Object.keys(listProfessor).length === 0) {
            return new ProfessorResponseDto(500, 'No se encontraron resultados.');
          } else {
              const items = listProfessor.map((item)=>{
                  delete item.id_credentials
                  return item
              })
            return new ProfessorResponseDto(200, 'success', items);
          }
    }catch(err){
        console.log(err)
    }

}

module.exports = {
    getAllProfessors,
}
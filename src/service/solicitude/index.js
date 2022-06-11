const SolicitudeResponseDto = require('../../dto/SolicitudeResponseDto');
const query = require('../../config/config');
const moment = require('moment');

const create = async (solicitude, res) => {
  const { idStudent, idProfessor, name, description, approved } = solicitude;
  try {
    const countRequest = await query(
      'select count(requests.id) as count from requests inner join students on requests.id_student = students.id where requests.id_student = ?',
      [idStudent]
    );

    if (countRequest[0].count > 0) {
      return res
        .status(500)
        .json(
          new SolicitudeResponseDto(
            '500',
            'El usuario ya tiene una solicitud a su nombre'
          )
        );
    }

    const create = await query(
      'INSERT INTO requests(name, description, id_student, id_professor, date, approved) VALUES (?,?,?,?,?,?)',
      [
        name,
        description,
        idStudent,
        idProfessor,
        moment(Date.now()).format(),
        approved,
      ]
    );

    return res.status(200).json(new SolicitudeResponseDto(
        200,
        'Exito, se guardo correctamente la solicitud'
      ))
  } catch (err) {
    console.log(err);
  }
};

const update = async (solicitude) => {
  console.log(solicitude);
  const { id, name, description, id_student, id_professor, date, approved } =
    solicitude;
  try {
    const requestUpdate = await query(
      'UPDATE requests SET name = ?, description = ?, id_student = ?, id_professor = ?, date = ?, approved = ? WHERE id = ?',
      [name, description, id_student, id_professor, moment(date).format(), approved, parseInt(id)]
    );
    console.log(requestUpdate, 'By Update');
    if (Object.keys(requestUpdate).length > 0) {
      return new SolicitudeResponseDto(200, 'success');
    } else {
      return new SolicitudeResponseDto(
        400,
        'No se ha podido actualizar. Vuelve a intentarlo.'
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const solicitudeAllByIdProfessor = async (id, res) => {
  try {
    const requests = await query(
      'SELECT * FROM requests WHERE id_professor = ?',
      [id]
    );
    if (Object.keys(requests).length > 0) {
      return res.status(200).json( new SolicitudeResponseDto(200, 'success', requests))
    } else {
      return res.status(500).json(new SolicitudeResponseDto(
        500,
        'El docente no tiene ninguna solicitud a su nombre.'
      ))
    }
  } catch (err) {
    console.log(err);
  }
};

const solicitudeById = async (id) => {
  try {
    const request = await query('SELECT students.id AS id_student, students.name AS name_student, students.surname AS surname_student, students.carne AS carne_student, requests.* FROM requests INNER JOIN students ON requests.id_student = students.id WHERE requests.id = ?', [id]);
    if (Object.keys(request).length > 0) {
      return new SolicitudeResponseDto(200, 'success', request[0]);
    } else {
      return new SolicitudeResponseDto(
        400,
        'No se encontro ninguna solicitud.'
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const solicitudeByIdStudent = async (id, res) => {
  try {
    const request = await query(
      'SELECT students.id AS id_student, students.name AS name_student, students.surname AS surname_student, students.carne AS carne_student, requests.* FROM requests INNER JOIN students ON requests.id_student = students.id WHERE requests.id_student = ?',
      [id]
    );
    if (Object.keys(request).length > 0) {
      return res
        .status(200)
        .json(new SolicitudeResponseDto(200, 'success', request[0]));
    } else {
      return res
        .status(500)
        .json(
          new SolicitudeResponseDto(400, 'No se encontro ninguna solicitud.')
        );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  create,
  solicitudeAllByIdProfessor,
  solicitudeById,
  solicitudeByIdStudent,
  update,
};

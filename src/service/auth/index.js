const query = require('../../config/config');
const mysql = require('mysql');
const LoginResponseDto = require('../../dto/LoginResponseDto');
const { generateAccessToken } = require('../JWT');

const ROLES = {
  student: 'students',
  professor: 'professors',
  admin: 'admin',
};

const ROLE_DEFAULT = 'admin';

const verifyUserCredentials = async (credentials, res) => {
  const { idRole, email, password } = credentials;

  let role =
    idRole === 1
      ? ROLES['admin']
      : idRole === 2
      ? ROLES['professor']
      : idRole === 3
      ? ROLES['student']
      : ROLES[ROLE_DEFAULT];

  let sql = mysql.format(
    `SELECT ${role}.* FROM ${role} INNER JOIN credentials ON ${role}.id_credentials = credentials.id WHERE credentials.email = ? AND credentials.password = ?`,
    [email, password]
  );

  try {
    const student = await query(sql, [email, password]);

    if (Object.keys(student).length === 0) {
      return res.status(404).json(new LoginResponseDto(404, 'Las credenciales no son validas'))
    } else {
      let { id, name, surname, carne } = student[0];
      let token = generateAccessToken(name);
      return res.status(200).json(new LoginResponseDto(200, 'success', { id, name, surname, carne, token }))
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = verifyUserCredentials;

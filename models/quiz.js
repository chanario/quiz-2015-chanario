// Definicion del modelo de Quiz mediante sequelize.define y con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    	'Quiz',
      { pregunta: {
          type: DataTypes.STRING,
          validate: { notEmpty: {msg: "-> Falta Pregunta"}}
        },
        respuesta: {
          type: DataTypes.STRING,
          validate: { notEmpty: {msg: "-> Falta Respuesta"}}
        }
      }
    );
  }
  

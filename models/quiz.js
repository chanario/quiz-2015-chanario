// Definicion del modelo de Quiz mediante sequelize.define

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
            { pregunta:  DataTypes.STRING,
              respuesta: DataTypes.STRING,
            }
         );
}

module.exports= (sequelize, dataTypes) => {

    let alias='User';
    let cols= {
      id:{
        type: dataTypes.BIGINT(10).UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name:{
        type: dataTypes.STRING(500),
        allowNull: false
      },
      email:{
      type: dataTypes.STRING,
      allowNull:false
      },
      password:{
      type: dataTypes.STRING,
      allowNull:false
      },
      remember_token:{
      type: dataTypes.STRING
      },
      rol: {
      type: dataTypes.TINYINT
      }
    };
    
    let config ={
      tableName:"users",
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  
    const User = sequelize.define(alias,cols,config);
      
    /*User.associate = (models) => {
      // Roles
      /*User.belongsTo(models.CarroCompras, {
        as: "carroCompra",
        foreignKey: "carroCompra_id",
      });*/
      /*User.belongsToMany(models.Ventas,{
        as:"venta",
        through:"Venta_Usuario",
        foreignKey:"user_id",
        otherKey:"venta_id",
        timestamps:false
      });
      //Categories
      User.belongsTo(models.CategoriesUsers,{
        as:"categoryUsers",
        foreignKey:"categoryUsu_id"
      });
      User.belongsTo(models.UserImage, {
        as: "image",
        foreignKey: "image_id",
      });
  
    };*/
    return User;
  }
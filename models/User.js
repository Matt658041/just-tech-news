const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create our User Model
class User extends Model {}

// define table columns and configuration
User.init(
    {
    //define an id column
    id: {
        // use the special sequelize datatypes object proved what type of data it is
        type:DataTypes.INTEGER,
        //this is the equivalent of sqls `not null` option
        allowNull:false,
        //instruct that this is the primary key
        primaryKey:true,
        //turn on auto increment
        autoIncrement:true
    },
    //define a user name column
    username: {
        type: DataTypes.STRING,
        allowNull:false
    },
    // define an email column
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        // there cannot be any duplicate email values in this table
        unique:true,
        // if allowNull is set to false, we can run our data through validators before creating the table data
        validate:{
            isEmail:true
        }
    },
    //define a password column
    password: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{ 
            //this means the characters must be at least 4 characters long
            len:[4]
        }

    }

},

{
    // table configurations options go here(https://sequelize.org/v5/manual/models-definition.html#configuration))

    //pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    //don't automatically crate createdAT/updatedAT timestamp fields
    timestamps:false,
    // don't pluralize the name of the database table
    freezeTableName: true,
    //use underscores instead of camel casing (i.e `comment_text and not `commentText`)
    underscored:true,
    //make it so model stays lowercase in database
    modelName:'user' 
},

);
model.exports = User;

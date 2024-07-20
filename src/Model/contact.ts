import { Model, DataTypes } from "sequelize"
import { sequelize } from "../Config/database"


class Contact extends Model { }

const { INTEGER,STRING,DATE,NOW } = DataTypes
Contact.init({

    id: {
        type: INTEGER,
        autoIncrement: true,
    },
    phoneNumber: {
        type: INTEGER,
        allowNull:true
    },
    email:{
        type:STRING,
        allowNull:true
    },
    linkedId:{
        type:INTEGER,
        allowNull:true,
    },
    linkPrecedence:{
        type:DataTypes.ENUM("primary","secondory"),
        allowNull:true
    },
    createdAt:{
        type:DATE,
        allowNull:false,
        defaultValue:NOW
    },
    updatedAt:{
        type:DATE,
        allowNull:true
    }
},
    {
        sequelize,
        modelName: "Contacts",
        timestamps: true,
        paranoid: true,

    }
)
export default Contact
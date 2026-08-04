
import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema({

    EmpName: {
        type: mongoose.Schema.Types.ObjectId,
        red: "employee",
        required: true
    },

    Status: {
        type: String,
        required: true,
        enam: ["absent ", "present"]
    },

    date: {
        type: Date,

    },

    markedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }
},
    {
        timestamps: true
    })

const attendanceModel = mongoose.model("attendance", attendanceSchema)

export default attendanceModel
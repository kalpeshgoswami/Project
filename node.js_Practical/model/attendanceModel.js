
import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema({

    EmpName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ["absent", "present"]
    },

    date: {
        type: Date,
        default: Date.now
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
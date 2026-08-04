import HttpError from "../middleware/HttpError.js";
import attendanceModel from "../model/attendanceModel;.js";

const add = async (req, res, next) => {
    try {

        const { employeeId, date, status, markedBy } = req.body;

        const attendance = new Attendance({
            employeeId,
            date,
            status,
            markedBy
        });

        await attendance.save();

        res.status(201).json({
            success: true,
            message: "Attendance added successfully",
            attendance
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { add };
import HttpError from "../middleware/HttpError.js";
import attendanceModel from "../model/attendanceModel.js";

const markAttendance = async (req, res, next) => {

    try {

        const { EmpName, status } = req.body;

        const attendance = await attendanceModel({
            EmpName,
            status,
            markedBy: req.employee._id
        });
        await attendance.save();

        res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            attendance,
        });

    } catch (error) {

        next(new HttpError(error.message, 500));
    }
};

const todayAttendance = async (req, res, next) => {

    try {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const attendance = await attendanceModel.find({

            date: {
                $gte: start,
                $lte: end,
            }
        })

        res.status(200).json({ success: true, attendance })

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }

}

export default { markAttendance, todayAttendance };

async function add(req, res, next) {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload profile image",
      });
    }

    // Check existing email
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const newUser = new userModel({
      name,
      email,
      password,
      phone,
      address,
      role: "user",
      userPhoto: req.file.path,
      cloudinary_id: req.file.filename || null,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "New User Added Successfully",
      newUser,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return next(new HttpError(error.message, 500));
  }
}

const User = require('../model/User');
const Code = require('../model/Code');
const { validateInput } = require('../utils/generatecode');

const Sign = async (req, res) => {
    try {
        let { name, matric, code } = req.body;

        // Validate input
        const validationError = validateInput(matric, name, code);
        if (validationError.length > 0) {
            return res.status(400).json({ status: 400, message: validationError });
        }

        // Check if student has already signed in
        let user = await User.findOne({ matric });
        if (user) {
            return res.status(400).json({ status: 400, message: ["Attendance Complete, you cannot sign another"] });
        }

        // Find the code in the database
        const codeDoc = await Code.findOne({});
        if (!codeDoc) {
            return res.status(400).json({ status: 404, message: ["No code found in the database"] });
        }

        // Check if the provided code matches the one in the database
        if (code !== codeDoc.code) {
            return res.status(400).json({ status: 404, message: ["Invalid Code" ] });
        }

        // Create new user entry
        user = new User({ name, matric });
        const saveUser = await user.save();

        return res.status(200).json({
            status: 200,
            message: 'Attendance Recorded',
            user: {
                id: saveUser._id,
                name: saveUser.name,
                matric_number: saveUser.matric
            }
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: ["Something went wrong" ], data: [], error: error });
    }
};

module.exports = {
    Sign
};

const Code = require('../model/Code');
var cron = require('node-cron');


// Upsert function to generate and update random code
const upsertCode = async (hexCode) => {
    const code = hexCode;
    await Code.findOneAndUpdate(
        {}, // Filter: find any document
        { code, createdAt: Date.now() }, // Update fields
        { upsert: true, new: true } // Options
    );
    console.log(`Generated and updated code: ${code}`);
};


function generateRandomHexCodeAndUpdate() {

    // run job at every 00:00  with ( '0 0 * * * ')
    cron.schedule(' 0 0 * * * ', () => {
        const characters = 'ABCDEFghijklmnop1234567890';
        let hexCode = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            hexCode += characters[randomIndex];
        };

        upsertCode(hexCode).catch(err => console.error(err));
    });

}



const validateInput = (matric, name, code) => {
    const errors = [];

    if (!/^\d{9}$/.test(matric)) {
        errors.push("Matric must be a 9-digit number");
    }
    if (!/^[a-zA-Z\s-]*$/.test(name)) {
        errors.push("Name can only contain letters, spaces, and hyphens");
    }
    if (typeof name !== 'string' || name.length > 100 ) {
        errors.push("Name must be a string with no more than 100 characters");
    }
    if (typeof code !== 'string' || code.length !== 5) {
        errors.push("Invalid Code");
    }

    return errors; 
};






module.exports = { generateRandomHexCodeAndUpdate, upsertCode, validateInput }; 

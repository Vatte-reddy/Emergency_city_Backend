import validator from "validator";

export const validate = (req) => {

    const {
        name,
        email,
        password,
        phone,
        role
    } = req.body;

    if (
        !name ||
        !email ||
        !password ||
        !phone ||
        !role
    ) {
        throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }
};

export const validateEdit = (req) => {

    const allowedFields = [
        "name",
        "email",
        "phone",
        "role"
    ];

    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((field) =>
        allowedFields.includes(field)
    );

    if (!isValidOperation) {
        throw new Error("Invalid operation");
    }
};

export const ValidateEmergencyUnit = (req) => {

    const allowedFields = ["Police", "Fire", "Ambulance", "Hospital", "Disaster"];

    if (!allowedFields.includes(req.body.type)) {
        throw new Error("Invalid emergency unit type");
    }
};
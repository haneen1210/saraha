const dateMethods = ['body', 'query', 'params', 'headers']
const validation = (Schema) => {
    return (req, res, next) => {
        const validationArray = [];
        dateMethods.forEach((key) => {
            if (Schema[key]) {
                const VAlidationResult = Schema[key].validate(req[key], { abortEarly: false });
                if (VAlidationResult.error) {
                    validationArray.push(VAlidationResult.error.details);
                }
            }
        })

        if (validationArray.length > 0) {
            return res.status(400).json({ message: "validation error", validationArray });
        }
        else {
            return next();
        }
    }
}
export default validation;
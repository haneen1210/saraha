export const asynHandler = (fun) => {
    return (req, res, next) => {
        fun(req, res, next).catch((error) => {
            return res.status(500).json({ message: "catch error", error: error.stack });
        })
    }
}
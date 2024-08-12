const port = process.env.PORT || 4000
const localOrigin = `http://localhost:${port}`
const allowedOrigins = [localOrigin]
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
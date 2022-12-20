import { CorsOptions } from "cors"

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin && process.env.ORIGINS!.split(',').indexOf(origin) !== -1) callback(null, true)
        else callback(new Error('Blocked by CORS'))
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions
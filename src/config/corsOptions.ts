import { CorsOptions } from "cors"

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin && process.env.ORIGINS?.toString().split(',').indexOf(origin) !== -1 || !origin) callback(null, true)
        else callback(new Error('Blocked by CORS'))
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions

export {default} from "next-auth/middleware"

export const config={matcher:[
    '/extra',
    '/chat',
    '/chat/:path*'
]}
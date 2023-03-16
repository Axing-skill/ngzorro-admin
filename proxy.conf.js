const PROXY_CONFIG = [
    {
        context: [
            "/login",
        ],
        target: "http://localhost:3000",
        secure: false
    }
]
 
 
module.exports = PROXY_CONFIG;
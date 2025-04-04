const http = require('http');
const app = require('./src/routes/app')

require('./src/database/index').connect()

const server = http.createServer(app);


const{API_PORT}=process.env;
const port = process.env.PORT || API_PORT


server.listen(port,()=>{
    console.log(`Server running on ${port}`);
})
import express ,{json} from 'express';                     				 //express import here json is difine to required for request
import './src/config/dbConnection';                                      //import database config file on dbconnection from config
import { greenBright,cyanBright } from 'chalk';                          //we have a used to message attractive show for chalk npm
import { ENV } from './src/constants';                                   //env file is collection of database url or name
import ip from 'ip';

import routes from './src/routes';                                       //main line of this file is routes variable
import axios from 'axios';												//it's a axios npm package for featch the api data
const {
	SERVER: { PORT },
} = ENV;

const server = express();                                                //express function store in server variable
server.use(json());														 //json is required to use for server variable

server.use('/api/v1', routes);                                           //now routes variable use server.use finaly api routes is created

const HOST = process.env.HOST || 'localhost';

const BASE_API_URL = `http://${HOST}:${PORT}/api/v1/`;              
const NETWORK_BASE_API_URL = `http://${ip.address()}:${PORT}/api/v1/`;

server.listen(PORT || 3002, () => {                                       //server create code
    console.info(cyanBright('API Running at'));
	console.info(cyanBright(`${greenBright('\tLocalhost:')} ${BASE_API_URL}`));
	console.info(cyanBright(`${greenBright('\tLAN:')} ${NETWORK_BASE_API_URL}`));
});

// axios.get('http://localhost:5000/api/v1/admin/user')
// .then(function(response){
// 	console.log("response",response.data)
// })

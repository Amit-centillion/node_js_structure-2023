import express ,{json} from 'express';                     				 
import './src/config/dbConnection';                                     
import { greenBright,cyanBright } from 'chalk';                         
import { ENV } from './src/constants';                                  

import routes from './src/routes';                                      

const {
	SERVER: { PORT },
} = ENV;

const server = express();                                               
server.use(json());														

server.use('/api/v1', routes);                                          

const HOST = process.env.HOST || 'localhost';

const BASE_API_URL = `http://${HOST}:${PORT}/api/v1/`;              

server.listen(PORT || 3002, () => {            
    console.info(cyanBright('API Running at'));
	console.info(cyanBright(`${greenBright('\tLocalhost:')} ${BASE_API_URL}`));
});

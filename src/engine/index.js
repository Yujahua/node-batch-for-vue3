import {getSignPath} from './config'
// import {mkdirSync} from getSignPath('@src/plugins/fb')
import {start} from '../plugins/filebatch/start'

// Make dir output folder: dist, if it does not exists
start();

// Read files from origin source folder
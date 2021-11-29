import {Client} from 'faunadb'
//import { ClientRequest } from 'http'


export const fauna = new  Client({
  secret: process.env.FAUNADB_KEY,
  //domain: 'db.us.fauna.com'
})
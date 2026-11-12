import DB from "#lib/commons/database.ts"
import type { ValidationError } from "#lib/interfaces.ts"

interface ISession{
    guid_id: string,
    user_id: number,
    expires: string
  
}

export type {ISession}

export const Session = () =>{

    const api = {
        generateObject:(row:any):ISession =>{
            const object: ISession = {
                guid_id: row.guid_id,
                user_id: row.user_id,
                expires: row.expires,
            }
            return object
        },


        
        getSingle: async (guid_id:string): Promise<ISession | void> => {
            const sql = `select * from data.Sessions where guid_id=$1`
            const response = await DB().query(sql,[guid_id]) 
            for(const row of response){
                const record = api.generateObject(row)
                return record
            }
        },

        insert: async (user_id: number):Promise<ISession | ValidationError> => {
            //GUID = auto generated
            //expiry = auto generated
            const sql = `
                insert into data.Sessions
                (user_id)
                values
                ($1)
                returning *
            `
            const response = await DB().query(sql,[
               user_id
            ])

            if(!response[0]){
                throw new Error('unable to create record')
            }
            return api.generateObject(response[0])
        },


    }

    return api
}
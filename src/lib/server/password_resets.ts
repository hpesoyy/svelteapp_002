import DB from "#lib/commons/database.ts"
import type { ValidationError } from "#lib/interfaces.ts"

interface IPasswordReset{
    guid_id: string,
    user_id: number,
    expires: string,
    completed: boolean,
}

export type {IPasswordReset}

export const PasswordReset = () =>{

    const api = {
        generateObject:(row:any):IPasswordReset =>{
            const object: IPasswordReset = {
                guid_id: row.guid_id,
                user_id: row.user_id,
                expires: row.expires,
                completed: row.completed,
            }
            return object
        },


        
        getSingle: async (guid_id:string): Promise<IPasswordReset | void> => {
            const sql = `select * from data.password_resets where guid_id=$1`
            const response = await DB().query(sql,[guid_id]) 
            for(const row of response){
                const record = api.generateObject(row)
                return record
            }
        },

        update: async (guid_id: string):Promise< void > => {
          
            const sql = `update data.password_resets set completed = true where guid_id=$1`
            const response = await DB().query(sql,[guid_id])

            if(!response[0]){
                throw new Error('unable to create record')
            }
           
        },

            //11:55
    }

    return api
}
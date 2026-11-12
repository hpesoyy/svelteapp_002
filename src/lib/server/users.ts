import DB from "#lib/commons/database.ts"
import type { ValidationError } from "#lib/interfaces.ts"

interface IUser{
    id: number,
    email: string,
    name: string,
    location: string,
    occupation: string,
    avatar_path: string,
}

export type {IUser}

export const User = () =>{

    const checkRequirements = (object: IUser): void | ValidationError =>{
        if (object.name.trim() === '') {
            return {error: 'please provide a name'}
        }
        
        if (object.email.trim() === '') {
            return {error: 'please provide an email'}
        }
        
        if (object.location.trim() === '') {
            return {error: 'please provide a location'}
        }

        if (object.occupation.trim() === '') {
            return {error: 'please provide occupation'}
        }
    }


    const api = {
        generateObject:(row:any):IUser =>{
            const object: IUser = {
                id: row.id,
                email: row.email,
                name: row.name,
                location: row.location,
                occupation: row.occupation,
                avatar_path: row.avatar_path
            }
            return object
        },

        //Get all users for searching
        getAll: async(): Promise<Array<IUser>> =>{
            const results: IUser[] = []
            const sql =`select * from data.users order by name`
            const response = await DB().query(sql)
            for (const row of response){
                const record = api.generateObject(row)
                results.push(record)

            }
            return results
        },
        
        getSingle: async (id:number): Promise<IUser | void> => {
            const sql = `select * from data.users where id=$1`
            const response = await DB().query(sql,[id]) 
            for(const row of response){
                const record = api.generateObject(row)
                return record
            }
        },

        update: async (object:IUser): Promise<IUser | ValidationError> => {
            //check requirements 
            const result = checkRequirements(object)
            if(result){
                return result
            }

            const sql = `
                update data.users set
                email = $1,
                name = $2,
                location = $3,
                occupation = $4,
                avatar_path = $5

                where id = $6

                returning *
            `

            const response = await DB().query(sql,[
                object.email,
                object.name,
                object.location,
                object.occupation,
                object.avatar_path,
                object.id
            ])

            if(!response[0]){
                throw new Error('unable to update record')
            }

            return api.generateObject(response[0])
        },

        insert: async (object:IUser, new_password: string):Promise<IUser | ValidationError> => {
            //check requirements
            const result = checkRequirements(object)
            if(result){
                return result
            }

            const sql = `
                insert into data.users
                (email, hash_password, name, location, occupation, avatar_path)
                values
                ($1, crypto($2, gen_salt('bf',8)), $3, $4, $5, $6)
                returning *
            `
            const response = await DB().query(sql,[
                object.email,
                new_password,
                object.name,
                object.location,
                object.occupation,
                object.avatar_path
            ])

            if(!response[0]){
                throw new Error('unable to create record')
            }
            return api.generateObject(response[0])
        },


        updatePassword: async(id: number, new_password: string): Promise<void> => {
            const sql = `update data.users set hash_password = crypt($1, gen_salt('bf',8))
            where id=$2`
            await DB().query(sql,[new_password,id])
        }

    }

    return api
}
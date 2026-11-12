import DB from "#lib/commons/database.ts"
import type { ValidationError } from "#lib/interfaces.ts"

interface IPostAttachment{
    id: number,
    post_id: number,
    path: string,
    mime_type: string,
}

export type {IPostAttachment}

export const PostAttachment = () =>{
    const api = {
        generateObject:(row:any):IPostAttachment =>{
            const object: IPostAttachment = {
                id: row.id,
                post_id: row.post_id,
                path: row.path,
                mime_type: row.mime_type,
            }
            return object
        },

        //Get all post attachments for a post
        getForPost: async(post_id: number): Promise<Array<IPostAttachment>> =>{
            const results: IPostAttachment[] = []
            const sql =`select * from data.posts_attachments where post_id = $1 order by created`
            const response = await DB().query(sql,[post_id])
            for (const row of response){
                const record = api.generateObject(row)
                results.push(record)

            }
            return results
        },
        
        getSingle: async (id:number): Promise<IPostAttachment | void> => {
            const sql = `select * from data.users where id=$1`
            const response = await DB().query(sql,[id]) 
            for(const row of response){
                const record = api.generateObject(row)
                return record
            }
        },

        insert: async (object:IPostAttachment):Promise<IPostAttachment> => {
            const sql = `
                insert into data.post_attachments
                (post_id, path, mime_type)
                values
                ($1,$2, $3)
                returning *
            `
            const response = await DB().query(sql,[
                object.post_id,
                object.path,
                object.mime_type,
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
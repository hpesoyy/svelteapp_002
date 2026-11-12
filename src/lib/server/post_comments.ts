import DB from "#lib/commons/database.ts"
import type { ValidationError } from "#lib/interfaces.ts"

interface IPostComment{
    id: number,
    post_id: number,
    user_id: number,
    created: string,
    text: string,
}

export type {IPostComment}

export const PostComment = () =>{
    const api = {
        generateObject:(row:any):IPostComment =>{
            const object: IPostComment = {
                id: row.id,
                post_id: row.post_id,
                user_id: row.user_id,
                created: row.created,
                text: row.text
            }
            return object
        },

        //Get all post comments for a post
        getForPost: async(post_id: number): Promise<Array<IPostComment>> =>{
            const results: IPostComment[] = []
            const sql =`select * from data.posts_attachments where post_id = $1 order by created desc`
            const response = await DB().query(sql,[post_id])
            for (const row of response){
                const record = api.generateObject(row)
                results.push(record)

            }
            return results
        },
        
        getSingle: async (id:number): Promise<IPostComment | void> => {
            const sql = `select * from data.users where id=$1`
            const response = await DB().query(sql,[id]) 
            for(const row of response){
                const record = api.generateObject(row)
                return record
            }
        },

        insert: async (object:IPostComment):Promise<IPostComment> => {
            const sql = `
                insert into data.post_comments
                (post_id, user_id, text)
                values
                ($1,$2, $3)
                returning *
            `
            const response = await DB().query(sql,[
                object.post_id,
                object.user_id,
                object.text,
            ])

            if(!response[0]){
                throw new Error('unable to create record')
            }
            return api.generateObject(response[0])
        },

        delete: async (id:number):Promise<void> => {
            await DB().query(`delete from data.posts_comments where id=$1`,[id])
        }


    }

    return api
}
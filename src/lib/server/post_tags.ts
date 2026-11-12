import DB from "#lib/commons/database.ts"
import type { ValidationError } from "#lib/interfaces.ts"

interface IPostTag{
    post_id: number,
    user_id: number,
}

export type {IPostTag}

export const PostTag = () =>{
    const api = {
        generateObject:(row:any):IPostTag =>{
            const object: IPostTag = {
                post_id: row.post_id,
                user_id: row.user_id,
            }
            return object
        },

        //Get all post tags for a post
        getForPost: async(post_id: number): Promise<Array<IPostTag>> =>{
            const results: IPostTag[] = []
            const sql =`select * from data.posts_tags where post_id = $1`
            const response = await DB().query(sql,[post_id])
            for (const row of response){
                const record = api.generateObject(row)
                results.push(record)

            }
            return results
        },
        
        insert: async (object:IPostTag):Promise<IPostTag> => {
            const sql = `
                insert into data.post_tags
                (post_id, user_id)
                values
                ($1,$2)
                returning *
            `
            const response = await DB().query(sql,[
                object.post_id,
                object.user_id
            ])

            if(!response[0]){
                throw new Error('unable to create record')
            }
            return api.generateObject(response[0])
        },

        delete: async (id:number, post_id: number): Promise<void> => {
            await DB().query(`delete from data.post_tags where user_id =$1 and post_id=$2`,[id,post_id])            
        }

    }

    return api
}
import DB from "#lib/commons/database.ts"
import type { ValidationError } from "#lib/interfaces.ts"

interface IPost{
    id: number,
    user_id: number,
    text: string,
    created: string,
    visibility: string,
}

export type {IPost}

export const Post = () =>{

    const api = {
        generateObject:(row:any):IPost =>{
            const object: IPost = {
                id: row.id,
                user_id: row.user_id,
                text: row.text,
                created: row.created,
                visibility: row.visibility
            }
            return object
        },

        //Get all Posts for a single user
        getUserPost: async(user_id: number): Promise<Array<IPost>> =>{
            const results: IPost[] = []
            const sql =`select * from data.posts where user_id =$1 order by created`
            const response = await DB().query(sql,[user_id])
            for (const row of response){
                const record = api.generateObject(row)
                results.push(record)

            }
            return results
        },
        
        //Get all posts for user's friends
        getFriendsPost: async(user_id: number): Promise<Array<IPost>> =>{
            const results: IPost[] = []
            // TODO test this later
            const sql =`select distinct posts.* from data.posts
                        inner join data.friends on friends.friends_id = data.posts.user_id
                        where friends.user_id = $1
                        order by created`
            const response = await DB().query(sql,[user_id])
            for (const row of response){
                const record = api.generateObject(row)
                results.push(record)

            }
            return results
        },

        update: async (object:IPost): Promise<IPost> => {

            const sql = `
                update data.posts set
                text = $1,
                visibility = $2

                where id = $3

                returning *
            `

            const response = await DB().query(sql,[
                object.text,
                object.visibility,
                object.id
            ])

            if(!response[0]){
                throw new Error('unable to update record')
            }

            return api.generateObject(response[0])
        },

        insert: async (object:IPost, new_password: string):Promise<IPost> => {
            const sql = `
                insert into data.posts
                (user_id, text, visibility)
                values
                ($1, $2, $3)
                returning *
            `
            const response = await DB().query(sql,[
                object.user_id,
                object.text, //optional
                object.visibility,
            ])

            if(!response[0]){
                throw new Error('unable to create record')
            }
            return api.generateObject(response[0])
        },

        delete: async (id: number): Promise<void> =>{
            await DB().query(`delete from data.posts where id=$1`,[id])
        }

    }

    return api
}
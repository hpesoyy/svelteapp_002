import DB from "#lib/commons/database.ts"
import type { ValidationError } from "#lib/interfaces.ts"

interface INotification{
    id: number,
    created: string,
    user_id: number,
    friend_id: number,
    text: string,
    viewed: boolean,
    post_id: number
}

export type {INotification}

export const Notification = () =>{

    const api = {
        generateObject:(row:any):INotification =>{
            const object: INotification = {
                id: row.id,
                created: row.created,
                user_id: row.user_id,
                friend_id: row.friend_id,
                text: row.text,
                viewed: row.viewed,
                post_id: row.post_id
            }
            return object
        },


        
        getForUser: async (user_id:number): Promise<INotification | void> => {
            const sql = `select * from data.notifications where user_id=$1`
            const response = await DB().query(sql,[user_id]) 
            for(const row of response){
                const record = api.generateObject(row)
                return record
            }
        },

        update: async (id: number):Promise< void > => {          
            const sql = `update data.notifications set viewed = true where id=$1`
            const response = await DB().query(sql,[id])

            if(!response[0]){
                throw new Error('unable to create record')
            }
           
        },

        insert: async (object:INotification): Promise<INotification | ValidationError> => {
            const sql=`
                insert into data.notifications
                (user_id,friend_id,text,viewed, post_id)
                values
                ($1,$2,$3,$4,$5)
                returning *
            `            
            const response = await DB().query(sql,[
                object.user_id,
                object.friend_id,
                object.text,
                object.viewed,
                object.post_id,
            ])

            if(!response[0]){
                throw new Error('unable to create a record')

            }
            return api.generateObject(response[0])
        },

    }

    return api
}
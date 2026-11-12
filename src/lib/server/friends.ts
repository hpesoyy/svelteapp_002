import DB from "#lib/commons/database.ts"

interface IFriend{
    user_id: number,
    firend_id: number,
}

export type {IFriend}

export const Friend = () =>{
    const api = {
        generateObject:(row:any):IFriend =>{
            const object: IFriend = {
                user_id: row.user_id,
                firend_id: row.friends_id,
            }
            return object
        },

        //Get all friends for a user
        getForUser: async(user_id: number): Promise<Array<IFriend>> =>{
            const results: IFriend[] = []
            const sql =`select * from data.friends where user_id = $1`
            const response = await DB().query(sql,[user_id])
            for (const row of response){
                const record = api.generateObject(row)
                results.push(record)

            }
            return results
        },
        
        insert: async (object:IFriend):Promise<IFriend> => {
            const sql = `
                insert into data.friends
                (friend_id,user_id)
                values
                ($1,$2)
                returning *
            `
            const response = await DB().query(sql,[
                object.firend_id,
                object.user_id
            ])

            if(!response[0]){
                throw new Error('unable to create record')
            }
            return api.generateObject(response[0])
        },

        delete: async (user_id:number, post_id: number): Promise<void> => {
            await DB().query(`delete from data.friends where user_id =$1 and post_id=$2`,[user_id,post_id])            
        }

    }

    return api
}
// photos are outside of web server directory, so need to be pulled in

import { PUBLIC_IMAGE_PATH} from '$app/env/private'
import { User } from '#lib/server/users.js'
import { error } from '@sveltejs/kit'
import {readFileSync} from 'fs'
import type { RequestHandler } from './$types.js'

export const GET = async ({params}) => {
    const user_id = Number(params.slug)
    const user = await User().getSingle(user_id)

    if(user && user.avatar_path !==''){
        try{
            const file = readFileSync(PUBLIC_IMAGE_PATH+user.avatar_path)
            return new Response(file)
            //the browser will treat this URL as an image
        }catch(err){
            throw error(404)
        }
    }
}
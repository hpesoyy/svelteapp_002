import { PUBLIC_IMAGE_PATH} from '$app/env/public';
import { Session } from "#lib/server/sessions.ts";
import { User, type IUser } from "#lib/server/users.js";
import {error, fail, redirect, type Actions} from "@sveltejs/kit";
import sharp from "sharp";
import { writeFileSync } from 'fs';

export const actions={
    create: async ({request,cookies}) => {
        const data = await request.formData()

        const name = (data.get('name')??'').toString()
        const location = (data.get('location')??'').toString()
        const occupation = (data.get('occupation')??'').toString()
        const email = (data.get('email')??'').toString()
        const password = (data.get('password')??'').toString()

        //get avatar
        const file = data.get('avatar') as File
        let avatar_path = ''

        if(!file.name){
            return fail(400,{message:'please select profile pic G'})
        }else{
            const ext = file.name.split('.').pop()
            if(!ext || (ext.toLocaleLowerCase() !=='jpg' && ext.toLocaleLowerCase() !== 'jpeg') && ext.toLocaleLowerCase() !== 'png'){
              return fail(400,{message: 'please use a jpg or png file type '})
            }

            const rand = Math.floor(1000 + Math.random() * 900)

            //keep file name but add random number in-case someone uploads the same file
            const file_name = file.name.replace('.'+ext,'')+'_'+rand+'.'+ext

            //resize image
            const buffer = await sharp(Buffer.from(await file.arrayBuffer()))
            .resize({width:600})
            .toBuffer()
            .then(data =>{
                return data
            })

            //save image to server not static folder
            writeFileSync(PUBLIC_IMAGE_PATH=file_name,buffer)
            avatar_path =file_name
        }


		//update existing user with new properties
		
		user.name = name
		user.email = email
		user.location = location
		user.occupation = occupation
		user.avatar_path = avatar_path


        //update user, get user -- might return error
        const newUser = await User().update(user)
        if('error' in newUser){
            return fail(400,{message: newUser.error}) 
        }

	return {success: true}

    }



} satisfies Actions


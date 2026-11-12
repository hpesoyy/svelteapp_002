

export const load:PageServerLoad = async({locals}) => {
	return{
		user: locals.user
	}
}


export const actions={
    update: async ({request,cookies, locals}) => {
        const data = await request.formData()

        const name = (data.get('name')??'').toString()
        const location = (data.get('location')??'').toString()
        const occupation = (data.get('occupation')??'').toString()
        const email = (data.get('email')??'').toString()

		//get existing user
		
		const user = await User().getSingle(locals.user.id)
		
		if(!user){
			throw new Error('Information not found about user')
		}
		
        //get avatar
        const file = data.get('avatar') as File
        let avatar_path = ''

        if(!file.name){
           
		   avatar_path = user.avatar_path
		   
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

        const user:IUser = {
            name,
            location,
            occupation,
            email,
            id:0,
            avatar_path: ""
        }
        
        //create user, get user -- might return error
        const newUser = await User().insert(user,password)
        if('error' in newUser){
            return fail(400,{message: newUser.error}) 
        }


        //create session
        const session = await Session().insert(newUser.id)
         if('error' in session){
            return fail(400,{message: session.error}) 
        }

        //set cookie
        cookies.set('basefoot', session.guid_id,{
            path:'/',
            maxAge: 60*60*8   //8 hrs
        })


        //send people to newa feed now
        redirect(303,'/')

    }


//update import from "./$types"
} satisfies Actions
import { Session } from "#lib/server/sessions.ts"
import { User } from "#lib/server/users.ts"
import { redirect } from "@sveltejs/kit"


export async function handle({event,resolve}){
	// Add:"basefoot" to user settings
	
	const guid_id = event.cookies.get('basefoot')
	
	if(guid_id){
		const session = await Session().getSingle(guid_id)
		if(session){
			const user = await User().getSingle(session.user_id)
			if(user){
				event.locals.user = user
			}
		}
	}
	
	if(
		event.url.pathname !== '/login' &&
		event.url.pathname !== '/create' &&
		event.url.pathname !== '/forgot' &&
		event.url.pathname !== '/change' &&
		!event.locals.user
		){
			//user is not signed in and trying to reach new feed
			throw redirect(303,'/ogin')
		}
	
	return await resolve(event)
}
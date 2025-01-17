import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types'
import {isValidated} from "$lib/utils"

export async function POST({ request }) {
    const {emails}:{emails:string[]} = await request.json();
    let tmpVerifiedEmails:any[] =[]

    const validationPromises = emails.map(async email => {
        const isValid = await isValidated(email,true);
        console.log(isValid);
        return isValid ? email : null;
    });

    const results = await Promise.all(validationPromises);
    tmpVerifiedEmails = results.filter(email => email !== null);

	return json(tmpVerifiedEmails)
}



import { json } from '@sveltejs/kit'
import {PUBLIC_SMTP_HOST_URL,PUBLIC_API_KEY} from '$env/static/public'


export async function POST({ request }) {
    const data = await request.json();
    try {
        const response = await fetch(PUBLIC_SMTP_HOST_URL+'/api/v1/send/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Server-API-Key': PUBLIC_API_KEY // Add your API key here
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return json(result)
        console.log("Email sent successfully:", result);
      } catch (error) {
        return json({message:"Couldnt send email",error})
        console.error('There was a problem with the fetch operation:', error);
    }

}



import { verifyEmail } from '@devmehq/email-validator-js';
type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return formatter.format(new Date(date))
}

export async function isValidated(emailAddress:string,printResults=false){
	const { validFormat, validSmtp, validMx } = await verifyEmail({ emailAddress, verifyMx: true, verifySmtp: true, timeout: 3000 });
	if(printResults){
		console.log(
			{"validFormat":validFormat, 
			"validSmtp":validSmtp, 
			"validMx":validMx}
		)
	}
	if(!validFormat){
		return false
	}
	if(!validSmtp){
		return false
	}
	if(!validMx){
		return false
	}
	return true
}
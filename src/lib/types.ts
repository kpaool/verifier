export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string
	slug: string
	description: string
	audio: string
	banner: string
	date: string
	categories: Categories[]
	published: boolean
}

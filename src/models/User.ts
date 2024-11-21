export type User = {
   created_at: string
   email_verified: true|false
   email: string
   name: string
   nickname: string
   last_login: string
   logins_count: number
   user_id: string
   user_metadata_pronouns?: string
   user_metadata_bio?: string
   user_metadata_location?: string
}
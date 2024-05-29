export type UserAuthenticated = {
    email: string
    password: string
}

export type NewUser = {
    email: string
    password: string
    confirmPassword: string
    displayName:string
}
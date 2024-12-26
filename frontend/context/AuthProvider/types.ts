export interface IUser{
    email?: string;
    token?: string;
}
export interface IRegisterUser extends IUser{
    name?: string;
    password?: string;
    confirmPassword?: string;
    username?: string
}

export interface IContext extends IUser{
     authenticate:(emal: string, password:string)=> Promise<void>;
     logout:()=> void;
}

export interface IAuthProvider{
    children:JSX.Element
}
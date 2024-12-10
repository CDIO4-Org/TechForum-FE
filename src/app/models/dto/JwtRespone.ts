export interface JwtResponse{
    token: string;
    name: string;
    roles: any[];
    createdTime: any;
    // constructor(token: string, name: string, roles:any){
    //     this.token = token;
    //     this.name = name;
    //     this.roles = roles;
    // }
}
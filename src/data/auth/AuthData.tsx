import { postApi } from '../../data/RemoteData';
import { loginApi } from '../Url';
import { Cabang } from './Cabang';
import { LoginTokenRequest } from './LoginTokenRequest';
import { LoginTokenResponse } from './LoginTokenResponse';
import { User } from './User';
var jwt = require('jsonwebtoken');

export function doLogin(username: string, password: string, 
    onSuccess: () => void, onError: (status: string) => void){
    let reqBody = {
        username: username,
        password: password
    }
    postApi<LoginTokenRequest, LoginTokenResponse>(loginApi, reqBody)
    .then((val) => {
        let tokenObj = jwt.decode(val.access)
        
        storeUser(tokenObj.user)
        storeCabang(tokenObj.cabang)
        onSuccess()
    })
    .catch((response: any) => {
        console.log(response)
        onError(response)
    })
}

export function storeCabang(cabang: Cabang){
    localStorage.setItem('cabang', JSON.stringify(cabang));
}

export function getCabang(){
    let cabangJson = localStorage.getItem('cabang') as string
    let cabang: Cabang = JSON.parse(cabangJson)
}

export function storeUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): User{
    let userJson = localStorage.getItem('user') as string
    let user: User = JSON.parse(userJson);
    return user
}

export function clearUserAndCabang() {
    localStorage.clear();
}
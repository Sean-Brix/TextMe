
export default async function authorize_token(){

    const response = await fetch('/auth/check', {
        method: 'GET',
        credentials: 'include'
    })

    const data = await response.json();

    return data.authentication;
    
}
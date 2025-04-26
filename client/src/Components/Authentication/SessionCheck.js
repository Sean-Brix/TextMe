export default async function SessionCheck() {

    const response = await fetch('/auth/check', {
        method: 'GET',
        credentials: 'include',
    });

    const data = await response.json();

    return data.authenticated;

}

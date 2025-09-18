const API_BASE = 'http://localhost:5000/api';

export async function getProtectedData(){
    const token = getToken();
    const res = await fetch(`${API_BASE}/protected`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res.json();
}


export function getToken(){
    return localStorage.getItem('token');
}

export function logout(){
    localStorage.removeItem('token');
}

export async function login(email, password){
    const res = await fetch(`${API_BASE}/auth/login`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
    })
    const data = await res.json()
    if (data.token){
        localStorage.setItem('token', data.token)
    }
    return data;
}

export async function register(name, email, password, role){
    const res = await fetch(`${API_BASE}/auth/register`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password, role}),
    })
    const data = await res.json()
    if (data.token){
        localStorage.setItem('token', data.token)
    }
    return data;
}

export async function getCourses(){
    const res = await fetch(`${API_BASE}/courses`);
    return res.json();
}
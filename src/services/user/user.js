export const userService = {
    addUser,
    UpUser,
    DelUser
}

async function addUser(payload){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(payload)
    };
    return await fetch(`http://localhost:3000/users`, requestOptions)
        .then(s => { if (!s.ok) throw new Error(s.statusText); return "ok" });
}

async function UpUser(payload){
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(payload)
      };
      return await fetch(`http://localhost:3000/users/${payload.id}`, requestOptions)
          .then(s => { if (!s.ok) throw new Error(s.statusText); return "ok" });
  }

  async function DelUser(payload){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },      
    };
    return await fetch(`http://localhost:3000/users/${payload}`, requestOptions)
        .then(s => { if (!s.ok) throw new Error(s.statusText); return "ok" });
}
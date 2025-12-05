export async function authenticateUser(email, password) {
    const res = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        throw new Error("Invalid credentials");
    }

    const data = await res.json();
    return data.token;     
}

export async function getUser(token) {
    const res = await fetch("http://localhost:8080/api/user/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Unable to fetch user");
    }

    return res.json();
}

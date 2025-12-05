import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "../lib/authenticate";
import { AuthContext } from "../AuthContext";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { getFavourites } from "../lib/userData";


export default function Login() {
    const router = useRouter();
    const { setToken } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    async function updateAtom() {
        try {
            const favs = await getFavourites();
            setFavouritesList(favs);
        } catch (err) {
            console.error("Error fetching favourites:", err);
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // login
            const token = await authenticateUser(email, password);
            // token
            setToken(token);
            localStorage.setItem("token", token);
            await updateAtom();
            router.push("/");    
        } catch (err) {
            setErrorMessage("Invalid email or password");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
        </div>
    );
}

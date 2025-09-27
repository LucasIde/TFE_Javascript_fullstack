import { jwtDecode } from "jwt-decode";

export function getUserFromToken() {
		try {
			const token = localStorage.getItem("token");
			if (!token) return null;
			const decoded = jwtDecode(token);
			return decoded; // { id, username, role, ... }
		} catch (err) {
			console.error("Token invalide :", err);
			return null;
		}
	}

import { z } from "zod";

export const registerSchema = z.object({
	username: z
		.string()
		.min(2, { message: "Le pseudo doit faire au moins 2 caractères" })
		.max(30, { message: "Le pseudo ne peut pas dépasser 30 caractères" }),

	email: z
		.string()
		.toLowerCase()
		.trim()
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email invalide" }),

	password: z
		.string()
		.min(8, { message: "Mot de passe trop court (min 8 caractères)" }),

	confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
	message: "Les mots de passe ne correspondent pas",
	path: ["confirm"],
});

export function validateRegister(data) {
	const result = registerSchema.safeParse(data);
	if (!result.success) {
		const errors = result.error.issues.map((issue) => ({
			field: issue.path[0],
			message: issue.message,
		}));
		return { ok: false, errors };
	}
	return { ok: true, data: result.data };
}

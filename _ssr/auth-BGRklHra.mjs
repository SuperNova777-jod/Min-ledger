import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-BKEblp9g.mjs";
import { t as supabase } from "./client-CTPMxPWV.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as ArrowLeft, S as CircleCheck, f as LogOut, i as Shield } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BGRklHra.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "w-4 h-4 mr-2",
		viewBox: "0 0 24 24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
			})
		]
	});
}
function AuthPage() {
	const navigate = useNavigate();
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
			setSession(currentSession);
		});
		return () => subscription.unsubscribe();
	}, []);
	async function handleGoogleSignIn() {
		setLoading(true);
		setErrorMsg("");
		try {
			const redirectUrl = `${window.location.origin}/`;
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: redirectUrl,
					queryParams: {
						access_type: "offline",
						prompt: "consent"
					}
				}
			});
			if (error) {
				console.warn("Google OAuth response:", error);
				setErrorMsg(error.message);
			} else if (data?.url) window.location.href = data.url;
		} catch (err) {
			setErrorMsg(err?.message || "Failed to redirect to Google sign in.");
		} finally {
			setLoading(false);
		}
	}
	async function handleSignOut() {
		setLoading(true);
		await supabase.auth.signOut();
		setSession(null);
		setLoading(false);
	}
	const isUserAuthenticated = Boolean(session?.user && !session.user.is_anonymous);
	const userEmail = session?.user?.email;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col justify-center items-center bg-background px-4 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full pointer-events-none opacity-40 blur-[90px]",
				style: { background: "radial-gradient(circle, var(--cobalt) 0%, var(--violet) 40%, transparent 70%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-6 left-6 z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Back to Minute Ledger"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border shadow-sm mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-black bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 text-transparent bg-clip-text",
								style: { fontFamily: "var(--font-display)" },
								children: "Λ"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight text-foreground",
							style: { fontFamily: "var(--font-display)" },
							children: "Minute Ledger"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1",
							children: "Zero-Hallucination Meeting Intelligence"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-xl",
					children: isUserAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mx-auto flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-6 h-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-foreground",
								children: "You are signed in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-0.5",
								children: userEmail
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 flex flex-col gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ledger",
									className: "w-full",
									onClick: () => navigate({ to: "/" }),
									children: "Open Workspace"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "w-full",
									onClick: handleSignOut,
									disabled: loading,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4 mr-2" }), " Sign Out"]
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-semibold text-foreground",
									children: "Sign In with Google"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Authenticate securely to sync and persist your meeting transcripts and action items."
								})]
							}),
							errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-ruby bg-ruby/10 border border-ruby/25 rounded-lg p-3 leading-relaxed",
								children: errorMsg
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full h-12 font-semibold text-sm border-border hover:border-cobalt hover:bg-secondary transition-all flex items-center justify-center shadow-sm",
								onClick: handleGoogleSignIn,
								disabled: loading,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), loading ? "Redirecting to Google..." : "Continue with Google"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex py-1 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-shrink mx-3 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Or"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-border" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "w-full text-xs text-muted-foreground hover:text-foreground",
								onClick: () => navigate({ to: "/" }),
								children: "Continue in Guest / Evaluator Mode"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 border-t border-border/60",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-3.5 h-3.5 text-cobalt flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your transcripts are grounded line-by-line without unauthorized retention." })]
								})
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { AuthPage as component };

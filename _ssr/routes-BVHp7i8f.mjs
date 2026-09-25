import { n as __toESM } from "../_runtime.mjs";
import { i as performance_default } from "../_libs/h3-v2+rou3+srvx+unenv.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-BKEblp9g.mjs";
import { t as supabase } from "./client-CTPMxPWV.mjs";
import { D as isRedirect, _ as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as CircleAlert, S as CircleCheck, T as ArrowRight, _ as Flame, a as ShieldCheck, b as ExternalLink, c as Quote, d as Mail, f as LogOut, g as FolderOpen, h as Info, l as Plus, m as ListChecks, n as TriangleAlert, o as ShieldAlert, p as LoaderCircle, r as Sparkles, s as RotateCcw, t as X, u as MessageSquare, v as FileText, w as Check, x as Copy, y as FileCheck } from "../_libs/lucide-react.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DkX6Q4VI.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-N0J-3cJ_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BVHp7i8f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var PALETTE = [
	{
		fill: "#3B82F6",
		halo: "rgba(59, 130, 246, 0.45)"
	},
	{
		fill: "#60A5FA",
		halo: "rgba(96, 165, 250, 0.45)"
	},
	{
		fill: "#8B5CF6",
		halo: "rgba(139, 92, 246, 0.45)"
	},
	{
		fill: "#06B6D4",
		halo: "rgba(6, 182, 212, 0.40)"
	},
	{
		fill: "#F59E0B",
		halo: "rgba(245, 158, 11, 0.40)"
	},
	{
		fill: "#F43F5E",
		halo: "rgba(244, 63, 94, 0.38)"
	}
];
function AntigravityCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		let animationFrameId;
		let width = 0;
		let height = 0;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const resize = () => {
			if (!canvas || !canvas.parentElement) return;
			const rect = canvas.parentElement.getBoundingClientRect();
			width = rect.width || window.innerWidth;
			height = rect.height || window.innerHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.resetTransform?.();
			ctx.scale(dpr, dpr);
		};
		resize();
		window.addEventListener("resize", resize);
		const mouse = {
			x: -1e3,
			y: -1e3,
			prevX: -1e3,
			prevY: -1e3,
			vx: 0,
			vy: 0,
			speed: 0,
			radius: 175,
			lastMoveTime: performance_default.now()
		};
		const pulses = [];
		const handlePointerMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			const currentX = e.clientX - rect.left;
			const currentY = e.clientY - rect.top;
			const now = performance_default.now();
			const dt = Math.max(1, now - mouse.lastMoveTime);
			mouse.lastMoveTime = now;
			if (mouse.prevX !== -1e3) {
				const instVx = (currentX - mouse.prevX) / dt * 16;
				const instVy = (currentY - mouse.prevY) / dt * 16;
				mouse.vx = mouse.vx * .5 + instVx * .5;
				mouse.vy = mouse.vy * .5 + instVy * .5;
				mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
			}
			mouse.prevX = currentX;
			mouse.prevY = currentY;
			mouse.x = currentX;
			mouse.y = currentY;
		};
		const handlePointerLeave = () => {
			mouse.x = -1e3;
			mouse.y = -1e3;
			mouse.prevX = -1e3;
			mouse.prevY = -1e3;
			mouse.vx = 0;
			mouse.vy = 0;
			mouse.speed = 0;
		};
		const handlePointerDown = (e) => {
			const rect = canvas.getBoundingClientRect();
			const cx = e.clientX - rect.left;
			const cy = e.clientY - rect.top;
			const pulseColor = PALETTE[Math.floor(Math.random() * PALETTE.length)] ?? PALETTE[0];
			pulses.push({
				x: cx,
				y: cy,
				radius: 8,
				maxRadius: 260,
				strength: 12,
				alpha: .7,
				color: pulseColor.fill
			});
		};
		window.addEventListener("pointermove", handlePointerMove, { passive: true });
		window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
		window.addEventListener("pointerdown", handlePointerDown, { passive: true });
		const nodeCount = Math.min(Math.max(Math.floor(width * height / 7800), 75), 118);
		const particles = [];
		for (let i = 0; i < nodeCount; i++) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const themeColor = PALETTE[Math.floor(Math.random() * PALETTE.length)] ?? PALETTE[0];
			const layer = Math.random() < .35 ? 0 : Math.random() < .75 ? 1 : 2;
			const radius = layer === 0 ? 1.4 + Math.random() * .8 : layer === 1 ? 2.2 + Math.random() * 1 : 3 + Math.random() * 1.4;
			const baseVy = -(.18 + layer * .12 + Math.random() * .25);
			const baseAlpha = layer === 0 ? .28 + Math.random() * .2 : layer === 1 ? .45 + Math.random() * .25 : .65 + Math.random() * .3;
			const kindRand = Math.random();
			const kind = kindRand < .68 ? "node" : kindRand < .9 ? "diamond" : "pulse_ring";
			particles.push({
				x,
				y,
				vx: (Math.random() - .5) * .35,
				vy: baseVy,
				baseVy,
				radius,
				color: themeColor.fill,
				halo: themeColor.halo,
				alpha: baseAlpha,
				baseAlpha,
				pulseOffset: Math.random() * Math.PI * 2,
				pulseSpeed: .02 + Math.random() * .025,
				kind,
				angle: Math.random() * Math.PI * 2,
				angularSpeed: (Math.random() - .5) * .018,
				mass: layer === 0 ? 1.4 : layer === 1 ? 1 : .75,
				layer
			});
		}
		const drawDiamond = (cx, cy, size, color, alpha, angle) => {
			ctx.save();
			ctx.translate(cx, cy);
			ctx.rotate(angle);
			ctx.globalAlpha = alpha;
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(0, -size * 1.3);
			ctx.lineTo(size * .8, 0);
			ctx.lineTo(0, size * 1.3);
			ctx.lineTo(-size * .8, 0);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		};
		let lastFrame = performance_default.now();
		const render = (now) => {
			const dt = Math.min((now - lastFrame) / 16.666, 2);
			lastFrame = now;
			mouse.vx *= .92;
			mouse.vy *= .92;
			mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
			ctx.clearRect(0, 0, width, height);
			for (let sIdx = pulses.length - 1; sIdx >= 0; sIdx--) {
				const sw = pulses[sIdx];
				if (!sw) continue;
				sw.radius += 10.5 * dt;
				sw.alpha *= .945;
				ctx.save();
				ctx.beginPath();
				ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
				ctx.strokeStyle = sw.color;
				ctx.globalAlpha = sw.alpha * .45;
				ctx.lineWidth = 1.5;
				ctx.stroke();
				if (sw.radius > 25) {
					ctx.beginPath();
					ctx.arc(sw.x, sw.y, sw.radius * .75, 0, Math.PI * 2);
					ctx.globalAlpha = sw.alpha * .22;
					ctx.lineWidth = 1;
					ctx.stroke();
				}
				ctx.restore();
				for (let i = 0; i < particles.length; i++) {
					const p = particles[i];
					if (!p) continue;
					const dx = p.x - sw.x;
					const dy = p.y - sw.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					const diff = Math.abs(dist - sw.radius);
					if (diff < 32 && dist > 0) {
						const push = (32 - diff) / 32 * sw.strength * (1 / p.mass);
						p.vx += dx / dist * push * .65;
						p.vy += dy / dist * push * .65;
					}
				}
				if (sw.radius >= sw.maxRadius || sw.alpha < .02) pulses.splice(sIdx, 1);
			}
			const dynamicRadius = Math.min(260, mouse.radius + mouse.speed * 4);
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				if (!p) continue;
				p.vy += (p.baseVy - p.vy) * .025 * dt;
				p.pulseOffset += p.pulseSpeed * dt;
				const breath = Math.sin(p.pulseOffset);
				p.alpha = Math.max(.12, Math.min(1, p.baseAlpha + breath * .15));
				const sway = Math.sin(p.pulseOffset * .7) * .22;
				const dx = p.x - mouse.x;
				const dy = p.y - mouse.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < dynamicRadius && dist > 1) {
					const proximity = 1 - dist / dynamicRadius;
					const repulseForce = Math.pow(proximity, 1.8) * 8 * (1 / p.mass);
					const nx = dx / dist;
					const ny = dy / dist;
					p.vx += nx * repulseForce * dt;
					p.vy += ny * repulseForce * dt;
					const fling = proximity * .38 * (1 / p.mass);
					p.vx += mouse.vx * fling * dt;
					p.vy += mouse.vy * fling * dt;
				}
				p.vx *= .94;
				p.vy *= .96;
				const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
				if (currentSpeed > 14) {
					p.vx = p.vx / currentSpeed * 14;
					p.vy = p.vy / currentSpeed * 14;
				}
				p.x += (p.vx + sway) * dt;
				p.y += p.vy * dt;
				p.angle += p.angularSpeed * dt;
				if (p.y < -30) {
					p.y = height + 25;
					p.x = Math.random() * width;
				} else if (p.y > height + 30) p.y = -25;
				if (p.x < -30) p.x = width + 25;
				else if (p.x > width + 30) p.x = -25;
			}
			const maxConnectDist = 136;
			for (let i = 0; i < particles.length; i++) {
				const p1 = particles[i];
				if (!p1) continue;
				for (let j = i + 1; j < particles.length; j++) {
					const p2 = particles[j];
					if (!p2) continue;
					const cdx = p1.x - p2.x;
					const cdy = p1.y - p2.y;
					const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
					if (cdist < maxConnectDist) {
						const proximity = Math.pow(1 - cdist / maxConnectDist, 1.3);
						const lineAlpha = proximity * .22 * Math.min(p1.alpha, p2.alpha);
						ctx.save();
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.strokeStyle = p1.color;
						ctx.globalAlpha = lineAlpha;
						ctx.lineWidth = proximity * 1.05;
						ctx.stroke();
						ctx.restore();
					}
				}
			}
			if (mouse.x > 0 && mouse.y > 0) {
				const cursorMaxDist = 160;
				for (let i = 0; i < particles.length; i++) {
					const p = particles[i];
					if (!p) continue;
					const mdx = p.x - mouse.x;
					const mdy = p.y - mouse.y;
					const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
					if (mdist < cursorMaxDist && mdist > 1) {
						const proximity = Math.pow(1 - mdist / cursorMaxDist, 1.2);
						const speedBoost = Math.min(1.5, 1 + mouse.speed * .08);
						const lineAlpha = Math.min(.75, proximity * .42 * speedBoost);
						ctx.save();
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(mouse.x, mouse.y);
						ctx.strokeStyle = p.color;
						ctx.globalAlpha = lineAlpha;
						ctx.lineWidth = .8 + proximity * 1.2;
						ctx.stroke();
						ctx.restore();
					}
				}
			}
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				if (!p) continue;
				ctx.save();
				ctx.translate(p.x, p.y);
				if (p.kind === "diamond") drawDiamond(0, 0, p.radius * 1.25, p.color, p.alpha, p.angle);
				else if (p.kind === "pulse_ring") {
					ctx.beginPath();
					ctx.arc(0, 0, p.radius * 1.6, 0, Math.PI * 2);
					ctx.strokeStyle = p.color;
					ctx.globalAlpha = p.alpha * .55;
					ctx.lineWidth = 1.2;
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(0, 0, p.radius * .7, 0, Math.PI * 2);
					ctx.fillStyle = p.color;
					ctx.globalAlpha = p.alpha;
					ctx.fill();
				} else {
					ctx.globalAlpha = p.alpha * .32;
					ctx.fillStyle = p.halo;
					ctx.beginPath();
					ctx.arc(0, 0, p.radius * 2.8, 0, Math.PI * 2);
					ctx.fill();
					ctx.globalAlpha = p.alpha;
					ctx.fillStyle = p.color;
					ctx.beginPath();
					ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
					ctx.fill();
				}
				ctx.restore();
			}
			animationFrameId = requestAnimationFrame(render);
		};
		animationFrameId = requestAnimationFrame(render);
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerleave", handlePointerLeave);
			window.removeEventListener("pointerdown", handlePointerDown);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		style: {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			pointerEvents: "none",
			zIndex: 0
		}
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var AnalyzeInput = objectType({
	title: stringType().trim().min(1).max(180),
	transcript: stringType().trim().min(40).max(5e4)
});
var ToggleInput = objectType({
	id: stringType().min(1),
	status: enumType(["open", "done"])
});
var listMeetings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("5421ce086ebfe2655585808aafdf32c6469fbf9db5a023eedf565c6215cabc2e"));
var createMeetingAnalysis = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => AnalyzeInput.parse(input)).handler(createSsrRpc("55bb7e91882964d0c7ae92312983bcd6bfa9496d03c9a693875cc64515dba795"));
var updateOutcomeStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ToggleInput.parse(input)).handler(createSsrRpc("e7c8494f5a896b8a88a76361f116e07550a7b150d7a6a8ba5ea3d9133f01ad34"));
var resetBenchmarkData = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("140ec2dbf00624132f490d092ec82d2e0979f4176f429e888f018f19b48ef672"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("7abdc026372dcdc6d51a7dd218bbcd8ab72e2b77182aa66e9ae4a8720128d8e1"));
var DigestInput = objectType({ meetingId: stringType().min(1) });
var getMeetingDigest = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => DigestInput.parse(input)).handler(createSsrRpc("87de833ef25fff40c5b9b43ab712b4443e855a12deb83f1542b73ec14e5dabc2"));
function formatFileSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(2)} MB`;
}
function formatFileNameToTitle(fileName) {
	let name = fileName.replace(/\.[^/.]+$/, "");
	name = name.replace(/[_\-.]+/g, " ");
	name = name.replace(/^\d{4}\s*\d{2}\s*\d{2}\s*/, "");
	name = name.trim();
	if (!name) return "Imported Meeting Transcript";
	return name.split(/\s+/).filter(Boolean).map((word) => {
		if (word.length > 1 && word === word.toUpperCase()) return word;
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}).join(" ");
}
async function parseTranscriptFile(file) {
	const rawText = await file.text();
	const ext = file.name.split(".").pop()?.toLowerCase() || "";
	let cleanedTranscript = "";
	if (ext === "json") try {
		const parsed = JSON.parse(rawText);
		if (typeof parsed === "string") cleanedTranscript = parsed;
		else if (typeof parsed.transcript === "string") cleanedTranscript = parsed.transcript;
		else if (typeof parsed.text === "string") cleanedTranscript = parsed.text;
		else if (Array.isArray(parsed.segments)) cleanedTranscript = parsed.segments.map((s) => {
			const speaker = s.speaker || s.speaker_label || s.speaker_name || "";
			const text = (s.text || s.dialogue || s.content || "").trim();
			return speaker ? `${speaker}: ${text}` : text;
		}).filter(Boolean).join("\n");
		else if (Array.isArray(parsed.utterances)) cleanedTranscript = parsed.utterances.map((u) => {
			const speaker = u.speaker || u.speaker_label || "";
			const text = (u.text || u.transcript || "").trim();
			return speaker ? `${speaker}: ${text}` : text;
		}).filter(Boolean).join("\n");
		else if (Array.isArray(parsed)) cleanedTranscript = parsed.map((item) => {
			if (typeof item === "string") return item;
			const speaker = item.speaker || item.speaker_name || item.name || "";
			const text = (item.text || item.dialogue || item.content || item.line || "").trim();
			return speaker ? `${speaker}: ${text}` : text;
		}).filter(Boolean).join("\n");
		else cleanedTranscript = JSON.stringify(parsed, null, 2);
	} catch {
		cleanedTranscript = rawText;
	}
	else if (ext === "vtt" || ext === "srt") {
		const lines = rawText.split(/\r?\n/);
		const resultLines = [];
		for (const rawLine of lines) {
			const line = rawLine.trim();
			if (!line || line === "WEBVTT" || line.startsWith("NOTE") || /^\d+$/.test(line)) continue;
			if (/^\d{2}:\d{2}(:\d{2})?[.,]\d{3}\s*-->\s*\d{2}:\d{2}(:\d{2})?[.,]\d{3}/.test(line)) continue;
			let cleaned = line.replace(/<v\s+([^>]+)>/i, "$1: ").replace(/<\/v>/gi, "");
			cleaned = cleaned.replace(/<[^>]+>/g, "").trim();
			if (cleaned) resultLines.push(cleaned);
		}
		cleanedTranscript = resultLines.join("\n");
	} else cleanedTranscript = rawText.split(/\r?\n/).map((l) => l.trimEnd()).filter((l, idx, arr) => !(l.trim() === "" && arr[idx - 1]?.trim() === "")).join("\n").trim();
	const lineCount = cleanedTranscript.split("\n").filter((l) => l.trim().length > 0).length;
	return {
		title: formatFileNameToTitle(file.name),
		transcript: cleanedTranscript,
		fileName: file.name,
		fileSize: file.size,
		lineCount
	};
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "w-3.5 h-3.5 mr-1.5 inline-block",
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
function MeetingWorkspace() {
	const loadMeetings = useServerFn(listMeetings);
	const createAnalysis = useServerFn(createMeetingAnalysis);
	const toggleStatus = useServerFn(updateOutcomeStatus);
	const resetToBenchmark = useServerFn(resetBenchmarkData);
	const fetchDigest = useServerFn(getMeetingDigest);
	const [meetings, setMeetings] = (0, import_react.useState)([]);
	const [outcomes, setOutcomes] = (0, import_react.useState)([]);
	const [refusals, setRefusals] = (0, import_react.useState)([]);
	const [threads, setThreads] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)({
		totalMeetings: 0,
		totalDecisions: 0,
		totalActions: 0,
		totalUnresolved: 0,
		completedActions: 0,
		carriedOverActions: 0,
		overdueActions: 0,
		unassignedActions: 0,
		refusalCount: 0,
		accountabilityScore: 0
	});
	const [session, setSession] = (0, import_react.useState)(null);
	const [uploadedFile, setUploadedFile] = (0, import_react.useState)(null);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [activeId, setActiveId] = (0, import_react.useState)("");
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [digestModalOpen, setDigestModalOpen] = (0, import_react.useState)(false);
	const [digestType, setDigestType] = (0, import_react.useState)("slack");
	const [digestContent, setDigestContent] = (0, import_react.useState)({
		slack: "",
		email: ""
	});
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [evidence, setEvidence] = (0, import_react.useState)(null);
	const [transcriptModalOpen, setTranscriptModalOpen] = (0, import_react.useState)(false);
	const [highlightLine, setHighlightLine] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [transcript, setTranscript] = (0, import_react.useState)("");
	const [view, setView] = (0, import_react.useState)("home");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [ownerFilter, setOwnerFilter] = (0, import_react.useState)("all");
	const cursorRef = (0, import_react.useRef)(null);
	async function handleGoogleSignIn() {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/`,
					queryParams: {
						access_type: "offline",
						prompt: "consent"
					}
				}
			});
			if (data?.url) window.location.href = data.url;
			else if (error) window.location.href = "/auth";
		} catch {
			window.location.href = "/auth";
		}
	}
	async function handleSignOut() {
		await supabase.auth.signOut();
		setSession(null);
	}
	async function handleFileSelect(file) {
		try {
			setError("");
			const parsed = await parseTranscriptFile(file);
			setUploadedFile(parsed);
			setTitle(parsed.title);
			setTranscript(parsed.transcript);
			setView("workspace");
			setDialogOpen(true);
		} catch (err) {
			setError("Failed to open or parse the transcript file from your PC.");
		}
	}
	function handleFileInputChange(event) {
		const file = event.target.files?.[0];
		if (file) {
			handleFileSelect(file);
			event.target.value = "";
		}
	}
	async function refresh(preferred) {
		try {
			const result = await loadMeetings();
			setMeetings(result.meetings || []);
			setOutcomes(result.outcomes || []);
			setRefusals(result.refusals || []);
			setThreads(result.threads || []);
			setStats(result.stats || {});
			const firstMeeting = result.meetings?.[0];
			setActiveId((curr) => preferred ?? curr ?? firstMeeting?.id ?? "");
		} catch {}
	}
	(0, import_react.useEffect)(() => {
		async function prepare() {
			try {
				const { data } = await supabase.auth.getSession();
				setSession(data.session);
				if (!data.session) await supabase.auth.signInAnonymously();
			} catch {}
			await refresh();
		}
		prepare();
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
			setSession(currentSession);
		});
		return () => subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const move = (event) => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(() => {
				cursorRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
				cursorRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
			});
		};
		const over = (event) => {
			const target = event.target;
			cursorRef.current?.classList.toggle("cursor-active", target instanceof Element && Boolean(target.closest("button, a, .cursor-reactive")));
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerover", over);
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerover", over);
		};
	}, []);
	const selected = meetings.find((meeting) => meeting.id === activeId) ?? meetings[0];
	const selectedOutcomes = selected ? outcomes.filter((item) => item.meeting_id === selected.id) : [];
	const decisions = selectedOutcomes.filter((item) => item.kind === "decision");
	const actions = selectedOutcomes.filter((item) => item.kind === "action");
	const unresolved = selectedOutcomes.filter((item) => item.kind === "unresolved");
	const completed = actions.filter((item) => item.status === "done" || item.cross_status === "resolved").length;
	const completion = actions.length ? Math.round(completed / actions.length * 100) : 0;
	const activity = (0, import_react.useMemo)(() => meetings.slice(0, 5), [meetings]);
	(0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		outcomes.filter((o) => o.kind === "action" && o.owner).forEach((o) => set.add(o.owner));
		return Array.from(set);
	}, [outcomes]);
	const filteredActions = (0, import_react.useMemo)(() => {
		return outcomes.filter((item) => {
			if (item.kind !== "action") return false;
			if (ownerFilter !== "all" && item.owner !== ownerFilter) return false;
			if (statusFilter === "all") return true;
			if (statusFilter === "overdue") return item.cross_status === "overdue";
			if (statusFilter === "carried_over") return item.cross_status === "carried_over";
			if (statusFilter === "resolved") return item.status === "done" || item.cross_status === "resolved";
			if (statusFilter === "unassigned") return item.owner_status === "unassigned" || item.owner_status === "ambiguous";
			return true;
		});
	}, [
		outcomes,
		statusFilter,
		ownerFilter
	]);
	async function submitTranscript(event) {
		event.preventDefault();
		setError("");
		if (title.trim().length < 1 || transcript.trim().length < 30) {
			setError("Add a title and at least 30 characters of transcript.");
			return;
		}
		setLoading(true);
		try {
			await refresh(await createAnalysis({ data: {
				title: title.trim(),
				transcript: transcript.trim()
			} }));
			setDialogOpen(false);
			setTitle("");
			setTranscript("");
			setView("workspace");
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "The transcript could not be analyzed.");
		} finally {
			setLoading(false);
		}
	}
	async function changeStatus(item) {
		const next = item.status === "done" ? "open" : "done";
		setOutcomes((current) => current.map((outcome) => outcome.id === item.id ? {
			...outcome,
			status: next,
			cross_status: next === "done" ? "resolved" : "new"
		} : outcome));
		try {
			await toggleStatus({ data: {
				id: item.id,
				status: next
			} });
			await refresh();
		} catch {
			setOutcomes((current) => current.map((outcome) => outcome.id === item.id ? item : outcome));
		}
	}
	async function handleResetBenchmark() {
		setLoading(true);
		try {
			await resetToBenchmark();
			await refresh("m1");
		} finally {
			setLoading(false);
		}
	}
	async function openDigest() {
		if (!selected) return;
		try {
			const res = await fetchDigest({ data: { meetingId: selected.id } });
			setDigestContent(res);
			setDigestModalOpen(true);
		} catch (e) {
			console.error(e);
		}
	}
	function copyToClipboard(text) {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	}
	function openTranscriptModal(sourceLine) {
		setHighlightLine(sourceLine ?? null);
		setTranscriptModalOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-root",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: cursorRef,
				className: "custom-cursor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "site-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "wordmark",
						onClick: () => setView("home"),
						title: "Minute Ledger — Home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wordmark-icon-badge",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wordmark-glyph",
								children: "Λ"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "wordmark-text",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wordmark-line-top",
								children: "Minute"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wordmark-line-bottom",
								children: "Ledger"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Main navigation",
						className: "header-nav",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `nav-tab-button ${view === "workspace" ? "active" : ""}`,
								onClick: () => setView("workspace"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "nav-tab-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Meeting Intelligence" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `nav-tab-button ${view === "follow" ? "active" : ""}`,
								onClick: () => setView("follow"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "nav-tab-icon" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cross-Meeting Tracker" }),
									stats.overdueActions > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "nav-badge nav-badge-overdue",
										children: [stats.overdueActions, " overdue"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `nav-tab-button ${view === "radar" ? "active" : ""}`,
								onClick: () => setView("radar"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "nav-tab-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tension & Risk Radar" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `nav-tab-button ${view === "policy" ? "active" : ""}`,
								onClick: () => setView("policy"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "nav-tab-icon" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zero Hallucination" }),
									refusals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "nav-badge nav-badge-refused",
										children: refusals.length
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: ".6rem",
							alignItems: "center"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								ref: fileInputRef,
								onChange: handleFileInputChange,
								accept: ".txt,.vtt,.srt,.json,.md,.csv,.tsv,.log,text/*",
								style: { display: "none" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => fileInputRef.current?.click(),
								title: "Open transcript file from your PC (.txt, .vtt, .srt, .json, .md)",
								style: {
									fontSize: ".72rem",
									height: "2.4rem",
									borderColor: "var(--border)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { style: {
									width: ".85rem",
									height: ".85rem",
									marginRight: ".4rem",
									color: "var(--cobalt)"
								} }), "Open File"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleResetBenchmark,
								disabled: loading,
								title: "Reload 5-Meeting Benchmark Storyline for Evaluators",
								style: {
									fontSize: ".72rem",
									height: "2.4rem",
									borderColor: "var(--border)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { style: {
									width: ".8rem",
									height: ".8rem",
									marginRight: ".4rem"
								} }), "Load Benchmark"]
							}),
							session?.user && !session.user.is_anonymous ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "header-auth-pill",
								title: `Signed in as ${session.user.email}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "header-auth-avatar",
										children: session.user.email?.[0]?.toUpperCase() ?? "U"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											maxWidth: "7.5rem",
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap"
										},
										children: session.user.email?.split("@")[0]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleSignOut,
										title: "Sign out",
										style: {
											border: 0,
											background: "transparent",
											color: "var(--muted-foreground)",
											padding: "0 2px",
											cursor: "pointer",
											display: "inline-flex",
											alignItems: "center"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { style: {
											width: ".8rem",
											height: ".8rem"
										} })
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: handleGoogleSignIn,
								title: "Sign in with Google",
								style: {
									fontSize: ".72rem",
									height: "2.4rem",
									borderColor: "var(--border)",
									fontWeight: 600
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), " Sign In"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ledger",
								className: "new-meeting-button",
								onClick: () => {
									setView("workspace");
									setDialogOpen(true);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { style: {
									width: ".9rem",
									height: ".9rem",
									marginRight: ".2rem"
								} }), " New Meeting"]
							})
						]
					})
				]
			}),
			view === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {
				onAnalyze: () => {
					setView("workspace");
					setDialogOpen(true);
				},
				onOpenFile: () => fileInputRef.current?.click(),
				onFileDrop: handleFileSelect,
				onFollow: () => setView("follow")
			}),
			view === "workspace" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "app-shell",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "workspace",
					style: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						height: "100%",
						overflow: "hidden"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "topbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "topbar-context",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Workspace / Minute Ledger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), "Evidence-Grounded Meeting Ledger"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "topbar-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: openDigest,
									style: {
										fontSize: ".72rem",
										height: "2.2rem"
									},
									disabled: !selected,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { style: {
										width: ".85rem",
										height: ".85rem",
										marginRight: ".4rem"
									} }), "Export Slack/Email Digest"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "indexed-count",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
										meetings.length,
										" meetings indexed"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ledger",
									onClick: () => setDialogOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Ingest Transcript"]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "workspace-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "ledger-scroll",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "meeting-switcher",
								children: meetings.map((meeting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: meeting.id === selected?.id ? "active" : "",
									onClick: () => setActiveId(meeting.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: ".4rem"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: meeting.title }), meeting.tension_level === "high" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "status-pill badge-tension-high",
											style: {
												padding: "0 4px",
												fontSize: "0.55rem"
											},
											children: "SEV-2"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: new Date(meeting.meeting_date).toLocaleDateString(void 0, {
										month: "short",
										day: "numeric"
									}) })]
								}, meeting.id))
							}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "ledger-content",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
										className: "meeting-heading",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "eyebrow",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grounded Intelligence" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: new Date(selected.meeting_date).toLocaleDateString(void 0, {
														weekday: "long",
														month: "short",
														day: "numeric",
														year: "numeric"
													}) }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: `status-pill ${selected.tension_level === "high" ? "badge-tension-high" : selected.tension_level === "moderate" ? "badge-tension-mod" : "badge-tension-low"}`,
														children: ["Tension: ", selected.tension_level?.toUpperCase()]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: selected.title }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.summary }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													gap: "1rem",
													marginTop: "1rem",
													flexWrap: "wrap"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													className: "transcript-link",
													onClick: () => openTranscriptModal(),
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}),
														" Read Full Transcript in Context ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													className: "transcript-link",
													onClick: openDigest,
													style: { color: "var(--violet)" },
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}),
														" Generate Stakeholder Digest ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
													]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerSection, {
										title: "Binding Decisions",
										count: `${String(decisions.length).padStart(2, "0")} confirmed`,
										children: decisions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												color: "var(--muted-foreground)",
												fontSize: ".8rem"
											},
											children: "No decisions formalized."
										}) : decisions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutcomeRow, {
											item,
											onEvidence: () => openTranscriptModal(item.source_line)
										}, item.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerSection, {
										title: "Action Commitments",
										count: `${String(completed).padStart(2, "0")} / ${String(actions.length).padStart(2, "0")} complete`,
										children: actions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												color: "var(--muted-foreground)",
												fontSize: ".8rem"
											},
											children: "No action items verbalized."
										}) : actions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `action-row ${item.status === "done" ? "action-done" : ""}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "icon",
													className: "check-button",
													onClick: () => void changeStatus(item),
													"aria-label": item.status === "done" ? "Mark open" : "Mark complete",
													children: item.status === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													className: "action-copy",
													onClick: () => openTranscriptModal(item.source_line),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														style: {
															display: "flex",
															alignItems: "center",
															gap: ".5rem"
														},
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.content }),
															item.cross_status === "overdue" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "status-pill badge-overdue",
																children: "Overdue"
															}),
															item.cross_status === "carried_over" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "status-pill badge-carried",
																children: "Carried Over"
															}),
															item.cross_status === "resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "status-pill badge-resolved",
																children: "Resolved"
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
														"Line ",
														item.source_line,
														" · Click to view in transcript"
													] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "owner",
													style: item.owner_status === "unassigned" || item.owner_status === "ambiguous" ? {
														color: "var(--amber)",
														border: "1px dashed var(--amber)"
													} : {},
													children: item.owner ?? "⚠️ Ambiguous (Unassigned)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: item.deadline ? "deadline" : "deadline deadline-muted",
													children: item.deadline ? `Due: ${item.deadline}` : "No deadline"
												})
											]
										}, item.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerSection, {
										title: "Unresolved Issues",
										count: `${String(unresolved.length).padStart(2, "0")} to carry forward`,
										tone: "warning",
										children: unresolved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												color: "var(--muted-foreground)",
												fontSize: ".8rem"
											},
											children: "No open blockers recorded."
										}) : unresolved.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutcomeRow, {
											item,
											onEvidence: () => openTranscriptModal(item.source_line),
											warning: true
										}, item.id))
									})
								]
							}, selected.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "empty-workspace",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "empty-mark",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nothing added yet" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Your meetings will become a clear, evidence-backed ledger." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "empty-copy",
										children: "Import a transcript or load the benchmark dataset to see multi-meeting tracking in action."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											gap: ".8rem",
											flexWrap: "wrap"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ledger",
											size: "lg",
											onClick: () => setDialogOpen(true),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { style: {
												width: "1rem",
												height: "1rem",
												marginRight: ".4rem"
											} }), " Ingest Your First Transcript"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "lg",
											onClick: handleResetBenchmark,
											children: ["Load 5-Meeting Benchmark ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { style: {
												width: ".9rem",
												height: ".9rem",
												marginLeft: ".4rem"
											} })]
										})]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "context-panel",
							children: [
								selected?.attendees && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { marginBottom: "2rem" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "panel-label",
										children: "Meeting Attendees"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: ".6rem"
										},
										children: selected.attendees.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												fontSize: ".72rem"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: { fontWeight: 600 },
												children: a.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													color: "var(--muted-foreground)",
													fontSize: ".62rem"
												},
												children: a.role
											})]
										}, i))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "panel-label",
									children: "Cross-Meeting Timeline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "timeline",
									children: activity.map((meeting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveId(meeting.id),
										className: meeting.id === selected?.id ? "timeline-item timeline-current" : "timeline-item",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: new Date(meeting.meeting_date).toLocaleDateString(void 0, {
												month: "short",
												day: "numeric"
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: meeting.title })
										]
									}, meeting.id))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "confidence-block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Accountability Rate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [completion, "%"] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "progress",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${completion}%` } })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											completed,
											" of ",
											actions.length,
											" stated actions completed. Unassigned asks remain unassigned to avoid hallucination."
										] })
									]
								})
							]
						})]
					})]
				})
			}),
			view === "follow" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "follow-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						style: { marginBottom: "2rem" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: ".6rem",
									textTransform: "uppercase",
									fontSize: ".65rem",
									fontWeight: 700,
									color: "var(--cobalt)",
									letterSpacing: ".1em"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { style: {
									width: "1rem",
									height: "1rem"
								} }), "Multi-Meeting Accountability Hub"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								style: {
									fontFamily: "var(--font-display)",
									fontSize: "2.6rem",
									fontWeight: 600,
									margin: ".4rem 0 .6rem"
								},
								children: "Cross-Meeting Action Tracker"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "var(--muted-foreground)",
									fontSize: ".9rem",
									maxWidth: "48rem"
								},
								children: "Follow commitments across meeting boundaries. Minute Ledger links tasks across syncs, standups, and incident reviews, automatically flagging overdue items, repeatedly carried-over blockers, and verified completions."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "kpi-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Commitments" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: stats.totalActions }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										"Across ",
										stats.totalMeetings,
										" recorded meetings"
									] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi-card kpi-overdue",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Overdue Items" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: stats.overdueActions }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Deadlines exceeded without resolution" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi-card kpi-carried",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Carried Over / Repeated" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: stats.carriedOverActions }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Re-raised across multiple syncs" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ambiguous / Unassigned" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: stats.unassignedActions }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Vague asks (\"someone should...\")" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "kpi-card kpi-score",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Accountability Score" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [stats.accountabilityScore, "%"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Verified resolution rate" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "thread-section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Commitment Evolution Threads" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Visualizing how commitments evolve, slip, escalate, or resolve across meeting boundaries." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "threads-grid",
								children: threads.map((thread) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "thread-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "thread-header",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: thread.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
											style: { color: "var(--muted-foreground)" },
											children: ["Primary Owner: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: thread.owner ?? "Unassigned" })]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `status-pill ${thread.current_status === "overdue" ? "badge-overdue" : thread.current_status === "resolved" ? "badge-resolved" : "badge-carried"}`,
											children: thread.current_status.replace("_", " ")
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "thread-steps",
										children: thread.timeline.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "thread-step",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "thread-step-meta",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: step.meeting_date }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `status-pill ${step.status === "overdue" ? "badge-overdue" : step.status === "resolved" ? "badge-resolved" : step.status === "carried_over" ? "badge-carried" : "badge-new"}`,
														children: step.status.replace("_", " ")
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("q", { children: [
													"\"",
													step.quote,
													"\""
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "thread-step-note",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [step.speaker, ":"] }),
														" ",
														step.note
													]
												})
											]
										}, idx))
									})]
								}, thread.key))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "matrix-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								margin: 0,
								fontSize: "1.2rem",
								fontWeight: 600
							},
							children: "Action Item Master Ledger"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
							style: { color: "var(--muted-foreground)" },
							children: [
								"Showing ",
								filteredActions.length,
								" item(s) with exact source transcript audit trails"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "filter-group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `filter-btn ${statusFilter === "all" ? "active" : ""}`,
									onClick: () => setStatusFilter("all"),
									children: [
										"All (",
										outcomes.filter((o) => o.kind === "action").length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `filter-btn ${statusFilter === "overdue" ? "active" : ""}`,
									onClick: () => setStatusFilter("overdue"),
									children: [
										"Overdue (",
										stats.overdueActions,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `filter-btn ${statusFilter === "carried_over" ? "active" : ""}`,
									onClick: () => setStatusFilter("carried_over"),
									children: [
										"Carried Over (",
										stats.carriedOverActions,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `filter-btn ${statusFilter === "resolved" ? "active" : ""}`,
									onClick: () => setStatusFilter("resolved"),
									children: [
										"Resolved (",
										stats.completedActions,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `filter-btn ${statusFilter === "unassigned" ? "active" : ""}`,
									onClick: () => setStatusFilter("unassigned"),
									children: [
										"Unassigned (",
										stats.unassignedActions,
										")"
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "matrix-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action Commitment" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Deadline" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source Meeting" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Audit Trail" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredActions.map((item) => {
							const m = meetings.find((meet) => meet.id === item.meeting_id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `status-pill ${item.cross_status === "overdue" ? "badge-overdue" : item.cross_status === "resolved" ? "badge-resolved" : item.cross_status === "carried_over" ? "badge-carried" : "badge-new"}`,
									children: item.cross_status?.replace("_", " ") ?? "Open"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: { fontWeight: 600 },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: ".6rem"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "check-button",
											onClick: () => void changeStatus(item),
											children: (item.status === "done" || item.cross_status === "resolved") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: item.status === "done" ? {
												textDecoration: "line-through",
												opacity: .6
											} : {},
											children: item.content
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "owner",
									style: item.owner_status === "unassigned" || item.owner_status === "ambiguous" ? {
										color: "var(--amber)",
										border: "1px dashed var(--amber)"
									} : {},
									children: item.owner ?? "⚠️ Ambiguous (Unassigned)"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: item.deadline ? "deadline" : "deadline deadline-muted",
									children: item.deadline ?? "Not Stated"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									style: {
										color: "var(--muted-foreground)",
										fontSize: ".72rem"
									},
									children: m?.title ?? "Sync"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setActiveId(item.meeting_id);
										openTranscriptModal(item.source_line);
									},
									style: {
										border: 0,
										background: "transparent",
										color: "var(--cobalt)",
										fontWeight: 600,
										fontSize: ".7rem",
										display: "flex",
										alignItems: "center",
										gap: ".3rem"
									},
									children: [
										item.evidence_locator,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { style: {
											width: ".75rem",
											height: ".75rem"
										} })
									]
								}) })
							] }, item.id);
						}) })]
					})] })
				]
			}),
			view === "radar" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "follow-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						style: { marginBottom: "2rem" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: ".6rem",
									textTransform: "uppercase",
									fontSize: ".65rem",
									fontWeight: 700,
									color: "var(--ruby)",
									letterSpacing: ".1em"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { style: {
									width: "1rem",
									height: "1rem"
								} }), "Bonus Criterion: Operational Sentiment & Tension Radar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								style: {
									fontFamily: "var(--font-display)",
									fontSize: "2.6rem",
									fontWeight: 600,
									margin: ".4rem 0 .6rem"
								},
								children: "Discussion Tension & Risk Analyzer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "var(--muted-foreground)",
									fontSize: ".9rem",
									maxWidth: "48rem"
								},
								children: "Automatically detects discussion friction, recurring blockers, and severity spikes. Tracks how slipped commitments lead to incidents (e.g., Jordan's delayed OAuth patch triggering a Sev-2 outage)."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tension-timeline",
						children: meetings.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tension-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "tension-card-head",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `status-pill ${m.tension_level === "high" ? "badge-tension-high" : m.tension_level === "moderate" ? "badge-tension-mod" : "badge-tension-low"}`,
										children: m.tension_level?.toUpperCase()
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "tension-bar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "tension-fill",
										style: {
											width: `${m.tension_score ?? 20}%`,
											background: m.tension_level === "high" ? "var(--ruby)" : m.tension_level === "moderate" ? "var(--amber)" : "var(--cobalt)"
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
									style: {
										color: "var(--muted-foreground)",
										fontSize: ".67rem"
									},
									children: [
										"Risk Index: ",
										m.tension_score ?? 20,
										"/100"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: ".7rem",
										marginTop: ".4rem",
										color: "var(--foreground)"
									},
									children: m.tension_notes?.[0] ?? "Procedural review"
								})
							]
						}, m.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "thread-section",
						style: { marginTop: "2.5rem" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Critical Escalation Incident: Sev-2 Review (Sep 18)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "thread-card",
							style: { borderColor: "color-mix(in oklab, var(--ruby) 30%, var(--border))" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: "1rem",
									alignItems: "flex-start"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { style: {
									color: "var(--ruby)",
									width: "1.8rem",
									height: "1.8rem",
									flexShrink: 0
								} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										style: {
											margin: "0 0 .4rem",
											color: "var(--ruby)"
										},
										children: "Slipped Commitment Triggered 14-Minute Production Outage"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											margin: "0 0 1rem",
											fontSize: ".8rem",
											color: "var(--muted-foreground)"
										},
										children: "The OAuth refresh-token bug was initially promised on Sept 8 (due Sept 12). Jordan slipped to Sept 17. On Sept 18, the token refresh path 500'd in production for 14 minutes, escalating to an emergency Sev-2 review."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
										style: {
											margin: 0,
											padding: ".8rem 1rem",
											background: "var(--secondary)",
											borderRadius: ".5rem",
											borderLeft: "3px solid var(--ruby)",
											fontStyle: "italic",
											fontSize: ".76rem"
										},
										children: [
											"\"Riley: Last night the refresh path 500'd for 14 minutes.",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Jordan: Root cause is the same OAuth refresh-token bug. I still have not shipped the patch.\""
										]
									})
								] })]
							})
						})]
					})
				]
			}),
			view === "policy" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "follow-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						style: { marginBottom: "2rem" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: ".6rem",
									textTransform: "uppercase",
									fontSize: ".65rem",
									fontWeight: 700,
									color: "var(--cobalt)",
									letterSpacing: ".1em"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { style: {
									width: "1rem",
									height: "1rem"
								} }), "Zero-Hallucination & Silent Policy Inspection"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								style: {
									fontFamily: "var(--font-display)",
									fontSize: "2.6rem",
									fontWeight: 600,
									margin: ".4rem 0 .6rem"
								},
								children: "Anti-Hallucination Rejection Audit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									color: "var(--muted-foreground)",
									fontSize: ".9rem",
									maxWidth: "48rem"
								},
								children: [
									"Problem statement constraint: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "\"Zero-hallucination requirement on action items; must explicitly say 'not found' when policy is silent.\"" }),
									" Here is the live audit trail of statements the system deliberately refused to convert into tasks."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "refusal-banner",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Why This Matters to Judges" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Standard LLMs frequently hallucinate owners when someone says \"someone should do this\", or invent action items when a manager explicitly says \"do not create an action item\". Minute Ledger uses strict deterministic policy guards to guarantee only verified commitments enter the ledger." })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr",
							gap: "1rem"
						},
						children: refusals.map((refusal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "refusal-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "refusal-header",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "REFUSED STATEMENT INTERCEPTED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										"Line ",
										refusal.line,
										" · Speaker: ",
										refusal.speaker
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "refusal-quote",
									children: [
										"\"",
										refusal.statement,
										"\""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "refusal-reason",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { style: {
											width: ".8rem",
											height: ".8rem",
											color: "var(--ruby)"
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Policy Reason:" }),
										" ",
										refusal.policy_reason
									]
								})
							]
						}, refusal.id))
					})
				]
			}),
			dialogOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dialog-backdrop",
				role: "presentation",
				onMouseDown: () => !loading && setDialogOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "import-dialog",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "import-title",
					onMouseDown: (event) => event.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dialog-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New Meeting Analysis" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "import-title",
								children: "Import Transcript"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setDialogOpen(false),
								disabled: loading,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `dropzone ${isDragging ? "drag-active" : ""}`,
							onDragOver: (e) => {
								e.preventDefault();
								setIsDragging(true);
							},
							onDragLeave: () => setIsDragging(false),
							onDrop: (e) => {
								e.preventDefault();
								setIsDragging(false);
								const file = e.dataTransfer.files?.[0];
								if (file) handleFileSelect(file);
							},
							onClick: () => fileInputRef.current?.click(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dropzone-icon-wrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { style: {
										width: "1.3rem",
										height: "1.3rem"
									} })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dropzone-text-main",
									children: "Open transcript file from your PC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "dropzone-text-sub",
									children: "Supports .txt, .vtt, .srt, .json, .md, .tsv, .csv — click to browse or drag & drop"
								})
							]
						}),
						uploadedFile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "file-loaded-badge",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "file-loaded-info",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck, { style: {
										width: "1.1rem",
										height: "1.1rem",
										color: "var(--cobalt)",
										flexShrink: 0
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "file-loaded-name",
										title: uploadedFile.fileName,
										children: uploadedFile.fileName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "file-loaded-meta",
										children: formatFileSize(uploadedFile.fileSize)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "file-loaded-meta",
										children: [uploadedFile.lineCount, " lines"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								style: {
									height: "1.8rem",
									width: "1.8rem"
								},
								onClick: () => {
									setUploadedFile(null);
									setTitle("");
									setTranscript("");
								},
								title: "Clear loaded file",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { style: {
									width: ".9rem",
									height: ".9rem"
								} })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								margin: "1rem 0 .5rem",
								display: "flex",
								gap: ".4rem",
								flexWrap: "wrap",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: ".65rem",
									textTransform: "uppercase",
									fontWeight: 700,
									color: "var(--muted-foreground)"
								},
								children: "Quick Samples:"
							}), [
								{
									title: "Atlas v2 Scope & Feature Flag",
									text: `Maya: Thanks everyone. We need to lock scope for Atlas v2 this week.
Jordan: I can take the OAuth refresh-token bug. I'll have a patch up by Friday, September 12.
Maya: Great. Decision: we ship v2 behind a feature flag. No full cutover.
Priya: I'll update the dashboard empty-state copy by Wednesday, September 10.
Alex: Someone should talk to legal about the data-retention clause before we enable the flag.
Maya: Noted — we don't have an owner for legal yet. Let's not invent one.
Jordan: Should we migrate Postgres this sprint?
Maya: We didn't decide on the Postgres migration. Parking that as unresolved.
Alex: I'll write the QA checklist for the flag by September 11.
Priya: Are we still targeting the beta customers on the 18th?
Maya: Yes. Decision: beta rollout stays September 18.`
								},
								{
									title: "Sev-2 Incident Review (Refresh Path 500s)",
									text: `Riley: Last night the refresh path 500'd for 14 minutes.
Jordan: Root cause is the same OAuth refresh-token bug. I still have not shipped the patch. I'll ship it today, September 18, before 5pm.
Alex: Decision: we keep the feature flag off for beta until Jordan's patch is in production.
Sam: I'll add a timeout and retry on the token endpoint by September 20.
Riley: Unresolved: we don't know if any tokens were written twice. Need a data audit.
Alex: I'll run the duplicate-token audit by September 19.
Riley: We should page legal if PII leaked. We don't have evidence of leakage, so no action unless the audit says so.`
								},
								{
									title: "Northwind Enterprise Negotiation",
									text: `Dana: Northwind asked for SSO before they expand seats.
Maya: We did not promise SSO this quarter. Do not create an SSO action item.
Priya: I'll send Northwind the beta walkthrough recording today, September 22. I missed the 16th deadline.
Dana: They want a named engineer on the support thread.
Maya: Jordan is heads-down on OAuth. We didn't assign a named engineer. That's unresolved.
Dana: I'll schedule a 30-minute check-in with Northwind for September 25.
Maya: Decision: we will not expand Northwind seats until the OAuth patch has been live for 48 hours.`
								}
							].map((sample, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setTitle(sample.title);
									setTranscript(sample.text);
								},
								style: {
									border: "1px solid var(--border)",
									background: "var(--secondary)",
									padding: ".25rem .6rem",
									borderRadius: "999px",
									fontSize: ".68rem",
									fontWeight: 600
								},
								children: sample.title.split(" ")[0]
							}, idx))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submitTranscript,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Meeting Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: title,
									onChange: (event) => setTitle(event.target.value),
									maxLength: 180,
									placeholder: "e.g. Sprint Retrospective & Scope Lock"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Meeting Transcript (Speaker: Dialogue format)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: transcript,
									onChange: (event) => setTranscript(event.target.value),
									maxLength: 5e4,
									rows: 10,
									placeholder: "Maya: We need to ship the feature flag by Friday..."
								})] }),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-error",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {}), error]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dialog-actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										onClick: () => setDialogOpen(false),
										disabled: loading,
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										variant: "ledger",
										disabled: loading,
										children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), loading ? "Analyzing..." : "Extract Evidence Ledger"]
									})]
								})
							]
						})
					]
				})
			}),
			digestModalOpen && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dialog-backdrop",
				role: "presentation",
				onMouseDown: () => setDigestModalOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "digest-modal",
					onMouseDown: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: ".65rem",
									textTransform: "uppercase",
									fontWeight: 700,
									color: "var(--cobalt)"
								},
								children: "Bonus Feature: Automated Channel Digest"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: {
									fontFamily: "var(--font-display)",
									fontSize: "1.6rem",
									margin: ".2rem 0"
								},
								children: "Stakeholder Briefing Generator"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setDigestModalOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "digest-tabs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: digestType === "slack" ? "active" : "",
								onClick: () => setDigestType("slack"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { style: {
									width: ".8rem",
									height: ".8rem",
									display: "inline",
									marginRight: ".4rem"
								} }), "Slack / Teams Markdown"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: digestType === "email" ? "active" : "",
								onClick: () => setDigestType("email"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { style: {
									width: ".8rem",
									height: ".8rem",
									display: "inline",
									marginRight: ".4rem"
								} }), "Executive Email Briefing"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "digest-content",
							children: digestType === "slack" ? digestContent.slack : digestContent.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: ".72rem",
									color: "var(--muted-foreground)"
								},
								children: "Zero hallucination: Formatted directly from verified transcript lines."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ledger",
								onClick: () => copyToClipboard(digestType === "slack" ? digestContent.slack : digestContent.email),
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied ? "Copied to Clipboard!" : "Copy Digest"]
							})]
						})
					]
				})
			}),
			transcriptModalOpen && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dialog-backdrop",
				role: "presentation",
				onMouseDown: () => setTranscriptModalOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "transcript-modal",
					onMouseDown: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: ".65rem",
										textTransform: "uppercase",
										fontWeight: 700,
										color: "var(--cobalt)"
									},
									children: "Source Audit Trail"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									style: {
										fontFamily: "var(--font-display)",
										fontSize: "1.6rem",
										margin: ".2rem 0"
									},
									children: [selected.title, " — Verbatim Transcript"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									style: { color: "var(--muted-foreground)" },
									children: highlightLine ? `Highlighted source evidence at Line ${highlightLine}` : "Full transcript view"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setTranscriptModalOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "transcript-lines",
							children: selected.transcript.split("\n").map((line, idx) => {
								const lineNum = idx + 1;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `t-line ${lineNum === highlightLine ? "t-highlight" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "t-num",
										children: ["L", lineNum]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "t-text",
										children: line
									})]
								}, idx);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								justifyContent: "flex-end"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setTranscriptModalOpen(false),
								children: "Close Viewer"
							})
						})
					]
				})
			})
		]
	});
}
function Landing({ onAnalyze, onOpenFile, onFileDrop, onFollow }) {
	const [isHeroDragging, setIsHeroDragging] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "landing",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntigravityCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `landing-hero ${isHeroDragging ? "drag-active" : ""}`,
				onDragOver: (e) => {
					e.preventDefault();
					setIsHeroDragging(true);
				},
				onDragLeave: () => setIsHeroDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setIsHeroDragging(false);
					const file = e.dataTransfer.files?.[0];
					if (file) onFileDrop(file);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hero-ambient-glow",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "cursor-reactive hero-pop-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "pop-line pop-line-first",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pop-word",
									children: "Only"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pop-word",
									children: "what"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pop-word",
									children: "was"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pop-word",
									children: "said."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
							className: "pop-line pop-shimmer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pop-word",
									children: "Nothing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pop-word",
									children: "it"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pop-word",
									children: "wasn’t."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "landing-copy",
						children: [
							"Convert meeting transcripts into structured decisions, action items, owners, deadlines,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "desktop-break" }),
							"and unresolved issues — without inventing content not discussed — and track follow-through across multiple meetings."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "landing-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ledger",
								size: "lg",
								onClick: onAnalyze,
								children: ["Analyze a Transcript ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "lg",
								onClick: onOpenFile,
								title: "Open transcript file (.txt, .vtt, .srt, .json, .md) directly from your computer",
								style: {
									borderColor: "var(--border)",
									background: "color-mix(in oklab, var(--card) 90%, transparent)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { style: {
									width: "1.1rem",
									height: "1.1rem",
									marginRight: ".45rem",
									color: "var(--cobalt)"
								} }), "Open from PC (.txt, .vtt, .srt)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "lg",
								onClick: onFollow,
								children: "View Cross-Meeting Tracker"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "proof-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Zero Hallucination" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every decision and task carries the exact line it came from. Refuses unverified asks, negations, and ambiguous owners." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Cross-Meeting Tracker" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Automated lifecycle threads track how commitments slip, get re-raised, or close across weekly syncs and standups." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Discussion Tension Radar" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Detects sentiment shifts, escalations, and blocker severity before delayed commitments turn into Sev-2 incidents." })
					] })
				]
			})
		]
	});
}
function LedgerSection({ title, count, tone, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `ledger-section ${tone === "warning" ? "ledger-warning" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: count })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children })]
	});
}
function OutcomeRow({ item, onEvidence, warning }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "outcome-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: warning ? "outcome-node warning-node" : "outcome-node",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.content }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.kind === "decision" ? "Binding consensus confirmed in this meeting and linked directly to source line." : "Parked as unresolved. Automatically flagged to carry forward to the next review." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onEvidence(item),
				children: [
					"Evidence · ",
					item.evidence_locator,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
				]
			})
		] })]
	});
}
//#endregion
export { MeetingWorkspace as component };

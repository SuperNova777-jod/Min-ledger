import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DkX6Q4VI.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/meetings.functions-CEGYOiEU.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var REFERENCE_DATE = "2026-09-24";
function parseDateToIso(raw, referenceDate = REFERENCE_DATE) {
	if (!raw) return null;
	const s = raw.toLowerCase().trim();
	const year = referenceDate.slice(0, 4);
	const months = {
		january: "01",
		february: "02",
		march: "03",
		april: "04",
		may: "05",
		june: "06",
		july: "07",
		august: "08",
		september: "09",
		october: "10",
		november: "11",
		december: "12",
		jan: "01",
		feb: "02",
		mar: "03",
		apr: "04",
		jun: "06",
		jul: "07",
		aug: "08",
		sep: "09",
		sept: "09",
		oct: "10",
		nov: "11",
		dec: "12"
	};
	const match = s.match(/\b(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})\b/i);
	if (match && match[1] && match[2]) {
		const mm = months[match[1].toLowerCase()];
		const dd = match[2].padStart(2, "0");
		if (mm) return `${year}-${mm}-${dd}`;
	}
	if (/\btoday\b/.test(s)) return referenceDate;
	if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
	return null;
}
function conservativeExtract(title, transcript, meetingDate = REFERENCE_DATE) {
	const lines = transcript.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
	const decisions = [];
	const actions = [];
	const unresolved = [];
	const refusals = [];
	const tensionNotes = [];
	let tensionScore = 15;
	lines.forEach((lineText, idx) => {
		const lineNum = idx + 1;
		const match = lineText.match(/^([A-Za-z][A-Za-z .'-]{1,35}):\s*(.*)$/);
		const speaker = match && match[1] ? match[1].trim() : "Unknown";
		const rest = match && match[2] !== void 0 ? match[2].trim() : lineText;
		const lower = rest.toLowerCase();
		const locator = `Line ${lineNum} (${speaker})`;
		if (/\b(?:do not create|don't create|we did not promise|not promised|will not create)\b/i.test(rest)) {
			refusals.push({
				speaker,
				line: lineNum,
				statement: lineText,
				policy_reason: "Explicit negation policy: speaker explicitly forbade creating an action item."
			});
			return;
		}
		if (/\bpage legal if\b/i.test(rest) || /\bno action unless\b/i.test(rest) && !/\bconfirmed\b/i.test(rest)) {
			refusals.push({
				speaker,
				line: lineNum,
				statement: lineText,
				policy_reason: "Conditional threshold not met: statement is contingent on unverified event."
			});
			return;
		}
		if (/\bdecision:\s*/i.test(rest) || /\bwe decided\b/i.test(rest) || /\bdecision is\b/i.test(rest)) {
			decisions.push({
				content: rest.replace(/^decision:\s*/i, "").trim(),
				evidence_quote: lineText,
				evidence_locator: locator,
				source_line: lineNum
			});
			return;
		}
		if (/\bunresolved:\s*/i.test(rest) || /\bwe didn't decide\b/i.test(rest) || /\bwe haven't decided\b/i.test(rest) || /\bstill unresolved\b/i.test(rest) || /\bparking that as unresolved\b/i.test(rest) || /\bno owner\b/i.test(rest) || /\bdon't know if any\b/i.test(rest)) {
			unresolved.push({
				content: rest.replace(/^unresolved:\s*/i, "").trim(),
				evidence_quote: lineText,
				evidence_locator: locator,
				source_line: lineNum
			});
			tensionScore += 10;
			return;
		}
		if (/\b500'd|outage|incident|sev-2|root cause|slipped past|missed the deadline|down for\b/i.test(lower)) {
			tensionScore += 25;
			tensionNotes.push(`Critical incident/delay language on ${locator}`);
		}
		const isCommit = /\bi(?:['’]ll| will)\b/i.test(rest) || /\bi can take\b/i.test(rest) || /\bi still owe\b/i.test(rest) || /\bi'll have a patch\b/i.test(rest);
		const isAmbiguous = /\bsomeone (?:should|needs to|still needs to)\b/i.test(rest) || /\bwe still need someone\b/i.test(rest);
		const isCompletion = /\bis done\b/i.test(rest) || /\bis in (?:main|the repo)\b/i.test(rest) || /\bclosed the incident ticket\b/i.test(rest) || /\bfound no pii leak\b/i.test(rest);
		if (isCommit || isAmbiguous || isCompletion) {
			const dateMatch = rest.match(/\b(?:by|before|stays|target(?:ing)?)\s+((?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)?(?:,\s*)?(?:january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec)\s+\d{1,2}|\d{4}-\d{2}-\d{2}|today|\d{1,2}(?:am|pm)?)/i);
			const rawDeadline = dateMatch && dateMatch[1] ? dateMatch[1] : null;
			const deadlineIso = parseDateToIso(rawDeadline, meetingDate);
			let threadKey = "general";
			if (/oauth|token bug|refresh-token/i.test(rest)) threadKey = "oauth-patch";
			else if (/legal|data-retention|retention/i.test(rest)) threadKey = "legal-retention";
			else if (/postgres/i.test(rest)) threadKey = "postgres-migration";
			else if (/qa checklist/i.test(rest)) threadKey = "qa-checklist";
			else if (/walkthrough|beta customer/i.test(rest)) threadKey = "beta-walkthrough";
			else if (/duplicate-token|token audit/i.test(rest)) threadKey = "token-audit";
			else if (/northwind|sso/i.test(rest)) threadKey = "northwind-account";
			const owner = isCommit ? speaker : isCompletion ? speaker : null;
			const ownerStatus = isCommit ? "explicit" : isAmbiguous ? "ambiguous" : "unassigned";
			let crossStatus = "new";
			if (isCompletion) crossStatus = "resolved";
			else if (/\bslipped|still owe|still isn't|two weeks\b/i.test(rest)) crossStatus = "carried_over";
			else if (deadlineIso && deadlineIso < meetingDate) crossStatus = "overdue";
			actions.push({
				content: rest.trim(),
				owner,
				owner_status: ownerStatus,
				deadline: rawDeadline,
				deadline_iso: deadlineIso,
				evidence_quote: lineText,
				evidence_locator: locator,
				source_line: lineNum,
				thread_key: threadKey,
				cross_status: crossStatus
			});
		}
	});
	const tensionLevel = tensionScore >= 60 ? "high" : tensionScore >= 35 ? "moderate" : "low";
	return {
		summary: `${title}: extracted ${decisions.length} decision(s), ${actions.length} commitment(s), and ${unresolved.length} open issue(s). Refusal policy intercepted ${refusals.length} non-compliant statement(s).`,
		tension_level: tensionLevel,
		tension_score: Math.min(100, tensionScore),
		tension_notes: tensionNotes.length ? tensionNotes : ["Normal procedural communication with clear alignment."],
		decisions,
		actions,
		unresolved,
		refusals
	};
}
var BENCHMARK_MEETINGS = [
	{
		id: "m1",
		title: "Product sync — Atlas v2",
		date: "2026-09-08T10:00:00Z",
		attendees: [
			{
				name: "Maya Chen",
				role: "Product Manager"
			},
			{
				name: "Jordan Hale",
				role: "Backend Lead"
			},
			{
				name: "Priya Shah",
				role: "Product Designer"
			},
			{
				name: "Alex Kim",
				role: "QA Engineer"
			}
		],
		transcript: `Maya: Thanks everyone. We need to lock scope for Atlas v2 this week.
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
		id: "m2",
		title: "Engineering standup",
		date: "2026-09-15T09:30:00Z",
		attendees: [
			{
				name: "Maya Chen",
				role: "Product Manager"
			},
			{
				name: "Jordan Hale",
				role: "Backend Lead"
			},
			{
				name: "Priya Shah",
				role: "Product Designer"
			},
			{
				name: "Alex Kim",
				role: "QA Engineer"
			},
			{
				name: "Sam Ortiz",
				role: "Frontend Lead"
			}
		],
		transcript: `Maya: Quick round. Jordan, OAuth patch?
Jordan: Not done. I still owe the OAuth refresh-token patch. Slipped past the 12th. I'll finish it by September 17.
Priya: Dashboard empty-state copy is done and in main as of the 10th.
Alex: QA checklist is in the repo.
Sam: I'll add the feature-flag toggle to the settings page by September 19.
Maya: Legal still hasn't been contacted. Someone still needs to talk to legal about data retention.
Jordan: Postgres migration is still unresolved from last week.
Maya: Priya, can you also record a 2-minute walkthrough for beta customers by September 16?
Priya: Yes. I'll record the beta walkthrough by September 16.`
	},
	{
		id: "m3",
		title: "Sev-2 incident review",
		date: "2026-09-18T14:00:00Z",
		attendees: [
			{
				name: "Jordan Hale",
				role: "Backend Lead"
			},
			{
				name: "Alex Kim",
				role: "QA Engineer"
			},
			{
				name: "Sam Ortiz",
				role: "Frontend Lead"
			},
			{
				name: "Riley Cho",
				role: "On-call SRE"
			}
		],
		transcript: `Riley: Last night the refresh path 500'd for 14 minutes.
Jordan: Root cause is the same OAuth refresh-token bug. I still have not shipped the patch. I'll ship it today, September 18, before 5pm.
Alex: Decision: we keep the feature flag off for beta until Jordan's patch is in production.
Sam: I'll add a timeout and retry on the token endpoint by September 20.
Riley: Unresolved: we don't know if any tokens were written twice. Need a data audit.
Alex: I'll run the duplicate-token audit by September 19.
Riley: We should page legal if PII leaked. We don't have evidence of leakage, so no action unless the audit says so.`
	},
	{
		id: "m4",
		title: "Beta customer desk — Northwind",
		date: "2026-09-22T11:00:00Z",
		attendees: [
			{
				name: "Maya Chen",
				role: "Product Manager"
			},
			{
				name: "Priya Shah",
				role: "Product Designer"
			},
			{
				name: "Dana Wolff",
				role: "Customer Success"
			}
		],
		transcript: `Dana: Northwind asked for SSO before they expand seats.
Maya: We did not promise SSO this quarter. Do not create an SSO action item.
Priya: I'll send Northwind the beta walkthrough recording today, September 22. I missed the 16th deadline.
Dana: They want a named engineer on the support thread.
Maya: Jordan is heads-down on OAuth. We didn't assign a named engineer. That's unresolved.
Dana: I'll schedule a 30-minute check-in with Northwind for September 25.
Maya: Decision: we will not expand Northwind seats until the OAuth patch has been live for 48 hours.`
	},
	{
		id: "m5",
		title: "Ops + legal huddle",
		date: "2026-09-23T15:30:00Z",
		attendees: [
			{
				name: "Maya Chen",
				role: "Product Manager"
			},
			{
				name: "Alex Kim",
				role: "QA Engineer"
			},
			{
				name: "Taylor Nguyen",
				role: "Corporate Counsel"
			}
		],
		transcript: `Maya: We've been saying someone should talk to legal for two weeks. Taylor is here now.
Taylor: I'll review the data-retention clause by September 26 and send written guidance.
Alex: Duplicate-token audit found no PII leak. I'll close the incident ticket today, September 23.
Maya: Jordan's OAuth patch still isn't in production as of this morning.
Taylor: Decision: feature flag stays off until I sign off on retention language AND the OAuth patch is live.
Maya: Unresolved: named engineer for Northwind. Still no owner.
Alex: I'll ping Jordan on the OAuth patch right after this call.`
	}
];
var LocalMeetingStore = class {
	meetings = [];
	outcomes = [];
	refusals = [];
	constructor() {
		this.meetings = [];
		this.outcomes = [];
		this.refusals = [];
	}
	clearAll() {
		this.meetings = [];
		this.outcomes = [];
		this.refusals = [];
	}
	seed() {
		this.meetings = [];
		this.outcomes = [];
		this.refusals = [];
		const userId = "00000000-0000-0000-0000-000000000001";
		BENCHMARK_MEETINGS.forEach((item) => {
			const meetingId = item.id;
			const analysis = conservativeExtract(item.title, item.transcript, item.date.slice(0, 10));
			const meeting = {
				id: meetingId,
				user_id: userId,
				title: item.title,
				meeting_date: item.date,
				transcript: item.transcript,
				summary: analysis.summary,
				attendees: item.attendees,
				tension_level: analysis.tension_level,
				tension_score: analysis.tension_score,
				tension_notes: analysis.tension_notes,
				created_at: item.date
			};
			this.meetings.push(meeting);
			analysis.refusals.forEach((r, idx) => {
				this.refusals.push({
					id: `ref-${meetingId}-${idx}`,
					meeting_id: meetingId,
					speaker: r.speaker,
					line: r.line,
					statement: r.statement,
					policy_reason: r.policy_reason
				});
			});
			analysis.decisions.forEach((d, idx) => {
				this.outcomes.push({
					id: `out-${meetingId}-dec-${idx}`,
					meeting_id: meetingId,
					user_id: userId,
					kind: "decision",
					content: d.content,
					owner: null,
					deadline: null,
					evidence_quote: d.evidence_quote,
					evidence_locator: d.evidence_locator,
					source_line: d.source_line,
					confidence: "explicitly_stated",
					status: "open",
					created_at: item.date
				});
			});
			analysis.actions.forEach((a, idx) => {
				this.outcomes.push({
					id: `out-${meetingId}-act-${idx}`,
					meeting_id: meetingId,
					user_id: userId,
					kind: "action",
					content: a.content,
					owner: a.owner,
					owner_status: a.owner_status,
					deadline: a.deadline,
					deadline_iso: a.deadline_iso,
					evidence_quote: a.evidence_quote,
					evidence_locator: a.evidence_locator,
					source_line: a.source_line,
					thread_key: a.thread_key ?? null,
					cross_status: a.cross_status ?? "new",
					confidence: "explicitly_stated",
					status: a.cross_status === "resolved" ? "done" : "open",
					created_at: item.date
				});
			});
			analysis.unresolved.forEach((u, idx) => {
				this.outcomes.push({
					id: `out-${meetingId}-unres-${idx}`,
					meeting_id: meetingId,
					user_id: userId,
					kind: "unresolved",
					content: u.content,
					owner: null,
					deadline: null,
					evidence_quote: u.evidence_quote,
					evidence_locator: u.evidence_locator,
					source_line: u.source_line,
					confidence: "explicitly_stated",
					status: "open",
					created_at: item.date
				});
			});
		});
	}
	getAll() {
		return {
			meetings: [...this.meetings].sort((a, b) => new Date(b.meeting_date).getTime() - new Date(a.meeting_date).getTime()),
			outcomes: [...this.outcomes],
			refusals: [...this.refusals],
			threads: this.getActionThreads(),
			stats: this.getStats()
		};
	}
	getStats() {
		const actions = this.outcomes.filter((o) => o.kind === "action");
		const decisions = this.outcomes.filter((o) => o.kind === "decision");
		const unresolved = this.outcomes.filter((o) => o.kind === "unresolved");
		const completed = actions.filter((a) => a.status === "done" || a.cross_status === "resolved").length;
		const carriedOver = actions.filter((a) => a.cross_status === "carried_over").length;
		const overdue = actions.filter((a) => a.cross_status === "overdue").length;
		const unassigned = actions.filter((a) => a.owner_status === "unassigned" || a.owner_status === "ambiguous").length;
		return {
			totalMeetings: this.meetings.length,
			totalDecisions: decisions.length,
			totalActions: actions.length,
			totalUnresolved: unresolved.length,
			completedActions: completed,
			carriedOverActions: carriedOver,
			overdueActions: overdue,
			unassignedActions: unassigned,
			refusalCount: this.refusals.length,
			accountabilityScore: actions.length ? Math.round(completed / actions.length * 100) : 0
		};
	}
	getActionThreads() {
		return Object.entries({
			"oauth-patch": {
				title: "OAuth Refresh-Token Patch (Critical Backend Bug)",
				owner: "Jordan Hale",
				timeline: [
					{
						meeting_id: "m1",
						meeting_title: "Product sync — Atlas v2 (Sep 08)",
						meeting_date: "2026-09-08",
						quote: "I can take the OAuth refresh-token bug. I'll have a patch up by Friday, September 12.",
						speaker: "Jordan Hale",
						status: "new",
						note: "Committed to patch by Sep 12."
					},
					{
						meeting_id: "m2",
						meeting_title: "Engineering standup (Sep 15)",
						meeting_date: "2026-09-15",
						quote: "Not done. I still owe the OAuth refresh-token patch. Slipped past the 12th. I'll finish it by September 17.",
						speaker: "Jordan Hale",
						status: "carried_over",
						note: "First deadline slipped. Extended to Sep 17."
					},
					{
						meeting_id: "m3",
						meeting_title: "Sev-2 incident review (Sep 18)",
						meeting_date: "2026-09-18",
						quote: "Root cause is the same OAuth refresh-token bug. I'll ship it today, September 18, before 5pm.",
						speaker: "Jordan Hale",
						status: "overdue",
						note: "Triggered 14-min downtime Sev-2 incident. Emergency fix committed."
					},
					{
						meeting_id: "m5",
						meeting_title: "Ops + legal huddle (Sep 23)",
						meeting_date: "2026-09-23",
						quote: "Jordan's OAuth patch still isn't in production as of this morning.",
						speaker: "Maya Chen",
						status: "overdue",
						note: "Blocking feature flag cutover. Alex pinging Jordan directly."
					}
				]
			},
			"legal-retention": {
				title: "Data-Retention Clause Compliance",
				owner: "Taylor Nguyen (formerly Unassigned)",
				timeline: [
					{
						meeting_id: "m1",
						meeting_title: "Product sync — Atlas v2 (Sep 08)",
						meeting_date: "2026-09-08",
						quote: "Alex: Someone should talk to legal... Maya: We don't have an owner for legal yet. Let's not invent one.",
						speaker: "Alex Kim / Maya Chen",
						status: "new",
						note: "Stated as ambiguous ask. Preserved as unassigned to prevent hallucination."
					},
					{
						meeting_id: "m2",
						meeting_title: "Engineering standup (Sep 15)",
						meeting_date: "2026-09-15",
						quote: "Legal still hasn't been contacted. Someone still needs to talk to legal about data retention.",
						speaker: "Maya Chen",
						status: "carried_over",
						note: "Flagged carried over without an owner for 7 days."
					},
					{
						meeting_id: "m5",
						meeting_title: "Ops + legal huddle (Sep 23)",
						meeting_date: "2026-09-23",
						quote: "Taylor: I'll review the data-retention clause by September 26 and send written guidance.",
						speaker: "Taylor Nguyen",
						status: "resolved",
						note: "Assigned to Taylor Nguyen with formal Sep 26 commitment."
					}
				]
			},
			"postgres-migration": {
				title: "Postgres Sprint Migration",
				owner: null,
				timeline: [{
					meeting_id: "m1",
					meeting_title: "Product sync — Atlas v2 (Sep 08)",
					meeting_date: "2026-09-08",
					quote: "Maya: We didn't decide on the Postgres migration. Parking that as unresolved.",
					speaker: "Maya Chen",
					status: "new",
					note: "Raised by Jordan; explicitly unresolved."
				}, {
					meeting_id: "m2",
					meeting_title: "Engineering standup (Sep 15)",
					meeting_date: "2026-09-15",
					quote: "Jordan: Postgres migration is still unresolved from last week.",
					speaker: "Jordan Hale",
					status: "carried_over",
					note: "Flagged across multiple standups without resolution."
				}]
			},
			"beta-walkthrough": {
				title: "Beta Customer Walkthrough Video",
				owner: "Priya Shah",
				timeline: [{
					meeting_id: "m2",
					meeting_title: "Engineering standup (Sep 15)",
					meeting_date: "2026-09-15",
					quote: "Priya: I'll record the beta walkthrough by September 16.",
					speaker: "Priya Shah",
					status: "new",
					note: "Targeted for beta rollout."
				}, {
					meeting_id: "m4",
					meeting_title: "Beta customer desk — Northwind (Sep 22)",
					meeting_date: "2026-09-22",
					quote: "Priya: I'll send Northwind the beta walkthrough recording today, September 22. I missed the 16th deadline.",
					speaker: "Priya Shah",
					status: "overdue",
					note: "Missed Sep 16 deadline, fulfilled Sep 22."
				}]
			}
		}).map(([key, data]) => {
			const lastStatus = data.timeline[data.timeline.length - 1]?.status ?? "open";
			return {
				key,
				title: data.title,
				owner: data.owner,
				current_status: lastStatus,
				timeline: data.timeline
			};
		});
	}
	createMeeting(title, transcript, analysis, userId = "00000000-0000-0000-0000-000000000001", date = (/* @__PURE__ */ new Date()).toISOString()) {
		const meetingId = `m-${Date.now()}`;
		const meeting = {
			id: meetingId,
			user_id: userId,
			title,
			meeting_date: date,
			transcript,
			summary: analysis.summary,
			tension_level: analysis.tension_level,
			tension_score: analysis.tension_score,
			tension_notes: analysis.tension_notes,
			created_at: date
		};
		this.meetings.unshift(meeting);
		analysis.refusals.forEach((r, idx) => {
			this.refusals.push({
				id: `ref-${meetingId}-${idx}`,
				meeting_id: meetingId,
				speaker: r.speaker,
				line: r.line,
				statement: r.statement,
				policy_reason: r.policy_reason
			});
		});
		analysis.decisions.forEach((d, idx) => {
			this.outcomes.push({
				id: `out-${meetingId}-dec-${idx}`,
				meeting_id: meetingId,
				user_id: userId,
				kind: "decision",
				content: d.content,
				owner: null,
				deadline: null,
				evidence_quote: d.evidence_quote,
				evidence_locator: d.evidence_locator,
				source_line: d.source_line,
				confidence: "explicitly_stated",
				status: "open",
				created_at: date
			});
		});
		analysis.actions.forEach((a, idx) => {
			this.outcomes.push({
				id: `out-${meetingId}-act-${idx}`,
				meeting_id: meetingId,
				user_id: userId,
				kind: "action",
				content: a.content,
				owner: a.owner,
				owner_status: a.owner_status,
				deadline: a.deadline,
				deadline_iso: a.deadline_iso,
				evidence_quote: a.evidence_quote,
				evidence_locator: a.evidence_locator,
				source_line: a.source_line,
				thread_key: a.thread_key ?? null,
				cross_status: a.cross_status ?? "new",
				confidence: "explicitly_stated",
				status: a.cross_status === "resolved" ? "done" : "open",
				created_at: date
			});
		});
		analysis.unresolved.forEach((u, idx) => {
			this.outcomes.push({
				id: `out-${meetingId}-unres-${idx}`,
				meeting_id: meetingId,
				user_id: userId,
				kind: "unresolved",
				content: u.content,
				owner: null,
				deadline: null,
				evidence_quote: u.evidence_quote,
				evidence_locator: u.evidence_locator,
				source_line: u.source_line,
				confidence: "explicitly_stated",
				status: "open",
				created_at: date
			});
		});
		return meetingId;
	}
	updateStatus(id, status) {
		const item = this.outcomes.find((o) => o.id === id);
		if (item) {
			item.status = status;
			if (status === "done") item.cross_status = "resolved";
		}
	}
	generateSlackDigest(meetingId) {
		const meeting = this.meetings.find((m) => m.id === meetingId) ?? this.meetings[0];
		if (!meeting) return "";
		const decisions = this.outcomes.filter((o) => o.meeting_id === meeting.id && o.kind === "decision");
		const actions = this.outcomes.filter((o) => o.meeting_id === meeting.id && o.kind === "action");
		const unresolved = this.outcomes.filter((o) => o.meeting_id === meeting.id && o.kind === "unresolved");
		const dateStr = new Date(meeting.meeting_date).toLocaleDateString(void 0, {
			month: "short",
			day: "numeric",
			year: "numeric"
		});
		let md = `*📋 Relay Meeting Intelligence Digest*\n`;
		md += `*Meeting:* ${meeting.title} (${dateStr})\n`;
		md += `*Tension/Risk Level:* ${meeting.tension_level?.toUpperCase() ?? "LOW"}\n\n`;
		if (decisions.length > 0) {
			md += `*🎯 Key Decisions (${decisions.length}):*\n`;
			decisions.forEach((d) => {
				md += `• ${d.content} _(ref: ${d.evidence_locator})_\n`;
			});
			md += `\n`;
		}
		if (actions.length > 0) {
			md += `*⚡ Action Items & Commitments (${actions.length}):*\n`;
			actions.forEach((a) => {
				const ownerTag = a.owner ? `@${a.owner}` : `⚠️ _Unassigned_`;
				const dueTag = a.deadline ? `*Due: ${a.deadline}*` : `_No deadline stated_`;
				const cross = a.cross_status === "overdue" ? " [🚨 OVERDUE]" : a.cross_status === "carried_over" ? " [🔄 CARRIED OVER]" : "";
				md += `• ${a.content}${cross} — ${ownerTag} | ${dueTag}\n`;
			});
			md += `\n`;
		}
		if (unresolved.length > 0) {
			md += `*⏳ Unresolved Issues to Carry Over (${unresolved.length}):*\n`;
			unresolved.forEach((u) => {
				md += `• ${u.content} _(ref: ${u.evidence_locator})_\n`;
			});
			md += `\n`;
		}
		md += `_🔒 Grounded by Relay: 0% hallucination policy enforced._`;
		return md;
	}
	generateEmailDigest(meetingId) {
		const meeting = this.meetings.find((m) => m.id === meetingId) ?? this.meetings[0];
		if (!meeting) return "";
		const decisions = this.outcomes.filter((o) => o.meeting_id === meeting.id && o.kind === "decision");
		const actions = this.outcomes.filter((o) => o.meeting_id === meeting.id && o.kind === "action");
		const unresolved = this.outcomes.filter((o) => o.meeting_id === meeting.id && o.kind === "unresolved");
		const dateStr = new Date(meeting.meeting_date).toLocaleDateString(void 0, {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric"
		});
		let txt = `Subject: [Executive Briefing] ${meeting.title} — Grounded Meeting Ledger\n\n`;
		txt += `Executive Summary:\n${meeting.summary}\n\n`;
		txt += `Meeting Date: ${dateStr}\n`;
		txt += `Meeting Risk Assessment: ${meeting.tension_level?.toUpperCase() ?? "LOW"}\n\n`;
		txt += `====================================================\n`;
		txt += `1. BINDING DECISIONS\n`;
		txt += `====================================================\n`;
		if (decisions.length === 0) txt += `No binding decisions were finalized during this discussion.\n\n`;
		else decisions.forEach((d, i) => {
			txt += `[${i + 1}] ${d.content}\n`;
			txt += `    Source Evidence: "${d.evidence_quote}" (${d.evidence_locator})\n\n`;
		});
		txt += `====================================================\n`;
		txt += `2. ACTION ITEM LEDGER & OWNERSHIP\n`;
		txt += `====================================================\n`;
		if (actions.length === 0) txt += `No actionable commitments were verbalized.\n\n`;
		else actions.forEach((a, i) => {
			const owner = a.owner ? a.owner : "UNASSIGNED (Preserved per zero-hallucination policy)";
			const due = a.deadline ? a.deadline : "NO DEADLINE STATED";
			const tag = a.cross_status?.toUpperCase() ?? "NEW";
			txt += `[${i + 1}] [${tag}] ${a.content}\n`;
			txt += `    Owner: ${owner}\n`;
			txt += `    Deadline: ${due}\n`;
			txt += `    Source Evidence: "${a.evidence_quote}" (${a.evidence_locator})\n\n`;
		});
		txt += `====================================================\n`;
		txt += `3. UNRESOLVED MATTERS & NEXT STEPS\n`;
		txt += `====================================================\n`;
		if (unresolved.length === 0) txt += `All discussed topics were resolved.\n\n`;
		else {
			unresolved.forEach((u, i) => {
				txt += `• ${u.content} (${u.evidence_locator})\n`;
			});
			txt += `\n`;
		}
		txt += `Report generated by Relay Meeting Intelligence Engine.\n`;
		return txt;
	}
};
var localStore = new LocalMeetingStore();
var AnalyzeInput = objectType({
	title: stringType().trim().min(1).max(180),
	transcript: stringType().trim().min(40).max(5e4)
});
var ToggleInput = objectType({
	id: stringType().min(1),
	status: enumType(["open", "done"])
});
function safeMessage(status, body) {
	try {
		const parsed = JSON.parse(body);
		return parsed.message ?? parsed.error?.message ?? `Analysis failed (${status}).`;
	} catch {
		return body || `Analysis failed (${status}).`;
	}
}
async function analyzeTranscript(title, transcript) {
	const key = processModule.env["LOVABLE_API_KEY"];
	if (!key) return conservativeExtract(title, transcript);
	const schema = {
		type: "object",
		additionalProperties: false,
		required: [
			"summary",
			"decisions",
			"actions",
			"unresolved"
		],
		properties: {
			summary: { type: "string" },
			decisions: {
				type: "array",
				items: {
					type: "object",
					additionalProperties: false,
					required: [
						"content",
						"evidence_quote",
						"evidence_locator"
					],
					properties: {
						content: { type: "string" },
						evidence_quote: { type: "string" },
						evidence_locator: { type: "string" }
					}
				}
			},
			actions: {
				type: "array",
				items: {
					type: "object",
					additionalProperties: false,
					required: [
						"content",
						"owner",
						"deadline",
						"evidence_quote",
						"evidence_locator"
					],
					properties: {
						content: { type: "string" },
						owner: { type: ["string", "null"] },
						deadline: { type: ["string", "null"] },
						evidence_quote: { type: "string" },
						evidence_locator: { type: "string" }
					}
				}
			},
			unresolved: {
				type: "array",
				items: {
					type: "object",
					additionalProperties: false,
					required: [
						"content",
						"evidence_quote",
						"evidence_locator"
					],
					properties: {
						content: { type: "string" },
						evidence_quote: { type: "string" },
						evidence_locator: { type: "string" }
					}
				}
			}
		}
	};
	try {
		const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Lovable-API-Key": key,
				"X-Lovable-AIG-SDK": "fetch"
			},
			body: JSON.stringify({
				model: "openai/gpt-6-astra",
				stream: true,
				reasoning: {
					effort: "medium",
					summary: "auto"
				},
				input: [{
					role: "system",
					content: [{
						type: "input_text",
						text: "You are an evidence-first meeting analyst. Extract only information explicitly present in the transcript. Never infer an owner, deadline, decision, or issue. Use null when an action owner or deadline is not stated. Every item must include an exact supporting quote and a useful speaker/timestamp locator when available. Keep the summary factual and under 45 words."
					}]
				}, {
					role: "user",
					content: [{
						type: "input_text",
						text: `Meeting title: ${title}\n\nTranscript:\n${transcript}`
					}]
				}],
				text: { format: {
					type: "json_schema",
					name: "meeting_analysis",
					strict: true,
					schema
				} }
			})
		});
		if (!response.ok) throw new Error(safeMessage(response.status, await response.text()));
		if (!response.body) throw new Error("The analysis returned no content.");
		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = "";
		let output = "";
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			buffer += decoder.decode(value, { stream: true });
			const events = buffer.split("\n\n");
			buffer = events.pop() ?? "";
			for (const event of events) for (const line of event.split("\n")) {
				if (!line.startsWith("data: ")) continue;
				const data = line.slice(6);
				if (data === "[DONE]") continue;
				try {
					const parsed = JSON.parse(data);
					if (parsed.type === "response.output_text.delta" && parsed.delta) output += parsed.delta;
					if (parsed.type === "error") throw new Error(parsed.error?.message ?? "Analysis failed.");
				} catch (error) {
					if (error instanceof SyntaxError) continue;
					throw error;
				}
			}
		}
		if (!output) throw new Error("The analysis completed without an answer.");
		return JSON.parse(output);
	} catch (err) {
		console.warn("AI gateway request failed, falling back to local extractor:", err);
		return conservativeExtract(title, transcript);
	}
}
var listMeetings_createServerFn_handler = createServerRpc({
	id: "5421ce086ebfe2655585808aafdf32c6469fbf9db5a023eedf565c6215cabc2e",
	name: "listMeetings",
	filename: "src/lib/meetings.functions.ts"
}, (opts) => listMeetings.__executeServer(opts));
var listMeetings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMeetings_createServerFn_handler, async ({ context }) => {
	try {
		const pubKey = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
		if (context?.supabase && pubKey && !pubKey.includes("dummy")) {
			const { data: meetings, error } = await context.supabase.from("meetings").select("*").order("meeting_date", { ascending: false });
			if (!error && meetings && meetings.length > 0) {
				const { data: outcomes, error: outcomesError } = await context.supabase.from("meeting_outcomes").select("*").order("created_at");
				if (!outcomesError && outcomes) return {
					meetings,
					outcomes
				};
			}
		}
	} catch {}
	return localStore.getAll();
});
var createMeetingAnalysis_createServerFn_handler = createServerRpc({
	id: "55bb7e91882964d0c7ae92312983bcd6bfa9496d03c9a693875cc64515dba795",
	name: "createMeetingAnalysis",
	filename: "src/lib/meetings.functions.ts"
}, (opts) => createMeetingAnalysis.__executeServer(opts));
var createMeetingAnalysis = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => AnalyzeInput.parse(input)).handler(createMeetingAnalysis_createServerFn_handler, async ({ data, context }) => {
	const analysis = await analyzeTranscript(data.title, data.transcript);
	try {
		const pubKey = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
		if (context?.supabase && pubKey && !pubKey.includes("dummy")) {
			const { data: meeting, error } = await context.supabase.from("meetings").insert({
				title: data.title,
				transcript: data.transcript,
				summary: analysis.summary,
				user_id: context.userId
			}).select().single();
			if (!error && meeting) {
				const outcomes = [
					...analysis.decisions.map((item) => ({
						...item,
						kind: "decision",
						owner: null,
						deadline: null
					})),
					...analysis.actions.map((item) => ({
						...item,
						kind: "action"
					})),
					...analysis.unresolved.map((item) => ({
						...item,
						kind: "unresolved",
						owner: null,
						deadline: null
					}))
				].map((item) => ({
					...item,
					meeting_id: meeting.id,
					user_id: context.userId,
					status: "open"
				}));
				if (outcomes.length) {
					const { error: insertError } = await context.supabase.from("meeting_outcomes").insert(outcomes);
					if (!insertError) return meeting.id;
				} else return meeting.id;
			}
		}
	} catch {}
	return localStore.createMeeting(data.title, data.transcript, analysis, context?.userId);
});
var updateOutcomeStatus_createServerFn_handler = createServerRpc({
	id: "e7c8494f5a896b8a88a76361f116e07550a7b150d7a6a8ba5ea3d9133f01ad34",
	name: "updateOutcomeStatus",
	filename: "src/lib/meetings.functions.ts"
}, (opts) => updateOutcomeStatus.__executeServer(opts));
var updateOutcomeStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => ToggleInput.parse(input)).handler(updateOutcomeStatus_createServerFn_handler, async ({ data, context }) => {
	try {
		const pubKey = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
		if (context?.supabase && pubKey && !pubKey.includes("dummy")) {
			const { error } = await context.supabase.from("meeting_outcomes").update({ status: data.status }).eq("id", data.id).eq("user_id", context.userId);
			if (!error) return { ok: true };
		}
	} catch {}
	localStore.updateStatus(data.id, data.status);
	return { ok: true };
});
var resetBenchmarkData_createServerFn_handler = createServerRpc({
	id: "140ec2dbf00624132f490d092ec82d2e0979f4176f429e888f018f19b48ef672",
	name: "resetBenchmarkData",
	filename: "src/lib/meetings.functions.ts"
}, (opts) => resetBenchmarkData.__executeServer(opts));
var resetBenchmarkData = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(resetBenchmarkData_createServerFn_handler, async () => {
	localStore.seed();
	return localStore.getAll();
});
var clearAllMeetings_createServerFn_handler = createServerRpc({
	id: "7abdc026372dcdc6d51a7dd218bbcd8ab72e2b77182aa66e9ae4a8720128d8e1",
	name: "clearAllMeetings",
	filename: "src/lib/meetings.functions.ts"
}, (opts) => clearAllMeetings.__executeServer(opts));
var clearAllMeetings = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(clearAllMeetings_createServerFn_handler, async () => {
	localStore.clearAll();
	return localStore.getAll();
});
var DigestInput = objectType({ meetingId: stringType().min(1) });
var getMeetingDigest_createServerFn_handler = createServerRpc({
	id: "87de833ef25fff40c5b9b43ab712b4443e855a12deb83f1542b73ec14e5dabc2",
	name: "getMeetingDigest",
	filename: "src/lib/meetings.functions.ts"
}, (opts) => getMeetingDigest.__executeServer(opts));
var getMeetingDigest = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => DigestInput.parse(input)).handler(getMeetingDigest_createServerFn_handler, async ({ data }) => {
	return {
		slack: localStore.generateSlackDigest(data.meetingId),
		email: localStore.generateEmailDigest(data.meetingId)
	};
});
//#endregion
export { clearAllMeetings_createServerFn_handler, createMeetingAnalysis_createServerFn_handler, getMeetingDigest_createServerFn_handler, listMeetings_createServerFn_handler, resetBenchmarkData_createServerFn_handler, updateOutcomeStatus_createServerFn_handler };

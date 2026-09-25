//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-N0J-3cJ_.js
var manifest = {
	"140ec2dbf00624132f490d092ec82d2e0979f4176f429e888f018f19b48ef672": {
		functionName: "resetBenchmarkData_createServerFn_handler",
		importer: () => import("./_ssr/meetings.functions-CEGYOiEU.mjs")
	},
	"5421ce086ebfe2655585808aafdf32c6469fbf9db5a023eedf565c6215cabc2e": {
		functionName: "listMeetings_createServerFn_handler",
		importer: () => import("./_ssr/meetings.functions-CEGYOiEU.mjs")
	},
	"55bb7e91882964d0c7ae92312983bcd6bfa9496d03c9a693875cc64515dba795": {
		functionName: "createMeetingAnalysis_createServerFn_handler",
		importer: () => import("./_ssr/meetings.functions-CEGYOiEU.mjs")
	},
	"7abdc026372dcdc6d51a7dd218bbcd8ab72e2b77182aa66e9ae4a8720128d8e1": {
		functionName: "clearAllMeetings_createServerFn_handler",
		importer: () => import("./_ssr/meetings.functions-CEGYOiEU.mjs")
	},
	"87de833ef25fff40c5b9b43ab712b4443e855a12deb83f1542b73ec14e5dabc2": {
		functionName: "getMeetingDigest_createServerFn_handler",
		importer: () => import("./_ssr/meetings.functions-CEGYOiEU.mjs")
	},
	"e7c8494f5a896b8a88a76361f116e07550a7b150d7a6a8ba5ea3d9133f01ad34": {
		functionName: "updateOutcomeStatus_createServerFn_handler",
		importer: () => import("./_ssr/meetings.functions-CEGYOiEU.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };

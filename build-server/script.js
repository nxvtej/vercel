/** @format */
// with exec i can execute any file
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
async function init() {
	console.log("Executing script.js");
	const outDirPath = path.join(__dirname, "ouput");
	const p = exec(`cd ${outDirPath} && npm install && npm run build`);
	// these are streams, like packages installing that stream so toString
	p.stdout.on("data", (data) => {
		console.log(data.toString());
	});
	// stream for errors
	p.stderr.on("data", (data) => {
		console.error(data.toString());
	});
	// build complete so now dist folder is readu
	p.on("close", () => {
		console.log("Build Close");
		const distFolderPath = path.join(__dirname, "ouput", "dist");
		// jitne bhi folder k ander folder hai sab la k dedega
		const distFolderContent = fs.readdirSync(distFolderPath, {
			recursive: true,
		});
		// making sure we upload file path to S3 cause we dont give folder path to it
		for (const filePath of distFolderContent) {
			if (fs.lstatSync(filePath).isDirectory()) continue;
		}
	});
}

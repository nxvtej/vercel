/** @format */
// with exec i can execute any file
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// get aws putobject sdk with credentials

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3"');
const { S3Client } = require("@aws-sdk/client-s3");
const S3Client = new S3Client({
	region: "",
	credential: {
		accessKeyId: "",
		secretAccessKey: "",
	},
});

// assume have slug/projectID
const PROJECT_ID = process.env.PROJECT_ID;

const mime = require("mime");
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
	p.on("close", async () => {
		console.log("Build Close");
		const distFolderPath = path.join(__dirname, "ouput", "dist");
		// jitne bhi folder k ander folder hai sab la k dedega
		const distFolderContent = fs.readdirSync(distFolderPath, {
			recursive: true,
		});
		// making sure we upload file path to S3 cause we dont give folder path to it
		for (const filePath of distFolderContent) {
			if (fs.lstatSync(filePath).isDirectory()) continue;

			// s3 k yha p dal dege sab with project id taki use domain se access kr pau
			const command = new PutObjectCommand({
				Bucket: "",
				Key: `__outputs/${PROJECT_ID}/${filePath}`,
				Body: fs.createReadStream(filePath),
				// key concept we dont know what type of use content can
				// be any code so evaluate dynamically htmml, css, js
				ContentType: mime.lookup(filePath),
			});

			await S3Client.send(command);
		}

		console.log("Done...");
	});
}

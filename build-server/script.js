/** @format */
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// get aws putobject sdk with credentials

// esme bhi error kr diya extra comman bhenchod, kitni baar build fail kr di
// dhiyan dele bkl

// if (rootaccess && secretacess) {
// } else {
// 	throw new Error("environmnet vairbale not working");
// }

const s3Client = new S3Client({
	region: "ap-southeast-2",
	credentials: {
		// Changed 'credential' to 'credentials'
		accessKeyId: " ",
		secretAccessKey: " ",
	},
});

// assume have slug/projectID
const PROJECT_ID = process.env.PROJECT_ID;
// const PROJECT_ID = "navi-testing";
const mime = require("mime-types");

async function init() {
	console.log("Executing script.js");
	const outDirPath = path.join(__dirname, "output"); // Fixed typo: 'ouput' to 'output'
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
		const distFolderPath = path.join(__dirname, "output", "dist"); // Fixed typo
		// jitne bhi folder k ander folder hai sab la k dedega
		const distFolderContent = fs.readdirSync(distFolderPath, {
			recursive: true,
		});
		// making sure we upload file path to S3 cause we dont give folder path to it
		//-***********************
		// error here in filepath, hme file milege ifr path calculate krnahai
		for (const file of distFolderContent) {
			const filePath = path.join(distFolderPath, file);
			if (fs.lstatSync(filePath).isDirectory()) continue;

			console.log("uploading", filePath);
			// s3 k yha p dal dege sab with project id taki use domain se access kr pau
			const command = new PutObjectCommand({
				Bucket: "vercel-100xnavi",
				Key: `__outputs/${PROJECT_ID}/${path.basename(filePath)}`, // Use basename to avoid directory structure
				Body: fs.createReadStream(filePath),
				// key concept we dont know what type of use content can
				// be any code so evaluate dynamically htmml, css, js
				ContentType: mime.lookup(filePath) || "application/octet-stream", // Fallback if mime type not found
			});

			// console.log("AWS Access Key:", process.env.AWSROOTACCESSKEY);
			// console.log("AWS Secret Key:", process.env.AWSROOTSECRETACCESSKEY);

			await s3Client.send(command);
			console.log("uploaded", filePath);
		}

		console.log("Done...");
	});
}

init(); // Fixed typo: 'inti()' to 'init()'

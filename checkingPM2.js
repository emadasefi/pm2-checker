const { exec } = require('child_process');
const { spawn } = require('child_process');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './checking.log');

//////////////////////////////////////////////////////////////////////////////////////////////////////
/* /////////////////////////////////////// Welcome Message //////////////////////////////////////// */
const asciii = `
   ___  __  ______          _______           __          
  / _ \/  |/  /_  |  ____  / ___/ /  ___ ____/ /_____ ____
 / ___/ /|_/ / __/  /___/ / /__/ _ \/ -_) __/  '_/ -_) __/
/_/  /_/  /_/____/        \___/_//_/\__/\__/_/\_\\__/_/   
                                                          
  - PM2 is a ProcessManager For The JavaScript Runtime Node.js.
  - This Script Checks The PM2 Status To See Which APPs Have Encountered Problems.
  - v1.1 / Emad Asefi  / @Emadasefi / Emad.Asefi@Gmail.com
_________________________________________________________________________
`;
process.stdout.write(asciii);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/* ////////////////////////////////// createWriteStream Ghecking.Log /////////////////////////////////// */
const logStream = fs.createWriteStream('./checking.log', {    flags: 'a'	});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/* //////////////////////////////////////// getPM2ProcessOutput //////////////////////////////////////// */
// Function to execute the PM2 command and process the output
const getPM2ProcessOutput = () => {
    exec("pm2 ls | grep -e 'online' -e 'stop' | awk '{print $4 \" \" $18}'", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }

        // Get current date in the required format
        const currentDate = moment().format('YYYY-MM-DD_HH-mm-ss');

        // PM2 process the output null and make fake results
        if (!stdout) {
            stdout = 'null nonExistent'
        }

        // Process the output
        const lines = stdout.trim().split('\n');

        const results = lines.map(line => {
            const [appName, status] = line.split(' ');
            return {
                id: Buffer.from(Math.random().toString()).toString("base64").substring(10, 20),
                date: moment().format('YYYY-MM-DD_HH-mm-ss'),
                appName: appName,
                status: status,
                sms: 'false' // Placeholder for SMS field
            };
        });

        // Function to remove duplicates and log results
        const uniqueResults = results.filter((result, index, self) =>
            index === self.findIndex((r) => (
                //r.id === result.id && 
                r.date === result.date &&
                r.appName === result.appName &&
                r.status === result.status &&
                r.sms === result.sms
            ))
        );

        // Display formatted output
        let rslt = []
        uniqueResults.forEach(result => {
            if (currentDate == result.date && (result.status === 'stopped' || result.status === 'nonExistent')) {
                //console.log(`${result.id} | ${result.date} | ${result.appName} | ${result.status} | sms:${result.sms}`);
                rslt.push(`${result.id} | ${result.date} | ${result.appName} | ${result.status} | sms:${result.sms}`)
            }
        });

        if (rslt.length > 0) {
            // Write pm2 output to the file
            fs.writeFile('./checking.log', rslt.join('\n') + '\n', { flag: 'a' }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                //console.log('Data appended to checking.log successfully');
            });
        }
        updateCheckingFile();
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
/* ////////////////////////////////////// updateCheckingFile /////////////////////////////////////// */
// Function to execute the Update checking.log LOG File
async function updateCheckingFile() {
    const filePath2 = './checking.log';
    fs.readFile(filePath2, 'utf8', (err, dataa) => {
        if (err) {
            console.error('Error reading pm2log:', err);
            return;
        }

		let linesss = dataa.split('\n').filter(line => line.trim() !== ""); // Splitting the String and Filtering Empty Lines
		const targetDate = moment().format('YYYY-MM-DD_HH'); // Get current hour in format YYYY-MM-DD_HH
		const currentHour = moment().hour(); // Get the current hour
		const isNightModeActive = false; // Set this based on your requirement
		const processedApps = new Set(); // To track processed app names
		let updatedLines = false; // Write file Flag
		
		// Function to determine if SMS field should be updated
		const shouldUpdateSmsField = (isNightModeActive, currentHour) => {
			return isNightModeActive ? (currentHour < 0 || currentHour >= 6) : true;
		};
		
		// Process each line
		linesss = linesss.map(line => {
			const [id, timestamp, appName, status, smsField] = line.split('|').map(item => item.trim());
		
			// Check if timestamp is in the current hour
			if (timestamp.startsWith(targetDate)) {
				// Check if appName has already been processed this hour
				if (!processedApps.has(appName)) {
					const updateSms = shouldUpdateSmsField(isNightModeActive, currentHour);
					const newSmsField = updateSms ? 'sms:true' : smsField; // Update to 'sms:true' or keep original value
		
					processedApps.add(appName); // Mark this app as processed
					updatedLines = true; // Indicate that updates have occurred
					return `${id} | ${timestamp} | ${appName} | ${status} | ${newSmsField}`; // Return updated line
				}
			}
		
			// Return original line if no updates are made
			return line;
		});
		

        // Write to file only if there's at least one 'sms:true'
        if (updatedLines) {
            writeUpdatedToFile(linesss);
            
        }

        // Append content to the file
        function writeUpdatedToFile(linesss) {
            fs.writeFile(filePath2, '\n' + linesss.join('\n') + '\n', (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('File updated successfully!');
                    notifyWithFunction(processedApps);
                }

            });
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
/* ///////////////////////////////////// notifyWithFunction /////////////////////////////////////// */
// Execution of a function that notifies the system manager of processedApps
async function notifyWithFunction(processedApps) { 
  console.log("notifyWithFunction : ", processedApps);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
/* ////////////////////////////////////// Call the function /////////////////////////////////////// */
getPM2ProcessOutput();
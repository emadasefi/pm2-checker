PM2 Checker (PM2 Status Monitor and SMS Notification Updater)
====================================
This Node.js script provides automated monitoring of applications managed by PM2, a production process manager for Node.js. It checks the status of each application, identifies those that are in a 'stopped' or 'nonExistent' state, and records these events in a log file (checking.log).

The script is designed to facilitate SMS notifications when applications encounter issues. It updates the checking.log file, adding a flag to indicate that an SMS notification should be sent. A key feature is the ability to control SMS notifications based on the time of day, allowing you to suppress notifications during off-hours (e.g., at night) if desired. This is managed through a configurable isNightModeActive setting.

The script is designed to run periodically (e.g., using cron or a similar task scheduler) to provide continuous monitoring and timely alerts.
<br><br>


## 🌟 Features
<li><strong>PM2 Process Monitoring:</strong> Retrieves the status of all applications managed by PM2.</li>
<li><strong>Status Filtering:</strong> Identifies applications that are in a 'stopped' or 'nonExistent' state, indicating potential issues.</li>
<li><strong>Log File Recording:</strong> Records the status of problematic applications in a checking.log file.</li>
<li><strong> Unique Log Entry Generation:</strong> Creates a unique ID for each log entry.</li>
<li><strong>Duplicate Entry Prevention:</strong> Prevents duplicate log entries for the same application status.</li>
<li><strong>SMS Notification Trigger:</strong> Updates the checking.log file to indicate when an SMS notification should be sent for a specific application issue.</li>
<li><strong>Time-Based SMS Control:</strong> Allows configuration to suppress SMS notifications during specified hours (e.g., for "night mode").</li>
<li><strong>Configurable Night Mode:</strong> isNightModeActive variable allows to enable or disable night mode.</li>
<li><strong>Modular Design:</strong> The code is structured into functions (getPM2ProcessOutput, updateCheckingFile, notifyWithFunction) for readability and maintainability.</li>
<li><strong>Error Handling:</strong> Includes basic error handling for file system operations and command execution.</li>
<li><strong>Extensible Notification System:</strong> The notifyWithFunction is designed to be easily extended to integrate with your preferred SMS or notification service.</li>
<br><br>


## 💡 Guide on How to Use This Script
### Node.js Packages Used
<li><strong>child_process:</strong> Included with Node.js, so no installation is necessary. Used for executing shell commands (e.g., pm2 ls).</li>
<li><strong>moment:</strong> For date and time formatting.</li>
<li><strong>fs:</strong> Included with Node.js, so no installation is necessary. Used for file system operations (reading and writing to the log file).</li>
<li><strong>path:</strong> Included with Node.js, so no installation is necessary. Used for constructing file paths.</li>

### How to Install Packages
<li><strong>1. Install Node.js and npm:</strong> Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from the official Node.js website (https://nodejs.org/).</li>
<li><strong>2. Navigate to the Script Directory:</strong> Open a terminal or command prompt and navigate to the directory where you have saved the script.</li>
<li><strong>3. Install the Required Package:</strong> Run the following command to install the moment package:</li>
<code>npm install fs path moment </code>

### How to Run the Script Every Minute via Crontab
<li><strong>1. Open Crontab:</strong> Open the crontab editor by running the following command in your terminal:</li>
<code>crontab -e</code><br>
This will open the crontab file in a text editor. If this is the first time you're using crontab, it might ask you to choose an editor.
<li><strong>2. Add a Cron Entry:</strong> Add the following line to the crontab file to run the script every minute:</li>
<code>* * * * * /usr/bin/node /path/to/your/script.js >> /path/to/your/script.log 2>&1</code><br>
<li>Replace /usr/bin/node with the actual path to your Node.js executable. You can find this by running which node in your terminal.</li>
<li>Replace /path/to/your/script.js with the full path to your script file.</li>
<li>Replace /path/to/your/script.log with the desired path to a log file. This will capture the output of the script. The 2>&1 redirects standard error to the same log file.</li>


<li><strong>3. Save and Close:</strong> Save the crontab file and close the editor. The cron daemon will automatically pick up the changes.</li>
<br><br>

▚   A Node.js script that monitors the status of PM2-managed applications, logs stopped or non-existent processes, and updates a log file to trigger SMS notifications based on configurable time-of-day rules.
<br>


## — Feedback ❤️—
Thank you for choosing the PM2 Checker! I hope it meets your encryption needs effectively.<br>
Please leave a comment if you have any comments, suggestions or problems.

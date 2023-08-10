const express = require('express');
const os = require('os');
const osUtils = require('os-utils');
const path = require('path');
app.use(express.static('public'));

const interfaces = os.networkInterfaces();
const hostIP = interfaces.eth0[0].address;

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const osName = os.type();
  const hostName = os.hostname();
  
  osUtils.cpuUsage(function(cpuUsage) {
    const currentLoad = (cpuUsage * 100).toFixed(2);
    
    const responseText = `\n _________________________________________________________________\n OS Name: ${osName} || IP : ${hostIP}|| Hostname: ${hostName} || Current Load: ${currentLoad}% version : 1.2.0 \n _________________________________________________________________\n`;
    
    res.set('Content-Type', 'text/plain');
    res.send(responseText);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

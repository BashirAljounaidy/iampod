const express = require('express');
const os = require('os');
const osUtils = require('os-utils');
const promBundle = require("express-prom-bundle");

const app = express();
const PORT = process.env.PORT || 3000;

const metricsMiddleware = promBundle({ includeMethod: true, includePath: true });

app.use(metricsMiddleware);
app.use(express.static('public'));

const interfaces = os.networkInterfaces();
const hostIP = interfaces.eth0 ? interfaces.eth0[0].address : 'Not Available';

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

app.get('/api', (req, res) => {
  const osName = os.type();
  const hostName = os.hostname();
  
  osUtils.cpuUsage(function(cpuUsage) {
    const currentLoad = (cpuUsage * 100).toFixed(2);
    
    const response = {
      osName: osName,
      hostIP: hostIP,
      hostName: hostName,
      currentLoad: `${currentLoad}%`,
      version: '1.2.0'
    };
    
    res.json(response);
  });
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', metricsMiddleware.Prometheus.register.contentType);
  res.end(metricsMiddleware.Prometheus.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

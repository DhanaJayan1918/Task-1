document.addEventListener('DOMContentLoaded', () => {
    // --- Simulate Data from a Backend API ---
    // In a real application, you would use fetch() or XMLHttpRequest to get this data from a server.
    const mockBackendData = {
        summary: {
            targetsScanned: 123456,
            openPorts: 7890,
            highSeverityVulns: 42
        },
        vulnerabilities: [
            {
                port: 443,
                service: "HTTPS",
                finding: "Outdated SSL/TLS Protocol (SSLv3 enabled)",
                severity: "High",
                remediation: "Disable SSLv3 and TLS 1.0; enforce TLS 1.2+."
            },
            {
                port: 80,
                service: "HTTP",
                finding: "Apache HTTP Server 2.4.7 (CVE-2013-xxxx)",
                severity: "Medium",
                remediation: "Upgrade Apache to the latest stable version."
            },
            {
                port: 22,
                service: "SSH",
                finding: "Weak SSH Key Exchange Algorithms Enabled",
                severity: "Medium",
                remediation: "Configure SSH to only use strong key exchange algorithms."
            },
            {
                port: 21,
                service: "FTP",
                finding: "Anonymous FTP Login Allowed",
                severity: "Low",
                remediation: "Disable anonymous FTP access or secure with strong credentials."
            },
            {
                port: 53,
                service: "DNS",
                finding: "DNS Zone Transfer Allowed",
                severity: "Low",
                remediation: "Restrict DNS zone transfers to authorized secondary DNS servers."
            }
        ],
        activityLog: [
            "Scan 'Project Atlas' started on 2023-10-26 10:00:00.",
            "Discovered 12 new hosts in target range 192.168.1.0/24.",
            "Port scan completed for 192.168.1.5: 80, 443 open.",
            "Vulnerability 'Outdated SSL/TLS' detected on 192.168.1.5:443.",
            "New host 'webserver.example.com' added to inventory.",
            "Scan 'Project Atlas' completed on 2023-10-26 10:45:30."
        ]
    };

    // --- Function to update the Summary Metrics ---
    function updateSummaryMetrics(data) {
        document.getElementById('targetsScanned').textContent = data.targetsScanned.toLocaleString();
        document.getElementById('openPorts').textContent = data.openPorts.toLocaleString();
        document.getElementById('highSeverityVulns').textContent = data.highSeverityVulns.toLocaleString();
    }

    // --- Function to populate the Vulnerabilities Table ---
    function populateVulnerabilityTable(vulnerabilities) {
        const tableBody = document.querySelector('#vulnerabilityTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        vulnerabilities.forEach(vuln => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = vuln.port;
            row.insertCell().textContent = vuln.service;
            row.insertCell().textContent = vuln.finding;
            
            const severityCell = row.insertCell();
            severityCell.textContent = vuln.severity;
            severityCell.classList.add(`severity-${vuln.severity.toLowerCase()}`);
 // Add class for styling
            
            row.insertCell().textContent = vuln.remediation;
        });
    }

    // --- Function to populate the Activity Log ---
    function populateActivityLog(logEntries) {
        const activityLogList = document.getElementById('activityLog');
        activityLogList.innerHTML = ''; // Clear existing entries

        logEntries.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.textContent = entry;
            activityLogList.appendChild(listItem);
        });
    }

    // --- Initial Load of Data ---
    updateSummaryMetrics(mockBackendData.summary);
    populateVulnerabilityTable(mockBackendData.vulnerabilities);
    populateActivityLog(mockBackendData.activityLog);

    // In a real application, you might use setInterval or WebSockets to
    // periodically fetch and update this data from the backend.
});
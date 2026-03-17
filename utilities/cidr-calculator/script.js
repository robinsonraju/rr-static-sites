document.addEventListener('DOMContentLoaded', () => {
    
    const ipInput = document.getElementById('ip-input');
    const cidrInput = document.getElementById('cidr-input');
    const calcBtn = document.getElementById('calc-btn');
    const errorMsg = document.getElementById('error-msg');

    // Outputs
    const resNetwork = document.getElementById('res-network');
    const resRange = document.getElementById('res-range');
    const resBroadcast = document.getElementById('res-broadcast');
    const resHosts = document.getElementById('res-hosts');
    const resMask = document.getElementById('res-mask');
    const resWildcard = document.getElementById('res-wildcard');
    const resClass = document.getElementById('res-class');

    const binIpContainer = document.getElementById('bin-ip');
    const binMaskContainer = document.getElementById('bin-mask');

    // Utility: Convert string IP to 32-bit unsigned integer
    function ipToInt(ip) {
        return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0) >>> 0;
    }

    // Utility: Convert 32-bit unsigned int to string IP
    function intToIp(int) {
        return [
            (int >>> 24) & 255,
            (int >>> 16) & 255,
            (int >>> 8) & 255,
            int & 255
        ].join('.');
    }

    // Validate IP format
    function isValidIp(ip) {
        const parts = ip.split('.');
        if (parts.length !== 4) return false;
        for (let p of parts) {
            const num = parseInt(p, 10);
            if (isNaN(num) || num < 0 || num > 255 || p !== num.toString()) return false;
        }
        return true;
    }

    function calculateCIDR() {
        const ipStr = ipInput.value.trim();
        let cidr = parseInt(cidrInput.value, 10);
        
        errorMsg.textContent = '';

        if (!isValidIp(ipStr)) {
            errorMsg.textContent = 'Invalid IPv4 address format. Use format 192.168.1.1';
            return;
        }
        if (isNaN(cidr) || cidr < 0 || cidr > 32) {
            errorMsg.textContent = 'CIDR must be between 0 and 32.';
            return;
        }

        const ip = ipToInt(ipStr);
        
        // Calculate Mask
        // Shift 32 bits left to create 1s for the mask (JS shift works modulo 32, so we handle 0 carefully)
        const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0; 
        const wildcard = (~mask) >>> 0;
        
        // Network and Broadcast
        const network = (ip & mask) >>> 0;
        const broadcast = (network | wildcard) >>> 0;

        // Display basic fields
        resMask.textContent = intToIp(mask);
        resWildcard.textContent = intToIp(wildcard);
        resNetwork.textContent = `${intToIp(network)}/${cidr}`;
        resBroadcast.textContent = intToIp(broadcast);

        // Calculate Hosts and Range
        if (cidr === 32) {
            // Single host
            resHosts.textContent = '1';
            resRange.textContent = `${intToIp(network)} - ${intToIp(network)}`;
        } else if (cidr === 31) {
            // Point-to-Point (RFC 3021)
            resHosts.textContent = '2';
            resRange.textContent = `${intToIp(network)} - ${intToIp(broadcast)}`;
        } else {
            // Standard subnet
            const numHosts = wildcard - 1; // total IPs - network - broadcast
            resHosts.textContent = numHosts.toLocaleString();
            resRange.textContent = `${intToIp((network + 1) >>> 0)} - ${intToIp((broadcast - 1) >>> 0)}`;
        }

        // IP Class (Legacy purely for educational info)
        const firstOctet = parseInt(ipStr.split('.')[0], 10);
        let ipClass = 'Unknown';
        if (firstOctet >= 1 && firstOctet <= 126) ipClass = 'A (Unicst)';
        else if (firstOctet === 127) ipClass = 'Loopback';
        else if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'B (Unicast)';
        else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'C (Unicast)';
        else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'D (Multicast)';
        else if (firstOctet >= 240 && firstOctet <= 255) ipClass = 'E (Reserved)';
        resClass.textContent = ipClass;

        // Draw Binary Visualization
        drawBinary(ip, cidr, binIpContainer);
        drawBinary(mask, cidr, binMaskContainer);
    }

    function drawBinary(int32, cidr, container) {
        container.innerHTML = '';
        const binStr = int32.toString(2).padStart(32, '0');
        
        let bitIndex = 0;
        for (let octet = 0; octet < 4; octet++) {
            const octetDiv = document.createElement('div');
            octetDiv.className = 'bin-octet';
            
            for (let b = 0; b < 8; b++) {
                const bitDiv = document.createElement('div');
                const isNetBit = bitIndex < cidr;
                bitDiv.className = `bit ${isNetBit ? 'net' : 'host'}`;
                bitDiv.textContent = binStr[bitIndex];
                octetDiv.appendChild(bitDiv);
                bitIndex++;
            }
            
            container.appendChild(octetDiv);
        }
    }

    // Assign Events
    calcBtn.addEventListener('click', calculateCIDR);
    ipInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') calculateCIDR(); });
    cidrInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') calculateCIDR(); });

    // Initial run
    calculateCIDR();
});

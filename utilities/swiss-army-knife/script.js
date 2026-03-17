document.addEventListener('DOMContentLoaded', () => {

    /* --- Navigation --- */
    const navBtns = document.querySelectorAll('.nav-btn');
    const toolSections = document.querySelectorAll('.tool-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update nav active state
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update sections
            const targetTool = btn.getAttribute('data-tool');
            toolSections.forEach(section => {
                if (section.id === `tool-${targetTool}`) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    /* --- JSON Formatter --- */
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonStatus = document.getElementById('json-status');
    
    function processJson(minify = false) {
        const val = jsonInput.value.trim();
        if (!val) {
            jsonOutput.value = '';
            jsonStatus.textContent = '';
            jsonStatus.className = 'status-badge';
            return;
        }

        try {
            const parsed = JSON.parse(val);
            jsonOutput.value = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 4);
            jsonStatus.textContent = 'Valid JSON';
            jsonStatus.className = 'status-badge valid';
        } catch (e) {
            jsonOutput.value = e.message;
            jsonStatus.textContent = 'Invalid JSON';
            jsonStatus.className = 'status-badge invalid';
        }
    }

    document.getElementById('json-format-btn').addEventListener('click', () => processJson(false));
    document.getElementById('json-minify-btn').addEventListener('click', () => processJson(true));
    document.getElementById('json-clear-btn').addEventListener('click', () => {
        jsonInput.value = '';
        jsonOutput.value = '';
        jsonStatus.className = 'status-badge';
        jsonStatus.textContent = '';
    });

    jsonInput.addEventListener('input', () => {
        // optionally auto-format on paste, or let user click button.
        // For huge JSON, manual is better. We'll leave it manual for now.
    });


    /* --- JWT Decoder --- */
    const jwtInput = document.getElementById('jwt-input');
    const jwtHeader = document.getElementById('jwt-header-output');
    const jwtPayload = document.getElementById('jwt-payload-output');
    const jwtError = document.getElementById('jwt-error');

    function decodeJWT() {
        const val = jwtInput.value.trim();
        jwtError.textContent = '';
        if (!val) {
            jwtHeader.value = '';
            jwtPayload.value = '';
            return;
        }

        const parts = val.split('.');
        if (parts.length !== 3) {
            jwtError.textContent = 'Invalid JWT format (expected 3 parts separated by dots)';
            jwtHeader.value = '';
            jwtPayload.value = '';
            return;
        }

        try {
            // Atob decodes base64. JWT parts are base64url encoded.
            const b64DecodeUnicode = (str) => {
                // Convert Base64URL to Base64
                const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
                // Decode to Latin-1 string then to URI components then to unicode
                return decodeURIComponent(atob(b64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            };

            const headerParsed = JSON.parse(b64DecodeUnicode(parts[0]));
            const payloadParsed = JSON.parse(b64DecodeUnicode(parts[1]));

            jwtHeader.value = JSON.stringify(headerParsed, null, 4);
            jwtPayload.value = JSON.stringify(payloadParsed, null, 4);
        } catch (e) {
            jwtError.textContent = 'Failed to decode base64/JSON payload: ' + e.message;
        }
    }

    jwtInput.addEventListener('input', decodeJWT);
    document.getElementById('jwt-clear-btn').addEventListener('click', () => {
        jwtInput.value = '';
        decodeJWT();
    });


    /* --- Base64 --- */
    const baseInput = document.getElementById('base64-input');
    const baseOutput = document.getElementById('base64-output');
    const baseError = document.getElementById('base64-error');

    document.getElementById('base64-encode-btn').addEventListener('click', () => {
        try {
            baseError.textContent = '';
            // btoa expects latin1. We can escape utf8:
            const encoded = btoa(unescape(encodeURIComponent(baseInput.value)));
            baseOutput.value = encoded;
        } catch (e) {
            baseError.textContent = 'Encode Error: ' + e.message;
        }
    });

    document.getElementById('base64-decode-btn').addEventListener('click', () => {
        try {
            baseError.textContent = '';
            const val = baseInput.value.trim();
            const decoded = decodeURIComponent(escape(atob(val)));
            baseOutput.value = decoded;
        } catch (e) {
            baseError.textContent = 'Decode Error (Invalid Base64): ' + e.message;
        }
    });

    document.getElementById('base64-clear-btn').addEventListener('click', () => {
        baseInput.value = '';
        baseOutput.value = '';
        baseError.textContent = '';
    });


    /* --- URL --- */
    const urlInput = document.getElementById('url-input');
    const urlOutput = document.getElementById('url-output');
    const urlError = document.getElementById('url-error');

    document.getElementById('url-encode-btn').addEventListener('click', () => {
        try {
            urlError.textContent = '';
            urlOutput.value = encodeURIComponent(urlInput.value);
        } catch (e) {
            urlError.textContent = 'Encode Error: ' + e.message;
        }
    });

    document.getElementById('url-decode-btn').addEventListener('click', () => {
        try {
            urlError.textContent = '';
            urlOutput.value = decodeURIComponent(urlInput.value);
        } catch (e) {
            urlError.textContent = 'Decode Error: ' + e.message;
        }
    });

    document.getElementById('url-clear-btn').addEventListener('click', () => {
        urlInput.value = '';
        urlOutput.value = '';
        urlError.textContent = '';
    });

});

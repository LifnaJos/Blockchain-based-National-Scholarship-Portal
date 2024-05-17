import React, { useState } from 'react';

function RedStar() {
    return <span style={{ color: 'red' }}>*</span>;
}

function Captcha() {
    const [captchaCode, setCaptchaCode] = useState(generateCaptcha());

    function generateCaptcha() {
        // Implement your logic to generate a random Captcha code here
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        return randomCode;
    }

    function refreshCaptcha() {
        setCaptchaCode(generateCaptcha());
    }

    return (
        <div className="row">
            <div className="col-sm-2 mb-3">
                <label className="form-label">Enter Captcha <RedStar /></label>
                <input
                    type="text"
                    maxLength="6"
                    className="form-control"
                    placeholder='Enter Captcha Code'
                />
            </div>
            <div className="col-sm-2 mb-3">
                <label className="form-label">Captcha Box</label>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={captchaCode}
                        readOnly
                        disabled
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={refreshCaptcha}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Captcha };
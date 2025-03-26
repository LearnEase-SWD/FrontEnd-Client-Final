let overlay: HTMLDivElement | null = null;

export const showLoadingOverlay = () => {
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.35)"; // Lighter overlay
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";
        
        overlay.innerHTML = `
            <div class="spinner-container">
                <style>
                    .spinner-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 20px;
                    }
                    .spinner {
                        width: 50px;
                        height: 50px;
                        border: 4px solid rgba(255, 255, 255, 0.3);
                        border-top: 4px solid #FF9F1C; /* Warm orange color */
                        border-radius: 50%;
                        animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
                    }
                    .loading-text {
                        color: white;
                        font-family: 'Jost', sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        letter-spacing: 1px;
                        animation: pulse 1.5s ease-in-out infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 0.7; }
                        50% { opacity: 1; }
                    }
                </style>
                <div class="spinner"></div>
                <div class="loading-text">Loading...</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
    overlay.style.display = "flex";
};

export const hideLoadingOverlay = () => {
    if (overlay) overlay.style.display = "none";
};
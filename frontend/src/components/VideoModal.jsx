import { useEffect } from "react";
import "../css/VideoModal.css";

function VideoModal({ videoKey, onClose }) {
    // Cleanup Effect: Forces the browser to halt any audio/video when the modal unmounts
    useEffect(() => {
        // Prevent body scrolling behind the modal while open
        document.body.style.overflow = "hidden";
        
        return () => {
            // When the modal closes, restore scroll and clean up audio threads
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!videoKey) return null;

    return (
        /* The Overlay - Forces full view screen dimensions natively */
        <div 
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 99999
            }}
        >
            {/* The Content Frame */}
            <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    width: "85%",
                    maxWidth: "800px",
                    backgroundColor: "#000",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.8)"
                }}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background: "rgba(0, 0, 0, 0.7)",
                        color: "#fff",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        zIndex: 100000
                    }}
                >
                    &times;
                </button>

                {/* Aspect Ratio 16:9 Widescreen Wrapper */}
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                    {/* The unique key forces the browser to discard the old frame immediately on close */}
                    <iframe
                        key={videoKey}
                        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&enablejsapi=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default VideoModal;
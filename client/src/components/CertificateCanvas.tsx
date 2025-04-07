import { useRef, useEffect, useState } from "react";

type CertificateProps = {
    certificate: {
        certificateHash: string;
        courseName: string;
        issuedAt: number;
        score: number;
        student: string;
    };
};

const CertificateCanvas = ({ certificate }: CertificateProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [studentName, setStudentName] = useState<string>("Student");
    const [loading, setLoading] = useState<boolean>(true);

    const logoUrl = "/logo.jpg";
    const signatureUrl = "/sign.jpg";

    useEffect(() => {
        const fetchStudentName = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/auth/user/${certificate.student}`);
                const data = await res.json();
                if (data.user && data.user.name) {
                    setStudentName(data.user.name);
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentName();
    }, [certificate.student]);

    useEffect(() => {
        if (loading) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#D1D5DB";
        ctx.strokeRect(0, 0, width, height);

        const drawCenteredText = (text: string, y: number, font: string, color = "#000") => {
            ctx.font = font;
            ctx.fillStyle = color;
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, (width - textWidth) / 2, y);
        };

        let currentY = 80;
        drawCenteredText("Certificate of Completion", currentY, "bold 36px serif", "#000");
        currentY += 50;
        drawCenteredText("This certificate is awarded to", currentY, "24px serif", "#000");
        currentY += 40;
        drawCenteredText(studentName, currentY, "bold 30px serif", "#000");
        currentY += 50;

        ctx.font = "20px serif";
        ctx.fillStyle = "#000";
        const line1 = `For successfully completing the course: ${certificate.courseName}`;
        const line2 = "and its examination.";
        drawCenteredText(line1, currentY, "20px serif");
        currentY += 30;
        drawCenteredText(line2, currentY, "20px serif");
        currentY += 30;
        drawCenteredText(`Score: ${certificate.score}`, currentY, "bold 24px serif");
        currentY += 70;

        ctx.font = "16px serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "left";
        ctx.fillText("Issued by CertChain-Blockchain Based Verifiable Certificates", 50, currentY);
        ctx.fillText("Mumbai", 50, currentY + 20);
        ctx.fillText("Maharashtra, India", 50, currentY + 40);
        ctx.textAlign = "right";
        const issuedDate = new Date(certificate.issuedAt).toLocaleDateString();
        ctx.fillText(`Issued On: ${issuedDate}`, width - 50, currentY);
        ctx.fillText("Exam Code: EDI-0000-0605-05", width - 50, currentY + 20);
        ctx.fillText("Credit Hours: 4 Hours", width - 50, currentY + 40);
        ctx.textAlign = "center";

        const logo = new Image();
        const signature = new Image();
        logo.crossOrigin = "anonymous";
        signature.crossOrigin = "anonymous";
        let imagesLoaded = 0;

        const onImageLoad = () => {
            imagesLoaded++;
            if (imagesLoaded === 2) {
                const logoWidth = 100;
                const logoHeight = 100;
                ctx.drawImage(logo, 50, currentY + 70, logoWidth, logoHeight);
                const signWidth = 100;
                const signHeight = 100;
                ctx.drawImage(signature, width - 150, currentY + 70, signWidth, signHeight);
            }
        };

        logo.src = logoUrl;
        signature.src = signatureUrl;
        logo.onload = onImageLoad;
        signature.onload = onImageLoad;
    }, [certificate, studentName, loading]);

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <p className="text-xl">Loading certificate details...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <canvas ref={canvasRef} width={900} height={700} className="shadow-lg" />
            <button
                onClick={downloadImage}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Download Certificate
            </button>
        </div>
    );
};

export default CertificateCanvas;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "@/context/Web3";
import toast from "react-hot-toast";

type Certificate = {
  certificateId: string;
  certificateHash: string;
  courseName: string;
  issuedAt: string;
  score: number;
  valid: boolean;
  student: string;
};

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const { address, state } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!address) {
        toast.error("Please connect your wallet!");
        return;
      }
      if (!state?.educhaincontract) {
        toast.error("Contract not found!");
        return;
      }
      try {
        const certs = await state.educhaincontract.getStudentCertificates(address);
        console.log(certs);

        const parsedCerts: Certificate[] = certs.map((cert: any) => ({
          certificateId: cert.certificateHash,
          courseName: cert.courseName,
          issuedAt: new Date(cert.issueDate.toNumber() * 1000).toLocaleDateString(),
          certificateHash: cert.certificateHash,
          score: cert.score.gt ? cert.score.gt(100) ? cert.score.toNumber() / 100 : cert.score.toNumber() : cert.score, 
          valid: cert.valid,
          student: cert.student,
        }));

        const validCerts = parsedCerts.filter((cert) => cert.valid);
        setCertificates(validCerts);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        toast.error("Error fetching certificates");
      }
    };

    fetchCertificates();
  }, [address, state]);

  const handleCertificateClick = (cert: Certificate) => {
    navigate(`/certificate/${cert.certificateId}`, { state: cert });
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mt-8 text-[#00A8E8]">My Certificates</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <div
              key={cert.certificateId}
              className="border border-[#00A8E8] p-4 rounded-lg bg-gradient-to-b from-gray-900 to-black shadow-lg"
            >
              <h2 className="text-xl font-bold">{cert.courseName}</h2>
              <p className="text-sm text-gray-400">Issued at: {cert.issuedAt}</p>
              <p className="text-sm text-gray-400">
                Certificate Hash:{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => handleCertificateClick(cert)}
                >
                  {cert.certificateHash.slice(0, 15)}....{cert.certificateHash.slice(-6)}
                </span>
              </p>
              <p className="text-sm text-gray-400">Score: {cert.score}</p>
              <p className="text-green-500">Valid Certificate</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No valid certificates found.</p>
        )}
      </div>
    </div>
  );
};

export default Certificates;
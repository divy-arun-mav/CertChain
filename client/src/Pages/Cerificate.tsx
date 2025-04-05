import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useWeb3 } from "@/context/Web3";
import toast from "react-hot-toast";
import CertificateCanvas from "@/components/CertificateCanvas";

type Certificate = {
  certificateId: string;
  certificateHash: string;
  courseName: string;
  issuedAt: number;
  score: number;
  valid: boolean;
  student: string;
};

const Cerificate = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { state } = useWeb3();
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    if (location.state) {
      const cert = location.state as Certificate;
      setCertificate({
        ...cert,
        issuedAt: new Date(cert.issuedAt).getTime(),
      });
    } else if (id && state?.educhaincontract) {
      const fetchCertificateDetails = async () => {
        try {
          const certRaw = await state?.educhaincontract?.certificates(id);
          console.log("Fetched certificate:", certRaw);
        
          const certData: Certificate = {
            certificateId: certRaw.certificateHash,
            certificateHash: certRaw.certificateHash,
            courseName: certRaw.courseName,
            issuedAt: certRaw.issueDate.toNumber() * 1000,
            score: certRaw.score.gt ? certRaw.score.gt(100) ? certRaw.score.toNumber() / 100 : certRaw.score.toNumber() : certRaw.score,
            valid: certRaw.valid,
            student: certRaw.student,
          };
          setCertificate(certData);
        } catch (error) {
          console.error("Error fetching certificate details:", error);
          toast.error("Error fetching certificate details");
        }
      };
      fetchCertificateDetails();
    }
  }, [id, location.state, state]);

  return (
    <div className="w-screen bg-black">
      {certificate ? (
        <CertificateCanvas certificate={certificate} />
      ) : (
        <p className="text-center mt-8">Loading certificate details...</p>
      )}
    </div>
  );
};

export default Cerificate;
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle, Database, FileCheck, GraduationCap, Lock, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tilt } from "react-tilt";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
};

const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const tiltOpts = {
    max: 15,
    scale: 1
}

function Home() {
    return (
        <div className="flex min-h-screen w-screen flex-col ">
            <main className="flex-1 w-full">
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-white"
                >
                    <div className="container px-4 md:px-6">
                        <motion.div
                            className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2"
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                        >
                            <div className="flex flex-col justify-center space-y-4">
                                <motion.div className="space-y-2" variants={fadeIn}>
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                        Secure Student Records on the Blockchain
                                    </h1>
                                    <p className="max-w-[600px] text-blue-200 md:text-xl">
                                        Store academic data securely and issue tamper-proof, verifiable certificates upon course completion.
                                    </p>
                                </motion.div>
                                <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={fadeIn}>
                                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100" asChild>
                                        <a href="/auth">
                                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700" asChild>
                                        <a href="#how-it-works">Learn More</a>
                                    </Button>
                                </motion.div>
                            </div>
                            <motion.div className="flex items-center justify-center" variants={fadeIn}>
                                <Tilt options={tiltOpts}>
                                <div className="relative h-[350px] w-[350px] rounded-lg bg-blue-700 p-4 shadow-xl">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            className="space-y-2 text-center"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <GraduationCap className="mx-auto h-16 w-16 text-blue-300" />
                                            <div className="text-xl font-bold text-white">Sample Certificate</div>
                                            <div className="text-sm text-blue-200">University of Technology</div>
                                            <div className="pt-4 text-sm text-white">This certifies that</div>
                                            <div className="text-lg font-semibold text-white">John Smith</div>
                                            <div className="pt-2 text-sm text-white">has successfully completed</div>
                                            <div className="text-md font-medium text-white">Bachelor of Computer Science</div>
                                            <div className="mt-4 text-xs text-blue-300">Verified on Blockchain</div>
                                            <div className="mt-2 text-xs font-mono text-blue-300">0x8f5e...3a2b</div>
                                        </motion.div>
                                    </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>
                <motion.section
                    id="features"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-12 md:py-24 lg:py-32 text-white"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <div className="container px-4 md:px-6">
                        <motion.div className="flex flex-col items-center text-center space-y-4" variants={fadeIn}>
                            <motion.div className="space-y-2" variants={fadeIn}>
                                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-blue-600 font-semibold">
                                    Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Revolutionizing Academic Records
                                </h2>
                                <p className="max-w-[900px] text-blue-200 md:text-xl lg:text-base xl:text-xl">
                                    Our platform leverages blockchain technology to create a secure, transparent, and efficient system for managing student data and credentials.
                                </p>
                            </motion.div>
                        </motion.div>

                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { icon: Database, title: "Secure Data Storage", desc: "Student records are securely stored on the blockchain, ensuring data integrity and immutability." },
                                { icon: FileCheck, title: "Verifiable Certificates", desc: "Generate tamper-proof certificates that can be instantly verified by employers and institutions." },
                                { icon: Lock, title: "Privacy Controls", desc: "Students control who can access their academic records and credentials." },
                                { icon: CheckCircle, title: "Automated Verification", desc: "Instant verification of academic achievements without manual intervention." },
                                { icon: Users, title: "Institution Dashboard", desc: "Comprehensive tools for universities to manage student data and issue certificates." },
                                { icon: BookOpen, title: "Lifelong Learning Record", desc: "Students build a verifiable portfolio of achievements throughout their academic journey." }
                            ].map(({ icon: Icon, title, desc }, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center space-y-2 rounded-lg bg-blue-700 p-6 shadow-lg"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <Icon className="h-12 w-12 text-blue-300" />
                                    <h3 className="text-xl font-bold text-white">{title}</h3>
                                    <p className="text-center text-blue-200">{desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* How It Works Section */}
                <motion.section
                    id="how-it-works"
                    className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-500 to-indigo-600"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <div className="container px-4 md:px-6">
                        <motion.div className="flex flex-col items-center text-center space-y-4" variants={fadeIn}>
                            <motion.div className="space-y-2" variants={fadeIn}>
                                <div className="inline-block rounded-lg bg-blue-700 px-3 py-1 text-sm text-white">
                                    How It Works
                                </div>
                                <h2 className="text-white text-3xl font-bold tracking-tighter md:text-4xl">
                                    Simple, Secure, and Transparent
                                </h2>
                                <p className="max-w-[900px] text-blue-200 md:text-xl lg:text-base xl:text-xl">
                                    Our blockchain-based system ensures data integrity while making verification simple and reliable.
                                </p>
                            </motion.div>
                        </motion.div>

                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
                            {[
                                { step: "1", title: "Data Storage", description: "Universities securely upload student data and course information to the blockchain." },
                                { step: "2", title: "Course Completion", description: "Upon passing required tests, smart contracts automatically trigger certificate generation." },
                                { step: "3", title: "Verification", description: "Employers and institutions can instantly verify certificates using our verification portal." },
                            ].map(({ step, title, description }) => (
                                <motion.div
                                    key={step}
                                    className="flex flex-col items-center space-y-4 rounded-lg bg-blue-700 p-6 shadow-lg"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-400 text-2xl font-bold text-blue-900">
                                        {step}
                                    </div>
                                    <h3 className="text-white text-xl font-bold">{title}</h3>
                                    <p className="text-center text-blue-200">{description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
                <motion.section
                    id="benefits"
                    className="w-full bg-gradient-to-br from-blue-600 to-blue-900 py-12 md:py-24 lg:py-32 text-white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            {/* Universities Section */}
                            <motion.div
                                className="flex flex-col justify-center space-y-4"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="space-y-2">
                                    <div className="inline-block rounded-lg bg-blue-400 px-3 py-1 text-sm text-white">
                                        Benefits
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                        For Universities
                                    </h2>
                                    <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Transform how you manage student records and issue credentials.
                                    </p>
                                </div>
                                <ul className="grid gap-4">
                                    {[
                                        "Reduce administrative overhead and paperwork",
                                        "Eliminate certificate fraud and forgery",
                                        "Streamline the verification process for alumni",
                                        "Enhance institutional reputation through technological innovation",
                                        "Secure, permanent record of all academic achievements",
                                    ].map((text, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-center gap-2"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <CheckCircle className="h-5 w-5 text-white" />
                                            <span>{text}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Students Section */}
                            <motion.div
                                className="flex flex-col justify-center space-y-4"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                        For Students
                                    </h2>
                                    <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Take control of your academic credentials and career opportunities.
                                    </p>
                                </div>
                                <ul className="grid gap-4">
                                    {[
                                        "Own your academic records permanently",
                                        "Share verifiable credentials with employers instantly",
                                        "Eliminate the need for transcript requests and verification delays",
                                        "Build a comprehensive portfolio of achievements over time",
                                        "Control who has access to your academic information",
                                    ].map((text, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-center gap-2"
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <CheckCircle className="h-5 w-5 text-white" />
                                            <span>{text}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* FAQ Section */}
                <motion.section
                    id="faq"
                    className="w-full bg-gradient-to-br from-blue-500 to-blue-800 py-12 md:py-24 lg:py-32 text-white"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="container px-4 md:px-6">
                        <motion.div
                            className="flex flex-col items-center justify-center space-y-4 text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-blue-400 px-3 py-1 text-sm text-white">FAQ</div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Frequently Asked Questions
                                </h2>
                                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Everything you need to know about our blockchain certification platform.
                                </p>
                            </div>
                        </motion.div>

                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
                            {[
                                {
                                    question: "How secure is the blockchain storage?",
                                    answer:
                                        "Our platform uses advanced cryptographic techniques and distributed ledger technology to ensure that once data is recorded, it cannot be altered or tampered with, providing the highest level of security.",
                                },
                                {
                                    question: "Who can verify the certificates?",
                                    answer:
                                        "Anyone with the certificate's unique identifier can verify its authenticity through our public verification portal, but detailed student information remains private unless access is granted.",
                                },
                                {
                                    question: "What blockchain technology do you use?",
                                    answer:
                                        "We utilize a combination of public and private blockchain technologies optimized for educational credentials, ensuring both transparency and privacy where appropriate.",
                                },
                                {
                                    question: "How do universities integrate with the platform?",
                                    answer:
                                        "We provide comprehensive APIs and integration tools that connect with existing student information systems, making implementation straightforward for institutions of any size.",
                                },
                                {
                                    question: "Is student data private and GDPR compliant?",
                                    answer:
                                        "Yes, we implement privacy by design. Personal data is encrypted and access-controlled, with students having full rights over their data in compliance with GDPR and other privacy regulations.",
                                },
                                {
                                    question: "What happens if a university stops using the platform?",
                                    answer:
                                        "All certificates and records remain permanently verifiable on the blockchain, ensuring that student credentials maintain their value regardless of institutional changes.",
                                },
                            ].map((faq, index) => (
                                <motion.div
                                    key={index}
                                    className="rounded-lg border border-blue-300 p-6 shadow-md bg-white/10"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-lg font-bold">{faq.question}</h3>
                                    <p className="mt-2">{faq.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
                <motion.section
                    className="w-full bg-gradient-to-br from-blue-500 to-indigo-600 py-12 md:py-24 lg:py-32"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
                            <motion.div className="space-y-2" variants={fadeIn}>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Ready to Transform Academic Credentials?
                                </h2>
                                <p className="max-w-[600px] text-blue-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join universities worldwide that are already using our platform
                                    to secure student data and issue verifiable certificates.
                                </p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col gap-2 min-[400px]:flex-row"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-100 transition">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </main>
            <motion.footer
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-6"
                initial="hidden"
                animate="visible"
                variants={slideIn}
            >
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row text-white">
                    <motion.div className="flex items-center gap-2" variants={fadeIn}>
                        <GraduationCap className="h-6 w-6 text-white" />
                        <p className="text-sm text-blue-200">
                            © {new Date().getFullYear()} CertChain. All rights reserved.
                        </p>
                    </motion.div>
                    <motion.div className="flex gap-4">
                        {["Terms of Service", "Privacy Policy", "Contact"].map((link, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="text-sm text-blue-200 hover:text-white transition"
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            >
                                {link}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </motion.footer>
            <style>{`html{overflow-x:hidden;}`}</style>
        </div>
    )
}

export default Home;
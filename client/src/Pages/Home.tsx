import { ArrowRight, BookOpen, CheckCircle, Database, FileCheck, GraduationCap, Lock, Users } from "lucide-react"
import { Button } from "../components/ui/button"

function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-6 w-6" />
                        <span className="text-xl font-bold">CertChain</span>
                    </div>
                    <nav className="hidden md:flex gap-6">
                        <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
                            How It Works
                        </a>
                        <a href="#benefits" className="text-sm font-medium transition-colors hover:text-primary">
                            Benefits
                        </a>
                        <a href="#faq" className="text-sm font-medium transition-colors hover:text-primary">
                            FAQ
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <a href="/login">Log In</a>
                        </Button>
                        <Button size="sm" asChild>
                            <a href="/register">Get Started</a>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                        Secure Student Records on the Blockchain
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Store academic data securely and issue tamper-proof, verifiable certificates upon course completion.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button size="lg" asChild>
                                        <a href="/register">
                                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <a href="#how-it-works">Learn More</a>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="relative h-[350px] w-[350px] rounded-lg bg-muted p-4 shadow-lg">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="space-y-2 text-center">
                                            <GraduationCap className="mx-auto h-16 w-16 text-primary" />
                                            <div className="text-xl font-bold">Sample Certificate</div>
                                            <div className="text-sm text-muted-foreground">University of Technology</div>
                                            <div className="pt-4 text-sm">This certifies that</div>
                                            <div className="text-lg font-semibold">John Smith</div>
                                            <div className="pt-2 text-sm">has successfully completed</div>
                                            <div className="text-md font-medium">Bachelor of Computer Science</div>
                                            <div className="mt-4 text-xs text-muted-foreground">Verified on Blockchain</div>
                                            <div className="mt-2 text-xs font-mono text-muted-foreground">0x8f5e...3a2b</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                                    Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Revolutionizing Academic Records
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our platform leverages blockchain technology to create a secure, transparent, and efficient system for
                                    managing student data and credentials.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <Database className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Secure Data Storage</h3>
                                <p className="text-center text-muted-foreground">
                                    Student records are securely stored on the blockchain, ensuring data integrity and immutability.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <FileCheck className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Verifiable Certificates</h3>
                                <p className="text-center text-muted-foreground">
                                    Generate tamper-proof certificates that can be instantly verified by employers and institutions.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <Lock className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Privacy Controls</h3>
                                <p className="text-center text-muted-foreground">
                                    Students control who can access their academic records and credentials.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <CheckCircle className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Automated Verification</h3>
                                <p className="text-center text-muted-foreground">
                                    Instant verification of academic achievements without manual intervention.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <Users className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Institution Dashboard</h3>
                                <p className="text-center text-muted-foreground">
                                    Comprehensive tools for universities to manage student data and issue certificates.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                                <BookOpen className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold">Lifelong Learning Record</h3>
                                <p className="text-center text-muted-foreground">
                                    Students build a verifiable portfolio of achievements throughout their academic journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                                    How It Works
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Simple, Secure, and Transparent
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our blockchain-based system ensures data integrity while making verification simple and reliable.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                                    1
                                </div>
                                <h3 className="text-xl font-bold">Data Storage</h3>
                                <p className="text-center text-muted-foreground">
                                    Universities securely upload student data and course information to the blockchain.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                                    2
                                </div>
                                <h3 className="text-xl font-bold">Course Completion</h3>
                                <p className="text-center text-muted-foreground">
                                    Upon passing required tests, smart contracts automatically trigger certificate generation.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                                    3
                                </div>
                                <h3 className="text-xl font-bold">Verification</h3>
                                <p className="text-center text-muted-foreground">
                                    Employers and institutions can instantly verify certificates using our verification portal.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="benefits" className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                                        Benefits
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">For Universities</h2>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Transform how you manage student records and issue credentials.
                                    </p>
                                </div>
                                <ul className="grid gap-4">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Reduce administrative overhead and paperwork</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Eliminate certificate fraud and forgery</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Streamline the verification process for alumni</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Enhance institutional reputation through technological innovation</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Secure, permanent record of all academic achievements</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">For Students</h2>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Take control of your academic credentials and career opportunities.
                                    </p>
                                </div>
                                <ul className="grid gap-4">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Own your academic records permanently</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Share verifiable credentials with employers instantly</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Eliminate the need for transcript requests and verification delays</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Build a comprehensive portfolio of achievements over time</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span>Control who has access to your academic information</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">FAQ</div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Everything you need to know about our blockchain certification platform.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
                            <div className="rounded-lg border p-6 shadow-sm">
                                <h3 className="text-lg font-bold">How secure is the blockchain storage?</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Our platform uses advanced cryptographic techniques and distributed ledger technology to ensure that
                                    once data is recorded, it cannot be altered or tampered with, providing the highest level of security.
                                </p>
                            </div>
                            <div className="rounded-lg border p-6 shadow-sm">
                                <h3 className="text-lg font-bold">Who can verify the certificates?</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Anyone with the certificate's unique identifier can verify its authenticity through our public
                                    verification portal, but detailed student information remains private unless access is granted.
                                </p>
                            </div>
                            <div className="rounded-lg border p-6 shadow-sm">
                                <h3 className="text-lg font-bold">What blockchain technology do you use?</h3>
                                <p className="mt-2 text-muted-foreground">
                                    We utilize a combination of public and private blockchain technologies optimized for educational
                                    credentials, ensuring both transparency and privacy where appropriate.
                                </p>
                            </div>
                            <div className="rounded-lg border p-6 shadow-sm">
                                <h3 className="text-lg font-bold">How do universities integrate with the platform?</h3>
                                <p className="mt-2 text-muted-foreground">
                                    We provide comprehensive APIs and integration tools that connect with existing student information
                                    systems, making implementation straightforward for institutions of any size.
                                </p>
                            </div>
                            <div className="rounded-lg border p-6 shadow-sm">
                                <h3 className="text-lg font-bold">Is student data private and GDPR compliant?</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Yes, we implement privacy by design. Personal data is encrypted and access-controlled, with students
                                    having full rights over their data in compliance with GDPR and other privacy regulations.
                                </p>
                            </div>
                            <div className="rounded-lg border p-6 shadow-sm">
                                <h3 className="text-lg font-bold">What happens if a university stops using the platform?</h3>
                                <p className="mt-2 text-muted-foreground">
                                    All certificates and records remain permanently verifiable on the blockchain, ensuring that student
                                    credentials maintain their value regardless of institutional changes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full bg-primary py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center text-primary-foreground">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Ready to Transform Academic Credentials?
                                </h2>
                                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Join universities worldwide that are already using our platform to secure student data and issue
                                    verifiable certificates.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg" variant="secondary" asChild>
                                    <a href="/register">
                                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground" asChild>
                                    <a href="/contact">Contact Sales</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-6 w-6" />
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} CertChain. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="text-sm text-muted-foreground underline underline-offset-4">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-muted-foreground underline underline-offset-4">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-muted-foreground underline underline-offset-4">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
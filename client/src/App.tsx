import { Routes, Route } from "react-router"
import Home from "./Pages/Home"
import Courses from "./Pages/Courses";
import CourseDetails from "./Pages/CourseDetails";
import { Toaster } from "react-hot-toast";
import EnrolledCourses from "./Pages/EnrolledCourses";
import CourseLearning from "./Pages/CourseLearning";
import StudentTest from "./Pages/StudentTest";
import Navbar from "./components/Navbar";
import Auth from "./Pages/Auth";
import Certificates from "./Pages/Certificates";
import Cerificate from "./Pages/Cerificate";
import Acheivements from "./Pages/Acheivements";
import CompletedCourses from "./Pages/CompletedCourses";
import HackathonCreator from "./Pages/HackathonCreator";
import Hackathons from "./Pages/Hackathons";
import HackathonDetail from "./Pages/HackathonDetails";
import MyProject from "./Pages/MyProject";
import ParticipatedHackathons from "./Pages/ParticipatedHackathons";
import CreatedHacks from "./Pages/CreatedHacks";
import CreatorDashboard from "./Pages/CreatorDashboard";
import EditHackathon from "./Pages/EditHackathon";
import AwardPrizes from "./Pages/AwardPrizes";
import SolidityGen from "./Pages/SolidityGen";
import Leaderboard from "./Pages/LeaderBoard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/courses/completed" element={<CompletedCourses />} />
        <Route path="/enrolled/:studentAddress" element={<EnrolledCourses />} />
        <Route path="/learn/:courseId" element={<CourseLearning />} />
        <Route path="/test/:topic" element={<StudentTest />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/certificate/:id" element={<Cerificate />} />
        <Route path="/achievments" element={<Acheivements />} />
        <Route path="/hackathon/create" element={<HackathonCreator />} />
        <Route path="/hackathon/:id" element={<HackathonDetail />} />
        <Route path="/hackathon/project" element={<MyProject />} />
        <Route path="/hackathon/participated" element={<ParticipatedHackathons />} />
        <Route path="/my-hackathons" element={<CreatedHacks />} />
        <Route path="/my-hackathons/:id" element={<CreatorDashboard />} />
        <Route path="/edit-hackathon/:id" element={<EditHackathon />} />
        <Route path="/award-prize/:id" element={<AwardPrizes />} />
        <Route path="/hackathon" element={<Hackathons />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/solidity-ide" element={<SolidityGen />} />
      </Routes>
      <Toaster
        toastOptions={{
          duration: 3000
        }}
      />
    </>
  )
}

export default App;
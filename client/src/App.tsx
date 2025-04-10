import "@radix-ui/themes/styles.css";
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
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./routes/privateRoutes";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>}/>
        <Route path="/courses/completed" element={<ProtectedRoute><CompletedCourses /></ProtectedRoute>}/>
        <Route path="/enrolled/:studentAddress" element={<ProtectedRoute><EnrolledCourses /></ProtectedRoute>} />
        <Route path="/learn/:courseId" element={<ProtectedRoute><CourseLearning /></ProtectedRoute>} />
        <Route path="/test/:topic/:courseId" element={<ProtectedRoute><StudentTest /></ProtectedRoute>} />
        <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
        <Route path="/certificate/:id" element={<Cerificate />} />
        <Route path="/achievements" element={<ProtectedRoute><Acheivements /></ProtectedRoute>} />
        <Route path="/hackathon/create" element={<ProtectedRoute><HackathonCreator /></ProtectedRoute>} />
        <Route path="/hackathon/:id" element={<ProtectedRoute><HackathonDetail /></ProtectedRoute>} />
        <Route path="/hackathon/project" element={<ProtectedRoute><MyProject /></ProtectedRoute>} />
        <Route path="/hackathon/participated" element={<ProtectedRoute><ParticipatedHackathons /></ProtectedRoute>} />
        <Route path="/my-hackathons" element={<ProtectedRoute><CreatedHacks /></ProtectedRoute>} />
        <Route path="/my-hackathons/:id" element={<ProtectedRoute><CreatorDashboard /></ProtectedRoute>} />
        <Route path="/edit-hackathon/:id" element={<ProtectedRoute><EditHackathon /></ProtectedRoute>} />
        <Route path="/award-prize/:id" element={<ProtectedRoute><AwardPrizes /></ProtectedRoute>} />
        <Route path="/hackathon" element={<ProtectedRoute><Hackathons /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/solidity-ide" element={<ProtectedRoute><SolidityGen /></ProtectedRoute>} />
        <Route path="/user/:address" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
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
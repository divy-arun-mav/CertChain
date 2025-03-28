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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/enrolled/:studentAddress" element={<EnrolledCourses />} />
        <Route path="/learn/:courseId" element={<CourseLearning />} />
        <Route path="/test" element={<StudentTest />} />
      </Routes>
      <Toaster
        toastOptions={{
          duration: 2000
        }}
      />
    </>
  )
}

export default App;
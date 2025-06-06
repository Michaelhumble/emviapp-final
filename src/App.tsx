
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/auth';
import { Toaster } from 'sonner';
import Artists from './pages/Artists';
import Community from './pages/Community';
import Jobs from './pages/Jobs';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import PostJob from './pages/PostJob';
import PostSalon from './pages/PostSalon';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/community" element={<Community />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/post-salon" element={<PostSalon />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

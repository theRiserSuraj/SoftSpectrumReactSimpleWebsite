import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';          // ✅ correct path
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Services from '../pages/Services';
import Portfolio from '../pages/Porfolio';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Team from '../pages/Team';
import Careers from '../pages/Careers';
import NotFound from '../pages/NotFound';                  // ✅ 404 page (create it)
import Work from '../pages/Work';

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> 
        <Route path="/work" element={<Work />} />
        {/* catch-all 404 */}
      </Routes>
    </Layout>
  );
};

export default AppRouter;
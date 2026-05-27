import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import { blogPostsData } from '../data/blogPostsData';

const Blog = () => {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <Container>
        <SectionHeading
          badge="Insights"
          title="Latest from our blog"
          subtitle="Thoughts on technology, design, and business."
        />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {blogPostsData.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-500">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-indigo-600 font-medium mt-4 hover:gap-2 transition-all">
                  Read more →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blog;
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import { blogPostsData } from '../data/blogPostsData';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPostsData.find(p => p.slug === slug);
  if (!post) return <div className="text-center py-20">Post not found</div>;

  return (
    <div className="py-16 md:py-24 bg-white">
      <Container className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-gray-500 mb-4">{post.date} • {post.author}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          <img src={post.image} alt={post.title} className="w-full rounded-2xl mb-8" />
          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content.split('\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default BlogPost;
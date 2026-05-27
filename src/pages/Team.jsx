import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import { teamData } from '../data/teamData';

const Team = () => {
  return (
    <div className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          badge="Who we are"
          title="Meet the experts"
          subtitle="Passionate creators, engineers, and strategists."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {teamData.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-all"
            >
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-indigo-100" />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-indigo-600 text-sm font-medium mb-2">{member.role}</p>
              <p className="text-gray-500 text-sm">{member.bio}</p>
              <div className="flex justify-center gap-3 mt-4">
                {member.social.linkedin && <a href={member.social.linkedin} className="text-gray-400 hover:text-indigo-600">🔗</a>}
                {member.social.twitter && <a href={member.social.twitter} className="text-gray-400 hover:text-indigo-600">🐦</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Team;
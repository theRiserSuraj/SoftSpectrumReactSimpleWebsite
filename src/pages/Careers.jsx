import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import { careersData } from '../data/careersData';
import { useNotification } from '../context/NotificationContext';

const Careers = () => {
  const { showNotification } = useNotification();
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', resume: '' });

  const handleApply = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    showNotification(`Application sent for ${selectedJob.title}!`, 'success');
    setSelectedJob(null);
    setForm({ name: '', email: '', resume: '' });
  };

  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <Container>
        <SectionHeading
          badge="Join us"
          title="Shape the future of tech"
          subtitle="We're looking for curious minds to build amazing things."
        />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Job listings */}
          <div className="space-y-4">
            {careersData.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-bold">{job.title}</h3>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                >
                  Apply now →
                </button>
              </motion.div>
            ))}
          </div>
          {/* Application form (shown when job selected) */}
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100"
            >
              <h3 className="text-xl font-bold mb-4">Apply for {selectedJob.title}</h3>
              <form onSubmit={handleApply} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Link to resume / LinkedIn"
                  value={form.resume}
                  onChange={(e) => setForm({ ...form, resume: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <Button type="submit" variant="primary" className="w-full">
                  Send application
                </Button>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 text-sm underline w-full text-center"
                >
                  Cancel
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Careers;
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Trash2, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Profile = () => {
  const [recentReviews, setRecentReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('codeReviews')) || [];
    setRecentReviews(savedReviews);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('codeReviews');
    setRecentReviews([]);
  };

  return (
    <div className="profile-page">
      <motion.div 
        className="profile-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="profile-title">Your Profile</h1>
          <p className="profile-subtitle">View your recently reviewed code snippets and activity</p>
        </motion.div>

        <div className="reviews-section">
          {recentReviews.length > 0 && (
            <div className="reviews-header">
              <h2 className="reviews-title">Recent Reviews</h2>
              <button
                onClick={clearHistory}
                className="clear-history-btn"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            </div>
          )}

          {recentReviews.length === 0 ? (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="empty-state-icon">
                <Code size={32} />
              </div>
              <h3 className="empty-state-title">No Reviews Yet</h3>
              <p className="empty-state-description">
                Your reviewed code snippets will appear here. Start by reviewing some code!
              </p>
              <button
                onClick={() => navigate('/code-review')}
                className="btn-primary"
              >
                Start Reviewing
              </button>
            </motion.div>
          ) : (
            <div className="review-cards">
              {recentReviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="review-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="review-card-header">
                    <div className="review-card-title">
                      {review.language === 'javascript' ? (
                        <Code size={16} className="text-yellow-400" />
                      ) : review.language === 'python' ? (
                        <Code size={16} className="text-blue-400" />
                      ) : (
                        <Code size={16} className="text-gray-400" />
                      )}
                      {`snippet.${review.language || 'js'}`}
                    </div>
                    <div className="review-card-date">
                      <Clock size={14} className="inline-block mr-1" />
                      {formatDate(review.timestamp)}
                    </div>
                  </div>
                  <div className="review-card-content">
                    <div className="review-snippet">
                      {review.code.length > 200 
                        ? `${review.code.substring(0, 200)}...` 
                        : review.code}
                    </div>
                    <div className="review-feedback">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Review completed</span>
                      </div>
                      {review.review && (
                        <div className="mt-2 text-sm">
                          {review.review.length > 150 
                            ? `${review.review.substring(0, 150)}...` 
                            : review.review}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

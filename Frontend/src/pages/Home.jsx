import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import '../App.css';

const features = [
  {
    icon: <Code className="feature-icon" />,
    title: 'Smart Code Analysis',
    description: 'AI-powered analysis that understands context and provides meaningful suggestions.'
  },
  {
    icon: <ShieldCheck className="feature-icon" />,
    title: 'Quality Assurance',
    description: 'Catch potential bugs and security vulnerabilities before they become issues.'
  },
  {
    icon: <Zap className="feature-icon" />,
    title: 'Lightning Fast',
    description: 'Get instant feedback on your code without waiting for manual reviews.'
  },
  {
    icon: <Sparkles className="feature-icon" />,
    title: 'Learn & Improve',
    description: 'Detailed explanations help you understand and learn from suggested improvements.'
  }
];

const quotes = [
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "The best error message is the one that never shows up.",
  "Clean code always looks like it was written by someone who cares."
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

export default function Home() {
  return (
    <div className="home-page">
      <div className="bg-grid-pattern">
        <div className="hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fade-in-up"
          >
            <h1 className="hero-title">Elevate Your Code Quality</h1>
            <p className="hero-subtitle">
              AI-powered code reviews that help you write better, cleaner, and more efficient code.
              Get instant feedback and level up your programming skills.
            </p>
            <div className="button-group">
              <Link to="/review" className="btn-primary">
                Start Reviewing for Free
              </Link>
             
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`feature-card fade-in-up delay-${index + 1}00`}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code Example Section */}
      <div className="code-section">
        <motion.div 
          className="code-example"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="code-header">
            <div className="code-dot" style={{ backgroundColor: '#ef4444' }} />
            <div className="code-dot" style={{ backgroundColor: '#f59e0b' }} />
            <div className="code-dot" style={{ backgroundColor: '#10b981' }} />
            <span className="code-filename">example.js</span>
          </div>
          <div className="code-content">
            <pre>
              <code>
{`// Before AI Review
function calculateTotal(items) {
  let total = 0;
  for(let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

// After AI Review
function calculateTotal(items) {
  return items.reduce((sum, { price, quantity }) => 
    sum + (price * quantity), 0
  );
}`}
              </code>
            </pre>
          </div>
          <div className="code-suggestion">
            <div className="suggestion-icon">
              <Sparkles className="text-white" />
            </div>
            <div className="suggestion-content">
              <h4>AI Suggestion</h4>
              <p>Simplified the code using Array.reduce() for better readability and conciseness.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Testimonial/Quote */}
      <div className="quote-section">
        <motion.div 
          className="quote-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="quote-text">"{randomQuote}"</div>
          <div className="quote-author">— Code Review AI</div>
        </motion.div>
      </div>
    </div>
  );
}

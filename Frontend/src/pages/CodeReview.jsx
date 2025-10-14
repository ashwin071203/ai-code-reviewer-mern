import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import { Sparkles, Code, Zap, Terminal } from 'lucide-react';


// Styles
import '../styles/CodeReview.css';

const CodeReview = () => {
  const [code, setCode] = useState(`// Welcome to Code Review AI
function sum(a, b) {
  // Add your code here
  return a + b;
}

// Try changing this code and click 'Review Code'`);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const location = useLocation();

  useEffect(() => {
    prism.highlightAll();
    
    const params = new URLSearchParams(location.search);
    const codeParam = params.get('code');
    if (codeParam) {
      setCode(decodeURIComponent(codeParam));
    }
  }, [location.search]);

  const saveReview = (code, reviewText) => {
    const reviews = JSON.parse(localStorage.getItem('codeReviews') || '[]');
    const newReview = {
      code,
      review: reviewText,
      timestamp: new Date().toISOString(),
      language: 'javascript'
    };
    
    const updatedReviews = [newReview, ...reviews].slice(0, 10);
    localStorage.setItem('codeReviews', JSON.stringify(updatedReviews));
  };

  const reviewCode = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    setReview('');
    setActiveTab('review');
    
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
      saveReview(code, response.data);
    } catch (error) {
      console.error('Error reviewing code:', error);
      setReview('❌ An error occurred while reviewing your code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderEditor = () => (
    <div className="code-editor-container">
      <div className="editor-toolbar">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-400">editor.js</span>
        </div>
      </div>
      <div className="editor-content">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
          padding={16}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            backgroundColor: 'var(--darker-bg)',
            height: '100%',
            width: '100%',
            overflow: 'auto',
          }}
          className="editor"
        />
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="review-container">
      <div className="review-header">
        <div className="flex items-center gap-2">
          <Sparkles className="text-yellow-400" size={16} />
          <span className="text-sm font-medium">AI Code Review</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded ${
            isLoading 
              ? 'bg-yellow-900/50 text-yellow-300' 
              : 'bg-green-900/50 text-green-300'
          }`}>
            {isLoading ? 'Analyzing...' : 'Analysis Complete'}
          </span>
        </div>
      </div>
      <div className="review-content">
        {review ? (
          <Markdown rehypePlugins={[rehypeHighlight]} className="markdown-content">
            {review}
          </Markdown>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Code className="text-gray-500" size={48} />
            </div>
            <h3 className="empty-state-title">No Review Yet</h3>
            <p className="empty-state-description">
              Click the "Review Code" button to analyze your code with AI
            </p>
          </div>
        )}
        {isLoading && (
          <div className="loading-state">
            <div className="animate-pulse flex items-center space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="code-review-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="code-review-container"
      >
        <div className="code-review-header">
          <h1>
            <Terminal className="inline-block mr-2" size={24} />
            Code Review AI
          </h1>
          <button
            onClick={reviewCode}
            disabled={isLoading}
            className={`btn-primary flex items-center gap-2 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <Zap size={16} className="fill-current" />
                Review Code
              </>
            )}
          </button>
        </div>

        <div className="code-review-tabs">
          <button
            className={`code-review-tab ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            <Code size={16} />
            Editor
          </button>
          <button
            className={`code-review-tab ${activeTab === 'review' ? 'active' : ''} ${
              !review && !isLoading ? 'opacity-50' : ''
            }`}
            onClick={() => setActiveTab('review')}
            disabled={!review && !isLoading}
          >
            <Sparkles size={16} />
            AI Review
            {isLoading && (
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            )}
          </button>
        </div>

        <div className="content-area">
          {activeTab === 'editor' ? renderEditor() : renderReview()}
        </div>
      </motion.div>
    </div>
  );
};

export default CodeReview;

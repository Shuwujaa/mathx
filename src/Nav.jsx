// MathXNavPage.jsx
import React, { useState, useEffect, useRef } from 'react';

const MathXNavPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Algebra');
  const [activeChapter, setActiveChapter] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress] = useState({
    'sequences-and-series': { completed: 12, total: 25 }
  });

  // Section data
  const sections = [
    {
      id: 'algebra',
      name: 'Algebra',
      chapters: [
        { id: 'polynomials', name: 'Polynomials', questions: 45, completed: 20 },
        { id: 'equations', name: 'Linear Equations', questions: 30, completed: 15 },
        { id: 'matrices', name: 'Matrices', questions: 25, completed: 8 },
        { id: 'complex-numbers', name: 'Complex Numbers', questions: 35, completed: 12 }
      ]
    },
    {
      id: 'trigonometry',
      name: 'Trigonometry',
      chapters: [
        { id: 'triangles', name: 'Right Triangles', questions: 40, completed: 18 },
        { id: 'identities', name: 'Trig Identities', questions: 50, completed: 22 },
        { id: 'graphs', name: 'Trig Graphs', questions: 35, completed: 10 }
      ]
    },
    {
      id: 'calculus',
      name: 'Calculus',
      chapters: [
        { id: 'limits', name: 'Limits', questions: 30, completed: 12 },
        { id: 'derivatives', name: 'Derivatives', questions: 55, completed: 25 },
        { id: 'integration', name: 'Integration', questions: 60, completed: 20 },
        { id: 'sequences-and-series', name: 'Sequences and Series', questions: 45, completed: 15 }
      ]
    },
    {
      id: 'analytical-geometry',
      name: 'Analytical Geometry',
      chapters: [
        { id: 'coordinate', name: 'Coordinate Geometry', questions: 40, completed: 18 },
        { id: 'vectors', name: 'Vectors', questions: 35, completed: 12 },
        { id: 'conics', name: 'Conic Sections', questions: 50, completed: 20 }
      ]
    }
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);
      if (isMobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle chapter click
  const handleChapterClick = async (sectionId, chapter) => {
    setActiveChapter(chapter.id);
    setActiveSection(sectionId);
    
    if (chapter.id === 'sequences-and-series') {
      setLoading(true);
      try {
        // Simulate loading JSON data
        setTimeout(() => {
          const mockQuizData = {
            title: "Sequences and Series",
            questions: [
              {
                id: 1,
                question: "Find the sum of the first 20 terms of the arithmetic sequence: 3, 7, 11, 15, ...",
                options: ["800", "820", "840", "860"],
                correctAnswer: 1,
                explanation: "The sequence has first term a₁ = 3 and common difference d = 4. Using Sₙ = n/2[2a₁ + (n-1)d], S₂₀ = 20/2[2×3 + 19×4] = 10[6 + 76] = 820.",
                difficulty: "medium"
              },
              {
                id: 2,
                question: "What is the limit of the geometric series: $$\\sum_{n=0}^{\\infty} \\frac{1}{2^n}$$?",
                options: ["1", "2", "3", "Diverges"],
                correctAnswer: 1,
                explanation: "This is a geometric series with a = 1 and r = 1/2. Since |r| < 1, the sum converges to a/(1-r) = 1/(1-1/2) = 2.",
                difficulty: "easy"
              }
            ]
          };
          setQuizData(mockQuizData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error loading quiz data:', error);
        setLoading(false);
      }
    }
  };

  // Calculate progress percentage
  const getProgressPercentage = (chapterId) => {
    const prog = progress[chapterId];
    if (!prog) return 0;
    return Math.round((prog.completed / prog.total) * 100);
  };

  // Main CSS styles
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f9ff',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden'
    },
    sidebar: {
      width: sidebarOpen ? '280px' : '80px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRight: '1px solid rgba(14, 165, 233, 0.1)',
      boxShadow: '0 8px 32px rgba(14, 165, 233, 0.1)',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      position: mobileView ? 'fixed' : 'relative',
      height: mobileView ? '100vh' : 'auto',
      left: mobileView && !sidebarOpen ? '-280px' : '0'
    },
    sidebarHeader: {
      padding: '20px',
      borderBottom: '1px solid rgba(14, 165, 233, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: sidebarOpen ? 'space-between' : 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      opacity: sidebarOpen ? 1 : 0,
      transition: 'opacity 0.3s ease',
      whiteSpace: 'nowrap'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    toggleButton: {
      background: 'rgba(14, 165, 233, 0.1)',
      border: '1px solid rgba(14, 165, 233, 0.2)',
      borderRadius: '8px',
      padding: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    navItems: {
      flex: 1,
      padding: '20px 0',
      overflowY: 'auto'
    },
    sectionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 20px',
      margin: '0 10px 8px 10px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'transparent',
      border: 'none',
      textAlign: 'left',
      color: '#334155',
      position: 'relative',
      overflow: 'hidden'
    },
    sectionButtonActive: {
      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(56, 189, 248, 0.05))',
      border: '1px solid rgba(14, 165, 233, 0.2)',
      boxShadow: '0 4px 20px rgba(14, 165, 233, 0.1)',
      color: '#0ea5e9'
    },
    sectionIcon: {
      width: '24px',
      height: '24px',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(14, 165, 233, 0.1)',
      borderRadius: '6px',
      padding: '4px'
    },
    sectionName: {
      fontSize: '16px',
      fontWeight: '600',
      opacity: sidebarOpen ? 1 : 0,
      transition: 'opacity 0.3s ease',
      whiteSpace: 'nowrap'
    },
    chaptersContainer: {
      paddingLeft: sidebarOpen ? '40px' : '0',
      marginTop: '8px',
      overflow: 'hidden',
      maxHeight: sidebarOpen ? '500px' : '0',
      transition: 'all 0.3s ease'
    },
    chapterItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      margin: '4px 10px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      background: 'transparent',
      border: 'none',
      textAlign: 'left',
      color: '#475569',
      opacity: sidebarOpen ? 1 : 0
    },
    chapterItemActive: {
      background: 'rgba(14, 165, 233, 0.1)',
      color: '#0ea5e9',
      fontWeight: '500'
    },
    chapterInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    chapterName: {
      fontSize: '14px',
      fontFamily: "'JetBrains Mono', monospace"
    },
    questionCount: {
      fontSize: '12px',
      color: '#64748b',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    progressBadge: {
      fontSize: '12px',
      padding: '2px 8px',
      borderRadius: '12px',
      background: 'rgba(34, 197, 94, 0.1)',
      color: '#16a34a',
      fontWeight: '600'
    },
    mainContent: {
      flex: 1,
      padding: mobileView ? '20px' : '40px',
      overflowY: 'auto',
      transition: 'all 0.3s ease',
      marginLeft: mobileView ? '0' : (sidebarOpen ? '0' : '-200px')
    },
    mobileHeader: {
      display: mobileView ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
      padding: '16px 0'
    },
    mobileMenuButton: {
      background: 'rgba(14, 165, 233, 0.1)',
      border: '1px solid rgba(14, 165, 233, 0.2)',
      borderRadius: '8px',
      padding: '10px',
      cursor: 'pointer'
    },
    welcomeSection: {
      marginBottom: '40px'
    },
    welcomeTitle: {
      fontSize: mobileView ? '28px' : '36px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '12px'
    },
    welcomeSubtitle: {
      fontSize: '18px',
      color: '#64748b',
      maxWidth: '600px'
    },
    sectionGrid: {
      display: 'grid',
      gridTemplateColumns: mobileView ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '32px'
    },
    sectionCard: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '28px',
      border: '1px solid rgba(14, 165, 233, 0.1)',
      boxShadow: '0 8px 32px rgba(14, 165, 233, 0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    sectionCardActive: {
      borderColor: 'rgba(14, 165, 233, 0.3)',
      boxShadow: '0 12px 48px rgba(14, 165, 233, 0.15)',
      transform: 'translateY(-4px)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#0f172a'
    },
    chapterCount: {
      background: 'rgba(14, 165, 233, 0.1)',
      color: '#0ea5e9',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600'
    },
    chapterList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    chapterCard: {
      padding: '16px',
      background: 'white',
      borderRadius: '12px',
      border: '1px solid rgba(14, 165, 233, 0.05)',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    chapterCardActive: {
      borderColor: 'rgba(14, 165, 233, 0.3)',
      background: 'rgba(14, 165, 233, 0.03)',
      transform: 'translateX(4px)'
    },
    chapterHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    chapterTitle: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#0f172a',
      fontFamily: "'JetBrains Mono', monospace"
    },
    statsRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#64748b'
    },
    progressBar: {
      flex: 1,
      height: '6px',
      background: 'rgba(14, 165, 233, 0.1)',
      borderRadius: '3px',
      overflow: 'hidden',
      margin: '0 12px'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #0ea5e9, #3b82f6)',
      borderRadius: '3px',
      transition: 'width 0.3s ease'
    },
    quizContainer: {
      marginTop: '40px',
      animation: 'fadeIn 0.5s ease'
    },
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    loader: {
      textAlign: 'center'
    },
    loaderText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#0ea5e9',
      marginTop: '16px'
    },
    laTeXPreview: {
      background: '#f8fafc',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid rgba(14, 165, 233, 0.1)',
      marginTop: '16px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '14px',
      color: '#334155'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(4px)',
      zIndex: 50,
      display: mobileView && sidebarOpen ? 'block' : 'none'
    }
  };

  // Keyframes for animations
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
  `;

  // Section icons mapping
  const sectionIcons = {
    'Algebra': '∑',
    'Trigonometry': 'θ',
    'Calculus': '∫',
    'Analytical Geometry': '∆'
  };

  // Render the quiz engine if data is loaded
  const renderQuizEngine = () => {
    if (!quizData) return null;
    
    return (
      <div style={styles.quizContainer}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>
              {quizData.title}
            </h2>
            <p style={{ color: '#64748b' }}>
              {quizData.questions.length} questions • Click on a question to start
            </p>
          </div>
          <button
            onClick={() => setQuizData(null)}
            style={{
              background: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid rgba(14, 165, 233, 0.2)',
              borderRadius: '8px',
              padding: '10px 16px',
              color: '#0ea5e9',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Back to Chapters
          </button>
        </div>
        
        {/* Mock quiz questions */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#0f172a' }}>
            Sample Questions (MCQ Engine would load here)
          </h3>
          {quizData.questions.map((q, index) => (
            <div
              key={q.id}
              style={{
                padding: '20px',
                background: index === 0 ? 'rgba(14, 165, 233, 0.03)' : '#f8fafc',
                borderRadius: '12px',
                marginBottom: '12px',
                border: '1px solid rgba(14, 165, 233, 0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Question {q.id}</span>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: q.difficulty === 'easy' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                  color: q.difficulty === 'easy' ? '#16a34a' : '#ca8a04'
                }}>
                  {q.difficulty}
                </span>
              </div>
              <p style={{ marginBottom: '16px', lineHeight: '1.6', color: '#334155' }}>{q.question}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {q.options.map((opt, optIndex) => (
                  <div
                    key={optIndex}
                    style={{
                      padding: '12px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid rgba(14, 165, 233, 0.1)',
                      color: '#475569'
                    }}
                  >
                    {String.fromCharCode(65 + optIndex)}. {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{keyframes}</style>
      
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loader}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(14, 165, 233, 0.1)',
              borderTopColor: '#0ea5e9',
              borderRadius: '50%',
              margin: '0 auto',
              animation: 'spin 1s linear infinite'
            }} />
            <div style={styles.loaderText}>Loading Sequences & Series...</div>
          </div>
        </div>
      )}
      
      <div style={styles.container}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            {sidebarOpen ? (
              <div style={styles.logo}>
                <div style={styles.logoText}>MathX</div>
              </div>
            ) : (
              <div style={styles.logoText}>MX</div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={styles.toggleButton}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)'}
            >
              {sidebarOpen ? '«' : '»'}
            </button>
          </div>
          
          <nav style={styles.navItems}>
            {sections.map(section => (
              <div key={section.id}>
                <button
                  onClick={() => {
                    setActiveSection(section.id);
                    if (mobileView) setSidebarOpen(false);
                  }}
                  style={{
                    ...styles.sectionButton,
                    ...(activeSection === section.id && styles.sectionButtonActive)
                  }}
                  onMouseEnter={e => {
                    if (!(activeSection === section.id)) {
                      e.currentTarget.style.background = 'rgba(14, 165, 233, 0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!(activeSection === section.id)) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div style={styles.sectionIcon}>
                    {sectionIcons[section.name] || '•'}
                  </div>
                  <span style={styles.sectionName}>{section.name}</span>
                </button>
                
                <div style={{
                  ...styles.chaptersContainer,
                  maxHeight: activeSection === section.id ? `${section.chapters.length * 60}px` : '0'
                }}>
                  {section.chapters.map(chapter => (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterClick(section.id, chapter)}
                      style={{
                        ...styles.chapterItem,
                        ...(activeChapter === chapter.id && styles.chapterItemActive)
                      }}
                      onMouseEnter={e => {
                        if (!(activeChapter === chapter.id)) {
                          e.currentTarget.style.background = 'rgba(14, 165, 233, 0.05)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!(activeChapter === chapter.id)) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div style={styles.chapterInfo}>
                        <span style={styles.chapterName}>{chapter.name}</span>
                        <span style={styles.questionCount}>
                          {chapter.questions} questions
                        </span>
                      </div>
                      {progress[chapter.id] && (
                        <div style={styles.progressBadge}>
                          {getProgressPercentage(chapter.id)}%
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          
          <div style={{
            padding: '20px',
            borderTop: '1px solid rgba(14, 165, 233, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#64748b',
              opacity: sidebarOpen ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}>
              Progress: <span style={{ color: '#0ea5e9', fontWeight: '600' }}>42%</span>
            </div>
          </div>
        </aside>
        
        {/* Overlay for mobile */}
        {mobileView && sidebarOpen && (
          <div 
            style={styles.overlay}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <main style={styles.mainContent}>
          {/* Mobile Header */}
          <div style={styles.mobileHeader}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={styles.mobileMenuButton}
            >
              ☰
            </button>
            <div style={styles.logoText}>MathX</div>
            <div style={{ width: '48px' }}></div>
          </div>
          
          {!quizData ? (
            <>
              {/* Welcome Section */}
              <div style={styles.welcomeSection}>
                <h1 style={styles.welcomeTitle}>Welcome to MathX</h1>
                <p style={styles.welcomeSubtitle}>
                  Master mathematics through interactive practice. Select a chapter below to begin your learning journey with our MCQ-based approach.
                </p>
              </div>
              
              {/* Sections Grid */}
              <div style={styles.sectionGrid}>
                {sections.map(section => (
                  <div
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    style={{
                      ...styles.sectionCard,
                      ...(activeSection === section.id && styles.sectionCardActive)
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 16px 48px rgba(14, 165, 233, 0.15)';
                    }}
                    onMouseLeave={e => {
                      if (!(activeSection === section.id)) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(14, 165, 233, 0.08)';
                      }
                    }}
                  >
                    <div style={styles.cardHeader}>
                      <h2 style={styles.sectionTitle}>{section.name}</h2>
                      <span style={styles.chapterCount}>
                        {section.chapters.length} chapters
                      </span>
                    </div>
                    
                    <div style={styles.chapterList}>
                      {section.chapters.map(chapter => (
                        <div
                          key={chapter.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChapterClick(section.id, chapter);
                          }}
                          style={{
                            ...styles.chapterCard,
                            ...(activeChapter === chapter.id && styles.chapterCardActive)
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                          onMouseLeave={e => {
                            if (!(activeChapter === chapter.id)) {
                              e.currentTarget.style.transform = 'translateX(0)';
                            }
                          }}
                        >
                          <div style={styles.chapterHeader}>
                            <h3 style={styles.chapterTitle}>{chapter.name}</h3>
                            <span style={{
                              background: 'rgba(14, 165, 233, 0.1)',
                              color: '#0ea5e9',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {chapter.questions} Qs
                            </span>
                          </div>
                          <div style={styles.statsRow}>
                            <span>Progress</span>
                            <div style={styles.progressBar}>
                              <div
                                style={{
                                  ...styles.progressFill,
                                  width: `${(chapter.completed / chapter.questions) * 100}%`
                                }}
                              />
                            </div>
                            <span>{chapter.completed}/{chapter.questions}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* LaTeX Preview */}
              <div style={styles.laTeXPreview}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>
                  LaTeX RENDERING PREVIEW
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.8' }}>
                  $$S_n = \frac{n}{2}[2a + (n-1)d]$$ • $$e^{ipi} + 1 = 0$$ • $$\int_a^b f(x)dx = F(b) - F(a)$$
                </div>
              </div>
            </>
          ) : (
            renderQuizEngine()
          )}
        </main>
      </div>
    </>
  );
};

// Add CSS for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  }
  
  * {
    box-sizing: border-box;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(14, 165, 233, 0.05);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(14, 165, 233, 0.2);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(14, 165, 233, 0.3);
  }
  
  /* Focus styles */
  button:focus {
    outline: 2px solid rgba(14, 165, 233, 0.5);
    outline-offset: 2px;
  }
`;
document.head.appendChild(styleSheet);

export default MathXNavPage;
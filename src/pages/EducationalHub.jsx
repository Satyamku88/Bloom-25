import React from "react";
import "./EducationalHub.css";

const EducationalHub = () => {
  const educationalContent = [
    {
      id: 1,
      title: "Maternal Care Guide",
      type: "article",
      description: "Comprehensive guide covering prenatal nutrition, exercise, and postnatal recovery.",
      link: "https://iris.who.int/bitstream/handle/10665/69735/a91272.pdf",
      videoLink: "https://www.youtube.com/watch?v=Vgmv9kn7o1Y"
    },
    {
      id: 3,
      title: "Hygiene Masterclass",
      type: "video",
      description: "Essential hygiene practices for disease prevention.",
      link: "https://www.youtube.com/watch?v=l6XGE-Xuq3M&t=248s",
      duration: "12:45"
    },
    {
      id: 5,
      title: "Child Nutrition",
      type: "interactive",
      description: "Interactive guide to balanced diets for different age groups.",
      link: "https://iapindia.org/pdf/Ch-044-Nutrition-5-12-y-IAP-Parental-Guidelines-28112021.pdf",
      quiz: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/back-to-school-nutrition-quiz"
    },
    {
      id: 6,
      title: "Mental Wellness",
      type: "course",
      description: "6-week program for parental stress management.",
      link: "https://youtu.be/LCSVWcq71Xw?si=0IFZgoFbwH7DR5Na",
      progress: "30"
    },
    {
      id: 7,
      title: "Breastfeeding Basics",
      type: "video",
      description: "Techniques and troubleshooting guide for new mothers.",
      link: "https://www.youtube.com/watch?v=vOZMYnjyX2I",
      duration: "18:30"
    },
    {
      id: 8,
      title: "Child Development",
      type: "interactive",
      description: "Milestone tracker and activity suggestions.",
      link: "https://www.childcare.gov/consumer-education/monitoring-your-childs-development",
    }
  ];

  return (
    <div className="educational-hub">
      <h1>Health Education Hub</h1>
      
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search resources..."
            aria-label="Search educational resources"
          />
        </div>
      </div>

      <div className="content-grid">
        {educationalContent.map((item) => (
          <div key={item.id} className="content-card">
            <div className="card-header">
              <h2>{item.title}</h2>
              <span className={`content-type ${item.type}`}>
                {item.type}
              </span>
            </div>
            <p>{item.description}</p>

            {item.duration && (
              <div className="media-indicator">
                <span>Duration:</span>
                <span>{item.duration}</span>
              </div>
            )}

            {item.videoLink && (
              <a
                href={item.videoLink}
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
            )}

            {item.progress && (
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
              </div>
            )}

            <div className="action-buttons">
              <a
                href={item.link}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.type === 'video' ? 'Watch Now' : 'Learn More'}
              </a>
              
              {item.quiz && (
                <a href={item.quiz} className="btn-secondary">
                  Take Quiz
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalHub;
//src/app/Danish/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import './danish.css';

const DanishPage = () => {
    const lessons = [
    { id: '001', title: 'Præsentation • Introductions', description: 'Basic introductions and personal pronouns', path: '/Danish/lesson-001' },
    { id: '002', title: 'Kendeord • Articles', description: 'Definite and indefinite articles', path: '/Danish/lesson-002' },
    { id: '003', title: 'For / Fordi • Explanation vs. Cause', description: 'Telling apart cause and speculative explanation', path: '/Danish/lesson-003' },
    { id: '004', title: 'Artikler Øvelse • Articles Exercise', description: 'Practice Danish articles with interactive exercises', path: '/Danish/ex-001' },
    { id: '005', title: 'Artikler Øvelse • Articles Exercise', description: 'Practice Danish articles with interactive exercises', path: '/Danish/ex-002' }
  ];

  return (
    <div className="danish-lesson">
      <div className="copyright">
        &copy; 2026 Isidoros Parlamas • parlamas@live.com • socratic-school.com
      </div>
      
      <h1>Dansk • Danish</h1>
      
      <div className="www">ΣΩΚΡΑΤΙΚΗ ΣΧΟΛΗ • SOKRATISK SKOLE</div>
      
      <hr />
      
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>🇩🇰 Lektioner • Lessons 🇬🇧</span>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gap: '20px', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        marginBottom: '40px'
      }}>
        {lessons.map((lesson) => (
          <Link 
            href={lesson.path}
            key={lesson.id}
            style={{ textDecoration: 'none' }}
          >
            <div className="lesson-card">
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#8b4513', marginBottom: '10px' }}>
                {lesson.id} • {lesson.title}
              </div>
              <div style={{ color: '#666' }}>
                {lesson.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DanishPage;
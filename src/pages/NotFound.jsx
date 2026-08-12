import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page" style={{ padding: '10rem 8%', textAlign: 'center', minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: '8rem', color: 'var(--primary-teal)', fontWeight: '800', fontFamily: 'Playfair Display, serif', lineHeight: '1' }}>
        404
      </div>
      <h2 style={{ fontSize: '3.6rem', color: 'var(--dark-navy)', margin: '1.5rem 0' }}>
        Lost in the Himalayas?
      </h2>
      <p style={{ fontSize: '1.6rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
        The page you are looking for might have been moved or does not exist. Let's get you back on track to explore North Bengal!
      </p>
      <Link to="/" className="btn btn-primary">
        <i className="fas fa-home"></i> Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;

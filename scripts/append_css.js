import fs from 'fs';

const extraCss = `
/* --- Added for Contact Page & Legal Compliance --- */
.checkbox-field {
  display: flex !important;
  align-items: flex-start !important;
  gap: 12px !important;
  margin-top: 6px !important;
  margin-bottom: 12px !important;
  font-size: 0.82rem !important;
  line-height: 1.5 !important;
  color: var(--muted-foreground, #a1a1aa) !important;
  cursor: pointer !important;
}
.checkbox-field input[type="checkbox"] {
  width: 18px !important;
  height: 18px !important;
  margin-top: 2px !important;
  accent-color: #e11d48 !important;
  cursor: pointer !important;
  flex-shrink: 0 !important;
}
.checkbox-field a {
  color: #ffffff !important;
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
  font-weight: 600 !important;
  transition: color 0.15s ease !important;
}
.checkbox-field a:hover {
  color: #f43f5e !important;
}

.contact-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.contact-info-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.2s, background 0.2s;
}
.contact-info-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
}
.contact-info-card strong {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-foreground, #a1a1aa);
}
.contact-info-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}
.contact-info-card p {
  font-size: 0.88rem;
  color: #d4d4d8;
  margin: 0;
  line-height: 1.5;
}
.contact-info-card a {
  color: #fff;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.contact-info-card a:hover {
  color: #f43f5e;
}

.legal-content {
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  color: #d4d4d8;
  line-height: 1.7;
}
.legal-content h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.2rem;
  letter-spacing: 0.05em;
  color: #fff;
  margin-top: 40px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}
.legal-content h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin-top: 24px;
  margin-bottom: 8px;
}
.legal-content p, .legal-content li {
  font-size: 0.95rem;
  color: #a1a1aa;
  margin-bottom: 14px;
}
.legal-content ul, .legal-content ol {
  padding-left: 24px;
  margin-bottom: 18px;
}
.legal-content li {
  margin-bottom: 8px;
}
.legal-content .highlight-box {
  background: rgba(225, 29, 72, 0.08);
  border-left: 4px solid #e11d48;
  padding: 16px 20px;
  border-radius: 0 4px 4px 0;
  margin: 24px 0;
}
.legal-content .highlight-box p {
  color: #fca5a5;
  margin: 0;
}
.footer-legal-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 10px;
  font-size: 0.78rem;
}
.footer-legal-links a {
  color: #a1a1aa;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.footer-legal-links a:hover {
  color: #fff;
}
`;

fs.appendFileSync('assets/styles-C7PxWAHs.css', extraCss);
console.log('Appended legal and contact styling to assets/styles-C7PxWAHs.css');

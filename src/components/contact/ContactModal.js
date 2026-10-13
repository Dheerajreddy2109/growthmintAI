"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Icon, { WhatsAppIcon } from '../Icon';
import ContactForm from './ContactForm';
import { site, whatsappHref } from '@/data/site';
import { getLenis } from '@/lib/lenis';

const ContactContext = createContext(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContact must be used inside <ContactProvider>');
  return ctx;
}

const promises = [
  { icon: 'doc', text: 'Fixed price & delivery date, in writing' },
  { icon: 'key', text: 'You own the code, domain & logins' },
  { icon: 'chat', text: 'Talk directly to the developer' },
];

function Modal({ request, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const lenis = getLenis();
    lenis?.stop(); // freeze the smooth-scrolled page behind the popup
    // The form may already have focused a field (e.g. when it opens on step 2).
    if (!dialogRef.current?.contains(document.activeElement)) {
      dialogRef.current?.querySelector('.cm-main form button, .cm-main form input')?.focus();
    }

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      // Keep keyboard focus inside the dialog.
      const items = dialogRef.current.querySelectorAll('button:not([disabled]), a[href], input:not([tabindex="-1"]), textarea, select');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      lenis?.start();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="cm-overlay" data-lenis-prevent onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cm-dialog" role="dialog" aria-modal="true" aria-labelledby="cm-title" ref={dialogRef}>
        <aside className="cm-side">
          <span className="cm-eyebrow"><i /> Free quote · No obligation</span>
          <h2 id="cm-title">{request.title || 'Let’s build something people choose.'}</h2>
          <p>Two quick steps. We reply with a written quote within one working day.</p>
          <ul>
            {promises.map((p) => (
              <li key={p.text}>
                <span><Icon name={p.icon} size={16} /></span>
                {p.text}
              </li>
            ))}
          </ul>
          <div className="cm-alt">
            <span>Prefer to write directly?</span>
            <a href={`mailto:${site.email}`}><Icon name="mail" size={15} /> {site.email}</a>
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={15} /> WhatsApp us</a>
            )}
          </div>
        </aside>

        <div className="cm-main">
          <button type="button" className="cm-close" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
          <ContactForm prefill={request.prefill} source={request.source} onDone={onClose} autoFocus />
        </div>
      </div>
    </div>
  );
}

export function ContactProvider({ children }) {
  const [request, setRequest] = useState(null);

  // open({ title, source, prefill: { project, budget, company, message } })
  const open = useCallback((req = {}) => setRequest({ ...req, key: Date.now() }), []);
  const close = useCallback(() => setRequest(null), []);

  return (
    <ContactContext.Provider value={{ open, close }}>
      {children}
      {request && <Modal key={request.key} request={request} onClose={close} />}
    </ContactContext.Provider>
  );
}

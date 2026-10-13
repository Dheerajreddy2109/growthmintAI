"use client";

import { useContact } from './ContactModal';

/**
 * Any call-to-action that should open the contact popup.
 * Usable from server components: <ContactButton className="btn btn-dark" source="hero">…</ContactButton>
 */
export default function ContactButton({ children, className, source, title, prefill, ...props }) {
  const { open } = useContact();
  return (
    <button type="button" className={className} onClick={() => open({ source, title, prefill })} {...props}>
      {children}
    </button>
  );
}

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// useRef: across all the renderings I want to reference the same thing; I want the exact same thing in every render

const Modal ({ children }) => {
  const elementRef = useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elementRef.current);
  }, []);
}
import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('contact_details_unlocked') === 'true';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const unlockDetails = () => {
    localStorage.setItem('contact_details_unlocked', 'true');
    setIsUnlocked(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ContactContext.Provider value={{ isUnlocked, unlockDetails, isModalOpen, openModal, closeModal }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};

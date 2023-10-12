import React from 'react';
import { useCallback, useEffect } from "react";
import './InfoToolTip.css'
import successIcon from '../../images/success.svg';
import failIcon from '../../images/fail.svg';

const InfoToolTip = ({ infoToolTip, onClose }) => {
  const handleCloseByEsc = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleCloseByEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
  }, [handleCloseByEsc]);

  const { success, message, isOpen } = infoToolTip;

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close-btn">
        </button>
        <img
          src={success ? successIcon : failIcon}
          className="popup__icon"
          alt="Успешная регистрация"
        />
        <h3 className="popup__title">{message}</h3>
      </div>
    </div>
  );
};

export default InfoToolTip;

import React from 'react';

const Modal = ({ btnOpenModal, title, description, content, open, setOpen, initState }) => {
  return (
    <>
      {btnOpenModal && (
        <button type='button' className="btn btn-sm my-2" onClick={() => setOpen(true)}>
          {btnOpenModal}
        </button>
      )}

      <div
        className={`fixed inset-0 z-50 overflow-auto ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transition-opacity duration-300`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-end">
                <button
                  type='button'
                  onClick={() => { setOpen(false), initState() }}
                  className="btn btn-sm text-lg btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>

              {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
              {description && <p className="mb-4">{description}</p>}
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

import React from 'react'

const Modal = ({ btnOpenModal, title, description, content }) => {
  return (
    <>{/* You can open the modal using document.getElementById('ID').showModal() method */}
      {btnOpenModal && <button className="btn btn-sm my-2" onClick={() => document.getElementById('my_modal_3').showModal()}>{btnOpenModal}</button>}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          {description && <p className="py-4">{description}</p>}
          {content}
        </div>
      </dialog>
    </>)
}

export default Modal
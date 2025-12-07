import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import deleteImg from "../../assets/delete.png";
import deleteImg2 from "../../assets/delete-disabled.png";
import DeleteModal from "./DeleteModal";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

const DeleteAcctModal = ({
  deleteAcct,
  token,
  user_id,
  setIsDeleteYes,
  setIsOpenDel,
  isOpenDel,
  statusTwo,
  invoice_id2,
  loadingDelete,
  statusNotif,
}) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      <>
        <img src={deleteImg} alt="delete" onClick={openModal} />

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <ToastContainer
                      position="top-center"
                      autoClose={2000}
                      hideProgressBar={true}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold text-center mt-4 leading-6 text-gray-900"
                    >
                      Delete Account
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-center text-gray-500">
                        Are you sure you want to delete your acccount?
                      </p>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        className="w-[183px] h-[52px] "
                        onClick={closeModal}
                      >
                        No
                      </button>
                      {statusTwo !== "owing" ? (
                        <>
                          {!loadingDelete ? (
                            <button
                              type="button"
                              className="w-[183px] h-[52px] bg-[#E74F48] button-shadow rounded-[8px]"
                              // onClick={closeDisableModal}
                              onClick={() => {
                                deleteAcct(user_id, token);
                                setIsDeleteYes(true);
                                closeModal;
                              }}
                            >
                              Yes
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="w-[183px] h-[52px] bg-[#E74F48] button-shadow rounded-[8px]"
                              // onClick={closeDisableModal}
                            >
                              <ClipLoader size={16} />
                            </button>
                          )}
                        </>
                      ) : (
                        <DeleteModal
                          deleteAcct={deleteAcct}
                          isOpenDel={isOpenDel}
                          setIsOpenDel={setIsOpenDel}
                          token={token}
                          user_id={user_id}
                          loadingDelete={loadingDelete}
                          closeModal={closeModal}
                          invoice_id2={invoice_id2}
                        />
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
};

export default DeleteAcctModal;

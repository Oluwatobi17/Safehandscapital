import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import profile from "../../assets/profile.png";
import { Fragment, useState } from "react";
// import ProfileSettings from "../ProfileSettings";
import AccountSettings from "./editprofile/AccountSettings";
import ProfileSettings from "./editprofile/ProfileSettings";
import arrow from "../../assets/left-arrow.png";
import { ToastContainer } from "react-toastify";
const EditProfleModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [page, setPage] = useState(0);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const TabTitles = ["Profile", "Account"];
  const PageDisplay = () => {
    if (page === 0) {
      return <ProfileSettings closeModal={closeModal} />;
    } else {
      return <AccountSettings />;
    }
  };

  return (
    <div>
      <>
        <button
          className="flex  w-full items-center space-x-5"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={profile} alt="image" />
          <p>Edit Profile</p>
          <img src={arrow} alt="image" className="absolute z-10 right-[30px]" />
        </button>

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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                      className="text-lg flex space-x-5 font-medium leading-6 text-gray-900"
                    >
                      {TabTitles.map((title, index) => {
                        return (
                          <div key={index}>
                            <button
                              onClick={() => setPage(index)}
                              className={`${
                                index === page
                                  ? "border-b-[#00C805] text-[#00C805] border-b-2 font-bold"
                                  : ""
                              } text-lg `}
                            >
                              {title}
                            </button>
                          </div>
                        );
                      })}
                    </Dialog.Title>
                    <div className="mt-4">{PageDisplay()}</div>
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

export default EditProfleModal;

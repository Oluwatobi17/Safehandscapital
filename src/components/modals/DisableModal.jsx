import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { ClipLoader } from "react-spinners";
import warn from "../../assets/warn-red.png";
export default function DisableModal({
  setChecked,
  showDisableModal,
  setShowDisableModal,
  token,
  user_id,
  disableAcct,
  toggleStatus,
  loadingDisable,
}) {
  function closeDisableModal() {
    setShowDisableModal(!showDisableModal);
  }
  function openModal() {
    setShowDisableModal(!showDisableModal);
  }

  return (
    <>
      <label
        onClick={openModal}
        className="switch"
        style={{ background: toggleStatus ? "#0ACA0F" : "#ccc" }}
      >
        <span
          className="slider"
          style={{
            right: toggleStatus && "22px",
            left: !toggleStatus && "0px",
          }}
        ></span>
      </label>

      <Transition appear show={showDisableModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDisableModal}>
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
                <Dialog.Panel className="w-full max-w-[431px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full flex justify-center">
                    <img src={warn} alt="image" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold text-center mt-4 leading-6 text-gray-900"
                  >
                    Disable Account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      Are you sure you want to disable your acccount?
                    </p>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      className="w-[183px] h-[52px] "
                      onClick={closeDisableModal}
                    >
                      No
                    </button>
                    {!loadingDisable ? (
                      <button
                        type="button"
                        className="w-[183px] h-[52px] bg-[#E74F48] button-shadow rounded-[8px]"
                        // onClick={closeDisableModal}
                        onClick={() => {
                          disableAcct(user_id, token);
                          setChecked(false);
                          // closeDisableModal;
                        }}
                      >
                        Yes
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-[183px] h-[52px] bg-[#E74F48] button-shadow rounded-[8px]"
                      >
                        <ClipLoader size={16} />
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* )} */}
    </>
  );
}

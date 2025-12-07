import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import warn from "../../assets/warn-red.png";
export default function DeleteModal({
  closeModal,
  token,
  deleteAcct,
  user_id,
  disableAcct,
  setIsOpenDel,
  loadingDelete,
  isOpenDel,
  invoice_id2,
}) {
  function closeDelModal() {
    setIsOpenDel(!isOpenDel);
  }
  function openModal() {
    setIsOpenDel(!isOpenDel);
  }
  const navigate = useNavigate();
  return (
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
      <Transition appear show={isOpenDel} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDelModal}>
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
                    Delete Account
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      Before you can delete this account, you are required to
                      pay 20% profit share.{" "}
                    </p>
                  </div>

                  <div className="mt-8 ">
                    <button
                      type="button"
                      className="w-full bg-[#00C805] rounded-[8px] button-shadow font-bold h-[52px] "
                      onClick={() =>
                        navigate(`/dashboard/invoices/${invoice_id2}`)
                      }
                    >
                      Pay now
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

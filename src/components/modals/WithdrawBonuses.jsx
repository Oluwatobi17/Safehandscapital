import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import deleteImg from "../../assets/delete.png";
import deleteImg2 from "../../assets/delete-disabled.png";
import DeleteModal from "./DeleteModal";
import { useSelector } from "react-redux";
import referralIcon from "../../assets/refferal-icon.png";
import AddWithdrawal from "./AddWithdrawal";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import animationConfetti from "../../assets/Evergreen Confetti.json";
import { Player } from "@lottiefiles/react-lottie-player";
import Cookies from "js-cookie";
const WithdrawBonuses = ({
  rankingStats,
  pay_id,
  bonusWithdraw,
  loadingWith,
  confetti,
  typeOfUser,
}) => {
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { error, loadingWithdraw } = useSelector((state) => state.withdrawal);
  let user_id;
  let token;
  let withdrawal_add;
  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
    withdrawal_add = userInfo.info[0]?.w_address;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
    withdrawal_add = userInfo.userInfo?.data[0]?.w_address;
  }
  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
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
        {typeOfUser === "withdraw" && (
          <button className="bg-[#00C805]" onClick={openModal}>
            Withdraw
          </button>
        )}
        {typeOfUser === "n_a" && <button className="bg-[#aeaeae]">N/A</button>}
        {typeOfUser === "processed" && (
          <button disabled className="cursor-disabled bg-yellow-500">
            Processed
          </button>
        )}
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
                  {withdrawal_add !== null ? (
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
                        Withdraw
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-center text-gray-500">
                          Are you sure you want to withdraw?
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
                        {!loadingWith ? (
                          <button
                            type="button"
                            onClick={() => bonusWithdraw(pay_id, toast)}
                            className="w-[183px] h-[52px] bg-[#00C805] button-shadow rounded-[8px]"
                            // onClick={closeDisableModal}
                          >
                            Yes
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="w-[183px] h-[52px] bg-[#00C805] button-shadow rounded-[8px]"
                          >
                            <ClipLoader size={16} />
                          </button>
                        )}
                      </div>
                    </Dialog.Panel>
                  ) : (
                    <Dialog.Panel className="w-full max-w-[431px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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

                      <div className="w-full flex flex-col items-center">
                        <div className="w-full flex justify-center">
                          <img src={referralIcon} alt="image" />
                        </div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-bold text-center mt-4 leading-6 text-gray-900"
                        >
                          Request Withdrawal
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-center text-gray-500">
                            You do not have any withdrawal address on file, to
                            add a withdrawal address or use the profile settings
                            tab..
                          </p>
                        </div>
                        <AddWithdrawal closeModal={closeModal} />
                      </div>
                    </Dialog.Panel>
                  )}
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
};

export default WithdrawBonuses;

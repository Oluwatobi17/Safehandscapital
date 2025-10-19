import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { HiClipboardCopy, HiOutlineKey } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import referralIcon from "../../assets/refferal-icon.png";
import {
  otpGenerate,
  otpGenerateWithdraw,
} from "../../redux/actions/updateDetails";
// import Confetti from "react-confetti";

export default function DepositModal({
  isOpen,
  setIsOpen,
  makePayment,
  invoiceStatus,
  width,
  height,
}) {
  //   let [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  // console.log(invoiceStatus);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const userInfo = useSelector((state) => state.userInformation);
  const { deposit, loadingPayment } = useSelector((state) => state.makePay);
  //   console.log(deposit);
  //   const textAreaRef = useRef(null);

  const tokenVal = useSelector((state) => state.token);
  let user_id;
  let token;
  let amount;
  let address;
  amount = deposit?.amount;
  address = deposit?.pay_address;
  // let withdrawal_add;
  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
    // withdrawal_add = userInfo.info[0]?.w_address;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
    // withdrawal_add = userInfo.userInfo?.data[0]?.w_address;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  const textAreaRef = useRef(null);
  const pText = address;

  function copyToClipboard() {
    // this won't work in development but only in production because of its secure https protocol
    navigator.clipboard.writeText(pText);
    toast.success("Copied to clipboard!!!");
  }
  return (
    <>
      <div className="referral-custom">
        {invoiceStatus === "completed" ? (
          <></>
        ) : (
          <div>
            {/* <h2>Referrals Details</h2> */}
            {!loadingPayment ? (
              <button
                onClick={makePayment}
                className="w-[155px] h-[44px] rounded-[8px] bg-[#00C805] button-shadow"
              >
                Pay
              </button>
            ) : (
              <button
                onClick={makePayment}
                className="w-[155px] h-[44px] rounded-[8px] bg-[#00C805] button-shadow"
              >
                <ClipLoader size={22} />
              </button>
            )}
          </div>
        )}
      </div>

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
                  {/* <Confetti width={width} height={height} /> */}
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full flex justify-center">
                      <img src={referralIcon} alt="image" />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold text-center mt-4 leading-6 text-gray-900"
                    >
                      Payment Address
                    </Dialog.Title>
                    <div className="mt-2 ">
                      <p className="text-sm text-center text-gray-500">
                        Send ${amount} to the address below
                      </p>
                      <p
                        onClick={copyToClipboard}
                        className="text-sm mt-1 cursor-pointer flex space-x-2  items-center justify-center text-center text-[#00C805]"
                      >
                        <HiClipboardCopy className="w-4 h-4" />
                        <span ref={textAreaRef}>{address}</span>
                        {/* <textarea ref={textAreaRef}></textarea> */}
                      </p>
                      <p className="text-sm mt-3 text-center text-[#191919]">
                        Only send USDT TRC20 to this address. If you send any
                        other token to this address, your funds will be lost
                        forever
                      </p>
                    </div>
                    {/* <AddWithdrawal closeModal={closeModal} /> */}
                    <button
                      onClick={closeModal}
                      className="w-full text-[14px] font-bold mt-8 h-[52px] rounded-[8px] bg-[#00C805] button-shadow"
                    >
                      Continue
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

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import key from "../../assets/key.png";
import referralIcon from "../../assets/refferal-icon.png";
import {
  otpGenerate,
  update_withdrawal,
} from "../../redux/actions/updateDetails";
export default function AddWithdrawal({ closeModal }) {
  let user_id;
  let token;
  let withdrawal_add;
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { loadingGenerate } = useSelector((state) => state.generateOtp);
  let [isOpen, setIsOpen] = useState(false);

  function closeWithModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const dispatch = useDispatch();
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
  const [withdrawal_address, setWithdrawal_address] = useState("");
  const [otp, setOtp] = useState("");
  const generate_otp = () => {
    dispatch(otpGenerate(user_id, token, toast));
  };
  const { loadingUpdatePro } = useSelector((state) => state.updateWithdrawal);
  const update_withdraw = () => {
    dispatch(update_withdrawal(withdrawal_address, otp, user_id, token, toast));
  };

  return (
    <>
      {/* <div className="referral-custom"> */}
      {/* <div> */}
      {/* <h2>Referrals Details</h2> */}
      <button
        onClick={openModal}
        className="w-[383px] text-[#191919] h-[52px] font-semibold text-[16px] mt-4 button-shadow rounded-[8px] bg-[#00C805]"
      >
        Add a withdrawal address
      </button>
      {/* </div> */}
      {/* </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeWithModal}>
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
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full flex justify-center">
                      <img src={referralIcon} alt="image" />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold text-center mt-4 leading-6 text-gray-900"
                    >
                      Add withdrwal address
                    </Dialog.Title>
                    <div className="w-full mt-4">
                      <div className="flex flex-col space-y-3">
                        <input
                          type="text"
                          placeholder="Enter your USDT(TRC20) Wallet Address"
                          onChange={(e) =>
                            setWithdrawal_address(e.target.value)
                          }
                          className="w-full h-[56px] border px-3 rounded-md border-[#D1D1D1] focus:outline-[#80E382]  "
                        />
                        {/* <p>Please enter Generated OTP</p> */}
                        <input
                          placeholder="Please enter Generated OTP"
                          onChange={(e) => setOtp(e.target.value)}
                          type="text"
                          className="w-full h-[56px] border px-3 rounded-md border-[#D1D1D1] focus:outline-[#80E382] "
                        />
                      </div>
                      <main
                        className="flex items-center mt-4 w-full space-x-2"
                        onClick={generate_otp}
                      >
                        {/* <img src={key} className="w-[5%]" alt="image" />{" "} */}
                        <HiOutlineKey className="text-[#00C805] w-5 h-5" />
                        <p className="text-[#00C805]">Tap to Generate OTP</p>
                        {loadingGenerate ? <ClipLoader size={16} /> : <></>}
                      </main>
                      <div className="w-full flex justify-center space-x-4 mt-5">
                        <button
                          onClick={closeWithModal}
                          className="w-[80px] button-shadow h-[36px] rounded-[8px]"
                        >
                          Cancel
                        </button>
                        {!loadingUpdatePro ? (
                          <button
                            className="w-[124px] h-[36px] button-shadow rounded-[8px]  bg-[#00C805]"
                            onClick={update_withdraw}
                          >
                            Save changes
                          </button>
                        ) : (
                          <button
                            className="w-[124px] h-[36px] button-shadow rounded-[8px]  bg-[#00C805]"
                            disabled
                          >
                            <ClipLoader size={16} />
                          </button>
                        )}
                      </div>
                    </div>
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

import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import referralIcon from "../../assets/refferal-icon.png";
import { withdraw } from "../../redux/actions/refferalActios";
import {
  otpGenerate,
  otpGenerateWithdraw,
} from "../../redux/actions/updateDetails";
import AddWithdrawal from "./AddWithdrawal";
export default function WithdrawalMOdal({ withdrawal_add, referralStat }) {
  let [isOpen, setIsOpen] = useState(false);
  let [balance, setBalance] = useState("");
  let [otp, setOtp] = useState("");
  let [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const { loadingGenerate } = useSelector((state) => state.generateOtp);
  function closeModal() {
    setIsOpen(false);
  }
  let con;
  // console.log(confetti, "so");
  const [confetti, setConfetti] = useState(true);
  if (Cookies.get("confetti") === null) {
  } else {
    con = Cookies.get("confetti");
  }
  function openModal() {
    setIsOpen(true);
  }
  const generate_otp = () => {
    dispatch(otpGenerateWithdraw(user_id, token, toast));
  };
  const referral_balance = async () => {
    try {
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=referral_balance&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(data?.data?.data?.balance);
    } catch (error) {}
  };
  useEffect(() => {
    referral_balance();
  }, []);
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { error, loadingWithdraw } = useSelector((state) => state.withdrawal);
  let user_id;
  let token;
  // let withdrawal_add;
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
  const withdraw_now = () => {
    dispatch(withdraw(amount, otp, user_id, token, toast, confetti));
  };
  const CustomDiv = ({ text, number }) => {
    return (
      <div className="">
        <p>{text}</p>
        <p>{number}</p>
      </div>
    );
  };
  return (
    <>
      {/* <div className="referral-custom ">
        <h2>Referrals Details</h2>
        <div>
          <CustomDiv text="Total Referrals" number={referralStat?.total} />
          <CustomDiv
            text="Amount earned"
            number={referralStat?.amount_earned}
          />
          <CustomDiv
            text="Amount withdrawn"
            number={referralStat?.amount_withdrawn}
          />
        </div>



        <button
          onClick={openModal}
          className="withdrawButton"
       
        >
          Withdraw
        </button>
      </div> */}
      <div className="referral-custom">
        <div>
          <h2>Referrals Details</h2>
          <button onClick={openModal} className="withdrawButton">
            Withdraw
          </button>
        </div>
        <div>
          <CustomDiv text="Total Referrals" number={referralStat?.total} />
          <CustomDiv
            text="Amount earned"
            number={`\$${referralStat?.amount_earned}`}
          />
          <CustomDiv
            text="Amount withdrawn"
            number={`\$${referralStat?.amount_withdrawn}`}
          />
        </div>
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
                {withdrawal_add === null ? (
                  <Dialog.Panel className="w-full max-w-[431px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                          You do not have any withdrawal address on file, to add
                          a withdrawal address or use the profile settings tab..
                        </p>
                      </div>
                      <AddWithdrawal closeModal={closeModal} />
                    </div>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                    <div className="w-full flex flex-col ">
                      <div className="w-full flex flex-col  r">
                        <Dialog.Title
                          as="h3"
                          className="text-lg  font-bold text-left mt-4 leading-6 text-gray-900"
                        >
                          Withdraw
                        </Dialog.Title>
                        <Dialog.Title
                          as="h3"
                          className="text-lg   text-left mt-2 leading-6 text-gray-900"
                        >
                          Current Balance: ${balance}
                        </Dialog.Title>
                      </div>
                      <form className="mt-3 ">
                        <div className="w-full px-4 py-1  h-[56px] rounded-[8px] flex flex-col border border-[#D1D1D1]">
                          <label
                            htmlFor=""
                            className="text-[#AEAEAE] text-[12px]"
                          >
                            Amount
                          </label>
                          <input
                            type="text"
                            className="w-full h-full text-[#191919]  outline-none"
                            // defaultValue={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            // disabled={true}
                          />
                        </div>
                        <div className="w-full mt-4 px-4 bg-[#F2F2F7] py-1 h-[56px] rounded-[8px] flex flex-col border border-[#D1D1D1]">
                          <label
                            htmlFor=""
                            className="text-[#AEAEAE] text-[12px]"
                          >
                            Withrawal Address
                          </label>
                          <input
                            type="text"
                            defaultValue={withdrawal_add}
                            disabled={true}
                            placeholder={withdrawal_add}
                            className="w-full h-full outline-none bg-[#F2F2F7] text-[#AEAEAE]"
                          />
                        </div>
                        <div className="w-full mt-4">
                          <div className="lg:w-[60%] w-full px-4 py-1 h-[56px] rounded-[8px] flex flex-col border border-[#D1D1D1]">
                            <label
                              htmlFor=""
                              className="text-[#AEAEAE] text-[12px]"
                            >
                              PLease enter generated otp
                            </label>
                            <input
                              type="text"
                              className="w-full h-full outline-none"
                              onChange={(e) => setOtp(e.target.value)}
                              required
                            />
                          </div>
                          <div
                            onClick={generate_otp}
                            className="lg:w-[35%] w-[80%]  flex cursor-pointer items-center mt-2 space-x-3"
                          >
                            <HiOutlineKey className="text-[#00C805] w-5 h-5" />
                            <p className="text-[#00C805]">
                              Tap to Generate OTP
                            </p>
                            {loadingGenerate ? <ClipLoader size={16} /> : <></>}
                          </div>
                        </div>
                        <div className="w-full flex justify-center">
                          {!loadingWithdraw ? (
                            <button
                              onClick={withdraw_now}
                              type="button"
                              className="w-[189px] text-[#191919] h-[52px] font-semibold text-[16px] mt-4 button-shadow rounded-[8px] bg-[#00C805]"
                            >
                              Withdraw
                            </button>
                          ) : (
                            <button
                              disabled
                              type="button"
                              className="w-[189px] text-[#191919] h-[52px] font-semibold text-[16px] mt-4 button-shadow rounded-[8px] bg-[#00C805]"
                            >
                              <ClipLoader size={22} />
                            </button>
                          )}
                        </div>
                      </form>
                      {/* <AddWithdrawal closeModal={closeModal} /> */}
                    </div>
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cancel from "../../assets/Cancel.png";
import warn from "../../assets/warning.png";
import "../../styles/add-account.scss";
import "../../styles/settings.scss";
import Select from "react-select";
import puzzle from "../../assets/oc-puzzle.svg";
import { colourOptions } from "../../data/select";
import axios from "axios";
import { useEffect } from "react";
import { handleAddTradeAcct } from "../../redux/actions/tradeActions";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

export default function Migrate({
  addImg,
  btnColor,
  bg,
  bg2,
  shadow,
  cursor,
  disabled,

  borderWidth,
  borderStyle,
  borderColor,
  setShowAddAcctForm,
}) {
  let user_id;
  let token;
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  let [isOpen, setIsOpen] = useState(false);
  const [migratePrice, setMigratePrice] = useState("");
  const [migrateDeletePrice, setMigrateDeletePrice] = useState("");
  const getMigratePrice = async () => {
    try {
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=get_mig_price&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMigratePrice(data?.data?.data?.price);
      // console.log(data?.data?.data?.price);
    } catch (error) {
      console.log(error);
    }
  };

  const getMigrateDeletePrice = async () => {
    try {
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=get_mig_del_price&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMigrateDeletePrice(data?.data?.data?.price);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMigratePrice();
    getMigrateDeletePrice();
  }, []);
  console.log(migratePrice);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function deleteAcct() {
    Cookies.set("migration_type", 1);
    toast.success("Successful, please wait");
    setTimeout(() => {
      window.open("https://evergreenffxgiant.com/?i=1");
    }, 3000);
  }
  function keepAcct() {
    Cookies.set("migration_type", 0);
    toast.success("Successful, please wait");
    setTimeout(() => {
      window.open("https://evergreenffxgiant.com/?i=0");
    }, 3000);
  }
  console.log(migratePrice);
  //   let user_id;
  //   let token;

  //   const [seePass, setSeePass] = useState(false);
  //   const passwordInput = useRef("");

  //   const [account_name, setAccountName] = useState("");
  //   const [account_id, setAccountID] = useState("");
  //   const [account_password, setAccountPassword] = useState("");
  //   const [broker, setBroker] = useState("");
  //   const [brokerNo, setBrokerNo] = useState("");
  //   const [broker_server, setBrokerServer] = useState("");
  //   const [broker_server_id, setBrokerServerId] = useState("");
  //   const [brokerVal, setBrokerVal] = useState("");
  //   const [brokerArr, setBrokerArr] = useState([]);

  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const seePassword = () => {
  //     setSeePass(true);
  //     passwordInput.current.type = "text";
  //   };

  //   const hidePassword = () => {
  //     setSeePass(false);
  //     passwordInput.current.type = "password";
  //   };
  //   const userInfo = useSelector((state) => state.userInformation);
  //   const tokenVal = useSelector((state) => state.token);
  //   const addTrade = useSelector((state) => state.addTradeAcct);
  //   const [option2, setOption2] = useState([]);
  //   const [isSearchable, setIsSearchable] = useState(true);
  //   const [isDisabled, setIsDisabled] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isRtl, setIsRtl] = useState(false);
  //   const loading = addTrade.loading;

  //   if (userInfo.info) {
  //     user_id = userInfo.info[0]?.id;
  //   } else {
  //     user_id = userInfo.userInfo?.data[0]?.id;
  //   }
  //   if (tokenVal.userInfo) {
  //     token = tokenVal.userInfo?.token;
  //   } else {
  //     token = tokenVal;
  //   }
  //   const addTradeStatus = addTrade?.addStatus;

  //   const handleBrokerChange = (selectedOption) => {
  //     setBroker(selectedOption.value);
  //     setBrokerNo(selectedOption.number);
  //   };
  //   const handleServerChange = (selectedOption) => {
  //     setBrokerServer(selectedOption.value);
  //     setBrokerServerId(selectedOption.brokerid);
  //   };
  //   const handleMTdata = async (val) => {
  //     setIsLoading(true);
  //     setIsDisabled(true);
  //     try {
  //       const data = await axios.post(
  //         `https://brain.evergreenffx.com/v2/?action=get_${val}_server_list`
  //       );
  //       setBrokerArr(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsLoading(false);
  //     setIsDisabled(false);
  //     // console.log(val);
  //   };

  //   const newArr = brokerArr.data?.data?.map((item) => {
  //     return {
  //       value: item.server_name,
  //       label: item.server_name,
  //       brokerid: item.broker_id,
  //     };
  //   });

  //   const handleConnectToAI = (e) => {
  //     e.preventDefault();
  //     dispatch(
  //       handleAddTradeAcct(
  //         user_id,
  //         token,
  //         account_id,
  //         account_name,
  //         account_password,
  //         broker,
  //         brokerNo,
  //         broker_server,
  //         broker_server_id,
  //         toast
  //       )
  //     );
  //   };

  //   useEffect(() => {
  //     if (broker === "mt4") {
  //       handleMTdata("mt4");
  //     }
  //     if (broker === "mt5") {
  //       handleMTdata("mt5");
  //     }
  //   }, [broker]);

  //   useEffect(() => {
  //     if (addTradeStatus) {
  //       window.location.href = "/dashboard/trade";
  //     }
  //   }, [addTradeStatus]);

  return (
    <div className="add_acct_btn_wrapper">
      <button
        onClick={openModal}
        disabled={disabled}
        style={{
          color: btnColor,
          background: bg2,
          cursor: cursor,
          borderWidth: " 0.5px 2px 2px 0.5px",
          borderStyle: "solid",
          borderColor: "#191919",
        }}
        className="  flex space-x-3 bg-[#aeaeae] rounded-[8px] lg:mt-2 xl:mt-0 mt-[10px] justify-center items-center h-[48px]  px-4 "
      >
        Subscribe to Evergreenffx giant
      </button>

      {/* </div> */}

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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                  <div className="w-[100%] flex flex-col items-center ">
                    <div className="w-[90%] flex items-center justify-between ">
                      <h2 className="font-bold text-[18px]">
                        Migration Instructions
                      </h2>
                      <img src={cancel} alt="cancel" onClick={closeModal} />
                    </div>
                    <div className="text-lg mt-3 ">
                      <li className="list-disc">
                        You can delete your EvergreenFFX account and migrate to
                        EvergreenFFX GIANT for ${migrateDeletePrice}
                      </li>
                      <br />
                      <li className="list-disc">
                        You can keep your EvergreenFFX account and migrate to
                        EvergreenFFX GIANT for ${migratePrice}
                      </li>
                    </div>
                    <div className="w-full mt-10 flex flex-wrap justify-between">
                      <button
                        onClick={deleteAcct}
                        style={{
                          borderWidth: " 0.5px 2px 2px 0.5px",
                          borderStyle: "solid",
                          borderColor: "#191919",
                        }}
                        className="  flex space-x-3 bg-[#e4b003]   rounded-[8px] lg:mt-0  justify-center items-center h-[48px]  px-4 "
                      >
                        Delete account
                      </button>
                      <button
                        onClick={keepAcct}
                        style={{
                          borderWidth: " 0.5px 2px 2px 0.5px",
                          borderStyle: "solid",
                          borderColor: "#191919",
                        }}
                        className="  flex space-x-3 bg-[#00C805]   rounded-[8px] lg:mt-0  justify-center items-center h-[48px]  px-4 "
                      >
                        Keep account
                      </button>
                      <button
                        onClick={closeModal}
                        style={{
                          borderWidth: " 0.5px 2px 2px 0.5px",
                          borderStyle: "solid",
                          borderColor: "#191919",
                        }}
                        className="  flex space-x-3 bg-[#aeaeae] rounded-[8px] lg:mt-0 mt-[10px] justify-center items-center h-[48px]  px-4 "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

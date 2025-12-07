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
import { colourOptions, BrokersOptions } from "../../data/select";
import axios from "axios";
import { useEffect } from "react";
import { handleAddTradeAcct } from "../../redux/actions/tradeActions";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Migrate from "./MigrateToGiant";

export default function AddAccount({
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
  let [isOpen, setIsOpen] = useState(false);
  let brokerDetails = useRef();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  let user_id;
  let token;

  const [seePass, setSeePass] = useState(false);
  const passwordInput = useRef("");

  const [account_name, setAccountName] = useState("");
  const [account_id, setAccountID] = useState("");
  const [account_amount, setAccountAmount] = useState("");
  const [account_password, setAccountPassword] = useState("");
  const [broker, setBroker] = useState("");
  const [brokerNo, setBrokerNo] = useState("");
  const [broker_server, setBrokerServer] = useState("");
  const [broker_server_id, setBrokerServerId] = useState("");
  const [brokerVal, setBrokerVal] = useState("");
  const [brokerArr, setBrokerArr] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seePassword = () => {
    setSeePass(true);
    passwordInput.current.type = "text";
  };

  const hidePassword = () => {
    setSeePass(false);
    passwordInput.current.type = "password";
  };
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const addTrade = useSelector((state) => state.addTradeAcct);
  const [option2, setOption2] = useState([]);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const loading = addTrade.loading;

  if (userInfo.info) {
    user_id = userInfo.info?.id;
  } else {
    user_id = userInfo.userInfo?.data?.id;
  }
  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  const addTradeStatus = addTrade?.addStatus;

  const handleBrokerChange = (selectedOption) => {
    setBroker(selectedOption.value);
    setBrokerNo(selectedOption.number);
  };
  const handleServerChange = (selectedOption) => {
    let broker = brokerDetails.current.value;
    setBrokerServer(broker);
    
    for(let j=0; j<brokerArr.length; j++){
      if(BrokersOptions[j].value==broker){
        setBrokerServerId(BrokersOptions[j].number);
      }
    }
  };
  const handleMTdata = async (val) => {
    setIsLoading(true);
    setIsDisabled(true);
    try {
      // const data = await axios.post(
      //   `https://brain.evergreenffx.com/v2/?action=get_${val}_server_list`
      // );
      
      setBrokerArr(BrokersOptions);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsDisabled(false);
    // console.log(val);
  };

  const newArr = brokerArr.map((item) => {
    return {
      value: item.value,
      label: item.label,
      brokerid: item.number,
    };
  });

  const handleConnectToAI = (e) => {
    e.preventDefault();
    let subscription = Math.round(account_amount/1000)*30;
    dispatch(
      handleAddTradeAcct(
        user_id,
        token,
        account_id,
        account_name,
        account_password,
        broker,
        brokerNo,
        broker_server,
        broker_server_id,
        subscription,
        toast
      )
    );
  };

  useEffect(() => {
    if (broker === "mt4") {
      handleMTdata("mt4");
    }
    if (broker === "mt5") {
      handleMTdata("mt5");
    }
  }, [broker]);

  useEffect(() => {
    if (addTradeStatus) {
      window.location.href = "/dashboard/trade";
    }
  }, [addTradeStatus]);

  return (
    <div className="add_acct_btn_wrapper">
      <div className="flex justify-center flex-wrap lg:space-x-4 space-x-2 w-full">
        <button
          onClick={openModal}
          disabled={disabled}
          style={{
            color: btnColor,
            background: "#0088cc",
            cursor: cursor,
            borderStyle: "solid",
            borderColor: "#191919",
          }}
          className="flex space-x-3 bg-[#aeaeae] rounded-[8px] lg:mt-2 xl:mt-0 mt-[10px] justify-center items-center h-[48px]  px-4"
        >
          <img src={addImg} alt="image" />
          <span>Add account</span>
        </button>
        {/* <div>
          <Migrate
            // addImg={addImg}
            btnColor=" "
            bg={bg}
            bg2={bg2}
            shadow="2px 2px black"
            disabled={disabled}
            cursor={cursor}
          />
        </div> */}
      </div>

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
                <Dialog.Panel className="w-full max-w-xl transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                      <h2 className="font-bold text-[18px]">Add account</h2>
                      <img src={cancel} alt="cancel" onClick={closeModal} />
                    </div>

                    <form
                      className="w-[90%] mt-3 "
                      onSubmit={handleConnectToAI}
                    >
                      <div className=" w-full border py-1 border-[#d1d1d1]  px-2 rounded-[8px]">
                        <p className="text-[12px] text-[#aeaeae]">
                          Account Name
                        </p>
                        <input
                          type="text"
                          placeholder={account_name}
                          name="account_name"
                          // maxLength="25"
                          maxLength={25}
                          value={account_name}
                          onChange={(e) => setAccountName(e.target.value)}
                          required
                          className="w-full outline-none"
                        />
                      </div>
                      <div className="flex items-center w-full text-[#aeaeae] text-[13px]">
                        <img src={warn} alt="image" className="w-[6%] " />
                        Enter your desired account name
                      </div>

                      <div className=" w-full border py-1 mt-4 border-[#d1d1d1]  px-2 rounded-[8px]">
                        <p className="text-[12px] text-[#aeaeae]">Account ID</p>
                        <input
                          type="text"
                          placeholder="35485"
                          name="account_id"
                          value={account_id}
                          minLength={3}
                          onChange={(e) => setAccountID(Number(e.target.value))}
                          required
                          className="w-full outline-none"
                        />
                      </div>

                      <div className="flex items-center w-full text-[#aeaeae] text-[13px]">
                        <img src={warn} alt="image" className="w-[6%] " />
                        This is your MT4/MT5 trading account ID
                      </div>

                      <div className=" w-full border py-1 mt-4 border-[#d1d1d1]  px-2 rounded-[8px]">
                        <p className="text-[12px] text-[#aeaeae]">Dedicated Amount</p>
                        <input
                          type="text"
                          placeholder="1000"
                          name="account_amount"
                          value={account_amount}
                          minLength={3}
                          onChange={(e) => setAccountAmount(Number(e.target.value))}
                          required
                          className="w-full outline-none"
                        />
                      </div>

                      <div className="flex items-center w-full text-[#aeaeae] text-[13px]">
                        <img src={warn} alt="image" className="w-[6%] " />
                        This is the amount you wish to dedicate to be used for trading
                      </div>

                      <div className=" relative w-full border py-1 mt-4 border-[#d1d1d1]  px-2 rounded-[8px]">
                        <p className="text-[12px] text-[#aeaeae]">Password</p>
                        <input
                          type="password"
                          ref={passwordInput}
                          name="account_password"
                          value={account_password}
                          className="w-full outline-none bg-transparent"
                          onChange={(e) => setAccountPassword(e.target.value)}
                          required
                        />
                        <i className="absolute right-4">
                          {seePass ? (
                            <FiEyeOff
                              className="see-pass"
                              onClick={hidePassword}
                            />
                          ) : (
                            <IoEyeOutline
                              className="see-pass"
                              onClick={seePassword}
                            />
                          )}
                        </i>
                      </div>
                      <div className="flex items-center w-full text-[#aeaeae] text-[13px]">
                        <img src={warn} alt="image" className="w-[6%] " />
                        This is your MT4/MT5 trading account password
                      </div>
                      <Select
                        onChange={handleBrokerChange}
                        options={colourOptions}
                        required
                        className="mt-4"
                      />
                      {/* <Select
                        onChange={handleServerChange}
                        isLoading={isLoading}
                        isDisabled={isDisabled}
                        options={newArr}
                        required
                        className="mt-4 "
                      /> */}
                      <select onChange={handleServerChange} ref={brokerDetails} className="selectAccount" required>
                          {brokerArr.map((item, key)=>{
                            return <option key={key} name={item.number} value={item.value}>{item.label}</option>
                          })}
                      </select>
                      <div className="w-full mt-4 justify-center flex ">
                        {!loading ? (
                          <button
                            className="w-[153px] h-[52px] button-shadow rounded-[8px] bg-[#00c805] "
                            type="submit"
                          >
                            Connect
                          </button>
                        ) : (
                          <button
                            className="w-[153px] h-[52px] button-shadow rounded-[8px] bg-[#00c805] "
                            style={{ minWidth: "10ch" }}
                          >
                            <ClipLoader size={22} />
                          </button>
                        )}
                      </div>
                    </form>
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

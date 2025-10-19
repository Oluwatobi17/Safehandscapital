import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import logo from "../../assets/evergreenffs_logo.png";
import screen from "../../assets/Screen.png";
import cancel from "../../assets/Cancel.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
export default function Popup() {
  let [isOpen, setIsOpen] = useState(true);
  const [popupNotification, setPopupNotification] = useState(false);
  const [popUpData, setPopUpData] = useState({});
  function openModal() {
    setIsOpen(true);
  }

  const handleShowPopup = async () => {
    try {
      const response = await axios.post(
        "https://brain.evergreenffx.com/v2/?action=get_mobile_notification"
      );
      if (Cookies.get("popupStatus")) {
        return;
      } else {
        if (response.status === 200) {
          setPopupNotification(true);
          setPopUpData(response?.data.data);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleShowPopup();
  }, []);
  function closeModal() {
    setPopupNotification(false);
    Cookies.set("popupStatus", popupNotification);
  }

  return (
    <>
      <Transition appear show={popupNotification} as={Fragment}>
        <Dialog as="div" className="relative  z-50" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-[720px] px-3 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="md:flex relative hidden w-full h-full py-6 items-center">
                    <div className="w-[50%] h-full flex justify-center items-center  ">
                      <div className=" w-[340px] h-full flex flex-col justify-center  ">
                        <div>
                          <img src={logo} alt="" />
                          {/* <h1 className="mt-[10px] text-[22px] font-bold">
                            {popUpData.name}
                          </h1> */}
                          <h1 className="mt-[5px] text-[24px] font-bold">
                            {popUpData.title}
                          </h1>
                          <h3 className="mt-[5px] text-[19px] font-bold">
                            {popUpData.subtitle}
                          </h3>

                          <p
                            dangerouslySetInnerHTML={{
                              __html: popUpData?.body?.replace(/\n/g, "<br/>"),
                            }}
                            className="mt-[4px] text-[16px]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center  h-full">
                      <img
                        src={screen}
                        alt=""
                        className="w-[80%] object-cover"
                      />
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 "
                      >
                        <img src={cancel} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full  md:hidden h-full  flex flex-col">
                    <div className="h-[40%] mt-3 relative flex items-end justify-center w-full  ">
                      <img
                        src={popUpData.image}
                        alt=""
                        className=" w-[60%] object-cover"
                      />
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 "
                      >
                        <img src={cancel} alt="" />
                      </button>
                    </div>
                    <div className="w-[100%]  pt-4 pb-5 h-[50%] flex flex-col justify-center items-center">
                      <img src={logo} alt="" />

                      <h1 className="mt-[5px] text-[18px] font-bold">
                        {popUpData.title}
                      </h1>
                      <h3 className="mt-[5px] text-[16px] font-bold">
                        {popUpData.subtitle}
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: popUpData?.body?.replace(/\n/g, "<br/>"),
                        }}
                        className="mt-[4px] text-center text-[14px]"
                      />
                    </div>
                    <div className="w-full justify-center flex">
                      <button
                        onClick={closeModal}
                        className="w-[111px] bg-[#191919] rounded-[8px] text-white py-1 mb-3"
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
            {/* <div className="md:hidden bg-yellow-300 flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[319px] h-[450px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="w-full  md:hidden h-full flex flex-col">
                    <div className="h-[40%] relative flex items-end justify-center w-full  ">
                      <img
                        src={popUpData.image}
                        alt=""
                        className=" w-[70%] object-cover"
                      />
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 "
                      >
                        <img src={cancel} alt="" />
                      </button>
                    </div>
                    <div className="w-[100%] bg-[#FAFAFA] pt-4 pb-5 h-[60%] flex flex-col justify-center items-center">
                      <img src={logo} alt="" />

                      <h1 className="mt-[5px] text-[18px] font-bold">
                        {popUpData.title}
                      </h1>
                      <h3 className="mt-[5px] text-[16px] font-bold">
                        {popUpData.subtitle}
                      </h3>
                      <p className="mt-[4px] text-center text-[14px]">
                        {popUpData.body}
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div> */}
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

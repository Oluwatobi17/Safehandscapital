import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  BonusesTour,
  HarvestTour,
  HistoryTour,
  InvoicesTour,
  ReferralTour,
  TicketsTour,
  TrackPaymentTour,
  TradeTour,
} from "./tour/TourContent";

// import { set } from "js-cookie";
const TourGuide = ({
  page,
  setPage,
  ModalTitles,
  setCurrentPageTitle,
  position,
  setPosition,
  currentPageTitle,
}) => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setCurrentPageTitle("fjrj");
    setPage(9);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const PageDisplay = () => {
    if (page === 0) {
      setCurrentPageTitle("Trade");
      setPosition(
        "2xl:left-[15%] xl:left-[18%] lg:left-[22%] rounded-b-2xl rounded-tr-2xl lg:top-[165px] xl:left-[9%]"
      );
      return <TradeTour />;
    } else if (page === 1) {
      setCurrentPageTitle("History");
      setPosition(
        "2xl:left-[15%] xl:left-[18%] lg:left-[22%] rounded-b-2xl rounded-tr-2xl lg:top-[245px] xl:left-[9%]"
      );
      return <HistoryTour />;
    } else if (page === 2) {
      setCurrentPageTitle("Referrals");
      setPosition(
        "2xl:left-[15%] xl:left-[18%] lg:left-[22%] rounded-b-2xl rounded-tr-2xl lg:top-[300px]  xl:left-[9%]"
      );
      return <ReferralTour />;
    } else if (page === 3) {
      setCurrentPageTitle("Track Payments");
      setPosition(
        "2xl:left-[15%] xl:left-[18%] lg:left-[22%] rounded-br-2xl rounded-t-2xl lg:top-[365px]  xl:left-[9%]"
      );
      return <TrackPaymentTour />;
    } else if (page === 4) {
      setCurrentPageTitle("Bonuses");
      setPosition(
        "2xl:left-[15%] xl:left-[18%] lg:left-[22%] lg:top-[200px] rounded-br-2xl rounded-t-2xl xl:left-[9%]"
      );
      return <BonusesTour />;
    } else if (page === 5) {
      setCurrentPageTitle("Invoices");
      setPosition(
        "2xl:left-[15%] xl:left-[18%] lg:left-[22%] lg:top-[260px] rounded-br-2xl rounded-t-2xl  xl:left-[9%]"
      );
      return <InvoicesTour />;
    } else if (page === 6) {
      setCurrentPageTitle("Harvest");
      setPosition(
        "2xl:left-[15%] xl:left-[18%] lg:left-[22%] lg:top-[390px] rounded-br-2xl rounded-t-2xl  xl:left-[9%]"
      );
      return <HarvestTour />;
    } else if (page === 7) {
      setCurrentPageTitle("Tickets");
      setPosition(
        "2xl:left-[15%] xl:left-[18%] lg:left-[22%] lg:top-[380px] rounded-br-2xl rounded-t-2xl  xl:left-[9%]"
      );
      return <TicketsTour />;
    }
  };
  const closeee = () => {};
  return (
    <div className>
      {" "}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100] lg:flex hidden"
          onClose={closeee}
        >
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
                <Dialog.Panel
                  className={`${position}  absolute w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  {ModalTitles?.map((titles, index) => {
                    return (
                      <div className="flex items-center justify-between">
                        {index === page && (
                          <>
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              <span className="font-bold text-xl">
                                {titles?.title}
                              </span>
                            </Dialog.Title>

                            <div className="w-[20%]">
                              <img src={titles?.img} alt="" />
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}

                  <div className="mt-6">
                    <p className="text-lg ">{PageDisplay()}</p>
                  </div>
                  <div className="w-full mt-4 flex justify-between items-center">
                    <div className=" flex gap-x-6">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled={page === 0}
                        onClick={() => {
                          setPage((currPage) => currPage - 1);
                        }}
                      >
                        Prrevious
                      </button>
                      <button
                        type="button"
                        disabled={page === ModalTitles.length - 1}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setPage((currPage) => currPage + 1);
                        }}
                      >
                        Next
                      </button>
                    </div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      End tour
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TourGuide;

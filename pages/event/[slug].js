import Image from "next/image";
import React, { useRef, useState } from "react";
import moment from "moment";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import { MdPlace } from "react-icons/md";
import Footer from "../../components/footer/Footer";
import eventbg from "../../assets/img/eventbg.svg";
import smallEvent from "../../assets/img/smalleventbg.svg";
import proimg from "../../assets/img/proimg.svg";
import BookingModal from "../../components/modal/BookingModal";
import {
  IoPricetag,
  IoCalendarOutline,
  IoLocationOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import {
  RiFacebookFill,
  RiLinkedinLine,
  RiTwitterFill,
  RiInstagramFill,
  RiHeart3Line,
} from "react-icons/ri";
import { MdOnlinePrediction } from "react-icons/md";
import ApiMiddleware from "../../utils/ApiMiddleware";
import { Map } from "../../components/google/Map";
import { InfoBox, MarkerF } from "@react-google-maps/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineArrowRight,
  AiOutlineHeart,
} from "react-icons/ai";
import { bookMarkedApi } from "../../Redux/bookmarked/bookMarkedSlice";
import { Toaster } from "react-hot-toast";
import { getAccessToken } from "../../utils/helper";
import { eventForMeApi } from "../../Redux/bookmarked/eventForMe";
import Card from "../../components/homecard/Card";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import headerLogo from "../../assets/img/header_logo.svg";
import { RWebShare } from "react-web-share";
import Head from "next/head";
import { useLayoutEffect } from "react";

const SingleEvent = (props) => {
  const dispatch = useDispatch();
  const token = getAccessToken();
  const { bookid, isLoading, detailspage } = useSelector((state) => ({
    bookid: state.eventForMeSlice.bookid,
    isLoading: state.bookMarkedSlice.isLoading,
    detailspage: state.bookMarkedSlice.detailspage,
  }));
  const [sticky, setSticky] = useState("");
  const chnageBookmark = (event, id, values) => {
    event.stopPropagation();

    dispatch(bookMarkedApi({ id: id, marked: values, detail: true }));
  };
  const position = useRef();
  // const scroll = process.browser && window.pageYOffset;
  useEffect(() => {
    if (token) {
      !bookid && dispatch(eventForMeApi());
    }
  }, []);
  const router = useRouter();

  if (typeof document !== "undefined" && router.route === "/event/[slug]") {
    document.onscroll = () => {
      window.pageYOffset > position?.current?.offsetParent?.offsetTop
        ? setSticky(true)
        : setSticky(false);
    };
  }

  return (
    <>
      <Head>
        <meta
          name="og:image"
          content={
            props?.data?.coverImage ? props?.data?.coverImage : headerLogo
          }
        />
        <meta name="og:title" content={props?.data?.name} />
        <meta name="og:title" property="og:title" content={props?.data?.name} />
        <meta name="og:description" content={props?.data?.description} />
        <meta
          name="og:description"
          property="og:description"
          content={props?.data?.description}
        />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="630" />
      </Head>
      <Head>
        <meta
          name="og:image"
          content={
            props?.data?.coverImage ? props?.data?.coverImage : headerLogo
          }
        />
        <meta name="og:title" content={props?.data?.name} />
        <meta name="og:title" property="og:title" content={props?.data?.name} />
        <meta name="og:description" content={props?.data?.description} />
        <meta
          name="og:description"
          property="og:description"
          content={props?.data?.description}
        />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="630" />
      </Head>
      <div className="mx-auto">
        <div className="sticky top-0 z-50 bg-bg-blue">
          <HeaderTransparentevent
            headerStyle="bg-bg-blue absolute ite"
            textStyle="text-black"
          />
        </div>
        {sticky && (
          <div className="fixed w-full z-[30] top-[158px] xxl:top-[158px] xl:top-[158px] lg:top-[158px] md:top-[158px] sm:top-[150px] ms:top-[60px] ">
            <div className="w-full flex justify-center bg-white drop-shadow-eventBox">
              <div className=" px-30 pt-20  absolute bottom-full bg-white pb-20 ms:pb-5 ms:relative w-full mx-auto">
                <div className="mx-auto max-w-2xl flex justify-between ms:flex-col">
                  <div className="flex flex-col md:gap-5 w-65 ms:w-full">
                    <p className="font-500 font-poppins text-sm text-black ms:text-black">
                      {moment(props?.data?.startDate).format(
                        "dddd MMM Do YYYY"
                      )}
                    </p>
                    <p className="font-600 font-poppins text-22 xxl:text-22 xl:text-22 lg:text-22 md:text-[18px] sm:text-[18px] ms:text-[18px] leading-33 text-black ms:w-full ms:text-black ms:overflow-hidden ms:text-ellipsis ms:truncate sm:overflow-hidden sm:text-ellipsis sm:truncate xxl:overflow-hidden xxl:text-ellipsis xxl:truncate 2xl:overflow-hidden 2xl:text-ellipsis 2xl:truncate truncate">
                      {props?.data?.name}
                    </p>
                  </div>
                  <div className="flex gap-30 ms:gap-15 sm:gap-15 xs:gap-15 lg:gap-30 xl:gap-30 xxl:gap-30 justify-end items-end ms:flex-row-reverse ms:py-5 md:items-center lg:items-end xxl:items-end 2xl:items-end w-35">
                    <div className="p-5 rounded-full cursor-pointer border-1 border-solid border-likebtn ">
                      {bookid?.includes(props?.data.id) ? (
                        <>
                          {!detailspage ? (
                            <AiFillHeart
                              color="#23C5FF"
                              size={20}
                              onClick={(e) =>
                                chnageBookmark(e, props?.data.id, false)
                              }
                            />
                          ) : (
                            <Oval
                              color="#FFFFFF"
                              // secondaryColor="#FAFAFA"
                              height={14}
                              width={14}
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {!detailspage ? (
                            <AiOutlineHeart
                              fill="#23C5FF"
                              size={20}
                              onClick={(e) =>
                                chnageBookmark(e, props?.data.id, true)
                              }
                            />
                          ) : (
                            <Oval
                              color="#FFFFFF"
                              // secondaryColor="#FAFAFA"
                              height={14}
                              width={14}
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div
                      className=""
                      onClick={(event) => event.stopPropagation()}
                    >
                      <BookingModal
                        EventTicket={props?.data?.EventTicket}
                        id={props?.data?.id}
                        data={props?.data}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="relative  mx-auto">
          <div className="relative">
            <div className="bg-detail-background-img w-full h-full">
              <Image
                src={
                  props?.data?.coverImage ? props?.data?.coverImage : headerLogo
                }
                alt="Picture of an event"
                width={1440}
                height={522}
                className="-z-10 shadow-[0px_2px_8px_rgba(0,0,0,0.1),0px_16px_24px_rgba(0,0,0,0.7)]"
                layout="responsive"
              />
            </div>
            <div className="h-full -top-6 w-full absolute bg-event-background-img ms:hidden sm:hidden"></div>
          </div>
          <div className="px-80 w-full max-w-2xl mx-auto md:px-20 lg:px-80 xxl:px-80 2xl:px-80 lg:flex-row md:flex-col-reverse flex gap-34 lg:gap-34 xxl:gap-34 2xl:gap-34 md:gap-0 sm:gap-0 ms:flex-col-reverse ms:px-20 sm:flex-col-reverse sm:px-20 ">
            <div className="flex flex-col gap-25 ms:rounded-5 sm:rounded-5 md:rounded-5 lg:rounded-b-5 xxl:rounded-b-5 2xl:rounded-b-5 lg:rounded-t-none xxl:rounded-t-none 2xl:rounded-t-none bg-blue-eventbox  ms:bg-transparent lg:max-w-392 xxl:max-w-392 2xl:max-w-392 md:w-full relative backdrop-blur-37.5 ms:backdrop-blur-0 drop-shadow-eventBox max-h-[500px]">
              <div className="absolute w-full bottom-full h-232 w-392 ms:hidden sm:hidden md:hidden lg:block xxl:block 2xl:block">
                <Image
                  src={
                    props?.data?.coverImage
                      ? props?.data?.coverImage
                      : headerLogo
                  }
                  alt="Picture of an event"
                  width={392}
                  height={232}
                  layout="responsive"
                />
              </div>
              <div className="px-62 md:px-20 ms:px-20 pt-25 md:pb-25 flex flex-col gap-25">
                <div className="flex gap-17">
                  <div className="flex mt-5">
                    <IoPricetag size={20} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-500 font-poppins text-lg text-black">
                      Price
                    </p>
                    <p className="font-400 font-poppins text-sm text-black">
                      {props?.data?.EventTicket[0]?.price > 0
                        ? `Starts from RM ${props?.data?.EventTicket[0]?.price}`
                        : "Free"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-17">
                  <div className="flex mt-5">
                    <IoCalendarOutline size={20} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-500 font-poppins text-lg text-black">
                      Date and Time
                    </p>
                    <p className="font-400 font-poppins text-sm text-black md:w-full lg:max-w-300 ">
                      {moment(props?.data?.startDate).format(
                        "dddd MMM Do YYYY"
                      )}
                      -
                    </p>
                    <p className="font-400 font-poppins text-sm text-black md:w-full lg:max-w-300 ">
                      {moment(props?.data?.endDate).format("dddd MMM Do YYYY")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-17">
                  <div className="flex mt-5">
                    {props?.data?.isVirtual ? (
                      <MdOnlinePrediction size={20} />
                    ) : (
                      <IoLocationOutline size={20} />
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-500 font-poppins text-lg text-black">
                      {props?.data?.isVirtual ? "Online" : "Location"}
                    </p>
                    <p className="font-400 font-poppins text-sm text-black md:w-full lg:max-w-231 xxl:max-w-231 2xl:max-w-231">
                      {props?.data?.isVirtual
                        ? "This event is hosted online."
                        : `${
                            props?.data?.venueName[0].toUpperCase() +
                            props?.data?.venueName.slice(1)
                          }, ${
                            props?.data?.address[0].toUpperCase() +
                            props?.data?.address.slice(1)
                          }, ${
                            props?.data?.city[0].toUpperCase() +
                            props?.data?.city.slice(1)
                          }, ${
                            props?.data?.state[0].toUpperCase() +
                            props?.data?.state.slice(1)
                          }, ${
                            props?.data?.country[0].toUpperCase() +
                            props?.data?.country.slice(1)
                          }`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-17">
                  <div className="flex mt-5">
                    <IoShareSocialOutline size={20} />
                  </div>
                  <div className="flex flex-col gap-13">
                    <p className="font-500 font-poppins text-lg text-black">
                      Share with friends
                    </p>
                    <div className="flex gap-30">
                      <RWebShare
                        data={{
                          title: "Yadvartta -Let's make live happen",
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <RiFacebookFill
                          size={16}
                          fill="#003F89"
                          className="cursor-pointer"
                        />
                      </RWebShare>
                      <RWebShare
                        data={{
                          title: "Yadvartta -Let's make live happen",
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <RiLinkedinLine
                          size={16}
                          fill="#003F89"
                          className="cursor-pointer"
                        />
                      </RWebShare>
                      <RWebShare
                        data={{
                          title: "Yadvartta -Let's make live happen",
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <RiTwitterFill
                          size={16}
                          fill="#003F89"
                          className="cursor-pointer"
                        />
                      </RWebShare>
                      <RWebShare
                        data={{
                          title: "Yadvartta -Let's make live happen",
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <RiInstagramFill
                          size={16}
                          fill="#003F89"
                          className="cursor-pointer"
                        />
                      </RWebShare>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-29 mb-16 border-solid border-t-0.8 border-eventbox-br md:hidden lg:block 2xl:block xxl:block">
                <div className="pt-16 flex justify-center items-center">
                  <div className="flex gap-26">
                    <Image
                      src={proimg ? proimg : headerLogo}
                      alt="Picture of an event"
                      width={60}
                      height={60}
                    />
                    <div>
                      <p className="font-500 font-poppins text-lg text-black">
                        Organized By:
                      </p>
                      <p className="font-400 font-poppins text-sm text-black">
                        {props?.data?.organization?.name.replace(
                          / *\([^)]*\) */g,
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-full lg:max-w-800 xxl:max-w-800 2xl:max-w-800 relative">
              {!sticky && (
                <div className="flex justify-between absolute bottom-full w-full pb-37 ms:py-5 ms:relative ms:flex-col">
                  <div className="flex flex-col md:gap-5 w-54 ms:w-full">
                    <p className="font-500 font-poppins text-sm text-white ms:text-black">
                      {moment(props?.data?.startDate).format(
                        "dddd MMM Do YYYY"
                      )}
                    </p>
                    <p className="font-600 font-poppins text-22 xxl:text-22 xl:text-22 lg:text-22 md:text-[18px] sm:text-[18px] ms:text-[18px] leading-33  text-white ms:w-full ms:text-black ms:overflow-hidden ms:text-ellipsis ms:truncate sm:overflow-hidden sm:text-ellipsis sm:truncate xxl:overflow-hidden xxl:text-ellipsis xxl:truncate 2xl:overflow-hidden 2xl:text-ellipsis 2xl:truncate truncate ">
                      {props?.data?.name}
                    </p>
                    <div className="hidden ms:hidden sm:hidden md:block lg:hidden xxl:hidden 2xl:hidden">
                      <div className="flex gap-20">
                        <Image
                          src={proimg ? proimg : headerLogo}
                          alt="Picture of an event"
                          width={60}
                          height={60}
                        />
                        <div>
                          <p className="font-500 font-poppins text-lg text-white">
                            Organized By:
                          </p>
                          <p className="font-400 font-poppins text-sm text-white">
                            {props?.data?.organization?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-30 ms:gap-15 sm:gap-15 xs:gap-15 lg:gap-30 xl:gap-30 xxl:gap-30 justify-end items-end ms:flex-row-reverse ms:py-5 md:items-center lg:items-end xxl:items-end 2xl:items-end w-35">
                    <div className="p-5 rounded-full cursor-pointer border-1 border-solid border-likebtn">
                      {bookid?.includes(props?.data.id) ? (
                        <>
                          {!detailspage ? (
                            <AiFillHeart
                              color="#23C5FF"
                              size={20}
                              onClick={(e) =>
                                chnageBookmark(e, props?.data.id, false)
                              }
                            />
                          ) : (
                            <Oval
                              color="#FFFFFF"
                              // secondaryColor="#FAFAFA"
                              fill=""
                              height={14}
                              width={14}
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {!detailspage ? (
                            // <div className="text-[#23c5ff] ms:text-[#23c5ff] sm:text-white  md:text-white lg:text-white xl:text-white xxl:text-white ">
                            <AiOutlineHeart
                              fill="#23C5FF"
                              size={20}
                              onClick={(e) =>
                                chnageBookmark(e, props?.data.id, true)
                              }
                            />
                          ) : (
                            // </div>
                            <Oval
                              // secondaryColor="#FAFAFA"
                              color="#FFFFFF"
                              height={14}
                              width={14}
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div
                      className=""
                      onClick={(event) => event.stopPropagation()}
                    >
                      <BookingModal
                        EventTicket={props?.data?.EventTicket}
                        id={props?.data?.id}
                        data={props?.data}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div
                ref={position}
                className="flex flex-col gap-25 ms:gap-16 py-33 ms:py-5"
              >
                <p className="font-500 ms:font-bold font-poppins text-30 ms:text-20 leading-45 text-black">
                  About this event
                </p>
                {props?.data?.description.split("<br/>").map((data, index) => {
                  return (
                    <p
                      className="font-300 max-w-[760px] font-poppins text-base md:text-[18px] sm:text-[16px] ms:text-[12px] text-black"
                      key={index}
                    >
                      {data.replace(/(<([^>]+)>)/gi, "")}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          {props?.data?.latitude && props?.data?.longitude && (
            <div className="ms:pb-20 sm:pb-20 md:pb-20 lg:pb-50 2xl:pb-50 mt-15">
              <Map
                center={{
                  lat: props?.data?.latitude,
                  lng: props?.data?.longitude,
                }}
                mapContainerStyle={{
                  height: "400px",
                  width: "100%",
                }}
                zoom={10}
              >
                <MarkerF
                  position={{
                    lat: props?.data?.latitude,
                    lng: props?.data?.longitude,
                  }}
                  className="hover:text-black"
                />
              </Map>
            </div>
          )}
          <div className="flex gap-10 w-full max-w-2xl mx-auto flex-col px-10 pb-90">
            <div className="flex justify-between">
              <div className="text-black  lg:text-28 text-20 leading-10 sm:text-20 sm:leading-10 md:text-28 md:leading-48 font-medium">
                Similar Events
              </div>
              <div
                className="flex items-center justify-center gap-7 text-base leading-8 sm:text-base sm:leading-8  md:text-20 md:leading-8 font-normal text-black cursor-pointer"
                onClick={() =>
                  router.replace(`/categories/${props?.data?.category?.slug}`)
                }
              >
                <div>View all</div>

                <AiOutlineArrowRight />
              </div>
            </div>

            <div
              className="grid sm:grid-cols-2 gap-30 md:grid-cols-3 lg:grid-cols-4 ms:grid-cols-1 "
              key={1}
            >
              {props?.upcoming?.map((data, index) => (
                <div key={index + data.id}>
                  <Card data={data} index={index} bookMarkedEvents={bookid} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  if (query.slug) {
    try {
      const data = await ApiMiddleware.get(
        `${process.env.NEXT_PUBLIC_baseURL}/event/${query?.slug}`
      );

      const upcoming = await ApiMiddleware.get(
        `/event/upcoming/?eventId=${data?.data?.data?.id}&limit=8`
      );
      return {
        props: {
          data: data?.data?.data,
          upcoming: upcoming?.data?.data,
        },
      };
    } catch (er) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
export default SingleEvent;

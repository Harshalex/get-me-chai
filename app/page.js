import chaiImg from "../public/tea.gif";
import man from "../public/man.gif";
import coin from "../public/coin.gif";
import group from "../public/group.gif";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="h-[42vh]  text-white flex flex-col gap-2 justify-center items-center">
        <div className="flex justify-between items-center gap-2">
          <h1 className="font-bold text-4xl py-4">Buy Me A Chai</h1>
          <span className="w-[80px]">
            <Image src={chaiImg} alt="chai" />
          </span>
        </div>
        <p className="font-semibold">
          A crowd Funding Platform for creators.Get Funded by your Fans and
          Followers.Start Now!
        </p>
        <div className="flex gap-6">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start Here
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="h-1 bg-white opacity-10"></div>
      <div className=" text-white py-8">
        <h2 className="text-center py-6 font-bold text-2xl">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex justify-around items-center py-7">
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="w-[80px]">
              <Image
                className="bg-slate-600 p-2 rounded-full"
                src={man}
                alt="chai"
              />
            </span>
            <p className="font-bold">Fans want to help</p>
            <p>Your fans are available to help you</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="w-[80px]">
              <Image
                className="bg-slate-600 p-2 rounded-full"
                src={coin}
                alt="chai"
              />
            </span>
            <p className="font-bold">Fans want to help</p>
            <p>Your fans are available to help you</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="w-[80px]">
              <Image
                className="bg-slate-600 p-2 rounded-full"
                src={group}
                alt="chai"
              />
            </span>
            <p className="font-bold">Fans want to help</p>
            <p>Your fans are available to help you</p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-white opacity-10"></div>
      <div className="flex flex-col justify-center items-center gap-8 py-8">
        <h3 className="text-white text-2xl font-bold">Learn More About Us !</h3>
        <iframe
          className="pb-5"
          width="400"
          height="235"
          src="https://www.youtube.com/embed/QtaorVNAwbI?si=sRWlFN2EojsevcVX"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </>
  );
}

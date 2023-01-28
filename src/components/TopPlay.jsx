import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import "swiper/css";
import "swiper/css/free-mode";

// const TopChartCard = ({ song, i, isPlaying, activeSong,handlePause,handlePlay }) => {
//   <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-poiter mb-2">
//     <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
//     <div className="flex-1 flex flex-row justify-between items-center">
//       <img
//         src={song?.images?.coverart}
//         alt={song?.title}
//         className="w-20 h-20 rounded-lg"
//       />
//       <div className="flex-1 flex flex-col justify-center mx-4">
//         <Link to={`/song/${song?.key}`}>
//           <p className="text-xl font-bold text-white">{song?.title}</p>
//         </Link>
//         <Link to={`/artists/${song?.artists[0]?.adamid}`}>
//           <p className="text-ase text-gray-300 mt-1">{song?.subtitle}</p>
//         </Link>
//       </div>
//     </div>
//   </div>;

// <TopChartCard
// key={song.key}
// song={song}
// i={i}
// isPlaying={isPlaying}
// activeSong={activeSong}
// handlePauseClick={handlePauseClick}
// handlePlaylick={handlePlaylick}
// />
// };

const TopPlay = () => {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlaylick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    divRef.current.scrollIntoView({
      behavior: "smooth",
    });
  });

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        {/* Top Chart component */}
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {data?.slice(0, 5)?.map((song, i) => (
            <>
              <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-poiter mb-2">
                <h3 className="font-bold text-base text-white mr-3">
                  {i + 1}.
                </h3>
                <div className="flex-1 flex flex-row justify-between items-center">
                  <img
                    src={song?.images?.coverart}
                    alt={song?.title}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="flex-1 flex flex-col justify-center mx-4">
                    <Link to={`/song/${song?.key}`}>
                      <p className="text-xl font-bold text-white">
                        {song?.title}
                      </p>
                    </Link>
                    <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                      <p className="text-ase text-gray-300 mt-1">
                        {song?.subtitle}
                      </p>
                    </Link>
                  </div>
                </div>
                <PlayPause
                  song={song}
                  handlePause={handlePauseClick}
                  handlePlay={() => {
                    handlePlaylick(song, i);
                  }}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                />
              </div>
            </>
          ))}
        </div>

        {/* Top Artists component */}
        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>

          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {data?.slice(0, 10)?.map((song, i) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slide-in-right"
              >
                <Link to={`/artist/${song?.artists[0].adamid}`}>
                  <img
                    src={song?.images.background}
                    alt="name"
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopPlay;

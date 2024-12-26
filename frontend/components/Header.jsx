"use client";

import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css/bundle";
import Image from "next/image";
import API_URL from "@/utils/api-url";
export default function Header({ banner }) {
  console.log(banner)
  return (
    <div>
      <Swiper
        slidesPerView={1}
        className="w-full h-96 rounded-xl shadow-lg border"
        modules={[Navigation, A11y, Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          type: "bullets",
        }}
      >
        {banner && banner.length > 0 ? (
          <>
            {banner.map((item) => (
              <SwiperSlide key={item.id}>
                <Image
                  src={`${API_URL}/storage/${item.image_url}`}
                  alt="gambar banner"
                  width={1000}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            <SwiperSlide className="bg-red-600 w-full h-full">
              <Image
                src={"/images/makanan-khas-aceh.jpg"}
                alt="mie-aceh"
                width={1000}
                height={500}
                className="w-full h-full object-fill"
              />
            </SwiperSlide>
            <SwiperSlide className="bg-red-600 w-full h-full">
              <Image
                src={"/images/makanan-aceh.jpg"}
                alt="makanan aceh"
                fill
                className="w-full h-full object-fill"
              />
            </SwiperSlide>
          </>
        )}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
}

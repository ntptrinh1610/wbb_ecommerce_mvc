import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { TbTruckDelivery } from "react-icons/tb";
import AdsBannerSlider from "../../components/AdsBannerSlider";

import { Tab, Box, Tabs } from "@mui/material";
import ProductsSlider from "../../components/ProductsSlider";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { Swiper, SwiperSlide } from "swiper/react";
import BlogItem from "../../components/BlogItem";
import Footer from "../../components/Footer";
import HomeSliderV2 from "../../components/HomeSliderV2";
import BannerBoxV2 from "../../components/bannerBoxV2";
import AdsBannerSliderV2 from "../../components/AdsBannerSliderV2";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";
import ProductLoading from "../../components/Loading";
import BannerLoading from "../../components/Loading/bannerLoading";

const Home = () => {
  const [value, setValue] = useState(1);
  const [homeSlideData, setHomeSlideData] = useState([]);
  const [popularProductData, setPopularProductData] = useState([]);
  const [allProductsData, setAllProductsData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bannerV1Data, setBannerV1Data] = useState([]);
  const [blogData, setBlogData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi(`/api/homeSlider`).then((res) => {
      setHomeSlideData(res?.data);
    });
    fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
      setAllProductsData(res?.products);
    });
    fetchDataFromApi(`/api/product/getFeaturesProducts`).then((res) => {
      setFeaturedProducts(res?.products);
    });
    fetchDataFromApi(`/api/bannerV1`).then((res) => {
      setBannerV1Data(res?.data);
    });
    fetchDataFromApi(`/api/blog`).then((res) => {
      setBlogData(res?.data);
    });
    // setProductData(context?.productData);
  }, []);

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`
    ).then((res) => {
      if (!res?.error) {
        console.log(res);
        setPopularProductData(res?.products);
      }
    });
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setPopularProductData([]);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (!res?.error) {
        setPopularProductData(res?.products);
      }
    });
  };
  return (
    <>
      <div className="min-h-[28vh] lg:min-h-[65vh] relative ">
        {homeSlideData?.length !== 0 ? (
          <HomeSlider data={homeSlideData} />
        ) : (
          <BannerLoading />
        )}
      </div>

      <section className="py-6 bg-white ">
        <div className="container flex flex-col gap-5 lg:flex-row ">
          <div className="part1 w-full lg:w-[70%]">
            {allProductsData?.length !== 0 && (
              <HomeSliderV2 data={allProductsData} />
            )}
          </div>
          <div className="part2 scrollableBox w-full flex-row lg:w-[30%] flex items-center justify-between lg:flex-col gap-5">
            <BannerBoxV2
              info="left"
              img="https://down-vn.img.susercontent.com/file/sg-11134201-7rd3z-m6nuc9y5zukya3@resize_w900_nl.webp"
            />
            <BannerBoxV2
              info="left"
              img="https://down-vn.img.susercontent.com/file/sg-11134201-7rd5v-m6ntwexxlg0kc0@resize_w900_nl.webp"
            />
          </div>
        </div>
      </section>
      {context?.catData?.length !== 0 && (
        <HomeCatSlider data={context?.catData} />
      )}
      <section className="bg-white py-8">
        <div className="container w-full ">
          <div className="lg:flex-row flex-col flex items-center justify-between ">
            <div className="leftSec w-full lg:w-[40%] ">
              <h2 className="text-[14px] md:text-[16px] lg:text-[20px] font-[600]">
                Popular Product
              </h2>
              <p className="text-[12px] md:text-[14px] font-[400] mx-0 ">
                Grab this exclusive deal before it’s gone!
              </p>
            </div>
            <div className="rightSec w-full lg:w-[60%] ">
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="scrollable auto tabs example"
                >
                  {context?.catData?.length !== 0 &&
                    context?.catData?.map((item, index) => {
                      return (
                        <Tab
                          key={index}
                          label={item?.name}
                          value={index}
                          onClick={() => filterByCatId(item?._id)}
                        />
                      );
                    })}
                </Tabs>
              </Box>
            </div>
          </div>

          {popularProductData?.length === 0 && <ProductLoading />}

          {popularProductData?.length !== 0 && (
            <ProductsSlider items={5} data={popularProductData} />
          )}
        </div>
      </section>
      <section className="lg:py-16 p-0 bg-white">
        <div className="container">
          <div className="freeShipping flex-col lg:flex-row lg:w-[80%] w-full m-auto pt-4 pb-0 border-2 border-mocha-mousse flex items-center justify-center lg:justify-between rounded-md mb-5">
            <div className="col1 flex items-center gap-4">
              <TbTruckDelivery className="text-[30px] lg:text-[50px]" />
              <span className="text-[18px] lg:text-[20px] font-[600] uppercase">
                Free shipping
              </span>
            </div>
            <div className="col2">
              <p className="mb-0 font-[500] text-[20px] lg:text-[25px] ">
                Free Deliver Now On Your First Order And Over $2000
              </p>
            </div>
          </div>
          {/* <AdsBannerSlider items={5} /> */}
          {bannerV1Data?.length !== 0 && (
            <AdsBannerSliderV2 items={4} data={bannerV1Data} />
          )}
        </div>
      </section>
      <section className="py-2 lg:py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Lastest Product</h2>
          {allProductsData?.length === 0 && <ProductLoading />}

          {allProductsData?.length !== 0 && (
            <ProductsSlider items={5} data={allProductsData} />
          )}
          {bannerV1Data?.length !== 0 && (
            <AdsBannerSlider items={3} data={bannerV1Data} />
          )}
        </div>
      </section>
      <section className="py-2 lg:py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Featured Product</h2>
          {featuredProducts?.length === 0 && <ProductLoading />}

          {featuredProducts?.length !== 0 && (
            <ProductsSlider items={5} data={featuredProducts} />
          )}
        </div>
      </section>
      {blogData?.length !== 0 && (
        <section className="py-2 lg:py-5 pt-0 pb-8 bg-white blogSection">
          <div className="container">
            <h2 className="text-[20px] font-[600] mb-4">Blog</h2>
            <Swiper
              className="blogSlider"
              navigation={context?.windowWidth < 992 ? false : true}
              modules={[Navigation, FreeMode]}
              spaceBetween={15}
              freeMode={true}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                450: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                750: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
            >
              {blogData?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <BlogItem item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;

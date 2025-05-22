import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductItem from "../../components/ProductItem";

import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";

import {
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
  Pagination,
  Rating,
  TextField,
  CircularProgress,
} from "@mui/material";
import ProductItemListView from "../../components/ProductItemListView";
import ProductZoom from "../../components/ProductZoom";
import ProductsSlider from "../../components/ProductsSlider";
import ProductInfo from "../../components/ProductInfo";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Reviews from "./reviews";
import ProductLoading from "../../components/Loading";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const ProductDetails = () => {
  const [productActionIndex, setProductActionIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [relatedProductData, setRelatedProductData] = useState([]);

  const { id } = useParams();
  const reviewSec = useRef();

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (!res?.error) {
        setProductData(res?.data);
        setIsLoading(false);
        fetchDataFromApi(
          `/api/product/getAllProductsBySubCatId/${res?.data?.subCatId}`
        ).then((res) => {
          if (!res?.error) {
            const filteredData = res?.products?.filter(
              (item) => item._id !== id
            );
            setRelatedProductData(filteredData);
            console.log(filteredData?.length);

            setIsLoading(false);
          }
        });
      }
    });
    fetchDataFromApi(`/api/user/getAllReviews?productId=${id}`).then((res) => {
      if (!res?.error) {
        setReviewsCount(res?.data?.length);
      }
    });
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchDataFromApi(`/api/product/${id}`).then((res) => {
  //     if (!res?.error) {
  //       setProductData(res?.data);
  //       setIsLoading(false);
  //       fetchDataFromApi(
  //         `/api/product/getAllProductsBySubCatId/${res?.data?.subCatId}`
  //       ).then((res) => {
  //         if (!res?.error) {
  //           setRelatedProductData(res?.products?.data);
  //           setIsLoading(false);
  //         }
  //       });
  //     }
  //   });
  // }, [id]);

  const gotoReviews = () => {
    window.scrollTo({
      top: reviewSec?.current.offsetTop,
      behavior: "smooth",
    });
    setActiveTab(2);
  };

  return (
    <>
      <div className="container py-5">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              className="link transition"
              underline="hover"
              color="inherit"
              href="/"
            >
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/" className="link">
              Fashion
            </Link>
            <Link underline="hover" color="inherit" href="/" className="link">
              Cute Bear Keychain, We Bare Bears (ICE BEAR)
            </Link>
          </Breadcrumbs>
        </div>
      </div>
      <section className="bg-white py-5">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[300px] ">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <>
            <div className="container flex flex-col lg:flex-row gap-8 items-start lg:items-center ">
              <div className="productZoomContainer w-full lg:w-[40%]">
                {productData?.length !== 0 && (
                  <ProductZoom images={productData?.images} />
                )}
              </div>
              <div className="productContent w-full lg:w-[60%] px-2 lg:px-10">
                {productData?.length !== 0 && (
                  <ProductInfo
                    gotoReviews={gotoReviews}
                    item={productData}
                    reviewsCount={reviewsCount}
                  />
                )}
              </div>
            </div>
          </>
        )}

        <div className="container pt-10">
          <div className="flex items-center gap-8 mb-5">
            <span
              onClick={() => setActiveTab(0)}
              className={`link w-full text-[17px] cursor-pointer font-[500] ${
                activeTab === 0 && "text-mocha-mousse"
              } `}
            >
              Description
            </span>
            {/* <span
              onClick={() => setActiveTab(1)}
              className={`link text-[17px] cursor-pointer font-[500] ${
                activeTab === 1 && "text-mocha-mousse"
              } `}
            >
              Product Details
            </span> */}
            <span
              onClick={() => setActiveTab(2)}
              className={`link w-full text-[17px] cursor-pointer font-[500] ${
                activeTab === 2 && "text-mocha-mousse"
              } `}
              ref={reviewSec}
            >
              Reviews ({reviewsCount})
            </span>
          </div>
          {activeTab === 0 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              {productData?.description}
              {/* <p>
                Adorable 3D We Bare Bears Keychain with Leather Strap from The
                Three Bare Bears, “We Bare Bears” animated series.
              </p>
              <h4>Brand Name</h4>
              <p>Giftany’s House Bear</p>
              <h4>Size</h4>
              <p>2.2 x 1.3 x 1 inches / 5.7 x 3.4 x 2.4 cm</p>
              <h4>Extension strap</h4>
              <p>4.8 inches / 12.2 cm</p>
              <h4>Material</h4>
              <p>High-Quality Rubber, Environmentally friendly</p> */}
            </div>
          )}

          {/* {activeTab === 1 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Color
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td class="px-6 py-4">Silver</td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Microsoft Surface Pro
                      </th>
                      <td class="px-6 py-4">White</td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Magic Mouse 2
                      </th>
                      <td class="px-6 py-4">Black</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )} */}
          {activeTab === 2 && (
            <>
              <div className="lg:shadow-md w-full lg:w-[80%] lg:py-5 lg:px-8 rounded-md">
                {productData?.length !== 0 && (
                  <Reviews
                    productId={productData?._id}
                    setReviewsCount={setReviewsCount}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="container pt-8">
          <h2 className="text-[20px] font-[600] mb-0">Related Products</h2>

          {productData?.length === 0 ? (
            <ProductLoading />
          ) : (
            <ProductsSlider items={5} data={relatedProductData} />
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

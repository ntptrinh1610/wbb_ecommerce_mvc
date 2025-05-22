import { Button, Rating, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";

const Reviews = (props) => {
  const [reviews, setReviews] = useState({
    image: "",
    userName: "",
    description: "",
    rating: "",
    userId: "",
    productId: "",
  });
  const [reviewData, setReviewData] = useState();

  const context = useContext(MyContext);

  useEffect(() => {
    console.log(props);
    setReviews(() => ({
      ...reviews,
      image: context?.userData?.avatar,
      userName: context?.userData?.name,
      userId: context?.userData?._id,
      productId: props?.productId,
    }));
    getReview();
  }, []);

  const getReview = () => {
    fetchDataFromApi(
      `/api/user/getAllReviews?productId=${props?.productId}`
    ).then((res) => {
      if (!res?.error) {
        setReviewData(res?.data);
        props?.setReviewsCount(res?.data?.length);
      }
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setReviews(() => ({
      ...reviews,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reviews?.description === "") {
      context?.openAlertBox("error", "Please enter review!");
      return;
    }

    if (reviews?.rating === 0 || reviews?.rating === "") {
      context?.openAlertBox("error", "Please rating!");
      return;
    }

    postData("/api/user/createReview", reviews).then((res) => {
      if (!res?.error) {
        context?.openAlertBox("success", res?.message);
        setReviews(() => ({
          ...reviews,
          description: "",
          rating: 0,
        }));
        getReview();
      } else {
        context?.openAlertBox("error", res?.message);
      }
    });
  };
  return (
    <>
      <div className="w-full productReviewsContainer">
        <h2 className="text-[16px] lg:text-[18px]">Customer question & answers</h2>
        <div className="reviewScroll pr-5 w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-4">
          {reviewData?.length !== 0 ? (
            reviewData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between"
                >
                  <div className="info w-[60%] flex items-center gap-3">
                    <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                      <img className="w-full" src={item?.image} />
                    </div>

                    <div className="w-[80%]">
                      <h4 className="text-[16px]">{item?.userName}</h4>
                      <h5 className="text-[13px] mb-0">
                        {item?.createdAt?.split("T")[0]}
                      </h5>
                      <p className="mt-0 mb-0">{item?.description}</p>
                    </div>
                  </div>
                  <Rating name="rating" defaultValue={item?.rating} readOnly />
                </div>
              );
            })
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
      <br />

      <div className="reviewForm bg-[#fafafa] p-4 rounded-md">
        <h2 className="text-[18px]">Add a review</h2>
        <form className="w-full mt-5" onSubmit={handleSubmit}>
          <TextField
            id="outlined-mutiple-flexible"
            label="Write a review..."
            className="w-full"
            rows={5}
            multiline
            name="description"
            onChange={onChangeInput}
            value={reviews?.description}
          />
          <br />
          <Rating
            value={reviews?.rating}
            name="rating"
            onChange={onChangeInput}
            className="mt-5"
            defaultValue={0}
            precision={0.5}
          />
          <div className="flex items-center mt-5">
            <Button type="submit" className="btn-challe">
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reviews;

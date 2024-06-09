import { useEffect, useState } from "react";
import styles from "../../styles/home.module.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import Review from "../Review";
import { initialData, rateData } from "../../libs/data/common";
import nameData from "../../libs/i18n/home.json";
import CommonInput from "../CommonInput/CommonInput";
import CommonSelect from "../CommonSelect/CommonSelect";

function Home() {
  const formik = useFormik({
    initialValues: {
      movie: "",
      comment: "",
      rate: 5,
    },
    validationSchema: yup.object({
      movie: yup.string().required("required"),
      comment: yup.string().required("required"),
    }),
    onSubmit: (values) => {
      const id = reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 0;
      const newReview = {
        id: id,
        title: values.movie,
        comment: values.comment,
        score: parseInt(values.rate),
      };
      setReviews([...reviews, newReview]);

      resetForm(); //reset처리
    },
  });

  const { handleSubmit, handleChange, values, errors, touched, resetForm } =
    formik;

  const [reviews, setReviews] = useState(
    localStorage.getItem("reviews") === null
      ? initialData
      : JSON.parse(localStorage.getItem("reviews"))
  );

  const setReviewsToLocalStorage = (reviews) => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  };

  const sortedReviews = reviews.slice().sort((a, b) => {
    if (b.score !== a.score) {
      // score가 높은순으로 정렬
      return b.score - a.score;
    }
    // score가 같을 때는 title에 대해 A-Z, a-z, 가-힣 순으로 정렬
    return a.title.localeCompare(b.title, "ko-KR", { sensitivity: "base" });
  });

  useEffect(() => {
    setReviews(reviews);
    setReviewsToLocalStorage(reviews);
  }, [reviews]);

  return (
    <div className={styles.home}>
      <div className={styles.addition}>
        <form onSubmit={handleSubmit}>
          <div className={styles.title}>{nameData.add_new_review}</div>
          <CommonInput
            title={nameData.movie_title}
            name="movie"
            value={values.movie}
            type="text"
            handleChange={handleChange}
            error={errors.movie}
            touch={touched.movie}
            holder={nameData.write_movie}
          />
          <CommonInput
            title={nameData.one_comment}
            name="comment"
            value={values.comment}
            type="text"
            handleChange={handleChange}
            error={errors.comment}
            touch={touched.comment}
            holder={nameData.write_comment}
          />
          <CommonSelect
            title={nameData.rate}
            name="rate"
            value={values.rate}
            type="number"
            handleChange={handleChange}
            data={rateData}
          />
          <button className={styles.submitBtn} type="submit">
            {nameData.add}
          </button>
        </form>
      </div>
      <Review reviews={sortedReviews} />
    </div>
  );
}

export default Home;

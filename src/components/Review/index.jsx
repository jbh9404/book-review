import { useEffect, useState } from "react";
import styles from "../../styles/home.module.scss";
import Card from "../Card";
import nameData from "../../libs/i18n/home.json";

function Review({ reviews }) {
  const [searchText, setSearchText] = useState("");

  const enterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const searchedResults = reviews
      .filter((value) => value.title.includes(searchText))
      .sort((a, b) => b.score - a.score);
  };

  useEffect(() => {
    handleSearch();
  }, [searchText, reviews]);

  return (
    <div className={styles.review}>
      <div className={styles.reviewWrap}>
        <div className={styles.title}>{nameData.review_search}</div>
        <div className={styles.inputWrap}>
          <input
            name="searchText"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={nameData.write_title}
            onKeyUp={enterKey}
          ></input>
        </div>
      </div>
      <div className={styles.reviewBoxWrap}>
        <div className={styles.title}>{nameData.review_history}</div>
        {reviews
          .filter((n) => !searchText || n.title.includes(searchText))
          .map((n) => (
            <Card data={n} key={n.id} />
          ))}
      </div>
    </div>
  );
}

export default Review;

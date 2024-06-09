import styles from "../../styles/home.module.scss";

function Card({ data }) {
  return (
    <div className={styles.reviewBox}>
      <div>{data.title}</div>
      <div>{data.comment}</div>
      <div>
        {[...Array(data.score)].map((_, index) => (
          <div key={index} />
        ))}
      </div>
    </div>
  );
}

export default Card;

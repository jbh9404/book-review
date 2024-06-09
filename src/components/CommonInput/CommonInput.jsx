import nameData from "../../libs/i18n/home.json";
import styles from "../../styles/home.module.scss";

function CommonInput({
  title,
  name,
  type,
  value,
  handleChange,
  error,
  touch,
  holder,
}) {
  return (
    <div className={styles.inputWrap}>
      <div className={styles.subTitle}>{title}</div>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        placeholder={holder}
      ></input>
      {error && touch && <div>{nameData.input_mandatory}</div>}
    </div>
  );
}

export default CommonInput;

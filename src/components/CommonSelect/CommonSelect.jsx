import styles from "../../styles/home.module.scss";

function CommonSelect({ title, name, value, type, handleChange, data }) {
  return (
    <div className={styles.inputWrap}>
      <div className={styles.subTitle}>{title}</div>
      <select name={name} type={type} value={value} onChange={handleChange}>
        {data.map((n) => (
          <option key={n.id} value={n.value} label={n.label}></option>
        ))}
      </select>
    </div>
  );
}

export default CommonSelect;

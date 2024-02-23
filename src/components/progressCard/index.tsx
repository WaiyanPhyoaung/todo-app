import styles from "./progressCard.module.css";

type ProgressCardProps = {
  completionRate: number;
  completedCount: number;
};

function ProgressCard({ completionRate, completedCount }: ProgressCardProps) {
  return (
    <section className={styles.progress_container}>
      <h1 className={styles.progress_heading}>Progress</h1>
      <div className={styles.progress_line}>
        <div
          className={styles.progress_bar}
          style={{ width: `${completionRate}%` }}
        ></div>
      </div>
      <p className={styles.completed_text}>{completedCount} completed</p>
    </section>
  );
}
export default ProgressCard;

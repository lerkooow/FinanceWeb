import s from "./ProgressSection.module.scss";

type TProgressSection = {
  progress: number;
  title?: string;
  // percentage?: boolean;
};

export const ProgressSection = ({ progress, title }: TProgressSection) => {
  return (
    <div className={s.progressSection}>
      <div className={s.progressInfo}>
        <span className={s.progressLabel}>{title}</span>
        {/* {percentage && <span className={s.progressPercentage}>{progress.toFixed(0)}%</span>} */}
      </div>
      <div className={s.progressBar}>
        <div className={s.progressFill} style={{ width: `${progress}%` }}>
          <div className={s.progressGlow}></div>
        </div>
      </div>
      <div className={s.progressMarkers}>
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

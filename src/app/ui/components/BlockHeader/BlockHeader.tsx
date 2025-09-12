import { Button } from "../Button";
import s from "./BlockHeader.module.scss";

type TBlockHeaderProps = {
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: string;
};

export const BlockHeader = ({ title, subtitle, buttonText, icon, onButtonClick }: TBlockHeaderProps) => {
  return (
    <div className={s.blockHeader}>
      <div>
        <h2 className={s.blockHeader__title}>{title}</h2>
        <p className={s.blockHeader__subtitle}>{subtitle}</p>
      </div>
      {buttonText && onButtonClick && (
        <Button className={s.blockHeader__primary} icon={icon} onClick={onButtonClick}>
          Добавить операцию
        </Button>
      )}
    </div>
  );
};

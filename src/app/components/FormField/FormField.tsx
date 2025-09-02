import s from "./FormField.module.scss";

type TFormFieldProps = {
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  value: string | number;
  rows?: number;
  placeholder?: string;
  className?: string;
  setValue: (value: string) => void;
};

export const FormField = ({ label, type, value, required, rows, placeholder, textarea, className, setValue }: TFormFieldProps) => {
  return (
    <div className={s.formField__inputWrapper}>
      <label>
        {label} {required && <span className={s.formField__inputRequired}>*</span>}
      </label>
      {textarea ? (
        <textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} rows={rows} className={className} />
      ) : (
        <input type={type} value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className={className} required />
      )}
    </div>
  );
};

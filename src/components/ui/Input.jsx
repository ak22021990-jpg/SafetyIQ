// src/components/ui/Input.jsx

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  className = '',
  id,
  autoComplete,
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const borderClass = error
    ? 'border-red-signal focus:border-red-signal'
    : 'border-surface-border focus:border-midnight'

  const shadowClass = error
    ? 'focus:shadow-[0_0_0_3px_rgba(232,25,44,0.08)]'
    : 'focus:shadow-[0_0_0_3px_rgba(15,23,42,0.08)]'

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="font-heading text-micro uppercase tracking-widest text-text-secondary font-semibold"
        >
          {label}{required && <span className="text-humanRed ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`
          w-full bg-white border ${borderClass} ${shadowClass}
          font-heading text-body-m text-text-primary
          px-4 py-3
          outline-none
          transition-all duration-150
          placeholder:text-text-muted
          rounded-[8px]
        `}
      />
      {error && (
        <p className="font-mono text-micro text-red-signal mt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

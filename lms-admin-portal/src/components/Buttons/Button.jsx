const variants = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  outline:   'btn-outline',
  danger:    'btn-danger',
  ghost:     'text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all inline-flex items-center gap-2',
};

const Button = ({
  children, variant = 'primary', size = 'md', className = '',
  loading = false, disabled = false, icon, iconRight,
  onClick, type = 'button', fullWidth = false,
}) => {
  const sizeClass  = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'px-7 py-3 text-base' : '';
  const widthClass = fullWidth ? 'w-full justify-center' : '';
  return (
    <button
      type={type} onClick={onClick}
      disabled={disabled || loading}
      className={`${variants[variant]} ${sizeClass} ${widthClass} ${className} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? <span>{icon}</span> : null}
      {children}
      {iconRight && !loading && <span>{iconRight}</span>}
    </button>
  );
};

export default Button;

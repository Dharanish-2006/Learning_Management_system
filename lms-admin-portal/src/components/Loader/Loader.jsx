const Loader = ({ size = 'md', center = false, text = '' }) => {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} border-3 border-gray-200 border-t-teal rounded-full animate-spin`}
        style={{ borderTopColor: '#00D4AA', borderWidth: '3px' }} />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
  if (center) return <div className="flex items-center justify-center min-h-[200px]">{spinner}</div>;
  return spinner;
};

export default Loader;

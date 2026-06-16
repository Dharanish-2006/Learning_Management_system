export default function ForgotPassword () {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-7">
          <Link to="/" className="text-2xl font-black text-navy no-underline">
            Learn<span className="text-teal">Hub</span>
          </Link>
          <div className="text-4xl my-4">{sent ? '📬' : '🔑'}</div>
          <h2 className="text-xl font-bold text-navy mb-1">
            {sent ? 'Check your inbox' : 'Reset your password'}
          </h2>
          <p className="text-gray-500 text-sm">
            {sent
              ? `We sent a reset link to ${email}. Check your inbox and spam folder.`
              : `Enter your email and we'll send you a password reset link.`}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <Button type="submit" loading={loading} fullWidth className="py-3 text-base">
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="space-y-3">
            <button onClick={() => setSent(false)} className="btn-outline w-full justify-center py-3">
              Try another email
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-5">
          Remembered it?{' '}
          <Link to="/login" className="text-teal font-semibold hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
};

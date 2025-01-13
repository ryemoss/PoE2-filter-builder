export default function InputBox({ onChange, className, type = 'number' }) {
	return <input className={`shadow w-[80px] ${className}`} type={type} onChange={onChange} />;
}

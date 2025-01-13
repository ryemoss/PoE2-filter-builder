export default function InputBox({ onChange, width = '80', type = 'number' }) {
	return <input className={`shadow w-[${width}px]`} type={type} onChange={onChange} />;
}

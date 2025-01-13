import InputBox from '../InputBox';

export default function CustomText({ updateRule }) {
	const handleTextChange = (e) => {
		updateRule(e.target.value);
	};

	return (
		<div className="flex gap-3 items-center">
			<span>Custom Text</span>
			<InputBox className={'w-[320px]'} onChange={handleTextChange} type="text" />
		</div>
	);
}

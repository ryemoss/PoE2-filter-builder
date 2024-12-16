import { useState, useEffect } from 'react';
import DropdownMenu from '../DropdownMenu';
import InputBox from '../InputBox';

const options = ['Armour', 'Evasion', 'Energy Shield', 'Sockets', 'Quality'];
const comparisons = ['<', '>', '<=', '>=', '='];

export default function ItemStat({ updateRule }) {
	const [stat, setStat] = useState(options[0]);
	const [val, setVal] = useState(0);
	const [comparison, setComparison] = useState(comparisons[0]);

	useEffect(() => {
		updateRule(`${stat} ${comparison} ${val}`);
	}, [stat, comparison, val]);

	return (
		<div className="flex gap-3 items-center">
			<DropdownMenu options={options} itemSelected={(v) => setStat(v)} />
			<DropdownMenu options={comparisons} itemSelected={(v) => setComparison(v)} className={'w-[40px]'} />
			<InputBox onChange={(e) => setVal(e.target.value)} />
		</div>
	);
}

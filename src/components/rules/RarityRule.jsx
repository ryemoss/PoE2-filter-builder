import DropdownMenu from '../DropdownMenu';
import { useState, useEffect } from 'react';

const options = ['Normal', 'Magic', 'Rare', 'Unique'];
const comparisons = ['<', '>', '<=', '>=', '='];

export default function RarityRule({ updateRule }) {
	const [comparison, setComparison] = useState(comparisons[0]);
	const [rarity, setRarity] = useState(options[0]);

	useEffect(() => {
		updateRule(`Rarity ${comparison} ${rarity}`);
	}, [comparison, rarity]);

	return (
		<div className="flex gap-3 items-center">
			<span>Rarity</span>
			<DropdownMenu options={comparisons} itemSelected={(v) => setComparison(v)} className={'w-[40px]'} />
			{<DropdownMenu options={options} itemSelected={(v) => setRarity(v)} />}
		</div>
	);
}

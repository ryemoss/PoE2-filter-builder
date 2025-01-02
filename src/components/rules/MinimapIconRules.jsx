import { useEffect, useState } from 'react';
import data from '../../assets/data-010d.json';
import DropdownMenu from '../DropdownMenu';

export default function MinimapIconRules({ updateRule }) {
	const [iconShape, setIconShape] = useState(data.MinimapIcons.Shapes[0]);
	const [iconSize, setIconSize] = useState(data.MinimapIcons.Sizes['Small']);
	const [iconColor, setIconColor] = useState(data.MinimapIcons.Colors[0]);

	useEffect(() => {
		updateRule(`MinimapIcon ${iconSize} ${iconColor} ${iconShape}`);
	}, [iconSize, iconColor, iconShape]);

	function selectSize(value) {
		setIconSize(data.MinimapIcons.Sizes[value]);
	}

	return (
		<div className="flex gap-5 items-center">
			<span>Minimap Icon</span>
			<hr className="vertical !h-full" />
			<div className="flex gap-5 flex-wrap">
				<div className="flex gap-1 items-center">
					<span>Shape</span>
					<DropdownMenu options={data.MinimapIcons.Shapes} itemSelected={setIconShape} />
				</div>
				<div className="flex gap-1 items-center">
					<span>Size</span>
					<DropdownMenu options={Object.keys(data.MinimapIcons.Sizes)} itemSelected={selectSize} />
				</div>
				<div className="flex gap-1 items-center">
					<span>Color</span>
					<DropdownMenu options={data.MinimapIcons.Colors} itemSelected={setIconColor} />
				</div>
			</div>
		</div>
	);
}

import { useState } from 'react';
import FilterGroup from '../components/FilterGroup';
import FileExport from '../components/FileExport';
import { uuid } from '../utils/uidGenerator';
import { useStore } from '../store/store';

const RuleGroups = ({ groups, removeGroup }) => {
	return (
		<div id="filter-groups" className="flex flex-col gap-2">
			{groups.map((g) => (
				<FilterGroup removeGroup={() => removeGroup(g.id)} key={g.id} id={g.id} />
			))}
		</div>
	);
};

export default function FilterGenerator() {
	const [groups, setGroups] = useState([createDefaultGroup()]);

	const store = useStore();

	function createDefaultGroup() {
		return { id: uuid() };
	}

	function addGroup() {
		setGroups((prevGroups) => [...prevGroups, createDefaultGroup()]);
	}

	function removeGroup(id) {
		store.removeGroup(id);
		setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id));
	}

	return (
		<section className="flex flex-1 h-[100%] flex-col">
			<div className="flex items-center">
				<img className="w-32" src="src/assets/poe2-logo.webp" />
				<h1>Path of Exile 2 - Filter Builder</h1>
			</div>
			<hr className="my-8 border-zinc-300"></hr>

			<RuleGroups groups={groups} removeGroup={removeGroup} />

			<button className="self-start mt-6 mb-40" onClick={addGroup}>
				+ Add Group
			</button>

			<FileExport />
		</section>
	);
}

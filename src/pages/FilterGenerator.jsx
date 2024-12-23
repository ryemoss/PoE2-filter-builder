import { useState } from 'react';
import FilterGroup from '../components/FilterGroup';
import FileExport, { useFilePrepare } from '../components/FileExport';
import FilterPreview from '../components/FilterPreview';
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
	const { filePreview, transformToFilterText } = useFilePrepare();

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

	function generatePreview() {
		transformToFilterText();
	}

	return (
		<main>
			<section className="flex flex-1 flex-col">
				<div className="flex items-center">
					<img className="w-32" src="poe2-logo.webp" />
					<h1>Path of Exile 2 - Filter Builder</h1>
				</div>
				<hr className="mt-4 mb-8 border-zinc-300"></hr>

				<RuleGroups groups={groups} removeGroup={removeGroup} />

				<button className="self-start mt-6 mb-40" onClick={addGroup}>
					+ Add Group
				</button>

				<hr className="mb-8 border-zinc-300"></hr>
				<div className="flex gap-4 mt-auto">
					<button className="w-[50%]" onClick={generatePreview}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1}
							stroke="currentColor"
							className="size-5 mr-2 inline-block"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
							/>
						</svg>
						<span>Generate Preview</span>
					</button>
					<FileExport />
				</div>
			</section>
			{filePreview && <FilterPreview className="mt-8" generatePreview={generatePreview} filePreview={filePreview} />}
		</main>
	);
}

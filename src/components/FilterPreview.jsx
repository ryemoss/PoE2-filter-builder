import { useState } from 'react';

export default function FilterPreview({ className, filePreview, generatePreview }) {
	const [refreshing, setRefreshing] = useState(false);
	const [copied, setCopied] = useState(false);

	function refreshPreview() {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
			generatePreview();
		}, 120);
	}

	function copyContent() {
		setCopied(true);
		navigator.clipboard.writeText(filePreview);
		setTimeout(() => {
			setCopied(false);
		}, 600);
	}

	return (
		<div className={`${className} w-full relative`}>
			<div className="flex gap-1 absolute top-4 right-4">
				<button className="refresh-icon" onClick={refreshPreview}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="size-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>
				</button>

				<button className="refresh-icon" onClick={copyContent}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke={!copied ? 'currentColor' : 'green'}
						className="size-5"
					>
						{!copied ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
							/>
						)}
					</svg>
				</button>
			</div>

			<div
				className="border border-zinc-300 rounded-sm bg-zinc-100 min-h-40 whitespace-pre-wrap p-4"
				id="filter-preview"
			>
				{filePreview}
				{refreshing && <div className="foreground" />}
			</div>
		</div>
	);
}

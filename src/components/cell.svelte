<script lang="ts">
	import '../global.css';
	import { revealedCells, bombsLeft, isOver, isWon } from '../stores';
	import { CellCoordinates } from '../interfaces/cell';

	export let bombsNearby: number;
	export let isBombed: boolean;
	export let coordinates: CellCoordinates;
	export let isRevealed = false;
	export let isFlagged = false;
	export let generateCellsStats: (cellCoordinates: CellCoordinates) => void;
	export let handleGameLost: () => void;
	export let revealCellsNearby: (cellCoordinates: CellCoordinates) => void;
	export let checkIfWon: () => void;

	const handleRightClick = () => {
		if (isFlagged) {
			bombsLeft.update((prev) => prev + 1);
		} else {
			bombsLeft.update((prev) => prev - 1);
		}
		isFlagged = !isFlagged;
	};

	const handleLeftClick = () => {
		isRevealed = true;
		if ($revealedCells === 0) {
			generateCellsStats(coordinates);
		} else {
			if (isBombed) {
				handleGameLost();
			} else {
				checkIfWon();
				if (!isWon && bombsNearby === 0) {
					revealCellsNearby(coordinates);
				}
			}
		}
	};
	const handleCellClick = (e: MouseEvent) => {
		if ($isOver || $isWon) return;
		if (e.button === 0 && !isFlagged) {
			handleLeftClick();
		} else if (e.button === 2) {
			handleRightClick();
		}
	};

	const fontColors: { [bombsNearby: number]: string } = {
		1: 'blue',
		2: 'green',
		3: 'red',
		4: 'purple',
		5: 'maroon',
		6: 'turquoise',
		7: 'black',
		8: 'gray'
	};
</script>

<div
	class="cell"
	class:cell__revealed={isRevealed}
	class:cell__bombed={isRevealed && isBombed}
	style:color={fontColors[`${bombsNearby}`]}
>
	{#if isRevealed}
		{#if bombsNearby !== 0}{bombsNearby}
		{/if}
	{:else}
		<button on:mouseup={handleCellClick} class="cell button" class:button__flagged={isFlagged}
		></button>
	{/if}
</div>

<style lang="scss">
	.cell {
		background-color: #c6c6c6;
		width: 24px;
		height: 24px;
		border-radius: 0px;
		border-color: #ffffff;
		border-style: outset;
		background-repeat: no-repeat;
		background-size: 70%;
		background-position: 50% 50%;
		&__revealed {
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: 'mine-sweeper';
			font-size: 10px;
		}
		&__bombed {
			background-color: red;
			background-image: url('../assets/mine.svg');
		}
	}
	.button {
		&__flagged {
			background-image: url('../assets/flag.svg');
			&:active {
				border-style: outset !important;
			}
		}
		&:active {
			border-style: inset;
		}
	}
</style>

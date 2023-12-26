<script lang="ts">
	import { CellCoordinates } from '../interfaces/cell';
	import { bombsLeft, isOver, isWon } from '../stores';
	import Cell from './cell.svelte';
	window.addEventListener('contextmenu', function (e) {
		e.preventDefault();
	});
	const isBombed: boolean = false;
	const coordinates: CellCoordinates = { x: 0, y: 0 };
	const isRevealed = false;
	const generateCellsStats = (cellCoordinates: CellCoordinates) => {
		console.log('called generateCellsStats with coordinates: ', cellCoordinates);
	};
	const handleGameLost = () => {
		console.log('called handleGameLost');
	};
	const revealCellsNearby = (cellCoordinates: CellCoordinates) => {
		console.log('called revealCellsNearby with coordinates: ', cellCoordinates);
	};
	const checkIfWon = () => {
		console.log('called checkIfWon with coordinates: ');
	};
</script>

<p>Main Component</p>

<div class="cellsContainer">
	<!-- this is where the cells go -->
	<p>{`bombs left: ${$bombsLeft}`}</p>
	<p>{`isOver: ${$isOver}`}</p>
	<p>{`isWon: ${$isWon}`}</p>
	<Cell
		bombsNearby={0}
		{generateCellsStats}
		{handleGameLost}
		{revealCellsNearby}
		{checkIfWon}
		{isRevealed}
		{coordinates}
		{isBombed}
	/>
</div>

<!-- 
    generateCellsStats:
        - set the calling cell to a no bomb cell
        - setBombs()
        - countNearbyBombs()

    setBombs:
        - while there are still bombs to place
            - pick a random cell
            - while it has been already decided if the cell has a bomb or not 
                - pick a random cell           
            - place a bomb to in the cell
            - decrese the number of bombs to place
            - go back to step 1

    countNearbyBombs: 
        - for each cell
            - if it's not bombed
                - count how many bombs are in nearby cells
                - assign that number to that cell

    revealCellsNearby:
        - for each cell nearby
            - if it doesn't have a bomb and is not revealed 
                - reveal it
                - trigger revealCellsNearby for that cell
-->
<style lang="scss">
	.cellsContainer {
		border: 1px solid black;
		display: grid;
	}
</style>

<script>
export let game

import { createEventDispatcher } from 'svelte'
import { derived } from 'svelte/store'
import { unpackBoard, nMoves, packMove } from 'tic-tac-nano'

const theme = { x: '🍆', o: '🍑', 0: ' ' }

const unpacked = derived(game, $g => unpackBoard($g))
const dispatch = createEventDispatcher()

const slotClicked = (x, y) => {
  // console.log('Click', x, y)
  let idx = y * 3 + x
  const moveCount = nMoves($game)
  let n = 0
  const unp = $unpacked
  // console.log('unp', unp)
  if (!unp[idx]) { // If free slot clicked, packMove
    if (moveCount) {
      while(idx--) {
        if (!unp[idx]) n++
      }
    } else { // First move
      if (x === 1 && y === 1) n = 2 // center
      else if (x !== 1 && y !== 1) n = 0 // corner
      else n = 1 // edge
    }
    dispatch('move', { game: packMove($game, n), n: moveCount})
  }
}
</script>
<section>
  <h2>You vs. Them</h2>
  <table class="board">
    <tbody>
      {#each { length: 3 } as _, y}
        <tr>
          {#each { length: 3 } as _, x}
            <td on:click={slotClicked.bind(null, x, y)}>
              {theme[$unpacked[y * 3 + x] || 0]}
            </td>
        {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <pre>Game state: {$game}</pre>
</section>
<style>

  .board { border-collapse: collapse; }
  .board td {
    --size: 40px;
    font-size: 30px;
    border: 1px solid black;
    width: var(--size);
    height: var(--size);
    text-align: center;
    line-height: var(--size);
  }
  .board tr:nth-child(even) td:nth-child(even) {
    background-color: black;
    color: white;
  }
  .board tr:nth-child(odd) td:nth-child(odd) {
    background-color: black;
    color: white;
  }
</style>

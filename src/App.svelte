<script>
import { writable } from 'svelte/store'
import TicTacBoard from './TicTacBoard.svelte'
console.log(window.location.hash)
const game = writable(parseInt(window.location.hash.replace(/^#/, '') || 0))
// const PlayerN = 0
const shareLink = writable()
const onBoardMove = ev => {
  console.info('Move event:', ev.detail)
  const { detail } = ev
  // const myTurn = detail.n % 2 === PlayerN

  if (!$shareLink) {
    $game = detail.game
    const u = new URL(window.location)
    u.hash = $game
    $shareLink = u.toString()
  } else {
    console.info('Not our turn')
  }
}

</script>

<main class="flex column center xcenter">
  <TicTacBoard game={game} on:move={onBoardMove}/>
  {#if $shareLink}
    <section>
      <p>Share your move to the opponent:</p>
      <h4><a href="{$shareLink}">{$shareLink}</a></h4>
    </section>
  {/if}
</main>

<style>
</style>

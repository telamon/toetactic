import App from './App.svelte'
import Feed from 'picofeed'
/*
const MESSAGE_TYPE_INIT = 'I'
const MESSAGE_TYPE_MOVE = 'M'
const id = Feed.signPair()
const feed = new Feed()

if (!feed.length) { // Init new player
  feed.append(JSON.stringify({ t: MESSAGE_TYPE_INIT, a: 'gAnonYmous'}), id.sk)
}

console.log(feed.get(0))

const jar = new Jar()

class Player {
  constructor (jar, id) {
    this.id = id

  }
}
*/
const app = new App({
	target: document.body,
	props: {
	}
});

export default app

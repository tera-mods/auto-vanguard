const ZONE_BG = [10, 29, 70, 118, 119, 909]

module.exports = function AutoVanguard(mod) {
	let zone = -1,
		queued = []

	mod.hook('S_LOAD_TOPO', 3, event => { ({zone} = event) })

	mod.hook('S_SPAWN_ME', 'raw', tryCompleteQuests)

	mod.hook('S_COMPLETE_EVENT_MATCHING_QUEST', 1, event => {
		queued.push(event.id)
		tryCompleteQuests()
		return false
	})

	function tryCompleteQuests() {
		if(ZONE_BG.includes(zone)) return

		if(queued.length) {
			for(let id of queued) mod.send('C_COMPLETE_DAILY_EVENT', 1, {id})

			queued = []
		}
	}
}
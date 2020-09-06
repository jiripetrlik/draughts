package draughts

import (
	"sync"
	"sync/atomic"
)

var databaseMutex = &sync.Mutex{}
var userCounter uint64 = 0
var waitingPlayers = make(map[int]string)

func generateUserID() uint64 {
	userID := atomic.AddUint64(&userCounter, 1)

	return userID
}

func waitForOponent(ID int, name string) {
	databaseMutex.Lock()

	waitingPlayers[ID] = name

	databaseMutex.Unlock()
}

func waitingForOponents() map[int]string {
	databaseMutex.Lock()

	wP := make(map[int]string)
	for k, v := range waitingPlayers {
		wP[k] = v
	}

	databaseMutex.Unlock()

	return wP
}

func stopWaitingForOponent(ID int) {
	databaseMutex.Lock()

	delete(waitingPlayers, ID)

	databaseMutex.Unlock()
}

func logoutUser(ID int) {
	databaseMutex.Lock()

	stopWaitingForOponent(ID)

	databaseMutex.Unlock()
}

package draughts

type player struct {
	ID   uint64
	Name string
}

func newPlayer(ID uint64, name string) *player {
	return &player{ID: ID, Name: name}
}

type playing struct {
	ID    int
	Names []string
}

func newPlaying(ID int, name1 string, name2 string) *playing {
	names := []string{name1, name2}
	playing := playing{ID: ID, Names: names}

	return &playing
}

type players struct {
	Waiting []player
	Playing []playing
}

func newPlayers() *players {
	return &players{Waiting: []player{}, Playing: []playing{}}
}

type state struct {
	Status   string
	Name     string
	Players  *players
	Color    string
	NextMove string
	Pieces   *pieces
	Messages []message
}

func newState() *state {
	s := state{Status: "login"}

	return &s
}

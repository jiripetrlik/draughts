package draughts

type command struct {
	Name       string
	Parameters string
}

func executeCommand(c command, s *state) *state {
	switch c.Name {
	case "login":
		s = loginCommand(c, s)
	case "wait":
		s.Status = "waiting"
	case "stop-waiting":
		s.Status = "navigation"
		s.Players = newPlayers()
	}

	return s
}

func loginCommand(c command, s *state) *state {
	s.Status = "navigation"
	s.Name = c.Parameters
	s.Players = newPlayers()

	return s
}

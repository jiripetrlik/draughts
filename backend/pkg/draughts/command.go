package draughts

type command struct {
	Name       string
	Parameters string
}

func executeCommand(c command, s *state) *state {
	switch c.Name {
	case "login":
		return loginCommand(c, s)
	}

	return s
}

func loginCommand(c command, s *state) *state {
	s.Status = "navigation"
	s.Name = c.Parameters
	s.Players = newPlayers()

	return s
}

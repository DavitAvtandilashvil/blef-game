export function toPublicState(room) {
  return {
    roomCode: room.roomCode,
    status: room.status,
    phase: room.phase,
    turnIndex: room.turnIndex,
    players: room.players.map((p) => ({
      id: p.id,
      name: p.name,
      roomAdmin: p.roomAdmin,
      alive: p.alive,
      handCount: p.hand?.length ?? 0,
    })),
    deckCount: Math.max(room.deck.length - room.drawIndex, 0),
    discardCount: room.discardPile.length,
    maxPlayers: room.maxPlayers,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
  };
}

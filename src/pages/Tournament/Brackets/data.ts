import { TournamentType } from "./types";

//! 8 Participents
export const tournament5: TournamentType = {
  tournament_id: 0,
  tournament_name: "Tournament 1",
  tournament_description: "This is a tournament",
  stage_number: 3,
  participant: Array.from({ length: 5 }, (_, i) => ({ id: i, tournament_id: 0, name: `Team ${i + 1}` })),
  stage: [
    { id: 0, name: "Stage 1", type: "single_elimination" },
    { id: 1, name: "Stage 2", type: "single_elimination" },
    { id: 2, name: "Stage 3", type: "single_elimination" }
  ],
  match: [
    ...Array.from({ length: 5 }, (_, i) => ({ id: i, stage_id: 0, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: i + 4, stage_id: 1, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    { id: 6, stage_id: 2, opponent1: { id: 0, position: 1 }, opponent2: { id: 1, position: 2 }, status: 1 },
  ],
  match_game: []
};

//! 8 Participents
export const tournament8: TournamentType = {
  tournament_id: 0,
  tournament_name: "Tournament 1",
  tournament_description: "This is a tournament",
  stage_number: 3,
  participant: Array.from({ length: 8 }, (_, i) => ({ id: i, tournament_id: 0, name: `Team ${i + 1}` })),
  stage: [
    { id: 0, name: "Stage 1", type: "single_elimination" },
    { id: 1, name: "Stage 2", type: "single_elimination" },
    { id: 2, name: "Stage 3", type: "single_elimination" }
  ],
  match: [
    ...Array.from({ length: 4 }, (_, i) => ({ id: i, stage_id: 0, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: i + 4, stage_id: 1, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    { id: 6, stage_id: 2, opponent1: { id: 0, position: 1 }, opponent2: { id: 1, position: 2 }, status: 1 },
  ],
  match_game: []
};

//! 16 Participents
export const tournament16: TournamentType = {
  tournament_id: 0,
  tournament_name: "Tournament 1",
  tournament_description: "This is a tournament",
  stage_number: 4,
  participant: Array.from({ length: 16 }, (_, i) => ({ id: i, tournament_id: 0, name: `Team ${i + 1}` })),
  stage: [
    { id: 0, name: "Stage 1", type: "single_elimination" },
    { id: 1, name: "Stage 2", type: "single_elimination" },
    { id: 2, name: "Stage 3", type: "single_elimination" },
    { id: 3, name: "Stage 4", type: "single_elimination" }
  ],
  match: [
    ...Array.from({ length: 8 }, (_, i) => ({ id: i, stage_id: 0, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 4 }, (_, i) => ({ id: i + 8, stage_id: 1, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: i + 12, stage_id: 2, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    { id: 14, stage_id: 3, opponent1: { id: 0, position: 1 }, opponent2: { id: 1, position: 2 }, status: 1 },
  ],
  match_game: []
};

//! 32 Participents
export const tournament32: TournamentType = {
  tournament_id: 0,
  tournament_name: "Tournament 1",
  tournament_description: "This is a tournament",
  stage_number: 5,
  participant: Array.from({ length: 32 }, (_, i) => ({ id: i, tournament_id: 0, name: `Team ${i + 1}` })),
  stage: [
    { id: 0, name: "Stage 1", type: "single_elimination" },
    { id: 1, name: "Stage 2", type: "single_elimination" },
    { id: 2, name: "Stage 3", type: "single_elimination" },
    { id: 3, name: "Stage 4", type: "single_elimination" },
    { id: 4, name: "Stage 5", type: "single_elimination" }
  ],
  match: [
    ...Array.from({ length: 16 }, (_, i) => ({ id: i, stage_id: 0, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 8 }, (_, i) => ({ id: i + 16, stage_id: 1, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 4 }, (_, i) => ({ id: i + 24, stage_id: 2, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: i + 28, stage_id: 3, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    { id: 30, stage_id: 4, opponent1: { id: 0, position: 1 }, opponent2: { id: 1, position: 2 }, status: 1 },
  ],
  match_game: []
};


//! 64 Participents
export const tournament64: TournamentType = {
  tournament_id: 0,
  tournament_name: "Tournament 1",
  tournament_description: "This is a tournament",
  stage_number: 6,
  participant: Array.from({ length: 64 }, (_, i) => ({ id: i, tournament_id: 0, name: `Team ${i + 1}` })),
  stage: [
    { id: 0, name: "Stage 1", type: "single_elimination" },
    { id: 1, name: "Stage 2", type: "single_elimination" },
    { id: 2, name: "Stage 3", type: "single_elimination" },
    { id: 3, name: "Stage 4", type: "single_elimination" },
    { id: 4, name: "Stage 5", type: "single_elimination" },
    { id: 5, name: "Stage 6", type: "single_elimination" }
  ],
  match: [
    ...Array.from({ length: 32 }, (_, i) => ({ id: i, stage_id: 0, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 16 }, (_, i) => ({ id: i + 32, stage_id: 1, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 8 }, (_, i) => ({ id: i + 48, stage_id: 2, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 4 }, (_, i) => ({ id: i + 56, stage_id: 3, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: i + 60, stage_id: 4, opponent1: { id: i * 2, position: 1 }, opponent2: { id: i * 2 + 1, position: 2 }, status: 1 })),
    { id: 62, stage_id: 5, opponent1: { id: 0, position: 1 }, opponent2: { id: 1, position: 2 }, status: 1 },
  ],
  match_game: []
};


//! 128 Participents
export const tournament128: TournamentType = {
  tournament_id: 0,
  tournament_name: `Tournament 1`,
  tournament_description: `This is tournament 1`,
  stage_number: 7,
  participant: Array.from({ length: 128 }, (_, i) => ({ id: i, tournament_id: 0, name: `Team ${i + 1}` })),
  stage: [
    { id: 0, name: "Stage 1", type: "single_elimination" },
    { id: 1, name: "Stage 2", type: "single_elimination" },
    { id: 2, name: "Stage 3", type: "single_elimination" },
    { id: 3, name: "Stage 4", type: "single_elimination" },
    { id: 4, name: "Stage 5", type: "single_elimination" },
    { id: 5, name: "Stage 6", type: "single_elimination" },
    { id: 6, name: "Stage 7", type: "single_elimination" }
  ],
  match: [
    ...Array.from({ length: 64 }, (_, j) => ({ id: j, stage_id: 0, opponent1: { id: j * 2, position: 1 }, opponent2: { id: j * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 32 }, (_, j) => ({ id: j + 64, stage_id: 1, opponent1: { id: j * 2, position: 1 }, opponent2: { id: j * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 16 }, (_, j) => ({ id: j + 96, stage_id: 2, opponent1: { id: j * 2, position: 1 }, opponent2: { id: j * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 8 }, (_, j) => ({ id: j + 112, stage_id: 3, opponent1: { id: j * 2, position: 1 }, opponent2: { id: j * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 4 }, (_, j) => ({ id: j + 120, stage_id: 4, opponent1: { id: j * 2, position: 1 }, opponent2: { id: j * 2 + 1, position: 2 }, status: 1 })),
    ...Array.from({ length: 2 }, (_, j) => ({ id: j + 124, stage_id: 5, opponent1: { id: j * 2, position: 1 }, opponent2: { id: j * 2 + 1, position: 2 }, status: 1 })),
    { id: 126, stage_id: 6, opponent1: { id: 0, position: 1 }, opponent2: { id: 1, position: 2 }, status: 1 },
  ],
  match_game: []
};

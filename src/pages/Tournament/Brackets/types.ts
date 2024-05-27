// src/types.ts
export interface Participant {
    id: number;
    tournament_id: number;
    name: string;
  }
  
  export interface Stage {
    id: number;
    name: string;
    type: string;
  }
  
  export interface Opponent {
    id: number;
    position: number;
    score?: number;
    result?: string;
  }
  
  export interface Match {
    id: number;
    stage_id: number;
    opponent1: Opponent;
    opponent2: Opponent;
    child_count?: number;
    status: number;
  }
  
  export interface TournamentType {
    tournament_id: number;
    tournament_name: string;
    tournament_description: string;
    stage_number: number;
    participant: Participant[];
    stage: Stage[];
    match: Match[];
    match_game: any[];
  }
  
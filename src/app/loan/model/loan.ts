import { Game } from '@/app/game/model/game';
import { Client } from '@/app/client/model/client';

export interface Loan {
    id: number;
    loanDate: Date;
    returnDate: Date;
    game: Game;
    client: Client;
}

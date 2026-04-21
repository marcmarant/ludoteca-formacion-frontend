import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { LoanEdit } from './loan-edit';
import { LoanService } from '../loan.service';
import { GameService } from '@/app/game/game.service';
import { ClientService } from '@/app/client/client.service';

describe('LoanEdit', () => {
    let component: LoanEdit;
    let fixture: ComponentFixture<LoanEdit>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoanEdit],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: { close: () => {} } },
                {
                    provide: LoanService,
                    useValue: { saveLoan: () => of(void 0) },
                },
                {
                    provide: GameService,
                    useValue: { getGames: () => of([]) },
                },
                {
                    provide: ClientService,
                    useValue: { getClients: () => of([]) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoanEdit);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
